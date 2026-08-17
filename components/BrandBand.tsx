'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export default function BrandBand() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const reveal = (delay: number, y = 24) =>
    prefersReduced
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, delay, ease },
        }

  return (
    <section
      ref={ref}
      id="who-we-are"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Who we are"
    >
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Copy */}
          <div className="order-2 lg:order-1">
            <motion.h2
              {...reveal(0)}
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.08 }}
            >
              Behind the science, people who actually listen.
            </motion.h2>

            <motion.p
              {...reveal(0.12)}
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--text-secondary)', maxWidth: '54ch' }}
            >
              You have spent years being told your numbers are &ldquo;normal.&rdquo; Apex
              is built by a doctor-led team that treats how you feel as data too, pairing
              advanced diagnostics with clinicians who take the time to interpret them
              properly.
            </motion.p>

            <motion.p
              {...reveal(0.2)}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)', maxWidth: '54ch' }}
            >
              Clinical rigour, minus the cold. Everything runs online, on your schedule,
              anywhere in Australia.
            </motion.p>

            <motion.div {...reveal(0.28)} className="flex flex-wrap gap-x-6 gap-y-3">
              {['Doctor-led, always', 'Advanced diagnostics', 'Ongoing oversight'].map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <svg viewBox="0 0 16 16" fill="none" width={16} height={16} aria-hidden="true">
                    <path d="M3 8.5l3.2 3.2L13 5" stroke="var(--blue)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Image composition */}
          <motion.div {...reveal(0.14, 30)} className="order-1 lg:order-2">
            <div className="relative" style={{ paddingBottom: 'clamp(40px, 8vw, 72px)' }}>
              {/* Main photo */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: '0 40px 90px rgba(0,0,0,0.30)',
                }}
              >
                <img
                  src="/team/team-lounge.webp"
                  alt=""
                  width={1600}
                  height={1067}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>

              {/* Offset brand-packaging accent */}
              <div
                className="absolute"
                style={{
                  right: 'clamp(-8px, 2vw, 20px)',
                  bottom: 0,
                  width: 'clamp(150px, 34%, 240px)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: '0 26px 60px rgba(0,0,0,0.42)',
                }}
                aria-hidden="true"
              >
                <img
                  src="/shoot/meeting.jpg"
                  alt=""
                  width={1470}
                  height={1103}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
