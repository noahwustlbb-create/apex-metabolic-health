'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ---------------------------------------------------------------------------
// ADAM Questionnaire data
// ---------------------------------------------------------------------------
const QUESTIONS = [
  { id: 1, text: 'Do you have a decrease in libido (sex drive)?' },
  { id: 2, text: 'Do you have a lack of energy?' },
  { id: 3, text: 'Do you have a decrease in strength and/or endurance?' },
  { id: 4, text: 'Have you lost height?' },
  { id: 5, text: 'Have you noticed a decreased enjoyment of life?' },
  { id: 6, text: 'Are you sad and/or grumpy?' },
  { id: 7, text: 'Are your erections less strong?' },
  { id: 8, text: 'Have you noticed a recent deterioration in your ability to play sports?' },
  { id: 9, text: 'Are you falling asleep after dinner?' },
  { id: 10, text: 'Has there been a recent deterioration in your work performance?' },
]

type Answer = 'yes' | 'no' | null

// ---------------------------------------------------------------------------
// Scoring logic
// ---------------------------------------------------------------------------
function computeResult(answers: Answer[]) {
  const yesCount = answers.filter((a) => a === 'yes').length
  const q1Yes = answers[0] === 'yes'
  const q7Yes = answers[6] === 'yes'
  const adamPositive = q1Yes || q7Yes || yesCount >= 3

  let tier: 'low' | 'moderate' | 'high'
  if (!adamPositive && yesCount <= 1) {
    tier = 'low'
  } else if (adamPositive && yesCount <= 5) {
    tier = 'moderate'
  } else {
    tier = 'high'
  }

  return { yesCount, adamPositive, tier }
}

const TIER_CONFIG = {
  low: {
    label: 'LOW RISK',
    color: '#1a9e8f',
    glowColor: 'rgba(26,158,143,0.25)',
    heading: 'Your hormone levels appear within normal range.',
    body: 'While your current score suggests low androgen deficiency risk, hormonal health exists on a spectrum. Advanced biomarker analysis provides objective data that symptom screening alone cannot capture.',
    primaryCTA: { label: 'Get a Baseline Panel', href: '/order-bloods' },
    secondaryCTA: { label: 'Start Assessment', href: '/assessment' },
  },
  moderate: {
    label: 'MODERATE RISK',
    color: '#c9a84c',
    glowColor: 'rgba(201,168,76,0.25)',
    heading: 'Your results suggest possible androgen deficiency.',
    body: 'Your symptom profile is consistent with suboptimal testosterone levels. A clinical assessment and advanced biomarker panel will confirm whether hormonal intervention is appropriate for you.',
    primaryCTA: { label: 'Get Started Hormone Consult', href: '/intake/hormone' },
    secondaryCTA: { label: 'Start Full Assessment', href: '/assessment' },
  },
  high: {
    label: 'HIGH RISK',
    color: '#e05c5c',
    glowColor: 'rgba(224,92,92,0.25)',
    heading: 'Your results are strongly consistent with androgen deficiency.',
    body: 'A significant number of your responses align with clinically established indicators of low testosterone. We strongly recommend a full hormone panel and clinical consultation with one of our AHPRA-registered doctors.',
    primaryCTA: { label: 'Get Started Hormone Consult Now', href: '/intake/hormone' },
    secondaryCTA: { label: 'Speak to a Clinician', href: '/intake/discovery' },
  },
}

// ---------------------------------------------------------------------------
// Animated donut chart
// ---------------------------------------------------------------------------
const RADIUS = 70
const STROKE_WIDTH = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SVG_SIZE = (RADIUS + STROKE_WIDTH) * 2 + 8

