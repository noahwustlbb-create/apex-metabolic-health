'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0c131f' }}
      aria-label="Book a consultation"
    >
      <div className="glow-rule" aria-hidden="true" />

      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      {/* Pulsing rings */}
      <div
        aria-hidden="true"
        className="pulse-ring absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, border: '1px solid rgba(72,144,247,0.12)', top: '50%', left: '50%' }}
      />
      <div
        aria-hidden="true"
        className="pulse-ring-slow absolute rounded-full pointer-events-none"
        style={{ width: 800, height: 800, border: '1px solid rgba(72,144,247,0.06)', top: '50%', left: '50%' }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
        >
          Get Answers.
          <br />
          <span className="text-teal-gradient">Not Reassurance.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#8899aa' }}
        >
          Book a telehealth consultation. Pathology-backed diagnosis. Clinical protocol delivered online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <a
            href="/get-started"
            className="btn-teal text-sm font-bold tracking-widest uppercase px-10 py-4"
            style={{ fontSize: '13px' }}
          >
            Book Your Consultation
          </a>
          <a
            href="/services"
            className="btn-ghost text-sm font-bold tracking-widest uppercase px-10 py-4"
            style={{ fontSize: '13px' }}
          >
            View Programs
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {[
            'Australia-wide',
            'AHPRA-registered practitioners',
            'Private & confidential',
          ].map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase"
              style={{ color: '#4a5a6a' }}
            >
              {i > 0 && (
                <span
                  className="hidden sm:block w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                />
              )}
              <span
                className="w-1 h-1 rounded-full sm:hidden"
                style={{ backgroundColor: '#4890f7', opacity: 0.6 }}
              />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
