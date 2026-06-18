'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

const PROGRAMS = [
  {
    label: 'Metabolic & Weight Loss',
    sub: 'Insulin resistance, thyroid dysfunction, cortisol-driven fat — the metabolic drivers most GPs never investigate.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3a2 2 0 110 4 2 2 0 010-4zm0 9.5c-2.33 0-4.29-1.19-5.5-3 .03-1.82 3.67-2.83 5.5-2.83 1.83 0 5.47 1.01 5.5 2.83-1.21 1.81-3.17 3-5.5 3z" fill={ACCENT} opacity="0.7"/>
      </svg>
    ),
  },
  {
    label: 'Performance & Recovery',
    sub: 'Recovery plateaus, training fatigue, output ceiling. The biology behind why effort stops translating to results.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M3 10h2l2-4 3 8 2-6 2 3 1-1h2" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Hair & Skin Restoration',
    sub: 'DHT-driven alopecia, thyroid hair loss, iron depletion, androgenic acne. Identifying the driver before treating.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7" stroke={ACCENT} strokeWidth="1.5"/>
        <path d="M10 7v3l2 2" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Injury Repair & Recovery',
    sub: 'Chronic injury, slow healing, recurring flare-ups. Cortisol overload and growth factor deficiency are often the barrier.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 3v14M3 10h14" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const WHAT = [
  {
    n: '01',
    title: 'Targeted blood panel',
    body: 'A program-specific panel covering the exact markers that explain what\'s happening. Not a generic GP check. Collected at any accredited pathology centre nationally.',
  },
  {
    n: '02',
    title: 'Clinical interpretation',
    body: 'An AHPRA-registered doctor reviews every marker in the context of your symptoms and health history — not just reference ranges.',
  },
  {
    n: '03',
    title: 'Personalised protocol',
    body: 'Where clinically appropriate, a targeted clinical protocol is prepared through our TGA-compliant compounding pharmacy partner.',
  },
  {
    n: '04',
    title: 'Ongoing management',
    body: 'Scheduled monitoring, protocol refinement, and clinical support across your treatment cycle.',
  },
]

const PROCESS = [
  { step: '01', title: 'Complete your intake', body: 'A 5-minute clinical intake covering your primary concern, symptoms, and health history. Takes under 5 minutes. Reviewed by your doctor before the consultation.' },
  { step: '02', title: 'Doctor-issued blood panel', body: 'Your doctor issues a referral matched to your program. Collect at any of 4,000+ accredited collection centres nationally — no GP, no appointment.' },
  { step: '03', title: 'Telehealth consultation', body: 'A full clinical review with your Apex doctor. Results are interpreted in context and your clinical pathway is confirmed.' },
  { step: '04', title: 'Protocol commenced', body: 'Where clinically appropriate, treatment is coordinated through our compounding pharmacy partner with ongoing review scheduled.' },
]

const TRUST = [
  { stat: '5 min', label: 'intake form' },
  { stat: 'AHPRA', label: 'registered doctors' },
  { stat: '< 48h', label: 'referral issued' },
  { stat: '4,000+', label: 'collection centres' },
]

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
      {children}
    </motion.div>
  )
}

export default function GeneralConsultBookPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?auto=format&fit=crop&w=1200&q=80" alt="" fill className="object-cover object-center" style={{ opacity: 0.18 }} unoptimized />
          <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(4,6,13,0.65)' }} />
          <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgba(4,6,13,0.35) 50%, transparent 75%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />
        </div>
        <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.08) 0%, transparent 60%)' }} />

        {/* Hero */}
        <div className="relative" style={{ paddingTop: '100px', paddingBottom: '72px' }}>
          <div className="container-tight max-w-2xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-5" style={{ color: ACCENT }}>
                Peptide Consultation · Doctor-led · Australia-wide
              </p>
              <h1 className="font-bold tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1.05, color: 'var(--text-primary)' }}>
                Real diagnostics.{' '}
                <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Real answers.
                </span>
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-primary)', opacity: 0.65, maxWidth: 560 }}>
                For weight loss, performance, hair, skin, and injury recovery. We run the diagnostics GPs don't order — interpreted by doctors who specialise in exactly this.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 mb-10">
                {TRUST.map(t => (
                  <div key={t.label} className="px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.14)' }}>
                    <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{t.stat}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>{t.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/intake-v2" className="btn-primary" style={{ fontSize: '14px', padding: '15px 36px' }}>
                  Start your intake
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
                  target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '14px', padding: '15px 28px' }}>
                  Free discovery call
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Programs covered */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(72,144,247,0.02)' }}>
          <div className="container-tight max-w-2xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <Section>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>Programs covered</p>
              <h2 className="font-bold tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                Choose your pathway — we&apos;ll match the diagnostics to it.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROGRAMS.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease }}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}>
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{p.label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{p.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* What's included */}
        <div className="container-tight max-w-2xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <Section>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>What&apos;s included</p>
            <h2 className="font-bold tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
              Program-matched diagnostics. Clinical oversight. Clear next steps.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT.map((w, i) => (
                <motion.div
                  key={w.n}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                  className="p-5 rounded-xl"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                    <span className="text-[10px] font-bold" style={{ color: ACCENT }}>{w.n}</span>
                  </div>
                  <p className="text-sm font-semibold mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{w.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{w.body}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        {/* Process */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
          <div className="container-tight max-w-2xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <Section>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>How it works</p>
              <h2 className="font-bold tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                From intake to answers in under two weeks.
              </h2>
              <div className="flex flex-col gap-5">
                {PROCESS.map((p, i) => (
                  <motion.div
                    key={p.step}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease }}
                    className="flex gap-5 items-start"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                      <span className="text-[11px] font-bold" style={{ color: ACCENT }}>{p.step}</span>
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{p.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{p.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container-tight max-w-2xl" style={{ paddingTop: 72, paddingBottom: 40 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(10,28,80,0.8) 0%, rgba(20,60,180,0.5) 100%)', border: '1px solid rgba(72,144,247,0.25)' }}
          >
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>Ready to start</p>
            <h2 className="font-bold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 32px)', color: '#ffffff', lineHeight: 1.15 }}>
              Stop guessing. Start knowing.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, margin: '0 auto 2rem' }}>
              Complete your intake in under 5 minutes. AHPRA-registered doctors. Fully online. Australia-wide.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/intake-v2" className="btn-white" style={{ fontSize: '14px', padding: '14px 36px' }}>
                Start your intake →
              </Link>
              <a href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}>
                Free discovery call
              </a>
            </div>
            <p className="text-[10px] mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
              AHPRA-registered practitioners · Private & confidential · No lock-in contracts
            </p>
          </motion.div>
        </div>

      </main>
      <Footer />
    </>
  )
}
