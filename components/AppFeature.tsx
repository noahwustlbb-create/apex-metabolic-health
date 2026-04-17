'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

/* ─── Callout data ───────────────────────────────────────── */
const LEFT_CALLOUTS = [
  {
    title: 'Biomarker Trends',
    body: 'Every draw plots a point. Patterns emerge across months — not single moments.',
  },
  {
    title: 'Biological Age',
    body: 'See how your biology ages relative to your chronological years.',
  },
  {
    title: 'Review Timeline',
    body: 'Know exactly when your next review is — and what will be assessed.',
  },
]

const RIGHT_CALLOUTS = [
  {
    title: 'Protocol Visibility',
    body: 'Your current protocol, dosing schedule, and doctor notes. Always visible.',
  },
  {
    title: 'Clinical Progress',
    body: 'Track your treatment response between consultations, not just at them.',
  },
  {
    title: 'Clinical Team',
    body: 'Message your care team directly from the app without leaving the platform.',
  },
]

/* ─── Phone mockup ───────────────────────────────────────── */
export function AppPhoneMockup({ inView, delay = 0.2 }: { inView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease }}
      className="flex justify-center"
    >
      <div
        style={{
          width: 240,
          borderRadius: 32,
          background: '#080c10',
          border: '1.5px solid rgba(72,144,247,0.2)',
          boxShadow:
            '0 48px 80px rgba(0,0,0,0.7), 0 0 80px rgba(72,144,247,0.1), 0 0 160px rgba(72,144,247,0.04)',
          padding: '10px 10px 16px',
          flexShrink: 0,
        }}
      >
        {/* Dynamic island */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div
            style={{
              width: 72,
              height: 6,
              borderRadius: 3,
              background: '#0a0e14',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        </div>

        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 8px',
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 7, color: '#2a3a4a', fontWeight: 700 }}>9:41</span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {[3, 4, 5, 6].map((h) => (
              <div
                key={h}
                style={{
                  width: 2.5,
                  height: h,
                  borderRadius: 1,
                  background: h >= 5 ? '#4890f7' : '#1e2d3d',
                }}
              />
            ))}
            <div
              style={{
                width: 14,
                height: 7,
                borderRadius: 2,
                border: '1px solid #1e2d3d',
                marginLeft: 2,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 1,
                  top: 1,
                  bottom: 1,
                  width: '75%',
                  borderRadius: 1,
                  background: '#4890f7',
                }}
              />
            </div>
          </div>
        </div>

        {/* App header */}
        <div
          style={{
            padding: '0 8px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontSize: 6.5,
              color: '#2a3a4a',
              letterSpacing: '0.18em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            APEX
          </p>
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: '#f0f4f8',
              fontFamily: 'var(--font-space-grotesk)',
              letterSpacing: '-0.02em',
            }}
          >
            Dashboard
          </p>
        </div>

        {/* Biological Age widget */}
        <div
          style={{
            margin: '0 6px 8px',
            padding: '10px',
            borderRadius: 10,
            background: 'rgba(72,144,247,0.05)',
            border: '1px solid rgba(72,144,247,0.15)',
          }}
        >
          <p
            style={{
              fontSize: 7,
              color: '#4890f7',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Biological Age
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 7,
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#f0f4f8',
                  fontFamily: 'var(--font-space-grotesk)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                31
              </span>
              <span style={{ fontSize: 7.5, color: '#4a5a6a', display: 'block', marginTop: 1 }}>
                biological
              </span>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: 10 }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#2a3a4a',
                  fontFamily: 'var(--font-space-grotesk)',
                  lineHeight: 1,
                }}
              >
                38
              </span>
              <span style={{ fontSize: 7.5, color: '#3a4a5a', display: 'block', marginTop: 1 }}>
                chronological
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <svg viewBox="0 0 10 10" fill="none" width="8" height="8" aria-hidden="true">
              <path
                d="M5 8V2M2 5l3-3 3 3"
                stroke="#4890f7"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ fontSize: 7.5, color: '#4890f7', fontWeight: 700 }}>
              7 years younger than calendar age
            </span>
          </div>
        </div>

        {/* Testosterone sparkline */}
        <div
          style={{
            margin: '0 6px 8px',
            padding: '8px 10px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <p style={{ fontSize: 7.5, fontWeight: 700, color: '#6b7a8d' }}>Testosterone</p>
            <span style={{ fontSize: 8, color: '#4890f7', fontWeight: 700 }}>22.4 nmol/L</span>
          </div>
          <svg
            viewBox="0 0 200 38"
            fill="none"
            width="100%"
            style={{ display: 'block' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4890f7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4890f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 30 L32 26 L64 20 L96 16 L128 11 L160 7 L200 4"
              stroke="#4890f7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M0 30 L32 26 L64 20 L96 16 L128 11 L160 7 L200 4 L200 38 L0 38 Z"
              fill="url(#sparkGrad)"
            />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <span style={{ fontSize: 6.5, color: '#2a3a4a' }}>Jan</span>
            <span style={{ fontSize: 6.5, color: '#2a3a4a' }}>Apr</span>
            <span style={{ fontSize: 6.5, color: '#4890f7', fontWeight: 600 }}>Now</span>
          </div>
        </div>

        {/* Active Protocol row */}
        <div
          style={{
            margin: '0 6px',
            padding: '8px 10px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <p style={{ fontSize: 7.5, fontWeight: 700, color: '#6b7a8d' }}>Active Protocol</p>
            <div
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#4890f7', opacity: 0.8 }}
            />
          </div>
          <p style={{ fontSize: 7.5, color: '#3a4a5a', marginTop: 3 }}>
            Next review: 14 Aug 2025
          </p>
        </div>

        {/* Bottom nav */}
        <div
          style={{
            marginTop: 12,
            padding: '0 6px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {['Dashboard', 'Results', 'Protocol', 'Team'].map((tab, i) => (
            <div
              key={tab}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: i === 0 ? 'rgba(72,144,247,0.15)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 1,
                    background: i === 0 ? '#4890f7' : '#2a3a4a',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 5.5,
                  color: i === 0 ? '#4890f7' : '#2a3a4a',
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {tab}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Left callout (right-aligned, dot on right) ─────────── */
function LeftCallout({
  title,
  body,
  index,
  inView,
}: {
  title: string
  body: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease }}
      className="flex flex-col items-end text-right gap-1.5"
    >
      <div className="flex items-center gap-2.5">
        <p
          className="text-sm font-bold"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}
        >
          {title}
        </p>
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(72,144,247,0.65)' }}
        />
      </div>
      <p
        className="text-xs leading-relaxed"
        style={{ color: '#4a5a6a', maxWidth: '200px' }}
      >
        {body}
      </p>
    </motion.div>
  )
}

/* ─── Right callout (left-aligned, dot on left) ──────────── */
function RightCallout({
  title,
  body,
  index,
  inView,
}: {
  title: string
  body: string
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease }}
      className="flex flex-col items-start text-left gap-1.5"
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'rgba(72,144,247,0.65)' }}
        />
        <p
          className="text-sm font-bold"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-xs leading-relaxed pl-4"
        style={{ color: '#4a5a6a', maxWidth: '200px' }}
      >
        {body}
      </p>
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(72,144,247,0.06) 0%, transparent 55%)',
        }}
      />

      <div ref={ref} className="container-tight relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14">
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
            }}
          >
            Your care,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              visible over time.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-base leading-relaxed mt-4 mx-auto"
            style={{ color: '#6b7a8d', maxWidth: '480px' }}
          >
            Biomarkers, protocols, and clinical progress — in one place. Built for continuity, not
            just your next appointment.
          </motion.p>
        </div>

        {/* ── Desktop: 3-column editorial layout ── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-12 items-center mb-14">

          {/* Left callouts */}
          <div className="flex flex-col gap-10 justify-center">
            {LEFT_CALLOUTS.map((c, i) => (
              <LeftCallout key={c.title} title={c.title} body={c.body} index={i} inView={isInView} />
            ))}
          </div>

          {/* Phone — center */}
          <AppPhoneMockup inView={isInView} delay={0.2} />

          {/* Right callouts */}
          <div className="flex flex-col gap-10 justify-center">
            {RIGHT_CALLOUTS.map((c, i) => (
              <RightCallout key={c.title} title={c.title} body={c.body} index={i} inView={isInView} />
            ))}
          </div>

        </div>

        {/* ── Mobile: phone + 2-col callout grid ── */}
        <div className="lg:hidden flex flex-col items-center gap-10 mb-10">
          <AppPhoneMockup inView={isInView} delay={0.2} />
          <div className="grid grid-cols-2 gap-5 w-full">
            {[...LEFT_CALLOUTS, ...RIGHT_CALLOUTS].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease }}
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(72,144,247,0.65)' }}
                  />
                  <p
                    className="text-xs font-bold"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}
                  >
                    {c.title}
                  </p>
                </div>
                <p
                  className="text-[11px] leading-relaxed pl-3"
                  style={{ color: '#4a5a6a' }}
                >
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75, ease }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/membership" className="btn-teal">
            Join Apex Membership
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <p className="text-xs" style={{ color: '#3a4a5a' }}>
            App included with all active memberships at launch
          </p>
        </motion.div>

      </div>
    </section>
  )
}
