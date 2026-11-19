// Safety pack item 4 (19 Nov 2026): the site can no longer be used to email anyone the caller chooses.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { CONFIRMATION_FOR_SOURCE, allowedOrigins, clientIp, escapeHtml, greetingName, makeLimiter, originAllowed, validEmail } from '../lib/formGuard.ts'

const headers = (h) => ({ get: (k) => h[k.toLowerCase()] ?? null })
const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')

test('origin: only our fixed origins, never the request Host; a missing Origin is refused', () => {
  assert.equal(originAllowed('https://www.apexmetabolichealth.com.au', {}), true)
  assert.equal(originAllowed('https://apexmetabolichealth.com.au', {}), true)
  assert.equal(originAllowed('https://evil.example', {}), false)
  assert.equal(originAllowed('https://www.apexmetabolichealth.com.au.evil.example', {}), false)
  assert.equal(originAllowed(null, {}), false)
  assert.equal(originAllowed('http://localhost:3000', {}), false)
  assert.equal(originAllowed('http://localhost:3000', { NODE_ENV: 'development' }), true)
  assert.ok(allowedOrigins({ VERCEL_ENV: 'preview', VERCEL_URL: 'x-git-y.vercel.app' }).includes('https://x-git-y.vercel.app'))
  assert.equal(allowedOrigins({ VERCEL_ENV: 'production', VERCEL_URL: 'x.vercel.app' }).includes('https://x.vercel.app'), false)
})

test('client IP: the platform value, never the first (client-written) forwarded entry', () => {
  const V = { VERCEL: '1' }
  assert.equal(clientIp(headers({ 'x-real-ip': '203.0.113.9', 'x-forwarded-for': '1.1.1.1, 203.0.113.9' }), V), '203.0.113.9')
  assert.equal(clientIp(headers({ 'x-forwarded-for': '1.1.1.1, 198.51.100.7' }), V), '198.51.100.7')
  assert.equal(clientIp(headers({}), V), 'unknown')
  // Off Vercel the headers are not trusted at all.
  assert.equal(clientIp(headers({ 'x-real-ip': '203.0.113.9' }), {}), 'local')
})

test('escaping and the greeting name', () => {
  assert.equal(escapeHtml('<a href="x">\'&'), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;')
  assert.equal(greetingName('Sam <b>Lee</b>'), 'Sam')
  assert.equal(greetingName('Click http://evil.example now'), 'Click')
  assert.equal(greetingName('Zoë-Anne'), 'Zoë-Anne')
  assert.ok(greetingName('x'.repeat(100)).length <= 40)
  assert.equal(validEmail('a@b.co'), true)
  assert.equal(validEmail('not an email'), false)
})

test('limiters: per IP, and per recipient (10 minutes and daily cap)', () => {
  const lim = makeLimiter(2, 1000)
  assert.equal(lim('a', 0), false); assert.equal(lim('a', 1), false); assert.equal(lim('a', 2), true)
  assert.equal(lim('b', 2), false); assert.equal(lim('a', 1001), false)
  const src = read('../app/api/notify-admin/route.ts')
  assert.match(src, /const confirmRecent = makeLimiter\(1, 10 \* 60_000\)/)
  assert.match(src, /const confirmDaily = makeLimiter\(3, 24 \* 60 \* 60_000\)/)
})

test('both open email routes are gone and nothing calls them', () => {
  assert.equal(existsSync(new URL('../app/api/quiz-confirmation/route.ts', import.meta.url)), false)
  assert.equal(existsSync(new URL('../app/api/send-confirmation/route.ts', import.meta.url)), false)
  for (const f of ['../app/intake/discovery/page.tsx', '../lib/captureLead.ts']) assert.doesNotMatch(read(f), /send-confirmation|quiz-confirmation/)
})

test('notify-admin: origin, IP limit, body cap, and the confirmation goes only to the lead\'s own email', () => {
  const src = read('../app/api/notify-admin/route.ts')
  assert.match(src, /if \(!originAllowed\(req\.headers\.get\('origin'\)\)\)/)
  assert.match(src, /perIp\(clientIp\(req\.headers\)\)/)
  assert.match(src, /MAX_BODY_BYTES/)
  assert.match(src, /const to = normEmail\(email\)/)
  assert.match(src, /sendEmail\(\{ to, subject: FORM_CONFIG\[formType\]\.subject, html: buildConfirmationEmail\(greetingName\(name\), formType\) \}\)/)
  assert.doesNotMatch(src, /confirmToken/)
  assert.deepEqual(Object.values(CONFIRMATION_FOR_SOURCE), ['discovery'])
})

test('ghl-lead: fixed origins and platform IP, no token', () => {
  const src = read('../app/api/ghl-lead/route.ts')
  assert.match(src, /originAllowed\(req\.headers\.get\('origin'\)\)/)
  assert.match(src, /const clientId = clientIp\(req\.headers\)/)
  assert.doesNotMatch(src, /confirmToken|x-forwarded-for'\)\?\.split\(','\)\[0\]/)
})

test('the confirmation template escapes every interpolated value', () => {
  const src = read('../lib/confirmationEmail.ts')
  for (const m of src.matchAll(/\$\{([^}]+)\}/g)) {
    const expr = m[1]
    if (/^(i \+ 1|steps|config\.nextSteps.*)$/.test(expr.trim()) || expr.includes('escapeHtml(') || expr.includes('?')) continue
    assert.fail(`unescaped value in template: \${${expr}}`)
  }
})

test('unsubscribe: fixed origins and platform IP, never the Host header or the first forwarded entry', () => {
  const src = read('../app/api/unsubscribe/route.ts')
  assert.match(src, /from '@\/lib\/formGuard'/)
  assert.match(src, /if \(!originAllowed\(req\.headers\.get\('origin'\)\)\) return json\(\{ error: 'Forbidden' \}, 403\)/)
  assert.match(src, /perIp\(clientIp\(req\.headers\)\)/)
  assert.match(src, /const perIp = makeLimiter\(5, 60_000\)/)
  assert.match(src, /MAX_BODY_BYTES/)
  assert.match(src, /validEmail\(email\)/)
  // The old spoofable checks are gone.
  assert.doesNotMatch(src, /x-forwarded-host|headers\.get\('host'\)|isSameOrigin|x-forwarded-for/)
  assert.doesNotMatch(src, /if \(!origin\) return true/)
  // The page that posts here is on our own origin, so a fixed-origin check never blocks a real visitor.
  assert.match(read('../app/unsubscribe/page.tsx'), /'\/api\/unsubscribe'/)
})

test('unsubscribe guard behaviour: spoofed Host, missing Origin and a forged first forwarded hop all fail', () => {
  // A request whose Origin matches its own (attacker-chosen) Host was accepted by the old check.
  assert.equal(originAllowed('https://evil.example', {}), false)
  assert.equal(originAllowed(undefined, {}), false)
  assert.equal(originAllowed('https://www.apexmetabolichealth.com.au/', {}), true)
  // Rotating the first x-forwarded-for entry no longer gives a fresh rate-limit bucket.
  const V = { VERCEL: '1' }
  const lim = makeLimiter(5, 60_000)
  let limited = false
  for (let i = 0; i < 7; i++) {
    const ip = clientIp(headers({ 'x-forwarded-for': `10.0.0.${i}, 198.51.100.7` }), V)
    assert.equal(ip, '198.51.100.7')
    limited = lim(ip, 0)
  }
  assert.equal(limited, true)
})
