'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SYMPTOMS = [
  "Chronic fatigue that rest doesn't fix",
  'Brain fog and reduced mental clarity',
  "Weight gain you can't explain",
  'Poor recovery from training',
  'Low drive, motivation, and focus',
  'Declining libido',
  'Mood changes and irritability',
  'Non-restorative sleep',
]

const ease = [0.22, 1, 0.36, 1] as const

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="problem"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Symptoms section"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-4"
            >
              The Reality
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="font-bold tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(32px, 3.5vw, 54px)',
                lineHeight: 1.06,
                color: '#f0f4f8',
                letterSpacing: '-0.02em',
              }}
            >
              Your GP said normal.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Your body disagrees.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: '#8899aa', maxWidth: '440px' }}
            >
              Standard blood panels are designed to rule out disease — not optimise performance. We run advanced diagnostics that measure what your GP never tested, interpreted by doctors who specialise in exactly this.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28, ease }}
            >
              <a
                href="/intake/pre-screen"
                className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200"
                style={{
                  background: '#f0f4f8',
                  color: '#070a0d',
                  padding: '14px 28px',
                  borderRadius: '999px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ffffff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8' }}
              >
                Find out what is actually wrong
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right — symptom list */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: '#3a4a5a' }}
            >
              Sound familiar?
            </motion.p>
            <div className="flex flex-col gap-2">
              {SYMPTOMS.map((symptom, i) => (
                <motion.div
                  key={symptom}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.055, ease }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4890f7', opacity: 0.7 }} />
                  <p className="text-sm font-medium" style={{ color: '#b0bcc8' }}>{symptom}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease }}
              className="text-xs mt-5 leading-relaxed"
              style={{ color: '#3a4a5a' }}
            >
              These are clinical indicators — not lifestyle problems. Most men are never tested for them. We are.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
