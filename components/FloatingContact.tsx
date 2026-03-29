'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STEPS = [
  {
    number: '1',
    title: 'Start Your Assessment',
    description: 'Answer a short health questionnaire. We\'ll match you to the right program and doctor.',
    cta: 'Begin assessment',
    href: '/get-started',
  },
  {
    number: '2',
    title: 'Book a Consultation',
    description: 'Speak with an AHPRA-registered doctor via telehealth — hormone, metabolic, or general.',
    cta: 'Book now',
    href: '/intake/hormone',
  },
  {
    number: '3',
    title: 'Start With Bloods',
    description: 'Just need blood tests? No GP referral needed. Order direct through Apex.',
    cta: 'Order bloods',
    href: '/order-bloods',
  },
  {
    number: '4',
    title: 'Speak to a Clinician',
    description: 'Still unsure? Our clinical team is on standby to guide you through your options.',
    cta: 'Book a free call',
    href: '/intake/discovery',
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>('1')

  return (
    <div
      className="fixed bottom-6 right-5 sm:right-8 z-50 flex flex-col items-end gap-3"
      style={{ width: 'min(420px, calc(100vw - 32px))' }}
    >
      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: '#0e1520',
              border: '1px solid rgba(44,116,232,0.18)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(44,116,232,0.08)',
            }}
          >
            {/* Panel header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                  <polygon points="10,2 18,17 2,17" stroke="#2C74E8" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  <polygon points="10,6 15,15 5,15" stroke="#2C74E8" strokeWidth="1" strokeLinejoin="round" fill="none" opacity="0.5"/>
                </svg>
                <span
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: '#f0f4f8' }}
                >
                  Get Started
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-150"
                style={{ color: '#4a5a6a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f4f8' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
                aria-label="Close"
              >
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Steps */}
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {STEPS.map((step) => {
                const isOpen = expanded === step.number
                return (
                  <div key={step.number}>
                    {/* Step header — clickable */}
                    <button
                      className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150"
                      onClick={() => setExpanded(isOpen ? null : step.number)}
                      style={{ background: isOpen ? 'rgba(44,116,232,0.05)' : 'transparent' }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                        style={{
                          backgroundColor: isOpen ? 'rgba(44,116,232,0.2)' : 'rgba(255,255,255,0.06)',
                          color: isOpen ? '#7AB8FF' : '#4a5a6a',
                          border: isOpen ? '1px solid rgba(44,116,232,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {step.number}
                      </span>
                      <span
                        className="text-sm font-semibold flex-1 text-left"
                        style={{ color: isOpen ? '#f0f4f8' : '#8899aa', fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {step.title}
                      </span>
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="w-3 h-3 flex-shrink-0 transition-transform duration-200"
                        style={{
                          color: '#4a5a6a',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        aria-hidden="true"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Step body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 pl-16">
                            <p
                              className="text-sm leading-relaxed mb-4"
                              style={{ color: '#8899aa' }}
                            >
                              {step.description}
                            </p>
                            <Link
                              href={step.href}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200"
                              style={{
                                background: 'linear-gradient(135deg, #7AB8FF 0%, #2C74E8 100%)',
                                color: '#ffffff',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(44,116,232,0.4)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = 'none'
                              }}
                            >
                              {step.cta}
                              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill trigger button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-7 py-4 transition-all duration-200"
        style={{
          background: '#0e1520',
          border: '1px solid rgba(44,116,232,0.28)',
          borderRadius: '999px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(44,116,232,0.06)',
          color: '#ffffff',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(44,116,232,0.55)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(44,116,232,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(44,116,232,0.28)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(44,116,232,0.06)'
        }}
        aria-label={open ? 'Close appointment menu' : 'Request an appointment'}
        aria-expanded={open}
      >
        {/* Triangle icon */}
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
          <polygon points="10,2 18,17 2,17" stroke="#2C74E8" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
          <polygon points="10,6 15,15 5,15" stroke="#2C74E8" strokeWidth="1" strokeLinejoin="round" fill="none" opacity="0.5"/>
        </svg>
        <span className="text-[12px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
          {open ? 'Close' : 'Request an Appointment'}
        </span>
        {!open && (
          <span
            className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: '#2C74E8' }}
          />
        )}
      </motion.button>
    </div>
  )
}
