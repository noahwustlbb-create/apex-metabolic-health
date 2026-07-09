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
    featured: true,
  },
  {
    quote: 'The pre-screen process was seamless and the onboarding the clearest I\'ve seen from any health service. Had my pathology referral within 24 hours and a consultation booked that same week. Very different to what I expected from a telehealth clinic.',
    name: 'S.T.',
    age: 36,
    city: 'Melbourne',
    program: 'Performance & Recovery',
    featured: false,
  },
  {
    quote: 'Worth it for the pathology alone. The panel they ordered flagged things my regular GP had never tested for. It gave me actual clinical context — not just a number and "that\'s normal." The protocol I was given made sense once I understood the data behind it.',
    name: 'D.R.',
    age: 51,
    city: 'Sydney',
    program: 'Metabolic Weight Loss',
    featured: false,
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

  const featured = TESTIMONIALS[0]
  const secondary = TESTIMONIALS.slice(1)

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Patient experiences"
    >
      
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10">

        {/* Heading */}
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
            className="display-heading"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)' }}
          >
            What our patients say{' '}
            <span style={{ color: 'var(--blue)' }}>
              after their first consult.
            </span>
          </motion.h2>
        </div>

        {/* Card grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">

          {/* Featured testimonial — spans 3 of 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-3 flex flex-col p-8 md:p-10 rounded-2xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(72,144,247,0.12)',
            }}
          >
            {/* Large decorative quote mark */}
            <div
              className="text-[100px] leading-none mb-4 select-none"
              style={{
                color: 'rgba(72,144,247,0.12)',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 0.75,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote
              className="flex-1 text-base md:text-lg leading-relaxed mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              {featured.quote}
            </blockquote>

            <div
              className="flex items-center justify-between gap-4 pt-6"
              style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
            >
              <div>
                <StarRating />
                <p
                  className="text-sm font-semibold mt-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                >
                  {featured.name}, {featured.age}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--blue)', opacity: 0.75 }}>
                  {featured.city}
                </p>
              </div>
              <span
                className="text-[9px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-sm flex-shrink-0"
                style={{ color: 'var(--blue)', background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.15)' }}
              >
                {featured.program}
              </span>
            </div>
          </motion.div>

          {/* Secondary testimonials — stack in 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secondary.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: (i + 1) * 0.1, ease }}
                className="flex flex-col p-6 rounded-2xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(72,144,247,0.1)',
                }}
              >
                <StarRating />

                <p className="text-sm leading-relaxed flex-1 mt-4 mb-5" style={{ color: 'var(--text-primary)', opacity: 0.78 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div
                  className="pt-4 flex items-center justify-between gap-3"
                  style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
                >
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                    >
                      {t.name}, {t.age}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--blue)', opacity: 0.75 }}>
                      {t.city}
                    </p>
                  </div>
                  <span
                    className="text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                    style={{ color: 'var(--blue)', background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.15)' }}
                  >
                    {t.program}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="text-xs text-center mt-8"
          style={{ color: 'var(--text-primary)', opacity: 0.28 }}
        >
          Names abbreviated and locations used with permission. Individual experiences vary.
        </motion.p>

      </div>
    </section>
  )
}
