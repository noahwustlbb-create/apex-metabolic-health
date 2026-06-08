'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const CALENDLY = {
  hormone: 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation',
  general: 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult',
} as const

interface Props {
  type?: 'hormone' | 'general'
  delay?: number
}

export default function BookingChoice({ type = 'general', delay = 0.6 }: Props) {
  const [chose, setChose] = useState<'book' | 'call' | null>(null)
  const link = CALENDLY[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
      className="mt-10 w-full"
      style={{ maxWidth: 540 }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(72,144,247,0.15)', background: 'var(--surface)' }}
      >
        {/* Header */}
        <div
          className="px-6 py-4"
          style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#4890f7' }}>
            Next step
          </p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
            Would you like to book now, or wait for us to call?
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!chose ? (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2"
            >
              {/* Book now */}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChose('book')}
                className="flex flex-col gap-2 p-6 transition-all duration-200 group"
                style={{ borderRight: '1px solid rgba(72,144,247,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="#4890f7" strokeWidth="1.4"/>
                    <path d="M3 8h14M7 2v4M13 2v4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                  Book now
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                  Pick a time that suits you — speak to us today.
                </p>
                <p className="text-xs font-semibold mt-1" style={{ color: '#4890f7' }}>
                  Choose a time →
                </p>
              </a>

              {/* Wait for call */}
              <button
                onClick={() => setChose('call')}
                className="flex flex-col gap-2 p-6 text-left transition-all duration-200"
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M4 4.5A1.5 1.5 0 015.5 3h1.879a.5.5 0 01.478.355l1 3.5a.5.5 0 01-.284.604l-1.5.75a9.02 9.02 0 004.218 4.218l.75-1.5a.5.5 0 01.604-.284l3.5 1a.5.5 0 01.355.478V13.5A1.5 1.5 0 0114.5 15C8.701 15 4 10.299 4 4.5z" stroke="#4890f7" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                  Wait for our call
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                  We'll contact you within 1 business day to confirm your next step.
                </p>
                <p className="text-xs font-semibold mt-1" style={{ color: '#4890f7' }}>
                  I'm happy to wait →
                </p>
              </button>
            </motion.div>
          ) : chose === 'book' ? (
            <motion.div
              key="booked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="px-6 py-5 flex items-center gap-4"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8l4 4 6-7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Calendly is opening in a new tab.</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Can't see it?{' '}
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#4890f7' }}>
                    Click here to book.
                  </a>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="px-6 py-5 flex items-center gap-4"
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8l4 4 6-7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Got it — we'll be in touch within 1 business day.</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>Changed your mind?{' '}
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#4890f7' }}>Book a time here.</a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
