'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import BookingChoice from '@/components/BookingChoice'

const STORAGE_KEY = 'apex-hormone-consult-v5'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const TOTAL = 4
const BLUE = 'var(--blue)'
const INK = '#111827'
const MUTED = '#6b7280'
const SURF = '#ffffff'
const BG = '#f9fafb'
const BORDER = 'rgba(0,0,0,0.09)'

const STEP_LABELS = ['About You', 'Symptoms', 'Health Background', 'Confirm & Submit']
const AU_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']
const CONDITIONS = [
  'Cancer', 'Diabetes', 'High Blood Pressure', 'Kidney Disease', 'Liver Disease',
  'Heart Condition', 'DVT / Blood Clots', 'Seizures / Epilepsy',
  'Anxiety / Depression', 'Prostate Issues', 'Sleep Apnoea', 'None of the above',
]
const SYMPTOMS = [
  'Low energy / fatigue', 'Reduced libido', 'Difficulty building muscle',
  'Increased body fat', 'Brain fog / poor concentration', 'Mood changes / irritability',
  'Poor sleep quality', 'Erectile dysfunction', 'Joint aches / poor recovery', 'Thinning hair',
]
const DURATION_OPTIONS = [
  'Less than 3 months', '3–6 months', '6–12 months',
  '1–2 years', 'More than 2 years',
]

interface D {
  firstName: string; lastName: string; dob: string; email: string
  mobile: string; state: string; weightKg: string; heightCm: string
  mainConcern: string; symptoms: string[]; symptomDuration: string; energyScore: string
  conditions: string[]; medications: string; allergies: string
  exerciseFrequency: string; sleepHours: string
  alcoholHabit: string; smokingStatus: string; dietQuality: string
  supplementsCurrent: string
  pathway: string; recentBloods: string; currentHormoneRx: string
  ageConfirm: boolean; consent: boolean; printName: string
}
const EMPTY: D = {
  firstName: '', lastName: '', dob: '', email: '', mobile: '', state: '',
  weightKg: '', heightCm: '', mainConcern: '', symptoms: [], symptomDuration: '',
  energyScore: '', conditions: [], medications: '', allergies: '',
  exerciseFrequency: '', sleepHours: '', alcoholHabit: '', smokingStatus: '',
  dietQuality: '', supplementsCurrent: '', pathway: '',
  recentBloods: '', currentHormoneRx: '', ageConfirm: false, consent: false, printName: '',
}

const ease = [0.22, 1, 0.36, 1] as const

// ── Step stepper ──────────────────────────────────────────────────────────────
function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-start justify-center gap-0 w-full max-w-lg mx-auto mb-10">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const done = step > n
        const active = step === n
        return (
          <div key={label} className="flex items-start flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: done ? BLUE : active ? INK : 'transparent',
                  border: `2px solid ${done || active ? (done ? BLUE : INK) : 'rgba(0,0,0,0.2)'}`,
                  color: done || active ? '#fff' : MUTED,
                }}>
                {done
                  ? <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : n}
              </div>
              <span className="text-[10px] font-semibold mt-1.5 text-center leading-tight" style={{ color: active ? INK : MUTED, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className="flex-1 h-px mt-4 mx-1" style={{ background: step > n ? BLUE : 'rgba(0,0,0,0.12)', transition: 'background 0.3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Radio card ────────────────────────────────────────────────────────────────
function RadioCard({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-150"
      style={{ background: selected ? 'rgba(72,144,247,0.06)' : SURF, border: `1.5px solid ${selected ? BLUE : BORDER}`, boxShadow: selected ? '0 0 0 3px rgba(72,144,247,0.08)' : 'none' }}>
      <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-150"
        style={{ border: `2px solid ${selected ? BLUE : 'rgba(0,0,0,0.2)'}`, background: selected ? BLUE : 'transparent' }}>
        {selected && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-medium" style={{ color: INK, lineHeight: 1.35 }}>{label}</span>
        {sub && <span className="block text-xs mt-0.5" style={{ color: MUTED }}>{sub}</span>}
      </span>
    </button>
  )
}

// ── Compact pill toggle (for lifestyle snapshot) ──────────────────────────────
function PillToggle({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
          style={{
            background: value === opt ? INK : SURF,
            border: `1.5px solid ${value === opt ? INK : BORDER}`,
            color: value === opt ? '#fff' : '#374151',
          }}>
          {opt}
        </button>
      ))}
    </div>
  )
}

// ── Checkbox card ─────────────────────────────────────────────────────────────
function CheckCard({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150"
      style={{ background: checked ? 'rgba(72,144,247,0.06)' : SURF, border: `1.5px solid ${checked ? BLUE : BORDER}` }}>
      <span className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
        style={{ background: checked ? BLUE : 'transparent', border: `2px solid ${checked ? BLUE : 'rgba(0,0,0,0.2)'}` }}>
        {checked && <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5"><path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span className="text-sm" style={{ color: checked ? INK : '#374151' }}>{label}</span>
    </button>
  )
}

// ── Text input ────────────────────────────────────────────────────────────────
function F({ label, name, value, onChange, type = 'text', placeholder = '' }: {
  label: string; name: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>{label}</label>
      <input id={name} type={type} name={name} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3.5 outline-none transition-all duration-150"
        style={{ fontSize: '16px', background: SURF, border: `1.5px solid ${BORDER}`, color: INK }}
        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.1)' }}
        onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }} />
    </div>
  )
}

