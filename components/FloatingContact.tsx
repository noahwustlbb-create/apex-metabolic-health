'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ACCENT = '#4890f7'
const ease = [0.22, 1, 0.36, 1] as const

const ACTIONS = [
  {
    id: 'assessment',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
        <path d="M9 1v4M9 13v4M1 9h4M13 9h4" strokeLinecap="round" />
        <circle cx="9" cy="9" r="4" />
      </svg>
    ),
    label: '60-second assessment',
    sub: 'Tell us your goals — we match you to the right doctor and program.',
    href: '/intake/pre-screen',
    external: false,
    highlight: true,
  },
  {
    id: 'hormone',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
        <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" />
        <path d="M9 6v3l2 2" strokeLinecap="round" />
      </svg>
    ),
    label: 'Hormone consultation',
    sub: 'Hormone optimisation and performance. Speak with a doctor.',
    href: '/intake/hormone-consult',
    external: false,
    highlight: false,
  },
  {
    id: 'peptide',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
        <path d="M5 3l3 3-3 3M10 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h4M11 9h4" strokeLinecap="round" />
      </svg>
    ),
    label: 'Peptide consultation',
    sub: 'Hair, skin, injury repair, anti-ageing, and weight protocols.',
    href: '/intake/general-consult',
    external: false,
    highlight: false,
  },
  {
    id: 'discovery',
    icon: (
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
        <path d="M3 5h12M3 9h8M3 13h5" strokeLinecap="round" />
      </svg>
    ),
    label: 'Free discovery call',
    sub: '15 minutes with our clinical team. No cost, no commitment.',
    href: 'https://calendly.com/admin-apexmetabolichealth/free-discovery-call',
    external: true,
    highlight: false,
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 120)
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Close on escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.35, ease }}
      className="fixed bottom-6 right-5 sm:right-8 z-50 flex flex-col items-end gap-3"
      style={{ width: 'min(400px, calc(100vw - 32px))' }}
    >
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease }}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(72,144,247,0.18)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(72,144,247,0.06)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                Get Started
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-150"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}
                aria-label="Close menu"
              >
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Action list */}
            <div className="flex flex-col">
              {ACTIONS.map((action, i) => {
                const Tag = action.external ? 'a' : Link
                const extraProps = action.external
                  ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: action.href }

                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.04, ease }}
                  >
                    <Tag
                      {...extraProps}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 px-5 py-4 transition-all duration-150"
                      style={{
                        borderBottom: i < ACTIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        background: action.highlight ? 'rgba(72,144,247,0.04)' : 'transparent',
                        textDecoration: 'none',
                        display: 'flex',
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                        e.currentTarget.style.background = 'rgba(72,144,247,0.07)'
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                        e.currentTarget.style.background = action.highlight ? 'rgba(72,144,247,0.04)' : 'transparent'
                      }}
                    >
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: action.highlight ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${action.highlight ? 'rgba(72,144,247,0.25)' : 'rgba(255,255,255,0.07)'}`,
                          color: action.highlight ? ACCENT : 'var(--text-primary)',
                        }}>
                        {action.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight mb-0.5"
                          style={{ fontFamily: 'var(--font-space-grotesk)', color: action.highlight ? ACCENT : 'var(--text-primary)' }}>
                          {action.label}
                        </p>
                        <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
                          {action.sub}
                        </p>
                      </div>

                      {/* Arrow */}
                      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                        style={{ color: action.highlight ? ACCENT : 'rgba(255,255,255,0.2)' }} aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Tag>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-[9px] text-center" style={{ color: 'var(--text-primary)', opacity: 0.25 }}>
                AHPRA-registered doctors · 100% online · Australia-wide
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 px-6 py-3.5 transition-all duration-200"
        style={{
          background: 'var(--surface)',
          border: `1px solid ${open ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '999px',
          boxShadow: open
            ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(72,144,247,0.12)'
            : '0 8px 32px rgba(0,0,0,0.5)',
          color: 'var(--text-primary)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(72,144,247,0.3)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(72,144,247,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = open ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.1)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
        }}
        aria-label="Get started"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase whitespace-nowrap"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Start Health Assessment
        </span>
        <motion.span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: ACCENT }}
          animate={{ opacity: open ? 0.5 : [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: open ? 0 : Infinity, ease: 'easeInOut' }}
        />
      </button>
    </motion.div>
  )
}
