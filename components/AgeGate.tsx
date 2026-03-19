'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeGate() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const confirmed = localStorage.getItem('apex_age_confirmed')
    if (!confirmed) setVisible(true)
  }, [])

  const confirm = () => {
    localStorage.setItem('apex_age_confirmed', '1')
    setVisible(false)
  }

  const decline = () => {
    window.location.href = 'https://www.google.com.au'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(7,10,13,0.97)', backdropFilter: 'blur(12px)' }}
          aria-modal="true"
          role="dialog"
          aria-label="Age verification"
        >
          {/* Dot grid bg */}
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(43,123,224,0.08) 0%, transparent 60%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-8 py-12 mx-4"
            style={{
              maxWidth: '480px',
              background: '#0d1117',
              border: '1px solid #1e2d3d',
              borderRadius: '12px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Logo mark */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-sm mb-8 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(43,123,224,0.08)',
                border: '1px solid rgba(43,123,224,0.2)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p className="label mb-4">AGE VERIFICATION</p>

            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.1' }}
            >
              This website contains medical health information
            </h2>

            <p className="text-sm leading-relaxed mb-8" style={{ color: '#8899aa' }}>
              Apex Metabolic Health provides clinical health services for adults. By entering this
              site you confirm that you are <strong style={{ color: '#f0f4f8' }}>18 years of age or older</strong> and
              consent to viewing medical health information.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={confirm}
                className="btn-teal flex-1"
                autoFocus
              >
                I am 18 or older — Enter
              </button>
              <button
                onClick={decline}
                className="btn-ghost flex-1"
              >
                I am under 18
              </button>
            </div>

            <p className="text-xs mt-6 leading-relaxed" style={{ color: '#4a5a6a' }}>
              This site is intended for Australian adults seeking medical health information only.
              It does not constitute medical advice.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
