'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BG     = '#f9fafb'
const CARD   = '#ffffff'
const BORDER = 'rgba(0,0,0,0.09)'
const BLUE   = 'var(--blue)'
const TEXT   = '#111827'
const DIM    = '#4b5563'
const MUTED  = '#6b7280'

const ease = [0.22, 1, 0.36, 1] as const

// ~Half kept conceptually, all reworded. Not the ADAM questionnaire.
const QUESTIONS = [
  'Are you male?',
  'Has your energy noticeably declined in the past 6–12 months?',
  'Do you experience mood changes such as irritability, low motivation, or mental fog?',
  'Has your sex drive dropped compared to a few years ago?',
  'Have you noticed changes in sexual function or performance?',
  'Do you feel less driven or engaged with life than you used to?',
  'Has your physical performance (strength, recovery, or stamina) declined?',
  'Do you struggle with sleep quality or feel fatigued even after a full night\'s rest?',
  'Has weight become harder to manage despite no major changes to diet or activity?',
  'Do you experience reduced mental sharpness, concentration, or drive at work?',
  'Have you noticed changes in body composition (less muscle, more fat) without obvious cause?',
  'Are you currently prescribed testosterone by a doctor or clinic?',
  'Briefly describe your medical history',
]

const SYMPTOM_LABELS = [
  'Energy decline',
  'Mood & motivation',
  'Reduced sex drive',
  'Sexual function',
  'Loss of drive',
  'Physical performance',
  'Sleep & fatigue',
  'Weight management',
  'Mental sharpness',
  'Body composition',
]

const TOTAL = QUESTIONS.length // 13

// ── Sub-components ──────────────────────────────────────────────────────

function ClinicBadge() {
  return (
    <div className="flex items-center gap-3 mt-5">
      <div className="relative flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold select-none"
          style={{
            background: 'rgba(72,144,247,0.1)',
            border: '1px solid rgba(72,144,247,0.25)',
            color: BLUE,
            letterSpacing: '0.04em',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          AMH
        </div>
        <div
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 flex items-center justify-center"
          style={{ background: '#22c55e', borderColor: BG }}
        />
      </div>
      <div>
        <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: TEXT }}>Apex Medical Team</p>
        <p className="text-xs" style={{ color: DIM }}>Clinical Screening · AHPRA Registered</p>
      </div>
    </div>
  )
}

function ChoiceCard({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full text-left rounded-2xl px-6 py-5 transition-all duration-150"
      style={{
        background: checked ? 'rgba(72,144,247,0.08)' : '#ffffff',
        border: `1.5px solid ${checked ? 'rgba(72,144,247,0.45)' : BORDER}`,
        boxShadow: checked ? '0 0 0 3px rgba(72,144,247,0.08)' : 'none',
      }}
    >
      <div
        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-150"
        style={{
          border: `1.5px solid ${checked ? BLUE : 'rgba(72,144,247,0.25)'}`,
          background: checked ? BLUE : 'transparent',
        }}
      >
        {checked && <div className="w-2 h-2 rounded-full" style={{ background: '#fff' }} />}
      </div>
      <span className="text-base font-medium" style={{ color: TEXT }}>{label}</span>
    </button>
  )
}

function CheckItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs" style={{ color: DIM }}>
      <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
        <circle cx="7" cy="7" r="6.5" fill={`${color}18`} />
        <path d="M4.5 7l2 2 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Shell ───────────────────────────────────────────────────────────────
