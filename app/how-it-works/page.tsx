'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Complete the clinical assessment',
    duration: '5 minutes',
    phase: 'Day 1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6M9 16h4" strokeLinecap="round"/>
      </svg>
    ),
    body: 'Answer a short set of clinical questions about your symptoms, history, and goals. No commitment required. An Apex doctor reviews your submission and contacts you directly — typically the same day.',
    details: [
      { label: 'No GP referral required' },
      { label: 'Reviewed by a doctor, not a form system' },
      { label: 'Same-day response in most cases' },
    ],
  },
  {
    n: '02',
    title: 'Blood panel referral arranged',
    duration: '48 hours',
    phase: 'Day 1–2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L8 8H4l4 4-1.5 5.5L12 15l5.5 2.5L16 12l4-4h-4L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    body: 'Your doctor issues a pathology referral specific to your program. Attend any accredited collection centre near you — no appointment required at most locations. Fasted morning collection is standard for hormone panels.',
    details: [
      { label: 'Any accredited collection centre Australia-wide' },
      { label: 'Fasted morning draw recommended for hormones' },
      { label: 'Member rate applied if on membership pathway' },
    ],
  },
  {
    n: '03',
    title: 'Telehealth consultation',
    duration: '30–60 minutes',
    phase: 'Day 3–5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    body: 'Your AHPRA-registered doctor reviews your blood results, takes a detailed medical history, and delivers a full clinical assessment. This is not a quick prescription call — expect a thorough conversation about your biology, your goals, and your options.',
    details: [
      { label: 'Video or phone — your choice' },
      { label: 'Full biomarker review included' },
      { label: 'Leave with a clear written protocol' },
    ],
  },
  {
    n: '04',
    title: 'Protocol begins',
    duration: 'Week 1',
    phase: 'Day 5–7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    body: 'Where clinically appropriate, treatment is coordinated through our TGA-compliant compounding pharmacy partner. Members receive medication at cost price with prescribing fees waived. Script release to your own pharmacy is also available.',
    details: [
      { label: 'TGA-compliant pharmacy fulfilment' },
      { label: 'Members: medication at cost price' },
      { label: 'Script release to own pharmacy available' },
    ],
  },
  {
    n: '05',
    title: 'Monitoring and review cycles',
    duration: 'Every 4 months',
    phase: 'Ongoing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 4v5h5M20 20v-5h-5M4 20l16-16" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    body: 'Active protocol patients complete a blood panel and a doctor review every 4 months. Not optional — it\'s how we keep treatment safe, evidence-based, and continuously refined. Protocol adjustments are made on results, not assumptions.',
    details: [
      { label: 'Blood work required every 4 months' },
      { label: 'Protocol adjusted based on results' },
      { label: 'Members: discounted repeat blood panels' },
    ],
  },
]

