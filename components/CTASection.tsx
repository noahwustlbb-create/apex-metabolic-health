'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function CTASection() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay = 0, y = 20) => ({
    initial: prefersReduced ? false : { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: prefersReduced ? { duration: 0 } : { duration: 0.7, delay, ease },
  })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-label="Get started"
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.25), transparent)' }}
        aria-hidden="true"
      />

      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(72,144,247,0.06) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline */}
          <motion.h2
            {...anim(0, 32)}
            className="display-heading mb-6"
            style={{ fontSize: 'clamp(30px, 5.5vw, 72px)', color: 'var(--text-primary)' }}
          >
            Your biology.{' '}
            <span style={{ color: 'var(--blue)' }}>
              Optimised.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            {...anim(0.14, 18)}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            You&apos;ve done the reading. You know something is off. Here&apos;s where you find out
            exactly what it is, and what to do about it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...anim(0.26, 14)}
            className="flex flex-col items-center gap-5 mb-16"
          >
            {/* Primary CTA */}
            <a
              href="/start"
              className="group inline-flex items-center gap-3 font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                color: '#fff',
                fontSize: 15,
                padding: '17px 44px',
                borderRadius: 12,
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 32px rgba(72,144,247,0.35), 0 2px 8px rgba(72,144,247,0.2)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(72,144,247,0.45), 0 4px 12px rgba(72,144,247,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(72,144,247,0.35), 0 2px 8px rgba(72,144,247,0.2)'
              }}
            >
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="/intake/discovery"
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              Prefer to talk first? Book a free call →
            </a>
          </motion.div>

          {/* Empathetic close */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, delay: 0.5, ease }}
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)', borderTop: '1px solid rgba(72,144,247,0.08)', paddingTop: 40 }}
          >
            Most people who book with us have been told by at least one doctor that their results
            look fine. We look further.
          </motion.p>

        </div>
      </div>

      {/* Bottom footer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.1), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
