'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TESTIMONIALS = [
  {
    quote: 'Finally felt heard. The doctor spent nearly an hour going through my results and explaining exactly what was driving everything. I\'d been dismissed by my GP three times with "your bloods are fine." They weren\'t fine — they just weren\'t looking at the right things.',
    name: 'M.K.',
    age: 42,
    city: 'Brisbane',
    program: 'Hormone Optimisation',
  },
  {
    quote: 'The pre-screen process was seamless and the onboarding the clearest I\'ve seen from any health service. Had my pathology referral within 24 hours and a consultation booked that same week. Very different to what I expected from a telehealth clinic.',
    name: 'S.T.',
    age: 36,
    city: 'Melbourne',
    program: 'Performance & Recovery',
  },
  {
    quote: 'Worth it for the pathology alone. The panel they ordered flagged things my regular GP had never tested for. It gave me actual clinical context — not just a number and "that\'s normal." The protocol I was given made sense once I understood the data behind it.',
    name: 'D.R.',
    age: 51,
    city: 'Sydney',
    program: 'Metabolic Weight Loss',
  },
]

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="#4890f7" className="w-3 h-3" aria-hidden="true">
          <path d="M6 1l1.12 2.27L10 3.64 8 5.59l.47 2.74L6 7 3.53 8.33 4 5.59 2 3.64l2.88-.37z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Patient experiences"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10">

        <div ref={headingRef} className="max-w-2xl mb-12 md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="label mb-5"
          >
            Patient Experiences
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
          >
            What our patients say{' '}
            <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>
              after their first consult.
            </span>
          </motion.h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="flex flex-col p-6 rounded-2xl"
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(72,144,247,0.1)',
              }}
            >
              <StarRating />

              <div
                className="mt-5 mb-4 text-5xl leading-none select-none"
                style={{ color: 'rgba(72,144,247,0.2)', fontFamily: 'Georgia, serif', lineHeight: 0.8 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                {t.quote}
              </p>

              <div
                className="pt-5 flex items-center justify-between gap-3"
                style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                    {t.name}, {t.age}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#4890f7', opacity: 0.75 }}>{t.city}</p>
                </div>
                <span
                  className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                  style={{ color: '#4890f7', background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.15)' }}
                >
                  {t.program}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="text-xs text-center mt-8"
          style={{ color: 'var(--text-primary)', opacity: 0.3 }}
        >
          Names abbreviated and locations used with permission. Individual experiences vary.
        </motion.p>

      </div>
    </section>
  )
}
