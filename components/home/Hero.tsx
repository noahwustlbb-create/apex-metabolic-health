'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'
import Magnetic from '@/components/motion/Magnetic'
import AgeNotice from '@/components/AgeNotice'

const ease = [0.22, 1, 0.36, 1] as const

const CHIPS = [
  { id: 'bloods', label: 'Results in 48 hours', sub: 'Accredited pathology', pos: { left: '-8%', top: '14%' }, depth: 1.0, delay: 0.55 },
  { id: 'doctor', label: 'AHPRA-registered doctor', sub: 'Phone or video', pos: { right: '-7%', top: '46%' }, depth: 1.6, delay: 0.7 },
  { id: 'centres', label: '4,000+ collection centres', sub: 'Australia-wide', pos: { left: '6%', bottom: '8%' }, depth: 1.25, delay: 0.85 },
]

/**
 * HOOK. White page, one headline, one button, and a framed photograph with
 * three facts floating over it. The chips drift with the cursor at
 * different depths; on a phone they hover in place.
 *
 * The frame (`#hero-anatomy-slot`) is where the interactive human-anatomy
 * piece goes once the reference lands; the photograph is its stand-in.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const frameX = useTransform(sx, v => v * -6)
  const frameY = useTransform(sy, v => v * -6)

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2)
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
      {/* Ambient glow: the only colour on the canvas. */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-20%', width: 900, height: 900, background: 'radial-gradient(circle at center, rgba(72,144,247,0.16) 0%, rgba(72,144,247,0.05) 38%, transparent 62%)', filter: 'blur(20px)' }} />

      <div className="container-x relative" style={{ paddingTop: 'clamp(120px, 15vh, 168px)', paddingBottom: 'clamp(56px, 8vh, 104px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">

          <div className="relative z-10">
            <p className="t-mono hero-in" style={{ animationDelay: '0ms', color: 'var(--text-muted)', marginBottom: 22 }}>
              Doctor-led telehealth · Australia-wide · No GP referral
            </p>

            <RevealText
              as="h1"
              className="t-display"
              style={{ marginBottom: 26 }}
              delay={0.1}
              segments={[{ text: 'Your biology isn’t broken.' }, { text: 'It isn’t being measured.', accent: true }]}
            />

            <p className="t-lead hero-in" style={{ animationDelay: '420ms', color: 'var(--text-secondary)', maxWidth: '46ch', marginBottom: 36 }}>
              Hormone and metabolic care for adults who already know something is off. A full panel, an AHPRA-registered doctor, and a protocol built on your numbers.
            </p>

            <div className="hero-in flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: '540ms', marginBottom: 28 }}>
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

            <p className="hero-in text-[12.5px] leading-relaxed" style={{ animationDelay: '640ms', color: 'var(--text-muted)', letterSpacing: '0.02em', marginBottom: 20 }}>
              Two-minute assessment · Bloods within 48 hours · Consult by phone or video
            </p>

            <AgeNotice />
          </div>

          {/* The frame and its floating facts. */}
          <div className="relative lg:pl-6" id="hero-anatomy-slot">
            <motion.div
              style={{ x: frameX, y: frameY, aspectRatio: '4 / 5', boxShadow: '0 40px 90px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.04)' }}
              initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
              className="relative rounded-[28px] overflow-hidden"
            >
              <Image src="/photos/hero-window-portrait.webp" alt="A patient at a window at dawn" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover hero-drift" style={{ objectPosition: '50% 30%' }} />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.35) 100%)' }} />
              <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-4">
                <p className="text-white text-[13px] font-medium m-0" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>Told your bloods are normal. Still not right.</p>
                <span className="t-mono text-white/80" style={{ fontSize: 9.5 }}>Gold Coast · 05:52</span>
              </div>
            </motion.div>

            {CHIPS.map(c => (
              <FloatingChip key={c.id} chip={c} sx={sx} sy={sy} reduced={!!reduced} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function FloatingChip({ chip, sx, sy, reduced }: { chip: (typeof CHIPS)[number]; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring>; reduced: boolean }) {
  const x = useTransform(sx, v => v * 14 * chip.depth)
  const y = useTransform(sy, v => v * 14 * chip.depth)
  return (
    <motion.div
      className="absolute z-10 float-chip"
      style={{ ...chip.pos, x, y, animationDelay: `${chip.delay * 2}s` }}
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: chip.delay, ease }}
    >
      <div className="glass flex items-center gap-3" style={{ padding: '11px 16px 11px 12px', borderRadius: 999 }}>
        <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(72,144,247,0.12)', color: 'var(--blue)' }} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{chip.label}</span>
          <span className="block text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{chip.sub}</span>
        </span>
      </div>
    </motion.div>
  )
}
