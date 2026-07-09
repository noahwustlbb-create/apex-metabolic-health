'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useSignupGate } from '@/context/SignupGateContext'

const ease = [0.16, 1, 0.3, 1] as const

const PROGRAMS = [
  {
    slug: 'hormone-optimisation',
    label: 'Hormone Optimisation',
    description: 'Doctor-prescribed TRT and hormone protocols built around your results.',
    href: 'https://app.apexmetabolichealth.com.au/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'metabolic-weight-loss',
    label: 'Medical Weight Loss',
    description: 'GLP-1 and metabolic programs delivered with full clinical oversight.',
    href: 'https://app.apexmetabolichealth.com.au/signup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
        <path d="M3 17l4-8 4 4 4-6 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'sexual-health',
    label: 'Sexual Health',
    description: 'Discreet, evidence-based treatment for performance and function.',
    href: 'https://app.apexmetabolichealth.com.au/signup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: 'injury-repair',
    label: 'Recovery & Injury Repair',
    description: 'Peptide and regenerative protocols to accelerate healing and mobility.',
    href: 'https://app.apexmetabolichealth.com.au/signup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    slug: 'longevity',
    label: 'Anti-Ageing & Longevity',
    description: 'Proactive protocols to extend healthspan, not just lifespan.',
    href: 'https://app.apexmetabolichealth.com.au/signup',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width={18} height={18} aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const { open } = useSignupGate()

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => open(() => { window.location.href = program.href })}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') open(() => { window.location.href = program.href }) }}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 28,
        textDecoration: 'none',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        if (prefersReduced) {
          e.currentTarget.style.borderColor = 'rgba(72,144,247,0.25)'
          return
        }
        e.currentTarget.style.borderColor = 'rgba(72,144,247,0.25)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      aria-label={program.label}
      aria-pressed={undefined}
    >
      {/* Icon */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: 'rgba(72,144,247,0.08)',
        border: '1px solid rgba(72,144,247,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--blue)',
        marginBottom: 20,
        flexShrink: 0,
      }}>
        {program.icon}
      </div>

      {/* Eyebrow */}
      <p style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--blue)',
        marginBottom: 8,
        fontFamily: 'var(--font-inter)',
      }}>
        Clinical Program
      </p>

      {/* Title */}
      <h3 style={{
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginBottom: 12,
        fontFamily: 'var(--font-inter)',
      }}>
        {program.label}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 1.65,
        flex: 1,
        marginBottom: 20,
      }}>
        {program.description}
      </p>

      {/* Arrow link */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--blue)',
        fontFamily: 'var(--font-inter)',
      }}
        className="card-arrow"
      >
        Learn more
        <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true"
          style={{ transition: 'transform 0.2s ease' }}
          className="arrow-icon"
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  )
}

export default function ProgramsGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="programs"
      style={{ backgroundColor: 'var(--bg)', paddingTop: 'clamp(64px,10vw,120px)', paddingBottom: 'clamp(64px,10vw,120px)' }}
      aria-label="Clinical programs"
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>

        {/* Header */}
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <motion.p
            ref={ref}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease }}
            style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16, fontFamily: 'var(--font-space-grotesk)' }}
          >
            Clinical Programs
          </motion.p>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1, fontFamily: 'var(--font-inter)', textWrap: 'balance' as React.CSSProperties['textWrap'] }}
          >
            One clinic. Every pathway.
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        a:hover .arrow-icon { transform: translateX(4px); }
      `}</style>
    </section>
  )
}
