'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'
const ACCENT_BORDER = 'rgba(72,144,247,0.15)'

const STANDARDS = [
  {
    title: 'AHPRA-Registered Doctors',
    body: 'Every consultation is conducted by a doctor registered with the Australian Health Practitioner Regulation Agency. No exceptions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'TGA-Compliant Pharmacy',
    body: 'All prescribed treatments are fulfilled through our TGA-compliant compounding pharmacy partner. Every compound meets Australian regulatory standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Evidence-Based Protocols',
    body: 'Our clinical protocols are built on peer-reviewed research and guided by internationally recognised guidelines. We don\'t guess. We follow the evidence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Accredited Pathology',
    body: 'All blood panels are collected at NATA-accredited pathology centres. 4,000+ collection points across Australia. No grey-market diagnostics.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const WHY = [
  {
    label: 'The gap we fill',
    title: 'GPs are not built for optimisation.',
    body: 'The standard of care in Australian general practice is designed to identify disease, not investigate function. A patient with testosterone at the bottom of the reference range will be told they are "fine." Their GP is not wrong — they do not have a diagnosable disease. But they are nowhere near optimal, and nobody is investigating why.\n\nApex exists to close that gap. We run deeper panels, interpreted by doctors who specialise in exactly this, and we build protocols around where your biology should be — not just where it technically clears the threshold.',
  },
  {
    label: 'What we are not',
    title: 'Not a wellness brand. Not a supplement store.',
    body: 'The health optimisation space is full of brands selling confidence and identity alongside protein powder. We are a medical clinic. Our doctors are qualified. Our pathology is accredited. Our pharmacy is TGA-compliant.\n\nIf that sounds clinical, good. You should be sceptical of anyone in this space who isn\'t. The patients who come to us have usually spent years being told everything is fine. They want real answers, not a lifestyle subscription.',
  },
]

function Section({ children, bg = 'var(--bg)' }: { children: React.ReactNode; bg?: string }) {
  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="container-tight relative z-10">{children}</div>
    </section>
  )
}

function AnimBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg)', paddingTop: '160px', paddingBottom: '100px' }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              About Apex
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-bold tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(38px, 5vw, 72px)',
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                maxWidth: '800px',
              }}
            >
              Behind every protocol,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                a clinical team.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-primary)', maxWidth: '560px', opacity: 0.75 }}
            >
              Apex Metabolic Health is an Australian doctor-led telehealth clinic built for those who want more than a normal result — they want an optimal one.
            </motion.p>
          </div>
        </section>

        {/* Clinical imagery strip */}
        <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="container-tight">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-0">
              {[
                {
                  src: 'https://images.unsplash.com/photo-1639772823849-6efbd173043c?auto=format&fit=crop&w=700&q=80',
                  alt: 'Accredited pathology blood panel',
                  label: 'NATA-accredited pathology',
                },
                {
                  src: 'https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?auto=format&fit=crop&w=700&q=80',
                  alt: 'Telehealth consultation with AHPRA doctor',
                  label: 'AHPRA-registered doctors',
                },
                {
                  src: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=700&q=80',
                  alt: 'Patient outcomes and performance',
                  label: 'Real clinical outcomes',
                },
              ].map((img, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: '-40px' })
                return (
                  <motion.div
                    key={img.label}
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.1, ease }}
                    className="relative rounded-2xl overflow-hidden"
                    style={{ aspectRatio: '4/3', border: '1px solid rgba(72,144,247,0.12)' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      style={{ opacity: 0.8 }}
                      unoptimized
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(4,6,13,0.9) 100%)' }} />
                    <div className="absolute bottom-0 left-0 p-4">
                      <p className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'rgba(72,144,247,0.9)' }}>{img.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Apex exists */}
        <Section bg="var(--surface)">
          <div className="glow-rule" aria-hidden="true" />
          {WHY.map((block, i) => {
            const ref = useRef(null)
            const inView = useInView(ref, { once: true, margin: '-60px' })
            return (
              <motion.div
                key={block.label}
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.05, ease }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i > 0 ? 'mt-20 pt-20' : ''}`}
                style={i > 0 ? { borderTop: '1px solid rgba(72,144,247,0.08)' } : {}}
              >
                <div>
                  <p className="label mb-4">{block.label}</p>
                  <h2
                    className="font-bold tracking-tight"
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: 'clamp(26px, 3vw, 42px)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {block.title}
                  </h2>
                </div>
                <div>
                  {block.body.split('\n\n').map((para, j) => (
                    <p
                      key={j}
                      className={`text-base leading-relaxed ${j > 0 ? 'mt-4' : ''}`}
                      style={{ color: 'var(--text-primary)', opacity: 0.75 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </Section>

        {/* Clinical team */}
        <Section bg="var(--bg)">
          <div className="warm-rule" aria-hidden="true" />
          <AnimBlock>
            <p className="label mb-4">Clinical Team</p>
            <h2
              className="font-bold tracking-tight mb-12"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Doctors who specialise<br />in exactly this.
            </h2>
          </AnimBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* CMO Card */}
            {(() => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-60px' })
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0, ease }}
                  className="rounded-2xl p-7 flex flex-col justify-between"
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${ACCENT_BORDER}`,
                    minHeight: 280,
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: ACCENT }}>Chief Medical Officer</p>
                        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                          Dr Cameron Chen
                        </h3>
                      </div>
                      <span
                        className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(72,144,247,0.08)', color: ACCENT, border: `1px solid rgba(72,144,247,0.2)` }}
                      >
                        AHPRA Registered
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.75 }}>
                      Dr Chen leads Apex&apos;s clinical operations, protocol development, and medical governance. His focus is on evidence-based hormone and metabolic medicine — moving patients from functional decline toward measurable biological optimisation.
                    </p>
                  </div>
                  <div className="mt-6 pt-5 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}>
                    {['Hormone Medicine', 'Metabolic Health', 'Telehealth'].map(tag => (
                      <span key={tag} className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full" style={{ background: 'var(--elevated)', color: 'var(--text-primary)', border: '1px solid rgba(72,144,247,0.1)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })()}

            {/* Broader team */}
            {(() => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-60px' })
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1, ease }}
                  className="rounded-2xl p-7 flex flex-col justify-between"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(72,144,247,0.1)',
                    minHeight: 280,
                  }}
                >
                  <div>
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: ACCENT }}>Clinical Network</p>
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                        Our Consulting Doctors
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.75 }}>
                      All consultations at Apex are conducted by AHPRA-registered medical practitioners with experience in hormonal and metabolic medicine. Patients are matched to a doctor based on their program and clinical needs.
                    </p>
                    <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--text-primary)', opacity: 0.75 }}>
                      All Apex doctors operate under the same clinical governance framework and evidence-based protocols established by the medical team.
                    </p>
                  </div>
                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}>
                    <p className="text-[11px]" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>
                      All consultations conducted by AHPRA-registered medical practitioners.
                    </p>
                  </div>
                </motion.div>
              )
            })()}
          </div>
        </Section>

        {/* Clinical standards */}
        <Section bg="var(--surface)">
          <div className="glow-rule" aria-hidden="true" />
          <AnimBlock>
            <p className="label mb-4">Our Standards</p>
            <h2
              className="font-bold tracking-tight mb-12"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Clinical credibility<br />is non-negotiable.
            </h2>
          </AnimBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STANDARDS.map((standard, i) => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={standard.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="rounded-2xl p-6"
                  style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.12)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(72,144,247,0.08)', color: ACCENT }}
                  >
                    {standard.icon}
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                    {standard.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
                    {standard.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </Section>

        {/* CTA */}
        <Section bg="var(--bg)">
          <div className="warm-rule" aria-hidden="true" />
          <AnimBlock>
            <div
              className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
              style={{
                background: 'linear-gradient(135deg, rgba(72,144,247,0.06) 0%, rgba(72,144,247,0.02) 100%)',
                border: `1px solid ${ACCENT_BORDER}`,
              }}
            >
              <div>
                <p className="label mb-3">Ready to start?</p>
                <h2
                  className="font-bold tracking-tight"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(24px, 3vw, 38px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                  }}
                >
                  The assessment takes<br />less than 5 minutes.
                </h2>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link href="/intake/pre-screen" className="btn-primary whitespace-nowrap">
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/intake/discovery"
                  className="text-sm text-center font-medium transition-colors duration-200"
                  style={{ color: ACCENT }}
                >
                  Or book a free discovery call →
                </Link>
              </div>
            </div>
          </AnimBlock>
        </Section>

      </main>
      <Footer />
    </>
  )
}
