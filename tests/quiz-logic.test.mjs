// Run: npm test  (node --test, type stripping handles the .ts import on Node 22.6+)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evaluateQuiz, portalPrograms, symptomsFor, safetyFor, whyLine, GOALS, PROGRAMS } from '../lib/quiz-logic.ts'
import { START_PHASES, phasesFor, stepNumber, stepsRemaining } from '../lib/startFunnel.ts'

const ask = (over) => evaluateQuiz({ sex: 'men', age: '40-49', goal: 'unsure', symptoms: [], safety: [], ...over })

test('under 18 stops with no program', () => {
  const r = ask({ age: 'under18', goal: 'energy', symptoms: ['tired'] })
  assert.equal(r.outcome, 'stop')
  assert.equal(r.stopReason, 'under18')
  assert.deepEqual(portalPrograms(r), [])
})

test('pregnant or breastfeeding stops with no program', () => {
  const r = ask({ sex: 'women', goal: 'energy', symptoms: ['tired'], safety: ['pregnant'] })
  assert.equal(r.outcome, 'stop')
  assert.equal(r.stopReason, 'pregnant')
})

test('not sure goes to the blood panel', () => {
  const r = ask({ goal: 'unsure' })
  assert.equal(r.primary, 'bloods')
  assert.deepEqual(r.secondary, [])
  assert.deepEqual(portalPrograms(r), ['Comprehensive Blood Tests'])
})

test('men with energy symptoms: hormone, with the panel first in the copy', () => {
  const r = ask({ goal: 'energy', symptoms: ['tired', 'drive'] })
  assert.equal(r.primary, 'hormone')
  assert.equal(r.doctorFirst, false)
  assert.match(whyLine('hormone', 'men', true), /blood panel/)
})

test('men with the energy goal but no symptom: bloods lead, hormone is secondary at most', () => {
  const r = ask({ goal: 'energy', symptoms: [] })
  assert.equal(r.primary, 'bloods')
  assert.ok(!r.secondary.includes('hormone'))
})

test('women energy, cycle and mood go to the panel first', () => {
  const r = ask({ sex: 'women', goal: 'energy', symptoms: ['tired', 'cycle'] })
  assert.equal(r.primary, 'bloods')
  assert.deepEqual(r.secondary, ['hormone'])
  assert.match(whyLine('bloods', 'women', true), /women/)
})

test('men trying for a baby: hormone ruled out, doctor first, panel still offered', () => {
  const r = ask({ goal: 'energy', symptoms: ['tired', 'libido'], safety: ['baby'] })
  assert.equal(r.doctorFirst, true)
  assert.notEqual(r.primary, 'hormone')
  assert.ok(!r.secondary.includes('hormone'))
  assert.equal(r.primary, 'bloods')
  assert.equal(r.doctorFirstReasons.length, 1)
})

test('prostate or cancer history rules hormone out', () => {
  const r = ask({ goal: 'energy', symptoms: ['tired'], safety: ['prostate'] })
  assert.equal(r.doctorFirst, true)
  assert.equal(r.primary, 'bloods')
})

test('any safety tick shows doctor first and keeps the program', () => {
  const r = ask({ goal: 'weight', symptoms: ['stuck'], safety: ['heart'] })
  assert.equal(r.doctorFirst, true)
  assert.equal(r.primary, 'weight')
  assert.match(r.doctorFirstReasons[0], /heart/)
})

test('"none" on the safety screen is not a flag', () => {
  const r = ask({ goal: 'weight', symptoms: ['stuck'], safety: ['none'] })
  assert.equal(r.doctorFirst, false)
})

test('recovery with no training or injury reason is not performance', () => {
  const r = ask({ goal: 'recovery', symptoms: [] })
  assert.equal(r.primary, 'bloods')
  assert.ok(!r.secondary.includes('performance'))
})

test('recovery: injury symptoms lead to injury repair, training symptoms to performance', () => {
  assert.equal(ask({ goal: 'recovery', symptoms: ['slowheal', 'flare'] }).primary, 'injury')
  const p = ask({ goal: 'recovery', symptoms: ['slowrecover', 'plateau'] })
  assert.equal(p.primary, 'performance')
  const both = ask({ goal: 'recovery', symptoms: ['slowheal', 'plateau', 'sore'] })
  assert.equal(both.primary, 'performance')
  assert.deepEqual(both.secondary, ['injury'])
})

test('a sudden tear is a red flag', () => {
  const r = ask({ goal: 'recovery', symptoms: ['tear'] })
  assert.equal(r.doctorFirst, true)
  assert.equal(r.primary, 'injury')
})

test('hair and skin split by symptom; patchy loss and a changed mole are red flags', () => {
  assert.equal(ask({ goal: 'hairskin', symptoms: ['temples'] }).primary, 'hair')
  assert.equal(ask({ goal: 'hairskin', symptoms: ['acne', 'sun'] }).primary, 'skin')
  const both = ask({ goal: 'hairskin', symptoms: ['temples', 'acne'] })
  assert.equal(both.primary, 'hair')
  assert.deepEqual(both.secondary, ['skin'])
  assert.equal(ask({ goal: 'hairskin', symptoms: ['patchy'] }).doctorFirst, true)
  assert.equal(ask({ goal: 'hairskin', symptoms: ['mole'] }).doctorFirst, true)
})

