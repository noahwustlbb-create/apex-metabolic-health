'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const OPTIONS = [
  {
    tag: 'Not Sure Where to Start',
    title: 'Find My Program',
    desc: 'Answer 5 questions. Get matched to the right program in under 2 minutes.',
    href: '/assessment',
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 8v3l2 2M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Recommended Start',
    title: 'Free Discovery Call',
    desc: '15 minutes with our clinical team. No cost. We find the right fit together.',
    href: '/intake/discovery',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M6.5 4h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H13l-4 4v-4H6.5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Hormone & TRT Programs',
    title: 'Hormone Consultation',
    desc: 'Advanced blood testing first, then your dedicated consultation with our doctor.',
    href: '/intake/hormone',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    tag: 'Weight, Peptides & More',
    title: 'General Consultation',
    desc: 'Weight management, peptide protocols, medical certificates, or a general health review.',
    href: '/intake/general',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface BookingOptionsProps {
  eyebrow?: string
  heading?: string
  subheading?: string
  showViewAll?: boolean
  className?: string
}

export default function BookingOptions({
  eyebrow = 'GET STARTED',
  heading = 'Three Ways to Begin. Choose Yours.',
  subheading = 'Choose what feels right for where you\'re at.',
  showViewAll = false,
  className = '',
}: BookingOptionsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className={`relative section-pad overflow-hidden ${className}`}
      style={{ backgroundColor: '#0d1520' }}
      aria-label="Booking options"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(53,117,198,0.07) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="label mb-4">{eyebrow}</p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6', lineHeight: '1.08' }}
          >
            {heading}
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#B0B8C5' }}>
            {subheading}
          </p>
        </motion.div>

        {/* Cards grid — featured card full width on mobile, top-left on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {OPTIONS.map((opt, i) => (
            <motion.div
              key={opt.href}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <Link
                href={opt.href}
                className="group flex flex-col h-full p-6 rounded-xl transition-all duration-300"
                style={{
                  background: opt.featured ? 'rgba(53,117,198,0.1)' : '#121c30',
                  border: opt.featured
                    ? '1px solid rgba(53,117,198,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-3px)'
                  el.style.borderColor = opt.featured
                    ? 'rgba(53,117,198,0.7)'
                    : 'rgba(53,117,198,0.35)'
                  el.style.boxShadow = opt.featured
                    ? '0 12px 40px rgba(53,117,198,0.2)'
                    : '0 8px 30px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = opt.featured
                    ? 'rgba(53,117,198,0.4)'
                    : 'rgba(255,255,255,0.07)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Tag */}
                <p
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: opt.featured ? '#6AAEE8' : '#4a5a6a' }}
                >
                  {opt.tag}
                </p>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
                  style={{
                    background: opt.featured ? 'rgba(53,117,198,0.2)' : 'rgba(255,255,255,0.05)',
                    color: opt.featured ? '#6AAEE8' : '#B0B8C5',
                  }}
                >
                  {opt.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    color: '#F4F4F6',
                  }}
                >
                  {opt.title}
                </h3>

                {/* Desc */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: '#B0B8C5' }}
                >
                  {opt.desc}
                </p>

                {/* Arrow */}
                <div
                  className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200"
                  style={{ color: opt.featured ? '#6AAEE8' : '#4a5a6a' }}
                >
                  <span className="group-hover:text-[#6AAEE8] transition-colors duration-200">
                    {opt.featured ? 'Take the Quiz' : 'Get Started'}
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all / trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4 mt-10"
        >
          {showViewAll && (
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200"
              style={{ color: '#3575C6' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#6AAEE8' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3575C6' }}
            >
              Three Ways to Book — See All Options
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
          <p
            className="text-center text-[11px] tracking-[0.18em] uppercase"
            style={{ color: '#4a5a6a' }}
          >
            All consultations conducted by AHPRA-registered medical practitioners · 100% online · Australia-wide
          </p>
        </motion.div>
      </div>
    </section>
  )
}
