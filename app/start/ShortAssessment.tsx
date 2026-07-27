'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import { useSignupGate } from '@/context/SignupGateContext'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG     = '#f9fafb'
const SURF   = '#ffffff'
const BLUE   = 'var(--blue)'
const TEXT   = '#111827'
const DIM    = '#6b7280'
const BORDER = 'rgba(0,0,0,0.08)'
const ease   = [0.22, 1, 0.36, 1] as const

// ── Treatment picker ───────────────────────────────────────────────────────────
const TREATMENT_PICKS = [
  { id: 'hormone',   label: 'Hormone Optimisation',       sub: 'Energy, testosterone, drive, recovery' },
  { id: 'weight',    label: 'Medical Weight Loss',         sub: 'Doctor-led metabolic management' },
  { id: 'sexual',    label: 'Sexual Health',               sub: 'Libido, performance, confidence' },
  { id: 'recovery',  label: 'Recovery & Injury Repair',    sub: 'Injury repair, performance, mobility' },
  { id: 'longevity', label: 'Anti-Ageing & Longevity',     sub: 'Healthspan, vitality, long-term optimisation' },
  { id: 'skinhair',  label: 'Skin & Hair',                 sub: 'Hair restoration, skin health, anti-ageing' },
  { id: 'bloods',    label: 'Comprehensive Blood Tests',   sub: 'Full-panel diagnostics with doctor review' },
  { id: 'general',   label: 'General Telehealth',          sub: "Not sure yet, but I'd like to speak to a doctor" },
]

// ── Per-treatment configs ──────────────────────────────────────────────────────
interface Config {
  title: string
  q1: string
  opts1: string[]
  q2: string
  opts2: string[]
}

const CONFIGS: Record<string, Config> = {
  hormone: {
    title: 'Hormone Optimisation',
    q1: "What symptom is affecting you most?",
    opts1: [
      'Low energy or fatigue',
      'Reduced libido',
      'Difficulty building muscle',
      'Mood changes or low motivation',
      'Weight gain despite diet and exercise',
      "I'm not sure, I'd like a health check",
    ],
    q2: 'How long have they been experiencing this?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  weight: {
    title: 'Medical Weight Loss',
    q1: "What's the primary goal?",
    opts1: [
      'Lose body fat',
      'Improve metabolic health',
      'Address insulin resistance',
      'Manage a related condition',
      "I'm not sure, guidance needed",
    ],
    q2: 'Have they tried medically supervised weight loss before?',
    opts2: ["No, this is the first time", "Yes, but it didn't stick", "Currently on a treatment that isn't working"],
  },
  sexual: {
    title: 'Sexual Health',
    q1: "What's the main concern?",
    opts1: [
      'Low libido',
      'Erectile dysfunction',
      'Performance and confidence',
      'Hormonal contributors to sexual health',
      "I'm not sure, general assessment",
    ],
    q2: 'How long has this been a concern?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  recovery: {
    title: 'Recovery & Injury Repair',
    q1: "What's the goal?",
    opts1: [
      'Recover from a specific injury',
      'Improve recovery between training sessions',
      'Improve athletic output and performance',
      'Healthy ageing and mobility',
      "I'm not sure, general assessment",
    ],
    q2: 'Which best describes their activity level?',
    opts2: [
      'Competitive or professional athlete',
      'Regular gym-goer',
      'Active lifestyle (non-gym)',
      'Recovering from injury or surgery',
      'Just getting started',
    ],
  },
  longevity: {
    title: 'Anti-Ageing & Longevity',
    q1: "What's the main focus?",
    opts1: [
      'Energy and vitality as they age',
      'Extending healthspan long-term',
      'Physical and cognitive optimisation',
      'Proactive health monitoring and prevention',
      "I'm not sure, a full review is needed",
    ],
    q2: 'How long have these concerns been present?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  skinhair: {
    title: 'Skin & Hair',
    q1: 'What would they like help with?',
    opts1: [
      'Hair loss or thinning',
      'Skin ageing & fine lines',
      'Acne or breakouts',
      'Skin health & complexion',
      "I'm not sure, guidance needed",
    ],
    q2: "What's the main goal?",
    opts2: [
      'Restore hair',
      'Improve skin',
      'Slow the signs of ageing',
      'Build a personalised treatment plan',
    ],
  },
  bloods: {
    title: 'Comprehensive Blood Tests',
    q1: 'What would they like to test for?',
    opts1: [
      'Hormones (testosterone, oestrogen, thyroid)',
      'Metabolic health (glucose, insulin, cholesterol)',
      'Full comprehensive panel',
      'Cardiovascular markers',
      "I'm not sure, recommend a panel",
    ],
    q2: 'When did they last have a blood test?',
    opts2: ['Never', 'More than 2 years ago', 'Within the last 2 years', 'Within the last 6 months'],
  },
  general: {
    title: 'General Telehealth',
    q1: 'How can we help?',
    opts1: [
      "General health",
      "Men's health",
      "Women's health",
      'Preventative care',
      'Prescription or medication management',
      'Other',
    ],
    q2: "What best describes the situation?",
    opts2: [
      'First time seeking specialist help',
      'Follow-up or ongoing care',
      'Second opinion',
      "Not sure, I just need to speak to a doctor",
    ],
  },
}

