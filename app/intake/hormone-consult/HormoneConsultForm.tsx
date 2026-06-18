'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import BookingChoice from '@/components/BookingChoice'

const STORAGE_KEY = 'apex-hormone-consult-v3'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const TOTAL = 4
const ACCENT = '#4890f7'
const ACCENT_BG = 'rgba(72,144,247,0.06)'
const ACCENT_BORDER = 'rgba(72,144,247,0.18)'

const STEP_LABELS = [
  'About You',
  'Your Symptoms',
  'Health Background',
  'Final Details',
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
  // Step 1 — About You
  firstName: string
  lastName: string
  dob: string
  email: string
  mobile: string
  state: string
  weightKg: string
  heightCm: string
  // Step 2 — Symptoms
  mainConcern: string
  symptoms: string[]
  symptomDuration: string
  energyScore: string
  healthScore: string
  // Step 3 — Health Background
  conditions: string[]
  medications: string
  allergies: string
  exerciseFrequency: string
  sleepHours: string
  alcoholPerWeek: string
  smokingStatus: string
  // Step 3 extras
  familyHistory: string
  dietScore: string
  supplementsCurrent: string
  // Step 4 — Final Details
  pathway: string
  recentBloods: string
  currentHormoneRx: string
  ageConfirm: boolean
  consent: boolean
  printName: string
}

const EMPTY: D = {
  firstName: '', lastName: '', dob: '', email: '', mobile: '', state: '',
  weightKg: '', heightCm: '',
  mainConcern: '', symptoms: [], symptomDuration: '', energyScore: '', healthScore: '',
  conditions: [], medications: '', allergies: '',
  exerciseFrequency: '', sleepHours: '', alcoholPerWeek: '', smokingStatus: '',
  familyHistory: '', dietScore: '', supplementsCurrent: '',
  pathway: '', recentBloods: '', currentHormoneRx: '',
  ageConfirm: false, consent: false, printName: '',
}

const ease = [0.22, 1, 0.36, 1] as const

// ── Primitives ────────────────────────────────────────────────────────────────

function F({ label, name, value, onChange, type = 'text', placeholder = '', hint }: {
  label: string; name: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
        {label}
      </label>
      {hint && <p className="text-[11px]" style={{ color: ACCENT }}>{hint}</p>}
      <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg px-4 py-3 outline-none transition-all duration-150"
        style={{ fontSize: '16px', background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)', color: 'var(--text-primary)' }}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT_BG}` }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function TA({ label, name, value, onChange, placeholder = '', rows = 3, hint }: {
  label: string; name: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>{label}</label>
      {hint && <p className="text-[11px]" style={{ color: ACCENT }}>{hint}</p>}
      <textarea name={name} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full rounded-lg px-4 py-3 outline-none resize-none transition-all duration-150"
        style={{ fontSize: '16px', background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)', color: 'var(--text-primary)' }}
        onFocus={e => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.boxShadow = `0 0 0 3px ${ACCENT_BG}` }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function Cards({ label, options, value, onChange, multi = false }: {
  label: string; options: string[]; value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean
}) {
  const selected = Array.isArray(value) ? value : (value ? [value] : [])
  const toggle = (opt: string) => {
    if (multi) {
      onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt])
    } else {
      onChange(selected.includes(opt) ? '' : opt)
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = selected.includes(opt)
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: active ? ACCENT_BG : 'var(--surface)',
                border: `1px solid ${active ? ACCENT : 'rgba(72,144,247,0.18)'}`,
                color: active ? ACCENT : 'var(--text-primary)',
              }}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Score({ label, value, onChange, hint }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {value !== '' && <span className="text-sm font-bold" style={{ color: ACCENT }}>{value} / 10</span>}
      </div>
      {hint && <p className="text-[11px]" style={{ color: 'var(--text-primary)' }}>{hint}</p>}
      <div className="flex gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <button key={i} type="button" onClick={() => onChange(String(i))}
            className="flex-1 rounded-md text-xs font-semibold transition-all duration-150"
            style={{
              minHeight: '44px',
              background: value === String(i) ? ACCENT : 'var(--surface)',
              border: `1px solid ${value === String(i) ? ACCENT : 'rgba(72,144,247,0.18)'}`,
              color: value === String(i) ? '#fff' : ACCENT,
            }}>
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[10px]" style={{ color: '#4890f7' }}>
        <span>Very low</span><span>Very high</span>
      </div>
    </div>
  )
}

function Div({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background: 'rgba(72,144,247,0.12)' }} />
      <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#4890f7' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'rgba(72,144,247,0.12)' }} />
    </div>
  )
}

function Head({ step, title, sub }: { step: number; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: ACCENT }}>
        Step {step} of {TOTAL} — {STEP_LABELS[step - 1]}
      </p>
      <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>{sub}</p>}
    </div>
  )
}

