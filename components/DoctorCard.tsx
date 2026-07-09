'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const CREDENTIALS = [
  { label: 'AHPRA Registered', sub: 'Every consultation, no exceptions' },
  { label: 'TGA Compliant', sub: 'All prescriptions & compounds' },
  { label: 'Evidence-Based', sub: 'Protocols backed by clinical research' },
  { label: 'Ongoing Review', sub: 'Not a one-off script service' },
]

export default function DoctorCard() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="our-doctors"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--elevated)' }}
      aria-label="Our medical team"
    >

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(32px, 3.5vw, 54px)' }}
            >
              Doctors who specialise in this.
            </motion.h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.16, ease }}
              className="text-base leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every consultation at Apex is conducted by an AHPRA-registered medical practitioner
              who specialises in hormonal health and metabolic optimisation — not a GP generalist,
              not a nurse practitioner. Doctors who have chosen this as their practice.
            </motion.p>

            {/* Credential list */}
            <div className="flex flex-col gap-3">
              {CREDENTIALS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.24 + i * 0.08, ease }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}
                  >
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                      {c.label}
                    </span>
                    <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>— {c.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.9, delay: 0.2, ease }}
          >
            <div
              className="relative rounded-2xl overflow-hidden p-8"
              style={{
                background: 'var(--bg)',
                border: '1px solid rgba(72,144,247,0.15)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.16), 0 4px 16px rgba(72,144,247,0.06)',
              }}
            >
              {/* Top glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.4), transparent)' }}
              />

              {/* Doctor profile */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(72,144,247,0.18) 0%, rgba(29,79,216,0.22) 100%)', border: '1px solid rgba(72,144,247,0.25)' }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--blue)', fontFamily: 'var(--font-space-grotesk)' }}>CC</span>
                </div>
                <div>
                  <p
                    className="text-base font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Dr Cameron Chen
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Medical Director
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['AHPRA MED0001201298', 'HPI-I 8003613336579826'].map(badge => (
                      <span
                        key={badge}
                        className="text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm"
                        style={{ color: 'var(--blue)', background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className="text-sm leading-relaxed mb-8 p-4"
                style={{
                  background: 'rgba(72,144,247,0.04)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  opacity: 0.75,
                }}
              >
                "We test what other doctors don&apos;t order and interpret results in the context of optimisation — not just whether you fall inside the 'normal' reference range."
              </blockquote>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
