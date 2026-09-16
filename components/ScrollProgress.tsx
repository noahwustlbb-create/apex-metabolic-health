'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

// A one-pixel-and-a-half line along the top that fills as the page is read.
// Replaces the browser's scrollbar as the sense of "where am I": it lives
// inside the design instead of beside it.

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 1100,
        transformOrigin: '0 50%',
        scaleX: reduced ? scrollYProgress : scaleX,
        background: 'linear-gradient(90deg, var(--blue), #1d4fd8)',
        pointerEvents: 'none',
      }}
    />
  )
}
