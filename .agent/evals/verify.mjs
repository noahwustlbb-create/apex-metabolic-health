#!/usr/bin/env node
/**
 * M1 verifier. Fail closed. Do not certify by narrative.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const fail = []
const ok = []

function mustExist(rel) {
  if (existsSync(join(root, rel))) ok.push(`exists ${rel}`)
  else fail.push(`missing ${rel}`)
}

function mustMatch(rel, re, label) {
  const text = readFileSync(join(root, rel), 'utf8')
  if (re.test(text)) ok.push(`match ${label}`)
  else fail.push(`no match ${label} in ${rel}`)
}

const required = [
  'AGENTS.md',
  'PRODUCT.md',
  '.agent/OPERATING.md',
  '.agent/IMPLEMENTATION.md',
  '.agent/QUEUES.md',
  '.agent/WORKFLOW.md',
  '.agent/plan.md',
  '.agent/tasks.md',
  '.agent/knowledge.md',
  '.agent/decisions.md',
  '.agent/status.md',
  '.agent/handoff.md',
  '.agent/FAILURE.md',
  '.agent/artifacts/cta-map.md',
]

for (const f of required) mustExist(f)

mustMatch('AGENTS.md', /men and women/, 'audience lock')
mustMatch('PRODUCT.md', /18–80|18-80/, 'age range')
mustMatch('.cursor/rules/compliance.mdc', /Never/, 'compliance never-list')

const map = existsSync(join(root, '.agent/artifacts/cta-map.md'))
  ? readFileSync(join(root, '.agent/artifacts/cta-map.md'), 'utf8')
  : ''
for (const needle of ['/start', 'signup', '/intake/']) {
  if (map.includes(needle)) ok.push(`cta-map has ${needle}`)
  else fail.push(`cta-map missing ${needle}`)
}

const report = {
  ok: fail.length === 0,
  passed: ok.length,
  failed: fail.length,
  okItems: ok,
  failItems: fail,
  at: new Date().toISOString(),
}

mkdirSync(join(root, '.agent/runs'), { recursive: true })
writeFileSync(join(root, '.agent/runs/last-verify.json'), JSON.stringify(report, null, 2))

if (fail.length) {
  console.error('VERIFY FAIL')
  for (const f of fail) console.error(' -', f)
  process.exit(1)
}

console.log('VERIFY PASS', ok.length, 'checks')
