'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DoctorCard from '@/components/DoctorCard'
import FAQSection from '@/components/FAQSection'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = 'var(--blue)'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    tag: 'Portal',
    tagColor: ACCENT,
    title: 'Create your account',
    duration: '2 minutes',
    phase: 'Day 1',
    body: 'Go to app.apexmetabolichealth.com.au and sign up. No GP referral. No pre-screening. Your patient portal is live immediately. This is where your entire care journey lives.',
    details: ['No GP referral required', 'Secure patient portal created instantly', 'Australia-wide, 100% online'],
  },
  {
    n: '02',
    tag: 'Portal',
    tagColor: ACCENT,
    title: 'Complete your clinical intake',
    duration: '5–10 minutes',
    phase: 'Day 1',
    body: 'Inside your portal, complete a short intake covering your health history, current symptoms, medications, and goals. This is reviewed by your doctor, not processed by an algorithm, before anything else happens.',
    details: ['Completed inside your patient portal', 'Reviewed by a doctor, not an algorithm', 'Determines your blood panel and consultation approach'],
  },
  {
    n: '03',
    tag: 'Pathology',
    tagColor: '#1a9e8f',
    title: 'Get your blood work done',
    duration: '< 48 hours for results',
    phase: 'Day 1–2',
    body: 'We arrange your pathology referral through the portal. Attend any of 4,000+ accredited collection centres across Australia, with no appointment required at most locations. Hormone panels require a fasted morning draw. Results are returned directly to your portal within 48 hours.',
    details: ['4,000+ accredited collection centres nationwide', 'Fasted morning draw required for hormone treatments', 'Results uploaded to your portal within 48 hours'],
  },
  {
    n: '04',
    tag: 'Clinical',
    tagColor: '#7c5cbf',
    title: 'Telehealth consultation',
    duration: '30–60 minutes',
    phase: 'Day 3–5',
    body: 'Your AHPRA-registered doctor reviews your blood results and intake, takes a full clinical history, and builds your personalised protocol. This is a thorough medical consultation, not a prescription call. Video or phone, booked through your portal.',
    details: ['Video or phone, your choice', 'Full biomarker review and clinical history', 'Leave with a written protocol and clear next steps'],
  },
  {
    n: '05',
    tag: 'Ongoing',
    tagColor: '#c9a84c',
    title: 'Protocol begins. Care continues.',
    duration: '10–14 days to delivery',
    phase: 'From week 1',
    body: 'Your prescription is issued via our ePrescribing system and coordinated through our TGA-compliant pharmacy partner. Medication is compounded and dispatched directly to your door. 3-monthly reviews (blood panel, consultation, script renewal) are built into your portal and required by AHPRA and TGA guidelines.',
    details: ['Medication dispatched in 10–14 days', '3-monthly review required for all active protocols', 'Portal manages your review schedule automatically'],
  },
]

const PORTAL_FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6M9 16h4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Clinical intake form',
    body: 'Complete your health history, symptoms, and goals in one structured form. Your doctor sees this before your consultation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Pathology results',
    body: 'Your blood work results are uploaded directly to your portal. Your doctor reviews them before your consultation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Consultation booking',
    body: 'Book, reschedule, or cancel consultations inside your portal. Telehealth links are sent automatically.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Your treatment protocol',
    body: 'Your written protocol lives in your portal, accessible any time. Updated after every consultation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '3-monthly review schedule',
    body: 'Your review cycle is tracked and managed through the portal. Reminders are sent before each review is due.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Clinical support messaging',
    body: 'Message your clinical team between consultations. Urgent concerns are escalated to the treating doctor.',
  },
]

