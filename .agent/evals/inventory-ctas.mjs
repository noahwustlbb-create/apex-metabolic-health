#!/usr/bin/env node
/**
 * Scan app/ and components/ for funnel hrefs. Writes .agent/artifacts/cta-map.md
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.cwd()
const buckets = new Map()

const RE =
  /(?:href|ctaHref|portalHref|intakeHref|signupUrl|DEFAULT_SIGNUP)\s*[=:]\s*[\`'\"]([^'\"`]+)[\`'\"]/g

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === '.git') continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p)
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) scan(p)
  }
}

function classify(href) {
  if (href.startsWith('mailto:')) return null
  if (/legitscript|google\.com|bloodygoodtests/.test(href)) return null
  if (href.includes('app.apexmetabolichealth.com.au')) {
    if (href.includes('/login')) return 'portal-login'
    if (href.includes('/signup')) return 'portal-signup'
    if (href.includes('/assessment')) return 'portal-assessment'
    if (href.includes('/intake')) return 'portal-intake'
    return 'portal-other'
  }
  if (href.startsWith('/intake')) return 'site-intake'
  if (href.startsWith('/start')) return 'site-start'
  if (href.startsWith('/signup')) return 'site-signup'
  if (href.startsWith('/get-started')) return 'site-get-started'
  if (href.startsWith('/assessment')) return 'site-assessment'
  if (href.startsWith('/book')) return 'site-book'
  if (href.startsWith('/quiz')) return 'site-quiz'
  if (href.includes('apexmetabolic.com.au/get-started')) return 'legacy-domain'
  return null
}

function scan(file) {
  const text = readFileSync(file, 'utf8')
  let m
  RE.lastIndex = 0
  while ((m = RE.exec(text))) {
    const href = m[1]
    const kind = classify(href)
    if (!kind) continue
    if (!buckets.has(kind)) buckets.set(kind, new Map())
    const dests = buckets.get(kind)
    if (!dests.has(href)) dests.set(href, new Set())
    dests.get(href).add(relative(root, file))
  }
}

walk(join(root, 'app'))
walk(join(root, 'components'))
walk(join(root, 'lib'))

const order = [
  'portal-signup',
  'portal-login',
  'portal-assessment',
  'portal-intake',
  'portal-other',
  'site-start',
  'site-signup',
  'site-get-started',
  'site-assessment',
  'site-intake',
  'site-book',
  'site-quiz',
  'legacy-domain',
]

let total = 0
const lines = []
lines.push('# CTA map')
lines.push('')
lines.push('Generated from source. Do not edit by hand. Re-run `node .agent/evals/inventory-ctas.mjs`.')
lines.push('')
lines.push(`Generated: ${new Date().toISOString()}`)
lines.push('')

for (const kind of order) {
  const dests = buckets.get(kind)
  if (!dests) continue
  lines.push(`## ${kind}`)
  lines.push('')
  for (const [href, files] of [...dests.entries()].sort()) {
    const n = files.size
    total += n
    lines.push(`- \`${href}\` (${n} file${n === 1 ? '' : 's'})`)
    for (const f of [...files].sort()) lines.push(`  - ${f}`)
  }
  lines.push('')
}

lines.push(`## totals`)
lines.push('')
lines.push(`- destination kinds: ${[...buckets.keys()].length}`)
lines.push(`- file-hits: ${total}`)
lines.push('')
lines.push('Canonical target after M2: portal signup, portal login, or `/start`.')
lines.push('')

mkdirSync(join(root, '.agent/artifacts'), { recursive: true })
writeFileSync(join(root, '.agent/artifacts/cta-map.md'), lines.join('\n'))
console.log(`wrote .agent/artifacts/cta-map.md (${total} file-hits)`)
