'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import StageCta from './StageCta'

const ease = [0.22, 1, 0.36, 1] as const

// Hims sells its support as loudly as its treatment. Every line here is
// something Apex already does (see /how-it-works, /membership, the portal).
const ITEMS = [
  { k: '7',   u: 'days',   t: 'A doctor, seven days a week', b: 'Phone or video with an AHPRA-registered doctor.' },
  { k: '1',   u: 'day',    t: 'Messages answered',          b: 'Within one business day. Members usually the same day.' },
  { k: '48',  u: 'hours',  t: 'Most results back',          b: '4,000+ accredited collection centres, Australia-wide.' },
  { k: '90',  u: 'days',   t: 'Reviews built in',           b: 'Repeat bloods and a doctor review about every three months.' },
  { k: '24/7', u: '',      t: 'Ask about your results',     b: 'Plain-English answers from your own panel, any time, in the portal.' },
  { k: '0',   u: 'GP',     t: 'No referral needed',         b: 'Start here. We issue the pathology referral.' },
]

export default function StageIncluded() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <section ref={ref} className="st-inc-wrap" aria-labelledby="st-inc-title">
      <div className="stage-frame st-inc">
        <div className="st-inc-art" aria-hidden="true"><Image src="/3d/product/box-white.jpg" alt="" fill sizes="(min-width: 900px) 40vw, 90vw" className="object-cover" /></div>
        <div className="st-inc-head">
          <h2 id="st-inc-title" className="stage-h2">Included in every plan.<br /><span className="stage-muted">Not an upsell.</span></h2>
          <StageCta href="/start">Start the 2-minute check</StageCta>
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
