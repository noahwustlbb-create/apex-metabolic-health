'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { CANONICAL_PROGRAMS } from '@/lib/canonical-programs'
import { useSignupGate } from '@/context/SignupGateContext'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_PROGRAMS = [
  ...CANONICAL_PROGRAMS.map(p => ({ name: p.name, type: p.navType, href: p.websiteHref })),
]

// Desktop: 4 items only. Complexity stays hidden.
const DESKTOP_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing',      href: '/pricing'      },
  { label: 'Membership',   href: '/membership'   },
  { label: 'About',        href: '/about'        },
]

// Mobile drawer: everything
const MOBILE_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Treatments',   href: '/services'     },
  { label: 'Membership',   href: '/membership'   },
  { label: 'Pricing',      href: '/pricing'      },
  { label: 'About',        href: '/about'        },
  { label: 'FAQs',         href: '/faqs'         },
]

const TEXT = 'var(--text-primary)'
const BLUE = 'var(--blue)'

export default function Nav() {
  const prefersReduced = useReducedMotion()
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const programsButtonRef               = useRef<HTMLButtonElement>(null)
  const { open } = useSignupGate()

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const linkStyle = {
    color: TEXT,
    fontFamily: 'var(--font-inter)',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.01em',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
  }

  return (
    <>
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid var(--nav-border-scrolled)' : '1px solid var(--nav-border)',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div
          className="mx-auto w-full max-w-[1440px] flex items-center justify-between px-5 md:px-10 h-[70px] md:h-[88px]"
        >

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex flex-col flex-shrink-0 select-none"
            aria-label="Apex Metabolic Health — Home"
            style={{ textDecoration: 'none', gap: '5px' }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: '20px',
              letterSpacing: '0.22em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              APEX
            </span>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              fontSize: '9.5px',
              letterSpacing: '0.2em',
              color: BLUE,
              lineHeight: 1,
              textTransform: 'uppercase',
              opacity: 0.85,
            }}>
              Metabolic Health
            </span>
          </Link>

          {/* ── Desktop centre nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">

            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
              onFocus={() => setProgramsOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setProgramsOpen(false)
                }
              }}
            >
              <button
                ref={programsButtonRef}
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-expanded={programsOpen}
                aria-haspopup="menu"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setProgramsOpen(false)
                    programsButtonRef.current?.focus()
                  }
                }}
              >
                Treatments
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" style={{ transition: 'transform 0.2s', transform: programsOpen ? 'rotate(180deg)' : 'rotate(0)' }} aria-hidden="true">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    role="menu"
                    initial={prefersReduced ? false : { opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.14, ease: 'easeOut' }}
                    className="absolute top-full mt-5 z-50"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 264,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 10,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
                      padding: '8px',
                    }}
                  >
                    {NAV_PROGRAMS.map((p) => (
                      <Link
                        key={p.type}
                        href={p.href ?? `/start?t=${p.type}`}
                        role="menuitem"
                        onClick={() => setProgramsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderRadius: 7, fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'background 0.12s, color 0.12s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.09)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setProgramsOpen(false)
                            programsButtonRef.current?.focus()
                          }
                        }}
                      >
                        {p.name}
                        <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0 opacity-30" aria-hidden="true">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border)', marginTop: '6px', paddingTop: '6px' }}>
                      <Link
                        href="/start"
                        role="menuitem"
                        onClick={() => setProgramsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderRadius: 7, fontSize: '12px', fontWeight: 600, color: BLUE, textDecoration: 'none', transition: 'background 0.12s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.08)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        onKeyDown={(e) => { if (e.key === 'Escape') { setProgramsOpen(false); programsButtonRef.current?.focus() } }}
                      >
                        Not sure? Start your assessment
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {DESKTOP_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={linkStyle}
                onMouseEnter={e => { e.currentTarget.style.color = BLUE }}
                onMouseLeave={e => { e.currentTarget.style.color = TEXT }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Desktop right CTAs ── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://app.apexmetabolichealth.com.au/login"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '12.5px',
                fontWeight: 500,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              Log in
            </a>
            <button
              type="button"
              onClick={() => open()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                color: '#ffffff',
                padding: '10px 22px',
                borderRadius: '12px',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(72,144,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                cursor: 'pointer',
                border: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(72,144,247,0.48), inset 0 1px 0 rgba(255,255,255,0.18)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(72,144,247,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}
            >
              Get Started
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ── Mobile right: Get Started + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            {!menuOpen && (
              <button
                type="button"
                onClick={() => open()}
                style={{
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                  color: '#fff',
                  padding: '13px 16px',
                  minHeight: '44px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(72,144,247,0.32)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Get Started
              </button>
            )}
            <button
              className="flex flex-col justify-center gap-[5px] p-2 min-h-[44px] min-w-[44px]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }} className="block w-[22px] h-px" style={{ background: 'var(--text-primary)' }} />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.18 }} className="block w-[22px] h-px" style={{ background: 'var(--text-primary)' }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }} className="block w-[22px] h-px" style={{ background: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 z-[49] md:hidden flex flex-col"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <div className="flex flex-col flex-1 overflow-y-auto pt-[70px] md:pt-[88px]">
              <nav className="flex flex-col px-6 pt-4" aria-label="Primary navigation">
                {MOBILE_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.24, delay: i * 0.05 + 0.03 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-5 border-b"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', fontFamily: 'var(--font-inter)', fontSize: '22px', fontWeight: 600, letterSpacing: '-0.02em', textDecoration: 'none' }}
                    >
                      {link.label}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.2 }} aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

              </nav>
            </div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.28, delay: 0.18 }}
              className="px-6 pb-10 pt-5 flex flex-col gap-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <button
                type="button"
                onClick={() => { setMenuOpen(false); open() }}
                className="flex items-center justify-center gap-2 w-full"
                style={{
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                  color: '#ffffff',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  boxShadow: '0 6px 20px rgba(72,144,247,0.38), inset 0 1px 0 rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                Get Started
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href="https://app.apexmetabolichealth.com.au/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full"
                style={{ border: '1px solid rgba(72,144,247,0.35)', color: 'var(--blue)', padding: '15px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
              >
                Log in
              </a>
              <div className="flex items-center justify-between pt-1">
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>Appearance</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
