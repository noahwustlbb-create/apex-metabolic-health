'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered doctors',
  'TGA-compliant pharmacy',
  'No GP referral required',
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
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 dot-grid opacity-100" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(72,144,247,0.06)',
              border: '1px solid rgba(72,144,247,0.18)',
            }}
          >
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 10 10" fill="#4890f7" className="w-2.5 h-2.5" aria-hidden="true">
                  <path d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37z" />
                </svg>
              ))}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: '#4890f7' }}>
              Trusted by 1,400+ men across Australia
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.04, ease }}
            className="label mb-6"
          >
            Doctor-Led Telehealth · Australia-Wide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="display-serif mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            Real answers.{' '}
            <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>
              Not reassurance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-primary)', opacity: 0.75 }}
          >
            Your GP said everything looks normal. You know something is wrong.
            We run the diagnostics GPs don&apos;t order — interpreted by doctors who specialise in exactly this.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <a href="/intake/pre-screen" className="btn-primary" style={{ fontSize: '13px', padding: '16px 36px' }}>
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/intake/discovery" className="btn-outline" style={{ fontSize: '13px', padding: '16px 28px' }}>
              Free discovery call
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {TRUST.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5"
                style={{
                  color: '#4890f7',
                  background: 'rgba(72,144,247,0.05)',
                  border: '1px solid rgba(72,144,247,0.18)',
                  borderRadius: '2px',
                }}
              >
                {i > 0 && <span className="w-px h-3 hidden" />}
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(72,144,247,0.12)' }}>
          <div className="absolute w-full scroll-drip" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #4890f7, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
