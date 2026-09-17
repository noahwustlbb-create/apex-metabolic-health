'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

// Numbers mirror app/pricing/page.tsx (COMPARISON_ROWS). Change them there first.
const CARDS = [
  { label: 'Blood panel, men’s or women’s', prefix: '', value: '$199', suffix: '', single: '$280', note: 'Bloods first. Full panel, doctor reviewed, results usually within 48 hours.' },
  { label: 'Doctor consultation', prefix: 'from', value: '$99', suffix: '', single: 'from $199', note: 'Phone or video, 45 to 60 minutes, with your results on screen.' },
  { label: 'Membership', prefix: '', value: '$99', suffix: '/ month', single: 'Optional', note: 'No lock-in. Medication at cost price, no escript fees, free referrals.', highlight: true },
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
    <section ref={ref} id="pricing" className="section-y mesh" aria-label="Pricing">
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
              className={`relative glass-card p-7 md:p-8 ${!reduced ? `float-${['a', 'b', 'c'][i]}` : ''}`}
              style={{
                background: c.highlight ? 'linear-gradient(160deg, rgba(72,144,247,0.14) 0%, rgba(255,255,255,0.8) 70%)' : undefined,
                border: c.highlight ? '1px solid rgba(72,144,247,0.35)' : undefined,
                boxShadow: c.highlight ? '0 30px 60px rgba(72,144,247,0.16)' : undefined,
              }}
            >
              <p className="t-mono m-0" style={{ color: c.highlight ? 'var(--blue)' : 'var(--text-muted)' }}>{c.label}</p>
              <p className="m-0 mt-5 flex items-baseline gap-2 flex-wrap" style={{ color: 'var(--text-primary)' }}>
                {c.prefix && <span className="text-[15px] font-medium" style={{ color: 'var(--text-secondary)' }}>{c.prefix}</span>}
                <span className="t-readout" style={{ fontSize: 'clamp(36px, 3.6vw, 50px)' }}>{c.value}</span>
                {c.suffix && <span className="text-[15px] font-medium" style={{ color: 'var(--text-secondary)' }}>{c.suffix}</span>}
              </p>
              <p className="m-0 mt-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                member · <span style={{ color: 'var(--text-secondary)' }}>{c.single}</span> single visit
              </p>
              <p className="t-body m-0 mt-6" style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{c.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Most chosen: the three pathways people start with, priced to the first step. */}
        <motion.div {...reveal(0.4, 18)} className="mt-10">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <p className="t-mono m-0" style={{ color: 'var(--text-muted)' }}>Most chosen</p>
            <Link href="/treatments" className="link-draw text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>All nine protocols</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { code: 'APX-01', label: 'Hormone Optimisation', start: '$199', note: 'Full panel, then a $99 member consult', href: '/programs/hormone-optimisation', image: '/protocols/hormone.jpg' },
              { code: 'APX-02', label: 'Medical Weight Loss', start: '$199', note: 'Metabolic panel, then a $99 member consult', href: '/programs/metabolic-weight-loss', image: '/protocols/weight.jpg' },
              { code: 'APX-09', label: 'Comprehensive Blood Tests', start: '$199', note: 'Doctor-reviewed panel, no consult required', href: '/programs/pathology', image: '/protocols/bloods.jpg' },
            ].map(c => (
              <Link key={c.code} href={c.href} className="glass-card no-underline flex items-center gap-4 transition-transform duration-300 hover:-translate-y-0.5" style={{ padding: 14, borderRadius: 20 }}>
                <span className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" aria-hidden="true">
                  <Image src={c.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="t-mono block" style={{ color: 'var(--text-muted)', fontSize: 9 }}>{c.code}</span>
                  <span className="block text-[14.5px] font-semibold truncate" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{c.label}</span>
                  <span className="block text-[12px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.note}</span>
                </span>
                <span className="text-right flex-shrink-0">
                  <span className="t-mono block" style={{ color: 'var(--text-muted)', fontSize: 8.5 }}>From</span>
                  <span className="t-readout block" style={{ fontSize: 22, color: 'var(--text-primary)' }}>{c.start}</span>
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

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
