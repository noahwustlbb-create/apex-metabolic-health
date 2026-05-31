'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'

const NAV_PROGRAMS = [
  { name: 'Hormone Optimisation',     slug: 'hormone-optimisation',  comingSoon: false },
  { name: 'Performance & Recovery',   slug: 'performance-plus',      comingSoon: false },
  { name: 'Metabolic & Weight',       slug: 'metabolic-weight-loss', comingSoon: false },
  { name: 'Hair Restoration',         slug: 'hair-restoration',      comingSoon: false },
  { name: 'Skin Regeneration',        slug: 'skin-regeneration',     comingSoon: false },
  { name: 'Injury Repair & Recovery', slug: 'injury-repair',         comingSoon: false },
  { name: 'Longevity Protocol',       slug: 'longevity',             comingSoon: true  },
]

const navLinks = [
  { label: 'Membership',    href: '/membership'    },
  { label: 'What We Treat', href: '/what-we-treat' },
  { label: 'Our Approach',  href: '/our-approach'  },
  { label: 'Pricing',       href: '/pricing'       },
  { label: 'FAQs',          href: '/faqs'          },
]

export default function Nav() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid var(--nav-border-scrolled)' : '1px solid var(--nav-border)',
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between h-[68px] md:h-[76px]">

          {/* Logo — pure wordmark */}
          <Link href="/" className="flex flex-col flex-shrink-0 select-none" aria-label="Apex Metabolic Health" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '17px',
              letterSpacing: '0.15em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              APEX
            </span>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#4890f7',
              lineHeight: 1,
              marginTop: '3px',
              textTransform: 'uppercase',
            }}>
              Metabolic Health
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            <div className="relative" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
              <div className="flex items-center gap-0.5">
                <Link
                  href="/services"
                  className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#4890f7' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                >
                  Clinical Programs
                </Link>
                <button className="flex items-center p-1" style={{ color: 'var(--text-primary)' }} aria-expanded={programsOpen} aria-haspopup="true" aria-label="Open programs menu">
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 transition-transform duration-200" style={{ transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} aria-hidden="true">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-4 z-50"
                    style={{ width: 300, background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 16px 48px rgba(72,144,247,0.1), 0 2px 12px rgba(0,0,0,0.06)', padding: '8px' }}
                  >
                    {NAV_PROGRAMS.map((program) =>
                      program.comingSoon ? (
                        <div key={program.slug} className="flex items-center justify-between px-3.5 py-2.5 text-[13px]" style={{ color: 'rgba(72,144,247,0.4)', cursor: 'default' }}>
                          <span>{program.name}</span>
                          <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm" style={{ color: '#4890f7', background: 'rgba(72,144,247,0.07)', border: '1px solid rgba(72,144,247,0.18)' }}>Soon</span>
                        </div>
                      ) : (
                        <Link key={program.slug} href={`/programs/${program.slug}`}
                          className="block px-3.5 py-2.5 rounded-lg text-[13px] transition-all duration-150"
                          style={{ color: 'var(--text-primary)' }}
                          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--elevated-high)' }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'transparent' }}
                        >{program.name}</Link>
                      )
                    )}
                    <div style={{ borderTop: '1px solid rgba(72,144,247,0.1)', marginTop: 4, paddingTop: 4 }}>
                      <Link href="/services"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-150"
                        style={{ color: '#4890f7' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--elevated-high)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                      >
                        View all programs
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4890f7' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
              >{link.label}</Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200"
              style={{ color: 'var(--text-primary)', background: 'var(--surface)' }}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <Link href="/order-bloods"
              className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
              style={{ color: '#4890f7' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#2563eb' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4890f7' }}
            >Order Bloods</Link>
            <Link href="/intake/pre-screen"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap"
              style={{ background: '#4890f7', color: '#ffffff', padding: '9px 20px', borderRadius: '999px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(72,144,247,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#4890f7'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Start Assessment
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ color: 'var(--text-primary)', background: 'var(--surface)' }}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button className="flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px" style={{ background: 'var(--text-primary)' }} />
              <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block w-5 h-px" style={{ background: 'var(--text-primary)' }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px" style={{ background: 'var(--text-primary)' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <div className="flex flex-col flex-1 overflow-y-auto" style={{ paddingTop: '76px' }}>
              <nav className="flex flex-col px-6 pt-6" aria-label="Primary navigation">
                {[
                  { label: 'Clinical Programs', href: '/services'       },
                  { label: 'Membership',        href: '/membership'    },
                  { label: 'Our Approach',      href: '/our-approach'  },
                  { label: 'What We Treat',     href: '/what-we-treat' },
                  { label: 'Pricing',           href: '/pricing'       },
                  { label: 'FAQs',              href: '/faqs'          },
                ].map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.26, delay: i * 0.055 + 0.04 }}>
                    <Link href={link.href} onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 text-[22px] font-semibold border-b"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--border)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.01em' }}
                    >
                      {link.label}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.25 }} aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="px-6 pt-5">
                <Link href="/order-bloods" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#4890f7' }}>Order Bloods →</Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.32, delay: 0.22 }}
              className="px-6 pb-10 pt-5 flex flex-col gap-3"
              style={{ borderTop: '1px solid rgba(72,144,247,0.1)' }}
            >
              <Link href="/intake/pre-screen" onClick={() => setMenuOpen(false)} className="btn-primary justify-center w-full text-[14px]" style={{ padding: '15px 24px' }}>
                Start My Assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="flex items-center justify-center gap-6">
                <Link href="/intake/hormone-consult" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#4890f7' }}>Hormone Consult →</Link>
                <span style={{ color: 'rgba(72,144,247,0.2)' }}>|</span>
                <Link href="/intake/general-consult" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#4890f7' }}>General Consult →</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
