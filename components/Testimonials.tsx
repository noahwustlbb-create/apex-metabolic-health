'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    initials: 'M.T.',
    location: 'Brisbane, QLD',
    program: 'Hormone Program',
    quote:
      "I'd been told everything was 'normal' for years. The Apex team actually looked at my results properly and explained what they meant. The whole process was straightforward and the doctor took time to go through everything.",
  },
  {
    initials: 'J.R.',
    location: 'Sydney, NSW',
    program: 'Metabolic Weight Loss',
    quote:
      'Finally a clinic that looks at the actual cause rather than just telling you to eat less and exercise more. The telehealth format made it easy — no waiting rooms, no referrals, just a proper consultation.',
  },
  {
    initials: 'D.K.',
    location: 'Melbourne, VIC',
    program: 'Hormone & Performance',
    quote:
      "The blood work alone was worth it. I had no idea how much of what I was experiencing was tied to my hormones. The doctor was thorough and the follow-up process has been exactly what I needed.",
  },
  {
    initials: 'A.S.',
    location: 'Perth, WA',
    program: 'Hair Restoration',
    quote:
      'Appreciate that they actually investigate what\'s driving the issue rather than just prescribing a generic solution. The consultation was detailed and I felt like I actually understood what was happening.',
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#2b7be0" className="w-3.5 h-3.5" aria-hidden="true">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section
      id="testimonials"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Patient experiences"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(43,123,224,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            PATIENT EXPERIENCES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            What Patients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: '#8899aa' }}
          >
            Real experiences from real patients. Names withheld for privacy.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.initials}
              initial={{ opacity: 0, y: 28 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="apex-card p-7 flex flex-col gap-5"
            >
              <StarRating />

              <p className="text-sm leading-relaxed flex-1" style={{ color: '#8899aa' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(43,123,224,0.1)',
                      border: '1px solid rgba(43,123,224,0.2)',
                      color: '#2b7be0',
                      fontFamily: 'var(--font-space-grotesk)',
                    }}
                  >
                    {t.initials.split('.')[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: '#f0f4f8' }}>{t.initials}</p>
                    <p className="text-[11px]" style={{ color: '#4a5a6a' }}>{t.location}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    color: '#2b7be0',
                    backgroundColor: 'rgba(43,123,224,0.08)',
                    border: '1px solid rgba(43,123,224,0.15)',
                  }}
                >
                  {t.program}
                </span>
              </div>
            </motion.blockquote>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs mt-8"
          style={{ color: '#4a5a6a' }}
        >
          Patient names withheld for privacy. Experiences reflect individual clinical journeys and do not constitute medical claims or guaranteed outcomes.
        </motion.p>
      </div>
    </section>
  )
}
