'use client'

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BLUE = 'var(--blue)'
const INK = '#111827'
const MUTED = '#6b7280'
const SURF = '#ffffff'
const BG = '#f9fafb'
const BORDER = 'rgba(0,0,0,0.09)'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const ease = [0.22, 1, 0.36, 1] as const

const TREATMENTS = [
  'Hormone Optimisation / TRT',
  'Medical Weight Loss',
  'Performance & Recovery',
  'Hair Restoration',
  'Sexual Health',
  'Skin Regeneration',
  'Injury Repair',
  'Anti-Ageing & Longevity',
  'Pathology / Blood Panel',
  "I'm not sure yet",
]

const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Any weekday', 'Weekend preferred',
]

const TIMES = [
  'Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Evening (5pm–7pm)',
]

interface F {
  firstName: string; lastName: string; phone: string; email: string
  treatment: string; preferredDay: string; preferredTime: string; message: string
}
const EMPTY: F = {
  firstName: '', lastName: '', phone: '', email: '',
  treatment: '', preferredDay: '', preferredTime: '', message: '',
}

function Input({ label, value, onChange, type = 'text', placeholder = '', required = false }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>
        {label}{required && <span style={{ color: BLUE }}> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full rounded-xl px-4 py-3.5 outline-none transition-all duration-150"
        style={{ fontSize: '16px', background: SURF, border: `1.5px solid ${BORDER}`, color: INK }}
        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.1)' }}
        onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function Select({ label, value, onChange, options, placeholder, required = false }: {
  label: string; value: string; onChange: (v: string) => void
  options: string[]; placeholder?: string; required?: boolean
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>
        {label}{required && <span style={{ color: BLUE }}> *</span>}
      </label>
      <div className="relative">
        <select
          id={id} value={value} onChange={e => onChange(e.target.value)} required={required}
          className="w-full appearance-none rounded-xl px-4 py-3.5 outline-none transition-all duration-150 cursor-pointer"
          style={{
            fontSize: '15px', background: SURF, border: `1.5px solid ${BORDER}`,
            color: value ? INK : MUTED, paddingRight: '44px',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.1)' }}
          onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg viewBox="0 0 16 16" fill="none" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: MUTED }}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default function DiscoveryCallForm() {
  const [d, setD] = useState<F>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof F, val: string) => setD(prev => ({ ...prev, [field]: val }))

  const valid = d.firstName.trim() && d.lastName.trim() && d.phone.trim().length >= 8 && d.email.includes('@') && d.treatment && d.preferredDay

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Apex Discovery Call - ${d.firstName} ${d.lastName}`,
          formType: 'Discovery Call Request',
          name: `${d.firstName} ${d.lastName}`,
          email: d.email, phone: d.phone,
          treatment_interest: d.treatment,
          preferred_day: d.preferredDay,
          preferred_time: d.preferredTime,
          message: d.message,
          submittedAt: new Date().toISOString(),
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error()
      setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch { setError('Something went wrong. Please try again or email us directly.') }
    finally { setSubmitting(false) }
  }

  return (
    <>
      <Nav />
      <main style={{ background: BG, minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}
              className="text-center py-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.025em', color: INK, marginBottom: 16 }}>
                Request received,{' '}<span style={{ color: BLUE }}>{d.firstName}.</span>
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: MUTED, maxWidth: '44ch', margin: '0 auto' }}>
                Our clinical coordinator will be in touch within one business day to confirm your call time.
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
              {/* Header */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.15)' }}>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" style={{ color: BLUE }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: BLUE }}>Free · No obligation</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.12, color: INK, marginBottom: 14 }}>
                  Book a free discovery call.
                </h1>
                <p className="text-[15px] leading-relaxed" style={{ color: MUTED, maxWidth: '50ch' }}>
                  Speak with our clinical team about whether an Apex program is the right fit for you. No hard sell. No commitment.
                </p>
              </div>

              {/* What to expect */}
              <div className="rounded-2xl p-5 mb-8" style={{ background: SURF, border: `1.5px solid ${BORDER}` }}>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: MUTED }}>On the call, we will:</p>
                <div className="flex flex-col gap-3">
                  {[
                    'Review your symptoms and health history',
                    'Explain the relevant program and what testing is involved',
                    'Answer any questions you have about the process',
                    'Confirm whether Apex is clinically appropriate for your situation',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(72,144,247,0.1)' }}>
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First name" value={d.firstName} onChange={v => set('firstName', v)} placeholder="James" required />
                  <Input label="Last name" value={d.lastName} onChange={v => set('lastName', v)} placeholder="Smith" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Mobile number" type="tel" value={d.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" required />
                  <Input label="Email address" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@email.com" required />
                </div>
                <Select
                  label="Treatment interest" value={d.treatment} onChange={v => set('treatment', v)}
                  options={TREATMENTS} placeholder="Select a program..." required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Preferred day" value={d.preferredDay} onChange={v => set('preferredDay', v)}
                    options={DAYS} placeholder="Select a day..." required
                  />
                  <Select
                    label="Preferred time" value={d.preferredTime} onChange={v => set('preferredTime', v)}
                    options={TIMES} placeholder="Select a time..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="dc-message" className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#374151' }}>
                    Anything you want us to know? <span style={{ color: MUTED, fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>(optional)</span>
                  </label>
                  <textarea
                    id="dc-message" value={d.message} onChange={e => set('message', e.target.value)} rows={3}
                    placeholder="Brief summary of your main symptoms or concerns..."
                    className="w-full rounded-xl px-4 py-3.5 outline-none resize-none transition-all duration-150"
                    style={{ fontSize: '15px', background: SURF, border: `1.5px solid ${BORDER}`, color: INK }}
                    onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(72,144,247,0.1)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </div>

                {error && (
                  <p className="text-sm rounded-xl px-4 py-3" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit" disabled={!valid || submitting}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold transition-all duration-150"
                  style={{
                    background: valid && !submitting ? `linear-gradient(135deg, ${BLUE} 0%, #1d4fd8 100%)` : 'rgba(0,0,0,0.08)',
                    color: valid && !submitting ? '#fff' : MUTED,
                    minHeight: 56, cursor: valid && !submitting ? 'pointer' : 'not-allowed',
                    boxShadow: valid && !submitting ? '0 4px 16px rgba(72,144,247,0.35)' : 'none',
                  }}
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
                      Request my discovery call
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px]" style={{ color: MUTED }}>
                  Calls are conducted by our clinical coordination team, Monday–Friday.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
