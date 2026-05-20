'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Complete your assessment',
    description: 'Answer a few quick questions. We match you to the right program and blood panel for your goals.',
  },
  {
    number: '02',
    title: 'Order your blood panel',
    description: 'Doctor-issued referral sent within 24 hours. Collect at any accredited pathology centre near you — fasted before 9am.',
  },
  {
    number: '03',
    title: 'Telehealth consultation',
    description: 'Your AHPRA-registered doctor reviews your results and builds a personalised clinical protocol — typically 30–60 minutes.',
  },
  {
    number: '04',
    title: 'Ongoing optimisation',
    description: 'Doctor-prescribed treatment, scheduled reviews every 4 months, and clinical support throughout your programme.',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="How it works"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight">

        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="label mb-5"
          >
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif"
            style={{ fontSize: 'clamp(36px, 4vw, 62px)' }}
          >
            Clinical medicine.{' '}
            <span style={{ color: 'rgba(10,14,26,0.2)' }}>
              No waiting rooms.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="relative p-6 rounded-2xl flex flex-col"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(72,144,247,0.12)',
              }}
            >
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-9 left-full w-4 h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(72,144,247,0.2), transparent)', zIndex: 10 }}
                />
              )}
              <span
                className="text-4xl font-bold mb-5 leading-none"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  color: 'rgba(72,144,247,0.2)',
                  letterSpacing: '-0.03em',
                }}
              >
                {step.number}
              </span>
              <h3
                className="text-base font-semibold mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5878' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="flex flex-wrap items-center gap-4"
        >
          <a href="/intake/pre-screen" className="btn-primary">
            Start your assessment
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/how-it-works"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: '#4a5878' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#7a8a9a' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#4a5a6a' }}
          >
            Learn more about our process →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
