'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PROGRAMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M19 8h2M3 8h2M12 1v2M12 13v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: 'Hormone Optimisation',
    description: 'Restore and optimise testosterone, DHEA, thyroid, and other key hormonal pathways driving energy, body composition, and drive.',
    bloodsHref: '/intake/bloods-hormone',
    consultHref: '/intake/hormone',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    name: 'Performance & Recovery',
    description: 'Maximise training output, reduce recovery time, and optimise the biological systems that drive physical performance.',
    bloodsHref: '/intake/bloods-performance',
    consultHref: '/intake/hormone',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    name: 'Metabolic Weight Management',
    description: 'Address the hormonal and metabolic drivers of weight resistance — not just calories. A clinical approach to lasting body composition change.',
    bloodsHref: '/intake/bloods-metabolic',
    consultHref: '/intake/general',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9 9c0-1.66 1.34-3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" />
      </svg>
    ),
    name: 'Hair Restoration',
    description: 'Medical management of androgenic alopecia targeting the hormonal and follicular causes of hair loss — not just the symptoms.',
    bloodsHref: '/intake/bloods-hair',
    consultHref: '/intake/hormone',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9S3 16.97 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: 'Skin Regeneration',
    description: 'Doctor-prescribed protocols targeting skin cellular renewal, collagen architecture, and the visible effects of hormonal ageing.',
    bloodsHref: '/intake/bloods-skin',
    consultHref: '/intake/general',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22V12M12 12L8 8M12 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    name: 'Injury Repair & Recovery',
    description: 'Medically supervised regenerative protocols accelerating tissue repair and biological recovery from acute or chronic injury.',
    bloodsHref: '/intake/bloods-injury',
    consultHref: '/intake/general',
  },
]

export default function ProgramsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="programs"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Clinical programs"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">

        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label mb-4"
          >
            CLINICAL PROGRAMS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-bold tracking-tight max-w-xl"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: 1.1 }}
          >
            Pick your program.{' '}
            <span className="text-teal-gradient">Start with bloods.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="apex-card p-6 flex flex-col"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center rounded-sm mb-4 flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.18)',
                  color: '#4890f7',
                }}
              >
                {program.icon}
              </div>

              {/* Name + description */}
              <h3
                className="text-base font-bold mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                {program.name}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#6b7a8d' }}>
                {program.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                <a
                  href={program.bloodsHref}
                  className="w-full text-center inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-all duration-150"
                  style={{
                    background: 'rgba(72,144,247,0.1)',
                    border: '1px solid rgba(72,144,247,0.25)',
                    color: '#4890f7',
                  }}
                >
                  Order Bloods — $99
                </a>
                <a
                  href={program.consultHref}
                  className="w-full text-center inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-all duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#8899aa',
                  }}
                >
                  Book Consultation
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs text-center mt-10"
          style={{ color: '#3a4a5a' }}
        >
          Not sure which program fits? <a href="/intake/discovery" style={{ color: '#4890f7' }} className="hover:underline">Book a free discovery call →</a>
        </motion.p>

      </div>
    </section>
  )
}
