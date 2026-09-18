'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const
const PORTAL = 'https://app.apexmetabolichealth.com.au/login'

const POINTS = [
  { t: 'One next step, always', d: 'The dashboard opens on the single thing to do now, with a date.' },
  { t: 'Results with a score', d: 'Every marker grouped by system, one Apex score, trended per retest.' },
  { t: 'Orders tracked to the door', d: 'Placed, with pharmacy, dispensed, on its way, delivered.' },
  { t: 'Repeats without a call', d: 'Stable patients answer six questions; the doctor reviews in a business day.' },
]

const ROWS = [
  { when: 'Thu 24 Sep', title: 'Doctor call, 9:30am', state: 'Scheduled' },
  { when: 'Mon 5 Oct', title: 'Protocol delivered', state: 'On its way' },
  { when: 'Dec', title: 'Repeat bloods', state: 'Coming up' },
]

/**
 * PROVE, part two: the portal itself. A drawn phone with a mock dashboard
 * (the real one needs a login) beside a photograph, so the visitor sees the
 * product they are signing up for before the price.
 */
export default function PortalPeek() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yPhoto = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const yPhone = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -30])
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="portal" className="band-light section-y overflow-hidden" aria-label="Your portal">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-center">

          <div>
            <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>Your portal</motion.p>
            <RevealText as="h2" className="t-h2" style={{ marginBottom: 22, maxWidth: '14ch' }} text="One place. Every step, every result." />
            <motion.p {...reveal(0.25, 14)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '50ch', marginBottom: 28 }}>
              Intake, bloods, the call, the protocol and every review live in one account. Nothing is buried in email.
            </motion.p>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {POINTS.map((pt, i) => (
                <motion.li key={pt.t} {...reveal(0.3 + i * 0.08, 14)} className="flex items-start gap-3">
                  <span className="t-readout flex-shrink-0 mt-0.5" style={{ fontSize: 16, color: 'var(--blue)', minWidth: 26 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-[15px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{pt.t}</span>
                    <span className="block text-[14px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{pt.d}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.a {...reveal(0.7)} href={PORTAL} className="link-draw inline-block mt-8 text-[15px] font-medium" style={{ color: 'var(--color-accent-fg)' }}>
              Browse the portal as a guest
            </motion.a>
          </div>

          <div className="relative" style={{ minHeight: 560 }}>
            {/* Photograph behind, phone in front. */}
            <motion.div style={{ y: yPhoto }} initial={reduced ? false : { opacity: 0, scale: 1.04 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.1, ease }} className="absolute rounded-[28px] overflow-hidden" aria-hidden="true" >
              <div style={{ width: 'min(520px, 78vw)', aspectRatio: '3 / 2', position: 'relative' }}>
                <Image src="/photos/man-balcony-call.webp" alt="" fill sizes="520px" className="object-cover" />
              </div>
            </motion.div>

            <motion.div
              style={{ y: yPhone, top: 120, width: 'min(300px, 62vw)' }}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="absolute right-0 lg:right-6"
              aria-label="A sample of the patient dashboard"
            >
              <div className="rounded-[40px] p-[10px]" style={{ background: '#0f172a', boxShadow: '0 50px 100px rgba(15,23,42,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset' }}>
                <div className="rounded-[32px] overflow-hidden mesh-blue" style={{ aspectRatio: '9 / 19', position: 'relative' }}>
                  <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-2.5 rounded-full" style={{ width: 84, height: 24, background: '#0f172a' }} />
                  <div className="absolute inset-0 flex flex-col gap-2.5" style={{ padding: '48px 12px 12px' }}>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>Good morning, James</span>
                      <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>Member</span>
                    </div>
                    <div className="glass-card" style={{ padding: 12, borderRadius: 18 }}>
                      <span className="t-mono block" style={{ fontSize: 9.5, color: 'var(--color-accent-fg)' }}>Next step · Thu 24 Sep</span>
                      <span className="block text-[13px] font-semibold mt-1 leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Your doctor call, 9:30am</span>
                      <span className="block text-[10.5px] mt-1" style={{ color: 'var(--text-secondary)' }}>Results are in and reviewed. Nothing to prepare.</span>
                      <span className="inline-block mt-2.5 text-[10px] font-semibold rounded-full" style={{ background: 'var(--blue)', color: '#fff', padding: '6px 10px' }}>Join the call</span>
                    </div>
                    <div className="glass-card flex items-center gap-3" style={{ padding: 12, borderRadius: 18 }}>
                      <div className="relative flex-shrink-0" style={{ width: 54, height: 54 }}>
                        <svg viewBox="0 0 54 54" className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="27" cy="27" r="23" fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="5" />
                          <circle cx="27" cy="27" r="23" fill="none" stroke="var(--blue)" strokeWidth="5" strokeLinecap="round" strokeDasharray="144.5" strokeDashoffset={144.5 * 0.28} style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center t-readout" style={{ fontSize: 18, color: 'var(--text-primary)' }}>72</span>
                      </div>
                      <div>
                        <span className="t-mono block" style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>Apex score</span>
                        <span className="block text-[11px] font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>Trended per retest</span>
                        <span className="block text-[9.5px]" style={{ color: 'var(--text-secondary)' }}>From 38 markers</span>
                      </div>
                    </div>
                    <div className="glass-card" style={{ padding: '6px 12px', borderRadius: 18 }}>
                      {ROWS.map((r, i) => (
                        <div key={r.title} className="flex items-center justify-between py-2" style={{ borderTop: i ? '1px solid rgba(15,23,42,0.06)' : 'none' }}>
                          <span>
                            <span className="block text-[10.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{r.title}</span>
                            <span className="t-mono block" style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>{r.when}</span>
                          </span>
                          <span className="t-mono" style={{ fontSize: 9.5, color: 'var(--color-accent-fg)' }}>{r.state}</span>
                        </div>
                      ))}
                    </div>
                    <p className="t-mono m-0 mt-auto text-center" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' }}>Sample dashboard, invented values</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
