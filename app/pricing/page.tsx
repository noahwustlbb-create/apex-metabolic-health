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
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
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
          <span style={{ color: '#4890f7' }}>Nothing forced.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
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
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
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
    price: 'From $99',
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
        background: 'var(--bg)',
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

        <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
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
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{step.priceNote}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-5">
        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>{step.body}</p>
        <ul className="flex flex-col gap-2 flex-1">
          {step.includes.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke={accent} strokeWidth="1" fill={accentBg} />
                <path d="M5 8l2 2 4-4" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        {step.note && (
          <p className="text-[11px] leading-relaxed mt-4 pt-4" style={{ color: 'var(--text-primary)', borderTop: '1px solid rgba(72,144,247,0.08)' }}>
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Pricing steps">
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
            <span style={{ color: '#4890f7' }}>That&apos;s it.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--text-primary)' }}>
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

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Choose your path">
      <div className="warm-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">

        {/* Section heading */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-5">
            Choose Your Path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
          >
            Ongoing system vs.{' '}
            <span style={{ color: '#4890f7' }}>script only.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm leading-relaxed mx-auto"
            style={{ color: 'var(--text-primary)', maxWidth: '520px' }}
          >
            After your consultation, two paths are available. One is a complete clinical program. The other is a prescription only.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">

          {/* Left — Apex Membership (Recommended) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25, ease }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ border: `1.5px solid ${accent}`, boxShadow: '0 12px 48px rgba(72,144,247,0.14)' }}
          >
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #2563eb, ${accent}, #6ba8ff)` }} />
            <div className="p-7 flex flex-col flex-1">

              {/* Badge */}
              <div className="mb-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
                  style={{ background: accent, color: '#ffffff' }}>
                  RECOMMENDED
                </span>
              </div>

              {/* Title + price */}
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                Apex Membership
              </h3>
              <div className="flex items-baseline gap-2.5 mb-1">
                <span className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '56px', lineHeight: 1, color: 'var(--text-primary)' }}>$99</span>
                <span className="text-base" style={{ color: 'rgba(var(--text-primary-rgb),0.4)' }}>/month</span>
              </div>
              <p className="text-[13px] font-medium mb-5" style={{ color: accent }}>
                Doctor-led care, tracked and refined over time
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-7 pb-6" style={{ color: 'rgba(var(--text-primary-rgb),0.6)', borderBottom: '1px solid rgba(72,144,247,0.1)', fontStyle: 'italic' }}>
                Your protocol isn&apos;t static. It evolves with your biology, guided by a clinical team that monitors your data, adjusts your treatment, and stays ahead of the curve — every step of the way.
              </p>

              {/* What's included label */}
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(var(--text-primary-rgb),0.35)' }}>
                What&apos;s included
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {[
                  { text: 'Zero medication mark-ups — medications dispensed at cost price through our partner pharmacy' },
                  { text: 'Doctor oversight and protocol refinement across every review cycle' },
                  { text: 'Blood work heavily discounted every cycle with biomarker trends tracked over time' },
                  { text: 'Prescribing fee waived — scripts issued and sent to you at no extra cost' },
                  { text: 'Discounted doctor review consultations' },
                  { text: 'Nursing team support with follow-ups every 6–8 weeks' },
                  { text: 'Priority clinical support between reviews' },
                  { text: 'Free referrals, medical certificates, and health summaries' },
                  { text: 'Nutrition and lifestyle clinically calibrated to your protocol' },
                  { text: 'VIP admin support 9am–4pm weekdays' },
                  { text: 'Apex App — full protocol visibility and tracking', soon: true },
                  { text: 'Medication dispensed discreetly and safely via TGA-compliant partner pharmacies' },
                ].map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg viewBox="0 0 16 16" fill="none" className="flex-shrink-0" style={{ width: 16, height: 16, marginTop: '2px' }} aria-hidden="true">
                      <circle cx="8" cy="8" r="7" fill={`rgba(72,144,247,0.1)`} stroke={accent} strokeWidth="1" />
                      <path d="M5 8l2 2 4-4" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {item.text}
                      {item.soon && (
                        <span className="ml-2 text-[9px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(72,144,247,0.08)', color: accent, border: '1px solid rgba(72,144,247,0.2)', verticalAlign: 'middle' }}>
                          Soon
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/intake/pre-screen"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-center text-[13px] font-bold tracking-[0.06em] uppercase transition-all duration-200"
                style={{ background: accent, color: '#ffffff' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(72,144,247,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.boxShadow = 'none' }}
              >
                Start Your Clinical Assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="text-[11px] text-center mt-3 leading-relaxed" style={{ color: 'rgba(var(--text-primary-rgb),0.38)' }}>
                No lock-in contracts. Activates after your initial consultation,<br />where treatment is clinically appropriate.
              </p>
            </div>
          </motion.div>

          {/* Right — Single Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35, ease }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(var(--text-primary-rgb),0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div className="p-7">

              {/* Title */}
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                Single Consultation
              </h3>

              {/* Consultation prices */}
              <p className="text-sm mb-1" style={{ color: 'rgba(var(--text-primary-rgb),0.5)' }}>$275 Hormone and Performance Health Consultation</p>
              <p className="text-sm mb-4" style={{ color: 'rgba(var(--text-primary-rgb),0.5)' }}>$125 Longevity, Weight loss, Recovery Consultation</p>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(var(--text-primary-rgb),0.5)' }}>
                Non-members enjoy the same quality medical consultation and treatment options, but without full membership benefits.
              </p>

              {/* Pathway 1 */}
              <div className="mb-7">
                <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Pathway Option 1: Order Through Our Partner Pharmacies
                </h4>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(var(--text-primary-rgb),0.25)', marginTop: '7px' }} />
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>You pay the PHARMACY price for all medications.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(var(--text-primary-rgb),0.25)', marginTop: '7px' }} />
                    <div>
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        Medication invoices include a clinic Administration, Handling and Infrastructure fee starting from <strong>$50</strong>, which covers:
                      </span>
                      <ul className="mt-2 flex flex-col gap-1">
                        <li className="text-sm" style={{ color: 'rgba(var(--text-primary-rgb),0.55)' }}>— Ongoing file management.</li>
                        <li className="text-sm" style={{ color: 'rgba(var(--text-primary-rgb),0.55)' }}>— Treatment guidance.</li>
                        <li className="text-sm" style={{ color: 'rgba(var(--text-primary-rgb),0.55)' }}>— Medication safety checks.</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Pathway 2 */}
              <div className="mb-7">
                <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  Pathway Option 2: Choose Your Own Pharmacy
                </h4>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(var(--text-primary-rgb),0.5)' }}>
                  If a prescription is issued, our team will send this out to you including your treatment plan, dosing guides and scripts.
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    'Prescribing Fee: $125.',
                    'On-going Support.',
                    'Access to our nursing team for dosing advice and support.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(var(--text-primary-rgb),0.25)', marginTop: '7px' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href="/intake/pre-screen"
                className="block w-full py-3.5 rounded-xl text-center text-sm font-bold tracking-[0.08em] uppercase transition-all duration-200"
                style={{ background: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid rgba(var(--text-primary-rgb),0.1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e5e9f0' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f1f5fb' }}
              >
                Order Now
              </Link>

              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(var(--text-primary-rgb),0.07)' }}>
                <p className="text-[11px] text-center" style={{ color: 'rgba(var(--text-primary-rgb),0.35)' }}>
                  (Note: Script release excludes NSW patients due to state regulations.)
                </p>
              </div>
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="What's not included">
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
            className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-primary)' }}>
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
                  <span className="text-sm font-semibold mr-2" style={{ color: 'var(--text-primary)' }}>{item.label}.</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{item.detail}</span>
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
