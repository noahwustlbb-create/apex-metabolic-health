'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'goal',
    question: 'What is your primary health goal right now?',
    options: [
      { label: 'More energy, better mood & mental clarity', value: 'hormone' },
      { label: 'Lose weight or change body composition', value: 'metabolic' },
      { label: 'Improve performance & recovery', value: 'performance' },
      { label: 'Hair loss or skin concerns', value: 'aesthetic' },
      { label: 'Injury recovery or repair', value: 'injury' },
    ],
  },
  {
    id: 'symptoms',
    question: 'Which of these sounds most like you?',
    options: [
      { label: 'Fatigue, low drive, or brain fog that won\'t shift', value: 'hormone' },
      { label: 'Weight that won\'t budge despite diet and exercise', value: 'metabolic' },
      { label: 'Plateaued results and poor recovery from training', value: 'performance' },
      { label: 'Thinning hair or declining skin quality', value: 'aesthetic' },
      { label: 'Slow-healing injury or chronic pain', value: 'injury' },
    ],
  },
  {
    id: 'bloodwork',
    question: 'Have you had blood work done in the last 12 months?',
    options: [
      { label: 'Yes — and everything came back "normal"', value: 'hormone' },
      { label: 'Yes — some markers were flagged', value: 'hormone' },
      { label: 'No — I haven\'t had it done recently', value: 'general' },
      { label: 'I\'m not sure what I need', value: 'discovery' },
    ],
  },
]

type Result = {
  title: string
  description: string
  cta: string
  href: string
  track: string
}

function getResult(answers: string[]): Result {
  const counts: Record<string, number> = {}
  answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1 })

  if (counts['discovery'] || answers[2] === 'discovery') {
    return {
      title: 'Start with a Free Discovery Call',
      description: 'You\'re not sure where to begin — and that\'s exactly what the discovery call is for. A free 15-minute call with our team to understand your goals and point you in the right direction.',
      cta: 'Book a Discovery Call',
      href: '/intake/discovery',
      track: 'discovery',
    }
  }
  if (counts['hormone'] >= 2 || counts['performance'] >= 1) {
    return {
      title: 'Hormone Program',
      description: 'Based on your answers, a hormone program is likely the right starting point. Comprehensive pathology followed by a doctor consultation to assess and address what\'s actually driving your symptoms.',
      cta: 'Book Hormone Consult',
      href: '/intake/hormone',
      track: 'hormone',
    }
  }
  if (counts['metabolic'] >= 1 || counts['aesthetic'] >= 1 || counts['injury'] >= 1) {
    return {
      title: 'General Health Consultation',
      description: 'Based on your answers, a general consultation is your best next step. Your doctor will review your health profile and build a personalised protocol for your specific goals.',
      cta: 'Book General Consult',
      href: '/intake/general',
      track: 'general',
    }
  }
  return {
    title: 'Start with a Free Discovery Call',
    description: 'Let\'s figure out the right pathway together. A free 15-minute call to understand your goals and point you in the right direction. No cost, no commitment.',
    cta: 'Book a Discovery Call',
    href: '/intake/discovery',
    track: 'discovery',
  }
}

export default function ProgramQuiz() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1)
    } else {
      setResult(getResult(newAnswers))
    }
  }

  const reset = () => {
    setStarted(false)
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  return (
    <section
      id="quiz"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Program selector quiz"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(43,123,224,0.06) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Heading */}
          {!started && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="label mb-4">FIND YOUR PROGRAM</p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Not Sure Where to Start?
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#8899aa' }}>
                Answer 3 quick questions and we&apos;ll point you to the right program.
                Takes under 60 seconds.
              </p>
              <button onClick={() => setStarted(true)} className="btn-teal">
                Find My Program
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Quiz */}
          <AnimatePresence mode="wait">
            {started && !result && (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center gap-3 mb-8">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: i <= step ? '#2b7be0' : '#1e2d3d' }}
                    />
                  ))}
                  <span className="text-xs flex-shrink-0" style={{ color: '#4a5a6a' }}>
                    {step + 1} / {QUESTIONS.length}
                  </span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold mb-7 leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  {QUESTIONS[step].question}
                </h3>

                <div className="flex flex-col gap-3">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.value + opt.label}
                      onClick={() => handleAnswer(opt.value)}
                      className="text-left px-5 py-4 rounded-sm transition-all duration-200 group"
                      style={{
                        background: '#0d1117',
                        border: '1px solid #1e2d3d',
                        color: '#8899aa',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#2b7be0'
                        e.currentTarget.style.color = '#f0f4f8'
                        e.currentTarget.style.backgroundColor = 'rgba(43,123,224,0.04)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#1e2d3d'
                        e.currentTarget.style.color = '#8899aa'
                        e.currentTarget.style.backgroundColor = '#0d1117'
                      }}
                    >
                      <span className="text-sm leading-relaxed">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => { setStep(step - 1); setAnswers(answers.slice(0, -1)) }}
                    className="mt-5 text-xs"
                    style={{ color: '#4a5a6a' }}
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            )}

            {/* Result */}
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="apex-card p-8 text-center"
                style={{ border: '1px solid rgba(43,123,224,0.3)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-sm mx-auto mb-6"
                  style={{ backgroundColor: 'rgba(43,123,224,0.1)', border: '1px solid rgba(43,123,224,0.25)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                    <path d="M9 12l2 2 4-4M12 3l-8 4.5v5C4 17.4 7.4 21.5 12 22c4.6-.5 8-4.6 8-9.5v-5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="label mb-3">RECOMMENDED FOR YOU</p>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  {result.title}
                </h3>
                <p className="text-sm leading-relaxed mb-7 max-w-md mx-auto" style={{ color: '#8899aa' }}>
                  {result.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href={result.href} className="btn-teal">
                    {result.cta}
                  </Link>
                  <button onClick={reset} className="btn-ghost">
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
