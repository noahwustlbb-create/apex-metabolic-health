'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────

type PrimaryConcern =
  | 'Low Energy & Hormones'
  | 'Performance & Recovery'
  | 'Metabolic & Weight'
  | 'Hair & Skin'
  | 'Injury & Repair'
  | 'General Health'

type Answers = {
  primaryConcern: PrimaryConcern | null
  symptoms: string[]
  duration: string | null
  bloodWork: string | null
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRIMARY_CONCERNS: {
  id: PrimaryConcern
  emoji: string
  label: string
  sub: string
}[] = [
  {
    id: 'Low Energy & Hormones',
    emoji: '🔵',
    label: 'Low Energy & Hormones',
    sub: 'Fatigue, low drive, brain fog',
  },
  {
    id: 'Performance & Recovery',
    emoji: '⚡',
    label: 'Performance & Recovery',
    sub: 'Training, strength, recovery',
  },
  {
    id: 'Metabolic & Weight',
    emoji: '⚖️',
    label: 'Metabolic & Weight',
    sub: 'Weight resistance, metabolism',
  },
  {
    id: 'Hair & Skin',
    emoji: '💆',
    label: 'Hair & Skin',
    sub: 'Hair loss, skin quality',
  },
  {
    id: 'Injury & Repair',
    emoji: '🩹',
    label: 'Injury & Repair',
    sub: 'Joint pain, tissue recovery',
  },
  {
    id: 'General Health',
    emoji: '🩺',
    label: 'General Health',
    sub: 'General check-up, referrals',
  },
]

const SYMPTOM_MAP: Record<PrimaryConcern, string[]> = {
  'Low Energy & Hormones': [
    'Poor sleep quality',
    'Low libido',
    'Mood swings',
    'Brain fog',
    'Weight gain',
    'Low motivation',
  ],
  'Performance & Recovery': [
    'Slow recovery',
    'Plateau in training',
    'Low energy during workouts',
    'Poor sleep',
    'Reduced strength',
    'Joint soreness',
  ],
  'Metabolic & Weight': [
    'Weight won\'t shift despite diet',
    'Constant fatigue',
    'Sugar cravings',
    'Slow metabolism',
    'Hormonal imbalance',
    'Bloating',
  ],
  'Hair & Skin': [
    'Thinning hair',
    'Receding hairline',
    'Dull skin',
    'Skin ageing',
    'Hormonal breakouts',
    'Hair shedding',
  ],
  'Injury & Repair': [
    'Chronic joint pain',
    'Slow healing',
    'Tendon issues',
    'Post-surgery recovery',
    'Muscle soreness',
    'Inflammation',
  ],
  'General Health': [
    'Need referrals',
    'Medical certificate',
    'Vitamin deficiency',
    'Blood work review',
    'Preventive check-up',
    'Other',
  ],
}

const DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  'Over a year',
]

const RESULT_MAP: Record<
  PrimaryConcern,
  {
    program: string
    desc: string
    cta: string
    href: string
  }
> = {
  'Low Energy & Hormones': {
    program: 'Hormone Optimisation Protocol',
    desc: 'Based on your symptoms, advanced biomarker analysis and a full hormone panel is your next step. Our doctors will assess your testosterone, oestradiol, SHBG, and metabolic markers to design your personalised protocol.',
    cta: 'Book Hormone Consult',
    href: '/intake/hormone',
  },
  'Performance & Recovery': {
    program: 'Performance & Recovery Protocol',
    desc: 'Your symptom profile points to hormonal and mitochondrial factors affecting your output and recovery. A targeted biomarker panel will identify exactly where to intervene.',
    cta: 'Book Hormone Consult',
    href: '/intake/hormone',
  },
  'Metabolic & Weight': {
    program: 'Metabolic Optimisation Protocol',
    desc: 'Weight resistance is rarely just about diet. Your results suggest underlying hormonal and metabolic drivers. A doctor consultation will identify the root cause.',
    cta: 'Book Metabolic Consult',
    href: '/intake/general',
  },
  'Hair & Skin': {
    program: 'Hair & Skin Regeneration Protocol',
    desc: 'Your symptoms suggest androgenic and hormonal contributors to hair and skin changes. A targeted clinical assessment will confirm the best regenerative approach.',
    cta: 'Book General Consult',
    href: '/intake/general',
  },
  'Injury & Repair': {
    program: 'Injury Repair & Recovery Protocol',
    desc: 'Chronic injury and slow healing often have hormonal and biological components. Our doctors will assess the underlying factors and design a regenerative protocol.',
    cta: 'Book General Consult',
    href: '/intake/general',
  },
  'General Health': {
    program: 'General Telehealth Consultation',
    desc: 'Our AHPRA-registered doctors provide general telehealth consultations including referrals, medical certificates, and preventive health assessments.',
    cta: 'Book General Consult',
    href: '/intake/general',
  },
}