// ── Self versions of Q2 (duration) ────────────────────────────────────────────
const SELF_Q2_OVERRIDES: Partial<Record<string, string>> = {
  hormone:   'How long have you been experiencing this?',
  weight:    'Have you tried medically supervised weight loss before?',
  sexual:    'How long has this been a concern?',
  recovery:  'Which best describes your activity level?',
  longevity: 'How long have these concerns been on your mind?',
  skinhair:  "What's your main goal?",
  bloods:    'When did you last have a blood test?',
  general:   'What best describes your situation?',
}
const SELF_Q1_OVERRIDES: Partial<Record<string, string>> = {
  hormone:   'What symptom is affecting you most?',
  weight:    "What's your primary goal?",
  sexual:    "What's your main concern?",
  recovery:  "What's your goal?",
  longevity: "What's your main focus?",
  skinhair:  'What would you like help with?',
  bloods:    'What would you like to test for?',
  general:   'How can we help you today?',
}

// ── Universal Q3 ───────────────────────────────────────────────────────────────
const Q3_SELF = {
  question: "What's held you back from getting answers before now?",
  options: [
    "I was told my results were 'normal' by a GP",
    "I didn't know where to start",
    "Previous options felt generic or dismissive",
    "I'm just starting to explore my options",
    "Nothing, I'm ready to move forward",
  ],
}

const Q3_CAREGIVER = {
  question: "Does the person you're helping know you're looking into this for them?",
  options: [
    "Yes, they've asked me to help manage this",
    "Yes, and they're willing to consent to treatment",
    "I'm researching options before speaking to them",
    "They have difficulty managing healthcare themselves",
  ],
}

