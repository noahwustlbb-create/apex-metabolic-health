'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────

type ProgramKey = 'hormone' | 'metabolic' | 'performance' | 'hair' | 'skin' | 'injury' | 'bloodpanel' | 'general'
type Scores = Record<ProgramKey, number>

type Screen =
  | 'intro'
  | 'goal'
  | 'symptoms'
  | 'duration'
  | 'training'
  | 'age'
  | 'conditions'
  | 'readiness'
  | 'analysing'
  | 'capture'
  | 'results'

// ─── Program Registry ─────────────────────────────────────────────────────────

const PROGRAMS: Record<ProgramKey, { name: string; desc: string; href: string; cta: string; color: string; glow: string }> = {
  hormone: {
    name: 'Hormone Optimisation',
    desc: 'Clinically-guided hormone restoration for men experiencing testosterone decline, fatigue, reduced drive, and loss of performance. Our AHPRA-registered doctors conduct a full hormonal panel before designing your personalised protocol.',
    href: '/intake/hormone',
    cta: 'Begin Hormone Assessment',
    color: '#3575C6',
    glow: 'rgba(53,117,198,0.22)',
  },
  metabolic: {
    name: 'Metabolic Weight Management',
    desc: 'Evidence-based protocols targeting insulin resistance, body composition, and the root drivers of stubborn weight gain. Doctor-led, data-driven, and built for long-term metabolic health.',
    href: '/intake/general',
    cta: 'Begin Metabolic Assessment',
    color: '#7c52e8',
    glow: 'rgba(124,82,232,0.22)',
  },
  performance: {
    name: 'Performance & Recovery',
    desc: 'Advanced protocols for men who train hard and want to break through plateaus, recover faster, and sustain peak output. Includes clinical review of recovery markers and performance biomarkers.',
    href: '/intake/general',
    cta: 'Begin Performance Assessment',
    color: '#e8872c',
    glow: 'rgba(232,135,44,0.22)',
  },
  hair: {
    name: 'Hair Restoration',
    desc: 'Doctor-prescribed treatment addressing the hormonal and genetic drivers of male pattern hair loss. Our clinical approach targets the underlying cause, not just the symptom.',
    href: '/intake/general',
    cta: 'Begin Hair Assessment',
    color: '#2e9e52',
    glow: 'rgba(46,158,82,0.22)',
  },
  skin: {
    name: 'Skin Regeneration',
    desc: 'Clinical skin protocols combining advanced diagnostics with evidence-based regenerative treatments. Designed for men seeking measurable, medically-supported skin improvement.',
    href: '/intake/general',
    cta: 'Begin Skin Assessment',
    color: '#c9a84c',
    glow: 'rgba(201,168,76,0.22)',
  },
  injury: {
    name: 'Injury Repair & Recovery',
    desc: 'Targeted clinical protocols for acute and chronic musculoskeletal injuries. Combines advanced regenerative approaches with doctor oversight to accelerate tissue repair and restore function.',
    href: '/intake/general',
    cta: 'Begin Injury Assessment',
    color: '#1a9e8f',
    glow: 'rgba(26,158,143,0.22)',
  },
  bloodpanel: {
    name: 'Comprehensive Blood Panel',
    desc: 'A thorough baseline assessment covering hormonal, metabolic, cardiovascular, and inflammatory markers. The smartest starting point before any clinical program — full clinical review included.',
    href: '/order-bloods',
    cta: 'Order Blood Panel',
    color: '#00c2b8',
    glow: 'rgba(0,194,184,0.22)',
  },
  general: {
    name: 'General Telehealth',
    desc: 'A direct consultation with one of our AHPRA-registered doctors. Discuss your health concerns, review existing results, and receive a personalised clinical plan — all online, Australia-wide.',
    href: '/intake/general',
    cta: 'Book a Consultation',
    color: '#8899aa',
    glow: 'rgba(136,153,170,0.22)',
  },
}

// ─── Scoring Engine ───────────────────────────────────────────────────────────

function emptyScores(): Scores {
  return { hormone: 0, metabolic: 0, performance: 0, hair: 0, skin: 0, injury: 0, bloodpanel: 0, general: 0 }
}

