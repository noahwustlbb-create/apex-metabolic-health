'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const DIFFERENTIATORS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2a5 5 0 100 10A5 5 0 0012 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 20c0-4.42 4.03-8 9-8h2c4.97 0 9 3.58 9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M9 10l1.5 1.5L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Doctor-led, always',
    description: 'Every consultation is conducted by an AHPRA-registered medical practitioner. Not a nurse practitioner, not a health coach. A doctor who specialises in this.',
    accent: '#4890f7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-5 4 3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Advanced diagnostics',
    description: 'Standard panels rule out disease. Ours identify how you function. We test the markers GPs don\'t order — and interpret them in the context of optimisation, not just "normal range."',
    accent: '#4890f7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'TGA-compliant pharmacy',
    description: 'Prescriptions fulfilled through our accredited compounding pharmacy partner. No grey-market suppliers. No unregulated imports. Every compound produced under Australian standards.',
    accent: '#4890f7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Ongoing biological oversight',
    description: 'The first consult is the start, not the end. Structured reviews every four months, protocol adjustments based on your data, and clinical support between — not just at — appointments.',
    accent: '#4890f7',
  },
]

const COMPARISON_ROWS = [
  { label: 'GP referral required', apex: false, gp: true },
  { label: 'Specialist hormone testing', apex: true, gp: false },
  { label: 'Same-week appointments', apex: true, gp: false },
  { label: 'Optimisation-focused protocols', apex: true, gp: false },
  { label: 'Ongoing protocol refinement', apex: true, gp: false },
  { label: 'TGA-compliant compounding', apex: true, gp: false },
]

export default function WhyApex() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <section
      id="why-apex"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Why Apex"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-[0.12]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14 md:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Why Apex
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="display-serif"
              style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}
            >
              Not your GP.{' '}
              <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>
                Not a wellness brand.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            A GP manages disease. A wellness brand sells supplements. We build clinical protocols around your biology — with real doctors, real diagnostics, and ongoing oversight.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="p-6 rounded-2xl flex gap-5"
              style={{
                background: 'var(--bg)',
                border: '1px solid rgba(72,144,247,0.1)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.15)', color: '#4890f7' }}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className="text-[15px] font-semibold mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.75 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 20 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(72,144,247,0.12)' }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4"
            style={{ background: 'rgba(72,144,247,0.04)', borderBottom: '1px solid rgba(72,144,247,0.1)' }}
          >
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Feature</span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase w-20 text-center" style={{ color: '#4890f7' }}>Apex</span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase w-20 text-center" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Your GP</span>
          </div>
          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              animate={tableInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3.5 items-center"
              style={{
                borderBottom: i < COMPARISON_ROWS.length - 1 ? '1px solid rgba(72,144,247,0.06)' : 'none',
                background: 'var(--bg)',
              }}
            >
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{row.label}</span>
              <div className="w-20 flex justify-center">
                {row.apex ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}>
                    <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" aria-label="Yes">
                      <path d="M2 5l2 2 4-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(220,50,50,0.06)', border: '1px solid rgba(220,50,50,0.2)' }}>
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-label="No">
                      <path d="M2 2l6 6M8 2L2 8" stroke="rgba(220,50,50,0.7)" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="w-20 flex justify-center">
                {row.gp ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.3)' }}>
                    <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" aria-label="Yes">
                      <path d="M2 5l2 2 4-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(220,50,50,0.06)', border: '1px solid rgba(220,50,50,0.2)' }}>
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-label="No">
                      <path d="M2 2l6 6M8 2L2 8" stroke="rgba(220,50,50,0.7)" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
