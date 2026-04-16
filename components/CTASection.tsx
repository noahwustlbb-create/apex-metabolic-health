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
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Get started"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.08) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="font-bold tracking-tight mb-6 mx-auto"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(36px, 5vw, 76px)',
            lineHeight: 1.03,
            letterSpacing: '-0.025em',
            color: '#f0f4f8',
            maxWidth: '800px',
          }}
        >
          Get answers.
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Not reassurance.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#8899aa' }}
        >
          Advanced diagnostics. A doctor who specialises in this. A personalised protocol built around your results — not a generic plan. No GP referral. No waiting rooms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <a
            href="/intake/pre-screen"
            className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200"
            style={{
              background: '#f0f4f8',
              color: '#070a0d',
              padding: '16px 32px',
              borderRadius: '999px',
              fontSize: '15px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 0 40px rgba(72,144,247,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Get your clinical plan
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/intake/discovery"
            className="inline-flex items-center gap-2 font-medium text-sm transition-all duration-200"
            style={{
              color: '#8899aa',
              padding: '16px 28px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '15px',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f0f4f8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8899aa'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            Free discovery call
          </a>
        </motion.div>

        {/* Trust items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {['Australia-wide', 'AHPRA-registered practitioners', 'Private & confidential'].map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase"
              style={{ color: '#3a4a5a' }}
            >
              {i > 0 && <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />}
              <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(72,144,247,0.4)' }} />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
