/**
 * Health quiz: questions, options and the answer-to-program mapping.
 *
 * The logic comes from the Apex program guide (ten decision-support drafts,
 * 6 Nov 2026, summarised in ~/Clients/Apex/rebuild/quiz-2026-11-12/
 * PROGRAM-GUIDE-SUMMARY.md). The guide is used for WHO fits WHICH program,
 * what rules a program out, and who must see a doctor first. None of its
 * medicine, hormone or marker names appear here: everything the visitor reads
 * is plain English, and nothing on the result is a diagnosis.
 *
 * Pure functions, no React, no browser. Tested in tests/quiz-logic.test.mjs.
 *
 * Standing rules (the guide, and Noah 12 Nov 2026):
 * - Nothing starts without bloods. Every result says the panel comes first.
 * - "Performance" alone is not a program. Performance Optimisation only with a
 *   training-or-recovery reason; otherwise bloods and a doctor.
 * - Hormone for men needs symptoms AND bloods. The quiz never says anyone is
 *   low in anything.
 * - Women's hormone, cycle, energy, hair and sexual concerns go to the women's
 *   panel first.
 * - Under 18, or pregnant or breastfeeding: stop, speak to your GP. No program.
 * - Any red flag: "See a doctor first" at the top of the result, panel still offered.
 * - Not sure: the blood panel.
 * - Cognitive health is not a site program: it folds into Longevity or Hormone,
 *   with the symptom carried into the portal notes, never shown as a program.
 */

export type Sex = 'men' | 'women'
export type AgeBand = 'under18' | '18-29' | '30-39' | '40-49' | '50-59' | '60-69' | '70-80'
export type Goal = 'energy' | 'weight' | 'recovery' | 'hairskin' | 'longevity' | 'sexual' | 'mind' | 'unsure'
export type ProgramId = 'hormone' | 'weight' | 'sexual' | 'injury' | 'performance' | 'longevity' | 'skin' | 'hair' | 'bloods'

export const AGE_BANDS: { id: AgeBand; label: string }[] = [
  { id: 'under18', label: 'Under 18' },
  { id: '18-29', label: '18 to 29' },
  { id: '30-39', label: '30 to 39' },
  { id: '40-49', label: '40 to 49' },
  { id: '50-59', label: '50 to 59' },
  { id: '60-69', label: '60 to 69' },
  { id: '70-80', label: '70 to 80' },
]

export const GOALS: { id: Goal; label: string; sub: string }[] = [
  { id: 'energy', label: 'Energy and drive', sub: 'Tired, flat, not yourself' },
  { id: 'weight', label: 'Weight', sub: 'Weight that will not move' },
  { id: 'recovery', label: 'Recovery', sub: 'An injury, or training and not recovering' },
  { id: 'hairskin', label: 'Hair or skin', sub: 'Thinning hair, acne, sun damage' },
  { id: 'longevity', label: 'Staying well long term', sub: 'A baseline and a plan' },
  { id: 'sexual', label: 'Sexual health', sub: 'Function, interest, confidence' },
  { id: 'mind', label: 'Sleep, focus and mood', sub: 'Brain fog, poor sleep, low mood' },
  { id: 'unsure', label: 'Not sure', sub: 'I would like a doctor to look' },
]

export type SymptomOption = { id: string; label: string }

