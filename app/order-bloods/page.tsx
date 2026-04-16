'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const MENS_PANEL = [
  'Free & Total Testosterone',
  'Oestradiol (E2)',
  'SHBG',
  'FSH / LH',
  'Prolactin',
  'DHEA-S',
  'Cortisol',
  'Thyroid Function — TSH / FT3 / FT4',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Full Blood Count (FBC)',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c',
  'Iron Studies + Ferritin',
  'Vitamin D',
  'High Sensitivity CRP',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

const WOMENS_PANEL = [
  'Oestradiol (E2)',
  'Progesterone',
  'FSH / LH',
  'Prolactin',
  'SHBG',
  'Free & Total Testosterone',
  'DHEA-S',
  'Cortisol',
  'Thyroid Function — TSH / FT3 / FT4',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Full Blood Count (FBC)',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c',
  'Iron Studies + Ferritin',
  'Vitamin D',
  'Vitamin B12',
  'High Sensitivity CRP',
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
  price?: string
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
            backgroundColor: 'rgba(72,144,247,0.08)',
            border: '1px solid rgba(72,144,247,0.2)',
          }}
        >
          {icon}
        </div>
          <div className="flex-1">
            <h2
              className="text-lg font-bold leading-snug"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
            >
              {title}
            </h2>
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: '#4890f7' }}>
              {subtitle}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>From $73.66</p>
            <p className="text-[10px] tracking-[0.12em] uppercase" style={{ color: '#4a5a6a' }}>program-specific</p>
          </div>
      </div>

      {/* Morning collection notice */}
      <div
        className="flex items-start gap-2 px-3 py-2.5 rounded-sm mb-5"
        style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.18)' }}
      >
        <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="#4890f7" strokeWidth="1.2"/>
          <path d="M10 5v5l3 3" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-[11px] leading-relaxed" style={{ color: '#6b7a8d' }}>
          <span className="font-semibold" style={{ color: '#4890f7' }}>Best collected 7–9am, fasted.</span>{' '}
          Morning collection ensures accurate hormone and metabolic readings.
        </p>
      </div>

      {/* Markers */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 flex-1 mb-8">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="#4890f7" strokeWidth="1.2" fill="rgba(72,144,247,0.07)" />
              <path d="M5 8l2.5 2.5 4-4" stroke="#4890f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
        className="btn-teal w-full text-center"
      >
        {ctaLabel}
      </a>
    </motion.div>
  )
}

export default function OrderBloodsPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
          aria-label="Order bloods hero"
        >
          <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)',
            }}
          />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Pathology
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}
            >
              Start with data.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not assumptions.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '520px', marginBottom: '2rem' }}
            >
              Doctor-ordered panels. No GP referral required. Collect at any accredited centre near you — your results go directly to your Apex doctor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide', 'Results reviewed by your doctor'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
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
                subtitle="Comprehensive Hormone Panel"
                items={MENS_PANEL}
                ctaLabel="Get Started — Hormone Panel"
                ctaHref="/intake/bloods-hormone"
                delay={0}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 2C10.5 2 9.5 3 9.5 4.5V13.5C8 14.3 7 15.8 7 17.5C7 20 9.2 22 12 22C14.8 22 17 20 17 17.5C17 15.8 16 14.3 14.5 13.5V4.5C14.5 3 13.5 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="17.5" r="1.5" fill="#4890f7" stroke="none" />
                  </svg>
                }
              />
              <PanelCard
                title="Metabolic Health Panel"
                subtitle="Comprehensive Metabolic Panel"
                items={WOMENS_PANEL}
                ctaLabel="Get Started — Metabolic Panel"
                ctaHref="/intake/bloods-metabolic"
                delay={0.08}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="10" r="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15v7M9 19h6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-3 mt-10 px-5 py-4 rounded-sm max-w-2xl mx-auto"
              style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.18)' }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="10" cy="10" r="9" stroke="#4890f7" strokeWidth="1.2"/>
                <path d="M10 5v5l3 3" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-xs leading-relaxed text-left" style={{ color: '#6b7a8d' }}>
                <span className="font-semibold" style={{ color: '#4890f7' }}>Collection tip — </span>
                Bloods are best collected in the morning, ideally between <strong style={{ color: '#B0B8C5' }}>7am and 9am</strong> and before 10am. Hormone levels (particularly testosterone and cortisol) peak in the morning and decline throughout the day. For metabolic markers, aim to fast for 8–10 hours prior to collection.
              </p>
            </motion.div>
            <div className="mt-8 px-5 py-4 rounded-xl text-center max-w-2xl mx-auto"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
                The appropriate panel depends on your clinical pathway and the biomarkers being assessed.
                Some programs require a comprehensive baseline panel, while others may require limited monitoring or no blood testing initially.
                Exact pricing is confirmed after your clinical assessment and program match.
              </p>
            </div>
          </div>
        </section>

        {/* How it works strip */}
        <section
          className="relative py-16 overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
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
                  description: 'Take your referral to any accredited collection centre near you. No appointment needed at most locations. Aim to collect between 7am–9am for the most accurate results — hormones and metabolic markers are best measured in a fasted morning state.',
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
                      color: 'rgba(72,144,247,0.25)',
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

        {/* CTA Block */}
        <section ref={ctaRef} className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Get started">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 55%)' }} />
          <div className="container-tight relative z-10 text-center">
            <motion.h2 initial={{ opacity: 0, y: 24 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#f0f4f8', marginBottom: '1rem' }}>
              Know your numbers.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Act on them.</span>
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }} className="flex flex-col items-center gap-3">
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
              <p className="text-xs" style={{ color: '#3a4a5a' }}>Takes 60 seconds. No commitment.</p>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={ctaInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm mt-10" style={{ color: '#3a4a5a' }}>
              Next: <Link href="/services" style={{ color: '#4890f7' }} className="hover:underline">explore our clinical programs →</Link>
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
