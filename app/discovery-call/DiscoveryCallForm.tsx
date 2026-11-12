'use client'

import { useId, useState } from 'react'
import Nav from '@/components/Nav'
import TrustChips from '@/components/TrustChips'
import MarketingConsent from '@/components/MarketingConsent'
import { captureLead } from '@/lib/captureLead'
import { InnerHero, InnerFoot, SHOTS, Photo } from '@/components/inner/InnerSections'

/**
 * /discovery-call in the AlgoRx system (12 Nov 2026). Same fields and the
 * same captureLead call as before; the form sits in one bordered card beside
 * what the call covers. No medicine names, no outcomes.
 */

const TREATMENTS = [
  'Hormone Optimisation', 'Medical Weight Loss', 'Performance and Recovery', 'Hair Restoration', 'Sexual Health',
  'Skin Regeneration', 'Injury Repair', 'Anti-Ageing and Longevity', 'Blood panel', 'Not sure yet',
]
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Any day']
const TIMES = ['Morning (8am to 12pm)', 'Afternoon (12pm to 5pm)', 'Evening (5pm to 7pm)']

interface F {
  firstName: string; lastName: string; phone: string; email: string
  treatment: string; preferredDay: string; preferredTime: string; message: string
}
const EMPTY: F = { firstName: '', lastName: '', phone: '', email: '', treatment: '', preferredDay: '', preferredTime: '', message: '' }

function Input({ label, value, onChange, type = 'text', placeholder = '', required = false, autoComplete }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; autoComplete?: string
}) {
  const id = useId()
  return (
    <div className="ip-field">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} autoComplete={autoComplete} />
    </div>
  )
}

function Select({ label, value, onChange, options, placeholder, required = false }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; required?: boolean
}) {
  const id = useId()
  return (
    <div className="ip-field">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} required={required}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function DiscoveryCallForm() {
  const [d, setD] = useState<F>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const msgId = useId()

  const set = (field: keyof F, val: string) => setD(prev => ({ ...prev, [field]: val }))
  const valid = d.firstName.trim() && d.lastName.trim() && d.phone.trim().length >= 8 && d.email.includes('@') && d.treatment && d.preferredDay

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSubmitting(true); setError('')
    try {
      await captureLead({
        source: 'discovery-call', email: d.email,
        name: `${d.firstName} ${d.lastName}`.trim(), phone: d.phone,
        program: d.treatment,
        marketingConsent,
      })
      setSubmitted(true); window.scrollTo({ top: 0, behavior: 'smooth' })
      window.location.href = '/confirmation'
    } catch { setError('Something went wrong. Please try again or email us directly.') }
    finally { setSubmitting(false) }
  }

  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Free call"
          title="Talk to the team first."
          lead="Fifteen minutes with our clinical team on whether Apex is the right fit for you. Free, no obligation, no hard sell."
          cap={['Free', 'Monday to Saturday', 'Reply within 1 business day']}
          cta={false}
        />
        <TrustChips />

        <section className="al-sec" aria-labelledby="dc-form" data-last>
          <div className="container-x">
            <div className="ip-split">
              <div className="al-card ip-portal-copy">
                <p className="al-k">{'// On the call'}</p>
                <h2 id="dc-form" className="al-h2">What we cover.</h2>
                <ul className="ip-list-ticks" role="list">
                  {[
                    'Your symptoms and health history',
                    'The relevant program and what testing is involved',
                    'Any questions you have about the process',
                    'Whether Apex is clinically appropriate for your situation',
                  ].map(t => <li key={t}>{t}</li>)}
                </ul>
                <div style={{ overflow: 'hidden', borderRadius: 16, marginTop: 8 }}>
                  <Photo shot={SHOTS.balconyCall} className="" sizes="(min-width: 900px) 40vw, 100vw" />
                </div>
              </div>

              {submitted ? (
                <div className="al-card ip-done" role="status">
                  <p className="al-k">{'// Received'}</p>
                  <h2 className="al-h2">Request received, {d.firstName}.</h2>
                  <p>Our clinical coordinator will be in touch within one business day to confirm your call time.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="al-card ip-form-card ip-form" aria-label="Request a free call">
                  <div className="ip-form-row">
                    <Input label="First name" value={d.firstName} onChange={v => set('firstName', v)} placeholder="First name" required autoComplete="given-name" />
                    <Input label="Last name" value={d.lastName} onChange={v => set('lastName', v)} placeholder="Last name" required autoComplete="family-name" />
                  </div>
                  <div className="ip-form-row">
                    <Input label="Mobile number" type="tel" value={d.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" required autoComplete="tel" />
                    <Input label="Email address" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@example.com" required autoComplete="email" />
                  </div>
                  <Select label="Program interest" value={d.treatment} onChange={v => set('treatment', v)} options={TREATMENTS} placeholder="Select a program" required />
                  <div className="ip-form-row">
                    <Select label="Preferred day" value={d.preferredDay} onChange={v => set('preferredDay', v)} options={DAYS} placeholder="Select a day" required />
                    <Select label="Preferred time" value={d.preferredTime} onChange={v => set('preferredTime', v)} options={TIMES} placeholder="Select a time" />
                  </div>
                  <div className="ip-field">
                    <label htmlFor={msgId}>Anything you want us to know? (optional)</label>
                    <textarea id={msgId} value={d.message} onChange={e => set('message', e.target.value)} rows={3} placeholder="A brief summary of your main concerns." />
                  </div>
                  {error && <p className="ip-err" role="alert">{error}</p>}
                  <MarketingConsent id="dc-consent" checked={marketingConsent} onChange={setMarketingConsent} />
                  <button type="submit" disabled={!valid || submitting} className="al-pill al-pill-lg">{submitting ? 'Submitting' : 'Request my free call'}</button>
                  <p className="ip-form-note">Calls are conducted by our clinical coordination team, Monday to Saturday.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <InnerFoot />
    </>
  )
}
