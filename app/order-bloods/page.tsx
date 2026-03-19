'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const HORMONE_PANEL = [
  'Free & Total Testosterone',
  'Oestradiol (E2)',
  'SHBG',
  'FSH / LH',
  'Prolactin',
  'Thyroid Function — TSH / FT3 / FT4',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Full Blood Count (FBC)',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c',
  'High Sensitivity CRP',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

const METABOLIC_PANEL = [
  'Full Blood Count (FBC)',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c + Insulin',
  'Iron Studies',
  'Thyroid Function — TSH / FT3 / FT4',
  'High Sensitivity CRP',
  'Vitamin D',
  'Vitamin B12',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

function PanelCard({
  title,
  subtitle,
  items,
  ctaLabel,
  ctaHref,
  icon,
  delay = 0,
}: {
  title: string
  subtitle: string
  items: string[]
  ctaLabel: string
  ctaHref: string
  icon: React.ReactNode
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card p-8 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-7">
        <div
          className="w-11 h-11 flex items-center justify-center rounded-sm flex-shrink-0"
          style={{
            backgroundColor: 'rgba(43,123,224,0.08)',
            border: '1px solid rgba(43,123,224,0.2)',
          }}
        >
          {icon}
        </div>
        <div>
          <h2
            className="text-lg font-bold leading-snug"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            {title}
          </h2>
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#2b7be0' }}>
            {subtitle}
          </span>
        </div>
      </div>

      {/* Markers */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 flex-1 mb-8">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="#2b7be0" strokeWidth="1.2" fill="rgba(43,123,224,0.07)" />
              <path d="M5 8l2.5 2.5 4-4" stroke="#2b7be0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-teal w-full text-center"
      >
        {ctaLabel}
      </a>
    </motion.div>
  )
}

export default function OrderBloodsPage() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '72px' }}
          aria-label="Order bloods hero"
        >
          <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 0% 0%, rgba(43,123,224,0.08) 0%, transparent 60%)',
            }}
          />

          <div ref={headingRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="label mb-5"
            >
              PATHOLOGY
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-3xl"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
            >
              Order Your{' '}
              <span className="text-teal-gradient">Blood Tests</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: '#8899aa' }}
            >
              Comprehensive, doctor-ordered panels through our accredited pathology partner.
              Collect at a centre near you — no appointment needed at most locations.
            </motion.p>
          </div>
        </section>

        {/* Panels */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
          aria-label="Blood test panels"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PanelCard
                title="Hormone Health Panel"
                subtitle="Hormone Programs"
                items={HORMONE_PANEL}
                ctaLabel="Order Hormone Panel"
                ctaHref="https://imedical.com.au/order/blood-tests/apexmeta-trt-panel&tracking=69bae136964db"
                delay={0}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35M16 7l3-3m0 0h-3m3 0v3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
              <PanelCard
                title="Metabolic Health Panel"
                subtitle="Metabolic Programs"
                items={METABOLIC_PANEL}
                ctaLabel="Order Metabolic Panel"
                ctaHref="https://imedical.com.au/order/blood-tests/apex-meta-weightloss&tracking=69bae136964db"
                delay={0.08}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M12 13v8M9 18h6" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-xs mt-10"
              style={{ color: '#4a5a6a' }}
            >
              Panels are tailored by your doctor based on your program and clinical history.
              Additional markers may be requested where clinically indicated.
            </motion.p>
          </div>
        </section>

        {/* How it works strip */}
        <section
          className="relative py-16 overflow-hidden"
          style={{ backgroundColor: '#070a0d' }}
          aria-label="How blood testing works"
        >
          <div className="glow-rule" aria-hidden="true" />

          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: '01',
                  title: 'Order Online',
                  description: 'Click "Order Panel" above. Complete the secure online form — takes 2 minutes.',
                },
                {
                  number: '02',
                  title: 'Visit a Collection Centre',
                  description: 'Take your referral to any accredited collection centre near you. No appointment needed at most locations.',
                },
                {
                  number: '03',
                  title: 'Results to Your Doctor',
                  description: 'Results are sent directly to your Apex doctor for review at your upcoming consultation.',
                },
              ].map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-5"
                >
                  <span
                    className="text-3xl font-bold flex-shrink-0 leading-none"
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      color: 'rgba(43,123,224,0.25)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
