'use client'

import Link from 'next/link'
import Image from 'next/image'
import { programs } from '@/lib/programs'

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Get Started', href: '/get-started' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative"
      style={{ backgroundColor: '#070a0d', borderTop: '1px solid #1e2d3d' }}
    >
      {/* Top glow rule */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,194,184,0.3), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Apex Metabolic Health"
                width={120}
                height={120}
                className="w-auto"
                style={{ height: '56px' }}
              />
              <div className="flex flex-col leading-none gap-[3px] hidden">
                <span>APEX METABOLIC</span>
                <span>HEALTH
                </span>
              </div>
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
                    border: '1px solid #1e2d3d',
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
              <li>
                <a
                  href="/get-started"
                  data-cta="patient-portal"
                  className="text-sm transition-colors duration-200 hover:text-primary"
                  style={{ color: '#4a5a6a' }}
                >
                  Patient Portal
                </a>
              </li>
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
          style={{ backgroundColor: '#1e2d3d' }}
          aria-hidden="true"
        />

        {/* Compliance text — mandatory */}
        <div
          className="p-5 rounded-sm mb-8"
          style={{
            backgroundColor: 'rgba(17,24,32,0.8)',
            border: '1px solid #1e2d3d',
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
            className="text-xs leading-relaxed"
            style={{ color: '#4a5a6a' }}
          >
            Clinical suitability is assessed by a doctor during consultation. All medical services
            are provided by Australian AHPRA-registered medical practitioners.
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
