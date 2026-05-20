'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered doctors',
  'TGA-compliant pharmacy',
  'Results in < 48 hours',
  '100% online — Australia-wide',
]

export default function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.1) 0%, transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="label mb-8"
          >
            Doctor-Led Telehealth · Australia-Wide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="display-serif mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            Real answers.{' '}
            <span style={{ color: 'rgba(10,14,26,0.22)' }}>
              Not reassurance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: '#4a5878' }}
          >
            Advanced diagnostics, a specialist doctor, and a clinical protocol built around your biology — not a GP referral.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <a href="/intake/pre-screen" className="btn-primary" style={{ fontSize: '14px', padding: '16px 36px' }}>
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/intake/discovery" className="btn-outline" style={{ fontSize: '14px', padding: '16px 28px' }}>
              Free discovery call
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {TRUST.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase"
                style={{ color: '#7a90a8' }}
              >
                {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(72,144,247,0.4)' }} />}
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(72,144,247,0.15)' }}>
          <div className="absolute w-full scroll-drip" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #4890f7, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
