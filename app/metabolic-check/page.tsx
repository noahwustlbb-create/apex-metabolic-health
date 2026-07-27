'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1,  text: 'Do you struggle to lose weight even when dieting or exercising consistently?' },
  { id: 2,  text: 'Have you noticed increasing fat around your midsection in the past 12 months?' },
  { id: 3,  text: 'Do you experience persistent fatigue or low energy throughout the day?' },
  { id: 4,  text: 'Do you have strong sugar or carbohydrate cravings, particularly in the afternoon?' },
  { id: 5,  text: 'Do you feel mentally foggy, slow, or have difficulty concentrating?' },
  { id: 6,  text: 'Do you experience energy crashes, especially after meals?' },
  { id: 7,  text: 'Has a doctor mentioned elevated blood sugar, cholesterol, or blood pressure?' },
  { id: 8,  text: 'Do you have difficulty sleeping or wake feeling unrefreshed?' },
  { id: 9,  text: 'Has your motivation, drive, or general mood noticeably declined?' },
  { id: 10, text: 'Do you feel physically slower or less capable than you were 3–5 years ago?' },
]

type Answer = 'yes' | 'no'

function computeResult(answers: Answer[]) {
  const yesCount = answers.filter(a => a === 'yes').length
  let tier: 'low' | 'moderate' | 'high'
  if (yesCount <= 2) tier = 'low'
  else if (yesCount <= 5) tier = 'moderate'
  else tier = 'high'
  return { yesCount, tier }
}

const TIER = {
  low: {
    label: 'LOW RISK',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    heading: 'Your metabolic markers appear within a healthy range.',
    body: 'Your current symptom profile suggests low risk of metabolic dysregulation. That said, metabolic health shifts gradually. Advanced biomarker analysis gives you a precise baseline and catches changes before they become problems.',
    cta: 'Get a Metabolic Baseline',
    href: 'https://app.apexmetabolichealth.com.au/signup',
  },
  moderate: {
    label: 'MODERATE RISK',
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    heading: 'Your results suggest signs of metabolic dysregulation.',
    body: 'Several of your responses align with early-stage metabolic dysfunction, including insulin resistance, poor body composition, and energy dysregulation. A clinical consultation and targeted blood panel will identify the root cause and a treatment pathway.',
    cta: 'Book a Metabolic Consultation',
    href: 'https://app.apexmetabolichealth.com.au/signup',
  },
  high: {
    label: 'HIGH RISK',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    heading: 'Your results indicate significant metabolic dysfunction.',
    body: 'Your symptom profile strongly suggests metabolic dysregulation that warrants clinical assessment. A comprehensive metabolic blood panel and consultation with an AHPRA-registered doctor is strongly recommended.',
    cta: 'Start Your Metabolic Assessment',
    href: 'https://app.apexmetabolichealth.com.au/signup',
  },
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function ApexLogo() {
  return (
    <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 17, fontWeight: 800, letterSpacing: '0.2em', color: '#0f172a', lineHeight: 1 }}>
        APEX
      </span>
      <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 8, fontWeight: 600, letterSpacing: '0.24em', color: '#94a3b8', marginTop: 2, textTransform: 'uppercase' as const }}>
        Metabolic Health
      </span>
    </Link>
  )
}

// ─── Answer Card ──────────────────────────────────────────────────────────────

