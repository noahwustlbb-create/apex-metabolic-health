'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const STEPS = [
  {
    num: '01',
    title: 'Create your account',
    body: 'Complete a short online intake in under 2 minutes. No GP referral needed.',
    time: '2 MIN',
  },
  {
    num: '02',
    title: 'Complete pathology testing',
    body: 'Visit any accredited collection centre across Australia at a time that suits you.',
    time: '45 MIN',
  },
  {
    num: '03',
    title: 'Telehealth consultation',
    body: 'Review your results with an AHPRA-registered doctor. 100% online, Australia-wide.',
    time: '30 MIN',
  },
  {
    num: '04',
    title: 'Your personalised protocol',
    body: 'Receive an ongoing care plan coordinated around your biomarker data, with clinical reviews every 3 months.',
    time: 'ONGOING',
  },
]

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function GetStartedModal({ onClose, onConfirm }: { onClose: () => void; onConfirm?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#ffffff', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header style={{
        padding: '22px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderBottom: '1px solid #f1f5f9',
        position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 10,
      }}>
        <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 17, fontWeight: 800, letterSpacing: '0.2em', color: '#0f172a', lineHeight: 1 }}>
            APEX
          </span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 8, fontWeight: 600, letterSpacing: '0.24em', color: '#4b5563', marginTop: 2, textTransform: 'uppercase' as const }}>
            Metabolic Health
          </span>
        </Link>
        <button
          onClick={onClose}
          style={{
            position: 'absolute', left: 24, fontSize: 12, color: '#4b5563',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-space-grotesk)', fontWeight: 500,
          }}
        >
          ← Back
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 16, fontFamily: 'var(--font-space-grotesk)' }}>
            How it works
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#0f172a',
            lineHeight: 1.15, marginBottom: 52, fontFamily: 'var(--font-space-grotesk)',
            letterSpacing: '-0.02em',
          }}>
            From intake{' '}
            <span style={{ color: 'var(--blue)' }}>to protocol.</span>
          </h1>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, paddingBottom: i < STEPS.length - 1 ? 40 : 0 }}>
                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-space-grotesk)' }}>
                      {step.num}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, width: 1, background: '#e2e8f0', marginTop: 8, minHeight: 28 }} />
                  )}
                </div>
                {/* Text */}
                <div style={{ paddingTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' as const }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.14em',
                      background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)',
                      borderRadius: 99, padding: '3px 8px', whiteSpace: 'nowrap' as const,
                      fontFamily: 'var(--font-space-grotesk)',
                    }}>
                      {step.time}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: 56 }}>
            <a
              href={onConfirm ? undefined : 'https://app.apexmetabolichealth.com.au/signup'}
              onClick={onConfirm ? (e) => { e.preventDefault(); onClose(); onConfirm() } : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '18px 24px', borderRadius: 12,
                background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                color: '#ffffff', fontSize: 15, fontWeight: 600, textDecoration: 'none',
                fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                letterSpacing: '-0.01em', cursor: 'pointer',
              }}
            >
              Create your account
              <Arrow />
            </a>
            <p style={{ textAlign: 'center' as const, fontSize: 11, color: '#4b5563', marginTop: 12, fontFamily: 'var(--font-space-grotesk)' }}>
              No payment required to get started
            </p>
          </div>
        </div>
      </main>

      <footer style={{ padding: '18px 24px', textAlign: 'center' as const, borderTop: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, color: '#4b5563', fontFamily: 'var(--font-space-grotesk)' }}>
          All consultations conducted by AHPRA-registered medical practitioners. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
        </p>
      </footer>
    </motion.div>
  )
}
