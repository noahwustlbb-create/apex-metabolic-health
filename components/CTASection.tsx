'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#f8f9ff' }}
      aria-label="Get started"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-100" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10 text-center">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-6"
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="display-serif mx-auto mb-6"
          style={{ fontSize: 'clamp(42px, 6vw, 88px)', maxWidth: '740px' }}
        >
          Get answers.{' '}
          <span style={{ color: 'rgba(10,14,26,0.2)' }}>
            Not reassurance.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-base leading-relaxed max-w-lg mx-auto mb-10"
          style={{ color: '#0a0e1a' }}
        >
          Advanced diagnostics. A doctor who specialises in this. A personalised protocol built around your results. No GP referral. No waiting rooms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <a href="/intake/pre-screen" className="btn-primary" style={{ fontSize: '12px', padding: '16px 32px' }}>
            Get your clinical plan
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/intake/discovery" className="btn-outline" style={{ fontSize: '12px', padding: '16px 28px' }}>
            Free discovery call
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        >
          {['Australia-wide', 'AHPRA-registered practitioners', 'Private & confidential'].map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2"
              style={{ fontSize: '10px', color: '#4890f7', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              {i > 0 && <span className="hidden sm:block w-px h-3" style={{ background: 'rgba(72,144,247,0.12)' }} />}
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
