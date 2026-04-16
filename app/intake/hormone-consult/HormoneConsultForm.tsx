'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'

const STORAGE_KEY = 'apex-hormone-consult-v1'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const TOTAL = 6
const ACCENT = '#4890f7'
const ACCENT_BG = 'rgba(72,144,247,0.07)'
const ACCENT_BORDER = 'rgba(72,144,247,0.2)'

const STEP_LABELS = [
  'Personal Details',
  'Symptoms & Goals',
  'Medical History',
  'Lifestyle',
  'Prior Testing',
  'Declaration',
]

const AU_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

const CONDITIONS = [
  'Cancer',
  'Diabetes',
  'High Blood Pressure',
  'Kidney Disease',
  'Liver Disease',
  'Heart Condition',
  'DVT / Blood Clots',
  'Seizures',
  'Anxiety / Depression',
  'Hair Loss',
  'Muscle / Joint Pain',
  'None of the above',
]

const SYMPTOMS = [
  'Low energy / fatigue',
  'Reduced libido',
  'Difficulty building muscle',
  'Increased body fat',
  'Brain fog / poor concentration',
  'Mood changes / irritability',
  'Poor sleep quality',
  'Reduced motivation / drive',
  'Erectile dysfunction',
  'Hot flushes / night sweats',
  'Joint aches / reduced recovery',
  'Thinning hair',
]

const DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  '1–2 years',
  '2–5 years',
  'More than 5 years',
]

interface D {
  // Step 1 — Personal Details
  firstName: string
  lastName: string
  dob: string
  email: string
  mobile: string
  state: string
  weightKg: string
  heightCm: string
  occupation: string
  gpName: string
  // Step 2 — Symptoms & Goals
  mainConcern: string
  symptoms: string[]
  symptomDuration: string
  energyScore: string
  libidoScore: string
  moodScore: string
  sleepScore: string
  mentalScore: string
  // Step 3 — Medical History
  conditions: string[]
  medications: string
  allergies: string
  familyHistory: string
  // Step 4 — Lifestyle
  exerciseFrequency: string
  sleepHours: string
  stressScore: string
  alcoholPerWeek: string
  smokingStatus: string
  typicalDiet: string
  // Step 5 — Prior Testing
  recentBloods: string
  priorHormoneTests: string
  currentHormoneRx: string
  supplementsCurrent: string
  // Step 6 — Declaration
  printName: string
  ageConfirm: boolean
  consent: boolean
}

const EMPTY: D = {
  firstName: '', lastName: '', dob: '', email: '', mobile: '', state: '',
  weightKg: '', heightCm: '', occupation: '', gpName: '',
  mainConcern: '', symptoms: [], symptomDuration: '',
  energyScore: '', libidoScore: '', moodScore: '', sleepScore: '', mentalScore: '',
  conditions: [], medications: '', allergies: '', familyHistory: '',
  exerciseFrequency: '', sleepHours: '', stressScore: '', alcoholPerWeek: '',
  smokingStatus: '', typicalDiet: '',
  recentBloods: '', priorHormoneTests: '', currentHormoneRx: '', supplementsCurrent: '',
  printName: '', ageConfirm: false, consent: false,
}

const ease = [0.22, 1, 0.36, 1] as const

// ── Primitive components ──────────────────────────────────────────────────────