function addWeights(scores: Scores, weights: Partial<Scores>): Scores {
  const next = { ...scores }
  for (const [k, v] of Object.entries(weights) as [ProgramKey, number][]) {
    next[k] = (next[k] ?? 0) + v
  }
  return next
}

const GOAL_WEIGHTS: Record<string, Partial<Scores>> = {
  energy:      { hormone: 3, metabolic: 2, performance: 1 },
  weight:      { metabolic: 3, hormone: 2 },
  performance: { performance: 3, hormone: 2 },
  recovery:    { performance: 3, injury: 2, hormone: 1 },
  hair:        { hair: 4, hormone: 1 },
  skin:        { skin: 4 },
  injury:      { injury: 4, performance: 1 },
  health:      { bloodpanel: 3, general: 2 },
}

const SYMPTOM_WEIGHTS: Record<string, Partial<Scores>> = {
  low_energy:   { hormone: 3, metabolic: 2, performance: 1 },
  brain_fog:    { hormone: 2, metabolic: 2 },
  weight_gain:  { metabolic: 3, hormone: 2 },
  poor_recovery:{ performance: 3, hormone: 2 },
  low_libido:   { hormone: 4 },
  mood:         { hormone: 2, metabolic: 1 },
  sleep:        { hormone: 2, performance: 1, metabolic: 1 },
  hair_loss:    { hair: 4, hormone: 1 },
  skin_issues:  { skin: 4 },
  joint_pain:   { injury: 4, performance: 1 },
  strength:     { performance: 3, hormone: 2 },
  none:         { bloodpanel: 2, general: 2 },
}

const DURATION_WEIGHTS: Record<string, Partial<Scores>> = {
  recent:   { general: 1, bloodpanel: 1 },
  months:   { hormone: 1, metabolic: 1 },
  years:    { hormone: 2, metabolic: 1 },
  longterm: { hormone: 3, metabolic: 2 },
}

const TRAINING_WEIGHTS: Record<string, Partial<Scores>> = {
  none:     { metabolic: 1, general: 1 },
  light:    { hormone: 1, performance: 1 },
  moderate: { performance: 2, hormone: 1 },
  heavy:    { performance: 3, injury: 1 },
}

const AGE_WEIGHTS: Record<string, Partial<Scores>> = {
  '18-25': { performance: 1, general: 1 },
  '26-35': { hormone: 2, metabolic: 1, performance: 1 },
  '36-45': { hormone: 3, metabolic: 2 },
  '46-55': { hormone: 3, metabolic: 2, bloodpanel: 1 },
  '56+':   { hormone: 2, metabolic: 2, bloodpanel: 2 },
}

const CONDITION_WEIGHTS: Record<string, Partial<Scores>> = {
  diabetes:    { metabolic: 3 },
  thyroid:     { hormone: 2, metabolic: 1 },
  heart:       { bloodpanel: 2, general: 2 },
  autoimmune:  { general: 2, bloodpanel: 1 },
  none:        {},
}

const READINESS_WEIGHTS: Record<string, Partial<Scores>> = {
  now:       { hormone: 1, metabolic: 1, performance: 1 },
  soon:      {},
  exploring: { bloodpanel: 1, general: 1 },
}

function computeScores(answers: Answers): Scores {
  let s = emptyScores()
  if (answers.goal)        s = addWeights(s, GOAL_WEIGHTS[answers.goal] ?? {})
  for (const sym of answers.symptoms) s = addWeights(s, SYMPTOM_WEIGHTS[sym] ?? {})
  if (answers.duration)    s = addWeights(s, DURATION_WEIGHTS[answers.duration] ?? {})
  if (answers.training)    s = addWeights(s, TRAINING_WEIGHTS[answers.training] ?? {})
  if (answers.age)         s = addWeights(s, AGE_WEIGHTS[answers.age] ?? {})
  for (const cond of answers.conditions) s = addWeights(s, CONDITION_WEIGHTS[cond] ?? {})
  if (answers.readiness)   s = addWeights(s, READINESS_WEIGHTS[answers.readiness] ?? {})
  return s
}

