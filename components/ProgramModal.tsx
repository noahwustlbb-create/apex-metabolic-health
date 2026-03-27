'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Program } from '@/lib/programs'

interface ProgramModalProps {
  program: Program | null
  onClose: () => void
}

export default function ProgramModal({ program, onClose }: ProgramModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (program) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [program])

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {program && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(7,10,13,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '560px',
              width: 'calc(100% - 48px)',
              margin: 'auto',
              background: '#19202c',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#2e3542',
                color: '#4a5a6a',
                fontSize: '20px',
                lineHeight: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2a3d52'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1e2d3d'
              }}
            >
              ×
            </button>

            {/* Panel header */}
            <div
              style={{
                background: '#0c131f',
                padding: '32px 28px 24px',
                borderRadius: '16px 16px 0 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Radial glow behind logo */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(ellipse at center, rgba(72,144,247,0.15) 0%, transparent 70%)',
                  width: '200px',
                  height: '200px',
                  pointerEvents: 'none',
                }}
              />

              {/* Logo mark SVG */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                <svg viewBox="0 0 32 32" fill="none" width={64} height={64} aria-hidden="true">
                  <polygon
                    points="16,2 30,9 30,23 16,30 2,23 2,9"
                    stroke="#4890f7"
                    strokeWidth="1.5"
                    fill="rgba(72,144,247,0.06)"
                  />
                  <line x1="16" y1="2" x2="16" y2="30" stroke="#4890f7" strokeWidth="0.8" opacity="0.35" />
                  <line x1="2" y1="16" x2="30" y2="16" stroke="#4890f7" strokeWidth="0.8" opacity="0.35" />
                  <circle cx="16" cy="16" r="2.5" fill="#4890f7" />
                  <circle cx="16" cy="16" r="5" stroke="#4890f7" strokeWidth="0.8" opacity="0.4" />
                </svg>
              </div>

              {/* Program name */}
              <h2
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#f0f4f8',
                  margin: 0,
                  position: 'relative',
                }}
              >
                {program.name}
              </h2>
            </div>

            {/* Panel body */}
            <div style={{ padding: '0 28px 28px' }}>
              {/* Badge */}
              {program.badge && (
                <div style={{ marginBottom: '12px', paddingTop: '20px' }}>
                  <span
                    style={
                      program.badge === 'Flagship'
                        ? {
                            display: 'inline-block',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const,
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: 'rgba(72,144,247,0.12)',
                            color: '#4890f7',
                            border: '1px solid rgba(72,144,247,0.3)',
                          }
                        : {
                            display: 'inline-block',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase' as const,
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: 'rgba(201,168,76,0.1)',
                            color: '#c9a84c',
                            border: '1px solid rgba(201,168,76,0.3)',
                          }
                    }
                  >
                    {program.badge}
                  </span>
                </div>
              )}

              {/* Padding top when no badge */}
              {!program.badge && <div style={{ paddingTop: '20px' }} />}

              {/* Tagline */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#8899aa',
                  marginBottom: '20px',
                  marginTop: 0,
                  lineHeight: 1.5,
                }}
              >
                {program.tagline}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: '#2e3542', marginBottom: '20px' }} />

              {/* Bio */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: '#8899aa',
                  marginBottom: '24px',
                  marginTop: 0,
                }}
              >
                {program.bio}
              </p>

              {/* Includes list */}
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4a5a6a',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-space-grotesk)',
                    marginTop: 0,
                  }}
                >
                  Included in this Program
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {program.includes.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#4890f7',
                          flexShrink: 0,
                          marginTop: '5px',
                        }}
                      />
                      <span style={{ fontSize: '13px', color: '#8899aa', lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptoms list */}
              <div style={{ marginBottom: '32px' }}>
                <p
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4a5a6a',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-space-grotesk)',
                    marginTop: 0,
                  }}
                >
                  This Program Addresses
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {program.symptoms.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        width={14}
                        height={14}
                        style={{ flexShrink: 0, marginTop: '2px' }}
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7l3.5 3.5L12 4"
                          stroke="#4890f7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span style={{ fontSize: '13px', color: '#8899aa', lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <a
                href={program.track === 'hormone' ? '/intake/hormone' : '/intake/general'}
                className="btn-teal w-full block text-center"
                style={{ marginBottom: '12px' }}
              >
                Book a Consultation
              </a>
              <Link
                href={`/programs/${program.slug}`}
                className="btn-ghost w-full block text-center"
                onClick={onClose}
              >
                View Full Program Details
              </Link>

              {/* Trust line */}
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '11px',
                  color: '#4a5a6a',
                  letterSpacing: '0.12em',
                  marginTop: '16px',
                  marginBottom: 0,
                }}
              >
                AHPRA-Registered · No GP Referral · 100% Online
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
