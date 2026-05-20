'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 'AHPRA', label: 'Registered — every doctor' },
  { value: 'TGA', label: 'Compliant pharmacy partner' },
  { value: '< 48h', label: 'Pathology referral issued' },
  { value: '100%', label: 'Online · Australia-wide' },
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
      className="relative section-pad-sm overflow-hidden"
      style={{ backgroundColor: '#ffffff' }}
      aria-label="Clinical credentials"
    >
      <div className="warm-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label text-center mb-14"
        >
          Clinical Credentials
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
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
                style={{ color: '#4a5878' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="warm-rule mt-14"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
