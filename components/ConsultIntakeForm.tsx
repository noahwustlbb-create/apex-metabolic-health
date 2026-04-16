'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AppFeature from '@/components/AppFeature'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const STEPS = ['Your Details', 'Medical Info', 'Confirm & Submit']

const CONDITIONS = [
  'Cancer', 'Diabetes', 'High Blood Pressure', 'Kidney Disease',
  'Liver Disease', 'Heart Condition', 'DVT / Blood Clots', 'Seizures',
  'Anxiety / Depression', 'Hair Loss', 'Muscle / Joint Pain', 'None of the above',
]
const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

export interface ConsultConfig {
  storageKey: string
  programName: string      // e.g. "Hormone Optimisation"
  formTitle: string        // e.g. "HORMONE OPTIMISATION — INTAKE FORM"
  concern: string          // placeholder for main concern field
  goals?: string[]         // optional goal pills
  bloodsHref: string       // URL to order blood panel after submission
}

interface FormData {
  firstName: string; lastName: string; email: string; phone: string
  dob: string; state: string; mainConcern: string; conditions: string[]
  medications: string; allergies: string; recentBloods: string
  gpName: string; consent: boolean; ageConfirm: boolean
}

const makeInitial = (): FormData => ({
  firstName: '', lastName: '', email: '', phone: '', dob: '', state: '',
  mainConcern: '', conditions: [], medications: '', allergies: '',
  recentBloods: '', gpName: '', consent: false, ageConfirm: false,
})