/** One symptom screen per goal, multi-select, in plain English. The women's list differs where the guide does. */
const SYMPTOMS: Record<Goal, { men: SymptomOption[]; women?: SymptomOption[] }> = {
  energy: {
    men: [
      { id: 'tired', label: 'Tired most days, even after sleep' },
      { id: 'drive', label: 'Less drive or motivation than I had' },
      { id: 'libido', label: 'Less interest in sex' },
      { id: 'muscle', label: 'Harder to build or keep muscle' },
      { id: 'mood', label: 'Low mood or a shorter temper' },
      { id: 'weightup', label: 'Weight creeping up around the middle' },
    ],
    women: [
      { id: 'tired', label: 'Tired most days, even after sleep' },
      { id: 'cycle', label: 'My cycle has changed, or periods are heavy' },
      { id: 'flushes', label: 'Hot flushes or night sweats' },
      { id: 'mood', label: 'Low mood, anxiety or a shorter temper' },
      { id: 'libido', label: 'Less interest in sex' },
      { id: 'coldhair', label: 'Feeling the cold, hair shedding, brittle nails' },
    ],
  },
  weight: {
    men: [
      { id: 'stuck', label: 'Weight will not move with diet and exercise' },
      { id: 'middle', label: 'Most of it sits around the middle' },
      { id: 'regain', label: 'I lost weight before and it came back' },
      { id: 'hunger', label: 'Cravings or hunger that are hard to control' },
      { id: 'snoring', label: 'Snoring, or waking unrefreshed' },
      { id: 'famhx', label: 'Diabetes or heart disease in the family' },
    ],
  },
  recovery: {
    men: [
      { id: 'slowheal', label: 'An injury that is slow to heal' },
      { id: 'flare', label: 'A tendon or joint that keeps flaring up' },
      { id: 'tear', label: 'A sudden tear or pop during activity' },
      { id: 'slowrecover', label: 'Training hard but recovering slowly' },
      { id: 'plateau', label: 'Strength or output has plateaued' },
      { id: 'sore', label: 'Soreness that lasts for days after training' },
    ],
  },
  hairskin: {
    men: [
      { id: 'temples', label: 'Thinning at the temples or crown' },
      { id: 'shedding', label: 'More hair in the brush or shower' },
      { id: 'patchy', label: 'Patchy or sudden hair loss' },
      { id: 'acne', label: 'Acne or breakouts' },
      { id: 'sun', label: 'Sun damage, lines or uneven tone' },
      { id: 'mole', label: 'A spot or mole that has changed' },
    ],
  },
  longevity: {
    men: [
      { id: 'baseline', label: 'No symptoms, I want a baseline' },
      { id: 'famhx', label: 'Heart disease, diabetes or cancer in the family' },
      { id: 'nobloods', label: 'I have not had bloods in years' },
      { id: 'risk', label: 'I want to know my heart and metabolic risk' },
      { id: 'energy', label: 'Energy is lower than it was' },
      { id: 'focus', label: 'Memory or focus is not what it was' },
    ],
  },
  sexual: {
    men: [
      { id: 'erections', label: 'Erections are less reliable' },
      { id: 'morning', label: 'Morning erections have dropped off' },
      { id: 'libido', label: 'Less interest in sex' },
      { id: 'early', label: 'Finishing sooner than I would like' },
      { id: 'confidence', label: 'Confidence or anxiety around sex' },
      { id: 'pain', label: 'Pain, curvature or a change in shape' },
    ],
    women: [
      { id: 'libido', label: 'Less interest in sex' },
      { id: 'discomfort', label: 'Discomfort or dryness' },
      { id: 'confidence', label: 'Confidence or anxiety around sex' },
      { id: 'lifestage', label: 'A change since a baby or a change in my cycle' },
      { id: 'tired', label: 'Too tired for it most of the time' },
    ],
  },
  mind: {
    men: [
      { id: 'sleep', label: 'Trouble falling or staying asleep' },
      { id: 'snoring', label: 'Snoring, or waking unrefreshed' },
      { id: 'fog', label: 'Brain fog or poor focus' },
      { id: 'mood', label: 'Low mood or anxiety' },
      { id: 'drive', label: 'Low drive or motivation' },
      { id: 'memory', label: 'Memory changes that worry me, or that others have noticed' },
    ],
  },
  unsure: {
    men: [
      { id: 'tired', label: 'Tired most days' },
      { id: 'weightup', label: 'Weight creeping up' },
      { id: 'mood', label: 'Mood, sleep or focus' },
      { id: 'niggles', label: 'Recovery, or niggling injuries' },
      { id: 'baseline', label: 'Nothing specific, I want a baseline' },
    ],
  },
}

export function symptomsFor(goal: Goal, sex: Sex | ''): SymptomOption[] {
  const g = SYMPTOMS[goal]
  return (sex === 'women' && g.women) || g.men
}

