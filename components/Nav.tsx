'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { programs } from '@/lib/programs'

const navLinks = [
  { label: 'Start With Bloods', href: '/order-bloods' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
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
        <div className="container-tight flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Apex Metabolic Health">
            <svg
              viewBox="0 0 88 36"
              className="w-[110px] md:w-[130px] h-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
            >
              <text
                x="0" y="23"
                fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif"
                fontSize="24" fontWeight="800"
                fill="#0c131f"
                letterSpacing="-0.5"
              >APEX</text>
              <line x1="0" y1="26.5" x2="86" y2="26.5"
                stroke="#0c131f" strokeWidth="0.5" strokeOpacity="0.15"/>
              <text
                x="0.5" y="35"
                fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif"
                fontSize="6.6" fontWeight="500"
                fill="#4a5a6a"
                letterSpacing="1.55"
              >METABOLIC HEALTH</text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <div className="flex items-center gap-0.5">
                <Link
                  href="/services"
                  className="text-[13px] font-medium tracking-wide transition-colors duration-200"
                  style={{ color: '#4a5a6a' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0c131f' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
                >
                  Programs
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
                            style={{ color: '#4a5a6a' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#0c131f'
                              e.currentTarget.style.backgroundColor = 'rgba(44,116,232,0.06)'
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
                          style={{ color: '#4890f7' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(72,144,247,0.08)'
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
                className="text-[13px] font-medium tracking-wide transition-colors duration-200"
                style={{ color: '#4a5a6a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0c131f' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4a5a6a' }}
              >
                {link.label}
              </Link>
            ))}

          </nav>

          {/* Desktop CTA with dropdown */}
          <div
            className="hidden md:block relative"
            onMouseEnter={() => setGetStartedOpen(true)}
            onMouseLeave={() => setGetStartedOpen(false)}
          >
            <Link
              href="/get-started"
              className="text-[11px] tracking-[0.18em] uppercase py-3 px-6 flex items-center gap-2.5 font-semibold transition-all duration-200"
              style={{
                background: '#2C74E8',
                color: '#ffffff',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2264CC' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#2C74E8' }}
            >
              {/* Apex triangle icon */}
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <polygon points="10,2 18,17 2,17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <polygon points="10,7 15,15 5,15" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none" opacity="0.5" />
              </svg>
              Start Assessment
              <svg
                viewBox="0 0 12 12"
                fill="none"
                className="w-3 h-3 transition-transform duration-200"
                style={{ transform: getStartedOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

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
                  <div className="p-2 flex flex-col gap-0.5">
                    {[
                      { label: 'Start Assessment', desc: 'Not sure where to begin', href: '/get-started' },
                      { label: 'Health Quiz', desc: 'Find your program in 2 min', href: '/assessment' },
                      { label: 'Hormone Check', desc: 'Clinically validated score', href: '/hormone-check' },
                      { label: 'Hormone Consult', desc: 'TRT & hormone programs', href: '/intake/hormone' },
                      { label: 'Metabolic Assessment', desc: 'Metabolic optimisation & more', href: '/intake/general' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col px-4 py-3 rounded-sm transition-all duration-150"
                        style={{ color: '#0c131f' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(44,116,232,0.06)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <span className="text-[13px] font-semibold">{item.label}</span>
                        <span className="text-[11px] mt-0.5" style={{ color: '#8899aa' }}>{item.desc}</span>
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
              className="block w-5 h-px bg-[#2C74E8]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-[#2C74E8]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-[#2C74E8]"
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
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="flex flex-col h-full pt-20 pb-10 px-6">
              <nav className="flex flex-col gap-2 flex-1 justify-center">
                {[
                  { label: 'Programs', href: '/services' },
                  { label: 'Start With Bloods', href: '/order-bloods' },
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
                        color: '#0c131f',
                        borderColor: 'rgba(0,0,0,0.06)',
                        fontFamily: 'var(--font-space-grotesk)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
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
                  Start Assessment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
