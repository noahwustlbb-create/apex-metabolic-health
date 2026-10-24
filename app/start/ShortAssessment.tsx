'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { phasesFor, stepNumber, startTotal, type StartPhase } from '@/lib/startFunnel'
import { useSignupGate } from '@/context/SignupGateContext'
import { ArtImg } from '@/components/audience/Img'
import { useAudience } from '@/components/audience/Audience'
import Image from 'next/image'
import { captureLead } from '@/lib/captureLead'

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
// What the panel looks at for each area (test names only, never medicines or outcomes).
const FOCUS: Record<string, { art: string; markers: string }> = {
  hormone:   { art: '/protocols/hormone.jpg',     markers: 'Testosterone, SHBG, oestradiol, LH, FSH, prolactin' },
  weight:    { art: '/protocols/weight.jpg',      markers: 'Glucose, HbA1c, liver and kidney function, lipids' },
  sexual:    { art: '/protocols/sexual.jpg',      markers: 'Hormones, prolactin, thyroid and metabolic markers' },
  recovery:  { art: '/protocols/recovery.jpg',    markers: 'Testosterone, IGF-1, cortisol, iron studies, hs-CRP' },
  longevity: { art: '/protocols/longevity.jpg',   markers: 'Cholesterol, triglycerides, hs-CRP, vitamin D, full blood count' },
  skinhair:  { art: '/protocols/hair.jpg',        markers: 'Iron studies, thyroid, hormones, vitamin D' },
  bloods:    { art: '/protocols/bloods.jpg',      markers: 'The full 23+ marker panel across four systems' },
}
// Women's site (24 Oct): not led by testosterone. Same ids, so routing and the
// portal program names do not change.
const WOMEN_PICK_ORDER = ['hormone', 'weight', 'longevity', 'skinhair', 'recovery', 'sexual', 'bloods', 'general']
const WOMEN_PICK_TEXT: Record<string, { label: string; sub: string }> = {
  hormone: { label: 'Hormones and cycle', sub: 'Energy, mood, cycle, perimenopause' },
  sexual: { label: 'Sexual Health', sub: 'Libido, comfort, confidence' },
  recovery: { label: 'Recovery & Injury Repair', sub: 'Training, injury, iron and energy' },
}
const picksFor = (women: boolean) => women
  ? WOMEN_PICK_ORDER.map(id => ({ ...TREATMENT_PICKS.find(t => t.id === id)!, ...(WOMEN_PICK_TEXT[id] ?? {}) }))
  : TREATMENT_PICKS
const WOMEN_FOCUS: Partial<Record<string, string>> = {
  hormone: 'Oestradiol, progesterone, testosterone, LH, FSH, prolactin',
  recovery: 'Iron studies, thyroid, cortisol, hs-CRP',
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



// ── Sex and age (24 Oct 2026): the 45-second check ─────────────────────────────
// Sex is usually answered in the homepage hero and carried in (?for= or the
// remembered 'apex-audience' choice), so most visitors never see it here.
type Who = 'men' | 'women'
const SEX_OPTIONS: { id: Who; label: string; sub: string }[] = [
  { id: 'men', label: 'Men', sub: 'Testosterone, energy, heart' },
  { id: 'women', label: 'Women', sub: 'Hormones, cycle, iron' },
]
const AGE_BANDS = ['18-29', '30-39', '40-49', '50-59', '60-69', '70-80'] as const
const ageLabel = (b: string) => b.replace('-', ' to ')

type Phase = 'intro' | StartPhase | 'loading' | 'eligible'

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
  // Life-stage entry chips on the home page (Ahead Health pattern).
  s30: 'Late 30s, getting ahead of it', s40: 'Mid 40s, noticing the shift', s50: '50s and on, staying strong',
  // Age entry chips (24 Oct 2026, the 18 to 80 audience).
  a18: 'Knowing your baseline', a35: 'Noticing the shift', a55: 'Staying strong',
}

