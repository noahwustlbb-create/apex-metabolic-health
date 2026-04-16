'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    tag: 'BLOOD PANEL',
    tagColor: '#4890f7',
    title: 'Baseline Blood Panel',
    price: '$99',
    priceLabel: 'one-off',
    priceColor: '#f0f4f8',
    description: 'Doctor-ordered pathology referral. Collect at any accredited centre near you — no GP required.',
    includes: [
      '60+ biomarkers including Biological Age',
      'Doctor-issued referral, no GP needed',
      'Results sent directly to you',
      'Access to the Apex app & dashboard',
    ],
    note: 'To have results reviewed and a protocol built, book a consultation separately.',
    cta: 'Get my baseline — $99',
    href: '/intake/bloods-hormone',
    featured: false,
  },
  {
    tag: 'ONGOING',
    tagColor: '#4890f7',
    title: 'Apex Membership',
    price: '$99',
    priceLabel: '/month',
    priceColor: '#4890f7',
    description: 'Ongoing clinical oversight with regular bloods, protocol refinement, and Biological Age tracked over time.',
    includes: [
      'Blood draws every 7–8 weeks',
      'Continuous doctor oversight',
      'Protocol adjustments as you respond',
      'Biological Age tracked over time',
      'Medication management & safety reviews',
      'Priority support between consultations',
    ],
    cta: 'Learn about membership',
    href: '/membership',
    featured: true,
    badge: 'RECOMMENDED',
  },
  {
    tag: 'CONSULTATION',
    tagColor: '#4890f7',
    title: 'Hormone Consultation',
    price: null,
    priceLabel: null,
    priceColor: '#f0f4f8',
    description: 'A one-on-one telehealth consultation focused on your hormone health. Doctor reviews your results and builds your protocol.',
    includes: [
      'Telehealth with an AHPRA-registered doctor',
      'Full hormone panel review',
      'Personalised treatment protocol',
      'Prescription management where indicated',
    ],
    cta: 'Book hormone consult',
    href: '/intake/hormone',
    featured: false,
  },
  {
    tag: 'CONSULTATION',
    tagColor: '#4890f7',
    title: 'General Health Consult',
    price: null,
    priceLabel: null,
    priceColor: '#f0f4f8',
    description: 'A comprehensive general telehealth consultation. Broad clinical review across metabolic, hormonal, and lifestyle health.',
    includes: [
      'Telehealth with an AHPRA-registered doctor',
      'Metabolic & general health review',
      'Lifestyle and nutrition guidance',
      'Referrals and further testing if needed',
    ],
    cta: 'Book general consult',
    href: '/intake/general',
    featured: false,
  },
]

const TRUST_SIGNALS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
        <path d="M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11l-4 2.5 1.5-4.5L4 6.5h4.5L10 2z" stroke="#4890f7" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(72,144,247,0.08)" />
      </svg>
    ),
    text: 'AHPRA-registered doctors',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="#4890f7" strokeWidth="1.2" fill="rgba(72,144,247,0.08)" />
        <path d="M7 10l2 2 4-4" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'NATA-accredited labs',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="#4890f7" strokeWidth="1.2" fill="rgba(72,144,247,0.08)" />
        <path d="M10 6v4l2.5 2" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    text: '4,000+ collection centres nationally',
  },
]

export default function BaselinePricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="baseline-pricing"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Pricing and membership"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label mb-5"
          >
            PRICING
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: 1.08 }}
          >
            Start with your baseline —{' '}
            <span className="text-teal-gradient">$99</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg leading-relaxed"
            style={{ color: '#8899aa' }}
          >
            One blood test. A full picture of where you stand.
          </motion.p>
        </div>

        {/* Cards — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col p-7 rounded-sm"
              style={{
                background: card.featured
                  ? 'linear-gradient(145deg, rgba(72,144,247,0.07) 0%, rgba(72,144,247,0.02) 100%)'
                  : 'rgba(13,17,23,1)',
                border: card.featured
                  ? '1px solid rgba(72,144,247,0.28)'
                  : '1px solid rgba(30,45,61,1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {card.badge && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-[9px] font-bold tracking-[0.18em] uppercase"
                  style={{
                    background: 'rgba(72,144,247,0.15)',
                    borderLeft: '1px solid rgba(72,144,247,0.3)',
                    borderBottom: '1px solid rgba(72,144,247,0.3)',
                    color: '#4890f7',
                    borderBottomLeftRadius: 6,
                  }}
                >
                  {card.badge}
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5" style={{ color: card.tagColor }}>
                    {card.tag}
                  </p>
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
                    {card.title}
                  </h3>
                </div>
                {card.price && (
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: card.priceColor }}>{card.price}</p>
                    <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: '#4a5a6a' }}>{card.priceLabel}</p>
                  </div>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8899aa' }}>{card.description}</p>

              <ul className="space-y-2.5 flex-1 mb-5">
                {card.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke={card.featured ? '#4890f7' : '#4890f7'} strokeWidth="1.2" fill={card.featured ? 'rgba(72,144,247,0.08)' : 'rgba(72,144,247,0.07)'} />
                      <path d="M5 8l2 2 4-4" stroke={card.featured ? '#4890f7' : '#4890f7'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Note (e.g. for blood panel) */}
              {'note' in card && card.note && (
                <p className="text-xs leading-relaxed mb-5 px-3 py-2.5 rounded-sm" style={{ color: '#5a6a7a', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  ⓘ {card.note}
                </p>
              )}

              <a
                href={card.href}
                className="w-full text-center inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200"
                style={card.featured
                  ? { background: '#4890f7', color: '#070a0d', border: '1px solid #4890f7' }
                  : { background: 'rgba(72,144,247,0.08)', color: '#4890f7', border: '1px solid rgba(72,144,247,0.25)' }
                }
              >
                {card.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.text} className="flex items-center gap-2">
              {signal.icon}
              <span className="text-xs font-medium" style={{ color: '#6b7a8d' }}>{signal.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