// ─── Field components ─────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>
        {label}{required && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: '#4890f7' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(72,144,247,0.5)'; e.target.style.background = 'rgba(72,144,247,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: '#4890f7' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(72,144,247,0.5)'; e.target.style.background = 'rgba(72,144,247,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

function RadioGroup({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className="px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-150"
            style={{
              background: value === opt ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === opt ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
              color: value === opt ? '#4890f7' : '#8899aa',
            }}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 1 OF 3</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Your details</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Basic information to set up your consultation.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="James" required />
        <Field label="Last name" value={data.lastName} onChange={v => set('lastName', v)} placeholder="Smith" required />
        <Field label="Email" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@email.com" required />
        <Field label="Mobile" type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" required />
        <Field label="Date of birth" type="date" value={data.dob} onChange={v => set('dob', v)} required />
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>State <span style={{ color: '#4890f7' }}>*</span></label>
          <select value={data.state} onChange={e => set('state', e.target.value)}
            className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150 appearance-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: data.state ? '#f0f4f8' : '#4a5a6a' }}>
            <option value="" disabled>Select state</option>
            {AU_STATES.map(s => <option key={s} value={s} style={{ background: '#0d1117', color: '#f0f4f8' }}>{s}</option>)}
          </select>
        </div>
        <Field label="GP name (optional)" value={data.gpName} onChange={v => set('gpName', v)} placeholder="Dr. surname" />
      </div>
    </motion.div>
  )
}

function Step2({ data, set, toggleCondition, config }: {
  data: FormData; set: (k: keyof FormData, v: string) => void
  toggleCondition: (c: string) => void; config: ConsultConfig
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 2 OF 3</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Medical info</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Your doctor reviews this before your consultation.</p>
      <div className="flex flex-col gap-6">
        <TextArea label="What's your main concern?" value={data.mainConcern} onChange={v => set('mainConcern', v)}
          placeholder={config.concern} rows={3} />
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>Medical conditions (select all that apply)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CONDITIONS.map(c => (
              <button key={c} type="button" onClick={() => toggleCondition(c)}
                className="px-3 py-2 rounded-sm text-xs font-medium transition-all duration-150 text-left"
                style={{
                  background: data.conditions.includes(c) ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${data.conditions.includes(c) ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  color: data.conditions.includes(c) ? '#4890f7' : '#8899aa',
                }}>{c}</button>
            ))}
          </div>
        </div>
        <TextArea label="Current medications / supplements" value={data.medications} onChange={v => set('medications', v)}
          placeholder="List any current medications or supplements (or write 'none')" />
        <TextArea label="Known allergies" value={data.allergies} onChange={v => set('allergies', v)}
          placeholder="Medications, foods, other (or write 'none')" rows={2} />
        <RadioGroup label="Recent blood tests in the last 3 months?" options={['Yes', 'No', 'Not sure']}
          value={data.recentBloods} onChange={v => set('recentBloods', v)} />
      </div>
    </motion.div>
  )
}

function Step3({ data, set, config }: {
  data: FormData; set: (k: keyof FormData, v: boolean | string) => void; config: ConsultConfig
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 3 OF 3</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Confirm & submit</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Review your details and confirm consent.</p>
      <div className="p-5 rounded-sm mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#3a4a5a' }}>YOUR BOOKING SUMMARY</p>
        <div className="flex flex-col gap-2">
          {[['Name', `${data.firstName} ${data.lastName}`], ['Email', data.email], ['Phone', data.phone], ['State', data.state], ['Program', config.programName]].map(([k, v]) => v ? (
            <div key={k} className="flex justify-between text-sm">
              <span style={{ color: '#4a5a6a' }}>{k}</span>
              <span style={{ color: '#8899aa' }}>{v}</span>
            </div>
          ) : null)}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { key: 'ageConfirm' as keyof FormData, label: 'I confirm I am 18 years of age or older.' },
          { key: 'consent' as keyof FormData, label: 'I consent to my information being used to arrange a telehealth consultation, and understand this is not a substitute for emergency medical care.' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer">
            <div onClick={() => set(key, !(data[key] as boolean))}
              className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-150"
              style={{
                background: data[key] ? 'rgba(72,144,247,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${data[key] ? 'rgba(72,144,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
              }}>
              {data[key] && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{label}</span>
          </label>
        ))}
      </div>
    </motion.div>
  )
}

function Success({ firstName, config }: { firstName: string; config: ConsultConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start"
      style={{ maxWidth: 540 }}
    >
      {/* Icon — restrained, not celebratory */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
        style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '1px solid rgba(72,144,247,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(72,144,247,0.06)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
          <path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="label mb-5"
      >
        Intake Received
      </motion.p>

      {/* Headline — personal, warm, final */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-bold tracking-tight mb-6"
        style={{
          fontFamily: 'var(--font-space-grotesk)',
          fontSize: 'clamp(28px, 3vw, 42px)',
          lineHeight: 1.1,
          color: '#f0f4f8',
          letterSpacing: '-0.02em',
        }}
      >
        {firstName ? `Thank you, ${firstName}.` : 'Thank you.'}
        <br />
        <span style={{
          background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          We take it from here.
        </span>
      </motion.h2>

      {/* Primary body — calm and reassuring */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="text-base leading-relaxed mb-10"
        style={{ color: '#8899aa', maxWidth: 440 }}
      >
        Your {config.programName} intake has been received by our clinical team.
        We will review your details and be in touch within one business day with everything you need for your next step.
      </motion.p>

      {/* Quiet divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', height: 1, transformOrigin: 'left',
          background: 'linear-gradient(90deg, rgba(72,144,247,0.15) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
          marginBottom: 32,
        }}
      />

      {/* What happens next — three lines, no list styling */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 mb-12"
      >
        {[
          { step: 'Intake review', detail: 'Our clinical team reviews your submission and prepares a case summary for your assigned doctor.' },
          { step: 'Appointment confirmation', detail: 'You will receive direct contact from us confirming your telehealth appointment time and any pre-consultation requirements.' },
          { step: 'Medical consultation', detail: 'Your doctor conducts a thorough telehealth consultation, interprets your pathology results, and prescribes your personalised treatment protocol.' },
          { step: 'Begin your protocol', detail: 'Your protocol is coordinated through our compounding pharmacy partner and clinical support team. Ongoing reviews are scheduled from day one.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div style={{
              minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#3a4a5a',
              fontFamily: 'var(--font-space-grotesk)',
            }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#c8d4e0' }}>{item.step}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5a6a' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Trust footer — grounding, not sales */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="text-[11px] leading-relaxed"
        style={{ color: '#2a3a4a' }}
      >
        Apex Metabolic Health &nbsp;·&nbsp; AHPRA-registered practitioners &nbsp;·&nbsp; Private &amp; confidential
      </motion.p>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ConsultIntakeForm({ config }: { config: ConsultConfig }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      try { return { ...makeInitial(), ...JSON.parse(localStorage.getItem(config.storageKey) || '{}') } } catch { return makeInitial() }
    }
    return makeInitial()
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!submitted) localStorage.setItem(config.storageKey, JSON.stringify(data))
  }, [data, submitted, config.storageKey])

  const set = (k: keyof FormData, v: string | boolean | string[]) => setData(p => ({ ...p, [k]: v }))
  const toggleCondition = (c: string) =>
    setData(p => ({ ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c] }))

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const step1Valid = data.firstName.trim() && data.lastName.trim() && data.email.trim() && data.phone.trim() && data.dob && data.state
  const step3Valid = data.consent && data.ageConfirm

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${config.programName} Intake — ${data.firstName} ${data.lastName}`,
          from_name: 'Apex Metabolic Health',
          name: `${data.firstName} ${data.lastName}`, email: data.email,
          phone: data.phone, dob: data.dob, state: data.state, gp_name: data.gpName,
          main_concern: data.mainConcern, conditions: data.conditions.join(', '),
          medications: data.medications, allergies: data.allergies,
          recent_bloods: data.recentBloods, program: config.programName,
          formType: `${config.programName} Consultation Intake`,
        }),
      })
      const json = await res.json()
      if (json.success) { setSubmitted(true); localStorage.removeItem(config.storageKey); scrollTop() }
      else setError('Something went wrong. Please try again.')
    } catch { setError('Network error. Please try again.') }
    finally { setSubmitting(false) }
  }

  const progress = Math.round((step / STEPS.length) * 100)

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden" style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />
          <div ref={topRef} className="container-tight relative z-10" style={{ maxWidth: 680 }}>
            {!submitted && (
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: '#4890f7' }}>
                    {config.formTitle}
                  </span>
                  <span className="text-xs" style={{ color: '#3a4a5a' }}>{progress}%</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #4890f7)' }}
                    initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                </div>
                <div className="flex gap-3 mt-3">
                  {STEPS.map((s, i) => <span key={s} className="text-[10px] tracking-wide" style={{ color: i + 1 <= step ? '#4890f7' : '#2a3a4a' }}>{s}</span>)}
                </div>
              </div>
            )}
            {submitted ? <Success firstName={data.firstName} config={config} /> : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    {step === 1 && <Step1 data={data} set={(k, v) => set(k, v as string)} />}
                    {step === 2 && <Step2 data={data} set={(k, v) => set(k, v as string)} toggleCondition={toggleCondition} config={config} />}
                    {step === 3 && <Step3 data={data} set={set} config={config} />}
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-4 mt-8">
                  {step > 1 && (
                    <button type="button" onClick={() => { setStep(s => s - 1); scrollTop() }}
                      className="px-5 py-3 rounded-sm text-sm font-semibold transition-all duration-150"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7a8d' }}>← Back</button>
                  )}
                  {step < 3 ? (
                    <button type="button" onClick={() => { setStep(s => s + 1); scrollTop() }}
                      disabled={step === 1 && !step1Valid} className="btn-teal"
                      style={{ opacity: step === 1 && !step1Valid ? 0.4 : 1, cursor: step === 1 && !step1Valid ? 'not-allowed' : 'pointer' }}>Continue →</button>
                  ) : (
                    <button type="button" onClick={submit} disabled={submitting || !step3Valid} className="btn-teal"
                      style={{ opacity: submitting || !step3Valid ? 0.5 : 1, cursor: submitting || !step3Valid ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Submitting…' : 'Submit intake form →'}</button>
                  )}
                </div>
                {error && <p className="text-sm mt-4" style={{ color: '#e05c5c' }}>{error}</p>}
                <p className="text-xs mt-5" style={{ color: '#3a4a5a' }}>Your information is private and confidential. Used only for your clinical consultation.</p>
              </>
            )}
          </div>
        </section>
        <AppFeature />
      </main>
      <Footer />
    </>
  )
}