const FAQS = [
  {
    q: 'Do I need a GP referral to get started?',
    a: 'No. You sign up directly at app.apexmetabolichealth.com.au with no referral and no prior medical records required. Clinical suitability is assessed by our AHPRA-registered doctors during your consultation.',
  },
  {
    q: 'What happens inside the patient portal?',
    a: 'Everything. Your intake form, pathology results, consultation bookings, treatment protocol, 3-monthly review schedule, and clinical support messaging all live inside your portal at app.apexmetabolichealth.com.au.',
  },
  {
    q: 'Can I use existing blood test results?',
    a: 'In some cases, yes, particularly if results are recent and comprehensive. Upload them via your portal and our team will assess whether they\'re sufficient before scheduling your consultation.',
  },
  {
    q: 'How long before I receive my medication?',
    a: 'Blood results are back within 48 hours. Consultations are typically available within 1–3 days of results being received. Medication is compounded and dispatched within 10–14 days of your prescription being issued.',
  },
  {
    q: 'What if I\'m not clinically suitable?',
    a: 'Clinical suitability is assessed by a doctor at your consultation. If a specific treatment isn\'t appropriate for you, your doctor will explain why and will not prescribe treatment that isn\'t clinically indicated.',
  },
  {
    q: 'How are consultations conducted?',
    a: 'All consultations are via secure telehealth, video or phone. You book through your patient portal and a link is sent automatically. You need a private space and a device with camera or microphone.',
  },
  {
    q: 'What does the 3-month review involve?',
    a: 'A follow-up blood panel at any accredited collection centre, then a telehealth consultation where your doctor reviews your results, assesses your response, and adjusts your protocol as needed. The 3-monthly review is required by AHPRA and TGA before any script renewal. Your portal manages the scheduling.',
  },
  {
    q: 'Is there a lock-in contract?',
    a: 'No. Review consultations are required for patients on active protocols. That\'s a regulatory requirement, not a commercial one. You can step back from treatment at any point by speaking with your doctor.',
  },
]

