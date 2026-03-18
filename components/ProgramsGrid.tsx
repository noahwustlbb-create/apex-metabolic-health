'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ProgramModal from './ProgramModal'
import { programs } from '@/lib/programs'
import type { Program } from '@/lib/programs'

interface LocalProgram {
  icon: React.ReactNode
  name: string
  description: string
  slug?: string
}

const PROGRAMS: LocalProgram[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M19 8h2M3 8h2M12 1v2M12 13v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: 'Hormone Optimisation',
    description:
      'Comprehensive assessment and management of hormonal imbalances affecting energy, body composition, and vitality.',
    slug: 'hormone-optimisation',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    name: 'Performance & Recovery',
    description:
      'Targeted protocols for adults focused on training output, recovery quality, and sustained physical performance.',
    slug: 'hormone-performance',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    name: 'Metabolic Weight Management',
    description:
      'Clinically supervised programs addressing the underlying hormonal and metabolic drivers of weight resistance.',
    slug: 'metabolic-weight-loss',
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
    description:
      'Evidence-based medical management of androgenic alopecia and other forms of hair loss.',
    slug: 'hair-restoration',
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
    description:
      'Doctor-prescribed approaches to skin quality, texture, and the visible effects of hormonal changes.',
    slug: 'skin-regeneration',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22V12M12 12L8 8M12 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    name: 'Injury Repair & Recovery',
    description:
      'Medically supervised protocols supporting tissue healing and optimised recovery from injury.',
    slug: 'injury-repair',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 14h1m6 0h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: 'Comprehensive Blood Panels',
    description:
      'Advanced pathology testing that goes beyond the standard GP screen — giving you a complete metabolic and hormonal picture.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 10h1.5M15.5 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    name: 'General Telehealth',
    description:
      'Access to our AHPRA-registered doctors for general health consultations, referrals, and medical management.',
  },
]

interface ProgramCardProps {
  program: LocalProgram
  index: number
  onOpen: (p: Program) => void
}

function ProgramCard({ program, index, onOpen }: ProgramCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const fullProgram = program.slug
    ? programs.find((p) => p.slug === program.slug) ?? null
    : null

  const handleCardClick = () => {
    if (fullProgram) {
      onOpen(fullProgram)
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card program-card p-6 flex flex-col group h-full"
      style={{
        cursor: fullProgram ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={handleCardClick}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-sm mb-5 flex-shrink-0 transition-all duration-300 group-hover:border-teal"
        style={{
          backgroundColor: 'rgba(0,194,184,0.07)',
          border: '1px solid rgba(0,194,184,0.18)',
          color: '#00c2b8',
        }}
      >
        {program.icon}
      </div>

      {/* Program name */}
      <h3
        className="text-base font-semibold mb-2.5 leading-snug"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
      >
        {program.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1 mb-5"
        style={{ color: '#8899aa' }}
      >
        {program.description}
      </p>

      {/* Link */}
      <div
        className="flex items-center gap-1.5 mt-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="text-xs font-semibold tracking-wide transition-colors duration-200 group-hover:text-primary"
          style={{ color: '#00c2b8' }}
        >
          Learn More
        </span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: '#00c2b8' }}
          aria-hidden="true"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* View Details hover hint */}
      {fullProgram && (
        <div
          className="view-details-hint"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(7,10,13,0.75)',
            color: '#00c2b8',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: '20px',
            opacity: 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          View Details
        </div>
      )}
    </motion.div>
  )
}

export default function ProgramsGrid() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const [activeProgram, setActiveProgram] = useState<Program | null>(null)

  return (
    <section
      id="programs"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Clinical programs"
    >
      <div className="glow-rule" aria-hidden="true" />

      {/* Background texture */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      {/* Top-right accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(0,194,184,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            Clinical Programs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Eight Clinical Programs.
            <br />
            <span className="text-teal-gradient">One Focused Approach.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#8899aa' }}
          >
            Every program is doctor-led, evidence-based, and tailored to your pathology results.
          </motion.p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROGRAMS.map((program, i) => (
            <ProgramCard
              key={program.name}
              program={program}
              index={i}
              onOpen={setActiveProgram}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProgram && (
          <ProgramModal
            program={activeProgram}
            onClose={() => setActiveProgram(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
