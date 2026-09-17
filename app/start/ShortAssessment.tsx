'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import { useSignupGate } from '@/context/SignupGateContext'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG     = 'var(--bg)'
const SURF   = 'var(--surface)'
const BLUE   = 'var(--blue)'
const TEXT   = 'var(--text-primary)'
const DIM    = 'var(--text-secondary)'
const BORDER = 'var(--border)'
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

// Portal program names, so the account opens with every protocol already set.
const PORTAL_PROGRAM: Record<string, string> = {
  hormone: 'Hormone Optimisation', weight: 'Weight Loss & Metabolic', sexual: 'Sexual Health', recovery: 'Recovery & Injury Repair',
  longevity: 'Anti-Ageing & Longevity', skinhair: 'Skin & Hair', bloods: 'Comprehensive Blood Tests',
}
const PICK_LABEL = (id: string) => TREATMENT_PICKS.find(t => t.id === id)?.label ?? id

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
      'Metabolic health (glucose, cholesterol, liver, kidney)',
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

type Phase = 'intro' | 'q0' | 'pick' | 'q1' | 'place' | 'exp' | 'q2' | 'q3' | 'bloods' | 'source' | 'privacy' | 'loading' | 'eligible'

const BLOODS_OPTIONS = [
  { id: 'recent', label: 'Yes, from the last 12 months', sub: 'Upload them in your portal and your doctor reads them first' },
  { id: 'older', label: 'Yes, but older than a year', sub: 'We will likely retest, so nothing to dig out' },
  { id: 'none', label: 'No', sub: 'We issue the referral; results are back in about 48 hours' },
  { id: 'unsure', label: 'Not sure', sub: 'Your doctor decides on the call' },
]
// Where the patient is starting from, so the doctor opens the call at the right level.
const EXPERIENCE_OPTIONS = [
  { id: 'new', label: 'New to this', sub: 'Never had treatment for it' },
  { id: 'tried', label: 'Tried it before', sub: 'Had treatment in the past, not on it now' },
  { id: 'current', label: 'On treatment now', sub: 'With another doctor or clinic, looking to switch or review' },
  { id: 'unsure', label: 'Not sure', sub: 'Your doctor works it out with you on the call' },
]

const SOURCE_OPTIONS = [
  { id: 'google', label: 'Google search' },
  { id: 'instagram', label: 'Instagram or Facebook' },
  { id: 'tiktok', label: 'TikTok or YouTube' },
  { id: 'friend', label: 'A friend or family member' },
  { id: 'doctor', label: 'A doctor, pharmacist or trainer' },
  { id: 'other', label: 'Somewhere else' },
]

const WHY_LABEL: Record<string, string> = {
  energy: 'Low energy', weight: 'Weight that won’t move', libido: 'Libido or performance', recovery: 'Slow recovery', ageing: 'Ageing well', unsure: 'Not sure yet',
}

// ── Intro (welcome) ────────────────────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 96px)', padding: '40px 20px' }}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 mesh-blue" style={{ opacity: 0.7 }} />
      <div className="relative z-10 max-w-lg w-full">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease }} className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full mb-10 glass-card" style={{ borderRadius: 999 }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} aria-hidden="true" />
          <span className="text-[12px] font-semibold" style={{ color: TEXT }}>Doctor-led · AHPRA-registered · Australia-wide</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18, ease }} className="t-display mb-6">
          <span style={{ color: TEXT }}>Your protocol </span><span style={{ color: BLUE }}>starts here.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease }} className="t-lead mb-10 mx-auto" style={{ color: DIM, maxWidth: 420 }}>
          A few quick questions. We match you to the right pathway, then you decide whether to create an account.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42, ease }}>
          <button type="button" onClick={onStart} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '18px 40px', borderRadius: 999, maxWidth: 420, margin: '0 auto' }}>
            Get started
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p className="mt-4 text-[12.5px]" style={{ color: DIM }}>Under two minutes · No payment · No GP referral</p>
          <a href="https://app.apexmetabolichealth.com.au/login" className="inline-block mt-6 text-[14px] font-medium link-draw" style={{ color: TEXT }}>Already a patient? Sign in</a>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ── Progress bar (thin, top of the flow) ───────────────────────────────────────
