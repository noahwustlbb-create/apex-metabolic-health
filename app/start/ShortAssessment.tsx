'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG     = '#04060d'
const SURF   = '#0d1525'
const BLUE   = '#4890f7'
const TEXT   = '#f0f5ff'
const DIM    = '#c8dcf8'
const BORDER = 'rgba(72,144,247,0.18)'
const ease   = [0.22, 1, 0.36, 1] as const
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

// ── Intake form routing ────────────────────────────────────────────────────────
const INTAKE_ROUTES: Record<string, string> = {
  hormone:   '/intake/hormone-consult',
  weight:    '/intake/general-consult?program=weight-loss',
  sexual:    '/intake/general-consult?program=sexual-health',
  recovery:  '/intake/general-consult?program=recovery',
  longevity: '/intake/general-consult?program=longevity',
  skinhair:  '/intake/general-consult?program=skin-hair',
  bloods:    '/intake/hormone-consult',
  general:   '/intake/general-consult',
  repeat:    '/intake/repeat-order',
}

// ── Treatment picker (inside assessment) ──────────────────────────────────────
const TREATMENT_PICKS = [
  { id: 'hormone',   label: 'Hormone Optimisation',       sub: 'Energy, testosterone, drive, recovery' },
  { id: 'weight',    label: 'Medical Weight Loss',         sub: 'Doctor-led metabolic management' },
  { id: 'sexual',    label: 'Sexual Health',               sub: 'Libido, performance, confidence' },
  { id: 'recovery',  label: 'Recovery & Injury Repair',    sub: 'Injury repair, performance, mobility' },
  { id: 'longevity', label: 'Anti-Ageing & Longevity',     sub: 'Healthspan, vitality, long-term optimisation' },
  { id: 'skinhair',  label: 'Skin & Hair',                 sub: 'Hair restoration, skin health, anti-ageing' },
  { id: 'bloods',    label: 'Comprehensive Blood Tests',   sub: 'Full-panel diagnostics with doctor review' },
  { id: 'general',   label: 'General Telehealth',          sub: "Not sure yet — I'd like to speak to a doctor" },
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
      "I'm not sure — I'd like a health check",
    ],
    q2: 'How long have you been experiencing this?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  weight: {
    title: 'Medical Weight Loss',
    q1: "What's your primary goal?",
    opts1: [
      'Lose body fat',
      'Improve metabolic health',
      'Address insulin resistance',
      'Manage a related condition',
      "I'm not sure — I'd like guidance",
    ],
    q2: 'Have you tried medically supervised weight loss before?',
    opts2: ["No — this is my first time", "Yes — but it didn't stick", "Currently on a program that isn't working"],
  },
  sexual: {
    title: 'Sexual Health',
    q1: "What's your main concern?",
    opts1: [
      'Low libido',
      'Erectile dysfunction',
      'Performance and confidence',
      'Hormonal contributors to sexual health',
      "I'm not sure — general assessment",
    ],
    q2: 'How long has this been a concern?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  recovery: {
    title: 'Recovery & Injury Repair',
    q1: "What's your goal?",
    opts1: [
      'Recover from a specific injury',
      'Improve recovery between training sessions',
      'Improve athletic output and performance',
      'Healthy ageing and mobility',
      "I'm not sure — general assessment",
    ],
    q2: 'Which best describes your activity level?',
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
    q1: "What's your main focus?",
    opts1: [
      'Energy and vitality as I age',
      'Extending my healthspan long-term',
      'Physical and cognitive optimisation',
      'Proactive health monitoring and prevention',
      "I'm not sure — I'd like a full review",
    ],
    q2: 'How long have these concerns been on your mind?',
    opts2: ['Less than 3 months', '3–12 months', '1–3 years', 'More than 3 years'],
  },
  skinhair: {
    title: 'Skin & Hair',
    q1: 'What would you like help with?',
    opts1: [
      'Hair loss or thinning',
      'Skin ageing & fine lines',
      'Acne or breakouts',
      'Skin health & complexion',
      "I'm not sure — I'd like guidance",
    ],
    q2: "What's your main goal?",
    opts2: [
      'Restore my hair',
      'Improve my skin',
      'Slow the signs of ageing',
      'Build a personalised treatment plan',
    ],
  },
  bloods: {
    title: 'Comprehensive Blood Tests',
    q1: 'What would you like to test for?',
    opts1: [
      'Hormones (testosterone, oestrogen, thyroid)',
      'Metabolic health (glucose, insulin, cholesterol)',
      'Full comprehensive panel',
      'Cardiovascular markers',
      "I'm not sure — recommend a panel for me",
    ],
    q2: 'When did you last have a blood test?',
    opts2: ['Never', 'More than 2 years ago', 'Within the last 2 years', 'Within the last 6 months'],
  },
  general: {
    title: 'General Telehealth',
    q1: 'How can we help you today?',
    opts1: [
      "General health",
      "Men's health",
      "Women's health",
      'Preventative care',
      'Prescription or medication management',
      'Other',
    ],
    q2: 'What best describes your situation?',
    opts2: [
      'First time seeking specialist help',
      'Follow-up or ongoing care',
      'Second opinion',
      "Not sure — I just need to speak to a doctor",
    ],
  },
}

