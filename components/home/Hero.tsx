'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'
import Magnetic from '@/components/motion/Magnetic'
import AgeNotice from '@/components/AgeNotice'
import AnatomyFigure from '@/components/home/AnatomyFigure'
import { START_TOTAL_STEPS } from '@/lib/startFunnel'

const ease = [0.22, 1, 0.36, 1] as const

/** The first funnel question, asked on the page. Each answer maps to a /start pathway. */
const WHY = [
  { id: 'energy',   label: 'Low energy',         t: 'hormone' },
  { id: 'weight',   label: 'Weight that won’t move', t: 'weight' },
  { id: 'libido',   label: 'Libido or performance', t: 'sexual' },
  { id: 'recovery', label: 'Slow recovery',      t: 'recovery' },
  { id: 'ageing',   label: 'Ageing well',        t: 'longevity' },
  { id: 'unsure',   label: 'Not sure yet',       t: 'general' },
]

/**
 * HOOK. One question in the headline, one question the visitor can answer
 * right here. The answer carries into the assessment, so the page starts
 * the funnel instead of pointing at it. Right: the anatomy figure.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const router = useRouter()
  const ref = useRef<HTMLElement>(null)
  const [picked, setPicked] = useState<string | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  const choose = (w: (typeof WHY)[number]) => {
    setPicked(w.id)
    window.setTimeout(() => router.push(`/start?t=${w.t}&why=${w.id}`), 260)
  }

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Introduction"
    >
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-20%', width: 900, height: 900, background: 'radial-gradient(circle at center, rgba(72,144,247,0.14) 0%, rgba(72,144,247,0.04) 38%, transparent 62%)', filter: 'blur(20px)' }} />

      <div className="container-x relative" style={{ paddingTop: 'clamp(112px, 14vh, 160px)', paddingBottom: 'clamp(56px, 8vh, 104px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">

          <div className="relative z-10">
            <p className="t-mono hero-in" style={{ animationDelay: '0ms', color: 'var(--text-muted)', marginBottom: 22 }}>
              Doctor-led telehealth · Australia-wide · No GP referral
            </p>

            <RevealText
              as="h1"
              className="t-display"
              style={{ marginBottom: 22 }}
              delay={0.1}
              segments={[{ text: 'Tired, flat, and told' }, { text: 'you’re fine?', accent: true }]}
            />

            <p className="t-lead hero-in" style={{ animationDelay: '420ms', color: 'var(--text-secondary)', maxWidth: '46ch', marginBottom: 30 }}>
              A standard panel is built to find disease, not to explain how you feel. Apex runs the full hormone and metabolic panel, an AHPRA-registered doctor reads it with you, and your protocol is built on those numbers.
            </p>

            {/* The first question, answered on the page. */}
            <div className="hero-in glass-card" style={{ animationDelay: '520ms', padding: '18px 18px 16px', borderRadius: 22, marginBottom: 26, maxWidth: 560 }}>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <p className="m-0 text-[14.5px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>What brings you here?</p>
                <span className="t-mono" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Step 1 of {START_TOTAL_STEPS}</span>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="What brings you here">
                {WHY.map(w => {
                  const on = picked === w.id
                  return (
                    <motion.button
                      key={w.id}
                      type="button"
                      onClick={() => choose(w)}
                      whileTap={reduced ? undefined : { scale: 0.96 }}
                      animate={picked && !on ? { opacity: 0.45 } : { opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-[13.5px] font-medium rounded-full transition-colors duration-200"
                      style={{ padding: '10px 15px', background: on ? 'var(--text-primary)' : '#fff', color: on ? '#fff' : 'var(--text-primary)', border: `1px solid ${on ? 'var(--text-primary)' : 'var(--border)'}`, cursor: 'pointer', boxShadow: on ? '0 10px 24px rgba(15,23,42,0.18)' : '0 1px 2px rgba(15,23,42,0.05)' }}
                      aria-pressed={on}
                    >
                      {w.label}
                    </motion.button>
                  )
                })}
              </div>
              <p className="m-0 mt-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>Pick one to start. Two minutes, no payment, no referral.</p>
            </div>

            <div className="hero-in flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: '600ms', marginBottom: 24 }}>
              <Magnetic>
                <Link href="/start" className="btn-primary" style={{ fontSize: 15, padding: '18px 36px', borderRadius: 999 }}>
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <a href="#pathway" className="link-draw text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
                See how it works
              </a>
            </div>

            <AgeNotice />
          </div>

          <div className="relative lg:pl-4">
            <AnatomyFigure sx={sx} sy={sy} />
          </div>

        </div>
      </div>
    </section>
  )
}