function rankPrograms(scores: Scores): ProgramKey[] {
  return (Object.keys(scores) as ProgramKey[]).sort((a, b) => scores[b] - scores[a])
}

// ─── Quiz Data ────────────────────────────────────────────────────────────────

interface Answers {
  goal: string
  symptoms: string[]
  duration: string
  training: string
  age: string
  conditions: string[]
  readiness: string
}

const GOAL_OPTIONS = [
  { value: 'energy',      label: 'Energy & Vitality',    sub: 'Combat fatigue and low drive' },
  { value: 'weight',      label: 'Weight Management',    sub: 'Lose fat, improve metabolism' },
  { value: 'performance', label: 'Peak Performance',     sub: 'Strength, endurance, output' },
  { value: 'recovery',    label: 'Recovery & Repair',    sub: 'Train harder, recover faster' },
  { value: 'hair',        label: 'Hair Restoration',     sub: 'Address hair loss at its root' },
  { value: 'skin',        label: 'Skin Regeneration',    sub: 'Clinical skin improvement' },
  { value: 'injury',      label: 'Injury Recovery',      sub: 'Heal faster, return to form' },
  { value: 'health',      label: 'Health Baseline',      sub: 'Know your numbers, optimise' },
]

const SYMPTOM_OPTIONS = [
  { value: 'low_energy',    label: 'Persistent fatigue' },
  { value: 'brain_fog',     label: 'Brain fog or poor focus' },
  { value: 'weight_gain',   label: 'Unexplained weight gain' },
  { value: 'poor_recovery', label: 'Slow post-exercise recovery' },
  { value: 'low_libido',    label: 'Reduced libido or drive' },
  { value: 'mood',          label: 'Mood changes or irritability' },
  { value: 'sleep',         label: 'Poor sleep quality' },
  { value: 'hair_loss',     label: 'Hair thinning or loss' },
  { value: 'skin_issues',   label: 'Skin concerns' },
  { value: 'joint_pain',    label: 'Joint or muscle pain' },
  { value: 'strength',      label: 'Declining strength' },
  { value: 'none',          label: 'None of the above' },
]

const DURATION_OPTIONS = [
  { value: 'recent',   label: 'Recently started',   sub: 'Past few weeks' },
  { value: 'months',   label: 'Several months',     sub: '3–12 months' },
  { value: 'years',    label: 'A year or more',     sub: '1–3 years' },
  { value: 'longterm', label: 'Long-term issue',    sub: 'More than 3 years' },
]

const TRAINING_OPTIONS = [
  { value: 'none',     label: 'Not currently training', sub: 'Sedentary or minimal activity' },
  { value: 'light',    label: '1–2 times per week',     sub: 'Light activity or walks' },
  { value: 'moderate', label: '3–4 times per week',     sub: 'Regular structured training' },
  { value: 'heavy',    label: '5+ times per week',      sub: 'High-frequency or elite training' },
]

const AGE_OPTIONS = [
  { value: '18-25', label: '18 – 25' },
  { value: '26-35', label: '26 – 35' },
  { value: '36-45', label: '36 – 45' },
  { value: '46-55', label: '46 – 55' },
  { value: '56+',   label: '56 +' },
]

const CONDITION_OPTIONS = [
  { value: 'diabetes',   label: 'Diabetes or pre-diabetes' },
  { value: 'thyroid',    label: 'Thyroid condition' },
  { value: 'heart',      label: 'Cardiovascular condition' },
  { value: 'autoimmune', label: 'Autoimmune condition' },
  { value: 'none',       label: 'None of the above' },
]

