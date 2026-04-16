'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const FOCUS_AREAS = [
  'Hormones & Energy',
  'Weight & Metabolism',
  'Performance & Recovery',
  'Hair Restoration',
  'Skin Regeneration',
  'Injury Repair',
  'Full Health Checkup',
]

export default function ProgramQuiz() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="quiz"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
      aria-label="Health assessment quiz"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p className="label mb-4">HEALTH ASSESSMENT</p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
            >
              Not Sure Where to Start?
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#B0B8C5' }}>
              Answer a few quick questions and we&apos;ll recommend the right program for your goals.
              Takes 2 minutes.
            </p>
          </div>

          {/* Focus area pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {FOCUS_AREAS.map((area, i) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="px-3.5 py-1.5 text-xs font-medium rounded-sm"
                style={{
                  backgroundColor: 'rgba(72,144,247,0.05)',
                  border: '1px solid rgba(72,144,247,0.2)',
                  color: 'var(--text-secondary)',
                }}
              >
                {area}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 md:p-10 text-center"
            style={{ border: '1px solid rgba(72,144,247,0.2)' }}
          >
            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
              {[
                { value: '2 min', label: 'To complete' },
                { value: '9', label: 'Questions' },
                { value: '100%', label: 'Personalised' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-2xl font-bold mb-0.5"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--teal)' }}
                  >
                    {value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                </div>
              ))}
            </div>

            <Link href="/quiz" className="btn-teal inline-flex mb-4">
              Take the Health Assessment
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Doctor-curated result · No cost · No commitment
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