export function symptomQuestion(goal: Goal, caregiver: boolean): string {
  const them = caregiver ? 'them' : 'you'
  const they = caregiver ? 'they' : 'you'
  const their = caregiver ? 'their' : 'your'
  // Headlines end in a full stop on this site, so each is an instruction, not a question.
  switch (goal) {
    case 'energy': return `Tick what sounds like ${them}.`
    case 'weight': return `Tick what ${their} weight has been doing.`
    case 'recovery': return `Tick what ${they} are dealing with.`
    case 'hairskin': return `Tick what ${they} have noticed.`
    case 'longevity': return 'Tick what is behind it.'
    case 'sexual': return 'Tick what is going on.'
    case 'mind': return `Tick what sounds like ${them}.`
    case 'unsure': return `Tick what bothers ${them} most.`
  }
}

export type SafetyOption = { id: string; label: string }

/** Plain-English versions of the guide's red flags and contraindications. */
export function safetyFor(sex: Sex | ''): SafetyOption[] {
  const common: SafetyOption[] = [
    { id: 'newdx', label: 'A new diagnosis in the last 12 months my doctor should know about' },
    { id: 'heart', label: 'A heart problem, chest pain, a heart attack or a stroke' },
  ]
  const men: SafetyOption[] = [
    { id: 'prostate', label: 'A prostate problem, or a breast or prostate cancer diagnosis' },
    { id: 'baby', label: 'Trying for a baby, or planning to in the next year' },
  ]
  const women: SafetyOption[] = [
    { id: 'cancer', label: 'A breast cancer diagnosis, now or in the past' },
    { id: 'pregnant', label: 'Pregnant or breastfeeding' },
    { id: 'baby', label: 'Trying for a baby, or planning to in the next year' },
  ]
  return [...common, ...(sex === 'women' ? women : men)]
}

export interface QuizAnswers {
  sex: Sex | ''
  age: AgeBand | ''
  goal: Goal | ''
  symptoms: string[]
  safety: string[]
}

export interface ProgramMeta {
  id: ProgramId
  /** As shown on the site (lib/treatments-grid.ts). */
  name: string
  /** As the portal expects it in ?programs= (apex-portal src/lib/programs.ts PROGRAM_NAMES). */
  portal: string
  href: string
}

export const PROGRAMS: Record<ProgramId, ProgramMeta> = {
  hormone: { id: 'hormone', name: 'Hormone Optimisation', portal: 'Hormone Optimisation', href: '/programs/hormone-optimisation' },
  weight: { id: 'weight', name: 'Medical Weight Loss', portal: 'Weight Loss & Metabolic', href: '/programs/metabolic-weight-loss' },
  sexual: { id: 'sexual', name: 'Sexual Health', portal: 'Sexual Health', href: '/programs/sexual-health' },
  injury: { id: 'injury', name: 'Recovery and Injury Repair', portal: 'Recovery & Injury Repair', href: '/programs/injury-repair' },
  performance: { id: 'performance', name: 'Performance Optimisation', portal: 'Performance Optimisation', href: '/programs/performance-plus' },
  longevity: { id: 'longevity', name: 'Anti-Ageing and Longevity', portal: 'Anti-Ageing & Longevity', href: '/programs/longevity' },
  skin: { id: 'skin', name: 'Skin Regeneration', portal: 'Skin & Hair', href: '/programs/skin-regeneration' },
  hair: { id: 'hair', name: 'Hair Restoration', portal: 'Hair Restoration', href: '/programs/hair-restoration' },
  bloods: { id: 'bloods', name: 'Comprehensive Blood Tests', portal: 'Comprehensive Blood Tests', href: '/programs/pathology' },
}

export type Outcome = 'programs' | 'stop'
export type StopReason = 'under18' | 'pregnant'

export interface QuizResult {
  outcome: Outcome
  stopReason?: StopReason
  /** A red flag or contraindication was ticked: show "See a doctor first" on top. */
  doctorFirst: boolean
  /** Plain-English reasons for the doctor-first note, in the order ticked. */
  doctorFirstReasons: string[]
  primary: ProgramId
  secondary: ProgramId[]
  /** Short slugs for the portal notes (never shown as a program name). */
  notes: string[]
}

