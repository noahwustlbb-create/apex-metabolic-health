'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const FEATURES = [
  {
    title: 'Biomarker tracking over time',
    body: 'Every blood draw updates your panel. See the trend, not just the number.',
  },
  {
    title: 'Protocol visibility',
    body: 'Your current treatment protocol, review schedule, and doctor notes in one view.',
  },
  {
    title: 'Continuity between reviews',
    body: 'Flag changes, log symptoms, and stay connected with your clinical care between consultations.',
  },
  {
    title: 'Biological age tracking',
    body: 'A running picture of how your biology is responding over time — not just a point-in-time result.',
  },
]

/* ─── App mockup ─────────────────────────────────────────── */
function AppMockup({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.2, ease }}
      className="flex justify-center lg:justify-end"
    >
      <div
        style={{
          width: 240,
          borderRadius: 32,
          background: '#080c10',
          border: '1.5px solid rgba(72,144,247,0.18)',
          boxShadow: '0 48px 80px rgba(0,0,0,0.6), 0 0 60px rgba(72,144,247,0.05)',
          padding: '10px 10px 16px',
          flexShrink: 0,
        }}
      >
        {/* Notch */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 60, height: 5, borderRadius: 3, background: '#0f1820' }} />
        </div>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px', marginBottom: 8 }}>
          <span style={{ fontSize: 7, color: '#1e2d3d', fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {[3,4,5,6].map(h => (
              <div key={h} style={{ width: 2.5, height: h, borderRadius: 1, background: h === 6 ? '#4890f7' : '#1e2d3d' }} />
            ))}
            <div style={{ width: 14, height: 7, borderRadius: 2, border: '1px solid #1e2d3d', marginLeft: 2, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: '70%', borderRadius: 1, background: '#4890f7' }} />
            </div>
          </div>
        </div>
        {/* App header */}
        <div style={{ padding: '0 8px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', marginBottom: 10 }}>
          <p style={{ fontSize: 6.5, color: '#2a3a4a', letterSpacing: '0.18em', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>APEX</p>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>Dashboard</p>
        </div>

        {/* Rate of ageing widget */}
        <div style={{ margin: '0 6px 8px', padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(72,144,247,0.12)' }}>
          <p style={{ fontSize: 7.5, color: '#4890f7', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Rate of Ageing</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 6 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1, letterSpacing: '-0.04em' }}>29</span>
              <span style={{ fontSize: 8, color: '#4a5a6a', display: 'block', marginTop: 1 }}>Biological age</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, paddingBottom: 12 }}>
              <svg viewBox="0 0 10 10" fill="none" width="8" height="8" aria-hidden="true">
                <path d="M5 8V2M2 5l3-3 3 3" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 8, color: '#4890f7', fontWeight: 700 }}>5 yrs younger</span>
            </div>
          </div>
          {/* Arc bar */}
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '72%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #6ba8ff)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 6.5, color: '#3a3a4a', fontWeight: 600 }}>FASTER</span>
            <span style={{ fontSize: 6.5, color: '#4890f7', fontWeight: 600 }}>SLOWER</span>
          </div>
        </div>

        {/* Latest results */}
        <div style={{ padding: '0 6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, padding: '0 2px' }}>
            <p style={{ fontSize: 8.5, fontWeight: 700, color: '#c5cdd6' }}>Latest Results</p>
            <span style={{ fontSize: 7, color: '#4890f7', fontWeight: 600 }}>View all →</span>
          </div>
          {/* Main result card */}
          <div style={{ borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '8px 10px', marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <p style={{ fontSize: 8, fontWeight: 700, color: '#8899aa' }}>Hormone Health Panel</p>
              <span style={{ fontSize: 6.5, color: '#2e3d4d' }}>Jun 2025</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 3 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#4890f7', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1 }}>54</span>
              <span style={{ fontSize: 7.5, color: '#3a4a5a' }}>/ 60 markers in range</span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '90%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #6ba8ff)' }} />
            </div>
          </div>
          {/* Marker rows */}
          {[
            { label: 'Testosterone', val: '22.4 nmol/L', ok: true },
            { label: 'HbA1c', val: '5.9%', ok: false },
            { label: 'Vitamin D', val: '92 nmol/L', ok: true },
          ].map((m) => (
            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px', borderRadius: 5, marginBottom: 3, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p style={{ fontSize: 7.5, color: '#6b7a8d' }}>{m.label}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 7.5, color: '#4a5a6a' }}>{m.val}</span>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: m.ok ? '#4890f7' : '#c9a84c' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function AppFeature() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="app-feature"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Apex app"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.03) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Apex App
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(26px, 3vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#f0f4f8',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Your data,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                visible over time.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="text-base leading-relaxed mb-8"
              style={{ color: '#6b7a8d', maxWidth: '440px' }}
            >
              The Apex App brings your biomarker history, protocol, and clinical progress into one place. Built for continuity — not just your next appointment.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="flex flex-col gap-5 mb-9"
            >
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.07, ease }}
                  className="flex items-start gap-3.5"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: '#4890f7', opacity: 0.7 }}
                  />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}>
                      {f.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
                      {f.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Coming soon badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.58, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              style={{
                background: 'rgba(72,144,247,0.06)',
                border: '1px solid rgba(72,144,247,0.15)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4890f7', opacity: 0.8 }} />
              <span className="text-xs font-semibold" style={{ color: '#4890f7' }}>Members get access on release</span>
            </motion.div>
          </div>

          {/* Right — app mockup */}
          <AppMockup inView={isInView} />

        </div>
      </div>
    </section>
  )
}
