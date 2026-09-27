'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import StageCta from './StageCta'

const ease = [0.22, 1, 0.36, 1] as const

const STEPS = [
  { n: '01', when: 'Today',     t: 'Take the 2-minute check', b: 'A few questions. We show you what your panel looks at before you create an account.', art: '/3d/phone.jpg' },
  { n: '02', when: 'This week', t: 'Bloods, then your doctor', b: 'Referral sent electronically. Results in about 48 hours, then a doctor call with them open.', art: '/3d/product/vials.jpg' },
  { n: '03', when: 'After',     t: 'Your plan, delivered',    b: 'If treatment is suitable, it arrives discreetly. Reviewed about every three months.', art: '/3d/product/box-white.jpg' },
]

/** Three simple steps (Hims), in the stage material: one render per step. */
export default function StageSteps() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <section ref={ref} className="st-steps container-x" aria-labelledby="st-steps-title">
      <h2 id="st-steps-title" className="stage-h2 stage-center">Three steps.<br /><span className="stage-muted">That is the whole thing.</span></h2>
      <ol className="st-steps-grid">
        {STEPS.map((s, i) => (
          <motion.li key={s.n} initial={reduced ? false : { opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }} className="st-step">
            <span className="st-step-art" aria-hidden="true"><Image src={s.art} alt="" fill sizes="(min-width: 900px) 30vw, 90vw" className="object-cover" /></span>
            <span className="st-step-text">
              <span className="st-step-top"><span className="stage-readout">{s.n}</span><span className="st-step-when">{s.when}</span></span>
              <strong>{s.t}</strong>
              <span>{s.b}</span>
            </span>
          </motion.li>
        ))}
      </ol>
      <div className="stage-actions stage-actions-center"><StageCta href="/start">Start the 2-minute check</StageCta></div>
    </section>
  )
}
