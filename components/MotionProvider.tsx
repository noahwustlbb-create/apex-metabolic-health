'use client'

import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

// Applies prefers-reduced-motion globally to every framer-motion animation,
// including components that don't call useReducedMotionSafe() themselves.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
