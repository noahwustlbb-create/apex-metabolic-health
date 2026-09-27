'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useStageArt } from './StageTone'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import StageCta from './StageCta'

const ease = [0.22, 1, 0.36, 1] as const

/** INVITE. The page closes on the ice stage it opened on: one line, one button. */
export default function StageClose() {
  const art = useStageArt()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const rise = (d: number) => reduced ? { initial: false as const } : { initial: { opacity: 0, y: 24 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: d, ease } }

  return (
    <section ref={ref} id="cta" className="stage-close-wrap" aria-labelledby="close-title">
      <div className="stage-frame stage-close">
        <motion.div className="stage-close-heart" aria-hidden="true" {...(reduced ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: inView ? { opacity: 1, scale: 1 } : {}, transition: { duration: 1.4, ease } })}>
          <Image src={art('heart')} alt="" fill sizes="(min-width: 900px) 30vw, 70vw" className="object-contain" />
        </motion.div>
        <motion.h2 id="close-title" className="stage-display stage-center" {...rise(0.1)}>
          Stop guessing.<br /><span className="stage-muted">Start measuring.</span>
        </motion.h2>
        <motion.p className="stage-lead stage-center" {...rise(0.2)}>
          Two minutes to start. Bloods near you, then a doctor with your results open. No GP referral.
        </motion.p>
        <motion.div className="stage-actions stage-actions-center" {...rise(0.3)}>
          <StageCta href="/start">Start your assessment</StageCta>
          <Link href="/discovery-call" className="stage-link">Prefer to talk first? Book a free call</Link>
        </motion.div>
      </div>
    </section>
  )
}
