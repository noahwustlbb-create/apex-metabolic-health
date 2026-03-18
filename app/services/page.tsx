'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Services Hero ────────────────────────────────────────────────────────────

function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Services hero"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      {/* Glow — top left teal radial */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(43,123,224,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Glow — bottom right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(43,123,224,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10 section-pad" style={{ paddingTop: '140px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          OUR SERVICES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 max-w-4xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          Comprehensive Health Optimisation.
          <br />
          <span className="text-teal-gradient">Doctor-Led. Evidence-Based. Australia-Wide.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-2xl mb-10"
          style={{ color: '#8899aa' }}
        >
          Apex Metabolic Health provides clinically supervised health programs for adults seeking
          evidence-based answers. Every decision begins with pathology. Every protocol is built by
          a doctor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/get-started" className="btn-teal">
            Get Started
          </Link>
          <Link href="/pricing" className="btn-ghost">
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Areas of Expertise ───────────────────────────────────────────────────────

const EXPERTISE = [
  {
    title: 'Pathology & Blood Testing',
    description:
      'Comprehensive, doctor-ordered blood panels that go well beyond the standard GP screen. We test what\'s actually relevant to your health goals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 14h4M13 17h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Hormone Health',
    description:
      'Assessment and clinical management of hormonal imbalances across a broad range of markers. Evidenced-based protocols, personalised to your pathology.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeLinecap="round" />
        <path d="M19 8h2M3 8h2M12 1v2M12 13v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Erectile Dysfunction',
    description:
      'Clinically evaluated ED management that addresses root causes, not just symptoms. Our doctors assess hormonal, vascular, and metabolic contributors.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Men's Health",
    description:
      'Specialised clinical care for the conditions that disproportionately affect men — from hormonal decline to metabolic dysfunction and cardiovascular risk.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35M16 7l3-3m0 0h-3m3 0v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Women's Health",
    description:
      'Hormonal health, perimenopause, and metabolic support for women. Assessed and managed by AHPRA-registered practitioners with access to comprehensive pathology.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v8M9 18h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Weight Management',
    description:
      'Medically supervised programs that address the biological drivers of weight resistance — not just willpower. Hormonal, metabolic, and clinical factors assessed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Anti-Ageing (Skin & Hair)',
    description:
      'Doctor-prescribed treatment for skin regeneration and hair restoration. Built on what your bloodwork shows, not off-the-shelf solutions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C7 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-3-8-8-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Muscle Health & Recovery',
    description:
      'Clinically supported programs for tissue repair, injury recovery, and sustained physical performance. Evidence-based protocols, doctor-managed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M6.5 6.5S4 7 4 9.5s3 4 3 4h10s3-1.5 3-4-2.5-3-2.5-3M6.5 6.5L4 4M17.5 6.5L20 4M7 13.5l-1 4.5h12l-1-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Medical Certificates',
    description:
      'AHPRA-registered doctors can issue medical certificates and referral letters during a telehealth consultation. Fast, private, and Australia-wide.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Telehealth Consultations',
    description:
      'All consultations are conducted via secure video call — no travel, no waiting rooms. Available to adults anywhere in Australia.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    ),
  },
]

function AreasOfExpertise() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Areas of expertise"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            WHAT WE DO
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Our Areas of Expertise
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {EXPERTISE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="apex-card p-5 flex flex-col"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm mb-4 flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(43,123,224,0.07)',
                  border: '1px solid rgba(43,123,224,0.18)',
                }}
              >
                {item.icon}
              </div>
              <h3
                className="text-sm font-semibold mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#8899aa' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Test ─────────────────────────────────────────────────────────────

const HORMONAL_PANEL = [
  'Free & Total Testosterone + SHBG',
  'Oestradiol (E2) + FSH / LH',
  'Prolactin + Progesterone',
  'Cortisol + DHEAS',
  'IGF-1 + Growth Hormone',
  'Liver Function (LFT)',
  'Kidney Function (UEC)',
  'Cholesterol / TG / HDL / LDL',
  'Full Blood Count (FBC)',
  'Iron Studies + Magnesium',
  'Glucose + Insulin + HbA1c',
  'TSH / FT3 / FT4',
  'High Sensitivity CRP',
  'Prostate-Specific Antigen (PSA)',
]

const WOMENS_PANEL = [
  'Free & Total Testosterone + SHBG',
  'Oestradiol (E2) + Progesterone',
  'FSH + DHEAS',
  'Liver Function (LFT)',
  'Kidney Function (UEC)',
  'Full Blood Count (FBC)',
  'Iron Studies + Ferritin',
  'Magnesium + Glucose',
  'Cholesterol / TG / HDL / LDL',
  'TSH / FT3 / FT4',
  'High Sensitivity CRP',
  'Vitamin D',
  'HbA1c + Insulin',
]

function WhatWeTest() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const panelsRef = useRef(null)
  const panelsInView = useInView(panelsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="What we test"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            PATHOLOGY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            What We Test
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#8899aa' }}
          >
            Every clinical decision is built on objective pathology data, not guesswork.
          </motion.p>
        </div>

        <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Hormonal Health Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <h3
                className="text-lg font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Hormonal Health Panel
              </h3>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                style={{
                  color: '#2b7be0',
                  backgroundColor: 'rgba(43,123,224,0.08)',
                  border: '1px solid rgba(43,123,224,0.2)',
                }}
              >
                Hormone Programs
              </span>
            </div>
            <ul className="space-y-2">
              {HORMONAL_PANEL.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#2b7be0' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Women's Health Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <h3
                className="text-lg font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Women&apos;s Health Panel
              </h3>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                style={{
                  color: '#2b7be0',
                  backgroundColor: 'rgba(43,123,224,0.08)',
                  border: '1px solid rgba(43,123,224,0.2)',
                }}
              >
                Women&apos;s Programs
              </span>
            </div>
            <ul className="space-y-2">
              {WOMENS_PANEL.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#2b7be0' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={panelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm mt-6"
          style={{ color: '#4a5a6a' }}
        >
          Panels are tailored by your doctor based on your program and clinical history. Additional
          markers may be requested where clinically indicated.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Your Journey — 5 Steps ───────────────────────────────────────────────────

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Fill Out the Form',
    description:
      'Takes 3–5 minutes. Private and confidential. Our team will contact you to confirm your pathway and answer any questions before you commit to anything.',
  },
  {
    number: '02',
    title: 'Pathology Collection',
    description:
      'We issue a referral for blood work at a local accredited collection centre. No appointment needed at most locations. Results are sent directly to your doctor.',
  },
  {
    number: '03',
    title: 'Doctor Consultation',
    description:
      'A structured telehealth consultation — not a quick check-in. Your doctor reviews your full pathology results, takes a detailed health history, and builds a personalised protocol.',
  },
  {
    number: '04',
    title: 'Begin Your Protocol',
    description:
      'Where treatment is clinically appropriate, it\'s coordinated through our TGA-compliant pharmacy partner or your own pharmacy — your choice. Your doctor manages the protocol ongoing.',
  },
  {
    number: '05',
    title: 'Ongoing Monitoring',
    description:
      'Follow-up blood work and review consultations are mandatory every 4 months for patients on active protocols. Adjustments are made based on your results, not guesswork.',
  },
]

function YourJourney() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Your journey with Apex"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(43,123,224,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            THE PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Your Journey With Apex
          </motion.h2>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: 'rgba(43,123,224,0.1)' }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 pb-12 last:pb-0"
              >
                {/* Step number */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{
                      backgroundColor: '#0d1117',
                      border: '1px solid rgba(43,123,224,0.3)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '20px',
                        color: '#2b7be0',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: '#8899aa' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function ServicesCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Get started"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(43,123,224,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
        >
          Ready to Find Out What&apos;s Actually Going On?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#8899aa' }}
        >
          Book a discovery call — free, no commitment. Understand your options before you make any
          decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link href="/get-started" className="btn-teal">
            Get Started
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm tracking-wide"
          style={{ color: '#4a5a6a' }}
        >
          AHPRA-Registered Practitioners · 100% Online · Australia-Wide · Private &amp; Confidential
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <AreasOfExpertise />
        <WhatWeTest />
        <YourJourney />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
