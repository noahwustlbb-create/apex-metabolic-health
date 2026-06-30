'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_PROGRAMS = [
  { name: 'Hormone Optimisation',      type: 'hormone'   },
  { name: 'Weight Loss',               type: 'weight'    },
  { name: 'Sexual Health',             type: 'sexual'    },
  { name: 'Recovery & Performance',    type: 'recovery'  },
  { name: 'Anti-Ageing & Longevity',   type: 'longevity' },
  { name: 'Skin & Hair',               type: 'skinhair'  },
  { name: 'Repeat Order',              type: 'repeat',   href: '/intake/repeat-order' },
]

// Desktop: 4 items only. Complexity stays hidden.
const DESKTOP_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Membership',   href: '/membership'   },
  { label: 'About',        href: '/about'        },
]

// Mobile drawer: everything
const MOBILE_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Programs',     href: '/services'     },
  { label: 'Membership',   href: '/membership'   },
  { label: 'Pricing',      href: '/pricing'      },
  { label: 'About',        href: '/about'        },
  { label: 'FAQs',         href: '/faqs'         },
]

const TEXT = 'var(--text-primary)'
const BLUE = '#4890f7'

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled ? 'rgba(4,6,13,0.97)' : 'rgba(4,6,13,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(72,144,247,0.14)' : 'rgba(72,144,247,0.06)'}`,
        }}
      >
        <div
          className="mx-auto w-full max-w-[1440px] flex items-center justify-between"
          style={{ padding: '0 40px', height: '88px' }}
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
              color: '#f0f5ff',
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
            >
              <button
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                aria-expanded={programsOpen}
                aria-haspopup="true"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT }}
              >
                Explore Programs
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" style={{ transition: 'transform 0.2s', transform: programsOpen ? 'rotate(180deg)' : 'rotate(0)' }} aria-hidden="true">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.14, ease: 'easeOut' }}
                    className="absolute top-full mt-5 z-50"
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 264,
                      background: '#0d1525',
                      border: '1px solid rgba(72,144,247,0.18)',
                      borderRadius: 10,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(72,144,247,0.08)',
                      padding: '8px',
                    }}
                  >
                    {NAV_PROGRAMS.map((p) => (
                      <Link
                        key={p.type}
                        href={p.href ?? `/start?t=${p.type}`}
                        onClick={() => setProgramsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderRadius: 7, fontSize: '13px', color: '#c8d8f0', textDecoration: 'none', transition: 'background 0.12s, color 0.12s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.08)'; e.currentTarget.style.color = '#f0f5ff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8d8f0' }}
                      >
                        {p.name}
                        <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0 opacity-30" aria-hidden="true">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(72,144,247,0.1)', marginTop: '6px', paddingTop: '6px' }}>
                      <Link
                        href="/start"
                        onClick={() => setProgramsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderRadius: 7, fontSize: '12px', fontWeight: 600, color: BLUE, textDecoration: 'none', transition: 'background 0.12s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.08)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                      >
                        Not sure? Take the assessment
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
            <a
              href="https://app.apexmetabolichealth.com.au/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-inter)',
                fontSize: '12.5px',
                fontWeight: 500,
                color: '#a8c4e8',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a8c4e8' }}
            >
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2.5 13.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Log in
            </a>
            <Link
              href="/start"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '12.5px',
                fontWeight: 500,
                color: '#a8c4e8',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a8c4e8' }}
            >
              Health Assessment
            </Link>
            <Link
              href="/start"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: BLUE,
                color: '#ffffff',
                padding: '10px 22px',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(72,144,247,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.background = BLUE; e.currentTarget.style.boxShadow = 'none' }}
            >
              Get Started
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-[22px] h-px" style={{ background: '#f0f5ff' }} />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.18 }} className="block w-[22px] h-px" style={{ background: '#f0f5ff' }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} className="block w-[22px] h-px" style={{ background: '#f0f5ff' }} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: '#04060d' }}
          >
            <div className="flex flex-col flex-1 overflow-y-auto" style={{ paddingTop: '88px' }}>
              <nav className="flex flex-col px-6 pt-4" aria-label="Primary navigation">
                {MOBILE_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, delay: i * 0.05 + 0.03 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-5 border-b"
                      style={{
                        color: '#f0f5ff',
                        borderColor: 'rgba(72,144,247,0.1)',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '22px',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        textDecoration: 'none',
                      }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.18 }}
              className="px-6 pb-10 pt-5 flex flex-col gap-3"
              style={{ borderTop: '1px solid rgba(72,144,247,0.1)' }}
            >
              <Link
                href="/start"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full"
                style={{ background: BLUE, color: '#ffffff', padding: '16px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em' }}
              >
                Get Started
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/start"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full"
                style={{ border: '1px solid rgba(72,144,247,0.3)', color: '#a8c4e8', padding: '15px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
              >
                Health Assessment
              </Link>
              <a
                href="https://app.apexmetabolichealth.com.au/login"
                className="flex items-center justify-center gap-2 w-full"
                style={{ color: 'rgba(168,196,232,0.6)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', paddingTop: '4px' }}
              >
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                  <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2.5 13.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Log in to your account
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
