'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

// Numbers mirror app/pricing/page.tsx (COMPARISON_ROWS). Change them there first.
const CARDS = [
  { label: 'Initial blood referral', member: '$199', single: '$280', note: 'Full panel, doctor reviewed. Results in about 48 hours.' },
  { label: 'Doctor consultation', member: 'from $99', single: 'from $199', note: 'Phone or video, 45 to 60 minutes, with your results on screen.' },
  { label: 'Membership', member: '$99 / mo', single: 'Optional', note: 'No lock-in. Medication at cost price, no escript fees, free referrals.', highlight: true },
]

/**
 * The visitor comparing tabs wants the number before the pitch. Three
 * cards, both ways to pay, and a link to the full table.
 */
export default function Pricing() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  return (
    <section ref={ref} id="pricing" className="section-y" style={{ background: 'var(--bg)' }} aria-label="Pricing">
      <div className="container-x">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>Straight pricing</motion.p>
          <RevealText as="h2" className="t-h2" style={{ marginBottom: 20 }} text="Every number, before you start." />
          <motion.p {...reveal(0.3, 14)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '52ch' }}>
            Pay per visit, or join as a member and pay less on every step. No packages, no upsell on the call.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              {...reveal(0.15 + i * 0.1, 26)}
              whileHover={reduced ? undefined : { y: -6 }}
              className={`relative rounded-[24px] p-7 md:p-8 ${!reduced ? `float-${['a', 'b', 'c'][i]}` : ''}`}
              style={{
                background: c.highlight ? 'linear-gradient(160deg, rgba(72,144,247,0.10) 0%, rgba(72,144,247,0.02) 60%, var(--card-bg) 100%)' : 'var(--card-bg)',
                border: `1px solid ${c.highlight ? 'rgba(72,144,247,0.35)' : 'var(--border)'}`,
                boxShadow: c.highlight ? '0 30px 60px rgba(72,144,247,0.12)' : '0 1px 2px rgba(15,23,42,0.04)',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <p className="t-mono m-0" style={{ color: c.highlight ? 'var(--blue)' : 'var(--text-muted)' }}>{c.label}</p>
              <p className="m-0 mt-5" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(34px, 3.4vw, 46px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text-primary)' }}>{c.member}</p>
              <p className="m-0 mt-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                member · <span style={{ color: 'var(--text-secondary)' }}>{c.single}</span> single visit
              </p>
              <p className="t-body m-0 mt-6" style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{c.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal(0.5)} className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <p className="text-[12.5px] leading-relaxed m-0" style={{ color: 'var(--text-muted)', maxWidth: '62ch' }}>
            Prices in AUD. Clinical suitability is decided by your doctor after assessment; a consultation never guarantees a prescription.
          </p>
          <Link href="/pricing" className="link-draw text-[15px] font-medium" style={{ color: 'var(--color-accent-fg)' }}>
            See the full price list
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
