'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const SYMPTOMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="currentColor" />
      </svg>
    ),
    label: 'Chronic fatigue unresponsive to rest',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
      </svg>
    ),
    label: 'Cognitive impairment and reduced mental acuity',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" fill="currentColor" />
      </svg>
    ),
    label: 'Metabolic dysregulation and weight resistance',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" fill="currentColor" />
      </svg>
    ),
    label: 'Impaired physical recovery and reduced strength output',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
      </svg>
    ),
    label: 'Low drive, motivation, and executive function',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" fill="currentColor" />
      </svg>
    ),
    label: 'Mood dysregulation and emotional instability',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
      </svg>
    ),
    label: 'Declining libido',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm0 16a7 7 0 110-14 7 7 0 010 14zm-.5-4.5v2h1v-2h-1zm0-8v6h1V6.5h-1z" fill="currentColor" />
      </svg>
    ),
    label: 'Non-restorative sleep and morning fatigue',
  },
]

function SymptomCard({ symptom, index }: { symptom: typeof SYMPTOMS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card p-5 flex items-start gap-4 group cursor-default"
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-sm flex items-center justify-center transition-colors duration-300"
        style={{
          backgroundColor: 'rgba(53,117,198,0.1)',
          color: '#3575C6',
        }}
      >
        {symptom.icon}
      </div>
      <p
        className="text-sm font-medium leading-snug pt-1.5"
        style={{ color: '#B0B8C5' }}
      >
        {symptom.label}
      </p>
    </motion.div>
  )
}

export default function ProblemSection() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const footerRef = useRef(null)
  const footerInView = useInView(footerRef, { once: true, margin: '-60px' })

  return (
    <section
      id="problem"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#151c28' }}
      aria-label="Symptoms section"
    >
      {/* Top glow rule */}
      <div className="glow-rule mb-0" aria-hidden="true" />

      {/* Subtle background gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(53,117,198,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            The Reality
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
          >
            Something Is Off.
            <br />
            <span className="text-teal-gradient">The Numbers Back It Up.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#B0B8C5' }}
          >
            Your GP said normal. Your body disagrees. We run advanced biomarker analysis that finds what standard panels miss — and we act on what we find.
          </motion.p>
        </div>

        {/* Symptom grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {SYMPTOMS.map((symptom, i) => (
            <SymptomCard key={symptom.label} symptom={symptom} index={i} />
          ))}
        </div>

        {/* Footer copy */}
        <motion.div
          ref={footerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div
            className="px-8 py-6 rounded-sm"
            style={{
              backgroundColor: 'rgba(53,117,198,0.06)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#B0B8C5' }}>
              These are clinical indicators of biological dysfunction — not lifestyle problems.{' '}
              <span className="font-semibold" style={{ color: '#F4F4F6' }}>
                Our doctors run the advanced biomarker panels that find the root cause.
              </span>
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/assessment" className="btn-teal text-sm tracking-widest uppercase w-full sm:w-auto">
              Find My Program
              <span className="btn-circle">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href="/assessment" className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto">
              Health Quiz
            </a>
            <a href="/intake/hormone" className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto">
              Hormone Consult
            </a>
            <a href="/intake/general" className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto">
              General Health Check Up
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
