'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSignupGate } from '@/context/SignupGateContext'

const QUIZ = [
  {
    id: 'goal',
    question: "What's your main health goal?",
    options: [
      { label: 'Restore my energy, drive, and hormonal balance', value: 'hormone' },
      { label: 'Lose weight and improve my metabolism', value: 'weight' },
      { label: 'Recover from an injury or manage chronic pain', value: 'recovery' },
      { label: 'Slow down ageing and maintain my vitality', value: 'antiageing' },
    ],
  },
  {
    id: 'duration',
    question: 'How long have you been dealing with this?',
    options: [
      { label: 'Just starting to notice — under 6 months', value: 'recent' },
      { label: "It's been building — 6 months to 2 years", value: 'moderate' },
      { label: "It's been years — I'm ready to do something about it", value: 'long' },
    ],
  },
  {
    id: 'age',
    question: 'What is your age bracket?',
    options: [
      { label: 'Under 35', value: 'u35' },
      { label: '35–45', value: '35-45' },
      { label: '46–55', value: '46-55' },
      { label: 'Over 55', value: 'o55' },
    ],
  },
  {
    id: 'outcome',
    question: 'What would success look like for you?',
    options: [
      { label: 'More energy, focus, and drive', value: 'energy' },
      { label: 'A leaner, stronger body', value: 'body' },
      { label: 'Being pain-free and recovering properly', value: 'painfree' },
      { label: 'Feeling vital and healthy long-term', value: 'vital' },
    ],
  },
]

const PROGRAMS: Record<string, { name: string; sub: string; quizHref: string; benefits: string[] }> = {
  hormone: {
    name: 'Hormone Optimisation',
    sub: 'ADAM-validated hormonal assessment',
    quizHref: '/hormone-check',
    benefits: [
      'Comprehensive 40+ biomarker hormone panel',
      'Evidence-based protocol designed around your bloodwork',
      'Clinical reviews every 3 months with ongoing monitoring',
    ],
  },
  weight: {
    name: 'Medical Weight Loss',
    sub: 'Doctor-led metabolic treatment',
    quizHref: '/metabolic-check',
    benefits: [
      'Full metabolic panel including insulin resistance markers',
      'Doctor-prescribed treatment tailored to your metabolic profile',
      'Body composition tracking with clinical oversight',
    ],
  },
  recovery: {
    name: 'Recovery & Injury Repair',
    sub: 'Doctor-led tissue repair',
    quizHref: '/intake/quiz/injury',
    benefits: [
      'Assessment by an AHPRA-registered doctor',
      'Evidence-based repair protocol coordinated through our pharmacy partner',
      'Structured recovery timeline with clinical reviews',
    ],
  },
  antiageing: {
    name: 'Anti-Ageing & Longevity',
    sub: 'Performance-focused longevity care',
    quizHref: '/intake/quiz/antiageing',
    benefits: [
      'Comprehensive longevity biomarker panel',
      'Doctor-designed protocol targeting the biology of ageing',
      'Ongoing monitoring to track and maintain your progress',
    ],
  },
}

function matchProgram(answers: string[]): string {
  const goal = answers[0]
  if (goal && PROGRAMS[goal]) return goal
  const outcome = answers[3]
  if (outcome === 'energy') return 'hormone'
  if (outcome === 'body') return 'weight'
  if (outcome === 'painfree') return 'recovery'
  if (outcome === 'vital') return 'antiageing'
  return 'hormone'
}

