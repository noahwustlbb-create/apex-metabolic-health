'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { programs } from '@/lib/programs'
import { captureLead } from '@/lib/captureLead'
import MarketingConsent from '@/components/MarketingConsent'

const DEFAULT_SIGNUP = 'https://app.apexmetabolichealth.com.au/signup'
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type View = 'choice' | 'form'

export default function HeroStartModal({ onClose, program: initialProgram = '' }: { onClose: () => void; program?: string }) {
  const [view, setView] = useState<View>('choice')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState(initialProgram)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock body scroll + close on Escape + focus the dismiss control.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const goSignup = () => { window.location.href = DEFAULT_SIGNUP }

  // Carry what they already typed into the portal signup so they aren't asked
  // for the same details twice.
  const goSignupPrefilled = () => {
    const params = new URLSearchParams()
    const cleanEmail = email.trim()
    const cleanName = name.trim()
    if (cleanEmail) params.set('email', cleanEmail)
    if (cleanName) params.set('name', cleanName)
    const qs = params.toString()
    window.location.href = qs ? `${DEFAULT_SIGNUP}?${qs}` : DEFAULT_SIGNUP
  }

  const submitIntake = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const cleanEmail = email.trim()
    if (!name.trim()) { setErr('Please enter your name.'); return }
    if (!EMAIL_RE.test(cleanEmail)) { setErr('Please enter a valid email address.'); return }
    setErr('')
    setBusy(true)
    try {
      await captureLead({
        source: 'get-started-intake',
        name: name.trim(), email: cleanEmail, phone: phone.trim(),
        program, message: message.trim(), marketingConsent,
      })
      setSent(true)
    } catch {
      setErr('Something went wrong. Please try again, or email admin@apexmetabolichealth.com.au.')
    } finally {
      setBusy(false)
    }
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
      role="dialog" aria-modal="true" aria-labelledby="hsm-title"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#ffffff', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header style={{
        padding: '22px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 10,
      }}>
        <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 17, fontWeight: 800, letterSpacing: '0.2em', color: '#0f172a', lineHeight: 1 }}>APEX</span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 8, fontWeight: 600, letterSpacing: '0.24em', color: '#4b5563', marginTop: 2, textTransform: 'uppercase' }}>Metabolic Health</span>
        </Link>
        <button
          ref={closeRef}
          onClick={() => (view === 'form' && !sent ? setView('choice') : onClose())}
          style={{
            position: 'absolute', left: 24, fontSize: 12, color: '#4b5563', background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-space-grotesk)', fontWeight: 500,
          }}
        >
          ← Back
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>

          {view === 'choice' && (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 16, fontFamily: 'var(--font-space-grotesk)' }}>
                Get started
              </p>
              <h1 id="hsm-title" style={{
                fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#0f172a', lineHeight: 1.15,
                marginBottom: 12, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em',
              }}>
                How would you like{' '}<span style={{ color: 'var(--blue)' }}>to begin?</span>
              </h1>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, marginBottom: 36 }}>
                Two ways in. Either send us a few details and our clinical team follows up, or create your account and start straight away.
              </p>

              {/* Option 1: intake form */}
              <button
                onClick={() => { setView('form'); setErr('') }}
                style={{
                  width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16,
                  padding: '22px 24px', borderRadius: 16, marginBottom: 14, cursor: 'pointer',
                  background: '#ffffff', border: '1.5px solid #e2e8f0', transition: 'border-color 0.18s ease, transform 0.18s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4890f7'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: 'rgba(72,144,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={22} height={22} aria-hidden="true"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', marginBottom: 3 }}>Complete a short intake form</span>
                  <span style={{ display: 'block', fontSize: 13.5, color: '#475569', lineHeight: 1.5 }}>Tell us what you&apos;re after and our team reaches out. No account needed.</span>
                </span>
                <span style={{ color: '#94a3b8' }}><Arrow /></span>
              </button>

              {/* Option 2: create account */}
              <button
                onClick={goSignup}
                style={{
                  width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16,
                  padding: '22px 24px', borderRadius: 16, cursor: 'pointer',
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', border: '1.5px solid transparent',
                  boxShadow: '0 8px 28px rgba(72,144,247,0.28)', transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(72,144,247,0.42)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(72,144,247,0.28)' }}
              >
                <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={22} height={22} aria-hidden="true"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-space-grotesk)', marginBottom: 3 }}>Create your account</span>
                  <span style={{ display: 'block', fontSize: 13.5, color: 'rgba(255,255,255,0.86)', lineHeight: 1.5 }}>Set up your secure account and start your intake straight away.</span>
                </span>
                <span style={{ color: '#fff' }}><Arrow /></span>
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: '#4b5563', marginTop: 20, fontFamily: 'var(--font-space-grotesk)' }}>
                No payment required to get started · Completely confidential
              </p>
            </>
          )}

          {view === 'form' && (
            sent ? (
              <div style={{ textAlign: 'center', paddingTop: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px', background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" width={26} height={26} aria-hidden="true"><path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', marginBottom: 8 }}>Thanks, we&apos;ll be in touch.</h2>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, maxWidth: 380, margin: '0 auto 24px' }}>A member of our clinical team will reach out shortly. Want to move faster? Create your account now to track your intake, results and consultations in one place.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <button onClick={goSignupPrefilled} style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--blue)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}>Create your account &rarr;</button>
                  <button onClick={onClose} style={{ padding: '10px 24px', borderRadius: 12, background: 'transparent', color: '#475569', border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}>I&apos;ll do this later</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitIntake}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 12, fontFamily: 'var(--font-space-grotesk)' }}>Intake form</p>
                <h1 id="hsm-title" style={{ fontSize: 'clamp(24px, 4.5vw, 34px)', fontWeight: 700, color: '#0f172a', lineHeight: 1.15, marginBottom: 6, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
                  Tell us a little about you.
                </h1>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 26 }}>
                  Takes under a minute. Our clinical team will review it and reach out with your next step.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label htmlFor="hsm-name" style={labelStyle}>Full name</label>
                    <input id="hsm-name" type="text" autoComplete="name" maxLength={80} value={name} onChange={e => { setName(e.target.value); if (err) setErr('') }} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="hsm-email" style={labelStyle}>Email address</label>
                    <input id="hsm-email" type="email" autoComplete="email" inputMode="email" required maxLength={120} value={email} onChange={e => { setEmail(e.target.value); if (err) setErr('') }} placeholder="you@example.com" aria-invalid={!!err} style={{ ...inputStyle, borderColor: err ? '#dc2626' : '#e2e8f0' }} />
                  </div>
                  <div>
                    <label htmlFor="hsm-phone" style={labelStyle}>Phone (optional)</label>
                    <input id="hsm-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={phone} onChange={e => setPhone(e.target.value)} placeholder="04__ ___ ___" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="hsm-program" style={labelStyle}>What are you interested in? (optional)</label>
                    <select id="hsm-program" value={program} onChange={e => setProgram(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Not sure yet</option>
                      {programs.map(p => (
                        <option key={p.slug} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hsm-msg" style={labelStyle}>Anything you&apos;d like us to know? (optional)</label>
                    <textarea id="hsm-msg" rows={3} maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} placeholder="Symptoms, goals, or questions" style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} />
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <MarketingConsent id="hsm-consent" checked={marketingConsent} onChange={setMarketingConsent} />
                </div>

                {err && <p role="alert" style={{ fontSize: 12.5, color: '#dc2626', marginTop: 12, fontFamily: 'var(--font-space-grotesk)' }}>{err}</p>}

                <button type="submit" disabled={busy} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
                  padding: '18px 24px', borderRadius: 12, marginTop: 22, border: 'none',
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', fontSize: 15, fontWeight: 600,
                  fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                  cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.75 : 1,
                }}>
                  {busy ? 'Sending…' : 'Send my details'}{!busy && <Arrow />}
                </button>
                <button type="button" onClick={goSignup} style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: 16, padding: 12, background: 'none', border: 'none', fontSize: 13.5, cursor: 'pointer', color: '#4b5563', fontFamily: 'var(--font-space-grotesk)' }}>
                  Rather start now? <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Create your account instead →</span>
                </button>
              </form>
            )
          )}
        </div>
      </main>

      <footer style={{ padding: '18px 24px', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--font-space-grotesk)' }}>
          All consultations conducted by AHPRA-registered medical practitioners. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
        </p>
      </footer>
    </motion.div>
  )
}
