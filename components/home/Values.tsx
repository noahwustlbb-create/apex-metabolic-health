'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * The pause. A portrait and a short statement about how the clinic listens.
 * Connection, not conversion: no button, one quiet link.
 */
export default function Values() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="who-we-are" className="band-light section-y overflow-hidden" aria-label="Who we are">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24 items-center">

          <motion.div
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)', scale: 1.05 }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)', scale: 1 } : {}}
            transition={reduced ? { duration: 0 } : { clipPath: { duration: 1.0, ease }, scale: { duration: 1.6, ease } }}
            className="relative rounded-2xl overflow-hidden order-1"
            style={{ aspectRatio: '4 / 5' }}
          >
            <Image src="/photos/portrait-man.webp" alt="An Apex patient" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </motion.div>

          <div className="order-2">
            <motion.p {...reveal(0.1, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>Who we are</motion.p>
            <motion.h2 {...reveal(0.16)} className="t-h2" style={{ marginBottom: 26, maxWidth: '15ch' }}>
              Behind the science, people who actually listen.
            </motion.h2>
            <motion.p {...reveal(0.24, 16)} className="t-lead" style={{ color: 'var(--text-secondary)', maxWidth: '50ch', marginBottom: 20 }}>
              You have spent years being told your numbers are normal. Apex is a doctor-led team that treats how you feel as data too, pairing advanced diagnostics with clinicians who take the time to interpret them properly.
            </motion.p>
            <motion.p {...reveal(0.3, 16)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '54ch', marginBottom: 32 }}>
              Clinical rigour, minus the cold. Everything runs online, on your schedule, anywhere in Australia.
            </motion.p>
            <motion.div {...reveal(0.36, 10)}>
              <Link href="/about" className="link-draw text-[15px] font-medium" style={{ color: 'var(--color-accent-fg)' }}>
                About the clinic
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