function OptionCard({ label, onClick }: { label: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '17px 20px', borderRadius: 12,
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
        fontSize: 16, fontWeight: 600, color: hover ? '#0f172a' : '#1e293b',
        fontFamily: 'var(--font-space-grotesk)', transition: 'color 0.15s', lineHeight: 1.5,
      }}>
        {label}
      </span>
    </button>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function MatchingQuizModal({ onClose }: { onClose: () => void }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [matched, setMatched] = useState<string | null>(null)
  const [dir, setDir] = useState(1)
  const [animating, setAnimating] = useState(false)
  const { open: openGate } = useSignupGate()

  const total = QUIZ.length
  const progressPct = matched ? 100 : (currentQ / total) * 100
  const program = matched ? PROGRAMS[matched] : null

  function handleAnswer(value: string) {
    if (animating) return
    setAnimating(true)
    const next = [...answers, value]
    setDir(1)
    setTimeout(() => {
      if (currentQ < total - 1) {
        setAnswers(next)
        setCurrentQ(q => q + 1)
      } else {
        setAnswers(next)
        setMatched(matchProgram(next))
      }
      setAnimating(false)
    }, 180)
  }

  function handleBack() {
    if (animating) return
    if (matched) {
      setMatched(null)
      setDir(-1)
      return
    }
    if (currentQ === 0) {
      onClose()
      return
    }
    setDir(-1)
    setAnimating(true)
    setTimeout(() => {
      setCurrentQ(q => q - 1)
      setAnswers(a => a.slice(0, -1))
      setAnimating(false)
    }, 160)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#ffffff', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header style={{
        padding: '22px 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', borderBottom: '1px solid #f1f5f9',
        position: 'sticky', top: 0, backgroundColor: '#ffffff', zIndex: 10,
      }}>
        <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 17, fontWeight: 800, letterSpacing: '0.2em', color: '#0f172a', lineHeight: 1 }}>
            APEX
          </span>
          <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 8, fontWeight: 600, letterSpacing: '0.24em', color: '#94a3b8', marginTop: 2, textTransform: 'uppercase' as const }}>
            Metabolic Health
          </span>
        </Link>
        <button
          onClick={handleBack}
          style={{
            position: 'absolute', left: 24, fontSize: 12, color: '#94a3b8',
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-space-grotesk)', fontWeight: 500,
          }}
        >
          ← {currentQ === 0 && !matched ? 'Exit' : 'Back'}
        </button>
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
            {!matched ? (
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
                  {QUIZ[currentQ].question}
                </h1>

                {/* Doctor avatar */}
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
                  {QUIZ[currentQ].options.map(opt => (
                    <OptionCard key={opt.value} label={opt.label} onClick={() => handleAnswer(opt.value)} />
                  ))}
                </div>

                {currentQ > 0 && (
                  <button
                    onClick={handleBack}
                    style={{
                      marginTop: 28, fontSize: 13, color: '#94a3b8', background: 'none',
                      border: 'none', cursor: 'pointer', padding: 0,
                      fontFamily: 'var(--font-space-grotesk)', display: 'flex', alignItems: 'center', gap: 4,
                    }}
                  >
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
                {/* Match badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px',
                  borderRadius: 99, backgroundColor: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.2)', marginBottom: 24,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'block', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--blue)', fontFamily: 'var(--font-space-grotesk)' }}>
                    Your match
                  </span>
                </div>

                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', marginBottom: 12, fontFamily: 'var(--font-space-grotesk)' }}>
                  Based on your answers
                </p>

                <h2 style={{
                  fontSize: 'clamp(26px, 4.5vw, 36px)', fontWeight: 700, color: '#0f172a',
                  lineHeight: 1.15, marginBottom: 6, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em',
                }}>
                  {program!.name}
                </h2>

                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 32, fontFamily: 'var(--font-space-grotesk)' }}>
                  {program!.sub}
                </p>

                {/* Benefits card */}
                <div style={{
                  padding: '20px 24px', borderRadius: 12,
                  border: '1.5px solid #e2e8f0', marginBottom: 36,
                  display: 'flex', flexDirection: 'column', gap: 14,
                }}>
                  {program!.benefits.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                        background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg viewBox="0 0 10 10" fill="none" width={8} height={8}>
                          <path d="M2 5l2 2 4-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.55, fontFamily: 'var(--font-space-grotesk)' }}>{b}</p>
                    </div>
                  ))}
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() => { onClose(); openGate() }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', padding: '18px 24px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)',
                    color: '#ffffff', fontSize: 15, fontWeight: 600,
                    fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 8px 32px rgba(72,144,247,0.28)',
                    marginBottom: 12, letterSpacing: '-0.01em', cursor: 'pointer', border: 'none',
                  }}
                >
                  Create your account to get started
                  <Arrow />
                </button>

                {/* Secondary: take the full quiz */}
                <a
                  href={program!.quizHref}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', padding: '16px 24px', borderRadius: 12,
                    border: '1.5px solid #e2e8f0', background: '#ffffff',
                    color: '#64748b', fontSize: 14, fontWeight: 500, textDecoration: 'none',
                    fontFamily: 'var(--font-space-grotesk)', marginBottom: 32,
                  }}
                >
                  Take the full {program!.name} assessment →
                </a>

                <p style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.65, textAlign: 'center' as const }}>
                  This tool is a treatment matcher only and does not constitute medical advice. Clinical decisions are made by AHPRA-registered medical practitioners.
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
    </motion.div>
  )
}
