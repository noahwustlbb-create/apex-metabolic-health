'use client'

import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

function fade(delay: number, y = 24) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: delay / 1000, ease },
  }
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const mp = (delay: number, y?: number) => (prefersReduced ? {} : fade(delay, y))

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      {/* Top-right glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 55%)',
        }}
      />

      {/* Dot-grid texture, lower right, fading out */}
      <div
        aria-hidden="true"
        className="dot-grid"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50%',
          height: '60%',
          pointerEvents: 'none',
          WebkitMaskImage: 'radial-gradient(ellipse at 100% 100%, black 0%, transparent 68%)',
          maskImage: 'radial-gradient(ellipse at 100% 100%, black 0%, transparent 68%)',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 5vw, 80px) clamp(64px, 10vw, 120px)',
        }}
      >
        <div style={{ maxWidth: 700 }}>

          {/* Headline */}
          <motion.h1
            {...mp(0, 36)}
            style={{
              fontSize: 'clamp(40px, 7vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.06,
              color: 'var(--text-primary)',
              marginBottom: 28,
              fontFamily: 'var(--font-inter)',
              textWrap: 'balance' as React.CSSProperties['textWrap'],
            }}
          >
            Your biology isn&apos;t broken.{' '}
            <span style={{ color: 'var(--blue)' }}>
              It isn&apos;t being measured.
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            {...mp(160)}
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '52ch',
              marginBottom: 48,
              textWrap: 'pretty' as React.CSSProperties['textWrap'],
            }}
          >
            Doctor-led hormone and metabolic care, designed for men who already know something&apos;s off.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...mp(300)}
            style={{ marginBottom: 28, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}
          >
            <a
              href="#treatments"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                padding: '17px 40px',
                borderRadius: 12,
                border: 'none',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 28px rgba(72,144,247,0.38), inset 0 1px 0 rgba(255,255,255,0.18)',
                fontFamily: 'var(--font-inter)',
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(72,144,247,0.5), inset 0 1px 0 rgba(255,255,255,0.22)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(72,144,247,0.38), inset 0 1px 0 rgba(255,255,255,0.18)'
              }}
            >
              Find your treatment
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="/how-it-works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--text-muted)',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-inter)',
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent',
                transition: 'color 0.18s ease',
                padding: '16px 4px',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              How it works
              <svg viewBox="0 0 16 16" fill="none" width={13} height={13} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Credential bar */}
          <motion.p
            {...mp(420)}
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            AHPRA-registered medical practitioners&nbsp;·&nbsp;No GP referral required&nbsp;·&nbsp;100% online across Australia
          </motion.p>

        </div>
      </div>
    </section>
  )
}
