'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ---------------------------------------------------------------------------
// Metabolic Health Questionnaire
// 10 clinically-relevant metabolic symptom indicators
// ---------------------------------------------------------------------------
const QUESTIONS = [
  { id: 1,  text: 'Do you struggle to lose weight even when dieting or exercising consistently?' },
  { id: 2,  text: 'Have you noticed increasing fat around your midsection in the past 12 months?' },
  { id: 3,  text: 'Do you experience persistent fatigue or low energy throughout the day?' },
  { id: 4,  text: 'Do you have strong sugar or carbohydrate cravings, particularly in the afternoon?' },
  { id: 5,  text: 'Do you feel mentally foggy, slow, or have difficulty concentrating?' },
  { id: 6,  text: 'Do you experience energy crashes — especially after meals?' },
  { id: 7,  text: 'Has a doctor mentioned elevated blood sugar, cholesterol, or blood pressure?' },
  { id: 8,  text: 'Do you have difficulty sleeping or wake feeling unrefreshed?' },
  { id: 9,  text: 'Has your motivation, drive, or general mood noticeably declined?' },
  { id: 10, text: 'Do you feel physically slower or less capable than you were 3–5 years ago?' },
]

type Answer = 'yes' | 'no' | null

// ---------------------------------------------------------------------------
// Scoring logic
// ---------------------------------------------------------------------------
function computeResult(answers: Answer[]) {
  const yesCount = answers.filter((a) => a === 'yes').length

  let tier: 'low' | 'moderate' | 'high'
  if (yesCount <= 2) {
    tier = 'low'
  } else if (yesCount <= 5) {
    tier = 'moderate'
  } else {
    tier = 'high'
  }

  return { yesCount, tier }
}

const TIER_CONFIG = {
  low: {
    label: 'LOW RISK',
    color: '#1a9e8f',
    glowColor: 'rgba(26,158,143,0.22)',
    heading: 'Your metabolic markers appear within a healthy range.',
    body: 'Your current symptom profile suggests low risk of metabolic dysregulation. That said, metabolic health shifts gradually — advanced biomarker analysis gives you a precise baseline and catches changes before they become problems.',
    primaryCTA: { label: 'Order a Metabolic Panel', href: '/order-bloods' },
    secondaryCTA: { label: 'Explore Programs', href: '/services' },
  },
  moderate: {
    label: 'MODERATE RISK',
    color: '#c9a84c',
    glowColor: 'rgba(201,168,76,0.22)',
    heading: 'Your results suggest signs of metabolic dysregulation.',
    body: 'Several of your responses align with early-stage metabolic dysfunction — including insulin resistance, poor body composition, and energy dysregulation. A clinical consultation and targeted blood panel will identify the root cause and a treatment pathway.',
    primaryCTA: { label: 'Book a Metabolic Consult', href: '/intake/general' },
    secondaryCTA: { label: 'Order Blood Panel', href: '/order-bloods' },
  },
  high: {
    label: 'HIGH RISK',
    color: '#e05c5c',
    glowColor: 'rgba(224,92,92,0.22)',
    heading: 'Your results indicate significant metabolic dysfunction.',
    body: 'Your symptom profile is strongly consistent with metabolic syndrome indicators — including insulin resistance, visceral fat accumulation, hormonal dysregulation, and systemic inflammation. We strongly recommend a comprehensive metabolic panel and clinical consultation.',
    primaryCTA: { label: 'Book Metabolic Consult Now', href: '/intake/general' },
    secondaryCTA: { label: 'Speak to a Clinician', href: '/intake/discovery' },
  },
}

// ---------------------------------------------------------------------------
// Score label mapping
// ---------------------------------------------------------------------------
const SCORE_LABEL: Record<string, string> = {
  low: 'Optimal',
  moderate: 'At Risk',
  high: 'Dysfunction',
}

// ---------------------------------------------------------------------------
// Animated donut chart
// ---------------------------------------------------------------------------
const RADIUS = 70
const STROKE_WIDTH = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SVG_SIZE = (RADIUS + STROKE_WIDTH) * 2 + 8

