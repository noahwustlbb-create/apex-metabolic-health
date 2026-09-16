'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * INVITE. Mirrors the hero: one photograph, one line, one button. The page
 * ends where it began, with the next step in the middle of the frame.
 */
export default function Invite() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])
  const reveal = (delay: number, y = 24) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.75, delay, ease } }

  return (
    <section ref={ref} id="cta" className="band-dark relative overflow-hidden" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center' }} aria-label="Get started">
      <motion.div style={{ y }} className="absolute inset-[-10%]" aria-hidden="true">
        <Image src="/photos/ocean-dawn.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 60%' }} />
      </motion.div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,13,18,0.92) 0%, rgba(11,13,18,0.45) 45%, rgba(11,13,18,0.7) 100%)' }} aria-hidden="true" />

      <div className="container-x relative z-10 section-y">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 {...reveal(0, 32)} className="t-display" style={{ marginBottom: 24 }}>
            Your biology.
            <br />
            <span style={{ color: 'var(--blue)' }}>Measured properly.</span>
          </motion.h2>
          <motion.p {...reveal(0.12, 18)} className="t-lead mx-auto" style={{ color: 'rgba(242,244,247,0.8)', maxWidth: '40ch', marginBottom: 40 }}>
            Two minutes to start. A doctor within days. No GP referral.
          </motion.p>
          <motion.div {...reveal(0.22, 14)} className="flex flex-col items-center gap-6">
            <Link href="/start" className="btn-primary" style={{ fontSize: 15, padding: '18px 40px', borderRadius: 999 }}>
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/discovery-call" className="link-draw text-[14px]" style={{ color: 'rgba(242,244,247,0.75)' }}>
              Prefer to talk first? Book a free call
            </Link>
          </motion.div>
          <motion.p {...reveal(0.5)} className="text-[13px] leading-relaxed mt-16 m-0" style={{ color: 'rgba(242,244,247,0.55)' }}>
            Most people who book with us have been told by at least one doctor that their results look fine. We look further.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
