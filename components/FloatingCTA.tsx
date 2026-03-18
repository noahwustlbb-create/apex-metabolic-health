'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40"
          style={{
            background: '#0d1117',
            border: '1px solid #1e2d3d',
            borderRadius: '10px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            padding: '16px 20px',
            minWidth: '220px',
          }}
        >
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute top-2.5 right-3"
            style={{ color: '#4a5a6a', fontSize: '18px', lineHeight: 1 }}
          >
            ×
          </button>
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: '#4a5a6a' }}
          >
            Ready to start?
          </p>
          <Link
            href="/get-started"
            className="btn-teal text-[12px] tracking-widest uppercase w-full block text-center"
          >
            Get Started
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
