'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { programs } from '@/lib/programs'

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

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
          backgroundColor: scrolled ? 'rgba(7,10,13,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(30,45,61,0.9)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="container-tight flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" aria-hidden="true">
                <polygon
                  points="16,2 30,9 30,23 16,30 2,23 2,9"
                  stroke="#00c2b8"
                  strokeWidth="1.5"
                  fill="rgba(0,194,184,0.06)"
                />
                <line x1="16" y1="2" x2="16" y2="30" stroke="#00c2b8" strokeWidth="0.8" opacity="0.35" />
                <line x1="2" y1="16" x2="30" y2="16" stroke="#00c2b8" strokeWidth="0.8" opacity="0.35" />
                <circle cx="16" cy="16" r="2.5" fill="#00c2b8" />
                <circle cx="16" cy="16" r="5" stroke="#00c2b8" strokeWidth="0.8" opacity="0.4" />
              </svg>
            </div>
            <div className="flex flex-col leading-none gap-[3px]">
              <span
                className="text-[13px] font-bold tracking-[0.22em] uppercase"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                APEX METABOLIC
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#4a5a6a' }}>
                HEALTH
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-primary"
                style={{ color: '#8899aa' }}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                Programs
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="w-3 h-3 transition-transform duration-200"
                  style={{
                    transform: programsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: '#8899aa',
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
                      background: '#0d1117',
                      border: '1px solid #1e2d3d',
                      borderRadius: '8px',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="p-2 grid grid-cols-2 gap-0.5">
                      {programs.map((program) =>
                        program.status === 'coming-soon' ? (
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
                            style={{ color: '#8899aa' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#f0f4f8'
                              e.currentTarget.style.backgroundColor = 'rgba(0,194,184,0.06)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#8899aa'
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            {program.name}
                          </Link>
                        )
                      )}
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
                className="text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-primary"
                style={{ color: '#8899aa' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Patient Login */}
            <a
              href="#"
              data-cta="patient-portal"
              className="text-[13px] font-medium tracking-wide transition-colors duration-200"
              style={{ color: '#8899aa' }}
            >
              Patient Login
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/get-started"
              className="btn-ghost text-[11px] tracking-[0.18em] uppercase py-3 px-6"
            >
              Get Started
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
              className="block w-5 h-px bg-primary"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-primary"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(7,10,13,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col h-full pt-20 pb-10 px-6">
              <nav className="flex flex-col gap-2 flex-1 justify-center">
                {[
                  { label: 'Programs', href: '/services' },
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'FAQs', href: '/faqs' },
                ].map((link, i) => (
                  <motion.div
                    key={link.label + link.href + i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.07 + 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-left py-4 text-2xl font-semibold transition-colors duration-200 border-b"
                      style={{
                        color: '#f0f4f8',
                        borderColor: '#1e2d3d',
                        fontFamily: 'var(--font-space-grotesk)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 4 * 0.07 + 0.05 }}
                >
                  <a
                    href="#"
                    data-cta="patient-portal"
                    onClick={() => setMenuOpen(false)}
                    className="block text-left py-4 text-2xl font-semibold transition-colors duration-200 border-b"
                    style={{
                      color: '#8899aa',
                      borderColor: '#1e2d3d',
                      fontFamily: 'var(--font-space-grotesk)',
                    }}
                  >
                    Patient Login
                  </a>
                </motion.div>
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/get-started"
                  onClick={() => setMenuOpen(false)}
                  className="btn-teal w-full text-sm tracking-widest uppercase"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
