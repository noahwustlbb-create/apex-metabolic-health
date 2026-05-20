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
      style={{ backgroundColor: '#0A0A0A' }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 dot-grid opacity-100" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(200,169,110,0.07) 0%, transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(200,169,110,0.04) 0%, transparent 60%)' }}
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
            <span style={{ color: 'rgba(245,245,245,0.2)' }}>
              Not reassurance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: '#888888' }}
          >
            Advanced diagnostics, a specialist doctor, and a clinical protocol built around your biology — not a GP referral.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <a href="/intake/pre-screen" className="btn-primary" style={{ fontSize: '12px', padding: '16px 36px' }}>
              Start your assessment
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
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          >
            {TRUST.map((item) => (
              <span
                key={item}
                className="text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1.5"
                style={{
                  color: '#888888',
                  background: '#111111',
                  border: '1px solid #1E1E1E',
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-12 relative overflow-hidden" style={{ background: '#1E1E1E' }}>
          <div className="absolute w-full scroll-drip" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #C8A96E, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
