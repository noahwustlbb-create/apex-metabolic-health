'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const PROOF = [
  { value: '1,400+', label: 'Patients assessed' },
  { value: '< 48h',  label: 'Referral issued'   },
  { value: 'No GP',  label: 'Referral needed'   },
]

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="cta"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: '#04060d' }}
      aria-label="Get started"
    >
      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.25), transparent)' }}
        aria-hidden="true"
      />

      {/* Central atmospheric glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 100%, rgba(72,144,247,0.13) 0%, transparent 70%)' }}
      />
      {/* Top secondary glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div
        className="absolute inset-0 dot-grid pointer-events-none"
        style={{ opacity: 0.28 }}
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-[10px] font-bold tracking-[0.24em] uppercase mb-8"
            style={{ color: 'rgba(72,144,247,0.55)' }}
          >
            Take the first step
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="display-serif mb-6"
            style={{ fontSize: 'clamp(46px, 7vw, 96px)', color: '#f0f5ff' }}
          >
            Your biology.{' '}
            <span style={{ color: '#4890f7' }}>
              Optimised.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
            style={{ color: 'rgba(240,245,255,0.78)' }}
          >
            Get started with an AHPRA-registered doctor. Know your numbers within days.
            Have a personalised clinical protocol in your hands within two weeks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <a
              href="/book"
              className="btn-white"
              style={{ fontSize: '14px', padding: '16px 40px' }}
            >
              Get Started
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-opacity duration-200"
              style={{ color: 'rgba(240,245,255,0.65)' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              or book a free discovery call →
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex items-center justify-center gap-0 pt-10"
            style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
          >
            {PROOF.map((p, i) => (
              <div key={p.label} className="flex items-center">
                <div className="text-center px-8">
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f5ff', letterSpacing: '-0.02em' }}
                  >
                    {p.value}
                  </p>
                  <p
                    className="text-[10px] tracking-[0.14em] uppercase mt-1"
                    style={{ color: 'rgba(240,245,255,0.55)' }}
                  >
                    {p.label}
                  </p>
                </div>
                {i < PROOF.length - 1 && (
                  <div className="w-px h-8 flex-shrink-0" style={{ background: 'rgba(72,144,247,0.12)' }} aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>

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
