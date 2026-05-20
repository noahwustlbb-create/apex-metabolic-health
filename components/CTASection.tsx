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
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4890f7 55%, #6ba8ff 100%)' }}
      aria-label="Get started"
    >
      {/* Subtle dot grid on blue */}
      <div className="absolute inset-0 dot-grid opacity-30" style={{ filter: 'invert(1)' }} aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10 text-center">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-6"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="display-serif mx-auto mb-6"
          style={{ fontSize: 'clamp(42px, 6vw, 88px)', maxWidth: '740px', color: '#ffffff' }}
        >
          Get answers.{' '}
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>
            Not reassurance.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-base leading-relaxed max-w-lg mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Advanced diagnostics. A doctor who specialises in this. A personalised protocol built around your results. No GP referral. No waiting rooms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <a href="/intake/pre-screen" className="btn-white" style={{ fontSize: '14px', padding: '16px 32px' }}>
            Get your clinical plan
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/intake/discovery"
            className="inline-flex items-center justify-center gap-2 text-[14px] font-medium rounded-full transition-all duration-200"
            style={{ padding: '16px 28px', border: '1.5px solid rgba(255,255,255,0.45)', color: '#ffffff' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
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
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />}
              {item}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
