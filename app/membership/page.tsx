'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { AppPhoneMockup } from '@/components/AppFeature'

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    number: '01',
    title: 'Continuous Doctor-Led Optimisation',
    body: 'Your care is not static. Our doctors continuously assess how your body is responding to treatment, making precise adjustments to your protocol based on clinical insight, biomarkers, and real-world outcomes.',
    callout: 'Your treatment evolves with you — not against you.',
    bullets: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Structured 4-Month Clinical Review Cycles',
    body: 'Every 4 months, your care is reviewed at a deeper level. These structured cycles allow for meaningful, data-driven progress over time — not guesswork.',
    callout: null,
    bullets: ['Comprehensive blood work', 'Full biomarker analysis', 'Protocol reassessment and refinement'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Comprehensive Biomarker Analysis & Tracking',
    body: "We don't just look at results — we track trends. Your biomarkers are analysed in clinical context, creating clarity around what's actually happening beneath the surface.",
    callout: null,
    bullets: ['Identify underlying drivers', 'Monitor response to treatment', 'Establish personalised target ranges'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Follow-Up Blood Work Included',
    body: 'Follow-up blood testing is included as part of your ongoing care. No unnecessary gaps. No blind adjustments.',
    callout: null,
    bullets: ['Objective measurement of progress', 'Safe and effective protocol adjustments', 'Continuous feedback on how your body is responding'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 3l-1 6H5l3 8a3 3 0 006 0l3-8h-2L14 3H8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Clinically Guided Nutrition & Lifestyle Strategy',
    body: 'Your nutrition and lifestyle are aligned with your biology. This is not generic advice — it\'s tailored to support performance, recovery, and long-term outcomes.',
    callout: null,
    bullets: ['Guided by your biomarkers', 'Aligned to your treatment goals', 'Calibrated to your metabolic and hormonal function'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Medication Management & Safety Oversight',
    body: 'All treatment is managed under clinical supervision. You PAY the pharmacy price for all medications — your membership covers the clinical infrastructure around it.',
    callout: 'Ensuring treatment remains appropriate, effective, and aligned with your needs.',
    bullets: ['Medication coordination through TGA-compliant pharmacy partners', 'Ongoing safety monitoring', 'Protocol adjustments where required'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Priority Clinical Support',
    body: "You have access to a dedicated clinical support team throughout your membership. You're not left to navigate this alone.",
    callout: null,
    bullets: ['Timely responses to questions or concerns', 'Ongoing coordination of your care', 'Support throughout your treatment journey'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6.5 4h11a2 2 0 012 2v8a2 2 0 01-2 2H13l-4 4v-4H6.5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '08',
    title: 'Apex App — Protocol in Your Pocket',
    body: 'Members receive access to the Apex App at launch — biomarker history, protocol visibility, and clinical team access in one place.',
    callout: 'In development — included with all active memberships at launch.',
    bullets: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
]

// ─── Feature Card ──────────────────────────────────────────────────────────────

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card p-8 flex flex-col gap-5"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)', color: '#4890f7' }}
        >
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1"
            style={{ color: '#4a5a6a' }}
          >
            {feature.number}
          </span>
          <h3
            className="text-base font-bold leading-snug"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            {feature.title}
          </h3>
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
        {feature.body}
      </p>

      {feature.bullets && (
        <ul className="space-y-2">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#4890f7" strokeWidth="1.2" fill="rgba(72,144,247,0.07)" />
                <path d="M5 8l2.5 2.5 4-4" stroke="#4890f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {feature.callout && (
        <p
          className="text-xs leading-relaxed italic border-l-2 pl-4"
          style={{ color: '#4a5a6a', borderColor: 'rgba(72,144,247,0.3)' }}
        >
          {feature.callout}
        </p>
      )}
    </motion.div>
  )
}

// ─── App Section ──────────────────────────────────────────────────────────────

function AppSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Apex App"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Phone — left */}
          <div className="flex justify-center lg:justify-start">
            <AppPhoneMockup inView={inView} delay={0.1} />
          </div>

          {/* Text — right */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Apex App
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(24px, 2.8vw, 40px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#f0f4f8',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Membership gives you{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                visibility.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="text-base leading-relaxed mb-8"
              style={{ color: '#6b7a8d', maxWidth: '440px' }}
            >
              Most clinics manage your treatment. We give you a window into it. The Apex App puts your biomarker history, protocol, and clinical progress in your hands — between consultations, not just at them.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.28, ease }}
              className="flex flex-col gap-4 mb-9"
            >
              {[
                { label: 'Biomarker trends over time', sub: 'Not just the last result — the full picture across every draw.' },
                { label: 'Protocol & dosing visibility', sub: 'See your active protocol, schedule, and doctor notes at any time.' },
                { label: 'Biological age tracking', sub: 'A running measure of how your body responds to treatment.' },
                { label: 'Clinical team access', sub: 'Message your care team directly without leaving the app.' },
              ].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.32 + i * 0.07, ease }}
                  className="flex items-start gap-3.5"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: '#4890f7', opacity: 0.7 }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
                      {item.sub}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.62, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              style={{
                background: 'rgba(72,144,247,0.06)',
                border: '1px solid rgba(72,144,247,0.15)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4890f7', opacity: 0.8 }} />
              <span className="text-xs font-semibold" style={{ color: '#4890f7' }}>
                In development — included with all active memberships at launch
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MembershipPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const pricingRef = useRef(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: '-60px' })

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '90px' }}
          aria-label="Apex Protocol Membership hero"
        >
          <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[800px] h-[600px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.08) 0%, transparent 60%)' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
          />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="label mb-5"
            >
              Apex Protocol
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}
            >
              Ongoing optimisation.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not one-off fixes.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '500px', marginBottom: '2rem' }}
            >
              A structured, doctor-led clinical system that tracks, adjusts, and improves your protocol as your biology responds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
              <div
                className="flex items-baseline gap-1.5 px-5 py-3 rounded-full"
                style={{ background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.2)' }}
              >
                <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>$99</span>
                <span className="text-sm" style={{ color: '#4a5a6a' }}>/month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No lock-in contracts', 'Review every 4 months', 'Australia-wide telehealth'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Pricing + Comparison ── */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
          aria-label="Membership pricing"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }} />

          <div ref={pricingRef} className="container-tight relative z-10">

            <div className="mb-12">
              <p className="label mb-4">CHOOSE YOUR PATH</p>
              <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                Ongoing system vs. script only.
              </h2>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: '#8899aa' }}>
                After your consultation, two paths are available. One is a complete clinical program. The other is a prescription only.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start"
            >
              {/* ── Membership — featured ── */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{ background: '#111820', border: '1px solid rgba(72,144,247,0.3)', boxShadow: '0 0 60px rgba(72,144,247,0.06)' }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #4890f7, #4890f7)' }} />

                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded-sm inline-block mb-3"
                        style={{ color: '#4890f7', background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.3)' }}>
                        Recommended
                      </span>
                      <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
                        Apex Membership
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>$99</p>
                      <p className="text-sm" style={{ color: '#4a5a6a' }}>/month</p>
                      <p className="text-[10px] mt-0.5" style={{ color: '#3a4a5a' }}>Doctor-led care, reviewed over time</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7a8d', maxWidth: '520px' }}>
                    Your protocol evolves as your biology responds — not a one-off script, but a living clinical system with ongoing oversight, tracked data, and regular refinement.
                  </p>

                  <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(72,144,247,0.15), transparent)' }} />

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
                    {[
                      { text: 'Doctor oversight across every review cycle', highlight: true },
                      { text: 'Discounted review consultations', highlight: true },
                      { text: 'Blood work included every cycle', highlight: true },
                      { text: 'Biomarker trends tracked over time', highlight: false },
                      { text: 'Protocol refined as your biology responds', highlight: false },
                      { text: 'Priority clinical support between reviews', highlight: false },
                      { text: 'Medication safety & script management', highlight: false },
                      { text: 'Nutrition & lifestyle clinically calibrated', highlight: false },
                      { text: 'Apex App — full protocol visibility & tracking', highlight: false, badge: 'Coming soon' },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" stroke={item.badge ? '#4890f7' : '#4890f7'} strokeWidth="1.2" fill={item.badge ? 'rgba(72,144,247,0.07)' : 'rgba(72,144,247,0.07)'} />
                          <path d="M5 8l2.5 2.5 4-4" stroke={item.badge ? '#4890f7' : '#4890f7'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm leading-relaxed flex items-center flex-wrap gap-2" style={{ color: item.highlight ? '#c8d4e0' : '#8899aa' }}>
                          {item.text}
                          {item.badge && (
                            <span className="text-[8px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0"
                              style={{ color: '#4890f7', background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                              {item.badge}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/intake/pre-screen" className="btn-teal w-full justify-center">
                    Start your clinical assessment
                    <span className="btn-circle" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </Link>

                  <p className="text-xs mt-4 text-center" style={{ color: '#3a4a5a' }}>
                    No lock-in contracts. Activates after your initial consultation, where treatment is clinically appropriate.
                  </p>
                </div>
              </div>

              {/* ── Script Release — secondary ── */}
              <div
                className="rounded-2xl p-7"
                style={{ background: '#0a0e14', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p className="text-[9px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#3a4a5a' }}>
                  Alternative
                </p>
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#6b7a8d' }}>
                  Script Release Only
                </h3>
                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#6b7a8d' }}>$145</span>
                  <span className="text-sm" style={{ color: '#3a4a5a' }}>one-off</span>
                </div>

                <p className="text-xs leading-relaxed mb-5" style={{ color: '#4a5a6a' }}>
                  Prescription issued and released directly to you. No ongoing clinical management, reviews, or biomarker tracking included.
                </p>

                <ul className="flex flex-col gap-2.5 mb-6">
                  {[
                    { text: 'One-off prescription release', included: true },
                    { text: 'Fill at any pharmacy', included: true },
                    { text: 'No ongoing doctor oversight', included: false },
                    { text: 'No review cycles or blood work', included: false },
                    { text: 'No biomarker tracking', included: false },
                    { text: 'No protocol adjustments', included: false },
                    { text: 'No Apex App access', included: false },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-2.5">
                      {item.included ? (
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
                          <path d="M5 8l2.5 2.5 4-4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" stroke="rgba(255,80,80,0.2)" strokeWidth="1.2" />
                          <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="rgba(255,80,80,0.3)" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className="text-xs leading-relaxed" style={{ color: item.included ? '#4a5a6a' : '#3a4a5a' }}>{item.text}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[10px] leading-relaxed p-3 rounded-lg" style={{ color: '#3a4a5a', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Script release does not include ongoing clinical oversight. Not recommended for patients on active hormonal or metabolic protocols requiring monitoring.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── What's included ── */}
        <section
          className="relative py-16 overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
          aria-label="Membership overview"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="label mb-4">WHAT&apos;S INCLUDED</p>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
                >
                  Everything inside the{' '}
                  <span className="text-teal-gradient">Apex Protocol</span>
                </h2>
              </div>
              <p className="text-sm leading-relaxed max-w-sm md:text-right" style={{ color: '#4a5a6a' }}>
                8 core pillars. One continuous system. Built to deliver results that compound over time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FEATURES.map((feature, i) => (
                <FeatureCard key={feature.number} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── The 4-Month Cycle ── */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#070a0d' }}
          aria-label="4-month review cycle"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <div className="text-center mb-14">
              <p className="label mb-4">THE SYSTEM</p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                How the 4-month cycle works
              </h2>
              <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#8899aa' }}>
                Not a static prescription. A living, evolving protocol that responds to your biology.
              </p>
            </div>
            {/* Desktop: horizontal with connectors */}
            <div className="hidden md:grid grid-cols-4 gap-0 rounded-2xl overflow-hidden relative" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
              {[
                { n: '01', phase: 'Month 1', label: 'Baseline', desc: 'Comprehensive blood work. Full biomarker baseline established. Initial protocol built by your doctor.' },
                { n: '02', phase: 'Month 2', label: 'Optimise', desc: 'Treatment underway. Early response reviewed. Dosing and protocol refined to your feedback.' },
                { n: '03', phase: 'Month 3', label: 'Refine', desc: 'Mid-cycle check-in. Nutrition and lifestyle calibrated. Progress tracked against clinical targets.' },
                { n: '04', phase: 'Month 4', label: 'Review', desc: 'Full clinical review. Follow-up blood work completed. Protocol reassessed. Next cycle begins.' },
              ].map((phase, i) => (
                <div key={phase.phase} className="flex flex-col p-8 relative"
                  style={{ background: i % 2 === 0 ? '#0a0e14' : '#0d1117', borderRight: i < 3 ? '1px solid rgba(148,163,184,0.07)' : 'none' }}>
                  {/* Connector arrow */}
                  {i < 3 && (
                    <div className="absolute top-8 -right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: '#0d1117', border: '1px solid rgba(72,144,247,0.2)' }}>
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                      </svg>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
                      <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>{phase.n}</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: '#3a4a5a' }}>{phase.phase}</span>
                  </div>
                  <span className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c8d4e0' }}>{phase.label}</span>
                  <p className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{phase.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden flex flex-col gap-3">
              {[
                { n: '01', phase: 'Month 1', label: 'Baseline', desc: 'Blood work. Full biomarker baseline. Initial protocol built by your doctor.' },
                { n: '02', phase: 'Month 2', label: 'Optimise', desc: 'Treatment underway. Dosing refined based on early response.' },
                { n: '03', phase: 'Month 3', label: 'Refine', desc: 'Mid-cycle check-in. Nutrition and lifestyle calibrated. Progress tracked.' },
                { n: '04', phase: 'Month 4', label: 'Review', desc: 'Full clinical review. Follow-up blood work. Next cycle begins.' },
              ].map((phase) => (
                <div key={phase.phase} className="flex gap-4 rounded-xl p-5"
                  style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.07)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
                    <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>{phase.n}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-1" style={{ color: '#3a4a5a' }}>{phase.phase}</p>
                    <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c8d4e0' }}>{phase.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Apex App ── */}
        <AppSection />

        {/* ── Closing CTA ── */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#070a0d' }}
          aria-label="Join the membership"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 55%)' }}
          />
          <div className="container-tight relative z-10 text-center">
            <h2
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#f0f4f8', marginBottom: '1rem' }}
            >
              Your biology doesn&apos;t stop.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Neither should your care.
              </span>
            </h2>
            <div className="flex flex-col items-center gap-3 mt-6">
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
              <p className="text-xs" style={{ color: '#3a4a5a' }}>Takes 60 seconds. No commitment.</p>
            </div>
            <p className="text-sm mt-10" style={{ color: '#3a4a5a' }}>
              Next: <Link href="/our-approach" style={{ color: '#4890f7' }} className="hover:underline">see how we approach your care →</Link>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