function F({
  label, name, value, onChange, type = 'text', placeholder = '', required = false, hint,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#8899aa' }}>
        {label}{required && <span style={{ color: ACCENT }}> *</span>}
      </label>
      {hint && <p className="text-[11px]" style={{ color: '#4a5a6a' }}>{hint}</p>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-150"
        style={{
          background: '#0d1520',
          border: '1px solid rgba(148,163,184,0.1)',
          color: '#f0f4f8',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT_BG}` }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function TA({
  label, name, value, onChange, placeholder = '', rows = 3, hint,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#8899aa' }}>
        {label}
      </label>
      {hint && <p className="text-[11px]" style={{ color: '#4a5a6a' }}>{hint}</p>}
      <textarea
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg px-4 py-3 text-sm outline-none resize-none transition-all duration-150"
        style={{
          background: '#0d1520',
          border: '1px solid rgba(148,163,184,0.1)',
          color: '#f0f4f8',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT_BG}` }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function Cards({
  label, options, value, onChange, multi = false,
}: {
  label: string; options: string[]; value: string | string[]; onChange: (v: string | string[]) => void
  multi?: boolean
}) {
  const selected = Array.isArray(value) ? value : (value ? [value] : [])
  const toggle = (opt: string) => {
    if (multi) {
      const arr = selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]
      onChange(arr)
    } else {
      onChange(selected.includes(opt) ? '' : opt)
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#8899aa' }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: active ? ACCENT_BG : '#0d1520',
                border: `1px solid ${active ? ACCENT : 'rgba(148,163,184,0.1)'}`,
                color: active ? ACCENT : '#8899aa',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Score({
  label, value, onChange, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#8899aa' }}>{label}</p>
        {value !== '' && (
          <span className="text-sm font-bold" style={{ color: ACCENT }}>{value} / 10</span>
        )}
      </div>
      {hint && <p className="text-[11px]" style={{ color: '#4a5a6a' }}>{hint}</p>}
      <div className="flex gap-1.5">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(String(i))}
            className="flex-1 py-2.5 rounded-md text-xs font-semibold transition-all duration-150"
            style={{
              background: value === String(i) ? ACCENT : '#0d1520',
              border: `1px solid ${value === String(i) ? ACCENT : 'rgba(148,163,184,0.08)'}`,
              color: value === String(i) ? '#fff' : '#4a5a6a',
            }}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px]" style={{ color: '#3a4a5a' }}>
        <span>Very low</span>
        <span>Very high</span>
      </div>
    </div>
  )
}

function Div({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background: 'rgba(148,163,184,0.07)' }} />
      <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#2e3d4d' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(148,163,184,0.07)' }} />
    </div>
  )
}

function Head({ step, title, sub }: { step: number; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
        Step {step} of {TOTAL} — {STEP_LABELS[step - 1]}
      </p>
      <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6b7a8d', maxWidth: '500px' }}>{sub}</p>}
    </div>
  )
}

function Chk({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-all duration-150"
        style={{
          background: checked ? ACCENT : 'transparent',
          border: `2px solid ${checked ? ACCENT : 'rgba(148,163,184,0.25)'}`,
        }}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{children}</span>
    </label>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HormoneConsultForm() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [d, setD] = useState<D>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = useCallback((field: keyof D, val: unknown) => {
    setD(prev => ({ ...prev, [field]: val }))
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setD(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (step > 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) } catch {}
    }
  }, [d, step])

  // Validation per step
  const canNext = (() => {
    if (step === 1) return !!(d.firstName && d.lastName && d.mobile && d.email && d.dob && d.state)
    if (step === 2) return !!(d.mainConcern && d.symptomDuration)
    if (step === 6) return !!(d.ageConfirm && d.consent && d.printName)
    return true
  })()

  const go = (delta: number) => {
    setDir(delta)
    setStep(s => s + delta)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          formType: 'Hormone Consult Intake',
          subject: `Apex Hormone Consult — ${d.firstName} ${d.lastName}`,
          ...d,
          symptoms: d.symptoms.join(', '),
          conditions: d.conditions.join(', '),
          submittedAt: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error('Submission failed')
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: ACCENT_BG, border: `2px solid ${ACCENT}` }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M5 12l5 5L20 7" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#f0f4f8', marginBottom: '1rem' }}>
                Form submitted.
              </h1>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#6b7a8d' }}>
                Thank you, {d.firstName}. Your hormone consult intake has been received by our clinical team. You&apos;ll hear from us within 1 business day to confirm next steps.
              </p>

              <div className="rounded-xl p-5 text-left mb-8"
                style={{ background: '#0d1117', border: '1px solid rgba(148,163,184,0.08)' }}>
                <p className="text-xs font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: '#4a5a6a' }}>What happens next</p>
                <div className="flex flex-col gap-3">
                  {[
                    ['Review', 'Your intake is reviewed by our clinical team.'],
                    ['Blood Panel', 'You\'ll receive a referral for your blood panel — collected at any accredited collection centre.'],
                    ['Consultation', 'Once results are in, your doctor reviews them and contacts you to schedule your telehealth consultation.'],
                    ['Protocol', 'Your personalised clinical protocol is prepared and treatment commences where clinically appropriate.'],
                  ].map(([title, desc], i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}>
                        <span className="text-[10px] font-bold" style={{ color: ACCENT }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: '#c5cdd6' }}>{title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#4a5a6a' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/" className="btn-ghost">Back to home</Link>
            </motion.div>
          </div>
        </main>
      </>
    )
  }

  // ── Welcome screen (step 0) ─────────────────────────────────────────────────
  if (step === 0) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: ACCENT }}>
                Hormone Consult Intake
              </p>

              <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f0f4f8', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Your hormone health,<br />
                <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #7bb3ff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  assessed properly.
                </span>
              </h1>

              <p className="text-sm leading-relaxed mb-8" style={{ color: '#6b7a8d', maxWidth: '440px' }}>
                This intake form takes approximately 8–10 minutes to complete. Your responses are reviewed by an AHPRA-registered doctor before your consultation.
              </p>

              <div className="rounded-xl p-5 mb-8"
                style={{ background: '#0d1117', border: '1px solid rgba(148,163,184,0.07)' }}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    ['6 sections', 'Thorough clinical picture'],
                    ['8–10 min', 'Typical completion time'],
                    ['Saved progress', 'Resume where you left off'],
                  ].map(([stat, label]) => (
                    <div key={stat}>
                      <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>{stat}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#4a5a6a' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  'Your information is stored securely and only accessed by clinical staff.',
                  'This form does not constitute a diagnosis or prescription.',
                  'Treatment is only initiated where clinically appropriate.',
                ].map(note => (
                  <div key={note} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                    </div>
                    <p className="text-xs" style={{ color: '#4a5a6a' }}>{note}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ background: ACCENT, color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                Begin intake
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          </div>
        </main>
      </>
    )
  }

  // ── Progress bar ────────────────────────────────────────────────────────────
  const pct = Math.round((step / TOTAL) * 100)

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Progress */}
        <div className="sticky top-16 z-30" style={{ backgroundColor: '#070a0d', borderBottom: '1px solid rgba(148,163,184,0.06)' }}>
          <div className="container-tight max-w-2xl mx-auto py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#4a5a6a' }}>
                {STEP_LABELS[step - 1]}
              </p>
              <p className="text-[11px] font-semibold" style={{ color: ACCENT }}>{pct}%</p>
            </div>
            <div className="w-full h-1 rounded-full" style={{ background: 'rgba(148,163,184,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: ACCENT }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="container-tight max-w-2xl mx-auto pt-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── Step 1: Personal Details ── */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <Head step={1} title="Personal Details" sub="We need these to prepare your consultation and clinical file." />
                  <Div label="Name & Contact" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="First name" name="firstName" value={d.firstName} onChange={v => set('firstName', v)} required />
                    <F label="Last name" name="lastName" value={d.lastName} onChange={v => set('lastName', v)} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Date of birth" name="dob" type="date" value={d.dob} onChange={v => set('dob', v)} required />
                    <F label="Mobile number" name="mobile" type="tel" value={d.mobile} onChange={v => set('mobile', v)} placeholder="04XX XXX XXX" required />
                  </div>
                  <F label="Email address" name="email" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@email.com" required />

                  <Div label="Location & Profile" />
                  <Cards label="State / Territory *" options={AU_STATES} value={d.state} onChange={v => set('state', v as string)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Weight (kg)" name="weightKg" type="number" value={d.weightKg} onChange={v => set('weightKg', v)} placeholder="e.g. 85" />
                    <F label="Height (cm)" name="heightCm" type="number" value={d.heightCm} onChange={v => set('heightCm', v)} placeholder="e.g. 180" />
                  </div>
                  <F label="Occupation" name="occupation" value={d.occupation} onChange={v => set('occupation', v)} placeholder="e.g. Engineer" />

                  <Div label="GP Details" />
                  <F label="Regular GP name" name="gpName" value={d.gpName} onChange={v => set('gpName', v)} placeholder="Dr..." hint="We may send a clinical summary to your GP with your consent." />
                </div>
              )}

              {/* ── Step 2: Symptoms & Goals ── */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <Head step={2} title="Symptoms & Goals" sub="Tell us what you're experiencing and what you'd like to achieve." />

                  <TA label="Main concern *" name="mainConcern" value={d.mainConcern} onChange={v => set('mainConcern', v)} placeholder="Describe your main symptoms and what's been affecting you..." rows={4} />

                  <Cards label="How long have you been experiencing these symptoms? *" options={DURATION_OPTIONS} value={d.symptomDuration} onChange={v => set('symptomDuration', v as string)} />

                  <Div label="Symptom Checklist" />
                  <Cards label="Select all that apply" options={SYMPTOMS} value={d.symptoms} onChange={v => set('symptoms', v)} multi />

                  <Div label="Severity Ratings — Rate how you feel right now" />
                  <Score label="Energy level" value={d.energyScore} onChange={v => set('energyScore', v)} hint="0 = exhausted all the time, 10 = high energy consistently" />
                  <Score label="Libido / sexual drive" value={d.libidoScore} onChange={v => set('libidoScore', v)} />
                  <Score label="Mood & emotional stability" value={d.moodScore} onChange={v => set('moodScore', v)} />
                  <Score label="Sleep quality" value={d.sleepScore} onChange={v => set('sleepScore', v)} hint="0 = chronically poor sleep, 10 = consistently restorative" />
                  <Score label="Mental clarity / focus" value={d.mentalScore} onChange={v => set('mentalScore', v)} />
                </div>
              )}

              {/* ── Step 3: Medical History ── */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <Head step={3} title="Medical History" sub="Accurate medical history allows us to design a safe, appropriate protocol." />

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#8899aa' }}>
                      Existing conditions — select all that apply
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CONDITIONS.map(cond => (
                        <label key={cond} className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 transition-all duration-150"
                          style={{
                            background: d.conditions.includes(cond) ? ACCENT_BG : '#0d1520',
                            border: `1px solid ${d.conditions.includes(cond) ? ACCENT_BORDER : 'rgba(148,163,184,0.07)'}`,
                          }}>
                          <button
                            type="button"
                            onClick={() => {
                              const arr = d.conditions.includes(cond)
                                ? d.conditions.filter(x => x !== cond)
                                : [...d.conditions, cond]
                              set('conditions', arr)
                            }}
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                            style={{
                              background: d.conditions.includes(cond) ? ACCENT : 'transparent',
                              border: `2px solid ${d.conditions.includes(cond) ? ACCENT : 'rgba(148,163,184,0.25)'}`,
                            }}
                          >
                            {d.conditions.includes(cond) && (
                              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                          <span className="text-sm" style={{ color: d.conditions.includes(cond) ? '#c5cdd6' : '#6b7a8d' }}>{cond}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <TA label="Current medications & doses" name="medications" value={d.medications} onChange={v => set('medications', v)} placeholder="Include all prescription medications, including any hormone therapies..." rows={3} />
                  <TA label="Known allergies" name="allergies" value={d.allergies} onChange={v => set('allergies', v)} placeholder="Medications, substances, or materials..." rows={2} />
                  <TA label="Relevant family history" name="familyHistory" value={d.familyHistory} onChange={v => set('familyHistory', v)} placeholder="e.g. father: cardiovascular disease; brother: Type 2 diabetes..." rows={3} />
                </div>
              )}

              {/* ── Step 4: Lifestyle ── */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <Head step={4} title="Lifestyle" sub="Your daily habits directly influence your hormonal health." />

                  <Cards
                    label="Exercise frequency"
                    options={['Sedentary', '1–2 × / week', '3–4 × / week', '5+ × / week', 'Competitive athlete']}
                    value={d.exerciseFrequency}
                    onChange={v => set('exerciseFrequency', v as string)}
                  />

                  <Cards
                    label="Average nightly sleep"
                    options={['Under 5 hrs', '5–6 hrs', '6–7 hrs', '7–8 hrs', '8+ hrs']}
                    value={d.sleepHours}
                    onChange={v => set('sleepHours', v as string)}
                  />

                  <Score label="Current stress level" value={d.stressScore} onChange={v => set('stressScore', v)} hint="0 = no stress, 10 = extreme ongoing stress" />

                  <Cards
                    label="Alcohol consumption"
                    options={['None', '1–2 drinks / week', '3–7 drinks / week', '8–14 drinks / week', '14+ drinks / week']}
                    value={d.alcoholPerWeek}
                    onChange={v => set('alcoholPerWeek', v as string)}
                  />

                  <Cards
                    label="Smoking status"
                    options={['Non-smoker', 'Ex-smoker', 'Occasional', 'Daily']}
                    value={d.smokingStatus}
                    onChange={v => set('smokingStatus', v as string)}
                  />

                  <TA label="Typical diet" name="typicalDiet" value={d.typicalDiet} onChange={v => set('typicalDiet', v)} placeholder="Describe your typical daily eating pattern, dietary restrictions, or approach (e.g. low carb, high protein, intermittent fasting)..." rows={3} />
                </div>
              )}

              {/* ── Step 5: Prior Testing ── */}
              {step === 5 && (
                <div className="flex flex-col gap-6">
                  <Head step={5} title="Prior Testing" sub="Understanding your testing history helps us determine what's needed next." />

                  <Cards
                    label="Have you had hormone-related blood tests before?"
                    options={['Yes, recently (last 6 months)', 'Yes, more than 6 months ago', 'Yes, more than 2 years ago', 'No, never']}
                    value={d.recentBloods}
                    onChange={v => set('recentBloods', v as string)}
                  />

                  <TA label="Prior hormone test results" name="priorHormoneTests" value={d.priorHormoneTests} onChange={v => set('priorHormoneTests', v)} placeholder="If you have previous results, please note the key values here (e.g. total testosterone: 12 nmol/L, tested Jan 2024)..." rows={4} hint="You can also upload results during or after your consultation." />

                  <Cards
                    label="Are you currently on any hormone therapy or TRT?"
                    options={['Yes', 'No', 'Previously, but stopped']}
                    value={d.currentHormoneRx}
                    onChange={v => set('currentHormoneRx', v as string)}
                  />

                  <TA label="Current supplements" name="supplementsCurrent" value={d.supplementsCurrent} onChange={v => set('supplementsCurrent', v)} placeholder="e.g. Zinc, Vitamin D, Magnesium, Ashwagandha, Creatine..." rows={2} />

                  <div className="rounded-xl p-4" style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.07)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#4a5a6a' }}>Don&apos;t have recent bloods?</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#3a4a5a' }}>
                      No problem — we&apos;ll issue a referral for your hormone panel after reviewing this intake. Testing is available at thousands of collection centres nationally.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Step 6: Declaration ── */}
              {step === 6 && (
                <div className="flex flex-col gap-6">
                  <Head step={6} title="Declaration" sub="Please review and confirm before we submit your intake." />

                  {/* Summary card */}
                  <div className="rounded-xl p-5" style={{ background: '#0d1117', border: '1px solid rgba(148,163,184,0.07)' }}>
                    <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#4a5a6a' }}>Summary</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {[
                        ['Name', `${d.firstName} ${d.lastName}`],
                        ['DOB', d.dob],
                        ['State', d.state],
                        ['Mobile', d.mobile],
                        ['Email', d.email],
                        ['GP', d.gpName || '—'],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: '#3a4a5a' }}>{label}</p>
                          <p className="text-sm mt-0.5 truncate" style={{ color: '#8899aa' }}>{val || '—'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-5 rounded-xl" style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.07)' }}>
                    <Chk checked={d.ageConfirm} onChange={v => set('ageConfirm', v)}>
                      I confirm I am 18 years of age or older. *
                    </Chk>
                    <Chk checked={d.consent} onChange={v => set('consent', v)}>
                      I consent to my information being used by Apex Metabolic Health clinical staff to assess my suitability for treatment and facilitate my consultation. I understand this form does not constitute a diagnosis or guarantee of treatment. *
                    </Chk>
                  </div>

                  <F
                    label="Full name (digital signature) *"
                    name="printName"
                    value={d.printName}
                    onChange={v => set('printName', v)}
                    placeholder="Type your full legal name"
                  />
                  <p className="text-[11px]" style={{ color: '#2e3d4d' }}>
                    Date: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>

                  {error && (
                    <p className="text-sm rounded-lg px-4 py-3" style={{ color: '#f87171', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
                      {error}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
            <button
              onClick={() => go(-1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-150"
              style={{ color: '#6b7a8d', background: '#0d1520', border: '1px solid rgba(148,163,184,0.08)' }}
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            {step < TOTAL ? (
              <button
                onClick={() => canNext && go(1)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  background: ACCENT,
                  color: '#fff',
                  opacity: canNext ? 1 : 0.4,
                  cursor: canNext ? 'pointer' : 'not-allowed',
                }}
              >
                Continue
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => canNext && !submitting && submit()}
                disabled={submitting || !canNext}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                style={{
                  background: ACCENT,
                  color: '#fff',
                  opacity: canNext && !submitting ? 1 : 0.4,
                  cursor: canNext && !submitting ? 'pointer' : 'not-allowed',
                }}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit intake
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
