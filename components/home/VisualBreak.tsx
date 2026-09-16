'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * A framed still with no copy. The eye rests before the proof section; the
 * photograph moves a little slower than the page and the frame opens as it
 * arrives.
 */
export default function VisualBreak() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.35], reduced ? [1, 1] : [0.94, 1])
  const radius = useTransform(scrollYProgress, [0, 0.35], reduced ? [28, 28] : [48, 28])

  return (
    <div className="container-x" style={{ background: 'var(--bg)' }} aria-hidden="true">
      <motion.div ref={ref} style={{ scale, borderRadius: radius }} className="relative overflow-hidden" >
        <div style={{ height: 'clamp(300px, 62vh, 640px)', position: 'relative' }}>
          <motion.div style={{ y }} className="absolute inset-[-12%]">
            <Image src="/photos/hero-window-woman.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 45%' }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
