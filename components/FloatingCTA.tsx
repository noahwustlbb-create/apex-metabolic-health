'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

const HIDDEN_PATHS = ['/intake', '/get-started']

export default function FloatingCTA() {
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()

  const isHidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p))

  if (isHidden) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-6 md:right-6">
      <Link
        href="/get-started"
        aria-label="Request an Appointment"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: 'block', position: 'relative' }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '40px',
            border: '1px solid rgba(43,123,224,0.5)',
            pointerEvents: 'none',
          }}
        />

        {/* Pill button */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 20px 12px 16px',
            borderRadius: '40px',
            background: hovered
              ? 'linear-gradient(135deg, #2b7be0 0%, #1a5fb4 100%)'
              : 'linear-gradient(135deg, #121c30 0%, #0d1520 100%)',
            border: `1px solid ${hovered ? 'rgba(43,123,224,0.8)' : '#1A3F7A'}`,
            boxShadow: hovered
              ? '0 0 28px rgba(43,123,224,0.45), 0 8px 32px rgba(0,0,0,0.6)'
              : '0 4px 24px rgba(0,0,0,0.5)',
            transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: '20px', height: '20px', flexShrink: 0 }}
            aria-hidden="true"
          >
            <polygon
              points="12,3 21,19 3,19"
              stroke={hovered ? '#ffffff' : '#2b7be0'}
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke 0.25s' }}
            />
            <polygon
              points="12,9 17,17 7,17"
              stroke={hovered ? 'rgba(255,255,255,0.55)' : 'rgba(43,123,224,0.5)'}
              strokeWidth="1"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke 0.25s' }}
            />
          </svg>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: hovered ? '#ffffff' : '#F4F4F6',
              transition: 'color 0.25s',
            }}
          >
            Request an Appointment
          </span>
        </motion.div>
      </Link>
    </div>
  )
}
