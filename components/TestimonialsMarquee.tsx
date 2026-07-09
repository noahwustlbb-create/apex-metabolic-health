'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const REVIEWS = [
  { quote: 'Finally felt heard. The doctor spent nearly an hour going through my results. I\'d been dismissed by my GP three times — "your bloods are fine." They weren\'t fine.', name: 'M.K.', age: 42, city: 'Brisbane', program: 'Hormone Optimisation' },
  { quote: 'Had my pathology referral within 24 hours and a consultation booked that same week. Very different to what I expected from a telehealth clinic.', name: 'S.T.', age: 36, city: 'Melbourne', program: 'Performance & Recovery' },
  { quote: 'The panel they ordered flagged things my regular GP had never tested for. The protocol I was given made sense once I understood the data behind it.', name: 'D.R.', age: 51, city: 'Sydney', program: 'Metabolic Weight Loss' },
  { quote: 'Three months in and the difference is significant. Energy levels, mental clarity, sleep quality — all measurably better. This is what I wished my GP had offered years ago.', name: 'J.M.', age: 44, city: 'Perth', program: 'Hormone Optimisation' },
  { quote: 'The intake process was thorough and the doctor actually read my full history before the call. No rushing. No vague answers. Just real clinical reasoning.', name: 'A.W.', age: 38, city: 'Adelaide', program: 'Performance & Recovery' },
  { quote: 'I\'d tried two other telehealth services and felt like I was talking to a call centre. Apex was completely different — proper clinical depth from the first conversation.', name: 'B.C.', age: 47, city: 'Brisbane', program: 'Metabolic Weight Loss' },
  { quote: 'Worth every cent just for the pathology alone. I now actually understand what my numbers mean and what to do about them.', name: 'T.N.', age: 33, city: 'Sydney', program: 'Hormone Optimisation' },
  { quote: 'Got results back within 72 hours and had a follow-up booked before I even had time to stress about them. That kind of responsiveness is rare.', name: 'C.P.', age: 55, city: 'Melbourne', program: 'Performance & Recovery' },
  { quote: 'The ongoing review structure is what sets Apex apart. Not just a one-off consult — actual follow-through with protocol adjustments based on new data.', name: 'R.H.', age: 40, city: 'Gold Coast', program: 'Hormone Optimisation' },
  { quote: 'I was sceptical about telehealth but the quality of the consultation changed my mind. Detailed, evidence-based, no fluff. My kind of medicine.', name: 'L.F.', age: 49, city: 'Canberra', program: 'Metabolic Weight Loss' },
]

const ROW_A = REVIEWS.slice(0, 5)
const ROW_B = REVIEWS.slice(5, 10)

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 10 10" fill="#4890f7" className="w-2.5 h-2.5" aria-hidden="true">
          <path d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ quote, name, age, city, program }: typeof REVIEWS[0]) {
  const initials = name.replace('.', '').split('.')[0]
  return (
    <div
      className="flex-shrink-0 w-[300px] md:w-[340px] flex flex-col p-5 rounded-2xl mx-2"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(72,144,247,0.12)',
      }}
    >
      <Stars />
      <p
        className="text-sm leading-relaxed mt-3 flex-1"
        style={{ color: 'var(--text-primary)', opacity: 0.82 }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div
        className="flex items-center justify-between gap-3 mt-4 pt-4"
        style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
            style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.2)', color: 'var(--blue)' }}
          >
            {initials}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
              {name}, {age}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'rgba(72,144,247,0.6)' }}>{city}</p>
          </div>
        </div>
        <span
          className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-sm flex-shrink-0"
          style={{ color: 'var(--blue)', background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.14)' }}
        >
          {program}
        </span>
      </div>
    </div>
  )
}

function MarqueeRow({ reviews, reverse = false }: { reviews: typeof REVIEWS; reverse?: boolean }) {
  const doubled = [...reviews, ...reviews]
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `marqueeX${reverse ? 'Rev' : ''} ${reverse ? 55 : 45}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsMarquee() {
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)', paddingTop: '96px', paddingBottom: '96px' }}
      aria-label="Patient experiences"
    >
      <style>{`
        @keyframes marqueeX { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeXRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marqueeX { from { transform: none } to { transform: none } }
          @keyframes marqueeXRev { from { transform: none } to { transform: none } }
        }
      `}</style>

      {/* Heading */}
      <div ref={headingRef} className="container-tight mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Patient Experiences
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="display-heading mx-auto max-w-xl"
          style={{ fontSize: 'clamp(30px, 3.5vw, 50px)' }}
        >
          Real patients.{' '}
          <span style={{ color: 'var(--blue)' }}>Real outcomes.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.15)' }}
        >
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 10 10" fill="#4890f7" className="w-2.5 h-2.5" aria-hidden="true">
                <path d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37z" />
              </svg>
            ))}
          </span>
          <span className="text-[11px] font-semibold" style={{ color: 'var(--blue)' }}>4.9 average · 1,400+ patients</span>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="flex flex-col gap-3"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <MarqueeRow reviews={ROW_A} reverse={false} />
        <MarqueeRow reviews={ROW_B} reverse={true} />
      </motion.div>

      <p
        className="text-[10px] text-center mt-10"
        style={{ color: '#d1d5db' }}
      >
        Names abbreviated. Individual experiences vary.
      </p>
    </section>
  )
}
