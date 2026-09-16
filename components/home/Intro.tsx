'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * INTRODUCE. One statement about what the clinic is, beside a small collage
 * of process stills that overlap the text column. Light band: the first
 * contrast break after the dark hero.
 */
export default function Intro() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30])
  const yB = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -50])
  const yC = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-20, 30])

  const reveal = (delay: number, y = 22) =>
    reduced
      ? { initial: false as const }
      : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="clinic" className="band-light section-y overflow-hidden" aria-label="The clinic">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-14 lg:gap-24 items-center">

          <div>
            <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 22 }}>The clinic</motion.p>
            <motion.h2 {...reveal(0.06)} className="t-h2" style={{ marginBottom: 28, maxWidth: '16ch' }}>
              Medicine for the gap between &ldquo;normal&rdquo; and well.
            </motion.h2>
            <motion.p {...reveal(0.14, 16)} className="t-lead" style={{ color: 'var(--text-secondary)', maxWidth: '52ch', marginBottom: 22 }}>
              Standard pathology is built to find disease. It is not built to explain why you are tired, flat, or slow to recover.
            </motion.p>
            <motion.p {...reveal(0.2, 16)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '58ch', marginBottom: 36 }}>
              Apex runs the panels a GP does not order, reads them for function rather than disease, and puts an AHPRA-registered doctor on the phone to build your protocol. Everything runs online, anywhere in Australia.
            </motion.p>

            <motion.ul {...reveal(0.28, 12)} className="list-none p-0 m-0 flex flex-col gap-3">
              {[
                'Doctor-led, always. Never a health coach.',
                'Full panels, read for how you function.',
                'Structured reviews every three months.',
              ].map(line => (
                <li key={line} className="flex items-start gap-3 text-[15px]" style={{ color: 'var(--text-primary)' }}>
                  <span className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--blue)' }} aria-hidden="true" />
                  {line}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Collage: three process stills, one large and two overlapping. */}
          <div className="relative mt-6 lg:mt-0" style={{ paddingBottom: "10%", paddingTop: "6%" }}>
            <motion.div
              style={{ y: yA }}
              initial={reduced ? false : { opacity: 0, scale: 1.04 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease }}
              className="relative rounded-2xl overflow-hidden"
              aria-hidden="true"
            >
              <Image src="/photos/consult-room.webp" alt="" width={1920} height={1280} sizes="(min-width: 1024px) 480px, 100vw" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover' }} />
            </motion.div>

            <motion.figure
              style={{ y: yB, left: '2%', bottom: '0%', width: '46%', margin: 0 }}
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="absolute rounded-xl overflow-hidden"
              aria-hidden="true"
            >
              <Image src="/photos/hands-results.webp" alt="" width={1920} height={1280} sizes="260px" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '3 / 2', objectFit: 'cover', boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }} />
            </motion.figure>

            <motion.figure
              style={{ y: yC, right: '-4%', top: '0%', width: '36%', margin: 0 }}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              className="absolute rounded-xl overflow-hidden hidden md:block"
              aria-hidden="true"
            >
              <Image src="/photos/phone-desk.webp" alt="" width={1920} height={1280} sizes="200px" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1 / 1', objectFit: 'cover', boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }} />
            </motion.figure>
          </div>

        </div>
      </div>
    </section>
  )
}
