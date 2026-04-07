'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  {
    value: '8',
    label: 'Clinical Programs',
    suffix: '',
    isText: false,
  },
  {
    value: 'AHPRA',
    label: 'Registered Practitioners',
    suffix: '',
    isText: true,
  },
  {
    value: 'TGA',
    label: 'Compliant Pharmacy Partner',
    suffix: '',
    isText: true,
  },
  {
    value: 'Australia-Wide',
    label: 'Availability',
    suffix: '',
    isText: true,
  },
]

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return <>{count}</>
}

export default function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#151c28' }}
      aria-label="Clinical credentials"
    >
      {/* Top and bottom rules */}
      <div className="glow-rule absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="glow-rule absolute bottom-0 left-0 right-0" aria-hidden="true" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />

      {/* Center glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(53,117,198,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-tight relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="label text-center mb-10"
        >
          By the Numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center py-8 px-6"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <p
                className="stat-number mb-2"
                style={{
                  color: i % 2 === 0 ? '#3575C6' : '#c9a84c',
                  fontSize: stat.isText ? 'clamp(24px, 3.5vw, 40px)' : 'clamp(40px, 6vw, 72px)',
                  letterSpacing: stat.isText ? '0.04em' : '-0.02em',
                }}
              >
                {stat.isText ? (
                  stat.value
                ) : isInView ? (
                  <>
                    <CountUp target={parseInt(stat.value)} />
                    {stat.suffix}
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p
                className="text-[11px] font-medium tracking-[0.18em] uppercase"
                style={{ color: '#4a5a6a' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
