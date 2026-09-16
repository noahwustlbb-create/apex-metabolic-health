'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'apex_age_confirmed'

/**
 * Replaces the full-screen age gate. The old modal blocked every first visit
 * behind a click (and pushed Lighthouse LCP past 15s); a quiet notice keeps the
 * 18+ acknowledgement without holding the page hostage. Same storage key, so
 * anyone who already confirmed never sees it.
 */
export default function AgeNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let confirmed = false
    try { confirmed = !!localStorage.getItem(KEY) } catch {}
    if (confirmed) return
    const t = window.setTimeout(() => setVisible(true), 1400)
    return () => window.clearTimeout(t)
  }, [])

  const confirm = () => {
    try { localStorage.setItem(KEY, '1') } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Age notice"
          // Under the nav on phones: the GHL chat widget owns the bottom of a
          // phone screen and swallowed clicks on the button there. Bottom-left on
          // wider screens, clear of the chat bubble on the right.
          className="fixed left-4 right-4 top-[84px] sm:top-auto sm:bottom-6 sm:left-6 sm:right-auto z-[390]"
          style={{
            maxWidth: 380,
            background: 'var(--color-surface-overlay)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            boxShadow: 'var(--shadow-xl)',
            padding: '16px 18px',
          }}
        >
          <p className="text-[13px] leading-relaxed m-0" style={{ color: 'var(--text-primary)' }}>
            Apex provides clinical services for Australian adults aged 18 and over. This site contains medical health information and is not medical advice.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={confirm}
              className="text-[13px] font-semibold px-4 py-2 rounded-lg"
              style={{ background: 'var(--blue)', color: '#fff', minHeight: 40 }}
            >
              I&apos;m 18 or over
            </button>
            <a
              href="https://www.google.com.au"
              className="text-[12px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m under 18
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
