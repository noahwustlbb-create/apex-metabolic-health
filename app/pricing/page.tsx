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
      style={{ backgroundColor: '#ffffff', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Pricing hero"
    >
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.08) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-5">
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="display-serif mb-5"
          style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', maxWidth: '780px' }}
        >
          Simple. Transparent.{' '}
          <span style={{ color: 'rgba(10,14,26,0.2)' }}>Nothing forced.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          style={{ color: '#0a0e1a', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
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
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#0a0e1a' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#4890f7' }} />
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
    note: 'Script release available at $125 one-off — prescription released to you, fill at any pharmacy, no ongoing membership.',
    featured: true,
  },
]

function StepCard({ step, i, inView }: { step: typeof STEPS[0]; i: number; inView: boolean }) {
  const accent = '#4890f7'
  const accentBg = 'rgba(72,144,247,0.06)'
  const accentBorder = 'rgba(72,144,247,0.18)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: '#ffffff',
        border: step.featured ? '1px solid rgba(72,144,247,0.25)' : '1px solid rgba(72,144,247,0.1)',
        boxShadow: step.featured ? '0 8px 40px rgba(72,144,247,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
      }}
    >
      {step.featured && (
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #4890f7, #6ba8ff 60%, transparent)' }} />
      )}

      {/* Header */}
      <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(72,144,247,0.07)' }}>
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

        <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>
          {step.title}
        </h3>

        {/* Price block */}
        {'priceBlock' in step && step.priceBlock ? (
          <div className="flex flex-col gap-1.5">
            {step.priceBlock.map((p, j) => (
              <div key={j} className="flex items-baseline gap-2">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: j === 0 ? '26px' : '20px', color: j === 0 ? accent : '#0a0e1a', lineHeight: 1 }}
                >
                  {p.price}
                </span>
                <span className="text-xs" style={{ color: j === 0 ? '#4890f7' : '#9ab0c8' }}>{p.note}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>{step.price}</span>
            <span className="text-sm" style={{ color: '#0a0e1a' }}>{step.priceNote}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-5">
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#0a0e1a' }}>{step.body}</p>
        <ul className="flex flex-col gap-2 flex-1">
          {step.includes.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#0a0e1a' }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke={accent} strokeWidth="1" fill={accentBg} />
                <path d="M5 8l2 2 4-4" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        {step.note && (
          <p className="text-[11px] leading-relaxed mt-4 pt-4" style={{ color: '#0a0e1a', borderTop: '1px solid rgba(72,144,247,0.08)' }}>
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#f8f9ff' }} aria-label="Pricing steps">
      <div className="warm-rule" aria-hidden="true" />
      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-12">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="label mb-4">
            What you pay
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-serif mb-3"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}
          >
            Three components.{' '}
            <span style={{ color: 'rgba(10,14,26,0.2)' }}>That&apos;s it.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-lg" style={{ color: '#0a0e1a' }}>
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

// ─── Membership vs Single Consultation ───────────────────────────────────────

function MembershipComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const accent = '#4890f7'
  const accentBg = 'rgba(72,144,247,0.06)'
  const accentBorder = 'rgba(72,144,247,0.18)'

  const memberBullets = [
    'Continuous doctor-led optimisation',
    'Discounted review consultations',
    'Blood work included in ongoing care',
    'Biomarker tracking over time',
    'Protocol adjustments based on results',
    'Priority clinical support between reviews',
  ]

  const adminFeeDetails = [
    'Ongoing file and protocol management',
    'Treatment guidance and clinical support',
    'Medication safety checks and dispensing oversight',
  ]

  const pathway2Bullets = [
    'Script and treatment plan released directly to you',
    'Fill at any pharmacy of your choice',
    'Ongoing support from your Apex care team',
    'Access to our nursing team for dosing advice and guidance',
  ]

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#ffffff' }} aria-label="Ongoing pathway options">
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            After your consultation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif mb-4"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            Two pathways.{' '}
            <span style={{ color: 'rgba(72,144,247,0.4)' }}>Your choice.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm leading-relaxed"
            style={{ color: '#0a0e1a', maxWidth: '560px' }}
          >
            A patient reading this page should know exactly what they're paying for. Three possible costs: your consultation fee, your pharmacy pathway fee, and medication. Nothing else.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Apex Clinical Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25, ease }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(72,144,247,0.25)',
              boxShadow: '0 8px 40px rgba(72,144,247,0.08)',
            }}
          >
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #4890f7, #6ba8ff 60%, transparent)' }} />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[8px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm"
                  style={{ color: accent, background: accentBg, border: `1px solid ${accentBorder}` }}>
                  Recommended
                </span>
              </div>
              <p className="text-base font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>
                Apex Clinical Program
              </p>
              <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>
                $99<span className="text-sm font-medium" style={{ color: '#0a0e1a' }}>/month</span>
              </p>
              <p className="text-xs mb-5" style={{ color: accent }}>
                Medications at cost price — zero mark-up
              </p>
              <ul className="flex flex-col gap-2.5">
                {memberBullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-xs leading-relaxed" style={{ color: '#0a0e1a' }}>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="8" cy="8" r="6.5" stroke={accent} strokeWidth="1" fill={accentBg} />
                      <path d="M5 8l2 2 4-4" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Single Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35, ease }}
            className="rounded-2xl"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(72,144,247,0.12)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div className="p-6" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
              <p className="text-base font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>
                Single Consultation
              </p>
              <p className="text-xs mb-4" style={{ color: '#0a0e1a' }}>
                One-time consultation. Script issued where clinically appropriate.
              </p>

              {/* Consultation fee block */}
              <div className="rounded-lg px-4 py-3" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-2" style={{ color: accent }}>
                  Consultation Fee
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>$275</span>
                    <span className="text-xs" style={{ color: '#0a0e1a' }}>Hormone Optimisation & TRT</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>$125</span>
                    <span className="text-xs" style={{ color: '#0a0e1a' }}>Weight Loss, Longevity & General Programs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pathway 1 */}
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: accent }}>
                Pathway 1 — Partner Pharmacy
              </p>
              <p className="text-xs mb-2.5" style={{ color: '#0a0e1a' }}>
                Medication fulfilled through our TGA-compliant compounding pharmacy partner. An administration fee applies — this covers:
              </p>
              <ul className="flex flex-col gap-1.5">
                {adminFeeDetails.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#0a0e1a' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: accent }} />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] mt-2.5" style={{ color: accent }}>
                Administration fee confirmed by our team before dispensing.
              </p>
            </div>

            {/* Pathway 2 */}
            <div className="px-6 py-5">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: accent }}>
                Pathway 2 — Own Pharmacy
              </p>

              {/* Prescribing Fee — visually prominent */}
              <div className="flex items-center justify-between mb-3 rounded-lg px-3 py-2.5"
                style={{ background: '#f8f9ff', border: `1.5px solid ${accent}` }}>
                <span className="text-xs font-bold" style={{ color: '#0a0e1a' }}>Prescribing Fee</span>
                <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: accent }}>$125</span>
              </div>

              <ul className="flex flex-col gap-1.5">
                {pathway2Bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#0a0e1a' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'rgba(72,144,247,0.35)' }} />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="text-[10px] leading-relaxed mt-4 px-3 py-2 rounded-sm"
                style={{ color: '#b45309', background: 'rgba(240,168,74,0.08)', border: '1px solid rgba(240,168,74,0.2)' }}>
                ⚠ NSW patients: Script release (Pathway 2) is not available under NSW Poisons and Therapeutic Goods Regulation 2008 for certain Schedule 4 medications prescribed via telehealth. Pathway 1 remains available.
              </p>
            </div>
          </motion.div>

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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#f8f9ff' }} aria-label="What's not included">
      <div className="warm-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="label mb-4">
            Transparency
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-serif mb-3"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            What&apos;s NOT included.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm leading-relaxed mb-10" style={{ color: '#0a0e1a' }}>
            Most clinics hide fees until you&apos;re committed. We&apos;d rather tell you what you won&apos;t be paying for.
          </motion.p>

          <div className="flex flex-col" style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}>
            {NOT_INCLUDED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease }}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: '1px solid rgba(72,144,247,0.07)' }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.2)' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(220,50,50,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold mr-2" style={{ color: '#0a0e1a' }}>{item.label}.</span>
                  <span className="text-sm leading-relaxed" style={{ color: '#0a0e1a' }}>{item.detail}</span>
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
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4890f7 55%, #6ba8ff 100%)' }}
      aria-label="Get started"
    >
      <div className="absolute inset-0 dot-grid opacity-30" style={{ filter: 'invert(1)' }} aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '1rem' }}>
          Know the cost.{' '}
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>Start when you&apos;re ready.</span>
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }} className="flex flex-col items-center gap-3">
          <Link href="/intake/pre-screen" className="btn-white" style={{ fontSize: '14px', padding: '16px 32px' }}>
            Start your clinical assessment
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Takes 60 seconds. No commitment.</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