function ProgressBar({ current, total, onBack, canBack }: { current: number; total: number; onBack: () => void; canBack: boolean }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full mb-8 flex items-center gap-4">
      <button type="button" onClick={onBack} disabled={!canBack} aria-label="Back" className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity" style={{ background: SURF, border: `1px solid ${BORDER}`, color: TEXT, opacity: canBack ? 1 : 0.35, cursor: canBack ? 'pointer' : 'default' }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(72,144,247,0.12)' }}>
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${BLUE}, #7bb3ff)` }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease }} />
      </div>
      <span className="t-readout flex-shrink-0" style={{ fontSize: 18, color: TEXT, minWidth: 44, textAlign: 'right' }}>{String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
    </div>
  )
}

// ── Option card ────────────────────────────────────────────────────────────────
function OptionCard({ label, sub, selected, onClick, icon, index }: { label: string; sub?: string; selected: boolean; onClick: () => void; icon?: React.ReactNode; index: number }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease }}
      className="w-full text-left rounded-[20px] transition-all duration-200"
      style={{
        padding: '16px 18px',
        background: selected ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.85)',
        border: `1.5px solid ${selected ? BLUE : BORDER}`,
        boxShadow: selected ? '0 0 0 4px rgba(72,144,247,0.10), 0 14px 32px rgba(72,144,247,0.14)' : '0 1px 2px rgba(15,23,42,0.04)',
        cursor: 'pointer',
      }}
      aria-pressed={selected}
    >
      <span className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: selected ? BLUE : 'rgba(72,144,247,0.08)', color: selected ? '#fff' : BLUE, transition: 'background 0.2s ease' }} aria-hidden="true">
          {icon ?? <span className="t-mono" style={{ fontSize: 10, color: 'inherit' }}>{String(index + 1).padStart(2, '0')}</span>}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-semibold" style={{ color: TEXT, fontSize: 16.5, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{label}</span>
          {sub && <span className="block mt-0.5" style={{ fontSize: 13.5, color: DIM }}>{sub}</span>}
        </span>
        <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${selected ? BLUE : 'rgba(15,23,42,0.15)'}`, background: selected ? BLUE : 'transparent', transition: 'all 0.2s ease' }} aria-hidden="true">
          {selected && <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </span>
      </span>
    </motion.button>
  )
}

// ── Step heading ───────────────────────────────────────────────────────────────
function StepHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <p className="t-eyebrow mb-3">{eyebrow}</p>
      <h1 className="t-h2" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', marginBottom: 10 }}>{title}</h1>
      {sub && <p className="text-[15px] m-0" style={{ color: DIM }}>{sub}</p>}
    </div>
  )
}

// ── Interstitial: you're in the right place ────────────────────────────────────
function PlaceScreen({ programme, count = 1, why, onContinue }: { programme: string; count?: number; why?: string; onContinue: () => void }) {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => { const t = window.setTimeout(() => setRevealed(true), 1100); return () => window.clearTimeout(t) }, [])
  const steps = [
    { when: 'Today', title: 'Finish these questions', body: 'Two more, then we show your match.' },
    { when: 'This week', title: count > 1 ? 'One blood panel for everything' : 'Bloods near you', body: count > 1 ? `One referral covers all ${count} protocols. 4,000+ centres. Results in about 48 hours.` : 'Referral sent electronically. 4,000+ centres. Results in about 48 hours.' },
    { when: 'Day 5', title: 'Your doctor, on the call', body: count > 1 ? `One call. An AHPRA-registered doctor reads your panel with you and plans ${programme} together.` : `An AHPRA-registered doctor reads your panel with you and builds your ${programme.toLowerCase()} protocol.` },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="flex flex-col gap-6">
      <div>
        <p className="t-eyebrow mb-3">Good news</p>
        <h1 className="t-h2" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', marginBottom: 10 }}>You’re in the right place. Here’s where you’re headed.</h1>
        {why && <p className="text-[15px] m-0" style={{ color: DIM }}>You told us: <strong style={{ color: TEXT }}>{why}</strong>. That is exactly what {count > 1 ? 'these pathways are' : `the ${programme} pathway is`} built for.</p>}
      </div>
      <ol className="list-none p-0 m-0 relative flex flex-col gap-3">
        {steps.map((s, i) => {
          const blurred = i === 2 && !revealed
          return (
            <motion.li key={s.when} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease }} className="glass-card flex gap-4 items-start" style={{ padding: '18px 20px', borderRadius: 22, filter: blurred ? 'blur(8px)' : 'blur(0)', transition: 'filter 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
              <span className="t-readout flex-shrink-0" style={{ fontSize: 22, color: BLUE, minWidth: 44 }}>{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="t-mono block mb-1" style={{ color: DIM, fontSize: 9.5 }}>{s.when}</span>
                <span className="block font-semibold text-[16px]" style={{ color: TEXT, letterSpacing: '-0.01em' }}>{s.title}</span>
                <span className="block mt-1 text-[14px]" style={{ color: DIM }}>{s.body}</span>
              </span>
            </motion.li>
          )
        })}
      </ol>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <button type="button" onClick={onContinue} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
          Continue
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Loading: reviewing your answers ────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const lines = ['Reviewing your answers', 'Matching your pathway', 'Checking eligibility', 'Preparing your next step']
  useEffect(() => {
    const start = performance.now()
    const dur = 2600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 2.2)
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick); else window.setTimeout(onDone, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])
  const line = lines[Math.min(lines.length - 1, Math.floor(pct / 26))]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="relative" style={{ width: 200, height: 200 }}>
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(72,144,247,0.14)" strokeWidth="6" />
          <circle cx="100" cy="100" r="88" fill="none" stroke={BLUE} strokeWidth="6" strokeLinecap="round" strokeDasharray="553" strokeDashoffset={553 - (553 * pct) / 100} style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.12s linear' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="t-readout" style={{ fontSize: 56, color: TEXT }} aria-live="polite">{pct}%</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={line} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="mt-8 text-[16px] font-medium m-0" style={{ color: TEXT }}>{line}</motion.p>
      </AnimatePresence>
      <p className="mt-2 text-[13px] m-0" style={{ color: DIM }}>Nothing is sent to a doctor yet. This is a match, not a diagnosis.</p>
    </motion.div>
  )
}

// ── Privacy (before the match and signup) ─────────────────────────────────────
function PrivacyScreen({ refCode, setRefCode, onContinue }: { refCode: string; setRefCode: (v: string) => void; onContinue: () => void }) {
  const points = [
    { t: 'Only your care team sees it', b: 'Your answers go to Apex doctors and clinic staff. Nobody else.' },
    { t: 'Never sold', b: 'We do not sell, rent or trade your information.' },
    { t: 'Encrypted and private', b: 'Encrypted in transit and at rest, in a private medical record.' },
    { t: 'A doctor decides', b: 'An AHPRA-registered doctor reviews you. Not an algorithm.' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease }} className="w-20 h-20 rounded-[26px] flex items-center justify-center mb-5 glass-card" style={{ borderRadius: 26 }} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke={BLUE} strokeWidth="1.8" strokeLinejoin="round" /><path d="M8.5 12l2.5 2.5 4.5-5" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.div>
        <p className="t-eyebrow mb-2">Built for privacy</p>
        <h1 className="t-h2" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', marginBottom: 8 }}>Your health stays yours.</h1>
        <p className="text-[15px] m-0" style={{ color: DIM, maxWidth: 420 }}>Before we show your match, here is exactly what happens to what you told us.</p>
      </div>
      <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {points.map((p, i) => (
          <motion.li key={p.t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }} className="glass-card" style={{ padding: '14px 16px', borderRadius: 20 }}>
            <span className="block font-semibold text-[15px]" style={{ color: TEXT }}>{p.t}</span>
            <span className="block mt-0.5 text-[13.5px]" style={{ color: DIM }}>{p.b}</span>
          </motion.li>
        ))}
      </ul>
      <div className="glass-card" style={{ padding: '14px 16px', borderRadius: 20 }}>
        <label htmlFor="start-ref" className="block font-semibold text-[14px] mb-1.5" style={{ color: TEXT }}>Got a referral code? <span className="font-normal" style={{ color: DIM }}>(optional)</span></label>
        <input id="start-ref" value={refCode} onChange={e => setRefCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32))} placeholder="Enter referral code" autoComplete="off" className="w-full rounded-xl px-3.5 py-3 text-[15px] outline-none" style={{ background: '#fff', border: `1px solid ${BORDER}`, color: TEXT, letterSpacing: '0.08em' }} />
      </div>
      <button type="button" onClick={onContinue} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
        Show my match
      </button>
      <p className="text-center text-[12px] m-0" style={{ color: DIM }}>Full detail in our <a href="/privacy-policy" className="link-draw" style={{ color: TEXT }}>privacy policy</a>.</p>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ShortAssessment() {
  const params = useSearchParams()
  const paramType = params.get('t') || ''
  const why = WHY_LABEL[params.get('why') || '']
  const hasPredefinedType = !!CONFIGS[paramType]

  const [selectedType, setSelectedType] = useState(hasPredefinedType ? paramType : '')
  // Every protocol the visitor wants. The first one drives the questions; all of them go to the portal.
  const [picks, setPicks] = useState<string[]>(hasPredefinedType ? [paramType] : [])
  const togglePick = (id: string) => {
    const next = picks.includes(id) ? picks.filter(x => x !== id) : [...picks, id]
    setPicks(next)
    setSelectedType(next[0] ?? '')
  }
  const [isCaregiver, setIsCaregiver] = useState(false)
  const [phase, setPhase] = useState<Phase>(hasPredefinedType ? 'q0' : 'intro')
  const [dir, setDir] = useState(1)
  const [s0, setS0] = useState('')
  const [s1, setS1] = useState('')
  const [s2, setS2] = useState('')
  const [s3, setS3] = useState('')
  const [bloods, setBloods] = useState('')
  const [source, setSource] = useState('')
  const [experience, setExperience] = useState('')
  const [refCode, setRefCode] = useState(() => (params.get('ref') || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32))
  const { open } = useSignupGate()

  const config = CONFIGS[selectedType] ?? CONFIGS.hormone

  const questionPhases: Phase[] = hasPredefinedType ? ['q0', 'q1', 'place', 'exp', 'q2', 'q3', 'bloods', 'source', 'privacy'] : ['q0', 'pick', 'q1', 'place', 'exp', 'q2', 'q3', 'bloods', 'source', 'privacy']
  const countable = questionPhases.filter(p => p !== 'place' && p !== 'privacy')
  const currentStep = Math.max(1, countable.indexOf(phase as (typeof countable)[number]) + 1)
  const totalSteps = countable.length
  const showProgress = phase !== 'intro' && phase !== 'eligible' && phase !== 'loading'

  const go = (next: Phase, d = 1) => { setDir(d); setPhase(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const advance = () => { const i = questionPhases.indexOf(phase); go(i + 1 < questionPhases.length ? questionPhases[i + 1] : 'loading') }
  const back = () => { const i = questionPhases.indexOf(phase); if (i > 0) go(questionPhases[i - 1], -1) }
  const onLoaded = useCallback(() => { setDir(1); setPhase('eligible'); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [])

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  }

  const q3Data = isCaregiver ? Q3_CAREGIVER : Q3_SELF
  const q1Question = isCaregiver ? config.q1 : (SELF_Q1_OVERRIDES[selectedType] ?? config.q1)
  const q2Question = isCaregiver ? config.q2 : (SELF_Q2_OVERRIDES[selectedType] ?? config.q2)
  const signupQs = new URLSearchParams()
  if (isCaregiver) signupQs.set('type', 'caregiver')
  if (bloods) signupQs.set('bloods', bloods)
  if (source) signupQs.set('src', source)
  if (experience) signupQs.set('exp', experience)
  if (refCode) signupQs.set('ref', refCode)
  const portalPrograms = picks.map(id => PORTAL_PROGRAM[id]).filter(Boolean)
  if (portalPrograms.length) signupQs.set('programs', portalPrograms.join('|'))
  const pickTitles = picks.map(PICK_LABEL)
  const programmeLine = pickTitles.length > 1 ? `${pickTitles.slice(0, -1).join(', ')} and ${pickTitles[pickTitles.length - 1]}` : config.title
  const whyId = params.get('why') || ''
  if (whyId) signupQs.set('why', whyId)
  const signupUrl = `https://app.apexmetabolichealth.com.au/signup${signupQs.toString() ? `?${signupQs}` : ''}`
  const eyebrow = `Question ${currentStep} of ${totalSteps}`

  return (
    <>
      <Nav />
      {/* The live-chat bubble sits over the bottom button on phones; the funnel is one screen, so it stays hidden here. */}
      <style>{`chat-widget, #ghl-chat-widget { display: none !important; }`}</style>
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 mesh-blue" style={{ opacity: phase === 'intro' ? 0 : 0.5, transition: 'opacity 0.6s ease' }} />

        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroScreen key="intro" onStart={() => go('q0')} />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <div key="loading" className="relative" style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
              <LoadingScreen onDone={onLoaded} />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'eligible' && (
            <motion.div key="eligible" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }} className="relative flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 96px)', padding: '40px 20px' }}>
              <div className="relative z-10 max-w-md w-full">
                <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45, delay: 0.1, ease }} className="mx-auto mb-8 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7"><path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-5" style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
                  <span className="t-mono" style={{ color: BLUE }}>Pathway matched</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }} className="t-h2 mb-4" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>
                  {isCaregiver ? 'A strong match for your family member.' : 'You’re a strong match.'}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }} className="mb-3 leading-relaxed" style={{ color: DIM, fontSize: 16 }}>
                  Based on your answers, {isCaregiver ? 'the person you care for is' : 'you’re'} a good candidate for {picks.length > 1 ? <>these pathways: <strong style={{ color: TEXT }}>{programmeLine}</strong>.</> : <>the <strong style={{ color: TEXT }}>{config.title}</strong> pathway.</>}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.38, ease }} className="mb-6">
                  <p className="t-mono mb-2" style={{ color: DIM, fontSize: 9.5 }}>{picks.length ? 'Your protocols · tap to add or remove' : 'Add a protocol'}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {TREATMENT_PICKS.filter(t => t.id !== 'general').map(t => {
                      const on = picks.includes(t.id)
                      return (
                        <button key={t.id} type="button" onClick={() => togglePick(t.id)} aria-pressed={on} className="rounded-full text-[13px] font-medium transition-colors" style={{ padding: '7px 12px', background: on ? BLUE : 'rgba(255,255,255,0.85)', color: on ? '#fff' : TEXT, border: `1px solid ${on ? BLUE : BORDER}`, cursor: 'pointer' }}>
                          {on ? '✓ ' : '+ '}{t.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {isCaregiver ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4, ease }} className="text-left glass-card p-5 mb-8" style={{ borderRadius: 22 }}>
                    <p className="t-eyebrow mb-3">How caregiver accounts work</p>
                    <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                      {['Create an account using your own name and contact details', "During intake, enter the patient's full name and date of birth", "Upload their blood test results, even if the patient's name is on the report", 'Our clinical team will confirm consent with the patient before any treatment begins'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: DIM }}>
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"><path d="M3 8l4 4 6-6" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4, ease }} className="glass-card grid grid-cols-3 gap-2 mb-8" style={{ padding: 14, borderRadius: 22 }}>
                    {[{ n: '48h', l: 'Results' }, { n: '01', l: 'Doctor' }, { n: '$0', l: 'To start' }].map(r => (
                      <div key={r.l}>
                        <span className="t-readout block" style={{ fontSize: 28, color: TEXT }}>{r.n}</span>
                        <span className="t-mono block mt-1" style={{ color: DIM, fontSize: 9.5 }}>{r.l}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }} className="flex flex-col gap-3 w-full" style={{ maxWidth: 400, margin: '0 auto' }}>
                  <button type="button" onClick={() => open(undefined, { capture: true, program: pickTitles.length ? pickTitles.join(', ') : config.title, signupUrl })} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
                    {isCaregiver ? 'Create a caregiver account' : 'Create your free account'}
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <a href="https://app.apexmetabolichealth.com.au/login" className="w-full flex items-center justify-center font-medium" style={{ color: DIM, fontSize: 14, padding: '15px 32px', borderRadius: 999, border: `1.5px solid ${BORDER}`, textDecoration: 'none', background: 'rgba(255,255,255,0.8)' }}>
                    Already have an account? Log in
                  </a>
                  <p className="text-[11.5px] mt-2" style={{ color: DIM }}>Reviewed by an AHPRA-registered doctor · Confidential · A consultation never guarantees a prescription</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showProgress && (
          <div className="relative" style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
            <ProgressBar current={currentStep} total={totalSteps} onBack={back} canBack={phase !== 'q0'} />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={phase} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease }}>

                {phase === 'q0' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title="Who is this assessment for?" sub="So we ask the right questions and set the pathway up correctly." />
                    <div className="flex flex-col gap-3">
                      {Q0_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} sub={opt.sub} icon={opt.icon} selected={s0 === opt.id} onClick={() => { setS0(opt.id); setIsCaregiver(opt.id === 'caregiver'); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'pick' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={isCaregiver ? 'What are you looking for help with?' : 'What would you like help with?'} sub="Select all that apply. One blood panel and one doctor call cover everything you pick." />
                    <div className="flex flex-col gap-3">
                      {TREATMENT_PICKS.filter(t => t.id !== 'general').map((t, i) => (
                        <OptionCard key={t.id} index={i} label={t.label} sub={t.sub} selected={picks.includes(t.id)} onClick={() => togglePick(t.id)} />
                      ))}
                    </div>
                    <button type="button" onClick={() => { setPicks([]); setSelectedType('general'); advance() }} className="mx-auto text-[14px] font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer' }}>
                      Not sure yet, I’d like to talk to a doctor
                    </button>
                    <div className="sticky bottom-4 z-10">
                      <button type="button" disabled={!picks.length} onClick={advance} className="btn-primary w-full justify-center disabled:opacity-40" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
                        {picks.length > 1 ? `Continue with ${picks.length} protocols` : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {phase === 'q1' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={q1Question} sub="Select the option that fits best." />
                    <div className="flex flex-col gap-3">
                      {config.opts1.map((opt, i) => (
                        <OptionCard key={opt} index={i} label={opt} selected={s1 === opt} onClick={() => { setS1(opt); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'place' && <PlaceScreen programme={programmeLine} count={Math.max(1, picks.length)} why={why} onContinue={advance} />}

                {phase === 'exp' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={isCaregiver ? 'Where are they at with it?' : 'Where are you at with it?'} sub="So your doctor starts the call at the right level." />
                    <div className="flex flex-col gap-3">
                      {EXPERIENCE_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} sub={opt.sub} selected={experience === opt.id} onClick={() => { setExperience(opt.id); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'privacy' && <PrivacyScreen refCode={refCode} setRefCode={setRefCode} onContinue={advance} />}

                {phase === 'q2' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={q2Question} sub="This helps your doctor prepare before the call." />
                    <div className="flex flex-col gap-3">
                      {config.opts2.map((opt, i) => (
                        <OptionCard key={opt} index={i} label={opt} selected={s2 === opt} onClick={() => { setS2(opt); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'q3' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={q3Data.question} sub={isCaregiver ? 'Clinical consent is required before any treatment begins.' : 'Two quick ones after this, then your match.'} />
                    <div className="flex flex-col gap-3">
                      {q3Data.options.map((opt, i) => (
                        <OptionCard key={opt} index={i} label={opt} selected={s3 === opt} onClick={() => { setS3(opt); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                    {isCaregiver && (
                      <p className="text-xs px-1 m-0" style={{ color: DIM, lineHeight: 1.6 }}>
                        Under Australian healthcare law, the patient must provide informed consent before treatment. Our clinical team confirms this during intake.
                      </p>
                    )}
                  </div>
                )}
                {phase === 'bloods' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title="Do you have blood results already?" sub="Recent results save a step. Either way, nothing to find right now." />
                    <div className="flex flex-col gap-3">
                      {BLOODS_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} sub={opt.sub} selected={bloods === opt.id} onClick={() => { setBloods(opt.id); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'source' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title="Where did you hear about Apex?" sub="Last question. It helps us spend less on ads and more on doctors." />
                    <div className="flex flex-col gap-3">
                      {SOURCE_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} selected={source === opt.id} onClick={() => { setSource(opt.id); setTimeout(advance, 240) }} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {(phase === 'q1' || phase === 'exp' || phase === 'q2' || phase === 'q3' || phase === 'bloods' || phase === 'source') && (
              <div className="flex justify-end mt-6">
                <button type="button" onClick={advance} className="text-sm font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer' }}>Skip this question</button>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}