// ─── Slide transition variants ────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
}

const transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="label"
          style={{ color: '#7AB8FF', letterSpacing: '0.18em' }}
        >
          Step {step} of {total}
        </span>
        <span style={{ color: '#4a5a6a', fontSize: '0.75rem', fontWeight: 600 }}>
          {Math.round(pct)}% complete
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: 3,
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #7AB8FF, #2C74E8)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function QuestionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold tracking-tight mb-2"
      style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        color: '#f0f4f8',
        lineHeight: 1.25,
      }}
    >
      {children}
    </h2>
  )
}

function QuestionSub({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-8"
      style={{ color: '#8899aa', fontSize: '0.9375rem', lineHeight: 1.6 }}
    >
      {children}
    </p>
  )
}

// ─── Step 0 — Intro ───────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="intro"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="text-center py-12"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(44,116,232,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 mb-6">
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#2C74E8',
              boxShadow: '0 0 8px rgba(44,116,232,0.8)',
            }}
          />
          <span className="label">Health Assessment</span>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#2C74E8',
              boxShadow: '0 0 8px rgba(44,116,232,0.8)',
            }}
          />
        </div>

        <h1
          className="font-bold tracking-tight mb-5"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#f0f4f8',
            lineHeight: 1.1,
          }}
        >
          Find Your{' '}
          <span className="text-teal-gradient">Program.</span>
        </h1>

        <p
          className="mx-auto mb-10"
          style={{
            color: '#8899aa',
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            maxWidth: 440,
          }}
        >
          Answer 5 quick questions. We&apos;ll match you to the right clinical
          program and doctor.
        </p>

        <button onClick={onStart} className="btn-teal text-base px-10 py-4">
          Begin Assessment
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3.333 8h9.334M8.667 4.667 12 8l-3.333 3.333"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="mt-8 flex items-center justify-center gap-6 flex-wrap"
          style={{ color: '#4a5a6a', fontSize: '0.75rem', letterSpacing: '0.08em' }}
        >
          {['5 Questions', 'Takes ~2 Minutes', 'No Email Required'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M2.5 6.5 4.5 8.5l5-5"
                  stroke="#2C74E8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Step 1 — Primary concern ─────────────────────────────────────────────────

function Step1({
  value,
  onChange,
  onNext,
}: {
  value: PrimaryConcern | null
  onChange: (v: PrimaryConcern) => void
  onNext: () => void
}) {
  return (
    <motion.div
      key="step1"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      <ProgressBar step={1} total={4} />
      <QuestionHeading>What&apos;s your primary concern right now?</QuestionHeading>
      <QuestionSub>Select the option that best describes what you&apos;re dealing with.</QuestionSub>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {PRIMARY_CONCERNS.map((item) => {
          const selected = value === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="text-left rounded-xl p-4 transition-all duration-200"
              style={{
                border: selected
                  ? '1px solid #2C74E8'
                  : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: selected
                  ? 'rgba(44,116,232,0.08)'
                  : '#151c28',
                boxShadow: selected
                  ? '0 0 20px rgba(44,116,232,0.12)'
                  : 'none',
              }}
            >
              <div className="text-2xl mb-2.5 leading-none">{item.emoji}</div>
              <div
                className="font-semibold mb-1"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '0.9375rem',
                  color: selected ? '#f0f4f8' : '#c8d4e0',
                }}
              >
                {item.label}
              </div>
              <div style={{ color: '#8899aa', fontSize: '0.8125rem' }}>
                {item.sub}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!value}
          className="btn-teal"
          style={{ opacity: value ? 1 : 0.4, cursor: value ? 'pointer' : 'not-allowed' }}
        >
          Next
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2.917 7h8.166M7.583 4.083 10.5 7l-2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 2 — Symptoms ────────────────────────────────────────────────────────

function Step2({
  primaryConcern,
  value,
  onChange,
  onNext,
  onBack,
}: {
  primaryConcern: PrimaryConcern
  value: string[]
  onChange: (v: string[]) => void
  onNext: () => void
  onBack: () => void
}) {
  const options = SYMPTOM_MAP[primaryConcern]

  const toggle = (sym: string) => {
    if (value.includes(sym)) {
      onChange(value.filter((s) => s !== sym))
    } else {
      onChange([...value, sym])
    }
  }

  return (
    <motion.div
      key="step2"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      <ProgressBar step={2} total={4} />
      <QuestionHeading>Which of these do you currently experience?</QuestionHeading>
      <QuestionSub>Select all that apply. At least one selection required.</QuestionSub>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {options.map((sym) => {
          const selected = value.includes(sym)
          return (
            <button
              key={sym}
              onClick={() => toggle(sym)}
              className="flex items-center gap-3 rounded-xl p-4 text-left transition-all duration-200"
              style={{
                border: selected
                  ? '1px solid #2C74E8'
                  : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: selected
                  ? 'rgba(44,116,232,0.08)'
                  : '#151c28',
                boxShadow: selected
                  ? '0 0 20px rgba(44,116,232,0.1)'
                  : 'none',
              }}
            >
              {/* Checkbox indicator */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded"
                style={{
                  width: 20,
                  height: 20,
                  border: selected
                    ? '1.5px solid #2C74E8'
                    : '1.5px solid rgba(255,255,255,0.2)',
                  backgroundColor: selected
                    ? 'rgba(44,116,232,0.2)'
                    : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {selected && (
                  <svg width="11" height="11" fill="none" viewBox="0 0 11 11" aria-hidden="true">
                    <path
                      d="M2 5.5 4.2 7.8 9 3"
                      stroke="#7AB8FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontSize: '0.9375rem',
                  color: selected ? '#f0f4f8' : '#8899aa',
                  fontWeight: selected ? 500 : 400,
                  transition: 'color 0.2s ease',
                }}
              >
                {sym}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M11.083 7H2.917M6.417 4.083 3.5 7l2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={value.length === 0}
          className="btn-teal"
          style={{ opacity: value.length > 0 ? 1 : 0.4, cursor: value.length > 0 ? 'pointer' : 'not-allowed' }}
        >
          Next
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2.917 7h8.166M7.583 4.083 10.5 7l-2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 3 — Duration ────────────────────────────────────────────────────────

function Step3({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string | null
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <motion.div
      key="step3"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      <ProgressBar step={3} total={4} />
      <QuestionHeading>How long have you been experiencing this?</QuestionHeading>
      <QuestionSub>Select the option that best applies.</QuestionSub>

      <div className="flex flex-wrap gap-3 mb-8">
        {DURATION_OPTIONS.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className="rounded-full px-6 py-3 font-semibold text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                border: selected
                  ? '1px solid #2C74E8'
                  : '1px solid rgba(255,255,255,0.1)',
                backgroundColor: selected
                  ? 'rgba(44,116,232,0.12)'
                  : '#151c28',
                color: selected ? '#7AB8FF' : '#8899aa',
                boxShadow: selected
                  ? '0 0 16px rgba(44,116,232,0.15)'
                  : 'none',
                letterSpacing: '0.03em',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M11.083 7H2.917M6.417 4.083 3.5 7l2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="btn-teal"
          style={{ opacity: value ? 1 : 0.4, cursor: value ? 'pointer' : 'not-allowed' }}
        >
          Next
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2.917 7h8.166M7.583 4.083 10.5 7l-2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 4 — Blood work ──────────────────────────────────────────────────────

function Step4({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string | null
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const OPTIONS = [
    {
      id: 'Yes — I have recent results',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 28 28" aria-hidden="true">
          <rect
            x="4"
            y="3"
            width="20"
            height="22"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9 14l3 3 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 8h4M9 20h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      ),
      label: 'Yes — I have recent results',
      sub: "I've had blood tests in the last 6 months",
    },
    {
      id: 'No — I haven\'t had recent tests',
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 28 28" aria-hidden="true">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M14 9v5.5l3.5 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "No — I haven't had recent tests",
      sub: "I'll need a referral for pathology",
    },
  ]

  return (
    <motion.div
      key="step4"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      <ProgressBar step={4} total={4} />
      <QuestionHeading>Have you had blood tests in the last 6 months?</QuestionHeading>
      <QuestionSub>This helps us understand what diagnostic steps are needed.</QuestionSub>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {OPTIONS.map((opt) => {
          const selected = value === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className="text-left rounded-xl p-6 transition-all duration-200"
              style={{
                border: selected
                  ? '1px solid #2C74E8'
                  : '1px solid rgba(255,255,255,0.08)',
                backgroundColor: selected
                  ? 'rgba(44,116,232,0.08)'
                  : '#151c28',
                boxShadow: selected
                  ? '0 0 28px rgba(44,116,232,0.14)'
                  : 'none',
              }}
            >
              <div
                className="mb-4"
                style={{ color: selected ? '#7AB8FF' : '#4a5a6a' }}
              >
                {opt.icon}
              </div>
              <div
                className="font-semibold mb-1.5"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '1rem',
                  color: selected ? '#f0f4f8' : '#c8d4e0',
                }}
              >
                {opt.label}
              </div>
              <div style={{ color: '#8899aa', fontSize: '0.875rem' }}>
                {opt.sub}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M11.083 7H2.917M6.417 4.083 3.5 7l2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!value}
          className="btn-teal"
          style={{ opacity: value ? 1 : 0.4, cursor: value ? 'pointer' : 'not-allowed' }}
        >
          See My Results
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M2.917 7h8.166M7.583 4.083 10.5 7l-2.917 2.917"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 5 — Results ─────────────────────────────────────────────────────────

function ResultScreen({
  answers,
  onRetake,
}: {
  answers: Answers
  onRetake: () => void
}) {
  const concern = answers.primaryConcern!
  const result = RESULT_MAP[concern]
  const needsBloodWork = answers.bloodWork === "No — I haven't had recent tests"

  return (
    <motion.div
      key="result"
      variants={slideVariants}
      custom={1}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      {/* Completion indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, rgba(122,184,255,0.15), rgba(44,116,232,0.25))',
            border: '1px solid rgba(44,116,232,0.4)',
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M3 8.5 6 11.5l7-7"
              stroke="#7AB8FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <span className="label" style={{ color: '#7AB8FF' }}>
            Assessment Complete
          </span>
          <p style={{ color: '#4a5a6a', fontSize: '0.75rem', marginTop: 2 }}>
            Based on your responses
          </p>
        </div>
      </div>

      {/* Result card */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6"
        style={{
          border: '1px solid rgba(44,116,232,0.25)',
          backgroundColor: '#151c28',
        }}
      >
        {/* Blue gradient accent bar at top */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #2C74E8, #7AB8FF, #2C74E8)',
          }}
        />

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 0% 0%, rgba(44,116,232,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative p-7 md:p-9">
          <p
            className="label mb-3"
            style={{ color: '#7AB8FF' }}
          >
            Recommended Program
          </p>

          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: '#f0f4f8',
              lineHeight: 1.2,
            }}
          >
            {result.program}
          </h2>

          <p
            className="mb-6 leading-relaxed"
            style={{
              color: '#8899aa',
              fontSize: '0.9375rem',
              maxWidth: 560,
            }}
          >
            {result.desc}
          </p>

          {/* Blood work note */}
          {needsBloodWork && (
            <div
              className="flex items-start gap-3 rounded-xl p-4 mb-6"
              style={{
                backgroundColor: 'rgba(44,116,232,0.06)',
                border: '1px solid rgba(44,116,232,0.18)',
              }}
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
                aria-hidden="true"
                className="flex-shrink-0 mt-0.5"
              >
                <circle cx="9" cy="9" r="7" stroke="#7AB8FF" strokeWidth="1.3" />
                <path
                  d="M9 6v4M9 12.5v.5"
                  stroke="#7AB8FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p style={{ color: '#7AB8FF', fontSize: '0.875rem', lineHeight: 1.6 }}>
                We&apos;ll arrange your pathology referral before your consultation — no GP required.
              </p>
            </div>
          )}

          {/* Matched symptoms */}
          {answers.symptoms.length > 0 && (
            <div className="mb-7">
              <p
                style={{
                  color: '#4a5a6a',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                Symptoms identified
              </p>
              <div className="flex flex-wrap gap-2">
                {answers.symptoms.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(44,116,232,0.08)',
                      border: '1px solid rgba(44,116,232,0.2)',
                      color: '#7AB8FF',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-7">
            <a href={result.href} className="btn-teal">
              {result.cta}
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M2.917 7h8.166M7.583 4.083 10.5 7l-2.917 2.917"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="/intake/discovery" className="btn-ghost">
              Speak to a Clinician
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="pt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              'AHPRA-Registered Doctors',
              'Advanced Biomarker Analysis',
              '100% Telehealth',
            ].map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-1.5"
                style={{
                  color: '#4a5a6a',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      backgroundColor: '#2C74E8',
                      marginRight: 6,
                    }}
                  />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Retake */}
      <div className="text-center">
        <button
          onClick={onRetake}
          style={{
            color: '#4a5a6a',
            fontSize: '0.875rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Retake Assessment
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Answers>({
    primaryConcern: null,
    symptoms: [],
    duration: null,
    bloodWork: null,
  })

  const advance = () => {
    setDirection(1)
    setStep((s) => (s < 5 ? ((s + 1) as typeof step) : s))
  }

  const retreat = () => {
    setDirection(-1)
    setStep((s) => (s > 0 ? ((s - 1) as typeof step) : s))
  }

  const reset = () => {
    setDirection(-1)
    setAnswers({ primaryConcern: null, symptoms: [], duration: null, bloodWork: null })
    setStep(0)
  }

  return (
    <div
      style={{
        backgroundColor: '#0c131f',
        color: '#f0f4f8',
        fontFamily: 'var(--font-space-grotesk)',
        minHeight: '100vh',
      }}
    >
      <Nav />

      <main className="section-pad">
        <div className="container-tight">
          {/* Page-level glow */}
          <div
            aria-hidden="true"
            className="fixed top-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 100% 0%, rgba(44,116,232,0.05) 0%, transparent 60%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 dot-grid opacity-30 pointer-events-none"
          />

          {/* Card shell */}
          <div className="relative mx-auto" style={{ maxWidth: 660 }}>
            <AnimatePresence mode="wait" custom={direction}>
              {step === 0 && (
                <IntroScreen key="intro" onStart={advance} />
              )}

              {step === 1 && (
                <Step1
                  key="step1"
                  value={answers.primaryConcern}
                  onChange={(v) => setAnswers((a) => ({ ...a, primaryConcern: v, symptoms: [] }))}
                  onNext={advance}
                />
              )}

              {step === 2 && answers.primaryConcern && (
                <Step2
                  key="step2"
                  primaryConcern={answers.primaryConcern}
                  value={answers.symptoms}
                  onChange={(v) => setAnswers((a) => ({ ...a, symptoms: v }))}
                  onNext={advance}
                  onBack={retreat}
                />
              )}

              {step === 3 && (
                <Step3
                  key="step3"
                  value={answers.duration}
                  onChange={(v) => setAnswers((a) => ({ ...a, duration: v }))}
                  onNext={advance}
                  onBack={retreat}
                />
              )}

              {step === 4 && (
                <Step4
                  key="step4"
                  value={answers.bloodWork}
                  onChange={(v) => setAnswers((a) => ({ ...a, bloodWork: v }))}
                  onNext={advance}
                  onBack={retreat}
                />
              )}

              {step === 5 && (
                <ResultScreen
                  key="result"
                  answers={answers}
                  onRetake={reset}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
