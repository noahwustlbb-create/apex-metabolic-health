'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

/** Illustrative only. Groups mirror the panel; values are a made-up sample and say so. */
const GROUPS = [
  { name: 'Hormones',     n: 9,  state: 'Reviewed',   pct: 72 },
  { name: 'Thyroid',      n: 3,  state: 'In range',   pct: 90 },
  { name: 'Metabolic',    n: 6,  state: 'Flagged',    pct: 48 },
  { name: 'Lipids',       n: 5,  state: 'In range',   pct: 84 },
  { name: 'Liver, kidney',n: 8,  state: 'In range',   pct: 88 },
  { name: 'Nutrients',    n: 6,  state: 'Flagged',    pct: 55 },
]

/**
 * PROVE, shown rather than told: what the report looks like once the doctor
 * has read it. A white glass dashboard on a defocused portrait, tilting
 * toward the cursor. Every number is labelled a sample.
 */
export default function ReportPreview() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 80, damping: 18 })
  const sry = useSpring(ry, { stiffness: 80, damping: 18 })
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -6)
  }
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="report" className="band-light section-y relative overflow-hidden" aria-label="What your report looks like">
      <div aria-hidden="true" className="absolute inset-0">
        <Image src="/photos/blur-man.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 30%', opacity: 0.55 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.35) 70%, #fff 100%)' }} />
      </div>

      <div className="container-x relative">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>What you get back</motion.p>
          <RevealText as="h2" className="t-h2" style={{ marginBottom: 20 }} text="Your numbers, read for how you function." />
          <motion.p {...reveal(0.3, 14)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '52ch' }}>
            Every marker grouped by system, flagged where it matters, and explained by your doctor on the call. This is a sample layout, not a patient.
          </motion.p>
        </div>

        <motion.div
          onPointerMove={onMove}
          onPointerLeave={() => { rx.set(0); ry.set(0) }}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 1400, padding: 'clamp(18px, 3vw, 32px)', borderRadius: 32 }}
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="glass-card grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8"
        >
          {/* Score */}
          <div className="rounded-[24px] flex flex-col justify-between" style={{ background: 'linear-gradient(160deg, rgba(196,226,210,0.7) 0%, rgba(184,214,250,0.6) 100%)', padding: 24, minHeight: 300 }}>
            <div className="flex items-center justify-between">
              <span className="t-mono" style={{ color: 'var(--text-secondary)' }}>Apex score</span>
              <span className="t-mono px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.8)', color: '#15803d', fontSize: 9.5 }}>Sample</span>
            </div>
            <div className="relative mx-auto my-4" style={{ width: 168, height: 168 }}>
              <svg viewBox="0 0 168 168" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <circle cx="84" cy="84" r="74" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="8" />
                <motion.circle cx="84" cy="84" r="74" fill="none" stroke="var(--blue)" strokeWidth="8" strokeLinecap="round" strokeDasharray="465" initial={reduced ? { strokeDashoffset: 465 * 0.28 } : { strokeDashoffset: 465 }} animate={inView ? { strokeDashoffset: 465 * 0.28 } : {}} transition={{ duration: 1.4, delay: 0.5, ease }} style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="t-readout" style={{ fontSize: 56, color: 'var(--text-primary)' }}>72</span>
                <span className="t-mono mt-1" style={{ color: 'var(--text-secondary)', fontSize: 9.5 }}>of 100</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full" style={{ background: 'rgba(255,255,255,0.85)', padding: '8px 12px' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} aria-hidden="true" />
              <span className="text-[12.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>Reviewed by your doctor</span>
            </div>
          </div>

          {/* Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GROUPS.map((g, i) => (
              <motion.div key={g.name} {...reveal(0.4 + i * 0.07, 12)} className="rounded-[20px] flex flex-col justify-between" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(15,23,42,0.06)', padding: '16px 18px', minHeight: 120 }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="block text-[14px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{g.name}</span>
                    <span className="t-mono block mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>{g.n} markers</span>
                  </div>
                  <span className="t-mono px-2 py-1 rounded-full" style={{ fontSize: 9, background: g.state === 'Flagged' ? 'rgba(245,158,11,0.14)' : 'rgba(34,197,94,0.12)', color: g.state === 'Flagged' ? '#b45309' : '#15803d' }}>{g.state}</span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="t-readout" style={{ fontSize: 26, color: 'var(--text-primary)' }}>{g.pct}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(15,23,42,0.08)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: g.state === 'Flagged' ? '#f59e0b' : 'var(--blue)' }} initial={reduced ? { width: `${g.pct}%` } : { width: 0 }} animate={inView ? { width: `${g.pct}%` } : {}} transition={{ duration: 0.9, delay: 0.6 + i * 0.07, ease }} />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div {...reveal(0.85, 12)} className="sm:col-span-2 rounded-[20px]" style={{ background: 'rgba(15,23,42,0.04)', padding: '16px 18px' }}>
              <span className="t-mono block mb-2" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Doctor’s note, sample</span>
              <p className="m-0 text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                “Two metabolic markers sit outside the functional range. We will talk through what they mean on the call before deciding anything.”
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.p {...reveal(0.6)} className="text-[12.5px] leading-relaxed mt-6 m-0" style={{ color: 'var(--text-muted)', maxWidth: '70ch' }}>
          Sample layout with invented values. Your report is written by your doctor from your own results. A consultation never guarantees a prescription.
        </motion.p>
      </div>
    </section>
  )
}
