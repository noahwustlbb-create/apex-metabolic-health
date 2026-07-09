'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const DIFFERENTIATORS = [
  {
    title: 'Doctor-led, always',
    description: 'Every consultation is conducted by an AHPRA-registered medical practitioner. Not a nurse practitioner, not a health coach. A doctor who specialises in this.',
  },
  {
    title: 'Advanced diagnostics',
    description: "Standard panels rule out disease. Ours identify how you function. We test the markers GPs don't order — and interpret them in the context of optimisation, not just \"normal range.\"",
  },
  {
    title: 'Accredited compounding pharmacy',
    description: 'Prescriptions fulfilled through our accredited compounding pharmacy partner. No grey-market suppliers. No unregulated imports. Every compound produced under Australian standards.',
  },
  {
    title: 'Ongoing biological oversight',
    description: 'The first consult is the start, not the end. Structured reviews every 3 months, protocol adjustments based on your data, and clinical support between — not just at — appointments.',
  },
]

export default function WhyApex() {
  const prefersReduced = useReducedMotion()
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id="why-apex"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Why Apex"
    >
      <div className="container-tight relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="max-w-2xl mb-16 md:mb-20">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
            className="display-heading mb-6"
            style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}
          >
            Medicine that goes further.
          </motion.h2>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.14, ease }}
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-primary)', opacity: 0.75 }}
          >
            A GP manages disease. A wellness brand sells supplements. We build clinical protocols around your biology — with real doctors, real diagnostics, and ongoing oversight.
          </motion.p>
        </div>

        {/* Differentiators */}
        <div>
          {DIFFERENTIATORS.map((item) => (
            <motion.div
              key={item.title}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.55, ease }}
              className="grid grid-cols-1 md:grid-cols-[5fr_8fr] gap-3 md:gap-16 py-7 md:py-8"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <h3
                className="font-semibold leading-snug"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px, 1.5vw, 19px)',
                  color: 'var(--text-primary)',
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-primary)', opacity: 0.7 }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} aria-hidden="true" />
        </div>

      </div>
    </section>
  )
}
