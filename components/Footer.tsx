'use client'

import Link from 'next/link'
import { programs } from '@/lib/programs'

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Get Started', href: '/get-started' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative"
      style={{ backgroundColor: '#0a1018', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top glow rule */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <svg
                viewBox="0 0 88 36"
                className="w-[110px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Apex Metabolic Health"
                role="img"
              >
                <defs>
                  <linearGradient id="footer-apx-tg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a9c7ff"/>
                    <stop offset="100%" stopColor="#4890f7"/>
                  </linearGradient>
                </defs>
                <text x="0" y="23" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="24" fontWeight="800" fill="url(#footer-apx-tg)" letterSpacing="-0.5">APEX</text>
                <line x1="0" y1="26.5" x2="57" y2="26.5" stroke="#a9c7ff" strokeWidth="0.8" strokeOpacity="0.25"/>
                <text x="0.5" y="35" fontFamily="var(--font-space-grotesk), 'Space Grotesk', sans-serif" fontSize="6.6" fontWeight="400" fill="#4a5a6a" letterSpacing="1.55">METABOLIC HEALTH</text>
              </svg>
            </div>

            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: '#4a5a6a' }}
            >
              Doctor-led hormonal health. Evidence-based. Australia-wide.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {['AHPRA Registered', 'TGA Compliant', '100% Online'].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5"
                  style={{
                    color: '#4a5a6a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4
              className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: '#8899aa' }}
            >
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-sm transition-colors duration-200 hover:text-primary"
                    style={{ color: '#4a5a6a' }}
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5"
              style={{ color: '#8899aa' }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-primary"
                    style={{ color: '#4a5a6a' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/get-started"
                className="btn-teal text-[11px] tracking-widest uppercase py-3 px-5"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
          aria-hidden="true"
        />

        {/* Compliance text — mandatory */}
        <div
          className="p-5 rounded-sm mb-8"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            className="text-xs leading-relaxed mb-2"
            style={{ color: '#4a5a6a' }}
          >
            All consultations conducted by AHPRA-registered medical practitioners. This website does
            not constitute medical advice. Apex Metabolic Health operates under Imperial Equity
            Investments Pty Ltd.
          </p>
          <p
            className="text-xs leading-relaxed mb-2"
            style={{ color: '#4a5a6a' }}
          >
            Clinical suitability is assessed by a doctor during consultation. All medical services
            are provided by Australian AHPRA-registered medical practitioners.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
            <strong style={{ color: '#8899aa' }}>After-hours &amp; emergencies:</strong> Apex
            Metabolic Health does not provide emergency medical care. If you are experiencing a
            medical emergency, call <strong style={{ color: '#f0f4f8' }}>000</strong> immediately.
            For after-hours GP care, contact the{' '}
            <strong style={{ color: '#8899aa' }}>National Home Doctor Service on 13 7425</strong>.
          </p>
        </div>

        {/* Copyright row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#4a5a6a' }}>
            © {year} Apex Metabolic Health. All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: '#1e2d3d' }}>
            Doctor-led hormonal health. Evidence-based. Australia-wide.
          </p>
        </div>
      </div>
    </footer>
  )
}