type Phase = 'intro' | 'pick' | 'q1' | 'q2' | 'lead' | 'eligible'

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
          style={{ background: 'rgba(13,21,37,0.9)', border: '1px solid rgba(72,144,247,0.2)' }}
        >
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 12 12" fill="#f59e0b" className="w-3 h-3">
                <path d="M6 1l1.3 2.6H10L7.9 5.2l.8 2.8L6 6.5 3.3 8l.8-2.8L2 3.6h2.7L6 1z" />
              </svg>
            ))}
          </span>
          <span className="text-[12px] font-medium" style={{ color: DIM }}>Trusted by 2,400+ Australians</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="font-bold tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          <span style={{ color: TEXT }}>Your personalised<br />health plan.</span><br />
          <span style={{ color: '#4890f7' }}>Starts here.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="text-base md:text-lg leading-relaxed mb-10 mx-auto"
          style={{ color: 'rgba(200,220,248,0.6)', maxWidth: 400 }}
        >
          Answer a few questions about your health and goals.
          We&apos;ll identify the most relevant clinical pathway for your situation.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42, ease }}>
          <button
            type="button"
            onClick={onStart}
            className="w-full flex items-center justify-center gap-3 font-semibold transition-all duration-200"
            style={{ background: BLUE, color: '#fff', fontSize: '16px', padding: '18px 32px', borderRadius: '100px', boxShadow: '0 8px 40px rgba(72,144,247,0.35)', maxWidth: 420, margin: '0 auto' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5a9ef8'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 48px rgba(72,144,247,0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(72,144,247,0.35)' }}
          >
            Check my eligibility
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="mt-4 text-[12px]" style={{ color: 'rgba(200,220,248,0.3)' }}>Takes about 2 minutes · No payment required</p>
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
        <span className="text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: BLUE }}>Step {current} of {total}</span>
        <span className="text-[11px] font-semibold" style={{ color: 'rgba(200,220,248,0.4)' }}>{pct}%</span>
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
function OptionCard({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-2xl transition-all duration-200"
      style={{
        background: selected ? 'rgba(72,144,247,0.1)' : SURF,
        border: `1.5px solid ${selected ? BLUE : BORDER}`,
        boxShadow: selected ? '0 0 0 3px rgba(72,144,247,0.08), 0 8px 32px rgba(72,144,247,0.1)' : 'none',
      }}
    >
      <span className="flex items-center gap-3">
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
        <span>
          <span className="block font-medium" style={{ color: selected ? TEXT : DIM, fontSize: '15px', lineHeight: 1.3 }}>{label}</span>
          {sub && <span className="block text-xs mt-0.5" style={{ color: selected ? 'rgba(200,220,248,0.7)' : 'rgba(200,220,248,0.4)' }}>{sub}</span>}
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
      {sub && <p className="text-sm" style={{ color: 'rgba(200,220,248,0.55)' }}>{sub}</p>}
    </div>
  )
}