const REASON: Record<string, string> = {
  newdx: 'You mentioned a new diagnosis. Your doctor needs the details before anything is planned.',
  heart: 'You mentioned a heart problem. That is assessed first, in person if your doctor needs to.',
  prostate: 'You mentioned a prostate problem or a cancer diagnosis. A doctor reviews that before any program.',
  cancer: 'You mentioned a breast cancer diagnosis. A doctor reviews that before any program.',
  baby: 'You are trying for a baby. Some programs are not suitable while you are, so your doctor talks that through first.',
  tear: 'A sudden tear or pop needs an in-person examination before anything else.',
  patchy: 'Patchy or sudden hair loss needs a doctor to look at the scalp first.',
  mole: 'A spot or mole that has changed needs a skin check before anything cosmetic.',
  pain: 'Pain, curvature or a change in shape needs a doctor to examine first.',
  memory: 'Memory changes should be looked into properly rather than put down to age.',
}

/** Symptoms the guide lists as refer-first. */
const RED_FLAG_SYMPTOMS = new Set(['tear', 'patchy', 'mole', 'pain', 'memory'])

const has = (list: string[], ...ids: string[]) => ids.some(id => list.includes(id))
const count = (list: string[], ...ids: string[]) => ids.filter(id => list.includes(id)).length

export function evaluateQuiz(a: QuizAnswers): QuizResult {
  const women = a.sex === 'women'
  const symptoms = a.symptoms ?? []
  const safety = (a.safety ?? []).filter(s => s !== 'none')

  // Hard stops: no program, speak to your GP.
  if (a.age === 'under18') return stop('under18')
  if (women && safety.includes('pregnant')) return stop('pregnant')

  const doctorFirstReasons = [
    ...safety.filter(s => REASON[s]).map(s => REASON[s]),
    ...symptoms.filter(s => RED_FLAG_SYMPTOMS.has(s)).map(s => REASON[s]),
  ]
  const doctorFirst = doctorFirstReasons.length > 0

  // Hormone care is ruled out for men with a prostate or cancer history and for
  // men who want children (the guide's contraindications). Never for women
  // here: their hormone, cycle and energy concerns go to the women's panel first.
  const hormoneOut = women || has(safety, 'prostate', 'cancer', 'baby')
  const hormoneOr = (fallback: ProgramId): ProgramId => (hormoneOut ? fallback : 'hormone')

  let primary: ProgramId = 'bloods'
  let secondary: ProgramId[] = []
  const notes: string[] = []

  switch (a.goal) {
    case 'energy': {
      if (women) {
        primary = 'bloods'
        if (has(symptoms, 'cycle', 'flushes', 'libido', 'mood', 'tired')) secondary.push('hormone')
        if (has(symptoms, 'libido')) secondary.push('sexual')
      } else {
        // Men: symptoms AND bloods. With no symptom ticked there is no basis for
        // a hormone program, so the panel leads.
        const symptomatic = has(symptoms, 'tired', 'drive', 'libido', 'muscle', 'mood')
        primary = symptomatic ? hormoneOr('bloods') : 'bloods'
        if (has(symptoms, 'weightup')) secondary.push('weight')
        if (has(symptoms, 'libido')) secondary.push('sexual')
        if (primary === 'bloods' && symptomatic && !hormoneOut) secondary.push('hormone')
      }
      break
    }
    case 'weight': {
      primary = 'weight'
      if (has(symptoms, 'famhx', 'snoring')) secondary.push('longevity')
      if (has(symptoms, 'snoring')) notes.push('sleep')
      break
    }
    case 'recovery': {
      const injury = count(symptoms, 'slowheal', 'flare', 'tear')
      const training = count(symptoms, 'slowrecover', 'plateau', 'sore')
      if (injury === 0 && training === 0) {
        // "Performance" with no training or recovery reason is not a program.
        primary = 'bloods'
      } else if (injury >= training) {
        primary = 'injury'
        if (training > 0) secondary.push('performance')
      } else {
        primary = 'performance'
        if (injury > 0) secondary.push('injury')
      }
      break
    }
    case 'hairskin': {
      const hair = count(symptoms, 'temples', 'shedding', 'patchy')
      const skin = count(symptoms, 'acne', 'sun', 'mole')
      if (hair === 0 && skin === 0) {
        primary = 'bloods'
        secondary.push(women ? 'skin' : 'hair', women ? 'hair' : 'skin')
      } else if (women && hair > 0) {
        // Women's hair loss goes to the women's panel first.
        primary = 'bloods'
        secondary.push('hair')
        if (skin > 0) secondary.push('skin')
      } else if (hair >= skin) {
        primary = 'hair'
        if (skin > 0) secondary.push('skin')
      } else {
        primary = 'skin'
        if (hair > 0) secondary.push('hair')
      }
      break
    }
    case 'longevity': {
      primary = 'longevity'
      if (has(symptoms, 'focus')) notes.push('cognitive')
      if (has(symptoms, 'energy') && !women) secondary.push(hormoneOr('bloods'))
      break
    }
    case 'sexual': {
      if (women) {
        primary = 'bloods'
        secondary.push('sexual')
      } else {
        primary = 'sexual'
        // Interest and morning erections together are the pattern the guide
        // says to investigate with bloods, so hormone care sits alongside.
        if (has(symptoms, 'libido', 'morning') && !hormoneOut) secondary.push('hormone')
      }
      break
    }
    case 'mind': {
      // Cognitive health is not a site program. It folds into Longevity, or
      // Hormone for men with drive, mood or focus symptoms, with the note carried.
      notes.push('cognitive')
      const hormonal = has(symptoms, 'fog', 'mood', 'drive')
      if (women) {
        primary = 'bloods'
        secondary.push('longevity')
      } else if (hormonal) {
        primary = hormoneOr('longevity')
        secondary.push(primary === 'hormone' ? 'longevity' : 'bloods')
      } else {
        primary = has(symptoms, 'sleep', 'snoring', 'memory') ? 'bloods' : 'longevity'
        if (primary === 'bloods') secondary.push('longevity')
      }
      if (has(symptoms, 'sleep', 'snoring')) notes.push('sleep')
      break
    }
    case 'unsure':
    default: {
      primary = 'bloods'
      if (has(symptoms, 'weightup')) secondary.push('weight')
      if (has(symptoms, 'niggles')) secondary.push('injury')
      if (has(symptoms, 'mood')) notes.push('cognitive')
      break
    }
  }

  // Never list the primary twice, never more than two secondaries, never bloods
  // as a secondary when it is already the first step for everyone.
  secondary = secondary.filter((p, i, arr) => p !== primary && p !== 'bloods' && arr.indexOf(p) === i).slice(0, 2)

  return { outcome: 'programs', doctorFirst, doctorFirstReasons, primary, secondary, notes }
}

