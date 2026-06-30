'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const OPTIONS = [
  {
    id: 'new',
    heading: 'No, I have not been on hormone therapy',
    sub: 'I want to understand my hormone levels and explore whether treatment is right for me.',
    href: '/intake/bloods-hormone',
  },
  {
    id: 'existing',
    heading: 'Yes, I\'m currently on TRT or have been previously',
    sub: 'I\'m with another clinic or doctor and want to continue or transfer my care.',
    href: '/intake/bloods-trt',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function HormoneIntakeForm() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#070a0d' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <a href="/" className="flex flex-col leading-none">
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: '#00c2b8' }}>Metabolic Health</span>
        </a>
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
          aria-label="Close"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-16 sm:py-20">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {/* Eyebrow */}
          <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: '#00c2b8' }}>
            Hormone Optimisation · Step 1 of 2
          </p>

          <h1
            className="font-bold mb-3 leading-tight"
            style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
          >
            Let's personalise your pathway.
          </h1>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)' }}>
            To show you the right blood tests, please answer one question.
          </p>

          {/* Question */}
          <p className="text-xs font-bold tracking-[0.14em] uppercase mb-4" style={{ color: 'rgba(240,244,248,0.55)' }}>
            Are you currently receiving testosterone replacement therapy?
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-10">
            {OPTIONS.map(opt => {
              const isSelected = selected === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  className="text-left rounded-xl px-5 py-4 transition-all duration-200"
                  style={{
                    background: isSelected ? 'rgba(0,194,184,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1.5px solid ${isSelected ? 'rgba(0,194,184,0.45)' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isSelected ? '0 0 24px rgba(0,194,184,0.08)' : 'none',
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio dot */}
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{
                        border: `1.5px solid ${isSelected ? '#00c2b8' : 'rgba(255,255,255,0.2)'}`,
                        background: isSelected ? '#00c2b8' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#070a0d' }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug mb-1" style={{ color: isSelected ? '#f0f4f8' : 'rgba(240,244,248,0.75)', fontFamily: 'var(--font-space-grotesk)' }}>
                        {opt.heading}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.35)' }}>
                        {opt.sub}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer note */}
          <p className="text-[10px] mb-8 text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            This information helps our doctors order the correct blood tests for your situation.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-5 py-3 rounded-sm text-sm font-semibold transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
            >
              <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            <AnimatePresence>
              {selected && (
                <motion.a
                  href={OPTIONS.find(o => o.id === selected)?.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm text-sm font-semibold transition-all duration-150"
                  style={{ background: '#00c2b8', color: '#070a0d', textDecoration: 'none' }}
                >
                  Continue
                  <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              )}
            </AnimatePresence>

            {!selected && (
              <div
                className="flex-1 flex items-center justify-center py-3 rounded-sm text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'not-allowed' }}
              >
                Continue
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom trust */}
      <div className="px-6 py-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
          AHPRA-registered doctors · TGA compliant · 100% online
        </p>
      </div>
    </div>
  )
}
