'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { captureLead } from '@/lib/captureLead'

const DEFAULT_SIGNUP = 'https://app.apexmetabolichealth.com.au/signup'
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const STEPS = [
  {
    num: '01',
    title: 'Create your account',
    body: 'Complete a short online intake in under 2 minutes. No GP referral needed.',
    time: '2 MIN',
  },
  {
    num: '02',
    title: 'Complete pathology testing',
    body: 'Visit any accredited collection centre across Australia at a time that suits you.',
    time: '45 MIN',
  },
  {
    num: '03',
    title: 'Telehealth consultation',
    body: 'Review your results with an AHPRA-registered doctor. 100% online, Australia-wide.',
    time: '30 MIN',
  },
  {
    num: '04',
    title: 'Your personalised protocol',
    body: 'Receive an ongoing care plan coordinated around your biomarker data, with clinical reviews every 3 months.',
    time: 'ONGOING',
  },
]

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function GetStartedModal({
  onClose,
  onConfirm,
  capture = false,
  program,
  signupUrl,
}: {
  onClose: () => void
  onConfirm?: () => void
  capture?: boolean
  program?: string
  signupUrl?: string
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [mode, setMode] = useState<'default' | 'contact'>('default')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const cleanEmail = email.trim()
    if (!EMAIL_RE.test(cleanEmail)) {
      setErr('Please enter a valid email address.')
      return
    }
    setErr('')
    setBusy(true)
    try {
      await captureLead({
        source: 'contact', name: name.trim(), email: cleanEmail,
        phone: phone.trim(), message: message.trim(), program,
      })
      setSent(true)
    } catch {
      setErr('Something went wrong. Please try again, or email admin@apexmetabolichealth.com.au.')
    } finally {
      setBusy(false)
    }
  }

  const proceed = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    if (!EMAIL_RE.test(cleanEmail)) {
      setErr('Please enter a valid email address.')
      return
    }
    setErr('')
    setBusy(true)
    // Best-effort lead capture: never block the visitor from reaching signup if this fails.
    try {
      await captureLead({ name: cleanName, email: cleanEmail, source: 'assessment', program })
    } catch {
      /* ignore */
    }
    const base = signupUrl || DEFAULT_SIGNUP
    const sep = base.includes('?') ? '&' : '?'
    const dest = `${base}${sep}email=${encodeURIComponent(cleanEmail)}${cleanName ? `&name=${encodeURIComponent(cleanName)}` : ''}`
    onClose()
    window.location.href = dest
  }

  // Carry what they already typed into the portal signup so they aren't asked
  // for the same details twice.
  const goSignupPrefilled = () => {
    const base = signupUrl || DEFAULT_SIGNUP
    const cleanEmail = email.trim()
    const cleanName = name.trim()
    if (!cleanEmail) { onClose(); window.location.href = base; return }
    const sep = base.includes('?') ? '&' : '?'
    const dest = `${base}${sep}email=${encodeURIComponent(cleanEmail)}${cleanName ? `&name=${encodeURIComponent(cleanName)}` : ''}`
    onClose()
    window.location.href = dest
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '15px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0',
    fontSize: 16, color: '#0f172a', background: '#ffffff', outline: 'none',
    fontFamily: 'var(--font-space-grotesk)', WebkitAppearance: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 7,
    fontFamily: 'var(--font-space-grotesk)',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#ffffff', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header style={{
        padding: '22px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderBottom: '1px solid #f1f5f9',
        position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 10,
      }}>
        <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 17, fontWeight: 800, letterSpacing: '0.2em', color: '#0f172a', lineHeight: 1 }}>
            APEX
          </span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 8, fontWeight: 600, letterSpacing: '0.24em', color: '#4b5563', marginTop: 2, textTransform: 'uppercase' as const }}>
            Metabolic Health
          </span>
        </Link>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', left: 24, fontSize: 12, color: '#4b5563',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-space-grotesk)', fontWeight: 500,
          }}
        >
          ← Back
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 16, fontFamily: 'var(--font-space-grotesk)' }}>
            How it works
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#0f172a',
            lineHeight: 1.15, marginBottom: 52, fontFamily: 'var(--font-space-grotesk)',
            letterSpacing: '-0.02em',
          }}>
            From intake{' '}
            <span style={{ color: 'var(--blue)' }}>to protocol.</span>
          </h1>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}>
                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-space-grotesk)' }}>
                      {step.num}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, width: 1, background: '#e2e8f0', marginTop: 8, minHeight: 28 }} />
                  )}
                </div>
                {/* Text */}
                <div style={{ paddingTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' as const }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.14em',
                      background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)',
                      borderRadius: 99, padding: '3px 8px', whiteSpace: 'nowrap' as const,
                      fontFamily: 'var(--font-space-grotesk)',
                    }}>
                      {step.time}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {mode === 'contact' ? (
            sent ? (
              <div style={{ marginTop: 56, textAlign: 'center' as const }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px', background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={26} height={26}><path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', marginBottom: 8 }}>Thanks, we&apos;ll be in touch.</h2>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, maxWidth: 360, margin: '0 auto 24px' }}>A member of our clinical team will reach out shortly. Want to move faster? Create your account now to track your intake, results and consultations in one place.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <button onClick={goSignupPrefilled} style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--blue)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}>Create your account &rarr;</button>
                  <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: 12, background: 'transparent', color: '#475569', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}>I&apos;ll do this later</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitContact} style={{ marginTop: 56 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em', marginBottom: 6 }}>Prefer we contact you?</h2>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 22 }}>No rush and no account needed. Leave your details and our team will reach out.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label htmlFor="c-name" style={labelStyle}>Full name</label>
                    <input id="c-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="c-email" style={labelStyle}>Email address</label>
                    <input id="c-email" type="email" inputMode="email" required value={email} onChange={e => { setEmail(e.target.value); if (err) setErr('') }} placeholder="you@example.com" style={{ ...inputStyle, borderColor: err ? '#dc2626' : '#e2e8f0' }} />
                  </div>
                  <div>
                    <label htmlFor="c-phone" style={labelStyle}>Phone (optional)</label>
                    <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="04__ ___ ___" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="c-msg" style={labelStyle}>What can we help with? (optional)</label>
                    <textarea id="c-msg" rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us a little about what you're after" style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 88 }} />
                  </div>
                </div>
                {err && <p role="alert" style={{ fontSize: 12.5, color: '#dc2626', marginTop: 10, fontFamily: 'var(--font-space-grotesk)' }}>{err}</p>}
                <button type="submit" disabled={busy} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '18px 24px', borderRadius: 12, marginTop: 20, border: 'none', background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.75 : 1 }}>
                  {busy ? 'Sending…' : 'Send my details'}{!busy && <Arrow />}
                </button>
                <button type="button" onClick={() => { setMode('default'); setErr('') }} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: 'none', color: '#4b5563', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}>← Back to sign up</button>
              </form>
            )
          ) : (
          <>
          {capture ? (
            <form onSubmit={proceed} style={{ marginTop: 56 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em', marginBottom: 6 }}>
                Save your place
              </h2>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 22 }}>
                Enter your details and we&apos;ll set up your secure account. A member of our clinical team can follow up if you have any questions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label htmlFor="gs-name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 7, fontFamily: 'var(--font-space-grotesk)' }}>
                    First name
                  </label>
                  <input
                    id="gs-name" type="text" autoComplete="given-name" value={name}
                    onChange={e => setName(e.target.value)} placeholder="Your first name"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#4890f7' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0' }}
                  />
                </div>
                <div>
                  <label htmlFor="gs-email" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 7, fontFamily: 'var(--font-space-grotesk)' }}>
                    Email address
                  </label>
                  <input
                    id="gs-email" type="email" autoComplete="email" inputMode="email" required value={email}
                    onChange={e => { setEmail(e.target.value); if (err) setErr('') }} placeholder="you@example.com"
                    aria-invalid={!!err} aria-describedby={err ? 'gs-email-err' : undefined}
                    style={{ ...inputStyle, borderColor: err ? '#dc2626' : '#e2e8f0' }}
                    onFocus={e => { if (!err) e.currentTarget.style.borderColor = '#4890f7' }}
                    onBlur={e => { if (!err) e.currentTarget.style.borderColor = '#e2e8f0' }}
                  />
                  {err && (
                    <p id="gs-email-err" role="alert" style={{ fontSize: 12.5, color: '#dc2626', marginTop: 7, fontFamily: 'var(--font-space-grotesk)' }}>
                      {err}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit" disabled={busy}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '18px 24px', borderRadius: 12, marginTop: 20, border: 'none',
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                  color: '#ffffff', fontSize: 15, fontWeight: 600,
                  fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                  letterSpacing: '-0.01em', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.75 : 1,
                }}
              >
                {busy ? 'Setting up…' : 'Continue to secure signup'}
                {!busy && <Arrow />}
              </button>
              <p style={{ textAlign: 'center' as const, fontSize: 11, color: '#4b5563', marginTop: 12, fontFamily: 'var(--font-space-grotesk)' }}>
                No payment required · Completely confidential
              </p>
            </form>
          ) : (
            <div style={{ marginTop: 56 }}>
              <a
                href={onConfirm ? undefined : DEFAULT_SIGNUP}
                onClick={onConfirm ? (e) => { e.preventDefault(); onClose(); onConfirm() } : undefined}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '18px 24px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                  color: '#ffffff', fontSize: 15, fontWeight: 600, textDecoration: 'none',
                  fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                  letterSpacing: '-0.01em', cursor: 'pointer',
                }}
              >
                Create your account
                <Arrow />
              </a>
              <p style={{ textAlign: 'center' as const, fontSize: 11, color: '#4b5563', marginTop: 12, fontFamily: 'var(--font-space-grotesk)' }}>
                No payment required to get started
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => { setMode('contact'); setErr('') }}
            style={{ display: 'block', width: '100%', textAlign: 'center' as const, marginTop: 18, padding: 12, background: 'none', border: 'none', fontSize: 13.5, cursor: 'pointer', color: '#4b5563', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Not ready to sign up? <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Have us contact you instead →</span>
          </button>
          </>
          )}
        </div>
      </main>

      <footer style={{ padding: '18px 24px', textAlign: 'center' as const, borderTop: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--font-space-grotesk)' }}>
          All consultations conducted by AHPRA-registered medical practitioners. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
        </p>
      </footer>
    </motion.div>
  )
}
