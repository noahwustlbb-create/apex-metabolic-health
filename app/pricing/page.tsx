'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

// ─── Hero ─────────────────────────────────────────────────────────────────────

function PricingHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Pricing hero"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-5">
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}
        >
          Simple. Transparent.
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Nothing forced.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          style={{ color: '#6b7a8d', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Three components. Published upfront. No discovery calls to unlock a price.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {['No hidden fees', 'No lock-in contracts', 'AHPRA-registered doctors'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Three Components ─────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    label: 'Foundation',
    title: 'Blood Panels',
    price: 'From $73.66',
    priceNote: 'program-specific pathology',
    body: 'Panel selection depends on your clinical pathway. Some programs require a comprehensive baseline — others require minimal or no testing.',
    includes: [
      'Doctor-issued referral — no GP required',
      'Collected at any accredited pathology centre',
      'Results reviewed by your Apex doctor',
      'Ongoing monitoring included in membership',
    ],
    note: 'Panel pricing confirmed after assessment. Have recent bloods? Submit them — we\'ll review suitability.',
    featured: false,
  },
  {
    number: '02',
    label: 'Clinical Review',
    title: 'Doctor Consultation',
    priceBlock: [
      { price: '$275', note: 'Hormone program consultation' },
      { price: '$125', note: 'General and non-hormonal programs' },
    ],
    body: 'A full telehealth consultation — not a quick prescription call. Your doctor reviews your results, takes a clinical history, and builds your personalised protocol.',
    includes: [
      'Full pathology review and interpretation',
      'Personalised clinical protocol',
      'Prescribing where clinically appropriate',
      'Clear next steps before you hang up',
    ],
    note: null,
    featured: false,
  },
  {
    number: '03',
    label: 'Ongoing Protocol',
    title: 'Apex Membership',
    price: '$99',
    priceNote: '/month',
    body: 'Built for ongoing oversight, better data, and a more complete standard of care over time.',
    includes: [
      'Continuous doctor-led optimisation',
      'Discounted review consultations',
      'Follow-up blood work included in care',
      'Protocol adjustments based on results',
      'Priority clinical support between reviews',
    ],
    note: 'Script release available at $145 one-off — prescription released to you, fill at any pharmacy, no ongoing membership.',
    featured: true,
  },
]

function StepCard({ step, i, inView }: { step: typeof STEPS[0]; i: number; inView: boolean }) {
  const accent = '#4890f7'
  const accentBg = 'rgba(72,144,247,0.06)'
  const accentBorder = 'rgba(72,144,247,0.2)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: step.featured ? '#0d1520' : '#0a0e14',
        border: step.featured ? '1px solid rgba(72,144,247,0.22)' : '1px solid rgba(148,163,184,0.09)',
        boxShadow: step.featured ? '0 0 40px rgba(72,144,247,0.06)' : 'none',
      }}
    >
      {step.featured && (
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #4890f7, #6ba8ff 60%, transparent)' }} />
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
          >
            <span className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>{step.number}</span>
          </div>
          <div className="flex items-center gap-2">
            {step.featured && (
              <span className="text-[8px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm"
                style={{ color: accent, background: accentBg, border: `1px solid ${accentBorder}` }}>
                Recommended
              </span>
            )}
            <span className="text-[8px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm"
              style={{ color: accent, background: accentBg, border: `1px solid ${accentBorder}` }}>
              {step.label}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
          {step.title}
        </h3>

        {/* Price block */}
        {'priceBlock' in step && step.priceBlock ? (
          <div className="flex flex-col gap-1.5">
            {step.priceBlock.map((p, j) => (
              <div key={j} className="flex items-baseline gap-2">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: j === 0 ? '26px' : '20px', color: j === 0 ? accent : '#8899aa', lineHeight: 1 }}
                >
                  {p.price}
                </span>
                <span className="text-xs" style={{ color: j === 0 ? '#5a6a7a' : '#3a4a5a' }}>{p.note}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>{step.price}</span>
            <span className="text-sm" style={{ color: '#5a6a7a' }}>{step.priceNote}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-5">
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#6b7a8d' }}>{step.body}</p>
        <ul className="flex flex-col gap-2 flex-1">
          {step.includes.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: accent, opacity: 0.6 }} />
              {item}
            </li>
          ))}
        </ul>
        {step.note && (
          <p className="text-[11px] leading-relaxed mt-4 pt-4" style={{ color: '#3a4a5a', borderTop: '1px solid rgba(148,163,184,0.07)' }}>
            {step.note}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function PricingSteps() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Pricing steps">
      <div className="glow-rule" aria-hidden="true" />
      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-12">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="label mb-4">
            What you pay
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '0.75rem' }}
          >
            Three components. That&apos;s it.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-lg" style={{ color: '#8899aa' }}>
            Blood panel. Consultation. Ongoing membership if you want it. Nothing bundled to obscure what you&apos;re paying for.
          </motion.p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} step={step} i={i} inView={cardsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Membership vs Script Release ─────────────────────────────────────────────

function MembershipComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const OPTIONS = [
    {
      title: 'Apex Membership',
      price: '$99/month',
      tag: 'Recommended',
      featured: true,
      bullets: [
        'Continuous doctor-led optimisation',
        'Discounted review consultations',
        'Blood work included in ongoing care',
        'Biomarker tracking over time',
        'Protocol adjustments based on results',
        'Priority clinical support between reviews',
      ],
    },
    {
      title: 'Script Release',
      price: '$145 one-off',
      tag: null,
      featured: false,
      bullets: [
        'Prescription released directly to you',
        'Fill at any pharmacy of your choice',
        'No ongoing oversight or reviews',
        'No membership benefits',
      ],
    },
  ]

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Ongoing pathway options">
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: heading + context */}
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
              After your consultation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Membership or script release.
              <br />
              <span style={{ color: '#6b7a8d', fontWeight: 400, fontSize: '0.7em' }}>Your choice.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-sm leading-relaxed"
              style={{ color: '#6b7a8d', maxWidth: '400px' }}
            >
              After your initial consultation, you choose your ongoing pathway. Membership is the more complete standard of care. Script release is there if you prefer to manage independently.
            </motion.p>
          </div>

          {/* Right: comparison cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            {OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease }}
                className="flex-1 rounded-xl p-5"
                style={{
                  background: opt.featured ? '#0d1520' : '#0a0e14',
                  border: opt.featured ? '1px solid rgba(72,144,247,0.2)' : '1px solid rgba(148,163,184,0.08)',
                  boxShadow: opt.featured ? '0 0 24px rgba(72,144,247,0.05)' : 'none',
                }}
              >
                {opt.tag && (
                  <span className="inline-block text-[8px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm mb-2.5"
                    style={{ color: '#4890f7', background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.2)' }}>
                    {opt.tag}
                  </span>
                )}
                <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: opt.featured ? '#f0f4f8' : '#8899aa' }}>
                  {opt.title}
                </p>
                <p className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', color: opt.featured ? '#4890f7' : '#4a5a6a' }}>
                  {opt.price}
                </p>
                <ul className="flex flex-col gap-2">
                  {opt.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: opt.featured ? '#5a6a7a' : '#3a4a5a' }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: opt.featured ? '#4890f7' : 'rgba(255,255,255,0.12)', opacity: opt.featured ? 0.7 : 1 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── What's NOT Included ──────────────────────────────────────────────────────

const NOT_INCLUDED = [
  {
    label: 'Discovery call fees',
    detail: 'No discovery call. Complete the assessment — your doctor contacts you directly.',
  },
  {
    label: 'Surprise admin charges',
    detail: 'Clinical support is part of membership. No bolt-ons.',
  },
  {
    label: 'Lock-in contracts',
    detail: 'No lock-in. 4-monthly reviews are clinical, not commercial.',
  },
  {
    label: 'Bundled packages',
    detail: 'No bundles. You pay for what your protocol requires — nothing else.',
  },
  {
    label: 'Outcome guarantees',
    detail: 'No clinic can guarantee outcomes. We won\'t. What we guarantee is clinical rigour.',
  },
]

function NotIncluded() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="What's not included">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="label mb-4">
            Transparency
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '0.75rem' }}
          >
            What&apos;s NOT included.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm leading-relaxed mb-10" style={{ color: '#6b7a8d' }}>
            Most clinics hide fees until you&apos;re committed. We&apos;d rather tell you what you won&apos;t be paying for.
          </motion.p>

          <div className="flex flex-col" style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}>
            {NOT_INCLUDED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease }}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: '1px solid rgba(148,163,184,0.06)' }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.15)' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(255,100,100,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold mr-2" style={{ color: '#c8d4e0' }}>{item.label}.</span>
                  <span className="text-sm leading-relaxed" style={{ color: '#5a6a7a' }}>{item.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function PricingCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Get started">
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.06) 0%, transparent 55%)' }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#f0f4f8', marginBottom: '1rem' }}>
          Know the cost.
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Start when you&apos;re ready.
          </span>
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }} className="flex flex-col items-center gap-3">
          <Link href="/intake/pre-screen" className="btn-teal">
            Start your clinical assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className="text-xs" style={{ color: '#3a4a5a' }}>Takes 60 seconds. No commitment.</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto" style={{ color: '#2e3d4d' }}>
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate. Pricing subject to change — confirm at time of booking.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingHero />
        <PricingSteps />
        <MembershipComparison />
        <NotIncluded />
        <PricingCTA />
      </main>
      <Footer />
    </>
  )
}