const FAQS = [
  {
    q: 'Do I need a GP referral to get started?',
    a: 'No. You book directly through our website. Our AHPRA-registered doctors assess clinical suitability during your consultation.',
  },
  {
    q: 'Can I use existing blood test results?',
    a: 'In some cases, yes — particularly if results are recent and comprehensive. Submit them via our assessment form and our team will assess their suitability before your consultation.',
  },
  {
    q: 'How long before I see results?',
    a: 'This varies by program and individual. Your doctor will give you a realistic timeline based on your specific protocol during consultation. We don\'t make generalised outcome claims.',
  },
  {
    q: 'What if I\'m not clinically suitable?',
    a: 'Clinical suitability is always assessed by a doctor. If a specific program isn\'t appropriate, your doctor will discuss alternatives and will not prescribe treatment that isn\'t clinically indicated.',
  },
  {
    q: 'How are consultations conducted?',
    a: 'All consultations are via secure telehealth — video or phone. You need a device with a camera or microphone and a private space.',
  },
  {
    q: 'Is there a lock-in contract?',
    a: 'No. Review consultations are required for patients on active protocols, but you can step back from treatment at any point by speaking with your doctor.',
  },
  {
    q: 'What does the 4-month review involve?',
    a: 'A follow-up blood panel at any accredited collection centre, then a telehealth consultation where your doctor reviews results, assesses your response to treatment, and adjusts your protocol as needed.',
  },
  {
    q: 'Can I choose between membership and script release?',
    a: 'Yes. Your doctor will explain both options during your initial consultation. Membership is strongly recommended for patients on ongoing protocols — the clinical oversight and cost savings are significant.',
  },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="How it works"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1400&q=80" alt="" fill className="object-cover object-center" style={{ opacity: 0.15 }} unoptimized />
        <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(4,6,13,0.65)' }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgba(4,6,13,0.35) 55%, transparent 78%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />
      </div>
      <div aria-hidden="true" className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />

      <div className="container-tight relative z-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="label mb-5">
          How It Works
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4.5vw, 66px)',
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            maxWidth: '820px',
            marginBottom: '1.25rem',
          }}
        >
          From first message
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            to active protocol.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease }}
          className="text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-primary)', opacity: 0.65, maxWidth: '500px', marginBottom: '2rem' }}
        >
          No vague timelines. No hidden steps. Every stage of care, explained — from your first assessment to ongoing protocol management.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Start your assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
          <Link href="/pricing" className="btn-ghost">
            View pricing
          </Link>
        </motion.div>

        {/* Timeline pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="flex flex-wrap gap-2"
        >
          {[
            { phase: 'Day 1', label: 'Assessment' },
            { phase: 'Day 1–2', label: 'Blood referral' },
            { phase: 'Day 3–5', label: 'Consultation' },
            { phase: 'Day 5–7', label: 'Protocol begins' },
            { phase: 'Every 4 months', label: 'Review cycle' },
          ].map(({ phase, label }, i) => (
            <div key={label} className="flex items-center gap-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.12)' }}>
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: ACCENT, opacity: 0.7 }}>{phase}</span>
                <span className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{label}</span>
              </div>
              {i < 4 && (
                <svg viewBox="0 0 12 12" fill="none" width="18" height="18" className="mx-1 flex-shrink-0" aria-hidden="true">
                  <path d="M3 6h6M7 4l2 2-2 2" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                </svg>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Process Steps ─────────────────────────────────────────────────────────────

function ProcessSteps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="The process"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.08 }}
          >
            Five steps. Clear at every stage.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical connector line — desktop */}
          <div className="absolute left-[27px] top-10 bottom-10 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, transparent, rgba(72,144,247,0.15) 10%, rgba(72,144,247,0.15) 90%, transparent)' }} aria-hidden="true" />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.1, ease }}
                className="flex gap-8 pb-12 last:pb-0"
              >
                {/* Step number */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-[54px] h-[54px] rounded-full flex items-center justify-center relative z-10 flex-shrink-0"
                    style={{ background: 'var(--bg)', border: `1px solid rgba(72,144,247,0.22)` }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '15px', fontWeight: 800, color: ACCENT, letterSpacing: '-0.02em' }}>
                      {step.n}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-2">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap pt-0.5">
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.15)', color: ACCENT }}>
                        {step.phase}
                      </span>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-primary)', opacity: 0.5 }}>
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
                    {step.body}
                  </p>

                  {/* Detail chips */}
                  <div className="flex flex-wrap gap-2">
                    {step.details.map(d => (
                      <div key={d.label} className="flex items-center gap-2 px-3.5 py-2 rounded-lg"
                        style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.1)' }}>
                        <svg viewBox="0 0 10 10" fill="none" width="9" height="9" aria-hidden="true">
                          <circle cx="5" cy="5" r="4.5" fill="rgba(72,144,247,0.12)" stroke={ACCENT} strokeWidth="0.7" />
                          <path d="M3 5l1.5 1.5 2.5-3" stroke={ACCENT} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[11px] font-medium" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4-step image strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14"
        >
          {[
            { step: '01', src: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=600&q=80', alt: 'Complete your health assessment online', title: 'Online assessment', sub: 'Day 1 · 5 minutes' },
            { step: '02', src: 'https://images.unsplash.com/photo-1639772823849-6efbd173043c?auto=format&fit=crop&w=600&q=80', alt: 'Pathology blood panel collection', title: 'Accredited pathology', sub: 'Day 1–2 · 48 hours' },
            { step: '03', src: 'https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?auto=format&fit=crop&w=600&q=80', alt: 'Doctor-led telehealth consultation', title: 'Telehealth consultation', sub: 'Day 3–5 · 30–60 min' },
            { step: '04', src: 'https://images.unsplash.com/flagged/photo-1556746834-1cb5b8fabd54?auto=format&fit=crop&w=600&q=80', alt: 'Ongoing optimisation and protocol', title: 'Protocol begins', sub: 'Day 5–7 · Week 1' },
          ].map((item) => (
            <div key={item.step} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '3/4', border: '1px solid rgba(72,144,247,0.12)' }}>
              <Image src={item.src} alt={item.alt} fill className="object-cover" style={{ opacity: 0.8 }} unoptimized />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(4,6,13,0.2) 0%, transparent 35%, rgba(4,6,13,0.88) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(72,144,247,0.9)' }}>Step {item.step}</p>
                <p className="text-sm font-semibold leading-tight" style={{ color: '#ffffff' }}>{item.title}</p>
                <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── Two Pathways ─────────────────────────────────────────────────────────────

function TwoPathways() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="After your consultation"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(72,144,247,0.04) 0%, transparent 70%)' }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            After Your Consultation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
          >
            Two ways to continue care.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
            Your doctor will explain both options at your consultation. The right choice depends on your clinical goals and how actively you want your protocol managed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Membership */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease }}
            className="relative flex flex-col rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${ACCENT}`, background: 'var(--surface)', boxShadow: '0 0 60px rgba(72,144,247,0.1)' }}
          >
            {/* Recommended badge */}
            <div className="absolute top-0 right-5 px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase rounded-b-lg"
              style={{ background: ACCENT, color: '#ffffff' }}>
              Recommended
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: ACCENT }}>
                  Apex Protocol Membership
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>$99</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>/month</span>
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>No lock-in. Cancel anytime.</p>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>
                Full ongoing clinical management. Includes the 4-monthly review cycle, prescribing fees waived, medication at cost price, discounted blood panels, and nursing team check-ins.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Prescribing fees waived ($125 per script otherwise)',
                  'Medication at pharmacy cost price — no mark-up',
                  'Discounted follow-up blood panels',
                  '4-monthly consultation and protocol review',
                  'Nursing team check-ins every 6–8 weeks',
                  'Priority clinical support between consultations',
                  'Free referrals, certificates and health summaries',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="6" cy="6" r="5.5" fill="rgba(72,144,247,0.12)" stroke={ACCENT} strokeWidth="0.8" />
                      <path d="M3.5 6l2 2 3-3.5" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-2">
                <div className="rounded-xl p-4 mb-4"
                  style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.12)' }}>
                  <p className="text-[11px] font-semibold mb-0.5" style={{ color: ACCENT }}>Members save $1,000–$1,800/yr on average</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
                    vs. the single consult path — at 3+ medication invoices it pays for itself
                  </p>
                </div>
                <Link href="/membership" className="btn-teal w-full justify-center">
                  Learn about membership
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Script release */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.32, ease }}
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'var(--surface)' }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
                  Script Release Only
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>Once-off</span>
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>Standard consulting fees apply.</p>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                For patients who want a clinical assessment, a script, and then independence. Script is released to your preferred pharmacy. Follow-up consultations are available but managed ad-hoc.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Peptide consultation: $125 per session',
                  'Hormone consultation: $275 per session',
                  'Script released to your chosen pharmacy',
                  'Prescribing fee: $125 per script',
                  'Medication at standard pharmacy pricing',
                  'Follow-up consultations available on request',
                  'No structured review cycle',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="6" cy="6" r="5.5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                      <path d="M3.5 6l2 2 3-3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-2">
                <div className="rounded-xl p-4 mb-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-[11px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>Note on ongoing protocols</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.3 }}>
                    Active protocols require monitoring. Your doctor may recommend membership for safety and cost reasons if ongoing treatment is appropriate.
                  </p>
                </div>
                <Link href="/intake/pre-screen" className="btn-ghost w-full justify-center">
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: i * 0.05, ease }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-6"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.4 }}>
          {q}
        </span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: open ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${open ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s' }}>
          <svg viewBox="0 0 12 12" fill="none" width="10" height="10" aria-hidden="true"
            style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', color: open ? ACCENT : 'rgba(255,255,255,0.4)' }}>
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Common questions"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div aria-hidden="true" className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          <div className="lg:col-span-1">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
              Questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Common questions, straight answers.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>
              More detail at our full FAQ page.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.28 }}>
              <Link href="/faqs" className="btn-ghost" style={{ fontSize: '13px', padding: '10px 20px' }}>
                View all FAQs
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Start your assessment"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.06) 0%, transparent 60%)' }} />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.06, marginBottom: '1rem' }}
        >
          Ready to get actual answers
          <br />
          <span style={{ color: ACCENT }}>about your biology?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }}
          className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-primary)', opacity: 0.5 }}
        >
          The clinical assessment takes 60 seconds. A doctor reviews your submission the same day. No commitment, no pressure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Start your clinical assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
          <Link href="/faqs" className="btn-ghost">
            Browse FAQs
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.45 }}
          className="text-[11px] mt-6" style={{ color: 'var(--text-primary)', opacity: 0.25 }}
        >
          All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProcessSteps />
        <TwoPathways />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
