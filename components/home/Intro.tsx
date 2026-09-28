'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const STATEMENT =
  'Hormones, metabolism, recovery and longevity are all written in your bloods. Apex reads the full panel, an AHPRA-registered doctor walks you through it, and every plan is re-tested so you can both see what changed.'

function Word({ children, progress, range, reduced }: { children: string; progress: MotionValue<number>; range: [number, number]; reduced: boolean | null }) {
  const color = useTransform(progress, range, ['rgba(15,23,42,0.18)', 'rgba(15,23,42,1)'])
  return <motion.span style={reduced ? undefined : { color }}>{children} </motion.span>
}

/**
 * INTRODUCE. One statement, nothing beside it. The words brighten from grey
 * to ink as the paragraph moves up the screen, so the reader's pace sets the
 * reveal (scroll-linked, reverses cleanly).
 */
export default function Intro() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = STATEMENT.split(' ')

  return (
    <section id="clinic" className="band-light section-y" aria-label="Why Apex">
      <div className="container-x">
        <p ref={ref} className="statement m-0" style={{ color: 'var(--text-primary)' }}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduced={reduced}>{w}</Word>
          ))}
        </p>
      </div>
    </section>
  )
}