// ── Intro (welcome) ────────────────────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  // Everlab's split screen + Hormn's reward-first card: say what you get before
  // asking anything. Every line is something Apex already does; nothing here is
  // a diagnosis or a promise of treatment.
  const gets = [
    { k: '23+', t: 'Markers on one blood panel', b: 'Hormones, metabolic, recovery and longevity. Near you, results in about 48 hours.' },
    { k: '01', t: 'A doctor with your results open', b: 'An AHPRA-registered doctor reads your panel with you on the call.' },
    { k: '→', t: 'Your plan, delivered discreetly', b: 'If treatment is suitable, it comes to your door. Reviewed every 3 months.' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="quiz-intro">
      <div className="quiz-intro-art" aria-hidden="true">
        {/* next/image: the raw 1 MB JPEG was the /start LCP (3.1 s, live QA 24 Oct). */}
        <Image src="/3d/body-male.jpg" alt="" fill priority sizes="(max-width: 899px) 100vw, 50vw" quality={70} className="for-men" />
        <Image src="/3d/pink/body-female.jpg" alt="" fill sizes="(max-width: 899px) 100vw, 50vw" quality={70} className="for-women" />
        <div className="quiz-intro-chip"><span>Reviewed by</span><strong>An AHPRA-registered doctor</strong></div>
      </div>
      <div className="quiz-intro-copy">
        <p className="stage-kicker"><span className="stage-kicker-dot" aria-hidden="true" /> Takes about 45 seconds · No payment · No GP referral</p>
        <h1 className="stage-display quiz-intro-title">Find out what<br /><span className="stage-muted">to measure.</span></h1>
        <p className="stage-lead">Four quick taps. We match you to the right pathway, show you what your panel looks at, then you decide whether to create an account.</p>
        <div className="quiz-gets">
          <p className="quiz-gets-k">If it is suitable for you, you get</p>
          {gets.map((g, i) => (
            <motion.div key={g.t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease }} className="quiz-get">
              <span className="t-readout quiz-get-n">{g.k}</span>
              <span><strong>{g.t}</strong><span>{g.b}</span></span>
            </motion.div>
          ))}
        </div>
        <button type="button" onClick={onStart} className="stage-cta" style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}>
          <span className="stage-cta-label">Start the 45-second check</span>
          <span className="stage-cta-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="15" height="15" fill="none"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </button>
        <a href="https://app.apexmetabolichealth.com.au/login" className="stage-link quiz-signin">Already a patient? Sign in</a>
      </div>
    </motion.div>
  )
}