// ─── Components ───────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="How it works"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 60% 0%, rgba(72,144,247,0.07) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 60% at 100% 50%, rgba(72,144,247,0.04) 0%, transparent 60%)' }} />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            How It Works
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 4.5vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
            maxWidth: '820px',
            marginBottom: '1.25rem',
          }}
        >
          Sign up. Complete intake.
          <br />
          <span style={{ color: ACCENT }}>
            Doctor reviews. Protocol begins.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease }}
          className="text-base md:text-lg leading-relaxed mb-8"
          style={{ color: 'var(--text-primary)', opacity: 0.72, maxWidth: '520px' }}
        >
          Everything happens through your patient portal, from intake to blood results to consultation booking to ongoing care.
          No paperwork, no GP run-around, no guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <a href="https://app.apexmetabolichealth.com.au/signup" className="btn-primary">
            Create Your Account (Free)
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/faqs" className="btn-ghost">
            Browse FAQs
          </a>
        </motion.div>

        {/* Timeline strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="flex flex-wrap gap-2"
        >
          {[
            { phase: 'Day 1', label: 'Account + intake' },
            { phase: 'Day 1–2', label: 'Blood work' },
            { phase: 'Day 3–5', label: 'Consultation' },
            { phase: 'Week 1+', label: 'Protocol' },
            { phase: 'Every 3 months', label: 'Review cycle' },
          ].map(({ phase, label }, i) => (
            <div key={label} className="flex items-center">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.12)' }}
              >
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: ACCENT, opacity: 0.7 }}>{phase}</span>
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{label}</span>
              </div>
              {i < 4 && (
                <svg viewBox="0 0 12 12" fill="none" width="18" height="18" className="mx-0.5 flex-shrink-0" aria-hidden="true">
                  <path d="M3 6h6M7 4l2 2-2 2" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                </svg>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Portal Intro ──────────────────────────────────────────────────────────────

function PortalIntro() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--color-border-muted)' }}
      aria-label="Your patient portal"
    >
      <div className="container-tight relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.08, marginBottom: '1rem' }}
            >
              One place. Everything.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="text-sm leading-relaxed mb-8"
              style={{ color: 'var(--text-primary)', opacity: 0.72, maxWidth: '440px' }}
            >
              Your intake, blood results, consultation bookings, treatment protocol, and 3-monthly reviews are all managed through your secure patient portal. You don't need to chase anything. The portal prompts you at every step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.24, ease }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {PORTAL_FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + i * 0.06, ease }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.09)' }}
                >
                  <div className="flex-shrink-0 mt-0.5" style={{ color: ACCENT }}>
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{f.title}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: portal URL callout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg)', border: `1px solid rgba(72,144,247,0.18)`, boxShadow: '0 0 80px rgba(72,144,247,0.08)' }}
            >
              {/* Mock browser chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: 'rgba(72,144,247,0.05)', borderBottom: '1px solid rgba(72,144,247,0.1)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-emphasis)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-emphasis)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-emphasis)' }} />
                </div>
                <div
                  className="flex-1 mx-3 px-3 py-1 rounded-md text-[11px] font-mono"
                  style={{ background: 'var(--state-hover-bg)', color: 'var(--text-primary)', opacity: 0.72 }}
                >
                  app.apexmetabolichealth.com.au
                </div>
              </div>

              {/* Portal content mockup */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1" style={{ color: ACCENT }}>Patient Portal</p>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Your Dashboard</p>
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                    style={{ background: 'rgba(26,158,143,0.12)', color: '#1a9e8f', border: '1px solid rgba(26,158,143,0.2)' }}
                  >
                    Active
                  </div>
                </div>

                {/* Progress steps */}
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    { label: 'Account created', done: true },
                    { label: 'Intake form', done: true },
                    { label: 'Pathology referral issued', done: true },
                    { label: 'Blood results received', done: false, active: true },
                    { label: 'Consultation scheduled', done: false },
                    { label: 'Protocol issued', done: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: item.done ? ACCENT : item.active ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.04)',
                          border: item.active ? `1.5px solid ${ACCENT}` : item.done ? 'none' : '1.5px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {item.done && (
                          <svg viewBox="0 0 10 10" fill="none" width="9" height="9" aria-hidden="true">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {item.active && (
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        )}
                      </div>
                      <span
                        className="text-[12px] font-medium"
                        style={{ color: 'var(--text-primary)', opacity: item.done ? 0.7 : item.active ? 1 : 0.3 }}
                      >
                        {item.label}
                      </span>
                      {item.active && (
                        <span
                          className="ml-auto text-[9px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(72,144,247,0.1)', color: ACCENT }}
                        >
                          Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="https://app.apexmetabolichealth.com.au/signup"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[12px] font-semibold transition-all duration-150"
                  style={{ background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', boxShadow: '0 4px 16px rgba(72,144,247,0.32)', textDecoration: 'none' }}
                >
                  Create your account, it&apos;s free
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <p className="text-center text-[10px] mt-3" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                  No GP referral · No upfront payment · 2 minutes
                </p>
              </div>
            </div>

            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(72,144,247,0.08) 0%, transparent 65%)', zIndex: -1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Process Steps ─────────────────────────────────────────────────────────────

function ProcessSteps() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const tagColors: Record<string, { bg: string; text: string; border: string }> = {
    Portal:    { bg: 'rgba(72,144,247,0.1)',  text: 'var(--blue)', border: 'rgba(72,144,247,0.2)' },
    Pathology: { bg: 'rgba(26,158,143,0.1)', text: '#1a9e8f', border: 'rgba(26,158,143,0.2)' },
    Clinical:  { bg: 'rgba(124,92,191,0.1)', text: '#7c5cbf', border: 'rgba(124,92,191,0.2)' },
    Ongoing:   { bg: 'rgba(201,168,76,0.1)', text: '#c9a84c', border: 'rgba(201,168,76,0.2)' },
  }

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="The process"
    >
      <div ref={ref} className="container-tight relative z-10">

        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.08 }}
          >
            Every stage of care, explained.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical connector - desktop */}
          <div
            className="absolute left-[26px] top-8 bottom-8 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(72,144,247,0.12) 8%, rgba(72,144,247,0.12) 92%, transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const tc = tagColors[step.tag]
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
                  className="flex gap-8 pb-12 last:pb-0"
                >
                  {/* Step circle */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative z-10 flex-shrink-0"
                      style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.18)' }}
                    >
                      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '15px', fontWeight: 800, color: ACCENT, letterSpacing: '-0.02em' }}>
                        {step.n}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="flex flex-wrap items-start gap-2.5 mb-3">
                      <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {step.title}
                      </h3>
                      <div className="flex gap-1.5 flex-wrap pt-0.5">
                        <span
                          className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-full"
                          style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                        >
                          {step.tag}
                        </span>
                        <span
                          className="text-[9px] font-semibold tracking-[0.08em] uppercase px-2 py-1 rounded-full"
                          style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.12)', color: ACCENT }}
                        >
                          {step.phase}
                        </span>
                        <span
                          className="text-[9px] font-medium px-2 py-1 rounded-full"
                          style={{ background: 'var(--state-hover-bg)', border: '1px solid var(--color-border-muted)', color: 'var(--text-primary)', opacity: 0.72 }}
                        >
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                      {step.body}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {step.details.map(d => (
                        <div
                          key={d}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                          style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.08)' }}
                        >
                          <svg viewBox="0 0 10 10" fill="none" width="9" height="9" aria-hidden="true">
                            <circle cx="5" cy="5" r="4.5" fill="rgba(72,144,247,0.1)" stroke={ACCENT} strokeWidth="0.7" />
                            <path d="M3 5l1.5 1.5 2.5-3" stroke={ACCENT} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[11px] font-medium" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl"
          style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.12)' }}
        >
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>
              Ready to get started?
            </p>
            <p className="text-[12px]" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
              Sign up takes 2 minutes. No GP referral. No upfront payment.
            </p>
          </div>
          <a
            href="https://app.apexmetabolichealth.com.au/signup"
            className="btn-primary flex-shrink-0"
          >
            Create Your Account
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── After Consultation ───────────────────────────────────────────────────────

function AfterConsultation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--color-border-muted)' }}
      aria-label="After your consultation"
    >
      <div className="container-tight relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '0.75rem' }}
          >
            Two ways to continue care.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-sm max-w-xl mx-auto" style={{ color: 'var(--text-primary)', opacity: 0.72 }}
          >
            Your doctor will explain both options at your consultation. Both options are managed through your patient portal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Membership */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease }}
            className="relative flex flex-col rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${ACCENT}`, background: 'var(--bg)', boxShadow: '0 0 60px rgba(72,144,247,0.08)' }}
          >
            <div className="absolute top-0 right-5 px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase rounded-b-lg"
              style={{ background: ACCENT, color: '#ffffff' }}>
              Recommended
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="mb-5">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: ACCENT }}>
                  Protocol Membership
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                  Full ongoing clinical management. The 3-monthly review cycle, prescribing fees waived, medication at cost price, and nursing support, all coordinated through your portal.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  'Prescribing fees waived ($125 per script otherwise)',
                  'Medication at pharmacy cost, no mark-up',
                  'Discounted follow-up blood panels',
                  '3-monthly review and protocol adjustment',
                  'Nursing check-ins every 6–8 weeks',
                  'Priority clinical support between consultations',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="6" cy="6" r="5.5" fill="rgba(72,144,247,0.1)" stroke={ACCENT} strokeWidth="0.8" />
                      <path d="M3.5 6l2 2 3-3.5" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link href="/membership" className="btn-primary w-full justify-center">
                  Learn about membership
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Script release */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.32, ease }}
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'var(--bg)' }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="mb-5">
                <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                  Script Release Only
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                  Clinical assessment, a prescription, then independence. Script is released to your preferred pharmacy. Follow-up consultations are available on request through your portal.
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mb-8">
                {[
                  'Standard consulting fees apply per session',
                  'Script released to your chosen pharmacy',
                  'Prescribing fee: $125 per script',
                  'Follow-up consultations available on request',
                  'No structured review cycle included',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="6" cy="6" r="5.5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                      <path d="M3.5 6l2 2 3-3.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <a href="https://app.apexmetabolichealth.com.au/signup" className="btn-ghost w-full justify-center">
                  Get Started
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Get started"
    >
      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.06, marginBottom: '1rem' }}
        >
          Your biology. Explained.
          <br />
          <span style={{ color: ACCENT }}>Your protocol. Delivered.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }}
          className="text-sm leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-primary)', opacity: 0.72 }}
        >
          Create your account in two minutes. Complete your intake in the portal.
          Your doctor has your results and protocol ready within days.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="https://app.apexmetabolichealth.com.au/signup" className="btn-primary">
            Create Your Account
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/faqs" className="btn-ghost">
            Read the FAQs
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.45 }}
          className="text-[11px] mt-6" style={{ color: 'var(--text-primary)', opacity: 0.72 }}
        >
          All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PortalIntro />
        <ProcessSteps />
        <AfterConsultation />
        <DoctorCard />
        <FAQSection faqs={FAQS} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
