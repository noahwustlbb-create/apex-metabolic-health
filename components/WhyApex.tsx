'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

// Split layout: label, statement, one line, proof list | one large visual.
// The photo reveals with a clip wipe from the right and a slow settle of
// scale, which no other section on the page does. Rows stagger in after it.

const DIFFERENTIATORS = [
  {
    title: 'Doctor-led, always',
    description: 'Every consultation is with an AHPRA-registered medical practitioner. Not a nurse practitioner, not a health coach.',
  },
  {
    title: 'Advanced diagnostics',
    description: 'Standard panels rule out disease. Ours show how you function: the markers GPs do not order, read for optimisation.',
  },
  {
    title: 'Accredited compounding pharmacy',
    description: 'Scripts filled by a TGA-compliant Australian pharmacy. No grey-market suppliers, no unregulated imports.',
  },
  {
    title: 'Ongoing biological oversight',
    description: 'The first consult is the start. Structured reviews every three months, adjustments from your data, support in between.',
  },
]

export default function WhyApex() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const reveal = (delay: number, y = 22) =>
    prefersReduced
      ? { initial: false as const }
      : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.65, delay, ease } }

  return (
    <section
      id="why-apex"
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)' }}
      aria-label="Why Apex"
    >
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_7fr] gap-12 lg:gap-20 items-center">

          {/* Copy */}
          <div>
            <motion.p
              {...reveal(0, 12)}
              className="text-[11px] font-semibold uppercase mb-5"
              style={{ letterSpacing: '0.16em', color: 'var(--blue)', fontFamily: 'var(--font-space-grotesk)' }}
            >
              Why Apex
            </motion.p>
            <motion.h2
              {...reveal(0.06)}
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(32px, 3.5vw, 56px)' }}
            >
              Medicine that goes further.
            </motion.h2>
            <motion.p
              {...reveal(0.14, 16)}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)', maxWidth: '50ch' }}
            >
              A GP manages disease. A wellness brand sells supplements. We build clinical protocols around your biology, with real doctors, real diagnostics, and ongoing oversight.
            </motion.p>

            <ol className="list-none p-0 m-0" style={{ borderTop: '1px solid var(--border)' }}>
              {DIFFERENTIATORS.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={prefersReduced ? false : { opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: 0.3 + i * 0.09, ease }}
                  className="grid grid-cols-[28px_1fr] gap-4 py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <span className="text-[11px] font-semibold pt-1" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.08em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold leading-snug" style={{ fontSize: 'clamp(15px, 1.3vw, 17px)', color: 'var(--text-primary)' }}>{item.title}</h3>
                    <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Visual: the team, real, in the clinic. Clip-wipe reveal. */}
          <motion.div
            className="relative"
            initial={prefersReduced ? false : { clipPath: 'inset(0 0 0 100%)', scale: 1.06 }}
            animate={inView ? { clipPath: 'inset(0 0 0 0%)', scale: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { clipPath: { duration: 0.9, ease }, scale: { duration: 1.6, ease } }}
            style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 40px 90px rgba(0,0,0,0.28)' }}
          >
            <Image
              src="/team/team-standing.webp"
              alt="The Apex care team in the clinic"
              width={1024}
              height={1280}
              sizes="(min-width: 1024px) 620px, 100vw"
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover' }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(10,14,26,0.55) 100%)' }}
            />
            <motion.div
              {...reveal(0.7, 10)}
              className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4"
            >
              <p className="text-white text-sm font-semibold leading-snug" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
                Apex care team, Gold Coast
              </p>
              <span className="text-[10px] font-semibold uppercase text-white/80" style={{ letterSpacing: '0.14em', fontFamily: 'var(--font-space-grotesk)' }}>
                100% online · Australia-wide
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