// ── Q0 - who is this for? ──────────────────────────────────────────────────────
const Q0_OPTIONS = [
  {
    id: 'self',
    label: 'Myself',
    sub: "I'm looking into a treatment for my own health",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke={BLUE} strokeWidth="1.6" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'caregiver',
    label: 'Someone I care for',
    sub: 'A parent, partner, or family member I help manage care for',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
        <circle cx="9" cy="7" r="3.5" stroke={BLUE} strokeWidth="1.6" />
        <path d="M2 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="18" cy="8" r="2.5" stroke={BLUE} strokeWidth="1.4" />
        <path d="M22 19c0-2.5-1.8-4.5-4-4.5" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

type Phase = 'intro' | 'q0' | 'pick' | 'q1' | 'q2' | 'q3' | 'eligible'

// ── Intro splash ───────────────────────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight: 'calc(100vh - 96px)', padding: '40px 20px' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(72,144,247,0.07) 0%, transparent 60%)' }}
      />
      <div className="relative z-10 max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full mb-10"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}
        >
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 12 12" fill="#f59e0b" className="w-3 h-3">
                <path d="M6 1l1.3 2.6H10L7.9 5.2l.8 2.8L6 6.5 3.3 8l.8-2.8L2 3.6h2.7L6 1z" />
              </svg>
            ))}
          </span>
          <span className="text-[12px] font-semibold" style={{ color: '#374151' }}>Trusted by 2,400+ Australians</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="font-bold mb-6"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(38px, 5.5vw, 60px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}
        >
          <span style={{ color: TEXT }}>Your personalised health plan.{' '}</span>
          <span style={{ color: 'var(--blue)' }}>Starts here.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mb-10 mx-auto"
          style={{
            color: '#6b7280',
            maxWidth: 420,
            fontSize: '17px',
            lineHeight: 1.65,
            textWrap: 'pretty' as React.CSSProperties['textWrap'],
          }}
        >
          Answer 4 quick questions. We&apos;ll match you to the right clinical program, then you can create an account to get started.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42, ease }}>
          <button
            type="button"
            onClick={onStart}
            className="w-full flex items-center justify-center gap-3 font-semibold"
            style={{ background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', fontSize: '16px', fontWeight: 600, padding: '18px 40px', borderRadius: '100px', boxShadow: '0 8px 32px rgba(29,79,216,0.4), inset 0 1px 0 rgba(255,255,255,0.18)', maxWidth: 420, margin: '0 auto', letterSpacing: '-0.01em', transition: 'transform 0.18s ease, box-shadow 0.18s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(29,79,216,0.5), inset 0 1px 0 rgba(255,255,255,0.22)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(29,79,216,0.4), inset 0 1px 0 rgba(255,255,255,0.18)' }}
          >
            Check my eligibility
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="mt-4 text-[12px]" style={{ color: '#6b7280' }}>4 questions · Under 60 seconds · No payment required</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Progress bar ───────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: BLUE }}>Question {current} of {total}</span>
        <span className="text-[11px] font-semibold" style={{ color: '#6b7280' }}>{pct}%</span>
      </div>
      <div className="w-full h-[3px] rounded-full" style={{ background: 'rgba(72,144,247,0.1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${BLUE}, #7bb3ff)` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

// ── Option card ────────────────────────────────────────────────────────────────
function OptionCard({ label, sub, selected, onClick, icon }: { label: string; sub?: string; selected: boolean; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-200"
      style={{
        background: selected ? 'rgba(72,144,247,0.08)' : SURF,
        border: `1.5px solid ${selected ? BLUE : BORDER}`,
        boxShadow: selected ? '0 0 0 3px rgba(72,144,247,0.08), 0 8px 32px rgba(72,144,247,0.1)' : 'none',
      }}
    >
      <span className="flex items-center gap-3">
        {icon ? (
          <span className="flex-shrink-0" style={{ opacity: selected ? 1 : 0.45 }}>{icon}</span>
        ) : (
          <span
            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
            style={{ background: selected ? BLUE : 'transparent', border: `2px solid ${selected ? BLUE : 'rgba(148,163,184,0.2)'}` }}
          >
            {selected && (
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}
        <span>
          <span className="block font-semibold" style={{ color: selected ? TEXT : '#374151', fontSize: '15px', lineHeight: 1.3 }}>{label}</span>
          {sub && <span className="block text-xs mt-0.5" style={{ color: selected ? '#4b5563' : '#6b7280' }}>{sub}</span>}
        </span>
      </span>
    </button>
  )
}

// ── Step heading ───────────────────────────────────────────────────────────────
function StepHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: BLUE }}>{eyebrow}</p>
      <h1 className="font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.025em', color: TEXT }}>
        {title}
      </h1>
      {sub && <p className="text-sm" style={{ color: '#6b7280' }}>{sub}</p>}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ShortAssessment() {
  const params = useSearchParams()
  const paramType = params.get('t') || ''
  const hasPredefinedType = !!CONFIGS[paramType]

  const [selectedType, setSelectedType] = useState(hasPredefinedType ? paramType : '')
  const [isCaregiver, setIsCaregiver] = useState(false)
  const [phase, setPhase] = useState<Phase>('intro')
  const [dir, setDir] = useState(1)
  const [s1, setS1] = useState('')
  const { open } = useSignupGate()
  const [s2, setS2] = useState('')
  const [s3, setS3] = useState('')

  const config = CONFIGS[selectedType] ?? CONFIGS.hormone

  // Build question sequence
  const questionPhases: Phase[] = (() => {
    const base: Phase[] = hasPredefinedType
      ? ['q1', 'q2', 'q3']
      : ['pick', 'q1', 'q2', 'q3']
    return ['q0', ...base]
  })()

  const currentStep = questionPhases.indexOf(phase) + 1
  const totalSteps = questionPhases.length
  const showProgress = phase !== 'intro' && phase !== 'eligible'

  const advance = (next: Phase) => { setDir(1); setPhase(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const back = () => {
    setDir(-1)
    const idx = questionPhases.indexOf(phase)
    if (idx > 0) setPhase(questionPhases[idx - 1])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleIntroStart = () => { setDir(1); setPhase('q0'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  }

  const isFirstQuestion = phase === 'q0'
  const q3Data = isCaregiver ? Q3_CAREGIVER : Q3_SELF
  const nextAfterQ2 = 'q3'
  const nextAfterQ1 = 'q2'
  const nextAfterQ0 = hasPredefinedType ? 'q1' : 'pick'
  const nextAfterPick = 'q1'

  // For self flow, override the "they" language back to "you"
  const getQ1Label = (opt: string) => opt
  const q1Question = isCaregiver
    ? config.q1
    : (SELF_Q1_OVERRIDES[selectedType] ?? config.q1)
  const q2Question = isCaregiver
    ? config.q2
    : (SELF_Q2_OVERRIDES[selectedType] ?? config.q2)

  const signupUrl = `https://app.apexmetabolichealth.com.au/signup${isCaregiver ? '?type=caregiver' : ''}`

  return (
    <>
      <Nav />
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>

        {/* Intro */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroScreen key="intro" onStart={handleIntroStart} />}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {phase === 'eligible' && (
            <motion.div
              key="eligible"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col items-center justify-center text-center"
              style={{ minHeight: 'calc(100vh - 96px)', padding: '40px 20px' }}
            >
              <div className="relative z-10 max-w-md w-full">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45, delay: 0.1, ease }}
                  className="mx-auto mb-8 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7"><path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-5"
                  style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}
                >
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: BLUE }}>Eligibility confirmed</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }}
                  className="font-bold tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: TEXT }}
                >
                  {isCaregiver ? 'A strong match for your family member.' : "You're a strong match."}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }}
                  className="mb-3 leading-relaxed" style={{ color: DIM, fontSize: '16px' }}
                >
                  Based on your answers, {isCaregiver ? 'the person you care for is' : 'you\'re'} a great candidate for our{' '}
                  <strong style={{ color: TEXT }}>{config.title}</strong> program.
                </motion.p>

                {isCaregiver ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4, ease }}
                    className="text-left rounded-2xl p-5 mb-8"
                    style={{ background: SURF, border: `1.5px solid ${BORDER}` }}
                  >
                    <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: BLUE }}>How caregiver accounts work</p>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Create an account using your own name and contact details',
                        "During intake, enter the patient's full name and date of birth",
                        "Upload their blood test results, even if the patient's name is on the report",
                        'Our clinical team will confirm consent with the patient before any treatment begins',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#4b5563' }}>
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5">
                            <path d="M3 8l4 4 6-6" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease }}
                    className="text-sm mb-10" style={{ color: '#6b7280' }}
                  >
                    Create a free account to get your personalised plan, or log in if you already have one.
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }}
                  className="flex flex-col gap-3 w-full"
                  style={{ maxWidth: 400, margin: '0 auto' }}
                >
                  <button
                    type="button"
                    onClick={() => open(() => { window.location.href = signupUrl })}
                    className="w-full flex items-center justify-center gap-2.5 font-semibold"
                    style={{ background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', fontSize: '16px', fontWeight: 600, padding: '17px 32px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(29,79,216,0.38), inset 0 1px 0 rgba(255,255,255,0.18)', letterSpacing: '-0.01em', transition: 'transform 0.18s ease, box-shadow 0.18s ease', cursor: 'pointer', border: 'none' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(29,79,216,0.5), inset 0 1px 0 rgba(255,255,255,0.22)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(29,79,216,0.38), inset 0 1px 0 rgba(255,255,255,0.18)' }}
                  >
                    {isCaregiver ? 'Create a caregiver account' : 'Create your free account'}
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>

                  <a
                    href="https://app.apexmetabolichealth.com.au/login"
                    className="w-full flex items-center justify-center font-medium transition-all duration-150"
                    style={{ color: '#4b5563', fontSize: '14px', padding: '15px 32px', borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', textDecoration: 'none', background: SURF }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(72,144,247,0.4)'; (e.currentTarget as HTMLElement).style.color = BLUE }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.color = '#4b5563' }}
                  >
                    Already have an account? Log in
                  </a>

                  <p className="text-[11px] mt-2" style={{ color: '#6b7280' }}>
                    Reviewed by an AHPRA-registered doctor · Completely confidential
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question phases */}
        {phase !== 'intro' && phase !== 'eligible' && (
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
            <>
              {showProgress && <ProgressBar current={currentStep} total={totalSteps} />}

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={phase}
                  custom={dir}
                  variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >

                  {/* Q0: Who is this for */}
                  {phase === 'q0' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow="Before we start"
                        title="Who is this assessment for?"
                        sub="This helps us ask the right questions and personalise the pathway correctly."
                      />
                      <div className="flex flex-col gap-3">
                        {Q0_OPTIONS.map(opt => (
                          <OptionCard
                            key={opt.id}
                            label={opt.label}
                            sub={opt.sub}
                            icon={opt.icon}
                            selected={opt.id === 'caregiver' ? isCaregiver : !isCaregiver && s1 !== '__unset__'}
                            onClick={() => {
                              const cg = opt.id === 'caregiver'
                              setIsCaregiver(cg)
                              setTimeout(() => advance(nextAfterQ0), 220)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Treatment picker */}
                  {phase === 'pick' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow="Question 2 of 4"
                        title={isCaregiver ? "What are you looking for help with?" : "What are you looking for?"}
                        sub={isCaregiver ? "Select the area that best fits your family member's situation." : "We'll build a personalised pathway based on your answer."}
                      />
                      <div className="flex flex-col gap-3">
                        {TREATMENT_PICKS.map(t => (
                          <OptionCard
                            key={t.id} label={t.label} sub={t.sub}
                            selected={selectedType === t.id}
                            onClick={() => { setSelectedType(t.id); setTimeout(() => advance(nextAfterPick), 220) }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q1: Symptom */}
                  {phase === 'q1' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow={hasPredefinedType ? 'Question 2 of 3' : 'Question 3 of 4'}
                        title={q1Question}
                        sub="Select the option that fits best."
                      />
                      <div className="flex flex-col gap-3">
                        {config.opts1.map(opt => (
                          <OptionCard key={opt} label={getQ1Label(opt)} selected={s1 === opt} onClick={() => { setS1(opt); setTimeout(() => advance(nextAfterQ1), 220) }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q2: Duration */}
                  {phase === 'q2' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow={hasPredefinedType ? 'Question 2 of 3' : 'Question 3 of 4'}
                        title={q2Question}
                        sub="This helps us match to the right clinician."
                      />
                      <div className="flex flex-col gap-3">
                        {config.opts2.map(opt => (
                          <OptionCard key={opt} label={opt} selected={s2 === opt} onClick={() => { setS2(opt); setTimeout(() => advance(nextAfterQ2), 220) }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q3: Barrier / Caregiver consent */}
                  {phase === 'q3' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow={hasPredefinedType ? 'Question 3 of 3' : 'Question 4 of 4'}
                        title={q3Data.question}
                        sub={isCaregiver ? "We take this seriously: clinical consent is required before any treatment begins." : "One last question, then we'll show your results."}
                      />
                      <div className="flex flex-col gap-3">
                        {q3Data.options.map(opt => (
                          <OptionCard key={opt} label={opt} selected={s3 === opt} onClick={() => { setS3(opt); setTimeout(() => advance('eligible'), 220) }} />
                        ))}
                      </div>
                      {isCaregiver && (
                        <p className="text-xs px-1" style={{ color: '#6b7280', lineHeight: 1.6 }}>
                          Under Australian healthcare law, the patient must provide informed consent before treatment. Our clinical team will confirm this during the intake process.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div
                className={`flex items-center mt-8 pt-6 ${isFirstQuestion ? 'justify-end' : 'justify-between'}`}
                style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
              >
                {!isFirstQuestion && (
                  <button
                    type="button" onClick={back}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                    style={{ background: SURF, border: `1px solid ${BORDER}`, color: DIM }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back
                  </button>
                )}

                {(phase === 'q1' || phase === 'q2' || phase === 'q3') && (
                  <button
                    type="button"
                    onClick={() => advance(phase === 'q1' ? 'q2' : phase === 'q2' ? 'q3' : 'eligible')}
                    className="text-sm font-medium transition-colors duration-150 ml-auto"
                    style={{ color: '#6b7280' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = DIM }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b7280' }}
                  >
                    Skip
                  </button>
                )}
              </div>
            </>
          </div>
        )}
      </main>
    </>
  )
}