// ── Input field ────────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: 'rgba(200,220,248,0.55)' }}>
        {label}{required && <span style={{ color: BLUE }}> *</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-150"
        style={{ background: SURF, border: `1.5px solid ${BORDER}`, color: TEXT, fontSize: '16px', caretColor: BLUE }}
        onFocus={e => { e.target.style.borderColor = BLUE; e.target.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.08)' }}
        onBlur={e => { e.target.style.borderColor = BORDER; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ShortAssessment() {
  const params = useSearchParams()
  const paramType = params.get('t') || ''
  const hasPredefinedType = !!CONFIGS[paramType]

  const [selectedType, setSelectedType] = useState(hasPredefinedType ? paramType : '')
  const [phase, setPhase] = useState<Phase>('intro')
  const [dir, setDir] = useState(1)
  const [s1, setS1] = useState('')
  const [s2, setS2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const config = CONFIGS[selectedType] ?? CONFIGS.hormone

  const questionPhases: Phase[] = hasPredefinedType
    ? ['q1', 'q2', 'lead']
    : ['pick', 'q1', 'q2', 'lead']

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
  const handleIntroStart = () => { setDir(1); setPhase(hasPredefinedType ? 'q1' : 'pick'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const submit = async () => {
    if (!firstName.trim() || !email.includes('@') || mobile.trim().length < 8) {
      setError('Please fill in your name, email, and mobile number.'); return
    }
    if (!consent) { setError('Please confirm your consent before submitting.'); return }
    setSubmitting(true); setError('')
    try {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Apex Lead — ${config.title}: ${firstName} ${lastName}`,
          from_name: 'Apex Metabolic Health',
          name: `${firstName} ${lastName}`, email, mobile,
          treatment_type: config.title,
          q1: s1 || '(skipped)', q2: s2 || '(skipped)',
          source: 'eligibility-assessment',
        }),
      }).catch(() => {})
      fetch('/api/notify-admin', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, mobile, source: `assessment-${selectedType || 'unknown'}`, step1: s1, step2: s2 }),
      }).catch(() => {})
      advance('eligible')
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  }

  const isFirstQuestion = phase === (hasPredefinedType ? 'q1' : 'pick')

  return (
    <>
      <Nav />
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>

        {/* Intro */}
        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroScreen key="intro" onStart={handleIntroStart} />}
        </AnimatePresence>

        {/* Eligibility result — full-screen centered */}
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
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-6"
                  style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}
                >
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: BLUE }}>Eligibility confirmed</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }}
                  className="font-bold tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: TEXT }}
                >
                  Good news{firstName ? `, ${firstName}` : ''} —<br />
                  <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    you qualify.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }}
                  className="text-sm leading-relaxed mb-8" style={{ color: DIM }}
                >
                  Based on your answers, you&apos;re a strong candidate for our{' '}
                  <strong style={{ color: TEXT }}>{config.title}</strong> program.
                  Complete your intake form and a doctor will review your case within 24 hours.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, ease }}>
                  <a
                    href={INTAKE_ROUTES[selectedType] ?? INTAKE_ROUTES.general}
                    className="w-full flex items-center justify-center gap-3 font-semibold transition-all duration-200 mb-4"
                    style={{ background: BLUE, color: '#fff', fontSize: '16px', padding: '18px 32px', borderRadius: '100px', boxShadow: '0 8px 40px rgba(72,144,247,0.35)', maxWidth: 400, margin: '0 auto 16px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5a9ef8'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 48px rgba(72,144,247,0.5)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(72,144,247,0.35)' }}
                  >
                    Complete intake form
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <p className="text-[11px] mt-4" style={{ color: 'rgba(200,220,248,0.3)' }}>
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
                  {/* Treatment picker */}
                  {phase === 'pick' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow="Apex Metabolic Health"
                        title="What are you looking for?"
                        sub="We'll build a personalised pathway based on your answer."
                      />
                      <div className="flex flex-col gap-3">
                        {TREATMENT_PICKS.map(t => (
                          <OptionCard
                            key={t.id} label={t.label} sub={t.sub}
                            selected={selectedType === t.id}
                            onClick={() => { setSelectedType(t.id); setTimeout(() => advance('q1'), 220) }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q1 */}
                  {phase === 'q1' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading eyebrow={config.title} title={config.q1} sub="Select the option that fits best." />
                      <div className="flex flex-col gap-3">
                        {config.opts1.map(opt => (
                          <OptionCard key={opt} label={opt} selected={s1 === opt} onClick={() => { setS1(opt); setTimeout(() => advance('q2'), 220) }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q2 */}
                  {phase === 'q2' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading eyebrow={config.title} title={config.q2} sub="This helps us match you with the right clinician." />
                      <div className="flex flex-col gap-3">
                        {config.opts2.map(opt => (
                          <OptionCard key={opt} label={opt} selected={s2 === opt} onClick={() => { setS2(opt); setTimeout(() => advance('lead'), 220) }} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lead capture */}
                  {phase === 'lead' && (
                    <div className="flex flex-col gap-5">
                      <StepHeading
                        eyebrow={config.title}
                        title="Let's personalise your treatment plan."
                        sub="A clinician will review your responses before discussing the most appropriate treatment options."
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="First name" value={firstName} onChange={setFirstName} placeholder="James" required />
                        <InputField label="Last name" value={lastName} onChange={setLastName} placeholder="Smith" />
                      </div>
                      <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" required />
                      <InputField label="Mobile number" type="tel" value={mobile} onChange={setMobile} placeholder="04XX XXX XXX" required />

                      <label className="flex items-start gap-3 cursor-pointer" onClick={() => setConsent(c => !c)}>
                        <div
                          className="mt-0.5 w-5 h-5 flex-shrink-0 rounded flex items-center justify-center transition-all duration-150"
                          style={{ background: consent ? 'rgba(72,144,247,0.15)' : 'transparent', border: `2px solid ${consent ? BLUE : 'rgba(148,163,184,0.2)'}` }}
                        >
                          {consent && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </div>
                        <span className="text-xs leading-relaxed" style={{ color: 'rgba(200,220,248,0.5)' }}>
                          I consent to Apex Metabolic Health contacting me about my treatment pathway. I understand this is not a diagnosis — treatment is subject to clinical assessment by an AHPRA-registered doctor.
                        </span>
                      </label>

                      {error && (
                        <p className="text-sm px-4 py-3 rounded-xl" style={{ color: '#f87171', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>{error}</p>
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

                  <div className="flex items-center gap-4">
                    {(phase === 'q1' || phase === 'q2') && (
                      <button
                        type="button"
                        onClick={() => advance(phase === 'q1' ? 'q2' : 'lead')}
                        className="text-sm font-medium transition-colors duration-150"
                        style={{ color: 'rgba(200,220,248,0.3)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = DIM }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(200,220,248,0.3)' }}
                      >
                        Skip
                      </button>
                    )}

                    {phase === 'lead' && (
                      <button
                        type="button" onClick={submit} disabled={submitting}
                        className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={{ background: BLUE, color: '#fff', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Submitting…
                          </>
                        ) : (
                          <>
                            Get My Plan
                            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
            </>
          </div>
        )}
      </main>
    </>
  )
}
