'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BADGES = [
  {
    label: 'AHPRA Registered',
    sublabel: 'All practitioners',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l-8 4.5v5C4 17.4 7.4 21.5 12 22c4.6-.5 8-4.6 8-9.5v-5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'TGA Compliant',
    sublabel: 'Medication standards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Fully Private Clinic',
    sublabel: 'No Medicare rebates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l-8 4.5v5C4 17.4 7.4 21.5 12 22c4.6-.5 8-4.6 8-9.5v-5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Accredited Pathology',
    sublabel: 'NATA-accredited labs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Private & Confidential',
    sublabel: 'Australian Privacy Act',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Australia-Wide',
    sublabel: '100% telehealth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#4890f7" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Affiliations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative py-14 overflow-hidden"
      style={{ backgroundColor: '#151c28' }}
      aria-label="Credentials and affiliations"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase mb-8"
          style={{ color: '#4a5a6a' }}
        >
          CREDENTIALS & COMPLIANCE
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-3 p-4 rounded-sm"
              style={{
                background: 'rgba(72,144,247,0.03)',
                border: '1px solid rgba(72,144,247,0.1)',
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.15)',
                }}
              >
                {badge.icon}
              </div>
              <div>
                <p className="text-xs font-semibold leading-snug mb-0.5" style={{ color: '#f0f4f8' }}>
                  {badge.label}
                </p>
                <p className="text-[10px]" style={{ color: '#4a5a6a' }}>
                  {badge.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