// ── Side panel: Everlab-style "Did you know?" beside every question ────────────
const ASIDE: Partial<Record<string, { art: string; fact: string }>> = {
  sex:     { art: '/start/quiz/body-male.jpg',    fact: 'The panel is different for men and women, because the questions are.' },
  age:     { art: '/start/quiz/body-female.jpg',  fact: 'Apex sees Australian adults from 18 to 80. Your doctor reads your markers against your age, not a single average.' },
  pick:    { art: '/start/quiz/dna.jpg',          fact: 'One blood panel and one doctor call cover every protocol you pick.' },
  q1:      { art: '/start/quiz/body-female.jpg',  fact: 'A result inside the reference range is not always where you feel your best. Your doctor reads your markers for how you actually function.' },
  email:   { art: '/start/quiz/vials.jpg',        fact: '4,000+ accredited collection centres across Australia. Most results are back in about 48 hours.' },
  source:  { art: '/start/quiz/box.jpg',          fact: 'Every Apex doctor is AHPRA-registered. You can check any of them on the public register.' },
}
function QuizAside({ phase }: { phase: string }) {
  const a = ASIDE[phase]
  if (!a) return null
  return (
    <aside className="quiz-aside" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.div key={phase} className="quiz-aside-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
          <ArtImg src={a.art} alt="" />
          <div className="quiz-aside-fact"><strong>Did you know?</strong><span>{a.fact}</span></div>
        </motion.div>
      </AnimatePresence>
    </aside>
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
      <span className="t-figure flex-shrink-0" style={{ fontSize: 18, color: TEXT, minWidth: 44, textAlign: 'right' }}>{String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
    </div>
  )
}

// ── Option card ────────────────────────────────────────────────────────────────
function OptionCard({ label, sub, selected, onClick, icon, index, compact }: { label: string; sub?: string; selected: boolean; onClick: () => void; icon?: React.ReactNode; index: number; compact?: boolean }) {
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
        background: selected ? 'var(--stage-ice)' : 'var(--stage-white)',
        border: `1.5px solid ${selected ? 'var(--stage-ink)' : 'rgba(11,18,32,0.07)'}`,
        boxShadow: selected ? '0 16px 34px -22px rgba(13,93,234,0.55)' : '0 10px 26px -24px rgba(13,93,234,0.5)',
        cursor: 'pointer',
      }}
      aria-pressed={selected}
    >
      <span className="flex items-center gap-4">
        {!compact && <span className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: selected ? 'var(--stage-ink)' : 'var(--stage-ice)', color: selected ? '#fff' : 'var(--stage-blue)', transition: 'background 0.2s ease' }} aria-hidden="true">
          {icon ?? <span className="t-readout" style={{ fontSize: 13, color: 'inherit' }}>{String(index + 1).padStart(2, '0')}</span>}
        </span>}
        <span className="flex-1 min-w-0">
          <span className="block font-semibold" style={{ color: TEXT, fontSize: 16.5, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{label}</span>
          {sub && <span className="block mt-0.5" style={{ fontSize: 13.5, color: DIM }}>{sub}</span>}
        </span>
        {!compact && <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${selected ? 'var(--stage-ink)' : 'rgba(15,23,42,0.15)'}`, background: selected ? 'var(--stage-ink)' : 'transparent', transition: 'all 0.2s ease' }} aria-hidden="true">
          {selected && <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </span>}
      </span>
    </motion.button>
  )
}

// ── Step heading ───────────────────────────────────────────────────────────────
function StepHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <p className="stage-kicker" style={{ marginBottom: 18 }}><span className="stage-kicker-dot" aria-hidden="true" /> {eyebrow}</p>
      <h1 className="stage-h2 quiz-q">{title}</h1>
      {sub && <p className="text-[15px] m-0 mt-3" style={{ color: DIM }}>{sub}</p>}
    </div>
  )
}


// ── Loading: reviewing your answers ────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  // No eligibility is computed here and none should be implied: a doctor decides
  // that, after bloods. These describe assembling the page, nothing more.
  const lines = ['Putting your answers together', 'Preparing your next step']
  useEffect(() => {
    const start = performance.now()
    const dur = 900
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
          <span className="sr-only" aria-live="polite">Preparing your next step</span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={line} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} className="mt-8 text-[16px] font-medium m-0" style={{ color: TEXT }}>{line}</motion.p>
      </AnimatePresence>
      <p className="mt-2 text-[13px] m-0" style={{ color: DIM }}>Nothing is sent to a doctor yet. This is a match, not a diagnosis.</p>
    </motion.div>
  )
}


// ── Save progress (question 3) ──────────────────────────────────────────────────
function EmailScreen({ eyebrow, program, onSaved, onSkip }: { eyebrow: string; program: string; onSaved: (email: string, name: string) => void; onSkip: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const clean = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) { setErr('Please enter a valid email address.'); return }
    setErr(''); setBusy(true)
    // Same wiring as the end-of-funnel gate: admin email + HighLevel, PostHog
    // 'lead_captured'. Identity and program only, never the answers.
    try { await captureLead({ name: name.trim(), email: clean, source: 'assessment', program }) } catch { /* never block the visitor */ }
    setBusy(false)
    onSaved(clean, name.trim())
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      <StepHeading eyebrow={eyebrow} title="Where should we send your match?" sub="We save your progress so you can pick up where you left off. No spam, and your answers stay with your care team." />
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className="block font-semibold text-[14px] mb-1.5" style={{ color: TEXT }}>First name <span className="font-normal" style={{ color: DIM }}>(optional)</span></span>
          <input value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" className="w-full rounded-xl px-3.5 py-3 text-[16px] outline-none" style={{ background: '#fff', border: `1px solid ${BORDER}`, color: TEXT, minHeight: 48 }} />
        </label>
        <label className="block">
          <span className="block font-semibold text-[14px] mb-1.5" style={{ color: TEXT }}>Email</span>
          <input type="email" inputMode="email" autoComplete="email" required value={email} onChange={e => { setEmail(e.target.value); if (err) setErr('') }} aria-invalid={!!err} aria-describedby={err ? 'start-email-err' : undefined} placeholder="you@example.com" className="w-full rounded-xl px-3.5 py-3 text-[16px] outline-none" style={{ background: '#fff', border: `1px solid ${err ? '#dc2626' : BORDER}`, color: TEXT, minHeight: 48 }} />
        </label>
        {err && <p id="start-email-err" role="alert" className="m-0 text-[13px]" style={{ color: '#dc2626' }}>{err}</p>}
      </div>
      <button type="submit" disabled={busy} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
        {busy ? 'Saving' : 'Save and continue'}
      </button>
      <button type="button" onClick={onSkip} className="mx-auto text-[14px] font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer', minHeight: 44 }}>
        Skip for now
      </button>
    </form>
  )
}


// ── Main ───────────────────────────────────────────────────────────────────────
export default function ShortAssessment() {
  const params = useSearchParams()
  const paramType = params.get('t') || ''
  const why = WHY_LABEL[params.get('why') || '']
  const hasPredefinedType = !!CONFIGS[paramType]
  const { audience, setAudience } = useAudience()
  const women = audience === 'women'
  const PICKS = picksFor(women)

  // Sex carried in from the hero: ?for= wins, else the remembered choice the
  // <head> boot script stamped on <html> (components/audience/Audience.tsx).
  const forParam = params.get('for')
  const [sexCarried] = useState<boolean>(() => {
    if (forParam === 'men' || forParam === 'women') return true
    if (typeof document === 'undefined') return false
    const c = document.documentElement.dataset.chosen
    return c === 'men' || c === 'women'
  })
  const [sex, setSex] = useState<Who | ''>(() => {
    if (forParam === 'men' || forParam === 'women') return forParam
    if (typeof document === 'undefined') return ''
    const c = document.documentElement.dataset.chosen
    return c === 'men' || c === 'women' ? c : ''
  })
  const opts = { hasType: hasPredefinedType, hasSex: sexCarried }

  const [selectedType, setSelectedType] = useState(hasPredefinedType ? paramType : '')
  // Every protocol the visitor wants. The first one drives the questions; all of them go to the portal.
  const [picks, setPicks] = useState<string[]>(hasPredefinedType ? [paramType] : [])
  const togglePick = (id: string) => {
    const next = picks.includes(id) ? picks.filter(x => x !== id) : [...picks, id]
    setPicks(next)
    setSelectedType(next[0] ?? '')
  }
  const [isCaregiver, setIsCaregiver] = useState(false)
  // Arriving from the hero (sex or a pathway carried in), skip the welcome.
  const [phase, setPhase] = useState<Phase>(sexCarried || hasPredefinedType ? phasesFor(opts)[0] : 'intro')
  const [dir, setDir] = useState(1)
  const [age, setAge] = useState('')
  const [s1, setS1] = useState('')
  const [source, setSource] = useState('')
  const refCode = (params.get('ref') || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32)
  const { open } = useSignupGate()
  // Captured after question 3; kept in memory only, never in the session draft.
  const [saved, setSaved] = useState<{ email: string; name: string } | null>(null)

  // A refresh, a mis-tap on Back, or a phone call used to destroy the answers
  // with no warning. sessionStorage keeps them for this tab only.
  const DRAFT_KEY = 'apex.start.draft.v2'
  const [restored, setRestored] = useState(false)
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.selectedType) setSelectedType(d.selectedType)
        if (Array.isArray(d.picks)) setPicks(d.picks)
        if (typeof d.isCaregiver === 'boolean') setIsCaregiver(d.isCaregiver)
        if (d.sex === 'men' || d.sex === 'women') setSex(d.sex)
        if (d.age) setAge(d.age)
        if (d.s1) setS1(d.s1)
        if (d.source) setSource(d.source)
        // Never restore straight back into the result screens.
        if (d.phase && d.phase !== 'loading' && d.phase !== 'eligible' && phasesFor(opts).includes(d.phase)) setPhase(d.phase)
      }
    } catch { /* private mode, quota, disabled storage: start fresh. */ }
    setRestored(true)
    // Restore once, on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!restored) return
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ selectedType, picks, isCaregiver, phase, sex, age, s1, source }))
    } catch { /* storage unavailable: the funnel still works, it just won't resume. */ }
  }, [restored, selectedType, picks, isCaregiver, phase, sex, age, s1, source])

  const config = CONFIGS[selectedType] ?? CONFIGS.hormone

  // Every screen counts, including anything answered upstream (lib/startFunnel.ts).
  const questionPhases = phasesFor(opts) as Phase[]
  const currentStep = stepNumber(phase as StartPhase, opts)
  const totalSteps = startTotal()
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

  const q1Question = isCaregiver ? config.q1 : (SELF_Q1_OVERRIDES[selectedType] ?? config.q1)
  const signupQs = new URLSearchParams()
  if (isCaregiver) signupQs.set('type', 'caregiver')
  if (source) signupQs.set('src', source)
  if (refCode) signupQs.set('ref', refCode)
  if (sex) signupQs.set('for', sex)
  if (age) signupQs.set('age', age)
  const portalPrograms = picks.map(id => PORTAL_PROGRAM[id]).filter(Boolean)
  if (portalPrograms.length) signupQs.set('programs', portalPrograms.join('|'))
  const pickTitles = picks.map(PICK_LABEL)
  const programmeLine = pickTitles.length > 1 ? `${pickTitles.slice(0, -1).join(', ')} and ${pickTitles[pickTitles.length - 1]}` : config.title
  const whyId = params.get('why') || ''
  if (whyId) signupQs.set('why', whyId)
  const signupUrl = `https://app.apexmetabolichealth.com.au/signup${signupQs.toString() ? `?${signupQs}` : ''}`
  const eyebrow = `Step ${currentStep} of ${totalSteps}`
  const tap = (fn: () => void) => { fn(); setTimeout(advance, 220) }

  return (
    <>
      {/* A funnel should not offer six ways out of itself. The full site nav is
          replaced by the mark and one deliberate exit. */}
      <header className="fixed top-0 left-0 right-0 z-40" style={{ background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto flex items-center justify-between" style={{ maxWidth: 1200, padding: '14px 20px' }}>
          <Link href="/" aria-label="Apex Metabolic Health home"><Logo /></Link>
          <Link href="/" className="t-mono" style={{ color: 'var(--text-muted)', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>
            Save and exit
          </Link>
        </div>
      </header>
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 quiz-bg" />

        <AnimatePresence mode="wait">
          {phase === 'intro' && <IntroScreen key="intro" onStart={() => go(questionPhases[0])} />}
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
                <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45, delay: 0.1, ease }} className="mx-auto mb-8 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--stage-ice)', border: '1px solid var(--stage-glass-edge)', boxShadow: '0 0 0 8px color-mix(in srgb, var(--stage-cyan) 14%, transparent)' }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7"><path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="stage-kicker">
                  <span className="stage-kicker-dot" aria-hidden="true" /> Your pathway
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }} className="t-h2 mb-4" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>
                  {isCaregiver ? 'Here is where their plan starts.' : 'Here is where your plan starts.'}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }} className="mb-3 leading-relaxed" style={{ color: DIM, fontSize: 16 }}>
                  From what {isCaregiver ? 'you told us about them' : 'you told us'}, {picks.length > 1 ? <>these are the pathways built for it: <strong style={{ color: TEXT }}>{programmeLine}</strong>.</> : <>this is the pathway built for it: <strong style={{ color: TEXT }}>{config.title}</strong>.</>} Whether it’s right for {isCaregiver ? 'them' : 'you'} is a decision your doctor makes after your bloods.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.38, ease }} className="mb-6">
                  <p className="t-mono mb-2" style={{ color: DIM, fontSize: 12 }}>{picks.length ? 'Your protocols · tap to add or remove' : 'Add a protocol'}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {PICKS.filter(t => t.id !== 'general').map(t => {
                      const on = picks.includes(t.id)
                      return (
                        <button key={t.id} type="button" onClick={() => togglePick(t.id)} aria-pressed={on} className="rounded-full text-[13px] font-medium transition-colors" style={{ padding: '7px 12px', background: on ? 'var(--stage-ink)' : 'var(--stage-white)', color: on ? '#fff' : TEXT, border: `1px solid ${on ? 'var(--stage-ink)' : BORDER}`, cursor: 'pointer' }}>
                          {on ? '✓ ' : '+ '}{t.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Everlab: show the value before asking for an email. */}
                {picks.filter(id => FOCUS[id]).length > 0 && (
                  <div className="quiz-focus mb-6">
                    <p className="quiz-gets-k">Your areas to look at</p>
                    {picks.filter(id => FOCUS[id]).map((id, i) => (
                      <motion.div key={id} initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }} className="quiz-focus-card">
                        <ArtImg src={FOCUS[id].art} alt="" aria-hidden="true" />
                        <span><strong>{PICK_LABEL(id)}</strong><span>On your panel: {(women && WOMEN_FOCUS[id]) || FOCUS[id].markers}.</span></span>
                      </motion.div>
                    ))}
                  </div>
                )}
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
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4, ease }} className="glass-card mb-8" style={{ padding: 14, borderRadius: 22 }}>
                    <p className="t-mono m-0 mb-2" style={{ color: DIM, fontSize: 12 }}>What it costs</p>
                    {/* Consult first, mirroring the homepage hero price line (Noah, 24 Oct 2026).
                        Alternative, bloods first: grid-cols-3 with
                          [{ n: '$199', l: 'Bloods from' }, { n: '$199', l: 'Doctor consult from' }, { n: '$99/mo', l: 'Membership' }]
                        "$99 therapeutic peptide consults" is held back for TGA advertising risk. */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3">
                      {[{ n: '$99', l: 'Doctor consults from, members' }, { n: '$199', l: 'Doctor consults from, standard' }, { n: '$199', l: 'Bloods from' }, { n: '$99/mo', l: 'Membership' }].map(r => (
                        <div key={r.l}>
                          <span className="t-mono block mb-1" style={{ color: DIM, fontSize: 12 }}>{r.l}</span>
                          <span className="t-readout block" style={{ fontSize: 24, color: TEXT }}>{r.n}</span>
                        </div>
                      ))}
                    </div>
                    <p className="m-0 mt-3 text-[13px]" style={{ color: DIM }}>Private clinic, no Medicare rebate. Creating an account is free. <Link href="/pricing" className="link-draw" style={{ color: TEXT }}>Full pricing</Link></p>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease }} className="flex flex-col gap-3 w-full" style={{ maxWidth: 400, margin: '0 auto' }}>
                  <button type="button" onClick={() => { if (saved) { const sep = signupUrl.includes('?') ? '&' : '?'; window.location.href = `${signupUrl}${sep}email=${encodeURIComponent(saved.email)}${saved.name ? `&name=${encodeURIComponent(saved.name)}` : ''}`; return } open(undefined, { capture: true, program: pickTitles.length ? pickTitles.join(', ') : config.title, signupUrl }) }} className="btn-primary w-full justify-center" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
                    {isCaregiver ? 'Create a caregiver account' : 'Create your free account'}
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <a href="https://app.apexmetabolichealth.com.au/login" className="w-full flex items-center justify-center font-medium" style={{ color: DIM, fontSize: 14, padding: '15px 32px', borderRadius: 999, border: `1.5px solid ${BORDER}`, textDecoration: 'none', background: 'rgba(255,255,255,0.8)' }}>
                    Already have an account? Log in
                  </a>
                  <p className="text-[12px] mt-2" style={{ color: DIM }}>Reviewed by an AHPRA-registered doctor · Confidential · A consultation never guarantees a prescription</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {showProgress && (
          <div className="quiz-split">
          <QuizAside phase={phase} />
          <div className="relative quiz-main" style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px', width: '100%' }}>
            <ProgressBar current={currentStep} total={totalSteps} onBack={back} canBack={questionPhases.indexOf(phase) > 0} />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={phase} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease }}>

                {phase === 'sex' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title="Who is the panel for?" sub="Men and women get different markers, because the questions are different." />
                    <div className="grid grid-cols-2 gap-3">
                      {SEX_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} sub={opt.sub} compact selected={sex === opt.id} onClick={() => tap(() => { setSex(opt.id); setAudience(opt.id) })} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'age' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={isCaregiver ? 'How old are they?' : 'How old are you?'} sub="Your doctor reads every marker against your age." />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {AGE_BANDS.map((b, i) => (
                        <OptionCard key={b} index={i} label={ageLabel(b)} compact selected={age === b} onClick={() => tap(() => setAge(b))} />
                      ))}
                    </div>
                    <button type="button" onClick={() => setIsCaregiver(c => !c)} aria-pressed={isCaregiver} className="mx-auto text-[14px] font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer', minHeight: 44 }}>
                      {isCaregiver ? 'Doing this for yourself? Switch back' : 'Doing this for someone you care for?'}
                    </button>
                  </div>
                )}

                {phase === 'pick' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={isCaregiver ? 'What are they after?' : 'What are you after?'} sub="Pick one or more. One blood panel and one doctor call cover everything you pick." />
                    <div className="flex flex-col gap-3">
                      {PICKS.filter(t => t.id !== 'general').map((t, i) => (
                        <OptionCard key={t.id} index={i} label={t.label} sub={t.sub} selected={picks.includes(t.id)} onClick={() => togglePick(t.id)} />
                      ))}
                    </div>
                    <button type="button" onClick={() => { setPicks([]); setSelectedType('general'); advance() }} className="mx-auto text-[14px] font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer', minHeight: 44 }}>
                      Not sure yet, I’d like to talk to a doctor
                    </button>
                    <div className="sticky bottom-4 z-10">
                      <button type="button" disabled={!picks.length} onClick={advance} className="btn-primary w-full justify-center disabled:opacity-40" style={{ fontSize: 16, padding: '17px 32px', borderRadius: 999 }}>
                        {picks.length > 1 ? `Continue with ${picks.length} protocols` : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {phase === 'email' && <EmailScreen eyebrow={eyebrow} program={pickTitles.length ? pickTitles.join(', ') : config.title} onSaved={(email, name) => { setSaved({ email, name }); advance() }} onSkip={advance} />}

                {phase === 'q1' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title={q1Question} sub="One tap. Your doctor reads it before the call." />
                    <div className="flex flex-col gap-3">
                      {config.opts1.map((opt, i) => (
                        <OptionCard key={opt} index={i} label={opt} selected={s1 === opt} onClick={() => tap(() => setS1(opt))} />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 'source' && (
                  <div className="flex flex-col gap-5">
                    <StepHeading eyebrow={eyebrow} title="Where did you hear about Apex?" sub="Last one. It helps us spend less on ads and more on doctors." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SOURCE_OPTIONS.map((opt, i) => (
                        <OptionCard key={opt.id} index={i} label={opt.label} selected={source === opt.id} onClick={() => tap(() => setSource(opt.id))} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {(phase === 'q1' || phase === 'source' || phase === 'age') && (
              <div className="flex justify-end mt-6">
                <button type="button" onClick={advance} className="text-sm font-medium link-draw" style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer', minHeight: 44 }}>Skip this question</button>
              </div>
            )}
          </div>
          </div>
        )}
      </main>
    </>
  )
}
