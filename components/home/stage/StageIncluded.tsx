'use client'

import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { useRef } from 'react'
import Image from '@/components/audience/Img'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

// Hims sells its support as loudly as its treatment. Every line here is
// something Apex already does (see /how-it-works, /membership, the portal).
const ITEMS = [
  { k: '6',   u: 'days',   t: 'A doctor, Monday to Saturday', b: 'Phone or video with an AHPRA-registered doctor.' },
  { k: '1',   u: 'day',    t: 'Messages answered',          b: 'Within one business day. Members usually the same day.' },
  { k: '48',  u: 'hours',  t: 'Most results back',          b: '4,000+ accredited collection centres, Australia-wide.' },
  { k: '90',  u: 'days',   t: 'Reviews built in',           b: 'Repeat bloods and a doctor review about every three months.' },
  { k: '24/7', u: '',      t: 'Ask about your results',     b: 'Plain-English answers from your own panel, any time, in the portal.' },
  { k: '23+', u: 'markers', t: 'One blood panel', b: 'Book online, no GP referral. One draw covers hormones, energy, heart and metabolic health.' },
]

export default function StageIncluded() {
  const reduced = useReducedMotionSafe()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <section ref={ref} className="st-inc-wrap" aria-labelledby="st-inc-title">
      <div className="stage-frame st-inc container-x">
        <div className="st-inc-art" aria-hidden="true"><Image src="/3d/product/box-white.jpg" alt="" fill sizes="(min-width: 900px) 40vw, 90vw" className="object-cover" /></div>
        <div className="st-inc-head">
          <h2 id="st-inc-title" className="stage-h2">Included in every plan.<br /><span className="stage-muted">Not an upsell.</span></h2>
          <Link href="/signup" className="al-pill al-pill-lg st-inc-cta">
            Create your free account
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
        <ul className="st-inc-grid">
          {ITEMS.map((x, i) => (
            <motion.li key={x.t} initial={reduced ? false : { opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease }}>
              <span className="stage-readout st-inc-k">{x.k}<small>{x.u}</small></span>
              <strong>{x.t}</strong>
              <span>{x.b}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