function Shell({
  progress, showBack, onBack, children,
}: {
  progress: number; showBack: boolean; onBack: () => void; children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Top glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.3), transparent)' }}
      />

      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: 'rgba(72,144,247,0.08)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4890f7, #7bb3ff)' }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4">
        {showBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: DIM, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-4 h-4">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : <div />}

        <div className="flex flex-col items-center leading-none select-none">
          <span
            className="font-black text-sm tracking-[0.2em] uppercase"
            style={{ color: TEXT, fontFamily: '"Space Grotesk", sans-serif' }}
          >
            APEX
          </span>
          <span
            className="text-[9px] tracking-[0.18em] font-semibold uppercase"
            style={{ color: BLUE }}
          >
            Metabolic Health
          </span>
        </div>

        <a
          href="/"
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.12)', color: DIM }}
          aria-label="Close"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(72,144,247,0.12)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(72,144,247,0.06)' }}
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 sm:px-8 pb-16 max-w-xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Sign-up gate overlay ────────────────────────────────────────────────
function SignupGate({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(4,6,13,0.85)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onDismiss}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: '#0c1220', border: '1px solid rgba(72,144,247,0.2)', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease }}
      >
        {/* Top accent */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #4890f7, transparent)' }} />

        <div className="p-7 text-center">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" style={{ color: BLUE }}>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <h3
            className="text-xl font-bold mb-2 leading-tight"
            style={{ color: TEXT, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.02em' }}
          >
            Your results are ready
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: DIM }}>
            Create a free Apex account to view your personalised hormone program and recommended next steps.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-2 mb-7 text-left">
            {[
              'See your symptom breakdown',
              'Get your recommended program',
              'Access your pathology referral',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#4b5563' }}>
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M2 6l3 3 5-5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          <a
            href={`https://app.apexmetabolichealth.com.au/signup?from=hormone-check`}
            className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-semibold mb-3 transition-opacity hover:opacity-90"
            style={{ background: BLUE, color: '#fff', textDecoration: 'none' }}
          >
            Create free account <ArrowIcon />
          </a>
          <a
            href={`https://app.apexmetabolichealth.com.au/login?from=hormone-check`}
            className="flex items-center justify-center w-full rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ border: `1px solid ${BORDER}`, color: DIM, textDecoration: 'none' }}
          >
            Already a patient? Sign in →
          </a>

          <p className="text-[10px] mt-4 leading-relaxed" style={{ color: MUTED }}>
            Free · No payment required · AHPRA-registered doctors
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main component ──────────────────────────────────────────────────────
export default function HormoneIntakeForm() {
  const [step, setStep]                 = useState(0)
  const [answers, setAnswers]           = useState<Record<number, string>>({})
  const [history, setHistory]           = useState('')
  const [showTrtModal, setShowTrtModal] = useState(false)
  const [ineligible, setIneligible]     = useState(false)
  const [showGate, setShowGate]         = useState(true)

  const progress = step >= TOTAL ? 100 : Math.round(((step + 1) / TOTAL) * 100)

  function select(ans: string) {
    setAnswers(prev => ({ ...prev, [step]: ans }))
    if (step === 0 && ans === 'No') { setIneligible(true); return }
    if (step === 11 && ans === 'Yes') { setShowTrtModal(true); return }
    setTimeout(() => setStep(s => s + 1), 140)
  }

  function goBack() {
    if (ineligible) { setIneligible(false); return }
    if (step > 0) setStep(s => s - 1)
    else window.location.href = '/'
  }

  const symptomYesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(i => answers[i] === 'Yes').length

  // ── Ineligible ─────────────────────────────────────────────────────────
  if (ineligible) {
    return (
      <Shell progress={100} showBack onBack={goBack}>
        <div className="text-center pt-12">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" style={{ color: '#fbbf24' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: TEXT, letterSpacing: '-0.02em', fontFamily: '"Space Grotesk", sans-serif' }}
          >
            This program is for male patients
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: DIM }}>
            Our Hormone Optimisation program is currently designed for male patients. We can still support you through our general telehealth or other clinical programs.
          </p>
          <a
            href="/#treatments"
            className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-semibold mb-3 transition-opacity hover:opacity-90"
            style={{ background: BLUE, color: '#fff', textDecoration: 'none' }}
          >
            Explore other programs <ArrowIcon />
          </a>
          <a
            href="https://app.apexmetabolichealth.com.au/assessment"
            className="flex items-center justify-center w-full rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ border: `1px solid ${BORDER}`, color: DIM, textDecoration: 'none' }}
          >
            General health assessment →
          </a>
        </div>
      </Shell>
    )
  }

  // ── Results ─────────────────────────────────────────────────────────────
  if (step >= TOTAL) {
    const isHigh      = symptomYesCount >= 6
    const isMed       = symptomYesCount >= 3
    const scoreColor  = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#22c55e'
    const scoreLabel  = isHigh ? 'High' : isMed ? 'Moderate' : 'Low'
    const scoreDesc   = isHigh
      ? 'Your symptom profile is consistent with clinically significant hormonal decline. Objective blood panel data is the essential next step to confirm and quantify what\'s happening.'
      : isMed
      ? 'Several indicators suggest your hormone levels may not be optimal. A targeted blood panel gives your doctor the data needed to confirm and build a personalised protocol.'
      : 'A small number of symptoms were flagged. A baseline panel is still a worthwhile investment to understand your current hormonal baseline and catch early drift.'

    return (
      <>
        <Shell progress={100} showBack={false} onBack={() => {}}>
          <div className="pt-8 pb-4">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', color: '#16a34a' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} />
                Screening complete
              </span>
            </div>

            <h1
              className="text-3xl font-bold leading-tight mb-1"
              style={{ color: TEXT, letterSpacing: '-0.025em', fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Your hormone profile
            </h1>
            <p className="text-sm mb-6" style={{ color: DIM }}>
              Based on {TOTAL - 3} clinical indicators.
            </p>

            {/* Score card - blurred behind gate */}
            <div
              className="rounded-2xl overflow-hidden mb-6"
              style={{
                border: `1.5px solid ${scoreColor}35`,
                boxShadow: `0 0 0 4px ${scoreColor}08`,
                filter: showGate ? 'blur(3px)' : 'none',
                transition: 'filter 0.4s',
                pointerEvents: showGate ? 'none' : 'auto',
              }}
            >
              {/* Hero image */}
              <div className="relative h-44 overflow-hidden" style={{ background: '#060d1a' }}>
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                  alt="Hormone Optimisation Program"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 35%', opacity: 0.65 }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(6,13,26,0.6) 0%, transparent 40%, rgba(6,13,26,0.85) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span
                    className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                    style={{ background: `${scoreColor}28`, color: scoreColor, border: `1px solid ${scoreColor}45` }}
                  >
                    {scoreLabel} indicator score
                  </span>
                  <h2 className="text-2xl font-bold" style={{ color: '#111827', fontFamily: '"Space Grotesk", sans-serif' }}>
                    Hormone Optimisation
                  </h2>
                </div>
              </div>

              {/* Score details */}
              <div className="p-5" style={{ background: CARD }}>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>Symptom indicators</span>
                    <span className="text-[11px] font-bold" style={{ color: scoreColor }}>{symptomYesCount}/{TOTAL - 3}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(72,144,247,0.08)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((symptomYesCount / 10) * 100)}%`, background: scoreColor }}
                    />
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: DIM }}>{scoreDesc}</p>

                {symptomYesCount > 0 && (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: MUTED }}>
                      Your flagged indicators
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {SYMPTOM_LABELS.filter((_, i) => answers[i + 1] === 'Yes').map(sym => (
                        <CheckItem key={sym} label={sym} color={scoreColor} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTA block - locked behind gate */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{
                background: CARD,
                border: `1.5px solid ${BORDER}`,
                filter: showGate ? 'blur(3px)' : 'none',
                transition: 'filter 0.4s',
                pointerEvents: showGate ? 'none' : 'auto',
              }}
            >
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: MUTED }}>
                Your recommended next step
              </p>
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" style={{ color: BLUE }}>
                    <path d="M8 2a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 14s-1-5 3-5 3 5 3 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: TEXT }}>Pathology comes first</p>
                  <p className="text-sm leading-relaxed" style={{ color: DIM }}>
                    Your doctor needs recent bloodwork to build an evidence-based protocol. We issue a referral, no GP needed.
                  </p>
                </div>
              </div>

              <a
                href="/intake/bloods-hormone"
                className="flex items-center justify-center gap-2 w-full rounded-full py-4 text-sm font-semibold mb-3 transition-opacity hover:opacity-90"
                style={{ background: BLUE, color: '#fff', textDecoration: 'none' }}
              >
                Order hormone blood panel <ArrowIcon />
              </a>
              <a
                href="https://app.apexmetabolichealth.com.au/assessment"
                className="flex items-center justify-center w-full rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${BORDER}`, color: DIM, textDecoration: 'none' }}
              >
                Already have recent bloods? Book directly →
              </a>
            </div>

            <p className="text-[10px] text-center leading-relaxed mb-4" style={{ color: MUTED }}>
              All consultations conducted by AHPRA-registered medical practitioners.<br />
              This screening tool does not constitute medical advice.<br />
              Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
            </p>
          </div>
        </Shell>

        {/* Sign-up gate */}
        <AnimatePresence>
          {showGate && <SignupGate onDismiss={() => setShowGate(false)} />}
        </AnimatePresence>
      </>
    )
  }

  // ── Question screen ─────────────────────────────────────────────────────
  const isTextQ = step === 12

  return (
    <>
      <Shell progress={progress} showBack={step > 0} onBack={goBack}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
          >
            {/* Counter */}
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: BLUE, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '0.14em' }}
            >
              Question {step + 1} of {TOTAL}
            </p>

            {/* Question */}
            <h2
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(22px, 4.5vw, 34px)',
                color: TEXT,
                letterSpacing: '-0.02em',
                fontFamily: '"Space Grotesk", sans-serif',
              }}
            >
              {QUESTIONS[step]}
            </h2>

            <ClinicBadge />

            {/* Answers */}
            <div className="flex flex-col gap-3 mt-8">
              {isTextQ ? (
                <>
                  <textarea
                    value={history}
                    onChange={e => setHistory(e.target.value)}
                    maxLength={500}
                    rows={5}
                    placeholder="E.g. conditions, medications, surgeries, allergies..."
                    className="w-full rounded-2xl px-5 py-4 text-sm resize-none outline-none transition-colors"
                    style={{
                      background: '#ffffff',
                      border: `1.5px solid ${BORDER}`,
                      color: TEXT,
                      fontFamily: 'inherit',
                      lineHeight: 1.6,
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.45)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER }}
                  />
                  <div className="text-right text-xs" style={{ color: MUTED }}>{history.length}/500</div>
                  <button
                    onClick={() => setStep(TOTAL)}
                    className="w-full rounded-full py-4 text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ background: BLUE, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    View my results
                  </button>
                  <button
                    onClick={() => setStep(TOTAL)}
                    className="w-full rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ border: `1px solid ${BORDER}`, color: DIM, background: 'none', cursor: 'pointer' }}
                  >
                    Skip this question
                  </button>
                </>
              ) : (
                ['Yes', 'No'].map(opt => (
                  <ChoiceCard
                    key={opt}
                    label={opt}
                    checked={answers[step] === opt}
                    onClick={() => select(opt)}
                  />
                ))
              )}
            </div>

            {/* Q1 sign-in link */}
            {step === 0 && (
              <p className="text-sm text-center mt-8" style={{ color: MUTED }}>
                Already a patient?{' '}
                <a
                  href="https://app.apexmetabolichealth.com.au/login"
                  style={{ color: BLUE, textDecoration: 'underline', fontWeight: 600 }}
                >
                  Sign in
                </a>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </Shell>

      {/* TRT eligibility modal */}
      <AnimatePresence>
        {showTrtModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(4,6,13,0.75)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setShowTrtModal(false)
                setAnswers(prev => { const n = { ...prev }; delete n[11]; return n })
              }}
            />
            <motion.div
              className="fixed inset-x-4 sm:inset-x-auto z-50"
              style={{ top: '50%', left: '50%', width: '100%', maxWidth: 380, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease }}
            >
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: CARD, border: `1px solid rgba(72,144,247,0.2)` }}
              >
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: `1px solid ${BORDER}` }}
                >
                  <span className="text-sm font-semibold" style={{ color: TEXT }}>Eligibility check</span>
                  <button
                    onClick={() => {
                      setShowTrtModal(false)
                      setAnswers(prev => { const n = { ...prev }; delete n[11]; return n })
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                    style={{ background: 'rgba(72,144,247,0.06)', color: DIM, border: 'none', cursor: 'pointer' }}
                  >
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" style={{ color: '#fbbf24' }}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 leading-tight"
                    style={{ color: TEXT, fontFamily: '"Space Grotesk", sans-serif' }}
                  >
                    You&apos;re currently on testosterone
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: DIM }}>
                    To join the program, our clinical protocol requires a baseline reading taken off medication. Please speak to your current provider about ceasing for 30 days to establish a low baseline.
                  </p>
                </div>

                <div className="flex gap-3 px-5 pb-5">
                  <button
                    onClick={() => {
                      setShowTrtModal(false)
                      setAnswers(prev => { const n = { ...prev }; delete n[11]; return n })
                    }}
                    className="flex-1 rounded-full py-3 text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ border: `1px solid ${BORDER}`, color: DIM, background: 'none', cursor: 'pointer' }}
                  >
                    Go back
                  </button>
                  <button
                    onClick={() => { setShowTrtModal(false); setStep(12) }}
                    className="flex-1 rounded-full py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ background: BLUE, color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Understood, continue
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
