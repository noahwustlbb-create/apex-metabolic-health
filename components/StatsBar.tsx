'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '1,400+', label: 'Patients assessed Australia-wide' },
  { value: '4.9★', label: 'Average patient satisfaction' },
  { value: '< 48h', label: 'Pathology referral issued' },
  { value: '4,000+', label: 'Pathology collection sites' },
  { value: 'AHPRA', label: 'Registered — every doctor' },
  { value: 'No GP', label: 'Referral ever required' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '64px', paddingBottom: '64px' }}
      aria-label="Clinical scale and credentials"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(72,144,247,0.03) 0%, transparent 65%)' }}
      />

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="flex flex-col items-center text-center"
            >
              <p
                className="stat-number mb-2"
                style={{
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-[10px] font-medium leading-snug tracking-[0.1em] uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="warm-rule mt-16" aria-hidden="true" />
    </section>
  )
}
