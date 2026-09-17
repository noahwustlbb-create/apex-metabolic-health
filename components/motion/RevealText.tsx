'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type Segment = { text: string; accent?: boolean }

/**
 * Headline reveal: every word rises out of its own clipped line, one after
 * another. The viewport observer sits on the heading, not on the words: a
 * word that is still translated below its clip box has no visible area, so
 * observing it directly never fires. Reduced motion renders the words in place.
 */
export default function RevealText({
  text,
  segments,
  as: Tag = 'h2',
  className,
  style,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text?: string
  segments?: Segment[]
  as?: ElementType
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const reduced = useReducedMotion()
  const segs: Segment[] = segments ?? [{ text: text ?? '' }]

  const word: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: reduced ? { duration: 0 } : { duration: 0.75, delay: delay + i * stagger, ease },
    }),
  }

  let i = 0
  const nodes: ReactNode[] = []
  segs.forEach((seg, si) => {
    seg.text.split(/(\s+)/).forEach((w, wi) => {
      if (w.trim() === '') { if (w) nodes.push(' '); return }
      const idx = i++
      nodes.push(
        <span key={`${si}-${wi}`} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <motion.span className="inline-block" variants={word} custom={idx} style={seg.accent ? { color: 'var(--blue)' } : undefined}>
            {w}
          </motion.span>
        </span>,
      )
    })
    if (si < segs.length - 1) nodes.push(<br key={`br${si}`} />)
  })

  return (
    <Tag className={className} style={style}>
      <motion.span initial={reduced ? 'visible' : 'hidden'} whileInView="visible" viewport={{ once, amount: 0.2 }}>
        {nodes}
      </motion.span>
    </Tag>
  )
}