test('women hair loss goes to the panel first', () => {
  const r = ask({ sex: 'women', goal: 'hairskin', symptoms: ['shedding'] })
  assert.equal(r.primary, 'bloods')
  assert.deepEqual(r.secondary, ['hair'])
})

test('longevity leads to longevity; a focus complaint is carried as a note, never a program', () => {
  const r = ask({ goal: 'longevity', symptoms: ['baseline', 'focus'] })
  assert.equal(r.primary, 'longevity')
  assert.ok(r.notes.includes('cognitive'))
  assert.ok(!portalPrograms(r).some(n => /cognitive/i.test(n)))
})

test('sexual health for men; hormone alongside only with interest and morning pattern', () => {
  const a = ask({ goal: 'sexual', symptoms: ['erections'] })
  assert.equal(a.primary, 'sexual')
  assert.deepEqual(a.secondary, [])
  const b = ask({ goal: 'sexual', symptoms: ['erections', 'libido'] })
  assert.deepEqual(b.secondary, ['hormone'])
  assert.equal(ask({ goal: 'sexual', symptoms: ['pain'] }).doctorFirst, true)
})

test('sexual health for women goes to the panel first', () => {
  const r = ask({ sex: 'women', goal: 'sexual', symptoms: ['libido'] })
  assert.equal(r.primary, 'bloods')
  assert.deepEqual(r.secondary, ['sexual'])
})

test('sleep, focus and mood folds into hormone (men) or the panel (women), with the note carried', () => {
  const m = ask({ goal: 'mind', symptoms: ['fog', 'mood'] })
  assert.equal(m.primary, 'hormone')
  assert.ok(m.notes.includes('cognitive'))
  const sleepOnly = ask({ goal: 'mind', symptoms: ['sleep'] })
  assert.equal(sleepOnly.primary, 'bloods')
  const w = ask({ sex: 'women', goal: 'mind', symptoms: ['fog'] })
  assert.equal(w.primary, 'bloods')
  assert.equal(ask({ goal: 'mind', symptoms: ['memory'] }).doctorFirst, true)
})

test('never more than two secondaries, never the primary or bloods repeated', () => {
  for (const goal of GOALS.map(g => g.id)) {
    for (const sex of ['men', 'women']) {
      const all = symptomsFor(goal, sex).map(s => s.id)
      const r = ask({ sex, goal, symptoms: all })
      assert.ok(r.secondary.length <= 2, `${goal}/${sex}`)
      assert.ok(!r.secondary.includes(r.primary), `${goal}/${sex}`)
      assert.ok(!r.secondary.includes('bloods'), `${goal}/${sex}`)
      assert.ok(new Set(r.secondary).size === r.secondary.length, `${goal}/${sex}`)
    }
  }
})

test('portal names match the portal contract', () => {
  const PORTAL = ['Hormone Optimisation', 'Weight Loss & Metabolic', 'Sexual Health', 'Skin & Hair', 'Hair Restoration', 'Recovery & Injury Repair', 'Performance Optimisation', 'Anti-Ageing & Longevity', 'Comprehensive Blood Tests']
  for (const p of Object.values(PROGRAMS)) assert.ok(PORTAL.includes(p.portal), p.portal)
})

test('visitor-facing copy has no em dashes, no medicine, hormone or marker names', () => {
  const banned = /—|testosterone|oestrogen|estrogen|thyroxine|tsh|lh\b|fsh|prolactin|psa\b|hba1c|cholesterol|semaglutide|tirzepatide|finasteride|minoxidil|tadalafil|sildenafil|metformin|peptide|wegovy|mounjaro|iron studies|ferritin/i
  const texts = []
  for (const g of GOALS) texts.push(g.label, g.sub)
  for (const goal of GOALS.map(g => g.id)) for (const sex of ['men', 'women']) for (const s of symptomsFor(goal, sex)) texts.push(s.label)
  for (const sex of ['men', 'women']) for (const s of safetyFor(sex)) texts.push(s.label)
  for (const id of Object.keys(PROGRAMS)) for (const sex of ['men', 'women']) texts.push(whyLine(id, sex, true), whyLine(id, sex, false))
  const r = ask({ sex: 'men', goal: 'hairskin', symptoms: ['patchy', 'mole', 'tear', 'pain', 'memory'], safety: ['newdx', 'heart', 'prostate', 'baby', 'cancer'] })
  texts.push(...r.doctorFirstReasons)
  for (const t of texts) assert.doesNotMatch(t, banned, t)
})

test('the funnel counts every screen and the email is third from last', () => {
  assert.equal(START_PHASES.length, 7)
  assert.equal(START_PHASES.indexOf('email'), START_PHASES.length - 3)
  assert.equal(START_PHASES[START_PHASES.length - 1], 'source')
  assert.deepEqual(phasesFor({ hasSex: true }), START_PHASES.slice(1))
  assert.equal(stepNumber('age', { hasSex: true }), 2)
  assert.equal(stepNumber('age', { hasSex: false }), 2)
  assert.equal(stepsRemaining('source', { hasSex: false }), 0)
})
