'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEY = 'apex_age_confirmed'

/**
 * Replaces the full-screen age gate. It sits in the flow of the hero, under
 * the call to action, so it never covers anything and nothing covers it (the
 * chat widget owns the bottom of a phone screen). Same storage key as the
 * old gate, so anyone who already confirmed never sees it.
 */
export default function AgeNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let confirmed = false
    try { confirmed = !!localStorage.getItem(KEY) } catch {}
    if (!confirmed) setVisible(true)
  }, [])

  const confirm = () => {
    try { localStorage.setItem(KEY, '1') } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Age notice"
          style={{ overflow: 'hidden', maxWidth: 520 }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl" style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '12px 14px 12px 16px' }}>
            <p className="text-[12.5px] leading-relaxed m-0 flex-1 min-w-[220px]" style={{ color: 'var(--text-secondary)' }}>
              Apex provides clinical services for Australian adults aged 18 and over. This site contains medical health information and is not medical advice.
            </p>
            <span className="flex items-center gap-3">
              <button type="button" onClick={confirm} className="text-[12.5px] font-semibold px-3.5 py-2 rounded-full" style={{ background: 'var(--text-primary)', color: '#fff', minHeight: 36 }}>
                I&apos;m 18 or over
              </button>
              <a href="https://www.google.com.au" className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Under 18</a>
            </span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
