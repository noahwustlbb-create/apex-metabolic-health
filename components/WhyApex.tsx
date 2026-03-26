'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DIFFERENTIATORS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2a5 5 0 100 10A5 5 0 0012 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 20c0-4.42 4.03-8 9-8h2c4.97 0 9 3.58 9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M9 10l1.5 1.5L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Doctor-Led, Always',
    description:
      'Every consultation is conducted by an AHPRA-registered medical practitioner. Not a nurse. Not a health coach. A doctor.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M13 13h3m-3 3h3m-6-3h.01M10 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Evidence-Based Medicine',
    description:
      'Our protocols are grounded in peer-reviewed clinical research, not trends or marketing. Every clinical decision is defensible.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'TGA-Compliant Fulfilment',
    description:
      "Where prescriptions are indicated, medication is fulfilled through our TGA-compliant compounding pharmacy partner — to the letter of Australian regulatory requirements.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 21c1.2.6 2.6 1 4 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Ongoing Clinical Relationship',
    description:
      "We don't disappear after your first consult. Scheduled reviews and clinical support are built into every program from day one.",
  },
]

interface DifferentiatorItem {
  icon: React.ReactNode
  title: string
  description: string
}

function DifferentiatorCard({ item, index }: { item: DifferentiatorItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="p-7 rounded-sm group cursor-default"
      style={{
        backgroundColor: '#0d1117',
        border: '1px solid #1e2d3d',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(43,123,224,0.35)'
        el.style.backgroundColor = '#0f1a22'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#1e2d3d'
        el.style.backgroundColor = '#0d1117'
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-sm flex items-center justify-center mb-6"
        style={{
          backgroundColor: 'rgba(43,123,224,0.07)',
          border: '1px solid rgba(43,123,224,0.18)',
          color: '#2b7be0',
        }}
      >
        {item.icon}
      </div>

      {/* Accent bar */}
      <div
        className="w-8 h-px mb-5"
        style={{ backgroundColor: '#2b7be0', opacity: 0.5 }}
      />

      <h3
        className="text-base font-semibold mb-3 leading-snug"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
      >
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
        {item.description}
      </p>
    </motion.div>
  )
}

export default function WhyApex() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id="why-apex"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Why choose Apex"
    >
      <div className="glow-rule" aria-hidden="true" />

      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(43,123,224,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            Why Apex
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Clinical Rigour.{' '}
            <span className="text-teal-gradient">Without the Waiting List.</span>
          </motion.h2>
        </div>

        {/* Differentiator blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {DIFFERENTIATORS.map((item, i) => (
            <DifferentiatorCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <a href="/get-started" className="btn-teal text-sm font-bold tracking-widest uppercase px-10 py-4">
            Request an Appointment
          </a>
        </div>
      </div>
    </section>
  )
}
