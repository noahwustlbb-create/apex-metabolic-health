'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/get-started"
            aria-label="Get Started"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ display: 'block', position: 'relative' }}
          >
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: hovered ? [1, 1.35] : [1, 1.2, 1], opacity: hovered ? [0.4, 0] : [0.3, 0, 0.3] }}
              transition={{ duration: hovered ? 0.5 : 2.4, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                border: '1px solid rgba(43,123,224,0.5)',
                pointerEvents: 'none',
              }}
            />

            {/* Triangle button */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: hovered
                  ? 'linear-gradient(135deg, #2b7be0 0%, #1a5fb4 100%)'
                  : 'linear-gradient(135deg, #111820 0%, #0d1117 100%)',
                border: `1px solid ${hovered ? 'rgba(43,123,224,0.8)' : '#1e2d3d'}`,
                boxShadow: hovered
                  ? '0 0 28px rgba(43,123,224,0.5), 0 8px 32px rgba(0,0,0,0.6)'
                  : '0 4px 24px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                cursor: 'pointer',
              }}
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                style={{ width: '28px', height: '28px' }}
                aria-hidden="true"
              >
                {/* Outer triangle */}
                <polygon
                  points="16,4 28,26 4,26"
                  stroke={hovered ? '#ffffff' : '#2b7be0'}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ transition: 'stroke 0.25s' }}
                />
                {/* Inner triangle */}
                <polygon
                  points="16,11 22,22 10,22"
                  stroke={hovered ? 'rgba(255,255,255,0.6)' : 'rgba(43,123,224,0.5)'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ transition: 'stroke 0.25s' }}
                />
              </svg>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    right: '72px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#0d1117',
                    border: '1px solid #1e2d3d',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#f0f4f8',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    pointerEvents: 'none',
                  }}
                >
                  Get Started
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
