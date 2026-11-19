// Safety pack item 4 (19 Nov 2026): confirmation emails only to the address just submitted.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { escapeHtml, formTokenKey, greetingName, issueFormToken, makeLimiter, verifyFormToken, FORM_TOKEN_TTL_MS } from '../lib/formToken.ts'

const key = formTokenKey({ FORM_TOKEN_SECRET: 'test-secret' })
const NOW = Date.parse('2026-11-20T00:00:00Z')

test('a token works only for the email it was issued for', () => {
  const t = issueFormToken('Sam@Example.com', key, NOW)
  assert.equal(verifyFormToken(t, 'sam@example.com', key, NOW + 1000), true)
  assert.equal(verifyFormToken(t, 'victim@example.com', key, NOW + 1000), false)
})

test('a token expires, and a forged or missing one fails', () => {
  const t = issueFormToken('sam@example.com', key, NOW)
  assert.equal(verifyFormToken(t, 'sam@example.com', key, NOW + FORM_TOKEN_TTL_MS + 1), false)
  assert.equal(verifyFormToken(`${NOW + 1000}.forged`, 'sam@example.com', key, NOW), false)
  assert.equal(verifyFormToken(undefined, 'sam@example.com', key, NOW), false)
  assert.equal(verifyFormToken(t, 'sam@example.com', formTokenKey({ FORM_TOKEN_SECRET: 'other' }), NOW), false)
  // A far-future expiry (more than the TTL ahead) is refused even with a valid signature shape.
  assert.equal(verifyFormToken(`${NOW + 10 * FORM_TOKEN_TTL_MS}.x`, 'sam@example.com', key, NOW), false)
})

test('no secret configured: no tokens, nothing verifies (fail closed)', () => {
  assert.equal(formTokenKey({}), null)
  assert.equal(issueFormToken('sam@example.com', null, NOW), null)
  assert.equal(verifyFormToken('1.2', 'sam@example.com', null, NOW), false)
})

test('every value in the email is escaped; the greeting keeps letters only', () => {
  assert.equal(escapeHtml('<a href="x">\'&'), '&lt;a href=&quot;x&quot;&gt;&#39;&amp;')
  assert.equal(greetingName('<img src=x onerror=alert(1)>Sam'), 'img srcx onerroralertSam')
  assert.equal(greetingName('Zoë-Anne O\'Brien'), 'Zoë-Anne O\'Brien')
  assert.equal(greetingName('Click http://evil.example now').includes('/'), false)
  assert.ok(greetingName('x'.repeat(100)).length <= 40)
})

test('rate limiter', () => {
  const lim = makeLimiter(2, 1000)
  assert.equal(lim('a', 0), false); assert.equal(lim('a', 1), false); assert.equal(lim('a', 2), true)
  assert.equal(lim('b', 2), false); assert.equal(lim('a', 1001), false)
})

test('the unused quiz-confirmation route is gone; send-confirmation checks origin, token, limits and escapes', () => {
  assert.equal(existsSync(new URL('../app/api/quiz-confirmation/route.ts', import.meta.url)), false)
  const src = readFileSync(new URL('../app/api/send-confirmation/route.ts', import.meta.url), 'utf8')
  assert.match(src, /if \(!sameOrigin\(req\)\)/)
  assert.match(src, /verifyFormToken\(body\.token, email, formTokenKey\(\)\)/)
  assert.match(src, /perIp\(ip\)/)
  assert.match(src, /perRecipient\(email\)/)
  assert.match(src, /escapeHtml\(firstName\)/)
  assert.match(src, /escapeHtml\(step\)/)
  assert.doesNotMatch(src, /\$\{firstName\}/)
})
