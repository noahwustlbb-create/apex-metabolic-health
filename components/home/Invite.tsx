'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'
import Magnetic from '@/components/motion/Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * INVITE. Mirrors the hero: one line, one button, in a soft panel with two
 * slow blue glows drifting behind it. The page ends where it began.
 */
export default function Invite() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const g1 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [80, -80])
  const g2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-60, 60])
  const reveal = (delay: number, y = 24) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.75, delay, ease } }

  return (
    <section ref={ref} id="cta" className="section-y" style={{ background: 'var(--bg)' }} aria-label="Get started">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px]" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', padding: 'clamp(64px, 9vw, 140px) clamp(24px, 6vw, 96px)' }}>
          <motion.div aria-hidden="true" style={{ y: g1 }} className="absolute pointer-events-none" >
            <div style={{ position: 'absolute', left: -140, top: -260, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,144,247,0.22) 0%, rgba(72,144,247,0.06) 45%, transparent 68%)', filter: 'blur(10px)' }} />
          </motion.div>
          <motion.div aria-hidden="true" style={{ y: g2 }} className="absolute pointer-events-none right-0 bottom-0">
            <div style={{ position: 'absolute', right: -200, bottom: -300, width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,144,247,0.18) 0%, rgba(72,144,247,0.05) 45%, transparent 68%)', filter: 'blur(12px)' }} />
          </motion.div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="relative max-w-3xl text-center lg:text-left">
            <RevealText as="h2" className="t-display" style={{ marginBottom: 24 }} segments={[{ text: 'Stop guessing.' }, { text: 'Start measuring.', accent: true }]} />
            <motion.p {...reveal(0.35, 18)} className="t-lead mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '40ch', marginBottom: 40 }}>
              Two minutes to start. A doctor within days. No GP referral.
            </motion.p>
            <motion.div {...reveal(0.45, 14)} className="flex flex-col items-center lg:items-start gap-6">
              <Magnetic>
                <Link href="/start" className="btn-primary" style={{ fontSize: 15, padding: '18px 40px', borderRadius: 999 }}>
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <Link href="/discovery-call" className="link-draw text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                Prefer to talk first? Book a free call
              </Link>
            </motion.div>
            <motion.p {...reveal(0.7)} className="text-[13px] leading-relaxed mt-14 m-0" style={{ color: 'var(--text-muted)' }}>
              Most people who book with us have been told by at least one doctor that their results look fine. We look further.
            </motion.p>
          </div>
          <motion.div {...reveal(0.3, 30)} className="relative rounded-[24px] overflow-hidden hidden lg:block" style={{ aspectRatio: '4 / 5', boxShadow: '0 30px 60px rgba(15,23,42,0.16)' }} aria-hidden="true">
            <Image src="/photos/hero-window-woman.webp" alt="" fill sizes="360px" className="object-cover" style={{ objectPosition: '50% 35%' }} />
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
