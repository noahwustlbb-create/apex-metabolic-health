'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 'AHPRA', label: 'Registered doctors — every one' },
  { value: 'TGA', label: 'Compliant pharmacy partner' },
  { value: '< 48h', label: 'Pathology referral issued' },
  { value: '100%', label: 'Telehealth · Australia-wide' },
  { value: 'No GP', label: 'Referral required' },
  { value: 'No lock-in', label: 'Cancel any time' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Clinical credentials"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(72,144,247,0.04) 0%, transparent 65%)' }}
      />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label text-center mb-12"
        >
          Clinical Credentials
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-2xl"
          style={{ border: '1px solid rgba(148,163,184,0.09)', background: 'rgba(148,163,184,0.02)' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="flex flex-col items-center justify-center text-center py-8 px-4"
              style={{ background: '#0d1117' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(20px, 2.5vw, 32px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </p>
              <p className="text-[10px] font-medium tracking-[0.12em] uppercase leading-tight" style={{ color: '#4a5a6a' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
