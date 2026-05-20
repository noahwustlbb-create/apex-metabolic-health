'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const NAV_PROGRAMS = [
  { name: 'Hormone Optimisation',    slug: 'hormone-optimisation',  comingSoon: false },
  { name: 'Performance & Recovery',  slug: 'performance-plus',      comingSoon: false },
  { name: 'Metabolic & Weight',      slug: 'metabolic-weight-loss', comingSoon: false },
  { name: 'Hair Restoration',        slug: 'hair-restoration',      comingSoon: false },
  { name: 'Skin Regeneration',       slug: 'skin-regeneration',     comingSoon: false },
  { name: 'Injury Repair & Recovery',slug: 'injury-repair',         comingSoon: false },
  { name: 'Longevity Protocol',      slug: 'longevity',             comingSoon: true  },
]

const navLinks = [
  { label: 'Membership',    href: '/membership'    },
  { label: 'What We Treat', href: '/what-we-treat' },
  { label: 'Our Approach',  href: '/our-approach'  },
  { label: 'Pricing',       href: '/pricing'       },
  { label: 'FAQs',          href: '/faqs'          },
]

const LINK_STYLE = { color: 'rgba(255,255,255,0.45)' }
const LINK_HOVER = { color: '#ffffff' }

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
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
          backgroundColor: scrolled ? 'rgba(7,8,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between h-[68px] md:h-[76px]">

          {/* Logo */}
          <Link href="/" className="flex flex-col flex-shrink-0 select-none" aria-label="Apex Metabolic Health" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1 }}>
              APEX
            </span>
            <span style={{ display: 'block', height: '1px', background: 'rgba(255,255,255,0.18)', margin: '3px 0 4px' }} />
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontWeight: 400, fontSize: '7px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', lineHeight: 1 }}>
              Metabolic Health
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">

            {/* Clinical Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="flex items-center gap-0.5">
                <Link
                  href="/services"
                  className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                  style={LINK_STYLE}
                  onMouseEnter={e => { Object.assign(e.currentTarget.style, LINK_HOVER) }}
                  onMouseLeave={e => { Object.assign(e.currentTarget.style, LINK_STYLE) }}
                >
                  Clinical Programs
                </Link>
                <button
                  className="flex items-center p-1 transition-colors duration-200"
                  style={LINK_STYLE}
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
                      background: '#0f1115',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12,
                      boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
                      padding: '8px',
                    }}
                  >
                    {NAV_PROGRAMS.map((program) =>
                      program.comingSoon ? (
                        <div
                          key={program.slug}
                          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[13px]"
                          style={{ color: '#3a4a5a', cursor: 'default' }}
                        >
                          <span>{program.name}</span>
                          <span
                            className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm"
                            style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
                          >
                            Soon
                          </span>
                        </div>
                      ) : (
                        <Link
                          key={program.slug}
                          href={`/programs/${program.slug}`}
                          className="block px-3.5 py-2.5 rounded-lg text-[13px] transition-all duration-150"
                          style={{ color: 'rgba(242,239,233,0.55)' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = '#f2efe9'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'rgba(242,239,233,0.55)'
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {program.name}
                        </Link>
                      )
                    )}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4, paddingTop: 4 }}>
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-150"
                        style={{ color: '#4890f7' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.06)' }}
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
                style={LINK_STYLE}
                onMouseEnter={e => { Object.assign(e.currentTarget.style, LINK_HOVER) }}
                onMouseLeave={e => { Object.assign(e.currentTarget.style, LINK_STYLE) }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/order-bloods"
              className="text-[12.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
              style={{ color: 'rgba(242,239,233,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(242,239,233,0.7)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,239,233,0.3)' }}
            >
              Order Bloods
            </Link>
            <Link
              href="/intake/pre-screen"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                background: '#f2efe9',
                color: '#07080a',
                padding: '9px 20px',
                borderRadius: '999px',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.boxShadow = '0 0 28px rgba(72,144,247,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f2efe9'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Assessment
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px"
              style={{ background: '#f2efe9' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px"
              style={{ background: '#f2efe9' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px"
              style={{ background: '#f2efe9' }}
            />
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
            style={{ backgroundColor: '#07080a' }}
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
                      className="flex items-center justify-between py-4 text-[22px] font-semibold border-b transition-colors duration-150"
                      style={{
                        color: 'rgba(242,239,233,0.75)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        fontFamily: 'var(--font-space-grotesk)',
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#f2efe9' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,239,233,0.75)' }}
                    >
                      {link.label}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" style={{ opacity: 0.2 }} aria-hidden="true">
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
                <Link
                  href="/order-bloods"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: '#3a4a5a' }}
                >
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
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Link
                href="/intake/pre-screen"
                onClick={() => setMenuOpen(false)}
                className="btn-primary justify-center w-full text-[14px]"
                style={{ padding: '15px 24px' }}
              >
                Start My Assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="flex items-center justify-center gap-6">
                <Link
                  href="/intake/hormone-consult"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: '#4890f7' }}
                >
                  Hormone Consult →
                </Link>
                <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
                <Link
                  href="/intake/general-consult"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium transition-colors duration-150"
                  style={{ color: '#4890f7' }}
                >
                  General Consult →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
