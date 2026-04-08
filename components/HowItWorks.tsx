'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Select Your Program',
    description:
      'Eight doctor-led programs. Pick the one that fits your symptoms and goals.',
  },
  {
    number: '02',
    title: 'Advanced Biomarker Analysis',
    description:
      'We issue the doctor&apos;s referral for your full biomarker panel. Attend any accredited pathology centre. No appointment required at most locations.',
  },
  {
    number: '03',
    title: 'Clinical Assessment & Protocol Design',
    description:
      'Your doctor interprets your biomarker data, takes a detailed clinical history, and delivers a personalised regenerative protocol. Typically 30–60 minutes.',
  },
  {
    number: '04',
    title: 'Ongoing Biological Optimisation',
    description:
      'Doctor-prescribed treatment through our TGA-compliant partner pharmacy. Scheduled biological reviews every 4 months. Clinical support throughout.',
  },
]

function StepCard({ step, index, totalSteps }: { step: typeof STEPS[0]; index: number; totalSteps: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative flex flex-col items-center text-center">
      {/* Connecting line (desktop only) */}
      {index < totalSteps - 1 && (
        <div
          aria-hidden="true"
          className="absolute top-10 left-1/2 w-full h-px hidden lg:block"
          style={{ zIndex: 0 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(53,117,198,0.4), rgba(53,117,198,0.1))',
              transformOrigin: 'left center',
            }}
          />
        </div>
      )}

      {/* Step circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
        style={{
          backgroundColor: 'rgba(53,117,198,0.08)',
          border: '1px solid rgba(53,117,198,0.25)',
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute inset-2 rounded-full"
          style={{ border: '1px solid rgba(53,117,198,0.15)' }}
        />
        <span
          className="stat-number text-2xl"
          style={{ color: '#3575C6' }}
        >
          {step.number}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed max-w-[220px] mx-auto" style={{ color: '#B0B8C5' }}>
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const badgeRef = useRef(null)
  const badgeInView = useInView(badgeRef, { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
      aria-label="How it works"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(53,117,198,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
          >
            Clinical Medicine.{' '}
            <span className="text-teal-gradient">No Waiting Rooms.</span>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} totalSteps={STEPS.length} />
          ))}
        </div>

        {/* Badge */}
        <motion.div
          ref={badgeRef}
          initial={{ opacity: 0, y: 16 }}
          animate={badgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div
            className="inline-flex items-center gap-3 px-7 py-3.5"
            style={{
              border: '1px solid rgba(53,117,198,0.2)',
              borderRadius: '2px',
              backgroundColor: 'rgba(53,117,198,0.05)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#3575C6' }}
            />
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: '#3575C6' }}
            >
              100% online. Available Australia-wide.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/assessment" className="btn-teal text-sm tracking-widest uppercase w-full sm:w-auto">
              Find My Program
              <span className="btn-circle">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href="/intake/hormone" className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto">
              Hormone Consult
            </a>
            <a href="/intake/general" className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto">
              General Consult
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
