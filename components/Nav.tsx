'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
const NAV_PROGRAMS = [
  { name: 'Hormone Optimisation',     slug: 'hormone-optimisation',  comingSoon: false },
  { name: 'Performance & Recovery',   slug: 'performance-plus',      comingSoon: false },
  { name: 'Metabolic & Weight',       slug: 'metabolic-weight-loss', comingSoon: false },
  { name: 'Hair Restoration',          slug: 'hair-restoration',      comingSoon: false },
  { name: 'Skin Regeneration',         slug: 'skin-regeneration',     comingSoon: false },
  { name: 'Injury Repair & Recovery',  slug: 'injury-repair',         comingSoon: false },
  { name: 'Longevity Protocol',       slug: 'longevity',             comingSoon: true  },
]

const navLinks = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Apex Membership', href: '/membership' },
  { label: 'What We Treat', href: '/what-we-treat' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Order Bloods', href: '/order-bloods' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [getStartedOpen, setGetStartedOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Keep scroll helper for any remaining homepage anchor links
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Apex Metabolic Health">
            <Image
              src="/logo.png"
              alt="Apex Metabolic Health"
              width={794}
              height={319}
              className="w-[140px] md:w-[165px] h-auto"
              style={{ mixBlendMode: 'multiply' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Primary navigation">
            {/* Start Here */}
            <Link
              href="/get-started"
              className="text-[12px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
              style={{ color: '#4a5a6a' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#0A0A0A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
            >
              Start Here
            </Link>

            {/* Clinical Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="flex items-center gap-0.5">
                <Link
                  href="/services"
                  className="text-[12px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                  style={{ color: '#4a5a6a' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0A0A0A' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
                >
                  Clinical Programs
                </Link>
                <button
                  className="flex items-center p-1 transition-colors duration-200"
                  style={{ color: '#4a5a6a' }}
                  aria-expanded={programsOpen}
                  aria-haspopup="true"
                  aria-label="Open programs menu"
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-3 h-3 transition-transform duration-200"
                    style={{
                      transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-3 z-50"
                    style={{
                      width: '320px',
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    }}
                  >
                    <div className="p-2">
                      <div className="grid grid-cols-2 gap-0.5">
                      {NAV_PROGRAMS.map((program) =>
                        program.comingSoon ? (
                          <div
                            key={program.slug}
                            className="px-4 py-2.5 rounded-sm text-[13px] flex items-center justify-between gap-2"
                            style={{ color: '#4a5a6a', cursor: 'default' }}
                          >
                            <span>{program.name}</span>
                            <span
                              className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0"
                              style={{
                                color: '#c9a84c',
                                backgroundColor: 'rgba(201,168,76,0.1)',
                                border: '1px solid rgba(201,168,76,0.2)',
                              }}
                            >
                              Soon
                            </span>
                          </div>
                        ) : (
                          <Link
                            key={program.slug}
                            href={`/programs/${program.slug}`}
                            className="block px-4 py-2.5 rounded-sm text-[13px] transition-all duration-150"
                            style={{ color: '#4a5a6a' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#0A0A0A'
                              e.currentTarget.style.backgroundColor = 'rgba(53,117,198,0.06)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#4a5a6a'
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            {program.name}
                          </Link>
                        )
                      )}
                      </div>
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '4px', paddingTop: '4px' }}>
                        <Link
                          href="/services"
                          className="flex items-center justify-between px-4 py-2.5 rounded-sm text-[12px] font-semibold tracking-wide transition-all duration-150"
                          style={{ color: '#3575C6' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(53,117,198,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        >
                          View all programs
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap"
                style={{ color: '#4a5a6a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0A0A0A' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
              >
                {link.label}
              </Link>
            ))}

          </nav>

          {/* Desktop CTA with dropdown */}
          <div
            className="hidden md:block relative"
            style={{ display: menuOpen ? 'none' : undefined }}
            onMouseEnter={() => setGetStartedOpen(true)}
            onMouseLeave={() => setGetStartedOpen(false)}
          >
            <button
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
              style={{
                background: '#0A0A0A',
                color: '#ffffff',
                padding: '11px 22px',
                borderRadius: '999px',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a2a3a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0A0A0A' }}
            >
              Get Started
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {getStartedOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full right-0 mt-2 z-50"
                  style={{
                    width: '220px',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <div className="p-2">
                    {/* Group 1 */}
                    <p className="px-4 pt-2 pb-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#B0B8C5' }}>
                      Find the right pathway
                    </p>
                    <Link
                      href="/intake/pre-screen"
                      className="flex flex-col px-4 py-3 rounded-sm transition-all duration-150"
                      style={{ color: '#0A0A0A' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(53,117,198,0.06)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      <span className="text-[13px] font-semibold">Start Your Assessment</span>
                      <span className="text-[11px] mt-0.5" style={{ color: '#B0B8C5' }}>Answer 6 quick questions. We&apos;ll show you the most relevant next step.</span>
                    </Link>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', margin: '4px 0' }} />

                    {/* Group 2 */}
                    <p className="px-4 pt-2 pb-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#B0B8C5' }}>
                      Already know what you need?
                    </p>
                    {[
                      {
                        label: 'Get Started Hormone Consult',
                        desc: 'Complete the hormone intake directly if you already know this is your focus.',
                        href: '/intake/hormone-consult',
                      },
                      {
                        label: 'General Appointment',
                        desc: 'For broader health concerns that don\'t fit a specific program pathway.',
                        href: '/intake/general-consult',
                      },
                      {
                        label: 'Order Blood Panel',
                        desc: 'Already know your program? Order your doctor-issued pathology referral directly.',
                        href: '/order-bloods',
                      },
                      {
                        label: 'Free Discovery Call',
                        desc: 'Not sure if Apex is right for you? Speak with our team before committing.',
                        href: '/intake/discovery',
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col px-4 py-3 rounded-sm transition-all duration-150"
                        style={{ color: '#0A0A0A' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(53,117,198,0.06)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                      >
                        <span className="text-[13px] font-semibold">{item.label}</span>
                        <span className="text-[11px] mt-0.5" style={{ color: '#B0B8C5' }}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              className="block w-5 h-px bg-[#3575C6]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-[#3575C6]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-[#3575C6]"
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
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* Content area */}
            <div className="flex flex-col flex-1 overflow-y-auto" style={{ paddingTop: '72px' }}>

              {/* ── Primary nav ── */}
              <nav className="flex flex-col px-6 pt-6" aria-label="Primary navigation">
                {[
                  { label: 'Clinical Programs', href: '/services' },
                  { label: 'Apex Membership',    href: '/membership' },
                  { label: 'Our Approach',       href: '/our-approach' },
                  { label: 'What We Treat',      href: '/what-we-treat' },
                ].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.28, delay: i * 0.06 + 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 text-[22px] font-semibold border-b transition-colors duration-150"
                      style={{
                        color: '#0A0A0A',
                        borderColor: 'rgba(0,0,0,0.07)',
                        fontFamily: 'var(--font-space-grotesk)',
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#3575C6' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#0A0A0A' }}
                    >
                      {link.label}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 opacity-20 flex-shrink-0" aria-hidden="true">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* ── Utility row ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.28 }}
                className="px-6 pt-5 pb-2"
              >
                <div className="flex items-center gap-5">
                  {[
                    { label: 'Pricing',      href: '/pricing' },
                    { label: 'Order Bloods', href: '/order-bloods' },
                    { label: 'FAQs',         href: '/faqs' },
                  ].map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium transition-colors duration-150"
                      style={{ color: '#8899aa' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8899aa' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── CTA block — pinned bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.32, delay: 0.22 }}
              className="px-6 pb-10 pt-5 flex flex-col gap-4"
              style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
            >
              {/* Primary CTA */}
              <Link
                href="/intake/pre-screen"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full font-semibold text-[15px]"
                style={{
                  background: '#0A0A0A',
                  color: '#ffffff',
                  padding: '15px 24px',
                  borderRadius: '999px',
                  letterSpacing: '-0.01em',
                  fontFamily: 'var(--font-space-grotesk)',
                }}
              >
                Start My Assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Secondary text CTAs */}
              <div className="flex items-center justify-center gap-6">
                <Link
                  href="/intake/hormone-consult"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold transition-colors duration-150"
                  style={{ color: '#3575C6' }}
                >
                  Book Initial Consult →
                </Link>
                <span style={{ color: 'rgba(0,0,0,0.12)', fontSize: '12px' }}>|</span>
                <Link
                  href="/intake/general-consult"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold transition-colors duration-150"
                  style={{ color: '#3575C6' }}
                >
                  General Clinical Consult →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
