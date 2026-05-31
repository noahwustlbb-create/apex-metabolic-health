'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const PROOF = [
  { value: '1,400+', label: 'men assessed' },
  { value: '< 48h', label: 'referral issued' },
  { value: 'No GP', label: 'referral needed' },
]

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a2f6e 0%, #2563eb 45%, #4890f7 100%)' }}
      aria-label="Get started"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.18]" style={{ filter: 'invert(1)' }} aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)' }}
      />

      <div className="container-tight relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-[10px] font-bold tracking-[0.22em] uppercase mb-6"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Take the first step
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="display-serif mb-5"
            style={{ fontSize: 'clamp(40px, 6vw, 84px)', color: '#ffffff' }}
          >
            Your biology.{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>
              Optimised.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Start with a short assessment. Know your numbers within days. Have a clinical protocol in your hands within two weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <a href="/intake/pre-screen" className="btn-white" style={{ fontSize: '13px', padding: '16px 36px' }}>
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="/intake/discovery"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[13px] font-medium transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            >
              Free discovery call
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {PROOF.map((p, i) => (
              <div key={p.label} className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff', letterSpacing: '-0.02em' }}>{p.value}</p>
                  <p className="text-[10px] tracking-[0.14em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.label}</p>
                </div>
                {i < PROOF.length - 1 && <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
