'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const HeroStartModal = dynamic(() => import('./HeroStartModal'), { ssr: false })

// Entrance is CSS (.hero-in in globals.css), not Framer: the headline is the
// page's LCP element and must be painted by the server-rendered HTML, then
// animate. Gating it on hydration cost 10 seconds of LCP on a throttled phone.
export default function Hero() {
  const [startOpen, setStartOpen] = useState(false)

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
      {/* Signature texture: the same macro language as the protocol grid,
          masked so it lives in the top-right and never fights the headline. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'url(/protocols/hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: '70% 40%',
          opacity: 0.55,
          WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 85% 30%, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse 70% 80% at 85% 30%, black 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.10) 0%, transparent 55%)',
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-12 lg:gap-20 items-center">
        <div style={{ maxWidth: 700 }}>

          {/* Headline */}
          <h1
            className="hero-in"
            style={{
              animationDelay: '0ms',
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
          </h1>

          {/* Body */}
          <p
            className="hero-in"
            style={{
              animationDelay: '160ms',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '52ch',
              marginBottom: 48,
              textWrap: 'pretty' as React.CSSProperties['textWrap'],
            }}
          >
            Doctor-led hormone and metabolic care, designed for anyone who already knows something&apos;s off.
          </p>

          {/* CTAs */}
          <div
            className="hero-in"
            style={{ animationDelay: '300ms', marginBottom: 28, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}
          >
            {/* Primary: Get started → intake form or create account */}
            <button
              type="button"
              onClick={() => setStartOpen(true)}
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
                cursor: 'pointer',
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
              Get started
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Secondary: Find your treatment → treatment selector */}
            <a
              href="#treatments"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: 15,
                fontWeight: 600,
                padding: '16px 28px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-inter)',
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent',
                transition: 'border-color 0.18s ease, background-color 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--blue)'
                e.currentTarget.style.backgroundColor = 'rgba(72,144,247,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Find my treatment
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

          </div>

          {/* Credential bar */}
          <p
            className="hero-in"
            style={{
              animationDelay: '420ms',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            AHPRA-registered medical practitioners&nbsp;·&nbsp;No GP referral required&nbsp;·&nbsp;100% online across Australia
          </p>

        </div>

        {/* Brand visual - desktop only, decorative */}
        <div
          className="hero-in hidden lg:block relative"
          style={{ animationDelay: '360ms' }}
          aria-hidden="true"
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 40px 90px rgba(0,0,0,0.28)',
            }}
          >
            <Image
              src="/team/team-sofa.webp"
              alt=""
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 1024px) 420px, 0px"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            {/* Subtle blue wash to marry the light interior into the dark hero */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg) 28%, transparent) 100%)',
              }}
            />
          </div>
        </div>

        </div>
      </div>

      <AnimatePresence>
        {startOpen && <HeroStartModal onClose={() => setStartOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
