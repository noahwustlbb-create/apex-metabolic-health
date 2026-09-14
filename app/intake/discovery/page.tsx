'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { captureLead } from '@/lib/captureLead'
import BookingChoice from '@/components/BookingChoice'
import MarketingConsent from '@/components/MarketingConsent'


const PROGRAMS = [
  'Hormone Optimisation',
  'Performance & Recovery',
  'Metabolic Weight Loss',
  'Hair Restoration',
  'Skin Regeneration',
  'Injury Repair & Recovery',
  'Longevity Protocol',
  'Not sure yet',
]

function Input({ id, value, onChange, placeholder, type = 'text', inputMode }: {
  id?: string; value: string; onChange: (v: string) => void; placeholder?: string
  type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} inputMode={inputMode}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: 'var(--elevated-high)', border: `1px solid ${focused ? 'var(--blue)' : 'rgba(72,144,247,0.18)'}`, color: 'var(--text-primary)' }}
    />
  )
}

function TextArea({ id, value, onChange, placeholder }: { id?: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      id={id} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={4}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none resize-none"
      style={{ backgroundColor: 'var(--elevated-high)', border: `1px solid ${focused ? 'var(--blue)' : 'rgba(72,144,247,0.18)'}`, color: 'var(--text-primary)' }}
    />
  )
}

function Label({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
      {children}{required && <span style={{ color: 'var(--blue)' }}> *</span>}
    </label>
  )
}

export default function DiscoveryCallPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', program: '', message: '' })
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const set = (key: keyof typeof form, val: string) => setForm((p) => ({ ...p, [key]: val }))

  const validate = () => {
    const e: string[] = []
    if (!form.firstName.trim()) e.push('First name is required')
    if (!form.lastName.trim()) e.push('Last name is required')
    if (!form.email.trim() || !form.email.includes('@')) e.push('Valid email is required')
    if (!form.phone.trim()) e.push('Phone number is required')
    if (!form.program) e.push('Please select a program of interest')
    return e
  }

  const submit = async () => {
    const errs = validate()
    if (errs.length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      await captureLead({
        source: 'discovery-call-request', email: form.email,
        name: `${form.firstName} ${form.lastName}`.trim(), phone: form.phone,
        marketingConsent,
      })
    } catch {}
    fetch('/api/send-confirmation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, firstName: form.firstName, formType: 'discovery' }),
    }).catch(() => {})
    setSubmitting(false)
    setSubmitted(true)
    window.location.href = '/confirmation'
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" style={{ color: 'var(--blue)' }}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="label mb-4">Request Received</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                We&apos;ll be in touch, {form.firstName}.
              </h1>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
                Our clinical team will call you within one business day to talk through your goals and the right next step.
              </p>
              <div className="flex justify-center w-full">
                <BookingChoice type="discovery" delay={0.8} />
              </div>
              <div className="mt-6">
                <Link href="/" className="btn-pill">Back to Home</Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container-tight max-w-2xl pt-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
            <p className="label mb-3">Free · No commitment</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
              Request a Discovery Call
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Not sure where to start? Tell us a little about yourself and our clinical team will call you back to talk through your goals and the right program. Usually within 1 business day. No cost, no commitment.
            </p>
          </motion.div>

          {/* Errors */}
          {errors.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-5 py-4 rounded-sm mb-6"
              style={{ backgroundColor: 'var(--color-danger-muted)', border: '1px solid var(--color-danger-border)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-danger-fg)' }}>Please fix the following:</p>
              <ul className="space-y-1">
                {errors.map((e, i) => <li key={i} className="text-sm" style={{ color: 'var(--text-primary)' }}>• {e}</li>)}
              </ul>
            </motion.div>
          )}

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="apex-card p-8 space-y-6" style={{ backgroundColor: "var(--bg)", border: "1px solid rgba(72,144,247,0.14)" }}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label required htmlFor="dq-first-name">First Name</Label>
                <Input id="dq-first-name" value={form.firstName} onChange={(v) => set('firstName', v)} placeholder="John" />
              </div>
              <div>
                <Label required htmlFor="dq-last-name">Last Name</Label>
                <Input id="dq-last-name" value={form.lastName} onChange={(v) => set('lastName', v)} placeholder="Smith" />
              </div>
            </div>

            <div>
              <Label required htmlFor="dq-email">Email Address</Label>
              <Input id="dq-email" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="john@example.com" />
            </div>

            <div>
              <Label required htmlFor="dq-phone">Phone Number</Label>
              <Input id="dq-phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="04XX XXX XXX" inputMode="tel" />
            </div>

            <div role="group" aria-labelledby="dq-program-label">
              <span id="dq-program-label" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>Program of Interest<span style={{ color: 'var(--blue)' }}> *</span></span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {PROGRAMS.map((p) => (
                  <button key={p} type="button" onClick={() => set('program', p)}
                    className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-left transition-all duration-150"
                    style={{
                      backgroundColor: form.program === p ? 'rgba(72,144,247,0.07)' : '#f8f9ff',
                      border: `1px solid ${form.program === p ? 'var(--blue)' : 'rgba(72,144,247,0.2)'}`,
                      color: form.program === p ? 'var(--blue)' : '#0a0e1a',
                    }}>
                    <span className="w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ border: `1px solid ${form.program === p ? 'var(--blue)' : 'rgba(72,144,247,0.3)'}`, backgroundColor: form.program === p ? 'var(--blue)' : 'transparent' }}>
                      {form.program === p && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--elevated-high)' }} />}
                    </span>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="dq-message">Anything else you&apos;d like us to know? (optional)</Label>
              <TextArea id="dq-message" value={form.message} onChange={(v) => set('message', v)} placeholder="Brief description of your goals or concerns..." />
            </div>

            <MarketingConsent id="dq-consent" checked={marketingConsent} onChange={setMarketingConsent} />

            <button type="button" onClick={submit} disabled={submitting}
              className="btn-primary w-full" style={{ opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting…' : 'Request My Discovery Call'}
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Our team will contact you within one business day. All consultations are conducted by AHPRA-registered medical practitioners.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