function AnswerCard({ label, onClick }: { label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '18px 20px', borderRadius: 12,
        border: `1.5px solid ${hover ? 'var(--blue)' : '#e2e8f0'}`,
        background: hover ? '#f8faff' : '#ffffff',
        cursor: 'pointer', textAlign: 'left' as const, width: '100%',
        transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        border: `1.5px solid ${hover ? 'var(--blue)' : '#cbd5e1'}`,
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.15s',
      }}>
        {hover && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--blue)' }} />}
      </div>
      <span style={{
        fontSize: 17, fontWeight: 600, color: hover ? '#0f172a' : '#1e293b', lineHeight: 1.5,
        fontFamily: 'var(--font-space-grotesk)', transition: 'color 0.15s',
      }}>
        {label}
      </span>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MetabolicCheckPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResult, setShowResult] = useState(false)
  const [dir, setDir] = useState(1)
  const [animating, setAnimating] = useState(false)

  const total = QUESTIONS.length
  const progressPct = showResult ? 100 : (currentQ / total) * 100

  function handleAnswer(val: Answer) {
    if (animating) return
    setAnimating(true)
    setAnswers(a => [...a, val])
    setDir(1)
    setTimeout(() => {
      if (currentQ < total - 1) {
        setCurrentQ(q => q + 1)
      } else {
        setShowResult(true)
      }
      setAnimating(false)
    }, 180)
  }

  function handleBack() {
    if (currentQ === 0 || animating) return
    setDir(-1)
    setAnimating(true)
    setTimeout(() => {
      setCurrentQ(q => q - 1)
      setAnswers(a => a.slice(0, -1))
      setAnimating(false)
    }, 160)
  }

  function handleRetake() {
    setAnswers([])
    setCurrentQ(0)
    setShowResult(false)
    setDir(1)
  }

  const result = showResult ? computeResult(answers) : null
  const tier = result ? TIER[result.tier] : null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        padding: '22px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderBottom: '1px solid #f1f5f9', position: 'relative',
      }}>
        <ApexLogo />
        <Link href="/" style={{
          position: 'absolute', left: 24, fontSize: 12, color: '#94a3b8',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: 'var(--font-space-grotesk)', fontWeight: 500,
        }}>
          ← Exit
        </Link>
      </header>

      {/* Progress bar */}
      <div style={{ height: 3, backgroundColor: '#f1f5f9' }}>
        <motion.div
          style={{ height: '100%', backgroundColor: 'var(--blue)' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '52px 24px 40px' }}>
        <div style={{ width: '100%', maxWidth: 580 }}>
          <AnimatePresence mode="wait" custom={dir}>
            {!showResult ? (
              <motion.div
                key={`q-${currentQ}`}
                custom={dir}
                initial={{ opacity: 0, x: dir * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -48 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', marginBottom: 20, fontFamily: 'var(--font-space-grotesk)' }}>
                  Question {currentQ + 1} of {total}
                </p>

                <h1 style={{
                  fontSize: 'clamp(24px, 4.5vw, 36px)', fontWeight: 700, color: '#0f172a',
                  lineHeight: 1.22, marginBottom: 32, fontFamily: 'var(--font-space-grotesk)',
                  letterSpacing: '-0.02em',
                }}>
                  {QUESTIONS[currentQ].text}
                </h1>

                {/* Doctor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '2px solid #e2e8f0',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-space-grotesk)' }}>CC</span>
                    </div>
                    <span style={{
                      position: 'absolute', bottom: 1, right: 1, width: 9, height: 9,
                      borderRadius: '50%', backgroundColor: '#22c55e', border: '1.5px solid #fff',
                    }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.3 }}>
                      Dr Cameron Chen
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Medical Director</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(['yes', 'no'] as const).map(val => (
                    <AnswerCard key={val} label={val === 'yes' ? 'Yes' : 'No'} onClick={() => handleAnswer(val)} />
                  ))}
                </div>

                {currentQ > 0 && (
                  <button onClick={handleBack} style={{
                    marginTop: 28, fontSize: 13, color: '#94a3b8', background: 'none',
                    border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'var(--font-space-grotesk)', display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px',
                  borderRadius: 99, backgroundColor: tier!.bg, border: `1px solid ${tier!.border}`, marginBottom: 24,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: tier!.color, display: 'block', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: tier!.color, fontFamily: 'var(--font-space-grotesk)' }}>
                    {tier!.label}
                  </span>
                </div>

                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', marginBottom: 14, fontFamily: 'var(--font-space-grotesk)' }}>
                  Metabolic Screening: {result!.yesCount}/{total} symptoms reported
                </p>

                <h2 style={{
                  fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: '#0f172a',
                  lineHeight: 1.22, marginBottom: 18, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em',
                }}>
                  {tier!.heading}
                </h2>

                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.72, marginBottom: 36 }}>
                  {tier!.body}
                </p>

                <a href={tier!.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', padding: '18px 24px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                  color: '#ffffff', fontSize: 15, fontWeight: 600, textDecoration: 'none',
                  fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                  marginBottom: 12, letterSpacing: '-0.01em',
                }}>
                  {tier!.cta}
                  <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <button onClick={handleRetake} style={{
                  width: '100%', padding: '16px 24px', borderRadius: 12,
                  border: '1.5px solid #e2e8f0', background: '#ffffff', color: '#64748b',
                  fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)',
                }}>
                  Retake questionnaire
                </button>

                <p style={{ marginTop: 28, fontSize: 11, color: '#94a3b8', lineHeight: 1.65, textAlign: 'center' as const }}>
                  This questionnaire is a screening tool only and does not constitute medical advice. Clinical decisions are made by AHPRA-registered medical practitioners.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer style={{ padding: '18px 24px', textAlign: 'center' as const, borderTop: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-space-grotesk)' }}>
          All consultations conducted by AHPRA-registered medical practitioners. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
        </p>
      </footer>
    </div>
  )
}
