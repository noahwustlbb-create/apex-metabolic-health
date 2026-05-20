'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SYMPTOMS = [
  'Chronic fatigue that rest doesn\'t fix',
  'Brain fog and reduced mental clarity',
  'Weight gain you can\'t explain',
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
      style={{ backgroundColor: '#0d0f12' }}
      aria-label="Symptoms section"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 65%)' }}
      />

      <div ref={ref} className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              The Reality
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="display-serif mb-6"
              style={{ fontSize: 'clamp(36px, 4vw, 60px)' }}
            >
              Your GP said normal.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>
                Your body disagrees.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="text-base leading-relaxed mb-8"
              style={{ color: '#7a8a9a', maxWidth: '420px' }}
            >
              Standard blood panels are designed to rule out disease — not optimise how you function. We run advanced diagnostics interpreted by doctors who specialise in exactly this.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28, ease }}
            >
              <a href="/intake/pre-screen" className="btn-primary" style={{ display: 'inline-flex' }}>
                Find out what is actually wrong
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
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
              className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-5"
              style={{ color: '#2d3d4e' }}
            >
              Sound familiar?
            </motion.p>

            <div className="flex flex-col gap-2">
              {SYMPTOMS.map((symptom, i) => (
                <motion.div
                  key={symptom}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.22 + i * 0.05, ease }}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.045)',
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(72,144,247,0.6)' }}
                  />
                  <p className="text-sm" style={{ color: '#9aacbc', fontFamily: 'var(--font-inter)' }}>
                    {symptom}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="text-xs mt-5 leading-relaxed"
              style={{ color: '#2d3d4e' }}
            >
              These are clinical indicators — not lifestyle problems. Most people are never tested for them. We are.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
