'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ADVANTAGE_STATS = [
  { value: '$0',           label: 'Prescribing fees',   sub: 'vs $125 per script' },
  { value: 'Cost price',   label: 'All medication',     sub: 'No AHI mark-up' },
  { value: '$1,000–$1,800', label: 'Annual saving',     sub: 'vs single consult path' },
  { value: '$99',          label: 'Per month',           sub: 'No lock-in contracts' },
]

const SAVINGS_ROWS = [
  { label: 'Prescribing fees',        saving: 'Up to $500',   period: '/yr', detail: '3–5 scripts × $125, waived entirely as a member' },
  { label: 'Medication mark-ups',     saving: '$600–$1,200',  period: '/yr', detail: 'Zero AHI fees — pharmacy cost price passed direct' },
  { label: 'Follow-up blood panels',  saving: '~$120',        period: '/yr', detail: 'Discounted member rate on all repeat pathology' },
]

const INCLUDED = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path d="M20 11h-4l-3 8L7 3 4 11H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Doctor-led protocol management',
    body: 'Your treatment isn\'t a static prescription. It evolves with your bloods, your feedback, and your response to treatment — adjusted by a doctor every cycle.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <circle cx="11" cy="11" r="9" /><path d="M11 7v4l3 2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Structured 4-month review cycles',
    body: 'Every 4 months: blood work, full biomarker analysis, and protocol reassessment. Not guesswork between appointments — a systematic clinical review.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path d="M3 3v16h16" strokeLinecap="round" /><path d="M7 14l4-5 4 3 4-6" strokeLinecap="round" />
      </svg>
    ),
    title: 'Biomarker tracking over time',
    body: 'One result tells you where you are. Trends tell you where you\'re going. We track your markers across every draw so optimisation is data-driven, not guesswork.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path d="M8 3l-1 5.5H5L8 17a3 3 0 006 0l3-8.5h-2L14 3H8z" strokeLinecap="round" />
      </svg>
    ),
    title: 'Discounted follow-up blood panels',
    body: 'Repeat pathology at member rates. No guessing at dose changes without data — every adjustment is grounded in objective measurement.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /><path d="M12 6v5l3 2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Priority clinical support',
    body: 'Your care team between consultations — not just at them. Questions answered, concerns escalated, and care coordinated by a dedicated clinical team.',
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
        <path d="M11 2a10 10 0 100 20A10 10 0 0011 2z" />
        <path d="M11 8v5" strokeLinecap="round" /><path d="M11 16h.01" strokeLinecap="round" />
      </svg>
    ),
    title: 'Free referrals, certs & letters',
    body: 'Medical certificates, health summaries, referrals, and travel letters included as part of your membership. No bolt-on fees.',
  },
]

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '90px' }}
      aria-label="Apex Membership"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <div aria-hidden="true" className="absolute top-0 left-0 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(72,144,247,0.05) 0%, transparent 60%)' }} />

      <div ref={ref} className="container-tight relative z-10">

        {/* Savings proof pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
          style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.18)' }}
        >
          <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden="true">
            <circle cx="6" cy="6" r="5.5" fill="rgba(72,144,247,0.15)" stroke={ACCENT} strokeWidth="0.8" />
            <path d="M3.5 6l2 2 3-3.5" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[11px] font-semibold" style={{ color: ACCENT }}>
            Members save $1,000–$1,800/yr vs. the single consult path
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.04, ease }}
          className="label mb-5"
        >
          Apex Protocol
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4.5vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            maxWidth: '820px',
            marginBottom: '1.25rem',
          }}
        >
          Ongoing care that{' '}
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            pays for itself.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-primary)', opacity: 0.7, maxWidth: '520px', marginBottom: '2.25rem' }}
        >
          A full doctor-led clinical system for $99/mo — protocol management, biomarker tracking, medication at cost price, and prescribing fees waived. Structured to save you more than it costs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Start your clinical assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <div className="flex items-baseline gap-1.5 px-5 py-3 rounded-full"
            style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.18)' }}>
            <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>$99</span>
            <span className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>/month · no lock-in</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.48, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {['AHPRA-registered doctors', 'Reviewed every 4 months', 'Australia-wide telehealth', 'Cancel anytime'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: ACCENT }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AdvantageStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      ref={ref}
      aria-label="Membership advantages"
      style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid rgba(72,144,247,0.1)', borderBottom: '1px solid rgba(72,144,247,0.1)' }}
    >
      <div className="container-tight">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {ADVANTAGE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="flex flex-col py-8 px-6"
              style={{
                borderRight: i < 3 ? '1px solid rgba(72,144,247,0.08)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(72,144,247,0.08)' : 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: i === 2 ? 'clamp(18px, 2.5vw, 26px)' : '28px',
                fontWeight: 800,
                color: ACCENT,
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '3px' }}>
                {stat.label}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-primary)', opacity: 0.38 }}>
                {stat.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SavingsBreakdown() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Savings breakdown"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 70%)' }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — context */}
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
              Is it worth it?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.08, marginBottom: '1rem' }}
            >
              The average Apex patient on protocol has:
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }}
              className="grid grid-cols-3 gap-3 mb-8"
            >
              {[
                { value: '2–4', label: 'Consultations per year' },
                { value: '2–3', label: 'Blood panels per year' },
                { value: '12+', label: 'Months of treatment' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center justify-center py-5 rounded-xl text-center"
                  style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '32px', fontWeight: 800, color: ACCENT, lineHeight: 1 }}>{value}</span>
                  <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.4, marginTop: '6px' }}>{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.32 }}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-primary)', opacity: 0.55 }}
            >
              If that sounds like you, here&apos;s what membership saves you annually — before you factor in the clinical value of having a doctor actually managing your protocol.
            </motion.p>
          </div>

          {/* Right — savings table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            <div className="overflow-hidden" style={{ border: '1px solid rgba(72,144,247,0.14)', borderRadius: '16px', background: 'var(--surface)' }}>
              {SAVINGS_ROWS.map((row) => (
                <div key={row.label} className="flex items-center justify-between px-6 py-5"
                  style={{ borderBottom: '1px solid rgba(72,144,247,0.06)' }}>
                  <div className="min-w-0 pr-4">
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.5, marginBottom: '3px' }}>
                      {row.label}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-primary)', opacity: 0.28 }}>{row.detail}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', fontWeight: 800, color: ACCENT }}>{row.saving}</span>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '12px', fontWeight: 600, color: ACCENT, opacity: 0.65 }}>{row.period}</span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between px-6 py-6"
                style={{ background: 'rgba(72,144,247,0.05)', borderTop: '1px solid rgba(72,144,247,0.16)' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.55 }}>
                    Typical annual saving
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-primary)', opacity: 0.28, marginTop: '3px' }}>
                    vs. single consult path · individual results vary
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-6">
                  <p style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '30px', fontWeight: 800, color: ACCENT, lineHeight: 1 }}>$1,000–$1,800</p>
                  <p style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '11px', fontWeight: 600, color: ACCENT, opacity: 0.6, marginTop: '3px' }}>per year</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] mt-4 text-center" style={{ color: 'var(--text-primary)', opacity: 0.28 }}>
              Membership costs $99/mo ($1,188/yr). At 3+ medication invoices, the saving covers the cost of membership itself.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WhatsIncluded() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="What's included">
      <div className="glow-rule" aria-hidden="true" />
      <div ref={ref} className="container-tight relative z-10">

        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            What&apos;s Included
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.08, maxWidth: '600px' }}
          >
            Everything inside{' '}
            <span style={{ color: ACCENT }}>$99 a month.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INCLUDED.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease }}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.12)', borderTop: `2px solid ${ACCENT}` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)', color: ACCENT }}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bonus items */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55, ease }}
          className="mt-6 flex flex-wrap gap-3"
        >
          {[
            'Medication at pharmacy cost price',
            'Prescribing fee waived',
            'Nursing team check-ins every 6–8 weeks',
            'Medical certificates included',
            'Health summaries on request',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
              style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
              <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden="true">
                <circle cx="6" cy="6" r="5.5" fill="rgba(72,144,247,0.12)" stroke={ACCENT} strokeWidth="0.8" />
                <path d="M3.5 6l2 2 3-3.5" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', opacity: 0.7 }}>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FourMonthCycle() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const phases = [
    { n: '01', phase: 'Month 1', label: 'Baseline', desc: 'Comprehensive blood work. Full biomarker baseline established. Initial protocol built by your doctor.' },
    { n: '02', phase: 'Month 2', label: 'Optimise', desc: 'Treatment underway. Early response reviewed. Dosing and protocol refined to your feedback.' },
    { n: '03', phase: 'Month 3', label: 'Refine', desc: 'Mid-cycle check-in. Nutrition and lifestyle calibrated. Progress tracked against clinical targets.' },
    { n: '04', phase: 'Month 4', label: 'Review', desc: 'Full clinical review. Follow-up blood work completed. Protocol reassessed. Next cycle begins.' },
  ]

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="4-month review cycle">
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            The System
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
          >
            How the 4-month cycle works.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
            Not a static prescription — a living, evolving protocol that responds to your biology.
          </motion.p>
        </div>

        {/* Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.22, ease }}
          className="hidden md:grid grid-cols-4 gap-0 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(72,144,247,0.14)' }}
        >
          {phases.map((phase, i) => (
            <div key={phase.phase} className="flex flex-col p-8 relative"
              style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderRight: i < 3 ? '1px solid rgba(72,144,247,0.1)' : 'none' }}>
              {i < 3 && (
                <div className="absolute top-8 -right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.18)' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                  </svg>
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                  <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{phase.n}</span>
                </div>
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: ACCENT }}>{phase.phase}</span>
              </div>
              <span className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{phase.label}</span>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{phase.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-3">
          {phases.map((phase) => (
            <div key={phase.phase} className="flex gap-4 rounded-xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.12)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{phase.n}</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-1" style={{ color: ACCENT }}>{phase.phase}</p>
                <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{phase.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClosingCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: `linear-gradient(135deg, #1a3a6e 0%, #2563eb 50%, #4890f7 100%)` }}
      aria-label="Join the membership"
    >
      <div className="absolute inset-0 dot-grid opacity-20" style={{ filter: 'invert(1)' }} aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />

      <div className="container-tight relative z-10 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Apex Protocol Membership
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 56px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '1.25rem' }}
        >
          Your biology doesn&apos;t stop.
          <br />
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Neither should your care.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.12, ease }}
          className="text-sm leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          $99/mo. No lock-in. Activates after your initial consultation where clinically appropriate. Saves most members more than it costs.
        </motion.p>

        {/* Inline stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { value: '$0', label: 'Prescribing fees' },
            { value: 'Cost price', label: 'Medication' },
            { value: '$1,000–$1,800', label: 'Avg annual saving' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/intake/pre-screen" className="btn-white" style={{ fontSize: '14px', padding: '16px 32px' }}>
            Start your clinical assessment
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Takes 60 seconds. No commitment. No lock-in.</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs mt-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
          All consultations conducted by AHPRA-registered practitioners. Membership activates post-consultation where clinically appropriate. Pricing subject to change — confirm at time of booking.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MembershipPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AdvantageStrip />
        <SavingsBreakdown />
        <WhatsIncluded />
        <FourMonthCycle />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  )
}
