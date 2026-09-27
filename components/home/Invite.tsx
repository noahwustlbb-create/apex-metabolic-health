'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * INVITE. The page ends where it began: the same pale figure, the scanner
 * ring settled at the heart, one line and one button.
 */
export default function Invite() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reveal = (delay: number, y = 20) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.75, delay, ease } }

  return (
    <section ref={ref} id="cta" className="band-light invite" aria-label="Get started">
      <div className="container-x invite-grid">
        <div className="invite-copy">
          <RevealText as="h2" className="t-display" style={{ marginBottom: 24 }} segments={[{ text: 'Stop guessing.' }, { text: 'Start measuring.', accent: true }]} />
          <motion.p {...reveal(0.3)} className="t-lead" style={{ color: 'var(--text-secondary)', maxWidth: '36ch', margin: '0 0 36px' }}>
            Two minutes to start. Bloods near you, then a doctor with your results open. No GP referral.
          </motion.p>
          <motion.div {...reveal(0.4)} className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/start" className="btn-primary btn-lg group">
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/discovery-call" className="link-draw text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
              Prefer to talk first? Book a free call
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="invite-figure"
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.15, ease }}
        >
          <Image src="/photos/anatomy.webp" alt="" fill sizes="(min-width: 1024px) 420px, 0px" className="object-contain object-top hero-ghost" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="invite-ring">
            <ellipse cx="50" cy="36" rx="58" ry="5.5" fill="none" stroke="rgba(29,79,216,0.35)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="invite-dot" />
        </motion.div>
      </div>
    </section>
  )
}
