'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * A full-width still with no copy. The eye rests before the proof section.
 * The photograph moves a little slower than the page.
 */
export default function VisualBreak() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-12%', '12%'])

  return (
    <div ref={ref} className="relative overflow-hidden band-dark" style={{ height: 'clamp(320px, 60vh, 680px)' }} aria-hidden="true">
      <motion.div style={{ y }} className="absolute" >
        <div style={{ position: 'relative', width: '100vw', height: 'clamp(420px, 78vh, 880px)', marginTop: 'calc(-9vh)' }}>
          <Image src="/photos/hero-window-woman.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 45%' }} />
        </div>
      </motion.div>
    </div>
  )
}
