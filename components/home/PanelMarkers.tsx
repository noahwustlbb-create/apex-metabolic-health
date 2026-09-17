'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

/** What the doctor orders. Test names only, grouped the way the report groups them. */
const MEN = [
  ['Hormones', 'Total and free testosterone, SHBG, oestradiol, LH, FSH, prolactin, DHEA-S, cortisol'],
  ['Growth', 'IGF-1'],
  ['Thyroid', 'TSH, free T4, free T3'],
  ['Metabolic', 'Fasting glucose, HbA1c, fasting insulin, magnesium'],
  ['Lipids and heart', 'Total cholesterol, triglycerides, HDL, LDL, ApoB, hs-CRP'],
  ['Liver and kidney', 'Liver function (LFT), kidney function (UEC)'],
  ['Blood', 'Full blood count, haematocrit, ferritin and iron studies'],
  ['Prostate', 'PSA'],
  ['Vitamins', 'Vitamin D, B12'],
]
const WOMEN = [
  ['Hormones', 'Oestradiol, progesterone, free and total testosterone, SHBG, LH, FSH, prolactin, DHEA-S, cortisol'],
  ['Thyroid', 'TSH, free T4, free T3, thyroid antibodies'],
  ['Metabolic', 'Fasting glucose, HbA1c, fasting insulin, magnesium'],
  ['Lipids and heart', 'Total cholesterol, triglycerides, HDL, LDL, ApoB, hs-CRP'],
  ['Liver and kidney', 'Liver function (LFT), kidney function (UEC)'],
  ['Blood', 'Full blood count, ferritin and iron studies'],
  ['Vitamins', 'Vitamin D, B12, folate'],
]

/**
 * PROVE, part three: exactly what is on the panel, for men and for women.
 * Two glass columns on a mesh field; the doctor adds or removes markers on
 * the call, and the copy says so.
 */
export default function PanelMarkers() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const reveal = (delay: number, y = 22) =>
    reduced ? { initial: false as const } : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease } }

  const Column = ({ title, rows, delay, code }: { title: string; rows: string[][]; delay: number; code: string }) => (
    <motion.div {...reveal(delay, 26)} className="glass-card" style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <h3 className="t-h3 m-0">{title}</h3>
        <span className="t-readout" style={{ fontSize: 26, color: 'var(--text-primary)' }}>{rows.reduce((n, r) => n + r[1].split(',').length, 0)}+</span>
      </div>
      <ul className="list-none p-0 m-0 flex flex-col">
        {rows.map(([group, markers]) => (
          <li key={group} className="grid grid-cols-[120px_1fr] gap-3 py-3" style={{ borderTop: '1px solid rgba(15,23,42,0.07)' }}>
            <span className="t-mono" style={{ color: 'var(--text-muted)', paddingTop: 3 }}>{group}</span>
            <span className="text-[14.5px] leading-snug" style={{ color: 'var(--text-primary)' }}>{markers}</span>
          </li>
        ))}
      </ul>
      <p className="t-mono mt-5 mb-0" style={{ color: 'var(--text-muted)', fontSize: 9 }}>{code} · Ordered after intake · Doctor adjusts on the call</p>
    </motion.div>
  )

  return (
    <section ref={ref} id="panel" className="band-light section-y mesh" aria-label="What is on the panel">
      <div className="container-x">
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p {...reveal(0, 10)} className="t-eyebrow" style={{ marginBottom: 20 }}>The panel</motion.p>
          <RevealText as="h2" className="t-h2" style={{ marginBottom: 20 }} text="Every marker, for men and for women." />
          <motion.p {...reveal(0.3, 14)} className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '54ch' }}>
            This is the baseline your doctor orders. Nothing is hidden behind a consult. The markers differ by sex because the questions do.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Column title="Men’s panel" rows={MEN} delay={0.15} code="APX-09M" />
          <Column title="Women’s panel" rows={WOMEN} delay={0.25} code="APX-09W" />
        </div>
        <motion.div {...reveal(0.5)} className="flex flex-wrap items-center justify-between gap-4 mt-8">
          <p className="text-[12.5px] leading-relaxed m-0" style={{ color: 'var(--text-muted)', maxWidth: '62ch' }}>
            Collected at any of 4,000+ accredited centres. Most results are back within 48 hours and reviewed by your doctor before your call.
          </p>
          <Link href="/programs/pathology" className="link-draw text-[15px] font-medium" style={{ color: 'var(--color-accent-fg)' }}>
            See the pathology pathway
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
