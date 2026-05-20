'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

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
          backgroundColor: '#0A0A0A',
          borderBottom: '1px solid #1E1E1E',
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between h-[68px] md:h-[76px]">

          {/* Logo — pure wordmark */}
          <Link href="/" className="flex flex-col flex-shrink-0 select-none" aria-label="Apex Metabolic Health" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '18px',
              letterSpacing: '0.15em',
              color: '#F5F5F5',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              APEX
            </span>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#888888',
              lineHeight: 1,
              marginTop: '3px',
              textTransform: 'uppercase',
            }}>
              Metabolic Health
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">

            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="flex items-center gap-0.5">
                <Link
                  href="/services"
                  className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                  style={{ color: '#888888' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#888888' }}
                >
                  Clinical Programs
                </Link>
                <button
                  className="flex items-center p-1 transition-colors duration-200"
                  style={{ color: '#888888' }}
                  aria-expanded={programsOpen}
                  aria-haspopup="true"
                  aria-label="Open programs menu"
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-2.5 h-2.5 transition-transform duration-200"
                    style={{ transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-4 z-50"
                    style={{
                      width: 300,
                      background: '#111111',
                      border: '1px solid #1E1E1E',
                      borderRadius: 4,
                      boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
                      padding: '8px',
                    }}
                  >
                    {NAV_PROGRAMS.map((program) =>
                      program.comingSoon ? (
                        <div
                          key={program.slug}
                          className="flex items-center justify-between px-3.5 py-2.5 text-[13px]"
                          style={{ color: '#444444', cursor: 'default' }}
                        >
                          <span>{program.name}</span>
                          <span
                            className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5"
                            style={{ color: '#C8A96E', background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}
                          >
                            Soon
                          </span>
                        </div>
                      ) : (
                        <Link
                          key={program.slug}
                          href={`/programs/${program.slug}`}
                          className="block px-3.5 py-2.5 text-[13px] transition-all duration-150"
                          style={{ color: '#888888' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = '#F5F5F5'
                            e.currentTarget.style.background = '#1A1A1A'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = '#888888'
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {program.name}
                        </Link>
                      )
                    )}
                    <div style={{ borderTop: '1px solid #1E1E1E', marginTop: 4, paddingTop: 4 }}>
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3.5 py-2.5 text-[12px] font-semibold transition-all duration-150"
                        style={{ color: '#C8A96E' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A' }}
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
              <Link
                key={link.href}
                href={link.href}
                className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                style={{ color: '#888888' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888888' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/order-bloods"
              className="text-[12px] font-medium tracking-wide transition-all duration-200 whitespace-nowrap px-4 py-2"
              style={{ color: '#F5F5F5', border: '1px solid #1E1E1E', borderRadius: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8A96E' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E' }}
            >
              Order Bloods
            </Link>
            <Link
              href="/intake/pre-screen"
              className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap"
              style={{
                background: '#C8A96E',
                color: '#0A0A0A',
                padding: '9px 20px',
                borderRadius: '2px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4B97E' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C8A96E' }}
            >
              Start Assessment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px" style={{ background: '#F5F5F5' }} />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} className="block w-5 h-px" style={{ background: '#F5F5F5' }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="block w-5 h-px" style={{ background: '#F5F5F5' }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: '#0A0A0A' }}
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
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.26, delay: i * 0.055 + 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 text-[22px] font-light border-b transition-colors duration-150"
                      style={{
                        color: '#888888',
                        borderColor: '#1E1E1E',
                        fontFamily: 'var(--font-inter)',
                        letterSpacing: '0.04em',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#888888' }}
                    >
                      {link.label}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.25 }} aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="px-6 pt-5"
              >
                <Link href="/order-bloods" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#555555' }}>
                  Order Bloods →
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.32, delay: 0.22 }}
              className="px-6 pb-10 pt-5 flex flex-col gap-3"
              style={{ borderTop: '1px solid #1E1E1E' }}
            >
              <Link
                href="/intake/pre-screen"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-[13px] font-bold tracking-[0.1em] uppercase py-4"
                style={{ background: '#C8A96E', color: '#0A0A0A', borderRadius: '2px' }}
              >
                Start My Assessment
              </Link>
              <div className="flex items-center justify-center gap-6">
                <Link href="/intake/hormone-consult" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#C8A96E' }}>Hormone Consult →</Link>
                <span style={{ color: '#1E1E1E' }}>|</span>
                <Link href="/intake/general-consult" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: '#C8A96E' }}>General Consult →</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
