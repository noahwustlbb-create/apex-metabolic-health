'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

const HIDDEN_PATHS = ['/intake', '/get-started']

export default function FloatingCTA() {
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden')
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })
    return () => observer.disconnect()
  }, [])

  if (isHidden || menuOpen) return null

  return (
    // The GHL chat bubble is also fixed bottom-right and roughly 64px across, so
    // on a phone this row was sliding underneath it and the assessment label was
    // being clipped mid-word. Offset to clear it; desktop has room for both.
    <div className="fixed bottom-6 right-[86px] md:right-6 z-40 flex items-center gap-2">
      <a
        href="https://app.apexmetabolichealth.com.au/login"
        className="hidden md:inline-flex"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: '#6b7280',
          textDecoration: 'none',
          padding: '9px 14px',
          borderRadius: '40px',
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(0,0,0,0.09)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'color 0.18s',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-inter)',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#111827' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}
      >
        Log in
      </a>

      <Link
        href="/start"
        aria-label="Health Assessment"
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
              ? 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)'
              : '#ffffff',
            border: `1.5px solid ${hovered ? 'rgba(72,144,247,0.6)' : 'rgba(0,0,0,0.12)'}`,
            boxShadow: hovered
              ? '0 8px 32px rgba(72,144,247,0.4), 0 2px 8px rgba(0,0,0,0.1)'
              : '0 4px 20px rgba(0,0,0,0.12)',
            transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: '18px', height: '18px', flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={hovered ? '#fff' : 'var(--blue)'} strokeWidth="1.6" strokeLinecap="round" style={{ transition: 'stroke 0.22s' }} />
            <rect x="9" y="3" width="6" height="4" rx="1" stroke={hovered ? '#fff' : 'var(--blue)'} strokeWidth="1.6" style={{ transition: 'stroke 0.22s' }} />
            <path d="M9 12h6M9 16h4" stroke={hovered ? 'rgba(255,255,255,0.7)' : 'rgba(72,144,247,0.6)'} strokeWidth="1.4" strokeLinecap="round" style={{ transition: 'stroke 0.22s' }} />
          </svg>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              color: hovered ? '#ffffff' : '#111827',
              transition: 'color 0.22s',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Health Assessment
          </span>
        </motion.div>
      </Link>
    </div>
  )
}
