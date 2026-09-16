'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Numbers mirror app/pricing/page.tsx (COMPARISON_ROWS). Change them there first.
const TILES = [
  { label: 'Initial blood referral', member: '$199', single: '$280', note: 'Full panel, doctor reviewed' },
  { label: 'Doctor consultation', member: 'from $99', single: 'from $199', note: 'Phone or video, 45 to 60 minutes' },
  { label: 'Membership', member: '$99 / month', single: 'Optional', note: 'No lock-in. Medication at cost price, no escript fees' },
]

/**
 * The visitor comparing tabs wants the number before the pitch. Three prices,
 * both ways to pay, and a link to the full table.
 */
export default function Pricing() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reveal = (delay: number, y = 20) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.65, delay, ease } }

  return (
    <section ref={ref} id="pricing" className="band-dark section-y" aria-label="Pricing">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24 items-start">
          <div>
            <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>Straight pricing</motion.p>
            <motion.h2 {...reveal(0.06)} className="t-h2" style={{ marginBottom: 22, maxWidth: '12ch' }}>Every number, before you start.</motion.h2>
            <motion.p {...reveal(0.14, 14)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '44ch', marginBottom: 28 }}>
              Pay per visit, or join as a member and pay less on every step. No packages, no upsell on the call.
            </motion.p>
            <motion.div {...reveal(0.2, 10)}>
              <Link href="/pricing" className="link-draw text-[15px] font-medium" style={{ color: 'var(--color-accent-fg)' }}>
                See the full price list
              </Link>
            </motion.div>
          </div>

          <div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 t-mono pb-3" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
              <span>What</span><span className="text-right">Member</span><span className="text-right">Single visit</span>
            </div>
            {TILES.map((t, i) => (
              <motion.div
                key={t.label}
                {...reveal(0.12 + i * 0.09, 16)}
                className="grid grid-cols-[1fr_auto_auto] gap-x-6 items-baseline py-6"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="min-w-0">
                  <p className="text-[17px] font-semibold m-0" style={{ letterSpacing: '-0.01em' }}>{t.label}</p>
                  <p className="text-[13px] mt-1 m-0" style={{ color: 'var(--text-secondary)' }}>{t.note}</p>
                </div>
                <p className="m-0 text-right" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{t.member}</p>
                <p className="m-0 text-right" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(15px, 1.4vw, 18px)', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{t.single}</p>
              </motion.div>
            ))}
            <motion.p {...reveal(0.5)} className="text-[12.5px] leading-relaxed mt-5 m-0" style={{ color: 'var(--text-muted)' }}>
              Prices in AUD. Clinical suitability is decided by your doctor after assessment; a consultation never guarantees a prescription.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
