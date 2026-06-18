'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const CALENDLY = {
  hormone: 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation',
  general: 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult',
  discovery: 'https://calendly.com/admin-apexmetabolichealth/free-discovery-call',
} as const

interface Props {
  type?: 'hormone' | 'general' | 'discovery'
  showDiscovery?: boolean
  delay?: number
}

export default function BookingChoice({ type = 'discovery', showDiscovery = false, delay = 0.6 }: Props) {
  const [chose, setChose] = useState<'book' | 'discovery' | 'call' | null>(null)
  const primaryLink = CALENDLY[type]
  const discoveryLink = CALENDLY.discovery
  const activeLink = chose === 'discovery' ? discoveryLink : primaryLink

  const consultLabel = type === 'hormone' ? 'Hormone consultation' : type === 'general' ? 'Telehealth consultation' : 'Book now'
  const consultSub   = type === 'hormone' ? 'Comprehensive hormone consultation with your Apex doctor.' : type === 'general' ? 'General telehealth consultation with your Apex doctor.' : 'Pick a time that suits you — speak to us today.'

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
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#4890f7' }}>
            Next step
          </p>
          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>
            How would you like to proceed?
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
              className={showDiscovery ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-2'}
            >
              {/* Primary booking option */}
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChose('book')}
                className="flex gap-4 items-start p-5 transition-all duration-200"
                style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}>
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="#4890f7" strokeWidth="1.4"/>
                    <path d="M3 8h14M7 2v4M13 2v4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                    {consultLabel}
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                    {consultSub}
                  </p>
                  <p className="text-xs font-semibold mt-1.5" style={{ color: '#4890f7' }}>Choose a time →</p>
                </div>
              </a>

              {/* Free discovery call — only shown when showDiscovery=true */}
              {showDiscovery && (
                <a
                  href={discoveryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setChose('discovery')}
                  className="flex gap-4 items-start p-5 transition-all duration-200"
                  style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}>
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M10 2a6 6 0 016 6c0 2.5-1 4.5-3 5.5V15a1 1 0 01-1 1H8a1 1 0 01-1-1v-1.5C5 12.5 4 10.5 4 8a6 6 0 016-6z" stroke="#4890f7" strokeWidth="1.3"/>
                      <path d="M8 18h4" stroke="#4890f7" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                      Free discovery call
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                      Not sure where to start? A quick call to discuss your goals — no obligation.
                    </p>
                    <p className="text-xs font-semibold mt-1.5" style={{ color: '#4890f7' }}>Book free call →</p>
                  </div>
                </a>
              )}

              {/* Wait for call */}
              <button
                onClick={() => setChose('call')}
                className="flex gap-4 items-start p-5 text-left transition-all duration-200 w-full"
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}>
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M4 4.5A1.5 1.5 0 015.5 3h1.879a.5.5 0 01.478.355l1 3.5a.5.5 0 01-.284.604l-1.5.75a9.02 9.02 0 004.218 4.218l.75-1.5a.5.5 0 01.604-.284l3.5 1a.5.5 0 01.355.478V13.5A1.5 1.5 0 0114.5 15C8.701 15 4 10.299 4 4.5z" stroke="#4890f7" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
                    Wait for our call
                  </p>
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                    We'll contact you within 1 business day to confirm your next step.
                  </p>
                  <p className="text-xs font-semibold mt-1.5" style={{ color: '#4890f7' }}>I'm happy to wait →</p>
                </div>
              </button>
            </motion.div>

          ) : chose === 'call' ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="px-6 py-5 flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}>
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8l4 4 6-7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Got it — we'll be in touch within 1 business day.</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Changed your mind?{' '}
                  <a href={primaryLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4890f7' }}>Book a time here.</a>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="booked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="px-6 py-5 flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}>
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8l4 4 6-7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Calendly is opening in a new tab.</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Can't see it?{' '}
                  <a href={activeLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4890f7' }}>
                    Click here to book.
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