const READINESS_OPTIONS = [
  { value: 'now',       label: 'Ready to start now',         sub: 'I want to book within the week' },
  { value: 'soon',      label: 'Ready in the next month',    sub: 'Doing research, nearly decided' },
  { value: 'exploring', label: 'Still exploring options',    sub: 'Want to understand more first' },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

function slideVariants(direction: number) {
  return {
    initial:  { opacity: 0, x: direction * 40 },
    animate:  { opacity: 1, x: 0 },
    exit:     { opacity: 0, x: direction * -40 },
  }
}

const TRANSITION = { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

// ─── Sub-components ───────────────────────────────────────────────────────────

function OptionCard({
  selected,
  onClick,
  children,
  className = '',
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl px-5 py-4 transition-all duration-200 relative ${className}`}
      style={{
        background: selected ? 'rgba(0,194,184,0.08)' : 'var(--surface)',
        border: `1px solid ${selected ? 'rgba(0,194,184,0.5)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: selected ? '0 0 0 1px rgba(0,194,184,0.2)' : 'none',
      }}
    >
      {selected && (
        <span
          className="absolute top-3.5 right-4 flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: 'var(--teal)' }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#070a0d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
      {children}
    </button>
  )
}

function PillOption({
  selected,
  onClick,
  label,
}: {
  selected: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
      style={{
        background: selected ? 'rgba(0,194,184,0.1)' : 'var(--surface)',
        border: `1px solid ${selected ? 'rgba(0,194,184,0.5)' : 'rgba(255,255,255,0.06)'}`,
        color: selected ? 'var(--teal)' : 'var(--text-secondary)',
      }}
    >
      {label}
    </button>
  )
}

function ProgressBar({ step }: { step: number }) {
  const total = 7
  const pct = step < 1 ? 0 : Math.min((step / total) * 100, 100)
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{ top: 80, height: 2, background: 'var(--border)' }}
    >
      <motion.div
        className="h-full"
        style={{ background: 'var(--teal)' }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function StepHeader({
  step,
  onBack,
}: {
  step: number
  onBack: () => void
}) {
  return (
    <div
      className="fixed left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10"
      style={{ top: 84, height: 44, background: 'transparent' }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-medium transition-colors"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>
      <span
        className="text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}
      >
        Step {step} of 7 — Eligibility Assessment
      </span>
      <div style={{ width: 52 }} />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HealthQuiz() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Answers>({
    goal: '',
    symptoms: [],
    duration: '',
    training: '',
    age: '',
    conditions: [],
    readiness: '',
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [analysingLine, setAnalysingLine] = useState(0)
  const [rankedPrograms, setRankedPrograms] = useState<ProgramKey[]>([])

  const SCREEN_ORDER: Screen[] = [
    'intro', 'goal', 'symptoms', 'duration', 'training', 'age', 'conditions', 'readiness', 'analysing', 'capture', 'results',
  ]

  const stepNumber: Record<Screen, number> = {
    intro: 0, goal: 1, symptoms: 2, duration: 3, training: 4, age: 5, conditions: 6, readiness: 7,
    analysing: 0, capture: 0, results: 0,
  }

  function advance(to: Screen) {
    setDirection(1)
    setScreen(to)
  }

  function goBack() {
    const idx = SCREEN_ORDER.indexOf(screen)
    if (idx <= 0) return
    setDirection(-1)
    setScreen(SCREEN_ORDER[idx - 1])
  }

  // Analysing screen auto-advance
  useEffect(() => {
    if (screen !== 'analysing') return
    const scores = computeScores(answers)
    const ranked = rankPrograms(scores)
    setRankedPrograms(ranked)

    const t1 = setTimeout(() => setAnalysingLine(1), 600)
    const t2 = setTimeout(() => setAnalysingLine(2), 1400)
    const t3 = setTimeout(() => {
      setDirection(1)
      setScreen('capture')
    }, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [screen]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleCapture(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSubmitting(true)

    const topPrograms = rankedPrograms.slice(0, 3).map(k => PROGRAMS[k].name).join(', ')

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
          subject: `Quiz Lead — ${topPrograms}`,
          from_name: name,
          email,
          message: JSON.stringify({ ...answers, matched_programs: topPrograms }, null, 2),
        }),
      })
    } catch (_) {
      // fail silently — still advance to results
    }

    setSubmitting(false)
    advance('results')
  }

  const variants = slideVariants(direction)
  const showStep = stepNumber[screen] > 0

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Nav />
      {showStep && <ProgressBar step={stepNumber[screen]} />}
      {showStep && <StepHeader step={stepNumber[screen]} onBack={goBack} />}

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {/* ── INTRO ─────────────────────────────────────────────────────── */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden"
            >
              {/* Background glows */}
              <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
              <div aria-hidden className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,194,184,0.07) 0%, transparent 60%)' }} />
              <div aria-hidden className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(0,194,184,0.07) 0%, transparent 55%)' }} />

              <div className="container-tight relative z-10 text-center py-24">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ...TRANSITION }}
                >
                  <span className="label inline-block mb-6">Performance Health Assessment</span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, ...TRANSITION }}
                >
                  Find Your{' '}
                  <span className="text-teal-gradient">Clinical Program</span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-4"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, ...TRANSITION }}
                >
                  A doctor-curated health assessment that matches your symptoms, goals, and lifestyle to the right clinical program.
                </motion.p>

                <motion.p
                  className="text-sm mb-10"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, ...TRANSITION }}
                >
                  Checking your eligibility for Apex clinical programs
                </motion.p>

                {/* Stats row */}
                <motion.div
                  className="flex items-center justify-center gap-8 mb-12"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, ...TRANSITION }}
                >
                  {[
                    { val: '7', label: 'Questions' },
                    { val: '< 2', label: 'Minutes' },
                    { val: '8', label: 'Programs' },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <div
                        className="text-2xl font-bold"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--teal)' }}
                      >
                        {val}
                      </div>
                      <div className="text-xs tracking-widest uppercase mt-0.5"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, ...TRANSITION }}
                >
                  <button
                    type="button"
                    onClick={() => advance('goal')}
                    className="btn-teal text-base px-10 py-4"
                  >
                    Begin Assessment
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ── GOAL ──────────────────────────────────────────────────────── */}
          {screen === 'goal' && (
            <motion.div
              key="goal"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    What's your primary goal?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select one — we'll tailor your program match</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {GOAL_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.goal === opt.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, goal: opt.value }))
                        setTimeout(() => advance('symptoms'), 180)
                      }}
                    >
                      <div
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {opt.label}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{opt.sub}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── SYMPTOMS ──────────────────────────────────────────────────── */}
          {screen === 'symptoms' && (
            <motion.div
              key="symptoms"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Which of these do you experience?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select all that apply</p>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto mb-10">
                  {SYMPTOM_OPTIONS.map(opt => (
                    <PillOption
                      key={opt.value}
                      label={opt.label}
                      selected={answers.symptoms.includes(opt.value)}
                      onClick={() => {
                        setAnswers(a => {
                          if (opt.value === 'none') {
                            return { ...a, symptoms: a.symptoms.includes('none') ? [] : ['none'] }
                          }
                          const without = a.symptoms.filter(s => s !== 'none')
                          return {
                            ...a,
                            symptoms: without.includes(opt.value)
                              ? without.filter(s => s !== opt.value)
                              : [...without, opt.value],
                          }
                        })
                      }}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="btn-teal w-full max-w-sm"
                    disabled={answers.symptoms.length === 0}
                    style={{ opacity: answers.symptoms.length === 0 ? 0.4 : 1 }}
                    onClick={() => advance('duration')}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DURATION ──────────────────────────────────────────────────── */}
          {screen === 'duration' && (
            <motion.div
              key="duration"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    How long have you felt this way?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Helps us calibrate your program priority</p>
                </div>

                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  {DURATION_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.duration === opt.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, duration: opt.value }))
                        setTimeout(() => advance('training'), 180)
                      }}
                    >
                      <div className="flex items-center justify-between pr-6">
                        <div>
                          <div
                            className="font-semibold text-sm"
                            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {opt.label}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{opt.sub}</div>
                        </div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TRAINING ──────────────────────────────────────────────────── */}
          {screen === 'training' && (
            <motion.div
              key="training"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    How often do you train?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Structured exercise and physical activity</p>
                </div>

                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  {TRAINING_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.training === opt.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, training: opt.value }))
                        setTimeout(() => advance('age'), 180)
                      }}
                    >
                      <div className="pr-6">
                        <div
                          className="font-semibold text-sm"
                          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{opt.sub}</div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── AGE ───────────────────────────────────────────────────────── */}
          {screen === 'age' && (
            <motion.div
              key="age"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    What is your age range?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Hormonal and metabolic profiles vary significantly by decade</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                  {AGE_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.age === opt.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, age: opt.value }))
                        setTimeout(() => advance('conditions'), 180)
                      }}
                    >
                      <div
                        className="font-bold text-base text-center py-1 pr-4"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {opt.label}
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── CONDITIONS ────────────────────────────────────────────────── */}
          {screen === 'conditions' && (
            <motion.div
              key="conditions"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Any existing conditions?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Select all that apply — this helps our doctors prioritise safely</p>
                </div>

                <div className="flex flex-col gap-3 max-w-md mx-auto mb-10">
                  {CONDITION_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.conditions.includes(opt.value)}
                      onClick={() => {
                        setAnswers(a => {
                          if (opt.value === 'none') {
                            return { ...a, conditions: a.conditions.includes('none') ? [] : ['none'] }
                          }
                          const without = a.conditions.filter(c => c !== 'none')
                          return {
                            ...a,
                            conditions: without.includes(opt.value)
                              ? without.filter(c => c !== opt.value)
                              : [...without, opt.value],
                          }
                        })
                      }}
                    >
                      <div
                        className="font-medium text-sm pr-6"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
                      >
                        {opt.label}
                      </div>
                    </OptionCard>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="btn-teal w-full max-w-sm"
                    disabled={answers.conditions.length === 0}
                    style={{ opacity: answers.conditions.length === 0 ? 0.4 : 1 }}
                    onClick={() => advance('readiness')}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── READINESS ─────────────────────────────────────────────────── */}
          {screen === 'readiness' && (
            <motion.div
              key="readiness"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] pt-28 pb-16"
            >
              <div className="container-tight w-full">
                <div className="text-center mb-10">
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    How ready are you to take action?
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No pressure — just helps us tailor your recommendation</p>
                </div>

                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  {READINESS_OPTIONS.map(opt => (
                    <OptionCard
                      key={opt.value}
                      selected={answers.readiness === opt.value}
                      onClick={() => {
                        setAnswers(a => ({ ...a, readiness: opt.value }))
                        setTimeout(() => advance('analysing'), 180)
                      }}
                    >
                      <div className="pr-6">
                        <div
                          className="font-semibold text-sm"
                          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{opt.sub}</div>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── ANALYSING ─────────────────────────────────────────────────── */}
          {screen === 'analysing' && (
            <motion.div
              key="analysing"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]"
            >
              <div className="text-center">
                {/* Pulsing teal dot cluster */}
                <div className="flex items-center justify-center gap-2 mb-10">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="rounded-full"
                      style={{ width: i === 1 ? 16 : 10, height: i === 1 ? 16 : 10, background: 'var(--teal)' }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    />
                  ))}
                </div>

                <AnimatePresence>
                  {analysingLine >= 1 && (
                    <motion.p
                      key="line1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={TRANSITION}
                      className="text-xl font-semibold mb-3"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Analysing your health profile...
                    </motion.p>
                  )}
                  {analysingLine >= 2 && (
                    <motion.p
                      key="line2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={TRANSITION}
                      className="text-sm"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                    >
                      Matching you to clinical programs...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── CAPTURE ───────────────────────────────────────────────────── */}
          {screen === 'capture' && (
            <motion.div
              key="capture"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] py-16 relative overflow-hidden"
            >
              <div aria-hidden className="absolute inset-0 dot-grid opacity-20" />
              <div aria-hidden className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,194,184,0.06) 0%, transparent 60%)' }} />

              <div className="container-tight relative z-10 max-w-md mx-auto w-full">
                <div
                  className="rounded-2xl p-8 md:p-10"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(0,194,184,0.2)',
                    boxShadow: '0 0 60px rgba(0,194,184,0.08)',
                  }}
                >
                  <div className="text-center mb-8">
                    <span className="label inline-block mb-4">Eligibility Confirmed</span>
                    <h2
                      className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                    >
                      Your personalised protocol is ready
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Enter your details to unlock your matched clinical programs and receive a summary from our clinical team.
                    </p>
                  </div>

                  <form onSubmit={handleCapture} className="flex flex-col gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{
                          background: 'var(--elevated)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-inter)',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,194,184,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,194,184,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-widest uppercase mb-2"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200"
                        style={{
                          background: 'var(--elevated)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-inter)',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(0,194,184,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,194,184,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !name.trim() || !email.trim()}
                      className="btn-teal w-full mt-2"
                      style={{ opacity: (submitting || !name.trim() || !email.trim()) ? 0.5 : 1 }}
                    >
                      {submitting ? 'Unlocking...' : 'Unlock My Results'}
                    </button>
                  </form>

                  <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                    No spam. Reviewed by our clinical team.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── RESULTS ───────────────────────────────────────────────────── */}
          {screen === 'results' && (
            <motion.div
              key="results"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={TRANSITION}
              className="flex-1 py-16 md:py-24 relative overflow-hidden"
            >
              <div aria-hidden className="absolute inset-0 dot-grid opacity-20" />
              <div aria-hidden className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,194,184,0.06) 0%, transparent 60%)' }} />

              <div className="container-tight relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                  <span className="label inline-block mb-4">Clinical Match Confirmed</span>
                  <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Your Program{' '}
                    <span className="text-teal-gradient">Recommendations</span>
                  </h2>
                  {name && (
                    <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                      Based on your assessment, {name.split(' ')[0]}, here's what our clinical team recommends.
                    </p>
                  )}
                </div>

                {/* Primary match */}
                {rankedPrograms.length > 0 && (() => {
                  const key = rankedPrograms[0]
                  const prog = PROGRAMS[key]
                  return (
                    <motion.div
                      className="mb-6 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, ...TRANSITION }}
                      style={{
                        background: 'var(--surface)',
                        border: `1px solid ${prog.color}44`,
                        boxShadow: `0 0 40px ${prog.glow}, 0 0 0 1px ${prog.color}22`,
                      }}
                    >
                      {/* Colored top bar */}
                      <div style={{ height: 4, background: prog.color, width: '100%' }} />

                      <div className="p-8 md:p-10">
                        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                          <div>
                            <span
                              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-sm mb-3"
                              style={{ background: `${prog.color}18`, color: prog.color, fontFamily: 'var(--font-space-grotesk)' }}
                            >
                              Primary Match
                            </span>
                            <h3
                              className="text-2xl md:text-3xl font-bold tracking-tight"
                              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                            >
                              {prog.name}
                            </h3>
                          </div>
                        </div>

                        <p
                          className="text-base leading-relaxed mb-8 max-w-2xl"
                          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                        >
                          {prog.desc}
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <a
                            href={prog.href}
                            className="btn-teal"
                          >
                            {prog.cta}
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                              <path d="M5.5 10.5L9 7L5.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Limited consultation availability</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })()}

                {/* Secondary matches */}
                {rankedPrograms.length > 1 && (
                  <div className="mb-10">
                    <p
                      className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      Also recommended for you
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {rankedPrograms.slice(1, 3).map((key, i) => {
                        const prog = PROGRAMS[key]
                        return (
                          <motion.a
                            href={prog.href}
                            key={key}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08, ...TRANSITION }}
                            className="flex items-center gap-4 rounded-xl p-5 transition-all duration-200 group"
                            style={{
                              background: 'var(--surface)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              textDecoration: 'none',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.borderColor = `${prog.color}55`
                              ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${prog.glow}`
                            }}
                            onMouseLeave={e => {
                              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                            }}
                          >
                            <div
                              className="w-1 self-stretch rounded-full flex-shrink-0"
                              style={{ background: prog.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div
                                className="font-semibold text-sm mb-1"
                                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}
                              >
                                {prog.name}
                              </div>
                              <div className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                                {prog.desc.split('.')[0]}.
                              </div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                              <path d="M5.5 10.5L9 7L5.5 3.5" stroke="var(--text-secondary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Compliance note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-xl p-5 text-xs leading-relaxed"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  These recommendations are generated based on your self-reported assessment and are not a medical diagnosis. All clinical decisions are made by AHPRA-registered medical practitioners following pathology review. This assessment does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {screen === 'results' && <Footer />}
    </div>
  )
}
