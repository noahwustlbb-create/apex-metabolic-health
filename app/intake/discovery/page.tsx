'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

const PROGRAMS = [
  'Hormone Optimisation',
  'Hormone & Performance',
  'Performance+',
  'Metabolic Weight Loss',
  'Hair Restoration',
  'Skin Regeneration',
  'Injury Repair & Recovery',
  'Longevity Protocol',
  'Not sure yet',
]

function Input({ value, onChange, placeholder, type = 'text', inputMode }: {
  value: string; onChange: (v: string) => void; placeholder?: string
  type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} inputMode={inputMode}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: '#070a0d', border: `1px solid ${focused ? '#00c2b8' : '#1e2d3d'}`, color: '#f0f4f8' }}
    />
  )
}

function TextArea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={4}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none resize-none"
      style={{ backgroundColor: '#070a0d', border: `1px solid ${focused ? '#00c2b8' : '#1e2d3d'}`, color: '#f0f4f8' }}
    />
  )
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium mb-1.5" style={{ color: '#8899aa' }}>
      {children}{required && <span style={{ color: '#00c2b8' }}> *</span>}
    </label>
  )
}

export default function DiscoveryCallPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', program: '', message: '' })
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Discovery Call Request — ${form.firstName} ${form.lastName}`,
          from_name: 'Apex Metabolic Health',
          ...form,
          formType: 'Discovery Call Request',
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container-tight max-w-xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: 'rgba(0,194,184,0.1)', border: '1px solid rgba(0,194,184,0.3)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" style={{ color: '#00c2b8' }}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="label mb-4">Request Received</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
                We&apos;ll be in touch, {form.firstName}.
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#8899aa' }}>
                Our team will contact you within one business day to schedule your free discovery call.
              </p>
              <Link href="/" className="btn-teal">Back to Home</Link>
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
      <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="container-tight max-w-2xl pt-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
            <p className="label mb-3">Free · No commitment</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
              Book a Discovery Call
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              Not sure where to start? A 15-minute call with our team to understand your goals and find the right program. No cost, no commitment.
            </p>
          </motion.div>

          {/* Errors */}
          {errors.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-5 py-4 rounded-sm mb-6"
              style={{ backgroundColor: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.3)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: '#dc3545' }}>Please fix the following:</p>
              <ul className="space-y-1">
                {errors.map((e, i) => <li key={i} className="text-sm" style={{ color: '#8899aa' }}>— {e}</li>)}
              </ul>
            </motion.div>
          )}

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="apex-card p-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label required>First Name</Label>
                <Input value={form.firstName} onChange={(v) => set('firstName', v)} placeholder="John" />
              </div>
              <div>
                <Label required>Last Name</Label>
                <Input value={form.lastName} onChange={(v) => set('lastName', v)} placeholder="Smith" />
              </div>
            </div>

            <div>
              <Label required>Email Address</Label>
              <Input type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="john@example.com" />
            </div>

            <div>
              <Label required>Phone Number</Label>
              <Input type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="04XX XXX XXX" inputMode="tel" />
            </div>

            <div>
              <Label required>Program of Interest</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {PROGRAMS.map((p) => (
                  <button key={p} type="button" onClick={() => set('program', p)}
                    className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-left transition-all duration-150"
                    style={{
                      backgroundColor: form.program === p ? 'rgba(0,194,184,0.08)' : '#070a0d',
                      border: `1px solid ${form.program === p ? '#00c2b8' : '#1e2d3d'}`,
                      color: form.program === p ? '#f0f4f8' : '#8899aa',
                    }}>
                    <span className="w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center"
                      style={{ border: `1px solid ${form.program === p ? '#00c2b8' : '#4a5a6a'}`, backgroundColor: form.program === p ? '#00c2b8' : 'transparent' }}>
                      {form.program === p && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#070a0d' }} />}
                    </span>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Anything else you&apos;d like us to know? (optional)</Label>
              <TextArea value={form.message} onChange={(v) => set('message', v)} placeholder="Brief description of your goals or concerns..." />
            </div>

            <button type="button" onClick={submit} disabled={submitting}
              className="btn-teal w-full" style={{ opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Submitting…' : 'Request My Discovery Call'}
            </button>

            <p className="text-xs text-center leading-relaxed" style={{ color: '#4a5a6a' }}>
              Our team will contact you within one business day. All consultations are conducted by AHPRA-registered medical practitioners.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
