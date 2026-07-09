'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeUpProps {
  children: ReactNode
  delay?:    number
  duration?: number
  className?: string
  once?: boolean
}

export default function FadeUp({
  children,
  delay    = 0,
  duration = 0.65,
  className,
  once     = true,
}: FadeUpProps) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={prefersReduced ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
