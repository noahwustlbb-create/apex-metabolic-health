'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

const WHO = [
  { label: 'Low energy or fatigue', sub: "Sleep doesn't fix it. Energy crashes mid-afternoon. Hard to push through the day." },
  { label: 'Reduced libido or drive', sub: "Lower interest in sex, reduced motivation, a general flatness that wasn't there before." },
  { label: 'Brain fog or poor focus', sub: 'Mental clarity that used to be effortless now requires effort to maintain.' },
  { label: 'Poor sleep quality', sub: 'Difficulty falling asleep, staying asleep, or waking feeling unrefreshed.' },
  { label: 'Body composition changes', sub: 'Fat accumulating around the abdomen despite diet and exercise efforts.' },
  { label: 'Mood changes or irritability', sub: 'Increased irritability, lower stress threshold, reduced emotional resilience.' },
]

const WHAT = [
  {
    n: '01',
    title: 'Full hormone panel — 32+ markers',
    body: 'Total and free testosterone, SHBG, LH & FSH, oestradiol, cortisol, full thyroid, DHEA-S, prolactin, IGF-1, Vitamin D, hsCRP. Not a 3-marker GP panel.',
  },
  {
    n: '02',
    title: 'Doctor-reviewed results',
    body: 'An AHPRA-registered doctor reviews every marker and provides a written clinical interpretation — not just a reference range flag.',
  },
  {
    n: '03',
    title: 'Personalised protocol',
    body: 'Where clinically appropriate, a tailored treatment protocol is prepared through our TGA-compliant compounding pharmacy partner.',
  },
  {
    n: '04',
    title: 'Ongoing clinical oversight',
    body: 'Scheduled reviews, blood work monitoring, and clinical support. This is not a one-off script — it\'s a managed care pathway.',
  },
]

const PROCESS = [
  { step: '01', title: 'Complete your intake', body: 'An 8–10 minute clinical intake covering your symptoms, history, lifestyle, and goals. Reviewed by your doctor before the consultation.' },
  { step: '02', title: 'Doctor-issued blood panel', body: 'Your doctor issues a referral for your hormone panel. Collect fasted before 9am at any of 4,000+ accredited collection centres — no GP needed.' },
  { step: '03', title: 'Telehealth consultation', body: 'A full clinical consultation with your Apex doctor. Your results are reviewed in depth and your protocol is discussed.' },
  { step: '04', title: 'Protocol commenced', body: 'Where clinically appropriate, treatment is coordinated through our compounding pharmacy partner. Ongoing reviews scheduled.' },
]

const TRUST = [
  { stat: '32+', label: 'biomarkers tested' },
  { stat: 'AHPRA', label: 'registered doctors' },
  { stat: '< 48h', label: 'referral issued' },
  { stat: '4,000+', label: 'collection centres' },
]

function Section({ children, border = false }: { children: React.ReactNode; border?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      style={border ? { borderTop: '1px solid rgba(255,255,255,0.05)' } : {}}
    >
      {children}
    </motion.div>
  )
}

export default function HormoneConsultBookPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1639772823849-6efbd173043c?auto=format&fit=crop&w=1200&q=80" alt="" fill className="object-cover object-center" style={{ opacity: 0.18 }} unoptimized />
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
                Hormone Consultation · Doctor-led · Australia-wide
              </p>
              <h1 className="font-bold tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1.05, color: 'var(--text-primary)' }}>
                Your GP said normal.{' '}
                <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  We go deeper.
                </span>
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-primary)', opacity: 0.65, maxWidth: 560 }}>
                Standard GP panels miss the markers that matter. Our hormone consultation tests 32+ biomarkers interpreted by doctors who specialise in exactly this — and where treatment is warranted, it starts.
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
                <Link href="/intake/hormone-consult" className="btn-primary" style={{ fontSize: '14px', padding: '15px 36px' }}>
                  Start hormone intake
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

        {/* Who it's for */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(72,144,247,0.02)' }}>
          <div className="container-tight max-w-2xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <Section>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>Who this is for</p>
              <h2 className="font-bold tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                Patients who know something is wrong — but are told their results are "normal."
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHO.map((w, i) => (
                  <motion.div
                    key={w.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease }}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} />
                      <div>
                        <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{w.label}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>{w.sub}</p>
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
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>What's included</p>
            <h2 className="font-bold tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
              Not a GP appointment. A clinical deep-dive.
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

        {/* The process */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
          <div className="container-tight max-w-2xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <Section>
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: ACCENT }}>How it works</p>
              <h2 className="font-bold tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                From intake to protocol in under two weeks.
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
              Get the answers your GP couldn&apos;t give you.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, margin: '0 auto 2rem' }}>
              Complete your intake in under 10 minutes. AHPRA-registered doctors. Fully online. Australia-wide.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/intake/hormone-consult" className="btn-white" style={{ fontSize: '14px', padding: '14px 36px' }}>
                Start hormone intake →
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