function DonutChart({ percentage, color, yesCount }: { percentage: number; color: string; yesCount: number }) {
  const [animatedPct, setAnimatedPct] = useState(0)
  const dashOffset = CIRCUMFERENCE * (1 - animatedPct / 100)

  useEffect(() => {
    const t = setTimeout(() => setAnimatedPct(percentage), 300)
    return () => clearTimeout(t)
  }, [percentage])

  return (
    <div className="relative flex items-center justify-center" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
      <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
        <circle cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE_WIDTH} />
        <circle
          cx={SVG_SIZE / 2} cy={SVG_SIZE / 2} r={RADIUS} fill="none"
          stroke={color} strokeWidth={STROKE_WIDTH} strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)', filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        <span className="font-bold leading-none" style={{ fontSize: 36, color: '#F4F4F6' }}>
          {yesCount}<span style={{ fontSize: 18, color: '#B0B8C5' }}>/10</span>
        </span>
        <span style={{ fontSize: 11, color: '#B0B8C5', letterSpacing: '0.12em', marginTop: 4 }}>SYMPTOMS</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Question card
// ---------------------------------------------------------------------------
function QuestionCard({
  question, index, answer, onAnswer,
}: {
  question: { id: number; text: string }
  index: number
  answer: Answer
  onAnswer: (id: number, value: 'yes' | 'no') => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl p-5 md:p-6"
      style={{
        background: '#121c30',
        border: `1px solid ${answer ? 'rgba(53,117,198,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.25s',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span
            className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: 26, height: 26, marginTop: 1,
              background: answer ? 'rgba(53,117,198,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${answer ? 'rgba(53,117,198,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: answer ? '#6AAEE8' : '#4a5a6a',
              fontFamily: 'var(--font-space-grotesk)',
              transition: 'all 0.25s',
            }}
          >
            {question.id}
          </span>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#F4F4F6' }}>
            {question.text}
          </p>
        </div>

        <div className="flex gap-2 sm:flex-shrink-0">
          {(['yes', 'no'] as const).map((val) => {
            const selected = answer === val
            const isYes = val === 'yes'
            return (
              <button
                key={val}
                onClick={() => onAnswer(question.id, val)}
                className="relative rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  padding: '8px 24px',
                  fontFamily: 'var(--font-space-grotesk)',
                  letterSpacing: '0.04em',
                  background: selected ? (isYes ? '#3575C6' : 'transparent') : '#121c30',
                  border: selected ? '1px solid #3575C6' : '1px solid rgba(255,255,255,0.08)',
                  color: selected ? (isYes ? '#ffffff' : '#6AAEE8') : '#B0B8C5',
                  boxShadow: selected && isYes ? '0 0 16px rgba(53,117,198,0.4)' : 'none',
                  transform: selected ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                {val === 'yes' ? 'Yes' : 'No'}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function MetabolicCheckPage() {
  const [answers, setAnswers] = useState<Answer[]>(Array(10).fill(null))
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const answeredCount = answers.filter((a) => a !== null).length
  const allAnswered = answeredCount === 10

  function handleAnswer(id: number, value: 'yes' | 'no') {
    setAnswers((prev) => {
      const next = [...prev]
      next[id - 1] = value
      return next
    })
  }

  function handleCalculate() {
    setShowResult(true)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function handleRetake() {
    setAnswers(Array(10).fill(null))
    setShowResult(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const result = computeResult(answers)
  const tier = TIER_CONFIG[result.tier]
  const percentage = Math.round((result.yesCount / 10) * 100)

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(53,117,198,0.08) 0%, transparent 60%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
        />

        <div className="container-tight relative">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="label">Metabolic Health Check</span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6', lineHeight: 1.1 }}
            >
              Is Your Metabolism{' '}
              <span className="text-teal-gradient">Working For You?</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8 mx-auto max-w-xl" style={{ color: '#B0B8C5' }}>
              10 clinically-relevant questions to screen for metabolic dysfunction — including insulin resistance, poor body composition, and systemic fatigue. Takes under 2 minutes.
            </p>

            <div className="flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  letterSpacing: '0.06em',
                  background: 'rgba(53,117,198,0.08)',
                  border: '1px solid rgba(53,117,198,0.2)',
                  color: '#6AAEE8',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3575C6', boxShadow: '0 0 6px #3575C6' }} />
                Clinically-informed · Metabolic Symptom Screening
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUIZ */}
      <section className="relative section-pad" style={{ backgroundColor: '#0d1520' }}>
        <div className="glow-rule mb-0" />

        <div className="container-tight pt-10 md:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-between mb-8 md:mb-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#3575C6', fontFamily: 'var(--font-space-grotesk)' }}>
                Metabolic Screening
              </p>
              <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}>
                Answer all 10 questions
              </h2>
            </div>
            <div
              className="flex flex-col items-center justify-center rounded-xl px-5 py-3"
              style={{ background: '#121c30', border: '1px solid rgba(255,255,255,0.06)', minWidth: 80 }}
            >
              <span
                className="font-bold text-2xl leading-none"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: answeredCount === 10 ? '#3575C6' : '#F4F4F6', transition: 'color 0.3s' }}
              >
                {answeredCount}<span style={{ color: '#4a5a6a', fontSize: 16 }}>/10</span>
              </span>
              <span style={{ fontSize: 10, color: '#4a5a6a', letterSpacing: '0.1em', marginTop: 2 }}>ANSWERED</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-8 md:mb-10 rounded-full overflow-hidden" style={{ height: 3, background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3575C6, #6AAEE8)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${(answeredCount / 10) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            {QUESTIONS.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i} answer={answers[q.id - 1]} onAnswer={handleAnswer} />
            ))}
          </div>

          <AnimatePresence>
            {allAnswered && !showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex justify-center"
              >
                <button onClick={handleCalculate} className="btn-teal">
                  Calculate My Metabolic Score
                  <span className="btn-circle">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* RESULT */}
      <AnimatePresence>
        {showResult && (
          <section
            ref={resultRef}
            className="relative section-pad overflow-hidden scroll-mt-20"
            style={{ backgroundColor: '#0A0A0A' }}
          >
            <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 600, height: 600, background: `radial-gradient(ellipse at center, ${tier.glowColor} 0%, transparent 65%)` }}
            />
            <div className="glow-rule mb-0" />

            <div className="container-tight pt-10 md:pt-14">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto"
              >
                <div className="text-center mb-10">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#3575C6', fontFamily: 'var(--font-space-grotesk)' }}>
                    Your Results
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}>
                    Metabolic Score
                  </h2>
                </div>

                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#0d1520',
                    border: `1px solid ${tier.color}33`,
                    boxShadow: `0 0 60px ${tier.glowColor}, 0 0 0 1px ${tier.color}22`,
                  }}
                >
                  <div className="h-1 w-full" style={{ background: tier.color }} />

                  <div className="p-7 md:p-10">
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                      <DonutChart percentage={percentage} color={tier.color} yesCount={result.yesCount} />

                      <div className="flex-1 text-center sm:text-left">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4"
                          style={{
                            fontFamily: 'var(--font-space-grotesk)',
                            letterSpacing: '0.12em',
                            background: `${tier.color}18`,
                            border: `1px solid ${tier.color}55`,
                            color: tier.color,
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}` }} />
                          {tier.label}
                        </motion.span>

                        <h3 className="text-lg md:text-xl font-bold mb-3 leading-snug" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}>
                          {tier.heading}
                        </h3>

                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}` }}
                          />
                          <span
                            className="text-xs font-semibold"
                            style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.08em', color: tier.color }}
                          >
                            METABOLIC SCORE — {SCORE_LABEL[result.tier]}
                          </span>
                          <span style={{ color: '#4a5a6a', fontSize: 11 }}>
                            · {result.yesCount} of 10 symptoms present
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6" style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                    <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: '#B0B8C5' }}>
                      {tier.body}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                      <a href={tier.primaryCTA.href} className="btn-teal flex-1 justify-center">
                        {tier.primaryCTA.label}
                        <span className="btn-circle">
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                      <a href={tier.secondaryCTA.href} className="btn-ghost flex-1 justify-center">
                        {tier.secondaryCTA.label}
                        <span className="btn-circle">
                          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    </div>

                    <div
                      className="rounded-lg p-4 text-xs leading-relaxed"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#4a5a6a' }}
                    >
                      <span style={{ color: '#B0B8C5', fontWeight: 600 }}>Disclaimer: </span>
                      This tool is a screening aid only and does not constitute medical advice. Clinical assessment by an AHPRA-registered practitioner is required for diagnosis and treatment.
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleRetake}
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: '#4a5a6a', letterSpacing: '0.04em' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#B0B8C5')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#4a5a6a')}
                  >
                    ↺ Retake Quiz
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA */}
      <BottomCTA />

      <Footer />
    </div>
  )
}

function BottomCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(53,117,198,0.07) 0%, transparent 65%)' }} />
      <div className="glow-rule mb-0" />
      <div className="container-tight pt-10 md:pt-14">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6' }}>
            Ready for Real <span className="text-teal-gradient">Answers?</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#B0B8C5' }}>
            Advanced metabolic panel. Personalised clinical protocol. 100% online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/intake/general" className="btn-teal">
              Book Metabolic Consult
              <span className="btn-circle">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href="/order-bloods" className="btn-ghost">
              Order Blood Panel
              <span className="btn-circle">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