function stop(stopReason: StopReason): QuizResult {
  return { outcome: 'stop', stopReason, doctorFirst: false, doctorFirstReasons: [], primary: 'bloods', secondary: [], notes: [] }
}

/** The ?programs= value the portal reads: primary first, then secondaries. */
export function portalPrograms(r: QuizResult): string[] {
  if (r.outcome === 'stop') return []
  return [r.primary, ...r.secondary].map(id => PROGRAMS[id].portal)
}

/** One line under each program name. Never an outcome, never a diagnosis. */
export function whyLine(id: ProgramId, sex: Sex | '', primary: boolean): string {
  const women = sex === 'women'
  switch (id) {
    case 'hormone':
      return women
        ? 'Cycle, energy and mood are looked at together by a doctor, once the panel is back.'
        : 'Tiredness, low drive and changes in mood are the symptoms this program investigates. It starts with a blood panel, read by a doctor, before anything is decided.'
    case 'weight':
      return 'A doctor-led look at weight and metabolic health. It starts with your bloods, not a prescription.'
    case 'sexual':
      return 'Treated as a medical question, with the heart and metabolic checks that go with it.'
    case 'injury':
      return 'Rehabilitation-first care for injuries that are slow to settle, with a doctor reviewing the whole picture.'
    case 'performance':
      return 'For people who train and want recovery and output looked at properly, starting with bloods.'
    case 'longevity':
      return 'A baseline panel and a risk review for people who want to stay well, not just treat what is wrong.'
    case 'skin':
      return 'Skin concerns assessed as a medical question, with the panel first.'
    case 'hair':
      return 'A doctor assesses the pattern of hair loss and your bloods before anything is suggested.'
    case 'bloods':
      if (women) return 'The women’s panel comes first. It looks at energy, cycle and the systems behind them, and a doctor reads it with you.'
      return primary
        ? 'One panel, read by a doctor, is the right first step when the picture is not yet clear.'
        : 'One panel, read by a doctor.'
  }
}
