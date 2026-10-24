'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * framer-motion's useReducedMotion is null on the server and true on a
 * reduced-motion client, so any markup branched on it hydrates differently
 * (React #418, behaviour audit 24 Oct 2026). This returns false until the
 * component has mounted, then the real preference.
 */
export function useReducedMotionSafe(): boolean {
  const pref = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!pref
}