function Chk({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <button type="button" onClick={() => onChange(!checked)}
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-all duration-150"
        style={{ background: checked ? ACCENT : 'transparent', border: `2px solid ${checked ? ACCENT : 'rgba(148,163,184,0.25)'}` }}
        aria-checked={checked} role="checkbox">
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{children}</span>
    </label>
  )
}

// ── Success screen ────────────────────────────────────────────────────────────

function Success({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mb-10" style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${ACCENT_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ACCENT_BG }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M5 12l5 5L19 7" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }} className="label mb-5">
        Intake received
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease }}
        className="font-bold tracking-tight mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
        {name ? `Thank you, ${name}.` : 'Thank you.'}<br />
        <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #6ba8ff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          We take it from here.
        </span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58, ease }}
        className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)', maxWidth: 440 }}>
        Your intake has been received. Our clinical team will review your details and be in touch within one business day to confirm next steps.
      </motion.p>
      <BookingChoice type="hormone" showDiscovery delay={0.7} />
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HormoneConsultForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [d, setD] = useState<D>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = useCallback((field: keyof D, val: unknown) => {
    setD(prev => ({ ...prev, [field]: val }))
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setD({ ...EMPTY, ...JSON.parse(saved) })
    } catch {}
  }, [])

  useEffect(() => {
    if (step > 0) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) } catch {}
    }
  }, [d, step])

  const canNext = true

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
          name: `${d.firstName} ${d.lastName}`,
          dob: d.dob,
          email: d.email,
          mobile: d.mobile,
          state: d.state,
          weight_kg: d.weightKg,
          height_cm: d.heightCm,
          main_concern: d.mainConcern,
          symptoms: d.symptoms.join(', '),
          symptom_duration: d.symptomDuration,
          energy_score: d.energyScore,
          health_score: d.healthScore,
          conditions: d.conditions.join(', ') || 'None selected',
          medications: d.medications,
          allergies: d.allergies,
          exercise_frequency: d.exerciseFrequency,
          sleep_hours: d.sleepHours,
          alcohol_per_week: d.alcoholPerWeek,
          smoking_status: d.smokingStatus,
          diet_score: d.dietScore,
          supplements: d.supplementsCurrent,
          family_history: d.familyHistory,
          pathway: d.pathway,
          recent_bloods: d.recentBloods,
          current_hormone_rx: d.currentHormoneRx,
          submittedAt: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error('Submission failed')
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      fetch('/api/send-confirmation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: d.email, firstName: d.firstName, formType: 'hormone-consult' }),
      }).catch(() => {})
      try {
        sessionStorage.setItem('apex_intake', JSON.stringify({
          enquiry: 'trt',
          hasBloods: d.recentBloods.startsWith('Yes'),
        }))
      } catch {}
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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

  // ── Welcome screen ────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <p className="label mb-4">Hormone Consultation</p>
              <h1 className="font-bold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
                Let&apos;s get you started.
              </h1>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)', maxWidth: '460px' }}>
                Four short steps — takes around 5 minutes. Your doctor reviews everything before your consultation.
              </p>

              <div className="flex flex-col gap-2.5 mb-8">
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
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{note}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => go(1)}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{ background: ACCENT, color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
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

  // ── Submitted ─────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto">
            <Success name={d.firstName} />
          </div>
        </main>
      </>
    )
  }

  // ── Progress bar ──────────────────────────────────────────────────────────
  const pct = Math.round((step / TOTAL) * 100)

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sticky top-16 z-30" style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid rgba(72,144,247,0.1)' }}>
          <div className="container-tight max-w-2xl mx-auto py-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
                {STEP_LABELS[step - 1]}
              </p>
              <p className="text-[11px] font-semibold" style={{ color: ACCENT }}>{pct}%</p>
            </div>
            <div className="w-full h-1 rounded-full" style={{ background: 'rgba(72,144,247,0.12)' }}>
              <motion.div className="h-full rounded-full" style={{ background: ACCENT }}
                animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
        </div>

        <div className="container-tight max-w-2xl mx-auto pt-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

              {/* ── Step 1: About You ── */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <Head step={1} title="About You" sub="Basic details we need to prepare your clinical file." />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="First name" name="firstName" value={d.firstName} onChange={v => set('firstName', v)} placeholder="James" />
                    <F label="Last name" name="lastName" value={d.lastName} onChange={v => set('lastName', v)} placeholder="Smith" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Date of birth" name="dob" type="date" value={d.dob} onChange={v => set('dob', v)} />
                    <F label="Mobile number" name="mobile" type="tel" value={d.mobile} onChange={v => set('mobile', v)} placeholder="04XX XXX XXX" />
                  </div>
                  <F label="Email address" name="email" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@email.com" />
                  <Cards label="State / Territory" options={AU_STATES} value={d.state} onChange={v => set('state', v as string)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Weight (kg)" name="weightKg" type="number" value={d.weightKg} onChange={v => set('weightKg', v)} placeholder="e.g. 85" />
                    <F label="Height (cm)" name="heightCm" type="number" value={d.heightCm} onChange={v => set('heightCm', v)} placeholder="e.g. 178" />
                  </div>
                </div>
              )}

              {/* ── Step 2: Your Symptoms ── */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <Head step={2} title="Your Symptoms" sub="Tell us what you're experiencing. The more detail you provide, the better prepared your doctor will be." />
                  <TA label="Main concern" name="mainConcern" value={d.mainConcern} onChange={v => set('mainConcern', v)}
                    placeholder="Describe your main symptoms and how they've been affecting you..." rows={4} />
                  <Cards label="How long have you been experiencing this?" options={DURATION_OPTIONS} value={d.symptomDuration} onChange={v => set('symptomDuration', v as string)} />
                  <Div label="Symptom checklist — select all that apply" />
                  <Cards label="" options={SYMPTOMS} value={d.symptoms} onChange={v => set('symptoms', v)} multi />
                  <Div label="How are you feeling right now?" />
                  <Score label="Energy level" value={d.energyScore} onChange={v => set('energyScore', v)} hint="0 = exhausted, 10 = high energy" />
                  <Score label="Overall health" value={d.healthScore} onChange={v => set('healthScore', v)} hint="0 = very poor, 10 = excellent" />
                </div>
              )}

              {/* ── Step 3: Health Background ── */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <Head step={3} title="Health Background" sub="Accurate history allows us to design a safe, appropriate protocol." />
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--text-primary)' }}>
                      Existing conditions — select all that apply
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CONDITIONS.map(cond => (
                        <label key={cond} className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 transition-all duration-150"
                          style={{
                            background: d.conditions.includes(cond) ? ACCENT_BG : 'var(--surface)',
                            border: `1px solid ${d.conditions.includes(cond) ? ACCENT_BORDER : 'rgba(72,144,247,0.18)'}`,
                          }}>
                          <button type="button"
                            onClick={() => set('conditions', d.conditions.includes(cond) ? d.conditions.filter(x => x !== cond) : [...d.conditions, cond])}
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                            style={{ background: d.conditions.includes(cond) ? ACCENT : 'transparent', border: `2px solid ${d.conditions.includes(cond) ? ACCENT : 'rgba(148,163,184,0.25)'}` }}>
                            {d.conditions.includes(cond) && (
                              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                          <span className="text-sm" style={{ color: d.conditions.includes(cond) ? ACCENT : 'var(--text-primary)' }}>{cond}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <TA label="Current medications & doses" name="medications" value={d.medications} onChange={v => set('medications', v)}
                    placeholder="Include all prescription medications, supplements, and hormone therapies..." rows={3} />
                  <TA label="Known allergies" name="allergies" value={d.allergies} onChange={v => set('allergies', v)}
                    placeholder="Medications, substances, or materials. Write 'None' if not applicable." rows={2} />
                  <Div label="Lifestyle" />
                  <Cards label="Exercise frequency" options={['Sedentary', '1–2 × / week', '3–4 × / week', '5+ × / week', 'Competitive athlete']}
                    value={d.exerciseFrequency} onChange={v => set('exerciseFrequency', v as string)} />
                  <Cards label="Average nightly sleep" options={['Under 5 hrs', '5–6 hrs', '6–7 hrs', '7–8 hrs', '8+ hrs']}
                    value={d.sleepHours} onChange={v => set('sleepHours', v as string)} />
                  <Cards label="Alcohol consumption" options={['None', '1–2 / week', '3–7 / week', '8–14 / week', '14+ / week']}
                    value={d.alcoholPerWeek} onChange={v => set('alcoholPerWeek', v as string)} />
                  <Cards label="Smoking status" options={['Non-smoker', 'Ex-smoker', 'Occasional', 'Daily']}
                    value={d.smokingStatus} onChange={v => set('smokingStatus', v as string)} />
                  <Score label="Diet quality" value={d.dietScore} onChange={v => set('dietScore', v)} hint="1 = junk food only, 10 = whole foods, minimal processed" />
                  <TA label="Current supplements" name="supplementsCurrent" value={d.supplementsCurrent} onChange={v => set('supplementsCurrent', v)}
                    placeholder="e.g. Creatine 5g, Vitamin D 5000IU, Zinc 30mg... Write 'None' if not applicable." rows={2} />
                  <Div label="Medical family history" />
                  <TA label="Relevant family history" name="familyHistory" value={d.familyHistory} onChange={v => set('familyHistory', v)}
                    placeholder="e.g. Father had early heart disease, mother has Type 2 diabetes... Write 'None known' if not applicable." rows={3} />
                </div>
              )}

              {/* ── Step 4: Final Details ── */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <Head step={4} title="Almost done." sub="A couple of quick questions, then confirm and submit." />

                  <div className="flex flex-col gap-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
                      What is your primary focus?
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Select the area you&apos;d most like your doctor to focus on.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'hormone', label: 'Hormone Optimisation', sub: 'Energy, libido, testosterone balance, overall hormonal health' },
                        { id: 'performance', label: 'Performance & Recovery', sub: 'Muscle building, athletic output, faster recovery' },
                        { id: 'weight-loss', label: 'Weight Loss & Metabolic', sub: 'Body composition, fat loss, metabolic function' },
                        { id: 'longevity', label: 'Anti-Ageing & Longevity', sub: 'Biological age, cellular health, long-term vitality' },
                        { id: 'sexual-health', label: 'Sexual Health', sub: 'Libido, erectile function, sexual confidence' },
                        { id: 'unsure', label: 'Not sure yet', sub: "I'll discuss this with my doctor" },
                      ].map(opt => {
                        const active = d.pathway === opt.id
                        return (
                          <button key={opt.id} type="button" onClick={() => set('pathway', opt.id)}
                            className="text-left p-4 rounded-xl transition-all duration-150"
                            style={{
                              background: active ? ACCENT_BG : 'var(--surface)',
                              border: `1px solid ${active ? ACCENT : 'rgba(72,144,247,0.14)'}`,
                            }}>
                            <p className="text-sm font-semibold mb-1" style={{ color: active ? ACCENT : 'var(--text-primary)' }}>{opt.label}</p>
                            <p className="text-xs leading-relaxed" style={{ color: active ? ACCENT : 'var(--text-secondary)' }}>{opt.sub}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="h-px" style={{ background: 'rgba(72,144,247,0.1)' }} />

                  <Cards label="Have you had hormone-related blood tests before?"
                    options={['Yes, recently (last 6 months)', 'Yes, more than 6 months ago', 'No, never']}
                    value={d.recentBloods} onChange={v => set('recentBloods', v as string)} />

                  <Cards label="Are you currently on any hormone therapy?"
                    options={['Yes', 'No', 'Previously, but stopped']}
                    value={d.currentHormoneRx} onChange={v => set('currentHormoneRx', v as string)} />

                  <div className="rounded-xl p-4" style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Don&apos;t have recent bloods?</p>
                    <p className="text-xs leading-relaxed" style={{ color: ACCENT }}>
                      No problem — we&apos;ll guide you to the right panel after this form. Testing is available at thousands of collection centres nationally.
                    </p>
                  </div>

                  <div className="h-px" style={{ background: 'rgba(72,144,247,0.12)' }} />

                  <div className="rounded-xl p-5" style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.14)' }}>
                    <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--text-primary)' }}>Summary</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {[
                        ['Name', `${d.firstName} ${d.lastName}`],
                        ['DOB', d.dob],
                        ['State', d.state],
                        ['Mobile', d.mobile],
                        ['Email', d.email],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[10px] uppercase tracking-wider" style={{ color: ACCENT }}>{label}</p>
                          <p className="text-sm mt-0.5 truncate" style={{ color: 'var(--text-primary)' }}>{val || '—'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-5 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)' }}>
                    <Chk checked={d.ageConfirm} onChange={v => set('ageConfirm', v)}>
                      I confirm I am 18 years of age or older.
                    </Chk>
                    <Chk checked={d.consent} onChange={v => set('consent', v)}>
                      I consent to my information being used by Apex Metabolic Health clinical staff to assess my suitability for treatment and facilitate my consultation. I understand this form does not constitute a diagnosis or guarantee of treatment.
                    </Chk>
                  </div>

                  <F label="Full name (digital signature)" name="printName" value={d.printName} onChange={v => set('printName', v)}
                    placeholder="Type your full legal name" />
                  <p className="text-[11px]" style={{ color: ACCENT }}>
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
          <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: '1px solid rgba(72,144,247,0.1)' }}>
            <button onClick={() => go(-1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-150 min-h-[44px]"
              style={{ color: 'var(--text-primary)', background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)' }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            {step < TOTAL ? (
              <button onClick={() => canNext && go(1)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 min-h-[44px]"
                style={{ background: ACCENT, color: '#fff', opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                Continue
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <button onClick={() => canNext && !submitting && submit()} disabled={submitting || !canNext}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 min-h-[44px]"
                style={{ background: ACCENT, color: '#fff', opacity: canNext && !submitting ? 1 : 0.4, cursor: canNext && !submitting ? 'pointer' : 'not-allowed' }}>
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