// ── Textarea ──────────────────────────────────────────────────────────────────
function TA({ label, name, value, onChange, placeholder = '', hint, rows = 3 }: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; rows?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>{label}</label>
      {hint && <p className="text-xs" style={{ color: MUTED }}>{hint}</p>}
      <textarea id={name} name={name} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full rounded-xl px-4 py-3.5 outline-none resize-none transition-all duration-150"
        style={{ fontSize: '15px', background: SURF, border: `1.5px solid ${BORDER}`, color: INK }}
        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.1)' }}
        onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }} />
    </div>
  )
}

// ── Energy score ──────────────────────────────────────────────────────────────
function EnergyScore({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>Energy & drive: rate yourself right now</p>
        {value !== '' && <span className="text-sm font-bold" style={{ color: BLUE }}>{value} / 10</span>}
      </div>
      <p className="text-xs" style={{ color: MUTED }}>0 = completely depleted · 10 = optimal</p>
      <div className="flex gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <button key={i} type="button" onClick={() => onChange(String(i))}
            className="flex-1 rounded-lg text-xs font-semibold transition-all duration-150"
            style={{ minHeight: '44px', background: value === String(i) ? BLUE : SURF, border: `1.5px solid ${value === String(i) ? BLUE : BORDER}`, color: value === String(i) ? '#fff' : MUTED }}>
            {i}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function SL({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px" style={{ background: BORDER }} />
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: MUTED }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  )
}

// ── Step heading ──────────────────────────────────────────────────────────────
function Head({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.025em', color: INK, lineHeight: 1.18 }}>
        {title}
      </h2>
      {sub && <p className="mt-2.5 text-[15px] leading-relaxed" style={{ color: MUTED, maxWidth: '52ch' }}>{sub}</p>}
    </div>
  )
}

// ── Consent checkbox ──────────────────────────────────────────────────────────
function Chk({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl transition-all" style={{ background: SURF, border: `1.5px solid ${checked ? BLUE : BORDER}` }}>
      <button type="button" onClick={() => onChange(!checked)}
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-all duration-150"
        style={{ background: checked ? BLUE : 'transparent', border: `2px solid ${checked ? BLUE : 'rgba(0,0,0,0.2)'}` }}
        aria-checked={checked} role="checkbox">
        {checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </button>
      <span className="text-sm leading-relaxed" style={{ color: '#374151' }}>{children}</span>
    </label>
  )
}

// ── Navigation bar ────────────────────────────────────────────────────────────
function NavBar({ onBack, onContinue, continueLabel = 'Continue', disabled = false, loading = false }: {
  onBack: () => void; onContinue: () => void; continueLabel?: string; disabled?: boolean; loading?: boolean
}) {
  return (
    <div className="flex gap-3 mt-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
      <button type="button" onClick={onBack}
        className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-150"
        style={{ background: SURF, border: `1.5px solid ${BORDER}`, color: INK, minHeight: 52 }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </button>
      <button type="button" onClick={onContinue} disabled={disabled || loading}
        className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold transition-all duration-150"
        style={{
          background: disabled ? 'rgba(0,0,0,0.08)' : `linear-gradient(135deg, ${BLUE} 0%, #1d4fd8 100%)`,
          color: disabled ? MUTED : '#fff', minHeight: 52,
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: disabled ? 'none' : '0 4px 16px rgba(72,144,247,0.35)',
        }}>
        {loading
          ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting…</>
          : <>{continueLabel}<svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></>
        }
      </button>
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-1.5">
        <span className="text-[11px] font-semibold" style={{ color: MUTED }}>Progress</span>
        <span className="text-[11px] font-semibold" style={{ color: BLUE }}>{pct}%</span>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${BLUE}, #7bb3ff)` }}
          animate={{ width: `${pct}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
      </div>
    </div>
  )
}

// ── Success screen ────────────────────────────────────────────────────────────
function Success({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease }}
      className="text-center max-w-md mx-auto">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1, ease }}
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7"><path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease }}
        className="font-bold tracking-tight mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.1, color: INK, letterSpacing: '-0.025em' }}>
        {name ? `Thank you, ${name}.` : 'Thank you.'}<br />
        <span style={{ color: BLUE }}>We take it from here.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="text-[15px] leading-relaxed mb-10" style={{ color: MUTED }}>
        Your intake has been received. Our clinical team will review your details and be in touch within one business day to confirm your next steps.
      </motion.p>
      <BookingChoice type="hormone" showDiscovery delay={0.55} />
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HormoneConsultForm() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [d, setD] = useState<D>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')

  const set = useCallback((field: keyof D, val: unknown) => setD(prev => ({ ...prev, [field]: val })), [])

  useEffect(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) setD({ ...EMPTY, ...JSON.parse(s) }) } catch {}
  }, [])
  useEffect(() => {
    if (step > 0) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) } catch {} }
  }, [d, step])

  const stepValid = (s: number) => {
    if (s === 1) return d.firstName.trim().length > 0 && d.lastName.trim().length > 0 && d.dob.length > 0 && d.email.includes('@') && d.mobile.trim().length >= 8 && d.state.length > 0
    if (s === 4) return d.ageConfirm && d.consent && d.printName.trim().length > 2
    return true
  }

  const go = (delta: number) => {
    if (delta > 0 && !stepValid(step)) {
      if (step === 1) {
        const m: string[] = []
        if (!d.firstName.trim()) m.push('First name')
        if (!d.lastName.trim()) m.push('Last name')
        if (!d.dob) m.push('Date of birth')
        if (!d.email.includes('@')) m.push('Email')
        if (d.mobile.trim().length < 8) m.push('Mobile')
        if (!d.state) m.push('State')
        setValidationError(`Please complete: ${m.join(', ')}`)
      } else if (step === 4) {
        setValidationError('Please tick all consent boxes and sign with your full name.')
      }
      return
    }
    setValidationError('')
    setDir(delta)
    setStep(s => s + delta)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Apex Hormone Consult - ${d.firstName} ${d.lastName}`,
          formType: 'Hormone Consult Intake',
          name: `${d.firstName} ${d.lastName}`, dob: d.dob, email: d.email,
          mobile: d.mobile, state: d.state, weight_kg: d.weightKg, height_cm: d.heightCm,
          main_concern: d.mainConcern, symptoms: d.symptoms.join(', '),
          symptom_duration: d.symptomDuration, energy_score: d.energyScore,
          conditions: d.conditions.join(', ') || 'None', medications: d.medications,
          allergies: d.allergies, exercise_frequency: d.exerciseFrequency,
          sleep_hours: d.sleepHours, alcohol: d.alcoholHabit,
          smoking: d.smokingStatus, diet: d.dietQuality,
          supplements: d.supplementsCurrent, pathway: d.pathway,
          recent_bloods: d.recentBloods, hormone_rx: d.currentHormoneRx,
          submittedAt: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error()
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      fetch('/api/send-confirmation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: d.email, firstName: d.firstName, formType: 'hormone-consult' }),
      }).catch(() => {})
      setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch { setError('Something went wrong. Please try again.') }
    finally { setSubmitting(false) }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  const pct = Math.round((step / TOTAL) * 100)

  // ── Welcome ──────────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <>
        <Nav />
        <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
              <div className="flex items-center gap-2.5 mb-10">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 12 12" fill="#f59e0b" className="w-3 h-3">
                      <path d="M6 1l1.3 2.6H10L7.9 5.2l.8 2.8L6 6.5 3.3 8l.8-2.8L2 3.6h2.7L6 1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: MUTED }}>Trusted by 2,400+ Australians</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em', color: INK, marginBottom: 16 }}>
                Let&apos;s get you one step closer to feeling your best.
              </h1>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: MUTED, maxWidth: '46ch' }}>
                Answer a few questions so our doctors can tailor a safe and effective clinical plan just for you. Takes about 5 minutes.
              </p>
              <div className="rounded-2xl p-5 mb-8" style={{ background: SURF, border: `1.5px solid ${BORDER}` }}>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: MUTED }}>Based on your answers, you&apos;ll receive:</p>
                <div className="flex flex-col gap-3">
                  {[
                    'A personalised treatment plan from an AHPRA-registered doctor',
                    'Pathology referral for accurate hormone testing',
                    'Telehealth consultation to discuss your results',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(72,144,247,0.1)' }}>
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => go(1)}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold"
                style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #1d4fd8 100%)`, color: '#fff', padding: '17px 32px', boxShadow: '0 8px 32px rgba(72,144,247,0.38)', minHeight: 56 }}>
                Check my eligibility
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <p className="text-center text-[11px] mt-3" style={{ color: MUTED }}>No payment required · Completely confidential</p>
            </motion.div>
          </div>
        </main>
      </>
    )
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px' }}>
            <Success name={d.firstName} />
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="sticky top-[70px] md:top-[88px] z-30" style={{ background: 'rgba(249,250,251,0.96)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 620, margin: '0 auto', padding: '16px 24px' }}>
            <Stepper step={step} />
            <ProgressBar pct={pct} />
          </div>
        </div>

        <div style={{ maxWidth: 620, margin: '0 auto', padding: '32px 24px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>

              {/* ── Step 1: About You ── */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <Head title="About you." sub="Basic details we need to prepare your clinical file." />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="First name" name="firstName" value={d.firstName} onChange={v => set('firstName', v)} placeholder="James" />
                    <F label="Last name" name="lastName" value={d.lastName} onChange={v => set('lastName', v)} placeholder="Smith" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Date of birth" name="dob" type="date" value={d.dob} onChange={v => set('dob', v)} />
                    <F label="Mobile" name="mobile" type="tel" value={d.mobile} onChange={v => set('mobile', v)} placeholder="04XX XXX XXX" />
                  </div>
                  <F label="Email address" name="email" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@email.com" />
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>State / Territory</p>
                    <div className="grid grid-cols-4 gap-2">
                      {AU_STATES.map(s => (
                        <button key={s} type="button" onClick={() => set('state', s)}
                          className="py-3 rounded-xl text-sm font-semibold transition-all duration-150"
                          style={{ background: d.state === s ? BLUE : SURF, border: `1.5px solid ${d.state === s ? BLUE : BORDER}`, color: d.state === s ? '#fff' : INK }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Weight (kg)" name="weightKg" type="number" value={d.weightKg} onChange={v => set('weightKg', v)} placeholder="85" />
                    <F label="Height (cm)" name="heightCm" type="number" value={d.heightCm} onChange={v => set('heightCm', v)} placeholder="178" />
                  </div>
                </div>
              )}

              {/* ── Step 2: Symptoms ── */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <Head title="Your symptoms." sub="Tell us what you're experiencing. Your doctor reads this before your consult." />
                  <TA label="In your own words, what's the main issue?" name="mainConcern" value={d.mainConcern} onChange={v => set('mainConcern', v)}
                    placeholder="e.g. I've had no energy for 18 months, my motivation has dropped, and I've put on 8kg without changing my diet or training." rows={4} />
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>How long have you been experiencing this?</p>
                    <div className="flex flex-col gap-2.5">
                      {DURATION_OPTIONS.map(opt => (
                        <RadioCard key={opt} label={opt} selected={d.symptomDuration === opt} onClick={() => set('symptomDuration', opt)} />
                      ))}
                    </div>
                  </div>
                  <SL label="Select all that apply" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SYMPTOMS.map(s => (
                      <CheckCard key={s} label={s} checked={d.symptoms.includes(s)}
                        onClick={() => set('symptoms', d.symptoms.includes(s) ? d.symptoms.filter(x => x !== s) : [...d.symptoms, s])} />
                    ))}
                  </div>
                  <SL label="Rate yourself" />
                  <EnergyScore value={d.energyScore} onChange={v => set('energyScore', v)} />
                </div>
              )}

              {/* ── Step 3: Health Background ── */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <Head title="Health background." sub="Helps us prescribe safely. Be accurate: your doctor reviews this before writing any protocol." />

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>Existing conditions: select all that apply</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CONDITIONS.map(c => (
                        <CheckCard key={c} label={c} checked={d.conditions.includes(c)}
                          onClick={() => set('conditions', d.conditions.includes(c) ? d.conditions.filter(x => x !== c) : [...d.conditions, c])} />
                      ))}
                    </div>
                  </div>

                  <TA label="Current medications" name="medications" value={d.medications} onChange={v => set('medications', v)}
                    hint="Include all prescription medications, supplements you take daily, and any hormone therapies."
                    placeholder="e.g. Metformin 500mg, Vitamin D 5000IU, or write 'None'" rows={3} />

                  <TA label="Known allergies or adverse reactions" name="allergies" value={d.allergies} onChange={v => set('allergies', v)}
                    placeholder="Write 'None' if not applicable." rows={2} />

                  <SL label="Lifestyle snapshot" />

                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#374151' }}>Exercise frequency</p>
                      <PillToggle options={['Rarely / none', '1–2× / week', '3–4× / week', '5+× / week']} value={d.exerciseFrequency} onChange={v => set('exerciseFrequency', v)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#374151' }}>Average nightly sleep</p>
                      <PillToggle options={['Under 5 hrs', '5–6 hrs', '6–7 hrs', '7–8 hrs', '8+ hrs']} value={d.sleepHours} onChange={v => set('sleepHours', v)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#374151' }}>Alcohol intake</p>
                      <PillToggle options={['None', 'Occasional', 'Weekly (1–7)', 'Heavy (8+/week)']} value={d.alcoholHabit} onChange={v => set('alcoholHabit', v)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#374151' }}>Smoking</p>
                      <PillToggle options={['Non-smoker', 'Ex-smoker', 'Current smoker']} value={d.smokingStatus} onChange={v => set('smokingStatus', v)} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#374151' }}>Diet quality</p>
                      <PillToggle options={['Generally good', 'Mixed', 'Mostly processed']} value={d.dietQuality} onChange={v => set('dietQuality', v)} />
                    </div>
                  </div>

                  <TA label="Current supplements (optional)" name="supplementsCurrent" value={d.supplementsCurrent} onChange={v => set('supplementsCurrent', v)}
                    placeholder="e.g. Creatine 5g, Magnesium 400mg, or leave blank" rows={2} />
                </div>
              )}

              {/* ── Step 4: Final Details ── */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <Head title="Almost done." sub="One last section, then confirm and submit." />

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>Primary focus</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'hormone', label: 'Hormone Optimisation', sub: 'Energy, libido, testosterone balance' },
                        { id: 'performance', label: 'Performance & Recovery', sub: 'Muscle, output, faster recovery' },
                        { id: 'weight-loss', label: 'Weight Loss & Metabolic', sub: 'Body composition, fat loss' },
                        { id: 'longevity', label: 'Longevity & Anti-Ageing', sub: 'Biological age, long-term vitality' },
                        { id: 'sexual-health', label: 'Sexual Health', sub: 'Libido, erectile function' },
                        { id: 'unsure', label: "Not sure yet", sub: "I'll discuss this with my doctor" },
                      ].map(opt => (
                        <button key={opt.id} type="button" onClick={() => set('pathway', opt.id)}
                          className="text-left p-4 rounded-2xl transition-all duration-150"
                          style={{ background: d.pathway === opt.id ? 'rgba(72,144,247,0.08)' : SURF, border: `1.5px solid ${d.pathway === opt.id ? BLUE : BORDER}` }}>
                          <p className="text-sm font-semibold mb-0.5" style={{ color: d.pathway === opt.id ? BLUE : INK }}>{opt.label}</p>
                          <p className="text-xs" style={{ color: MUTED }}>{opt.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>Hormone-related blood tests before?</p>
                    <div className="flex flex-col gap-2">
                      {['Yes, recently (last 6 months)', 'Yes, more than 6 months ago', 'No, never'].map(opt => (
                        <RadioCard key={opt} label={opt} selected={d.recentBloods === opt} onClick={() => set('recentBloods', opt)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#374151' }}>Currently on hormone therapy?</p>
                    <div className="flex flex-col gap-2">
                      {['Yes', 'No', 'Previously, but stopped'].map(opt => (
                        <RadioCard key={opt} label={opt} selected={d.currentHormoneRx === opt} onClick={() => set('currentHormoneRx', opt)} />
                      ))}
                    </div>
                  </div>

                  {/* TGA note */}
                  <div className="rounded-2xl p-4" style={{ background: 'rgba(220,130,0,0.05)', border: '1px solid rgba(220,130,0,0.2)' }}>
                    <p className="text-xs font-bold mb-1" style={{ color: '#d48000' }}>Two blood tests required for testosterone diagnosis</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#374151', opacity: 0.85 }}>
                      Under TGA and AHPRA guidelines, two separate morning blood draws on different days are required to confirm low testosterone. Your doctor will issue both referrals as part of your pathway.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="rounded-2xl p-5" style={{ background: SURF, border: `1.5px solid ${BORDER}` }}>
                    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: MUTED }}>Your details: please review</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {([['Name', `${d.firstName} ${d.lastName}`], ['DOB', d.dob], ['State', d.state], ['Mobile', d.mobile], ['Email', d.email]] as [string, string][]).map(([label, val]) => (
                        <div key={label}>
                          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: BLUE }}>{label}</p>
                          <p className="text-sm truncate" style={{ color: INK }}>{val || '·'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Chk checked={d.ageConfirm} onChange={v => set('ageConfirm', v)}>
                      I confirm I am 18 years of age or older.
                    </Chk>
                    <Chk checked={d.consent} onChange={v => set('consent', v)}>
                      I consent to my information being used by Apex Metabolic Health clinical staff to assess my suitability for treatment and facilitate my consultation. I understand this form does not constitute a diagnosis or guarantee of treatment.
                    </Chk>
                  </div>

                  <F label="Full name (digital signature)" name="printName" value={d.printName} onChange={v => set('printName', v)} placeholder="Type your full legal name" />
                  <p className="text-[11px]" style={{ color: MUTED }}>Date: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                  {(validationError || error) && (
                    <p className="text-sm rounded-xl px-4 py-3" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      {validationError || error}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {validationError && step !== 4 && (
            <p className="mt-6 text-sm rounded-xl px-4 py-3" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>{validationError}</p>
          )}

          <NavBar
            onBack={() => go(-1)}
            onContinue={() => step < TOTAL ? go(1) : submit()}
            continueLabel={step < TOTAL ? 'Continue' : 'Submit intake'}
            disabled={!stepValid(step)}
            loading={submitting}
          />
        </div>
      </main>
    </>
  )
}
