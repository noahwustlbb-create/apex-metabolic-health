'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

/** Readouts: the four facts a visitor can check, each as a dotted numeral. */
const READOUTS = [
  { n: '40+',  label: 'Markers on the panel',   sub: 'Hormone, thyroid, metabolic, lipids, liver, kidney, nutrients' },
  { n: '48h',  label: 'Results back',           sub: 'From most accredited collection centres' },
  { n: '01',   label: 'Doctor, start to finish', sub: 'AHPRA-registered, on the phone with your results open' },
  { n: '90d',  label: 'Between reviews',        sub: 'Repeat bloods, protocol adjusted to the numbers' },
]

/**
 * INTRODUCE. One statement about the clinic beside four readout cards that
 * drift at different speeds. The cards are the proof; the copy is the why.
 */
export default function Intro() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40])
  const yB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -30])
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="clinic" className="band-light section-y overflow-hidden" aria-label="The clinic">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-14 lg:gap-20 items-center">

          <div>
            <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 22 }}>The clinic</motion.p>
            <RevealText as="h2" className="t-h2" style={{ marginBottom: 28, maxWidth: '16ch' }} text="Medicine for the gap between “normal” and well." />
            <motion.p {...reveal(0.14, 16)} className="t-lead" style={{ color: 'var(--text-secondary)', maxWidth: '52ch', marginBottom: 22 }}>
              Standard pathology is built to find disease. It is not built to explain why you are tired, flat, or slow to recover.
            </motion.p>
            <motion.p {...reveal(0.2, 16)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '58ch', marginBottom: 36 }}>
              Apex runs the panels a GP does not usually order, reads them for function rather than disease, and puts an AHPRA-registered doctor on the phone to build your protocol. Everything runs online, anywhere in Australia.
            </motion.p>
            <motion.ul {...reveal(0.28, 12)} className="list-none p-0 m-0 flex flex-col gap-3">
              {['Doctor-led, always. Never a health coach.', 'Full panels, read for how you function.', 'Structured reviews every three months.'].map(line => (
                <li key={line} className="flex items-start gap-3 text-[15px]" style={{ color: 'var(--text-primary)' }}>
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} aria-hidden="true" />
                  {line}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="relative mesh rounded-[32px]" style={{ padding: 'clamp(16px, 2.4vw, 28px)' }}>
            <div className="grid grid-cols-2 md:grid-cols-[0.9fr_1fr_1fr] gap-3 md:gap-4">
              <motion.div
                style={{ y: yA, minHeight: 220 }}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.1, ease }}
                className="relative col-span-2 md:col-span-1 md:row-span-2 rounded-[22px] overflow-hidden"
              >
                <Image src="/photos/man-kitchen-dawn.webp" alt="A man at his kitchen bench at dawn with a glass of water" fill sizes="(min-width: 768px) 240px, 100vw" className="object-cover" style={{ objectPosition: '55% 30%' }} />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 p-4" style={{ background: 'linear-gradient(180deg, transparent, rgba(15,23,42,0.45))' }}>
                  <span className="t-mono text-white/90" style={{ fontSize: 9.5 }}>05:52 · Told his bloods were normal</span>
                </div>
              </motion.div>
              {READOUTS.map((r, i) => (
                <motion.div
                  key={r.n}
                  style={{ y: i % 2 ? yB : yA }}
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease }}
                  className={`glass-card ${!reduced ? `float-${['a', 'b', 'c', 'a'][i]}` : ''}`}
                >
                  <div style={{ padding: 'clamp(18px, 2vw, 26px)' }}>
                    <span className="t-readout block" style={{ fontSize: 'clamp(40px, 4.5vw, 60px)', color: 'var(--text-primary)' }}>{r.n}</span>
                    <span className="block mt-3 text-[14px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{r.label}</span>
                    <span className="block mt-1 text-[12.5px] leading-snug" style={{ color: 'var(--text-secondary)' }}>{r.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