function DonutChart({
  percentage,
  color,
  yesCount,
}: {
  percentage: number
  color: string
  yesCount: number
}) {
  const [animatedPct, setAnimatedPct] = useState(0)
  const dashOffset = CIRCUMFERENCE * (1 - animatedPct / 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPct(percentage)
    }, 300)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="relative flex items-center justify-center" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
      <svg
        width={SVG_SIZE}
        height={SVG_SIZE}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE_WIDTH}
        />
        {/* Progress */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      {/* Centre label */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <span
          className="font-bold leading-none"
          style={{ fontSize: 36, color: '#f0f4f8' }}
        >
          {yesCount}
          <span style={{ fontSize: 18, color: '#8899aa' }}>/10</span>
        </span>
        <span style={{ fontSize: 11, color: '#8899aa', letterSpacing: '0.12em', marginTop: 4 }}>
          SYMPTOMS
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Question card
// ---------------------------------------------------------------------------
function QuestionCard({
  question,
  index,
  answer,
  onAnswer,
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
        background: '#19202c',
        border: `1px solid ${answer ? 'rgba(44,116,232,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.25s',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Number + question */}
        <div className="flex items-start gap-3 flex-1">
          <span
            className="flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: 26,
              height: 26,
              background: answer ? 'rgba(44,116,232,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${answer ? 'rgba(44,116,232,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: answer ? '#2C74E8' : '#4a5a6a',
              fontFamily: 'var(--font-space-grotesk)',
              marginTop: 1,
              transition: 'all 0.25s',
            }}
          >
            {question.id}
          </span>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#f0f4f8' }}>
            {question.text}
          </p>
        </div>

        {/* Yes / No buttons */}
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
                  background: selected
                    ? isYes
                      ? '#2C74E8'
                      : 'transparent'
                    : '#19202c',
                  border: selected
                    ? isYes
                      ? '1px solid #2C74E8'
                      : '1px solid #2C74E8'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: selected
                    ? isYes
                      ? '#ffffff'
                      : '#2C74E8'
                    : '#8899aa',
                  boxShadow: selected && isYes ? '0 0 16px rgba(44,116,232,0.4)' : 'none',
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
export default function HormoneCheckPage() {
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
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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

      {/* ------------------------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ backgroundColor: '#0c131f' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

        {/* Radial glow — top right */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 100% 0%, rgba(44,116,232,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0c131f)',
          }}
        />

        <div className="container-tight relative">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="label"
                style={{ color: '#2C74E8' }}
              >
                Hormone Health Check
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: 1.1 }}
            >
              Is Your Testosterone{' '}
              <span className="text-teal-gradient">Optimised?</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8 mx-auto max-w-xl"
              style={{ color: '#8899aa' }}
            >
              The ADAM questionnaire is a clinically validated screening tool used to
              assess androgen deficiency in men. Takes 2 minutes.
            </p>

            {/* Badge */}
            <div className="flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  letterSpacing: '0.06em',
                  background: 'rgba(44,116,232,0.08)',
                  border: '1px solid rgba(44,116,232,0.2)',
                  color: '#7AB8FF',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#2C74E8', boxShadow: '0 0 6px #2C74E8' }}
                />
                Clinically validated · ADAM Questionnaire
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* QUIZ SECTION */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative section-pad"
        style={{ backgroundColor: '#151c28' }}
      >
        {/* Top glow rule */}
        <div className="glow-rule mb-0" />

        <div className="container-tight pt-10 md:pt-14">

          {/* Progress header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-between mb-8 md:mb-10"
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: '#2C74E8', fontFamily: 'var(--font-space-grotesk)' }}
              >
                ADAM Questionnaire
              </p>
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Answer all 10 questions
              </h2>
            </div>
            {/* Counter */}
            <div
              className="flex flex-col items-center justify-center rounded-xl px-5 py-3"
              style={{
                background: '#19202c',
                border: '1px solid rgba(255,255,255,0.06)',
                minWidth: 80,
              }}
            >
              <span
                className="font-bold text-2xl leading-none"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  color: answeredCount === 10 ? '#2C74E8' : '#f0f4f8',
                  transition: 'color 0.3s',
                }}
              >
                {answeredCount}
                <span style={{ color: '#4a5a6a', fontSize: 16 }}>/10</span>
              </span>
              <span style={{ fontSize: 10, color: '#4a5a6a', letterSpacing: '0.1em', marginTop: 2 }}>
                ANSWERED
              </span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div
            className="mb-8 md:mb-10 rounded-full overflow-hidden"
            style={{ height: 3, background: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2C74E8, #7AB8FF)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${(answeredCount / 10) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Questions grid */}
          <div className="flex flex-col gap-3 md:gap-4">
            {QUESTIONS.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={i}
                answer={answers[q.id - 1]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>

          {/* Calculate button */}
          <AnimatePresence>
            {allAnswered && !showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex justify-center"
              >
                <button
                  onClick={handleCalculate}
                  className="btn-teal text-base px-10 py-4"
                  style={{ fontSize: 15, letterSpacing: '0.04em' }}
                >
                  Calculate My Score
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RESULT SECTION */}
      {/* ------------------------------------------------------------------ */}
      <AnimatePresence>
        {showResult && (
          <section
            ref={resultRef}
            className="relative section-pad overflow-hidden scroll-mt-20"
            style={{ backgroundColor: '#0c131f' }}
          >
            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

            {/* Glow behind chart — tier colour */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 600,
                height: 600,
                background: `radial-gradient(ellipse at center, ${tier.glowColor} 0%, transparent 65%)`,
              }}
            />

            <div className="glow-rule mb-0" />

            <div className="container-tight pt-10 md:pt-14">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto"
              >
                {/* Title */}
                <div className="text-center mb-10">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: '#2C74E8', fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Your Results
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                  >
                    Score Analysis
                  </h2>
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: '#151c28',
                    border: `1px solid ${tier.color}33`,
                    boxShadow: `0 0 60px ${tier.glowColor}, 0 0 0 1px ${tier.color}22`,
                  }}
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full" style={{ background: tier.color }} />

                  <div className="p-7 md:p-10">
                    {/* Donut + tier badge */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                      <DonutChart
                        percentage={percentage}
                        color={tier.color}
                        yesCount={result.yesCount}
                      />

                      <div className="flex-1 text-center sm:text-left">
                        {/* Risk badge */}
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
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}` }}
                          />
                          {tier.label}
                        </motion.span>

                        <h3
                          className="text-lg md:text-xl font-bold mb-3 leading-snug"
                          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                        >
                          {tier.heading}
                        </h3>

                        {/* ADAM status */}
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              background: result.adamPositive ? '#e05c5c' : '#1a9e8f',
                              boxShadow: result.adamPositive
                                ? '0 0 6px #e05c5c'
                                : '0 0 6px #1a9e8f',
                            }}
                          />
                          <span
                            className="text-xs font-semibold"
                            style={{
                              fontFamily: 'var(--font-space-grotesk)',
                              letterSpacing: '0.08em',
                              color: result.adamPositive ? '#e05c5c' : '#1a9e8f',
                            }}
                          >
                            ADAM {result.adamPositive ? 'POSITIVE' : 'NEGATIVE'}
                          </span>
                          <span style={{ color: '#4a5a6a', fontSize: 11 }}>
                            · {result.yesCount} out of 10 symptoms reported
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="mb-6"
                      style={{ height: 1, background: 'rgba(255,255,255,0.05)' }}
                    />

                    {/* Body copy */}
                    <p
                      className="text-sm md:text-base leading-relaxed mb-8"
                      style={{ color: '#8899aa' }}
                    >
                      {tier.body}
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                      <a
                        href={tier.primaryCTA.href}
                        className="btn-teal flex-1 text-center justify-center"
                        style={{ fontSize: 14 }}
                      >
                        {tier.primaryCTA.label}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a
                        href={tier.secondaryCTA.href}
                        className="btn-ghost flex-1 text-center justify-center"
                        style={{ fontSize: 14 }}
                      >
                        {tier.secondaryCTA.label}
                      </a>
                    </div>

                    {/* Disclaimer */}
                    <div
                      className="rounded-lg p-4 text-xs leading-relaxed"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: '#4a5a6a',
                      }}
                    >
                      <span style={{ color: '#8899aa', fontWeight: 600 }}>Disclaimer: </span>
                      This tool is a screening aid only and does not constitute medical advice.
                      Clinical assessment by an AHPRA-registered practitioner is required for
                      diagnosis.
                    </div>
                  </div>
                </div>

                {/* Retake button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleRetake}
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: '#4a5a6a', letterSpacing: '0.04em' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#8899aa')}
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

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM CTA */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative section-pad overflow-hidden"
        style={{ backgroundColor: '#0c131f' }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(44,116,232,0.07) 0%, transparent 65%)',
          }}
        />

        <div className="glow-rule mb-0" />

        <div className="container-tight pt-10 md:pt-14">
          <BottomCTA />
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Bottom CTA — isolated for useInView
// ---------------------------------------------------------------------------
function BottomCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center max-w-2xl mx-auto"
    >
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
      >
        Ready for Real{' '}
        <span className="text-teal-gradient">Answers?</span>
      </h2>
      <p
        className="text-base md:text-lg leading-relaxed mb-8"
        style={{ color: '#8899aa' }}
      >
        Advanced biomarker analysis. Personalised clinical protocol. 100% online.
      </p>
      <a
        href="/intake/hormone"
        className="btn-teal inline-flex"
        style={{ fontSize: 15, padding: '14px 36px' }}
      >
        Get Started Hormone Consult
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </motion.div>
  )
}
