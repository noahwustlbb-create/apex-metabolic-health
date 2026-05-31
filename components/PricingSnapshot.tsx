'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const CARDS = [
  {
    number: '01',
    label: 'Foundation',
    title: 'Blood Panels',
    price: 'From $99',
    priceNote: 'program-specific pathology',
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.06)',
    accentBorder: 'rgba(72,144,247,0.15)',
    body: 'The panel depends on your clinical pathway. Some programs require a comprehensive baseline. Others need limited monitoring, or none at all.',
    bullets: [
      'Doctor-issued referral — no GP required',
      'Collected at any accredited pathology centre',
      'Results reviewed directly by your Apex doctor',
    ],
    note: null,
    featured: false,
  },
  {
    number: '02',
    label: 'Clinical Review',
    title: 'Doctor Consultation',
    price: '$275',
    priceNote: 'Hormone Optimisation',
    price2: '$125',
    priceNote2: 'General Health, Weight Loss & Peptide Therapy',
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.06)',
    accentBorder: 'rgba(72,144,247,0.15)',
    body: 'Not a quick prescription call. Your AHPRA-registered doctor reviews your full results, takes a detailed history, and builds a personalised clinical protocol.',
    bullets: [
      'Full pathology review and interpretation',
      'Personalised protocol — not a template',
      'Prescribing where clinically appropriate',
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
    price2: null,
    priceNote2: null,
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.06)',
    accentBorder: 'rgba(72,144,247,0.2)',
    body: 'Not a one-off prescription pathway. Built for ongoing oversight, clearer data, and a more complete standard of care.',
    bullets: [
      'Continuous doctor-led optimisation',
      'Discounted review consultations',
      'Follow-up blood work included in ongoing care',
      'Biomarker tracking over time',
      'Protocol adjustments based on results',
      'Priority clinical support between reviews',
    ],
    note: 'Script release available: $125 one-off. Prescription released to you — fill at any pharmacy. No ongoing membership.',
    featured: true,
  },
]

export default function PricingSnapshot() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  return (
    <section
      id="pricing"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Transparent pricing"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10">

        <div ref={headingRef} className="mb-12 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="label mb-5"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif mb-4"
            style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}
          >
            Three components.{' '}
            <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>
              That&apos;s it.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-base leading-relaxed max-w-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            Bloods. Consultation. Ongoing membership if you want it. Clear pricing — no hidden layers, no bloated packages.
          </motion.p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 28 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'var(--bg)',
                border: card.featured
                  ? '1px solid rgba(72,144,247,0.25)'
                  : '1px solid rgba(72,144,247,0.1)',
                boxShadow: card.featured ? '0 8px 40px rgba(72,144,247,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
              }}
            >
              {card.featured && (
                <div
                  className="h-px w-full"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.6) 40%, rgba(72,144,247,0.25) 70%, transparent 100%)' }}
                />
              )}

              <div
                className="px-6 pt-6 pb-5"
                style={{ borderBottom: '1px solid rgba(72,144,247,0.07)' }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: card.accentBg, border: `1px solid ${card.accentBorder}` }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: card.accent }}
                    >
                      {card.number}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {card.featured && (
                      <span
                        className="text-[8px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm"
                        style={{ color: '#4890f7', background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}
                      >
                        Recommended
                      </span>
                    )}
                    <span
                      className="text-[8px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm"
                      style={{ color: card.accent, background: card.accentBg, border: `1px solid ${card.accentBorder}` }}
                    >
                      {card.label}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                >
                  {card.title}
                </h3>

                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: card.accent }}
                    >
                      {card.price}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-primary)' }}>{card.priceNote}</span>
                  </div>
                  {card.price2 && (
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-lg font-bold"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                      >
                        {card.price2}
                      </span>
                      <span className="text-xs" style={{ color: '#4890f7' }}>{card.priceNote2}</span>
                    </div>
                  )}
                  {card.featured && (
                    <p className="text-[10px] mt-0.5" style={{ color: '#4890f7' }}>
                      Doctor-led care, reviewed over time
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 px-6 py-5">
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
                  {card.body}
                </p>

                <ul className="flex flex-col gap-2 flex-1">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" stroke={card.accent} strokeWidth="1" fill={card.accentBg} />
                        <path d="M5 8l2 2 4-4" stroke={card.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: card.featured && j < 3 ? '#9aacbc' : '#4890f7' }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {card.note && (
                  <p
                    className="text-[10px] leading-relaxed mt-4 pt-4"
                    style={{ color: '#4890f7', borderTop: '1px solid rgba(72,144,247,0.07)' }}
                  >
                    {card.note}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="mt-8 flex items-center justify-between flex-wrap gap-4"
        >
          <p className="text-xs" style={{ color: '#4890f7' }}>
            Membership activates after your initial consultation where treatment is clinically appropriate. No lock-in contracts.
          </p>
          <Link
            href="/pricing"
            className="text-xs font-medium flex items-center gap-1.5 transition-colors"
            style={{ color: '#4890f7' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Full pricing breakdown
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
