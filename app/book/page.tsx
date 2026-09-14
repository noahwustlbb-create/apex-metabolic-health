'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { captureLead } from '@/lib/captureLead'
import MarketingConsent from '@/components/MarketingConsent'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = 'var(--blue)'

// ─── Programs ─────────────────────────────────────────────────────────────────

const PROGRAMS = [
  { id: 'hormone',   name: 'Hormone Optimisation',   sub: 'Testosterone, energy & drive',       href: '/intake/hormone-consult', color: 'var(--blue)',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M8 5.5L11 3l3 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { id: 'sexual',    name: 'Sexual Health',           sub: 'Libido, ED & performance',           href: '/intake/general-consult', color: '#e879f9',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M11 19c-4 0-7-3-7-7 0-2.5 1.5-5 4-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M11 19c4 0 7-3 7-7 0-2.5-1.5-5-4-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M11 19V9M11 9l-3-3M11 9l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { id: 'peptides',  name: 'Peptide Therapy',         sub: 'Recovery, repair & performance',     href: '/intake/general-consult', color: '#34d399',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M6 16l3-5 3 3 3-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="16" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" /><circle cx="6" cy="16" r="1.5" stroke="currentColor" strokeWidth="1.2" /></svg> },
  { id: 'weight',    name: 'Weight Loss',             sub: 'Medical, doctor-supervised',         href: '/intake/general-consult', color: '#fb923c',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M5 11h12M11 5v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.2" /></svg> },
  { id: 'hair',      name: 'Hair Restoration',        sub: 'Doctor-led male hair treatment',     href: '/intake/general-consult', color: '#a78bfa',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M11 4c-3.3 0-6 2.7-6 6 0 2.2 1.2 4.2 3 5.3V18h6v-2.7c1.8-1.1 3-3.1 3-5.3 0-3.3-2.7-6-6-6z" stroke="currentColor" strokeWidth="1.3" /><path d="M9 4.5C9 3 10 2 11 2s2 1 2 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg> },
  { id: 'skin',      name: 'Skin Regeneration',       sub: 'Clinical skin optimisation',         href: '/intake/general-consult', color: '#f472b6',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M11 3l1.5 4h4l-3.2 2.4 1.2 4L11 11l-3.5 2.4 1.2-4L5.5 7h4L11 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><circle cx="4" cy="17" r="1.2" stroke="currentColor" strokeWidth="1" /><circle cx="18" cy="17" r="1.2" stroke="currentColor" strokeWidth="1" /><circle cx="11" cy="19" r="1.2" stroke="currentColor" strokeWidth="1" /></svg> },
  { id: 'longevity', name: 'Anti-Ageing & Longevity', sub: 'Healthspan & performance',          href: '/intake/general-consult', color: '#fbbf24',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.3" /></svg> },
  { id: 'bloods',    name: 'Blood Panels',            sub: 'Comprehensive pathology',            href: '/intake/bloods-hormone',  color: '#f87171',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><path d="M11 3l5 9a5 5 0 11-10 0L11 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg> },
  { id: 'general',   name: 'General Telehealth',      sub: 'Any concern, any program',           href: '/intake/general-consult', color: '#64748b',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4 19c0-3.9 3.1-7 7-7h0c3.9 0 7 3.1 7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
  { id: 'unsure',    name: "I'm not sure yet",        sub: 'Help me find the right program',     href: null, color: 'var(--blue)',
    icon: <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5"><circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.3" /><path d="M8.5 8.5a2.5 2.5 0 014.8.8c0 2-2.8 2.5-2.8 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="10.5" cy="16" r="0.8" fill="currentColor" /></svg> },
]

const DURATIONS = [
  { id: 'new',    label: 'Just started noticing',  detail: 'Less than 3 months' },
  { id: 'months', label: 'A few months now',        detail: '3–12 months' },
  { id: 'years',  label: 'Over a year',             detail: '1–3 years' },
  { id: 'long',   label: 'A long time',             detail: '3+ years' },
]

const READINESS = [
  { id: 'now',       label: "I'm ready, let's get started",       detail: 'Skip straight to booking' },
  { id: 'talk',      label: 'I want to speak with someone first',   detail: 'Send a message, we respond within 1 business day' },
  { id: 'exploring', label: "I'm still exploring my options",       detail: 'Take the health assessment first' },
]

// ─── Slide variants ────────────────────────────────────────────────────────────

const variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
}

function durationLine(id: string | null) {
  switch (id) {
    case 'new':    return "You're catching this early. That's the right time to get clarity."
    case 'months': return "A few months is long enough without answers. Let's change that."
    case 'years':  return "Over a year without a real assessment is too long. Time to look properly."
    case 'long':   return "You've waited long enough. Let's get you the right clinical support."
    default: return "You're in the right place."
  }
}

// ─── Booking flow ─────────────────────────────────────────────────────────────

function BookingFlow() {
  const searchParams = useSearchParams()
  const preselect = searchParams.get('program')

  const [step, setStep] = useState(preselect ? 2 : 1)
  const [dir, setDir] = useState(1)
  const [program, setProgram] = useState<string | null>(preselect)
  const [duration, setDuration] = useState<string | null>(null)
  const [readiness, setReadiness] = useState<string | null>(null)

  // Lead capture (step 4)
  const [capName, setCapName] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [capEmail, setCapEmail] = useState('')
  const [capPhone, setCapPhone] = useState('')

  // Inline contact form (step 5 - message path)
  const [message, setMessage] = useState('')
  const [contactSending, setContactSending] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [contactError, setContactError] = useState('')
  const [outcomeView, setOutcomeView] = useState<'default' | 'contact'>('default')

  const selectedProgram = PROGRAMS.find(p => p.id === program)
  const knowsProgram = program !== null && program !== 'unsure'
  const captureValid = capName.trim().length > 1 && capEmail.includes('@') && capEmail.includes('.')

  const advance = (nextStep: number) => { setDir(1); setStep(nextStep) }
  const back = () => { setDir(-1); setStep(s => s - 1) }

  const totalSteps = preselect ? 3 : 4
  const currentDisplay = preselect ? step - 1 : step

  const inputCls = "w-full border rounded-xl px-4 py-3.5 text-sm placeholder:opacity-40 focus:outline-none focus:ring-1 transition-colors"
  const inputStyle = { borderColor: 'rgba(72,144,247,0.25)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }

  const sendContact = async () => {
    if (!message.trim()) return
    setContactSending(true)
    setContactError('')
    try {
      await captureLead({
        source: 'book-enquiry',
        name: capName, email: capEmail, phone: capPhone,
        program: selectedProgram?.name || program || '',
        message,
        marketingConsent,
      })
      setContactSent(true)
    } catch {
      setContactError('Could not send. Please email admin@apexmetabolichealth.com.au')
    } finally {
      setContactSending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-24">
        <div className="w-full max-w-2xl">

          {/* Step dots */}
          {step < 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-10 justify-center">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300"
                  style={{ width: i + 1 === currentDisplay ? 24 : 6, height: 6, background: i + 1 <= currentDisplay ? ACCENT : 'rgba(72,144,247,0.18)' }} />
              ))}
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={dir}>

            {/* ── STEP 1: Program selection ── */}
            {step === 1 && (
              <motion.div key="s1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease }}>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                  What brings you in?
                </h1>
                <p className="text-center mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Select the area you want to address. Your doctor can cover multiple concerns once you&apos;re in.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PROGRAMS.map((prog, i) => (
                    <motion.button key={prog.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease }}
                      onClick={() => { setProgram(prog.id); advance(2) }}
                      className={`text-left p-4 rounded-xl transition-all duration-150 flex flex-col gap-2 ${prog.id === 'unsure' ? 'col-span-2 sm:col-span-3' : ''}`}
                      style={{ background: 'var(--surface)', border: `1px solid ${program === prog.id ? prog.color : 'rgba(255,255,255,0.07)'}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = prog.color; e.currentTarget.style.background = `${prog.color}08` }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = program === prog.id ? prog.color : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'var(--surface)' }}
                    >
                      <span style={{ color: prog.color }}>{prog.icon}</span>
                      <div>
                        <p className="text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{prog.name}</p>
                        <p className="text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--text-secondary)' }}>{prog.sub}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Duration ── */}
            {step === 2 && (
              <motion.div key="s2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                  How long has this been going on?
                </h2>
                <p className="text-center mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {selectedProgram ? `Relating to ${selectedProgram.name.toLowerCase()}.` : 'For the concern you want to address.'}
                </p>
                <div className="flex flex-col gap-3">
                  {DURATIONS.map((d, i) => (
                    <motion.button key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06, ease }}
                      onClick={() => { setDuration(d.id); advance(3) }}
                      className="flex items-center justify-between p-5 rounded-xl text-left transition-all duration-150"
                      style={{ background: 'var(--surface)', border: `1px solid ${duration === d.id ? ACCENT : 'rgba(255,255,255,0.07)'}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = 'rgba(72,144,247,0.05)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = duration === d.id ? ACCENT : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'var(--surface)' }}
                    >
                      <div>
                        <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{d.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{d.detail}</p>
                      </div>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }}>
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
                {!preselect && (
                  <button onClick={back} className="flex items-center gap-1.5 text-xs mt-8 mx-auto" style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>Back
                  </button>
                )}
              </motion.div>
            )}

            {/* ── STEP 3: Readiness ── */}
            {step === 3 && (
              <motion.div key="s3" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                  Where are you at right now?
                </h2>
                <p className="text-center mb-10 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  No wrong answer. This just points you in the right direction.
                </p>
                <div className="flex flex-col gap-3">
                  {READINESS.map((r, i) => (
                    <motion.button key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07, ease }}
                      onClick={() => { setReadiness(r.id); advance(4) }}
                      className="flex items-center justify-between p-5 rounded-xl text-left transition-all duration-150"
                      style={{ background: r.id === 'now' ? 'rgba(72,144,247,0.07)' : 'var(--surface)', border: `1px solid ${r.id === 'now' ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.07)'}` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = 'rgba(72,144,247,0.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = r.id === 'now' ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = r.id === 'now' ? 'rgba(72,144,247,0.07)' : 'var(--surface)' }}
                    >
                      <div>
                        <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{r.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: r.id === 'now' ? ACCENT : 'var(--text-secondary)' }}>{r.detail}</p>
                      </div>
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }}>
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
                <button onClick={back} className="flex items-center gap-1.5 text-xs mt-8 mx-auto" style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>Back
                </button>
              </motion.div>
            )}

            {/* ── STEP 4: Lead capture ── */}
            {step === 4 && (
              <motion.div key="s4" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease }}>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-6"
                    style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)', color: ACCENT }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
                    Almost there
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                    Let's stay in touch
                  </h2>
                  <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Enter your details and we'll send you the next steps. No spam. We reach out once, professionally.
                  </p>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <input className={inputCls} style={inputStyle} placeholder="First name *" aria-label="First name"
                    value={capName} onChange={e => setCapName(e.target.value)} autoComplete="given-name" />
                  <input className={inputCls} style={inputStyle} placeholder="Email address *" aria-label="Email address"
                    type="email" value={capEmail} onChange={e => setCapEmail(e.target.value)} autoComplete="email" />
                  <input className={inputCls} style={inputStyle} placeholder="Mobile number (optional)" aria-label="Mobile number (optional)"
                    type="tel" value={capPhone} onChange={e => setCapPhone(e.target.value)} autoComplete="tel" />
                </div>

                <div className="mb-4">
                  <MarketingConsent id="book-consent" checked={marketingConsent} onChange={setMarketingConsent} />
                </div>

                <button
                  onClick={() => {
                    if (!captureValid) return
                    captureLead({
                      source: 'book',
                      name: capName.trim(), email: capEmail.trim(), phone: capPhone.trim(),
                      program: selectedProgram?.name || program || '',
                      marketingConsent,
                    }).catch(() => {})
                    advance(5)
                  }}
                  disabled={!captureValid}
                  className="btn-primary w-full flex items-center justify-center gap-2 mb-3"
                  style={{ opacity: captureValid ? 1 : 0.4, cursor: captureValid ? 'pointer' : 'not-allowed' }}
                >
                  See my next steps
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button onClick={back} className="flex items-center gap-1.5 text-xs mt-4 mx-auto" style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>Back
                </button>
                <p className="text-[10px] text-center mt-4" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>
                  We never sell your information. AHPRA-registered clinic.
                </p>
              </motion.div>
            )}

            {/* ── STEP 5: Outcome - 3 paths ── */}
            {step === 5 && (
              <motion.div key="s5" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.38, ease }}>
                {outcomeView === 'default' ? (
                  <>
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase mb-6"
                        style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)', color: ACCENT }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: ACCENT }} />
                        {capName ? `${capName}, here` : 'Here'}&apos;s what to do next
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                        {durationLine(duration)}
                      </h2>
                      <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Choose the path that feels right. All roads lead to the same place: a doctor who actually has time to understand your situation.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">

                      {/* Path 1 - Book now */}
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0, ease }}
                        className="rounded-2xl p-6 relative overflow-hidden"
                        style={{ background: readiness === 'now' ? 'rgba(72,144,247,0.08)' : 'var(--surface)', border: `1px solid ${readiness === 'now' ? 'rgba(72,144,247,0.35)' : 'rgba(255,255,255,0.07)'}` }}>
                        {readiness === 'now' && (
                          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                            style={{ background: ACCENT, color: '#fff' }}>Recommended</span>
                        )}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.2)' }}>
                            <svg viewBox="0 0 18 18" fill="none" className="w-4.5 h-4.5" style={{ color: ACCENT }}>
                              <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
                              <path d="M6 1v4M12 1v4M2 8h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                              <path d="M6 12h2M10 12h2M6 15h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                              Book a consultation now
                            </p>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              Complete your intake form for{' '}
                              <strong style={{ color: 'var(--text-primary)' }}>{selectedProgram?.name || 'your chosen program'}</strong>.
                              Your doctor reviews it and reaches out within 48 hours.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 text-xs mb-5" style={{ color: 'var(--text-secondary)' }}>
                          {['Intake form (~10 min)', 'Doctor issues pathology referral (48h)', 'Telehealth consultation', 'Personalised protocol'].map((s, i) => (
                            <div key={s} className="flex items-center gap-2.5">
                              <span className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                                style={{ background: 'rgba(72,144,247,0.12)', color: ACCENT }}>{i + 1}</span>
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                        <a href={selectedProgram?.href ?? '/intake/general-consult'} className="btn-primary inline-flex w-full justify-center" style={{ fontSize: '13px', padding: '13px 24px' }}>
                          Begin my intake form
                          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </motion.div>

                      {/* Path 2 - Health assessment */}
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08, ease }}
                        className="rounded-2xl p-6"
                        style={{ background: readiness === 'exploring' ? 'rgba(72,144,247,0.06)' : 'var(--surface)', border: `1px solid ${readiness === 'exploring' ? 'rgba(72,144,247,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <svg viewBox="0 0 18 18" fill="none" className="w-4.5 h-4.5" style={{ color: 'var(--text-primary)' }}>
                              <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke="currentColor" strokeWidth="1.4" />
                              <path d="M6.5 6.5a2.5 2.5 0 014.6.8c0 2-2.6 2.3-2.6 4.2M9 14.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                              Take the health assessment
                            </p>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              Not sure which program fits? Answer 18 questions and get a personalised plan built from your answers. Takes 2 minutes.
                            </p>
                          </div>
                        </div>
                        <a href="https://app.apexmetabolichealth.com.au/signup" className="inline-flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-150"
                          style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)', background: 'transparent' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text-primary)' }}>
                          Create Your Account
                          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </motion.div>

                      {/* Path 3 - Message us (replaces Calendly) */}
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.16, ease }}
                        className="rounded-2xl p-6"
                        style={{ background: readiness === 'talk' ? 'rgba(72,144,247,0.06)' : 'var(--surface)', border: `1px solid ${readiness === 'talk' ? 'rgba(72,144,247,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <svg viewBox="0 0 18 18" fill="none" className="w-4.5 h-4.5" style={{ color: 'var(--text-primary)' }}>
                              <path d="M3 3h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                              <path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                              Send us a message
                            </p>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              Have questions? Our clinical team responds within 1 business day. No commitment, no pressure.
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setOutcomeView('contact')}
                          className="inline-flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-150"
                          style={{ border: '1px solid var(--border-strong)', color: 'var(--text-primary)', background: 'transparent' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text-primary)' }}>
                          Write to us
                          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </motion.div>
                    </div>

                    <button onClick={() => { setStep(1); setDir(-1); setProgram(preselect); setDuration(null); setReadiness(null); setOutcomeView('default') }}
                      className="flex items-center gap-1.5 text-xs mt-10 mx-auto" style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      Start over
                    </button>
                  </>
                ) : (
                  /* ── Inline contact form ── */
                  <motion.div key="contact" initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease }}>
                    {contactSent ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-green-500">
                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>Message sent.</h3>
                        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          We'll be in touch within 1 business day. If it's urgent, email us at{' '}
                          <a href="mailto:admin@apexmetabolichealth.com.au" style={{ color: ACCENT }}>admin@apexmetabolichealth.com.au</a>
                        </p>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => setOutcomeView('default')} className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
                          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          Back to options
                        </button>
                        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>Send us a message</h2>
                        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          Ask us anything. Our clinical team will respond within 1 business day.
                        </p>
                        <div className="flex flex-col gap-3 mb-6">
                          <input className={inputCls} style={inputStyle} placeholder="Your name" aria-label="Your name" value={capName} onChange={e => setCapName(e.target.value)} />
                          <input className={inputCls} style={inputStyle} placeholder="Email address" aria-label="Email address" type="email" value={capEmail} onChange={e => setCapEmail(e.target.value)} />
                          <input className={inputCls} style={inputStyle} placeholder="Mobile (optional)" aria-label="Mobile (optional)" type="tel" value={capPhone} onChange={e => setCapPhone(e.target.value)} />
                          <textarea
                            className={inputCls}
                            style={{ ...inputStyle, resize: 'none' }}
                            rows={4}
                            aria-label="Your message"
                            placeholder="What would you like to know? Any concerns, questions about programs, or anything else..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                          />
                        </div>
                        {contactError && <p className="text-xs text-red-400 mb-3">{contactError}</p>}
                        <button
                          onClick={sendContact}
                          disabled={contactSending || !message.trim() || !capEmail.includes('@')}
                          className="btn-primary w-full flex items-center justify-center gap-2"
                          style={{ opacity: contactSending || !message.trim() || !capEmail.includes('@') ? 0.5 : 1 }}
                        >
                          {contactSending ? 'Sending…' : 'Send message'}
                          {!contactSending && (
                            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: ACCENT, borderTopColor: 'transparent' }} />
      </div>
    }>
      <BookingFlow />
    </Suspense>
  )
}
