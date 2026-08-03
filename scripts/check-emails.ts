// Compliance + integrity guard for the email journey.
// Run: npx tsx scripts/check-emails.ts
//
// Catches the failure mode that matters most here: someone edits copy months
// from now and quietly reintroduces language that promises treatment.

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { renderEmail, templateKeys } from '../lib/email/render'
import { TEMPLATES } from '../lib/email/templates'
import { SAMPLE } from '../lib/email/sample'

/** Phrases that imply approval, guarantee or eligibility. Case-insensitive. */
const BANNED = [
  'you have been approved', 'you are approved', "you're approved",
  'you qualify for treatment', 'you qualify',
  'guaranteed', 'guarantee',
  'officially eligible', 'you are eligible', "you're eligible",
  'your medication is', 'prescription approved',
  'milestone unlocked', 'congratulations',
]

/**
 * Documented exceptions. Only for cases where the phrase appears in a form that
 * is compliant — e.g. explicitly denying a guarantee. Each needs a reason.
 */
const ALLOW: Record<string, { phrase: string; reason: string }[]> = {
  'process-explainer': [
    { phrase: 'guaranteed', reason: 'FAQ asks "Am I guaranteed treatment?" and answers "No." — denying a guarantee, not making one.' },
    { phrase: 'guarantee', reason: 'Substring of the same denial above.' },
  ],
}

/** Every email must carry the mandated footer. */
const REQUIRED = 'AHPRA-registered medical practitioners'
const REQUIRED_ENTITY = 'Imperial Equity Investments Pty Ltd'

let failures = 0
const fail = (m: string) => { console.error(`  ✗ ${m}`); failures++ }

const keys = templateKeys()
console.log(`Checking ${keys.length} templates…\n`)

for (const key of keys) {
  const t = TEMPLATES[key]
  const email = renderEmail(key, SAMPLE)
  const haystack = `${email.subject} ${email.text}`.toLowerCase()

  const allowed = new Set((ALLOW[key] ?? []).map(a => a.phrase))
  for (const phrase of BANNED) {
    if (haystack.includes(phrase) && !allowed.has(phrase)) fail(`${key}: banned phrase "${phrase}"`)
  }
  if (!email.html.includes(REQUIRED)) fail(`${key}: missing AHPRA footer`)
  if (!email.html.includes(REQUIRED_ENTITY)) fail(`${key}: missing operating entity`)
  if (!email.subject.trim()) fail(`${key}: empty subject`)
  if (email.subject.length > 78) fail(`${key}: subject too long (${email.subject.length} chars)`)

  // Service mail must not carry an unsubscribe link; marketing mail must.
  const hasUnsub = email.html.includes('Unsubscribe')
  if (t.category === 'marketing' && !hasUnsub) fail(`${key}: marketing email without unsubscribe`)
  if (t.category === 'service' && hasUnsub) fail(`${key}: service email carrying unsubscribe`)

  // A dead end is the exact thing this system exists to prevent.
  const terminal = ['clinical-review-required', 'consult-complete', 'prescription-sent', 'pharmacy-processing', 'treatment-started']
  if (!t.cta && !terminal.includes(key)) fail(`${key}: no CTA and not a known terminal email`)

  if (email.html.includes('${')) fail(`${key}: unresolved template literal in output`)
}

/**
 * Every CTA must resolve. A journey email whose button 404s or hangs on an
 * unmatched SPA route is worse than no email — the patient acts and hits a wall.
 * Run with --links to check them over the network.
 */
async function checkLinks() {
  const urls = new Map<string, string[]>()
  for (const key of keys) {
    for (const m of renderEmail(key, SAMPLE).html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const u = m[1]
      if (!urls.has(u)) urls.set(u, [])
      urls.get(u)!.push(key)
    }
  }
  // The portal is an SPA behind a catch-all rewrite, so EVERY path returns 200 —
  // including ones that match no route and leave the patient on a dead spinner.
  // HTTP status is therefore meaningless there; check against the real route
  // table in App.tsx instead.
  const portalRoutes = loadPortalRoutes()

  console.log(`\nChecking ${urls.size} CTA URLs…`)
  for (const [u, usedBy] of urls) {
    if (!u.includes('apexmetabolichealth.com.au')) continue // skip third-party

    if (u.startsWith('https://app.')) {
      const path = new URL(u).pathname
      if (portalRoutes.size === 0) {
        fail(`could not read portal routes — cannot verify ${u}`)
      } else if (!portalRoutes.has(path)) {
        fail(`portal route not declared in App.tsx: ${path} — used by: ${usedBy.join(', ')}`)
      }
      continue
    }

    try {
      const r = await fetch(u, { redirect: 'follow' })
      if (r.status >= 400) fail(`${r.status} ${u} — used by: ${usedBy.join(', ')}`)
    } catch (err) {
      fail(`unreachable ${u} (${err instanceof Error ? err.message : err})`)
    }
  }
}

/** Parse declared <Route path="..."> values out of the portal's App.tsx. */
function loadPortalRoutes(): Set<string> {
  const appTsx = resolve(import.meta.dirname, '../../apex-portal/src/App.tsx')
  if (!existsSync(appTsx)) {
    console.warn(`  ! portal App.tsx not found at ${appTsx} — skipping route verification`)
    return new Set()
  }
  const src = readFileSync(appTsx, 'utf8')
  const routes = new Set<string>()
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"/g)) routes.add(m[1])
  return routes
}

async function main() {
  if (process.argv.includes('--links')) await checkLinks()
  console.log(failures === 0
    ? `\n✓ All ${keys.length} templates passed.`
    : `\n${failures} issue(s) found.`)
  process.exit(failures === 0 ? 0 : 1)
}

main()
