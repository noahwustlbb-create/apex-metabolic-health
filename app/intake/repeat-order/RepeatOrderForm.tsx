'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG     = 'var(--bg)'
const SURF   = 'var(--surface)'
const BLUE   = 'var(--blue)'
const TEXT   = 'var(--text-primary)'
const DIM    = '#c8dcf8'
const BORDER = 'rgba(72,144,247,0.18)'
const BACT   = 'rgba(72,144,247,0.5)'

const TITLES = ['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Mx']

const inputStyle = (active = false): React.CSSProperties => ({
  width: '100%',
  background: SURF,
  border: `1.5px solid ${active ? BLUE : BORDER}`,
  borderRadius: 14,
  color: TEXT,
  fontSize: 15,
  padding: '13px 16px',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
  boxShadow: active ? '0 0 0 3px rgba(72,144,247,0.08)' : 'none',
})

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(200,220,248,0.55)',
  marginBottom: 8,
}

interface FocusTrack { [k: string]: boolean }

export default function RepeatOrderForm() {
  const [isExisting, setIsExisting] = useState<boolean | null>(null)
  const [focus, setFocus] = useState<FocusTrack>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [d, setD] = useState({
    title: '', firstName: '', lastName: '',
    dob: '', email: '', mobile: '',
    address: '',
    pregnant: '',
    allergies: 'No Known Allergies',
    inquiry: '',
  })

  const set = (k: keyof typeof d) => (v: string) => setD(prev => ({ ...prev, [k]: v }))
  const onFocus = (k: string) => setFocus(f => ({ ...f, [k]: true }))
  const onBlur  = (k: string) => setFocus(f => ({ ...f, [k]: false }))

  const Field = ({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label style={labelStyle} htmlFor={id}>
        {label}{required && <span style={{ color: BLUE }}> *</span>}
      </label>
      {children}
    </div>
  )

  const TextInput = ({ id, value, onChange, placeholder, type = 'text' }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <input
      id={id} type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onFocus={() => onFocus(id)} onBlur={() => onBlur(id)}
      style={inputStyle(focus[id])}
    />
  )

  const submit = async () => {
    if (!d.firstName || !d.email || !d.mobile || !d.pregnant || !d.inquiry) {
      setError('Please complete all required fields.'); return
    }
    setSubmitting(true); setError('')
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Apex Repeat Order / Renewal: ${d.firstName} ${d.lastName}`,
          from_name: 'Apex Metabolic Health',
          formType: 'Repeat Order | Consult Form',
          title: d.title,
          name: `${d.firstName} ${d.lastName}`,
          dob: d.dob,
          email: d.email,
          mobile: d.mobile,
          address: d.address,
          pregnant_breastfeeding: d.pregnant,
          allergy_status: d.allergies,
          inquiry_type: d.inquiry,
          existing_patient: 'Yes',
        }),
      })
      fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: d.firstName, lastName: d.lastName, email: d.email, mobile: d.mobile, source: 'repeat-order' }),
      }).catch(() => {})
      setSubmitted(true)
      window.location.href = '/confirmation'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Nav />
      <div style={{ background: BG, minHeight: '100vh', paddingTop: 88 }}>

        {/* Header */}
        <div
          className="text-center"
          style={{ padding: '48px 24px 40px', borderBottom: '1px solid rgba(72,144,247,0.1)' }}
        >
          <p className="label mb-3">Existing Patients</p>
          <h1
            className="font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.025em', color: TEXT, marginBottom: 12 }}
          >
            Repeat Order | Consult Form
          </h1>
          <p style={{ color: DIM, fontSize: 15 }}>Repeat Order and Existing Patient Renewal Form.</p>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
          {submitted ? (
            <div className="text-center" style={{ padding: '60px 0' }}>
              <div
                className="mx-auto mb-6 flex items-center justify-center"
                style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <path d="M5 12l5 5L19 7" stroke={BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 28, color: TEXT }}>Request received.</h2>
              <p style={{ color: DIM, fontSize: 15, marginBottom: 32 }}>
                Our clinical team will review your renewal request and be in touch within one business day.
              </p>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: BLUE, color: '#fff', padding: '12px 28px', borderRadius: 99, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Return home
              </a>
            </div>
          ) : (
            <div
              style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 'clamp(24px, 5vw, 48px)' }}
            >
              <h2
                className="font-bold text-center mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 22, color: TEXT }}
              >
                Repeat Order and Existing Patient Renewal
              </h2>

              {/* Existing patient gate */}
              <div style={{ marginBottom: 32, padding: '20px 0', borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: DIM, marginBottom: 14 }}>
                  Are you an existing patient? <span style={{ color: BLUE }}>*</span>
                </p>
                <div style={{ display: 'flex', gap: 24 }}>
                  {['Yes', 'No'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <div
                        onClick={() => setIsExisting(opt === 'Yes')}
                        style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                          border: `2px solid ${isExisting === (opt === 'Yes') ? BLUE : 'rgba(148,163,184,0.3)'}`,
                          background: isExisting === (opt === 'Yes') ? BLUE : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        {isExisting === (opt === 'Yes') && (
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
                        )}
                      </div>
                      <span style={{ fontSize: 15, color: TEXT, fontWeight: 500 }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Not existing patient - redirect */}
              {isExisting === false && (
                <div
                  style={{ background: 'rgba(72,144,247,0.06)', border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, textAlign: 'center' }}
                >
                  <p style={{ color: DIM, fontSize: 15, marginBottom: 20 }}>
                    It looks like you&apos;re a new patient. Please complete our new patient intake form to get started with Apex Metabolic Health.
                  </p>
                  <a
                    href="/intake/hormone-consult"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: BLUE, color: '#fff', padding: '13px 28px', borderRadius: 99, fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 12 }}
                  >
                    Complete New Patient Form
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                  <br />
                  <a href="/intake/general-consult" style={{ fontSize: 13, color: 'rgba(200,220,248,0.5)', textDecoration: 'underline' }}>
                    General / Peptide Consult instead
                  </a>
                </div>
              )}

              {/* Existing patient - full form */}
              {isExisting === true && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {/* Name row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: 16 }}>
                    <Field id="title" label="Title" required>
                      <select
                        id="title" value={d.title}
                        onChange={e => set('title')(e.target.value)}
                        onFocus={() => onFocus('title')} onBlur={() => onBlur('title')}
                        style={{ ...inputStyle(focus['title']), appearance: 'none', cursor: 'pointer' }}
                      >
                        <option value="">Select…</option>
                        {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field id="firstName" label="First Name" required>
                      <TextInput id="firstName" value={d.firstName} onChange={set('firstName')} placeholder="James" />
                    </Field>
                    <Field id="lastName" label="Last Name" required>
                      <TextInput id="lastName" value={d.lastName} onChange={set('lastName')} placeholder="Smith" />
                    </Field>
                  </div>

                  {/* DOB + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field id="dob" label="Date of Birth" required>
                      <TextInput id="dob" value={d.dob} onChange={set('dob')} placeholder="DD/MM/YYYY" />
                    </Field>
                    <Field id="email" label="Email" required>
                      <TextInput id="email" type="email" value={d.email} onChange={set('email')} placeholder="you@email.com" />
                    </Field>
                  </div>

                  {/* Mobile */}
                  <Field id="mobile" label="Mobile Number" required>
                    <TextInput id="mobile" type="tel" value={d.mobile} onChange={set('mobile')} placeholder="04XX XXX XXX" />
                  </Field>

                  {/* Address */}
                  <Field id="address" label="Address" required>
                    <input
                      id="address" value={d.address}
                      onChange={e => set('address')(e.target.value)}
                      onFocus={() => onFocus('address')} onBlur={() => onBlur('address')}
                      placeholder="Street address, suburb, state, postcode"
                      style={inputStyle(focus['address'])}
                    />
                  </Field>

                  {/* Pregnant / Breastfeeding */}
                  <div>
                    <p style={{ ...labelStyle, marginBottom: 12 }}>
                      Are you currently pregnant, breastfeeding, or planning to conceive?
                      <span style={{ color: BLUE }}> *</span>
                    </p>
                    <div style={{ display: 'flex', gap: 24 }}>
                      {['Yes', 'No'].map(opt => (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                          <div
                            onClick={() => set('pregnant')(opt)}
                            style={{
                              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                              border: `2px solid ${d.pregnant === opt ? BLUE : 'rgba(148,163,184,0.3)'}`,
                              background: d.pregnant === opt ? BLUE : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.15s',
                            }}
                          >
                            {d.pregnant === opt && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                          </div>
                          <span style={{ fontSize: 15, color: TEXT, fontWeight: 500 }}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Allergy Status */}
                  <Field id="allergies" label="Allergy Status" required>
                    <TextInput id="allergies" value={d.allergies} onChange={set('allergies')} placeholder="No Known Allergies" />
                  </Field>

                  {/* Inquiry type */}
                  <div>
                    <p style={{ ...labelStyle, marginBottom: 12 }}>
                      What is your inquiry related to? <span style={{ color: BLUE }}>*</span>
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        'New Consult Appointment: Renewal',
                        'Order Medication / Blood Work',
                      ].map(opt => (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                          <div
                            onClick={() => set('inquiry')(opt)}
                            style={{
                              width: 20, height: 20, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
                              border: `2px solid ${d.inquiry === opt ? BLUE : 'rgba(148,163,184,0.3)'}`,
                              background: d.inquiry === opt ? BLUE : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.15s',
                            }}
                          >
                            {d.inquiry === opt && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                          </div>
                          <span style={{ fontSize: 15, color: TEXT }}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Consent */}
                  <div style={{ padding: '20px', background: 'rgba(72,144,247,0.04)', border: `1px solid ${BORDER}`, borderRadius: 14, fontSize: 12, color: 'rgba(200,220,248,0.5)', lineHeight: 1.6 }}>
                    By submitting this form you consent to Apex Metabolic Health contacting you to arrange your appointment or process your order. All information is handled in accordance with our Privacy Policy. Consultations are conducted by AHPRA-registered medical practitioners.
                  </div>

                  {error && (
                    <p style={{ color: '#f87171', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}>{error}</p>
                  )}

                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    style={{
                      width: '100%', background: BLUE, color: '#fff',
                      padding: '16px', borderRadius: 99, fontSize: 15,
                      fontWeight: 600, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.6 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Submit Request'}
                    {!submitting && (
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
