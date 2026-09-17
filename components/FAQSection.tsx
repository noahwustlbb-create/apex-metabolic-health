'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FAQS } from '@/lib/faqs'

const ease = [0.22, 1, 0.36, 1] as const


function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.45, delay: index * 0.06, ease }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between gap-4 text-left py-5 group"
        aria-expanded={open}
        style={{ borderTop: index > 0 ? '1px solid rgba(72,144,247,0.08)' : undefined }}
      >
        <span
          className="text-sm md:text-base font-semibold leading-snug transition-colors duration-150"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            color: open ? 'var(--blue)' : 'var(--text-primary)',
          }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.2, ease }}
          className="flex-shrink-0 mt-0.5"
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: open ? 'rgba(72,144,247,0.12)' : 'rgba(72,144,247,0.06)',
            border: '1px solid rgba(72,144,247,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
            <path d="M6 2v8M2 6h8" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.28, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="text-sm leading-relaxed pb-5"
              style={{ color: 'var(--text-secondary)' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection({ faqs: customFaqs }: { faqs?: typeof FAQS }) {
  const prefersReduced = useReducedMotion()
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })
  const items = customFaqs ?? FAQS

  return (
    <section
      id="faq"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Frequently asked questions"
    >

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: heading */}
          <div ref={headingRef} className="lg:col-span-2">
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(30px, 3vw, 48px)' }}
            >
              Ask Apex.
            </motion.h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.12, ease }}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Straight answers to the questions we get asked most. If yours isn&apos;t here, reach out directly.
            </motion.p>

            <motion.a
              href="mailto:admin@apexmetabolichealth.com.au"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.24, ease }}
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold"
              style={{ color: 'var(--blue)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Still have questions?
              <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>

          {/* Right: accordion */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.16, ease }}
            className="lg:col-span-3"
          >
            {items.map((faq, i) => (
              <FAQItem key={faq.q} {...faq} index={i} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
