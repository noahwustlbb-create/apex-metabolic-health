'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ProgramModal from './ProgramModal'
import { programs } from '@/lib/programs'
import type { Program } from '@/lib/programs'

interface LocalProgram {
  icon: React.ReactNode
  name: string
  description: string
  slug?: string
  href?: string
  buyNow?: boolean
  ctaLabel?: string
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
      'Comprehensive assessment and optimisation of hormonal pathways affecting cellular energy, body composition, and biological vitality.',
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
      'Targeted regenerative protocols focused on training output, mitochondrial recovery, and sustained physical performance.',
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
      'Clinically supervised metabolic optimisation addressing the hormonal and cellular drivers of weight resistance.',
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
      'Evidence-based medical management of androgenic alopecia and follicular miniaturisation — hair regeneration at the biological level.',
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
      'Doctor-prescribed regenerative protocols targeting skin cellular renewal, texture, collagen architecture, and the visible effects of hormonal ageing.',
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
      'Medically supervised regenerative protocols accelerating tissue repair, cellular healing, and biological recovery from injury.',
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
    name: 'Advanced Biomarker Analysis',
    description:
      'Comprehensive biomarker profiling that goes beyond the standard GP screen — delivering a precise metabolic, hormonal, and cellular health picture.',
    href: '/order-bloods',
    buyNow: true,
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
    href: '/intake/general',
    buyNow: true,
    ctaLabel: 'Book Now',
  },
]

interface ProgramCardProps {
  program: LocalProgram
  index: number
  onOpen: (p: Program) => void
}

function ProgramCard({ program, index, onOpen }: ProgramCardProps) {
  const ref = useRef(null)
  const router = useRouter()
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const fullProgram = program.slug
    ? programs.find((p) => p.slug === program.slug) ?? null
    : null

  const handleCardClick = () => {
    if (program.href) {
      router.push(program.href)
    } else if (fullProgram) {
      onOpen(fullProgram)
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card program-card flex flex-col group h-full overflow-hidden"
      style={{
        cursor: fullProgram ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={handleCardClick}
    >
      {/* Image strip */}
      {fullProgram?.image && (
        <div className="relative w-full h-44 flex-shrink-0 overflow-hidden" style={{ background: '#0A0A0A' }}>
          <Image
            src={fullProgram.image}
            alt={program.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(13,17,23,0.7) 100%)' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center rounded-sm mb-5 flex-shrink-0 transition-all duration-300 group-hover:border-teal"
          style={{
            backgroundColor: 'rgba(53,117,198,0.07)',
            border: '1px solid rgba(53,117,198,0.18)',
            color: '#3575C6',
          }}
        >
          {program.icon}
        </div>

        {/* Program name */}
        <h3
          className="text-base font-semibold mb-2.5 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
        >
          {program.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 mb-5"
          style={{ color: '#B0B8C5' }}
        >
          {program.description}
        </p>

        {/* Links */}
        <div
          className="flex items-center justify-between mt-auto pt-3 gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {program.buyNow ? (
            <a
              href={program.href}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-200"
              style={{ color: '#3575C6' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F4F6' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3575C6' }}
              onClick={(e) => e.stopPropagation()}
            >
              {program.ctaLabel ?? 'Buy Now'}
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <>
              <span
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 group-hover:text-primary"
                style={{ color: '#3575C6' }}
              >
                Learn More
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#3575C6' }} aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <a
                href="/assessment"
                className="flex items-center gap-1 text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap"
                style={{ color: '#B0B8C5' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F4F4F6' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#B0B8C5' }}
                onClick={(e) => e.stopPropagation()}
              >
                Check Eligibility
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </>
          )}
        </div>
      </div>

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
      style={{ backgroundColor: '#151c28' }}
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
          background: 'radial-gradient(ellipse at 100% 0%, rgba(53,117,198,0.06) 0%, transparent 60%)',
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
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}
          >
            Eight Clinical Programs.
            <br />
            <span className="text-teal-gradient">Evidence-Based Protocols.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#B0B8C5' }}
          >
            Every protocol begins with advanced biomarker analysis. All treatment is clinically indicated and individually prescribed.
          </motion.p>
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PROGRAMS.map((program, i) => (
            <ProgramCard
              key={program.name}
              program={program}
              index={i}
              onOpen={setActiveProgram}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/services" className="btn-ghost w-full sm:w-auto">
            Choose Your Program
            <span className="btn-circle">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a href="/intake/hormone" className="btn-teal w-full sm:w-auto">
            Hormone Consult
            <span className="btn-circle">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
          <a href="/intake/general" className="btn-teal w-full sm:w-auto">
            General Health Check Up
            <span className="btn-circle">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
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
