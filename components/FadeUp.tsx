'use client'

import { motion } from 'framer-motion'
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
