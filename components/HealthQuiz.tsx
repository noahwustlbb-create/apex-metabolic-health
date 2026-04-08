'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { programs, type Program } from '@/lib/programs'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

// ─── Static Data ──────────────────────────────────────────────────────────────

const AGE_INSIGHTS: Record<string, { headline: string; body: string }> = {
  '18-30': {
    headline: 'Why your 20s set the foundation',
    body: 'Early metabolic and hormonal markers peak in your 20s. Building awareness now means catching imbalances before they compound — protecting your energy, mood, and performance for decades ahead.',
  },
  '31-40': {
    headline: 'Why your 30s are the inflection point',
    body: 'Testosterone begins its annual decline around 30. The men who act early in this decade maintain their edge in the gym, at work, and in relationships — far longer than those who wait.',
  },
  '41-50': {
    headline: 'Why your 40s demand attention',
    body: "Hormonal shifts in your 40s are often the root cause of what's dismissed as 'stress' or 'getting older'. Body composition, sleep, cognition, and libido are all directly driven by measurable hormonal markers.",
  },
  '51-60': {
    headline: 'Why your 50s call for a different approach',
    body: 'Standard GP panels rarely test the markers that matter most in your 50s. A targeted hormonal and metabolic assessment at this stage can fundamentally change your health trajectory.',
  },
  '61+': {
    headline: 'Why optimised health at 60+ changes everything',
    body: 'Men who actively manage their hormonal and metabolic health in their 60s maintain significantly better quality of life, cognitive function, and physical capacity than those who accept decline as inevitable.',
  },
}

const PERSONAS = [
  {
    initial: 'M',
    name: 'Michael S.',
    age: '38',
    quote: '"I spent years being told my results were normal. Apex found the issue within the first panel."',
    goals: ['Hormone assessment', 'Body composition', 'Energy optimisation'],
  },
  {
    initial: 'D',
    name: 'Daniel R.',
    age: '44',
    quote: '"I train six days a week and my performance had plateaued. Three months in, I broke through."',
    goals: ['Performance recovery', 'Hormonal optimisation', 'Sleep quality'],
  },
  {
    initial: 'T',
    name: 'Tom W.',
    age: '52',
    quote: '"The standard GP said everything was fine. Apex found three markers that were significantly off."',
    goals: ['Comprehensive panel', 'Metabolic health', 'Long-term protocol'],
  },
]

const TESTIMONIALS = [
  {
    title: 'A process that actually ties it together',
    quote: 'I\'ve done the GP route for years. Apex is different — every question has a clinical reason, and the protocol they built was specific to my markers, not a template.',
    name: 'James M.',
    tag: 'Apex Patient',
  },
  {
    title: 'Real answers, not more "come back in 6 months"',
    quote: 'For the first time I understand what\'s actually driving my fatigue and weight gain. The doctor spent real time on my case.',
    name: 'Chris A.',
    tag: 'Apex Patient',
  },
  {
    title: 'Sceptical of telehealth — not anymore',
    quote: 'I was hesitant about online. Four months in, my energy, training, and sleep have completely transformed.',
    name: 'Marcus T.',
    tag: 'Apex Patient',
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizAnswers {
  goal?: string[]
  age?: string
  duration?: string
  dailyImpact?: string[]   // how concerns affect daily life
  illness?: string
  bloodwork?: string
  doctorPrior?: string     // prior GP/doctor experience
  successGoal?: string     // what success looks like
  conditions?: string[]
  actionTrigger?: string   // what prompted action now
}

type Screen =
  | 'intro'
  | 'goal'
  | 'i_profile'
  | 'age'
  | 'duration'
  | 'symptoms'
  | 'i_insight'
  | 'illness'
  | 'disqualified'
  | 'bloodwork'
  | 'i_eligible'
  | 'energy'
  | 'exercise'
  | 'conditions'
  | 'family_history'
  | 'i_calculating'
  | 'result_summary'
  | 'capture'
  | 'submitted'

// Main linear flow — disqualified branches off
const MAIN_FLOW: Screen[] = [
  'intro', 'goal', 'i_profile', 'age', 'duration', 'symptoms',
  'i_insight', 'illness', 'bloodwork', 'i_eligible',
  'energy', 'exercise', 'conditions', 'family_history',
  'i_calculating', 'result_summary', 'capture', 'submitted',
]

// ─── Recommendation Engine ────────────────────────────────────────────────────

function getRecommendedPrograms(answers: QuizAnswers): Program[] {
  const goals = answers.goal ?? []
  const impact = answers.dailyImpact ?? []
  const successGoal = answers.successGoal ?? ''
  const conditions = answers.conditions ?? []

  const activePrograms = programs.filter((p) => p.status === 'active')
  const scores: Record<string, number> = {}
  for (const p of activePrograms) scores[p.slug] = 0

  // Goal selections — strongest signal (3 pts)
  if (goals.includes('hormone') || goals.includes('general')) scores['hormone-optimisation'] += 3
  if (goals.includes('performance')) { scores['hormone-performance'] += 3; scores['performance-plus'] += 2 }
  if (goals.includes('metabolic')) scores['metabolic-weight-loss'] += 3
  if (goals.includes('hair')) scores['hair-restoration'] += 3
  if (goals.includes('skin')) scores['skin-regeneration'] += 3
  if (goals.includes('injury')) scores['injury-repair'] += 3

  // Daily impact signals (2 pts)
  if (impact.includes('focus') || impact.includes('mood') || impact.includes('intimacy') || impact.includes('sleep')) {
    scores['hormone-optimisation'] += 2
  }
  if (impact.includes('training')) { scores['hormone-performance'] += 2; scores['performance-plus'] += 1 }
  if (impact.includes('weight')) scores['metabolic-weight-loss'] += 2

  // Success goal (2 pts)
  if (successGoal === 'hormone') scores['hormone-optimisation'] += 2
  if (successGoal === 'performance') { scores['hormone-performance'] += 2; scores['performance-plus'] += 1 }
  if (successGoal === 'metabolic') scores['metabolic-weight-loss'] += 2

  // Conditions (1 pt)
  if (conditions.includes('hairloss')) scores['hair-restoration'] += 1

  // When both hormone + performance are strong, upgrade to Performance+ flagship
  if (scores['hormone-optimisation'] >= 3 && scores['hormone-performance'] >= 3) {
    scores['performance-plus'] += Math.min(scores['hormone-optimisation'], scores['hormone-performance'])
    // Demote the two sub-programs so Performance+ ranks first
    scores['hormone-optimisation'] = Math.max(0, scores['hormone-optimisation'] - 2)
    scores['hormone-performance'] = Math.max(0, scores['hormone-performance'] - 2)
  }

  const ranked = activePrograms
    .filter((p) => scores[p.slug] > 0)
    .sort((a, b) => scores[b.slug] - scores[a.slug])

  if (ranked.length === 0) {
    return [activePrograms.find((p) => p.slug === 'hormone-optimisation')!]
  }

  return ranked.slice(0, 3)
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 28 : -28 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -28 : 28 }),
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HealthQuiz() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [direction, setDirection] = useState<1 | -1>(1)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [capture, setCapture] = useState({ firstName: '', email: '', phone: '' })

  const progress = (() => {
    const idx = MAIN_FLOW.indexOf(screen)
    if (idx <= 0) return 0
    return Math.round((idx / (MAIN_FLOW.length - 2)) * 100)
  })()

  const goTo = useCallback((next: Screen, dir: 1 | -1 = 1) => {
    setDirection(dir)
    setScreen(next)
  }, [])

  const goNext = useCallback(() => {
    const idx = MAIN_FLOW.indexOf(screen)
    if (idx === -1) return
    if (screen === 'illness' && answers.illness === 'yes') {
      goTo('disqualified')
      return
    }
    goTo(MAIN_FLOW[idx + 1])
  }, [screen, answers.illness, goTo])

  const goBack = useCallback(() => {
    const idx = MAIN_FLOW.indexOf(screen)
    if (idx <= 1) return
    goTo(MAIN_FLOW[idx - 1], -1)
  }, [screen, goTo])

  // Auto-advance the calculating screen after 2.5s
  useEffect(() => {
    if (screen !== 'i_calculating') return
    const t = setTimeout(() => goNext(), 2500)
    return () => clearTimeout(t)
  }, [screen, goNext])

  const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const toggleMulti = (key: keyof QuizAnswers, value: string) => {
    setAnswers(prev => {
      const current = (prev[key] as string[]) ?? []
      if (current.includes(value)) return { ...prev, [key]: current.filter(v => v !== value) }
      return { ...prev, [key]: [...current, value] }
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const recs = getRecommendedPrograms(answers)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Quiz Lead — ${recs.map((p) => p.name).join(', ')}`,
          from_name: capture.firstName || 'Quiz Lead',
          name: capture.firstName,
          email: capture.email,
          phone: capture.phone,
          recommended_programs: recs.map((p) => p.slug).join(', '),
          goal: answers.goal?.join(', '),
          age: answers.age,
          duration: answers.duration,
          daily_impact: answers.dailyImpact?.join(', '),
          bloodwork: answers.bloodwork,
          doctor_prior: answers.doctorPrior,
          success_goal: answers.successGoal,
          conditions: answers.conditions?.join(', '),
          action_trigger: answers.actionTrigger,
        }),
      })
    } catch { /* silent */ }
    setIsSubmitting(false)
    goTo('submitted')
  }

  const recs = getRecommendedPrograms(answers)
  const ageInsight = AGE_INSIGHTS[answers.age ?? '31-40'] ?? AGE_INSIGHTS['31-40']

  const showBackButton = MAIN_FLOW.indexOf(screen) > 1

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Dot grid background */}
      <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="fixed top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,194,184,0.06) 0%, transparent 60%)' }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-base font-bold tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
            APEX
          </span>
          <span className="text-xs tracking-[0.18em] uppercase font-medium" style={{ color: 'var(--teal)' }}>
            Metabolic Health
          </span>
        </Link>
        {screen !== 'intro' && screen !== 'submitted' && screen !== 'disqualified' && (
          <div
            className="px-4 py-1.5 rounded-full text-sm font-semibold tabular-nums"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          >
            {progress}%
          </div>
        )}
      </header>

      {/* Progress bar */}
      {screen !== 'intro' && screen !== 'submitted' && screen !== 'disqualified' && (
        <div className="relative z-10 h-0.5 w-full" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--teal)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-[520px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* ─── INTRO ─────────────────────────────────────────────── */}
              {screen === 'intro' && (
                <div className="text-center">
                  <p className="label mb-5">APEX METABOLIC HEALTH</p>
                  <h1
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Australia&apos;s leading men&apos;s hormonal health clinic
                  </h1>
                  <p className="text-base leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Find out if you&apos;re eligible and which program fits your goals. Takes 2 minutes.
                  </p>
                  <button onClick={() => goTo('goal')} className="btn-teal w-full max-w-xs mx-auto flex">
                    Start Assessment
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    ★★★★★ &nbsp;Doctor-led · AHPRA-registered · 100% online
                  </p>
                </div>
              )}

              {/* ─── Q: GOAL ───────────────────────────────────────────── */}
              {screen === 'goal' && (
                <QuestionScreen
                  question="What brought you here today?"
                  subtext="Your answers help us tailor the questions we ask and create a program that fits your individual needs."
                  fact="Most men come to Apex experiencing 3 or more of these concerns simultaneously — they're often interconnected."
                  multiSelect
                  options={[
                    { label: 'Hormones, energy & mental clarity', value: 'hormone' },
                    { label: 'Weight loss & metabolism', value: 'metabolic' },
                    { label: 'Performance & recovery', value: 'performance' },
                    { label: 'Hair restoration', value: 'hair' },
                    { label: 'Skin regeneration', value: 'skin' },
                    { label: 'Injury repair & recovery', value: 'injury' },
                    { label: 'Full health checkup', value: 'general' },
                    { label: "I'm not sure yet", value: 'discovery' },
                  ]}
                  selected={answers.goal ?? []}
                  onToggle={(v) => toggleMulti('goal', v)}
                  onContinue={goNext}
                  canContinue={(answers.goal?.length ?? 0) > 0}
                />
              )}

              {/* ─── INTERSTITIAL: PROFILE ─────────────────────────────── */}
              {screen === 'i_profile' && (
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Clinical programs for your unique goals
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Every Apex protocol is designed by AHPRA-registered doctors and tailored to your individual health markers — not a one-size-fits-all plan.
                  </p>
                  <PersonaCarousel personas={PERSONAS} />
                  <NavButtons onBack={goBack} onContinue={goNext} />
                </div>
              )}

              {/* ─── Q: AGE ────────────────────────────────────────────── */}
              {screen === 'age' && (
                <QuestionScreen
                  question="How old are you?"
                  subtext="Age influences hormonal and metabolic shifts and when conditions may emerge, helping guide your clinical priorities."
                  fact="Testosterone declines approximately 1% per year after 30 — affecting energy, mood, body composition, and recovery."
                  options={[
                    { label: '18–30', value: '18-30' },
                    { label: '31–40', value: '31-40' },
                    { label: '41–50', value: '41-50' },
                    { label: '51–60', value: '51-60' },
                    { label: '61+', value: '61+' },
                  ]}
                  grid
                  selected={answers.age ? [answers.age] : []}
                  onToggle={(v) => { setAnswer('age', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.age}
                  onBack={goBack}
                />
              )}

              {/* ─── Q: DURATION ───────────────────────────────────────── */}
              {screen === 'duration' && (
                <QuestionScreen
                  question="How long have you been experiencing these concerns?"
                  subtext=""
                  options={[
                    { label: 'Less than 3 months', value: 'under3' },
                    { label: '3–6 months', value: '3-6' },
                    { label: '6–12 months', value: '6-12' },
                    { label: 'More than a year', value: 'over1y' },
                    { label: 'This has always been my baseline', value: 'always' },
                  ]}
                  selected={answers.duration ? [answers.duration] : []}
                  onToggle={(v) => { setAnswer('duration', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.duration}
                  onBack={goBack}
                />
              )}

              {/* ─── Q: DAILY IMPACT ───────────────────────────────────── */}
              {screen === 'symptoms' && (
                <QuestionScreen
                  question="Where are you feeling the impact most?"
                  subtext="Select everything that applies — this helps us understand which areas matter most to you."
                  fact="Most men don't realise their concerns in the gym, at work, and at home often share the same root cause."
                  multiSelect
                  options={[
                    { label: 'Work performance or mental focus', value: 'focus' },
                    { label: 'Physical training or sport', value: 'training' },
                    { label: 'Relationships or intimacy', value: 'intimacy' },
                    { label: 'Mood, motivation, or confidence', value: 'mood' },
                    { label: 'Body composition or weight', value: 'weight' },
                    { label: 'Sleep and daily energy levels', value: 'sleep' },
                    { label: 'Overall sense of wellbeing', value: 'wellbeing' },
                  ]}
                  selected={answers.dailyImpact ?? []}
                  onToggle={(v) => toggleMulti('dailyImpact', v)}
                  onContinue={goNext}
                  canContinue={(answers.dailyImpact?.length ?? 0) > 0}
                  onBack={goBack}
                />
              )}

              {/* ─── INTERSTITIAL: AGE INSIGHT ─────────────────────────── */}
              {screen === 'i_insight' && (
                <div>
                  <div
                    className="rounded-sm overflow-hidden mb-6"
                    style={{ border: '1px solid rgba(0,194,184,0.25)', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="p-7 md:p-8">
                      <p className="label mb-3">CLINICAL INSIGHT</p>
                      <h2
                        className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                      >
                        {ageInsight.headline}
                      </h2>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {ageInsight.body}
                      </p>
                    </div>
                    <div
                      className="px-7 md:px-8 py-4"
                      style={{ backgroundColor: 'rgba(0,194,184,0.05)', borderTop: '1px solid rgba(0,194,184,0.15)' }}
                    >
                      <p className="text-xs font-medium" style={{ color: 'var(--teal)' }}>
                        Apex doctors specialise in the hormonal patterns specific to your life stage.
                      </p>
                    </div>
                  </div>
                  <NavButtons onBack={goBack} onContinue={goNext} />
                </div>
              )}

              {/* ─── Q: ILLNESS GATE ───────────────────────────────────── */}
              {screen === 'illness' && (
                <QuestionScreen
                  question="Are you currently undergoing treatment for any serious illness?"
                  subtext="This includes anything requiring specialist care, such as cancer, heart disease, advanced organ conditions, or major neurological concerns."
                  fact="Some health situations require more specialised, in-person care. This helps ensure you receive the safest and most appropriate support."
                  options={[
                    { label: 'Yes, I am currently undergoing treatment', value: 'yes' },
                    { label: 'No, I am not currently undergoing treatment', value: 'no' },
                  ]}
                  selected={answers.illness ? [answers.illness] : []}
                  onToggle={(v) => {
                    setAnswer('illness', v)
                    setTimeout(() => {
                      if (v === 'yes') goTo('disqualified')
                      else goNext()
                    }, 260)
                  }}
                  onContinue={goNext}
                  canContinue={!!answers.illness}
                  onBack={goBack}
                />
              )}

              {/* ─── DISQUALIFIED ──────────────────────────────────────── */}
              {screen === 'disqualified' && <DisqualifiedScreen />}

              {/* ─── Q: BLOOD WORK ─────────────────────────────────────── */}
              {screen === 'bloodwork' && (
                <QuestionScreen
                  question="Have you had blood work done in the last 3 months?"
                  subtext=""
                  fact="Standard GP panels often miss the hormonal and metabolic markers that matter most to men's health. Our comprehensive panels go further."
                  options={[
                    { label: "Yes — and everything came back 'normal'", value: 'normal' },
                    { label: 'Yes — some markers were flagged', value: 'flagged' },
                    { label: "No — I haven't had it done recently", value: 'no' },
                    { label: "I'm not sure what I need", value: 'unsure' },
                  ]}
                  selected={answers.bloodwork ? [answers.bloodwork] : []}
                  onToggle={(v) => { setAnswer('bloodwork', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.bloodwork}
                  onBack={goBack}
                />
              )}

              {/* ─── INTERSTITIAL: ELIGIBLE ────────────────────────────── */}
              {screen === 'i_eligible' && (
                <div>
                  <p className="label mb-3">ELIGIBILITY CONFIRMED</p>
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Good news. You&apos;re eligible.
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    See how Apex has helped men like you get real answers and take back control of their health.
                  </p>
                  <TestimonialCarousel
                    testimonials={TESTIMONIALS}
                    idx={testimonialIdx}
                    onNext={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                  />
                  <NavButtons onBack={goBack} onContinue={goNext} />
                </div>
              )}

              {/* ─── Q: PRIOR DOCTOR EXPERIENCE ────────────────────────── */}
              {screen === 'energy' && (
                <QuestionScreen
                  question="Have you spoken to a doctor about these concerns before?"
                  subtext=""
                  fact="Men are often told their results are 'normal' when the real issue is that the wrong markers are being tested."
                  options={[
                    { label: "Yes — told everything was normal", value: 'normal' },
                    { label: "Yes — something was flagged but I didn't get clear answers", value: 'flagged' },
                    { label: "No — this is my first step", value: 'first' },
                    { label: "I've tried but struggled to get the right referral", value: 'blocked' },
                  ]}
                  selected={answers.doctorPrior ? [answers.doctorPrior] : []}
                  onToggle={(v) => { setAnswer('doctorPrior', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.doctorPrior}
                  onBack={goBack}
                />
              )}

              {/* ─── Q: SUCCESS GOAL ───────────────────────────────────── */}
              {screen === 'exercise' && (
                <QuestionScreen
                  question="What would getting this right look like for you?"
                  subtext=""
                  options={[
                    { label: 'Feeling like myself again — energy, drive, clarity', value: 'hormone' },
                    { label: 'Better performance in training and faster recovery', value: 'performance' },
                    { label: 'Losing weight and keeping it off for good', value: 'metabolic' },
                    { label: 'Stronger relationships and confidence', value: 'hormone' },
                    { label: 'Long-term health protection and peace of mind', value: 'general' },
                  ]}
                  selected={answers.successGoal ? [answers.successGoal] : []}
                  onToggle={(v) => { setAnswer('successGoal', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.successGoal}
                  onBack={goBack}
                />
              )}

              {/* ─── Q: CONDITIONS ─────────────────────────────────────── */}
              {screen === 'conditions' && (
                <QuestionScreen
                  question="Do any of these apply to you?"
                  subtext="Select all that are relevant — your doctor will review these in full clinical context."
                  fact="These conditions are often interconnected with hormonal and metabolic health. Understanding them helps your doctor build the right protocol."
                  multiSelect
                  options={[
                    { label: 'High blood pressure', value: 'hbp' },
                    { label: 'High cholesterol', value: 'cholesterol' },
                    { label: 'Diabetes', value: 'diabetes' },
                    { label: 'Heart condition', value: 'heart' },
                    { label: 'Anxiety or depression', value: 'mentalhealth' },
                    { label: 'Hair loss', value: 'hairloss' },
                    { label: 'None of the above', value: 'none' },
                  ]}
                  selected={answers.conditions ?? []}
                  onToggle={(v) => {
                    if (v === 'none') {
                      setAnswer('conditions', ['none'])
                    } else {
                      setAnswers(prev => {
                        const current = (prev.conditions ?? []).filter(x => x !== 'none')
                        if (current.includes(v)) return { ...prev, conditions: current.filter(x => x !== v) }
                        return { ...prev, conditions: [...current, v] }
                      })
                    }
                  }}
                  onContinue={goNext}
                  canContinue={(answers.conditions?.length ?? 0) > 0}
                  onBack={goBack}
                />
              )}

              {/* ─── Q: ACTION TRIGGER ────────────────────────────────── */}
              {screen === 'family_history' && (
                <QuestionScreen
                  question="What's prompted you to take action now?"
                  subtext=""
                  options={[
                    { label: "Things have gotten worse and I can't ignore it", value: 'worse' },
                    { label: "I've been putting this off for too long", value: 'delayed' },
                    { label: 'I want to be proactive before it gets worse', value: 'proactive' },
                    { label: 'A health scare made me take it seriously', value: 'scare' },
                    { label: 'Someone close to me encouraged me to act', value: 'encouraged' },
                  ]}
                  selected={answers.actionTrigger ? [answers.actionTrigger] : []}
                  onToggle={(v) => { setAnswer('actionTrigger', v); setTimeout(goNext, 260) }}
                  onContinue={goNext}
                  canContinue={!!answers.actionTrigger}
                  onBack={goBack}
                />
              )}

              {/* ─── INTERSTITIAL: CALCULATING ─────────────────────────── */}
              {screen === 'i_calculating' && (
                <div className="text-center py-8">
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Building your clinical profile
                  </h2>
                  <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                    With your Apex membership you get ongoing access to your personalised protocol — your clinical history, test results, and evolving health plan in one place.
                  </p>
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="var(--teal)" strokeWidth="1.5" aria-hidden="true">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>Analysing your responses…</p>
                  <div className="flex flex-col gap-3 text-left max-w-xs mx-auto">
                    {[
                      'Doctor-curated program matched to your goals',
                      'Clinical risk areas identified from your answers',
                      'Recommended pathology and next steps',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
                          <path d="M3 8l3 3 7-7" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── RESULT SUMMARY ────────────────────────────────────────── */}
              {screen === 'result_summary' && (
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--teal)' }}>Your personalised plan</p>
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    {recs.length === 1 ? 'Your recommended program' : `Your top ${recs.length} recommended programs`}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Based on what you&apos;ve shared, we&apos;ve matched you to the programs most likely to address your concerns. Your doctor will review and finalise your protocol.
                  </p>

                  {/* Numbered program cards */}
                  <div className="flex flex-col gap-3 mb-6">
                    {recs.map((program, i) => (
                      <div
                        key={program.slug}
                        className="rounded-sm p-5 flex items-start gap-4"
                        style={{
                          backgroundColor: i === 0 ? 'rgba(0,194,184,0.07)' : 'var(--surface)',
                          border: i === 0 ? '1px solid rgba(0,194,184,0.3)' : '1px solid var(--border)',
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-sm flex-shrink-0 flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: i === 0 ? 'var(--teal)' : 'var(--elevated)',
                            color: i === 0 ? '#070a0d' : 'var(--text-muted)',
                          }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{program.name}</p>
                            {program.badge && (
                              <span
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm"
                                style={{ backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
                              >
                                {program.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{program.tagline}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <NavButtons onBack={goBack} onContinue={goNext} />
                </div>
              )}

              {/* ─── CAPTURE ───────────────────────────────────────────── */}
              {screen === 'capture' && (
                <div>
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    <span
                      className="px-4 py-1.5 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    >
                      Unlock your plan
                    </span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-center"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Where should we send your personalised clinical protocol?
                  </h2>

                  <div className="flex flex-col gap-4 mb-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        E-mail address
                      </label>
                      <input
                        type="email"
                        value={capture.email}
                        onChange={(e) => setCapture(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-sm text-sm"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                    {/* First name */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        First name
                      </label>
                      <input
                        type="text"
                        value={capture.firstName}
                        onChange={(e) => setCapture(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Your first name"
                        className="w-full px-4 py-3 rounded-sm text-sm"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                    {/* Phone with +61 prefix */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        Phone number
                      </label>
                      <div className="flex gap-2">
                        <div
                          className="flex items-center gap-1.5 px-3 rounded-sm flex-shrink-0 text-sm font-medium"
                          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                        >
                          🇦🇺 +61
                        </div>
                        <input
                          type="tel"
                          value={capture.phone}
                          onChange={(e) => setCapture(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="4XX XXX XXX"
                          className="flex-1 px-4 py-3 rounded-sm text-sm"
                          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                    We&apos;ll send your plan to this email and may follow up with relevant health content. See our{' '}
                    <Link href="/privacy" className="underline" style={{ color: 'var(--text-muted)' }}>privacy policy</Link>{' '}
                    for more details.
                  </p>

                  <p className="text-sm text-center mb-5" style={{ color: 'var(--text-secondary)' }}>
                    Questions?{' '}
                    <Link href="/intake/discovery" className="underline" style={{ color: 'var(--text-primary)' }}>
                      Book a free discovery call
                    </Link>
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={goBack}
                      className="px-6 py-3.5 rounded-sm text-sm font-semibold flex-shrink-0"
                      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!capture.firstName || !capture.email || isSubmitting}
                      className="flex-1 btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting…' : 'Continue'}
                    </button>
                  </div>
                </div>
              )}

              {/* ─── SUBMITTED ─────────────────────────────────────────── */}
              {screen === 'submitted' && (
                <div>
                  {/* Hero heading */}
                  <h1
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    {capture.firstName ? `${capture.firstName}'s` : 'Your'} personalised clinical protocol
                  </h1>

                  {/* Program tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {recs.map((program, i) => (
                      <span
                        key={program.slug}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={
                          i === 0
                            ? { backgroundColor: 'rgba(0,194,184,0.1)', border: '1px solid rgba(0,194,184,0.3)', color: 'var(--teal)' }
                            : { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }
                        }
                      >
                        {program.name}
                      </span>
                    ))}
                  </div>

                  {/* Step 1 */}
                  <div
                    className="rounded-sm overflow-hidden mb-4"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-sm"
                        style={{ backgroundColor: 'var(--elevated)', color: 'var(--text-secondary)' }}
                      >
                        STEP 1
                      </span>
                    </div>
                    <div className="p-5">
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                      >
                        Complete your clinical intake
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Your intake form gives your doctor everything they need to review your case before your consultation.
                      </p>
                      <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
                        {[
                          { icon: '📋', label: 'Health history & current concerns', desc: 'Symptoms, medications, lifestyle, and goals' },
                          { icon: '🩸', label: 'Pathology referral issued', desc: 'Your doctor will arrange your blood panel' },
                          { icon: '🩺', label: 'Telehealth consultation booked', desc: 'Review results and finalise your protocol with your doctor' },
                        ].map((item) => (
                          <div key={item.label} className="py-3.5 flex items-start gap-3">
                            <span className="text-base flex-shrink-0">{item.icon}</span>
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 2 — recommended programs */}
                  <div
                    className="rounded-sm overflow-hidden mb-6"
                    style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                  >
                    <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-sm"
                        style={{ backgroundColor: 'var(--elevated)', color: 'var(--text-secondary)' }}
                      >
                        STEP 2
                      </span>
                    </div>
                    <div className="p-5">
                      <h3
                        className="text-base font-bold mb-1 leading-snug"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                      >
                        Your matched {recs.length === 1 ? 'program' : 'programs'}
                      </h3>
                      <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Your doctor will review these recommendations and finalise your protocol during your consultation.
                      </p>
                      <div className="flex flex-col gap-3">
                        {recs.map((program, i) => (
                          <div
                            key={program.slug}
                            className="flex items-start gap-3 p-3.5 rounded-sm"
                            style={{
                              backgroundColor: i === 0 ? 'rgba(0,194,184,0.05)' : 'var(--elevated)',
                              border: i === 0 ? '1px solid rgba(0,194,184,0.2)' : '1px solid var(--border)',
                            }}
                          >
                            <div
                              className="w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                              style={{
                                backgroundColor: i === 0 ? 'var(--teal)' : 'var(--surface)',
                                color: i === 0 ? '#070a0d' : 'var(--text-muted)',
                              }}
                            >
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{program.name}</p>
                              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{program.tagline}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 mb-5">
                    <Link href={recs[0].ctaHref} className="btn-teal w-full justify-center">
                      {recs[0].ctaLabel} — {recs[0].name}
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <Link href="/intake/discovery" className="btn-ghost w-full justify-center">
                      Prefer to chat first? Book a free discovery call
                    </Link>
                  </div>

                  {/* Trust note */}
                  <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                    All consultations conducted by <strong style={{ color: 'var(--text-secondary)' }}>AHPRA-registered medical practitioners</strong>. No lock-in. No hidden fees.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center px-6 py-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice.
          Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
        </p>
      </footer>
    </div>
  )
}

// ─── Shared Sub-components ────────────────────────────────────────────────────

interface QuestionScreenProps {
  question: string
  subtext?: string
  fact?: string
  options: { label: string; value: string }[]
  multiSelect?: boolean
  grid?: boolean
  selected: string[]
  onToggle: (value: string) => void
  onContinue: () => void
  canContinue: boolean
  onBack?: () => void
}

function QuestionScreen({
  question, subtext, fact, options, multiSelect, grid, selected, onToggle, onContinue, canContinue, onBack,
}: QuestionScreenProps) {
  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
      >
        {question}
      </h2>
      {subtext && (
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {subtext}
        </p>
      )}

      <div className={`mb-5 ${grid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}`}>
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className="text-left px-5 py-4 rounded-sm transition-all duration-200 flex items-center gap-3"
              style={{
                background: isSelected ? 'rgba(0,194,184,0.06)' : 'var(--surface)',
                border: `1px solid ${isSelected ? 'var(--teal)' : 'var(--border)'}`,
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-150"
                style={{
                  border: `1.5px solid ${isSelected ? 'var(--teal)' : 'var(--text-muted)'}`,
                  backgroundColor: isSelected ? 'var(--teal)' : 'transparent',
                }}
              >
                {isSelected && (
                  <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2">
                    <path d="M1 4l3 3 5-6" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm leading-snug">{opt.label}</span>
            </button>
          )
        })}
      </div>

      {fact && <FactBox text={fact} />}

      {multiSelect && (
        <div className="flex gap-3 mt-5">
          {onBack && (
            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-sm text-sm font-semibold flex-shrink-0"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            >
              Back
            </button>
          )}
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="flex-1 btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* Single-select: show back only (no continue — auto-advances) */}
      {!multiSelect && onBack && (
        <button
          onClick={onBack}
          className="mt-4 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back
        </button>
      )}
    </div>
  )
}

function FactBox({ text }: { text: string }) {
  return (
    <div
      className="rounded-sm p-4 flex gap-3"
      style={{ backgroundColor: 'rgba(0,194,184,0.04)', border: '1px solid rgba(0,194,184,0.15)' }}
    >
      <div
        className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0,194,184,0.18)' }}
      >
        <span style={{ color: 'var(--teal)', fontSize: 10, fontWeight: 700, lineHeight: 1 }}>i</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{text}</p>
    </div>
  )
}

function NavButtons({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onBack}
        className="px-6 py-3.5 rounded-sm text-sm font-semibold flex-shrink-0"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      >
        Back
      </button>
      <button onClick={onContinue} className="flex-1 btn-teal">
        Continue
      </button>
    </div>
  )
}

function PersonaCarousel({ personas }: {
  personas: { initial: string; name: string; age: string; quote: string; goals: string[] }[]
}) {
  const [idx, setIdx] = useState(0)
  const card = personas[idx]
  return (
    <div className="mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="apex-card p-6 mb-3"
          style={{ border: '1px solid rgba(0,194,184,0.2)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: 'rgba(0,194,184,0.12)', color: 'var(--teal)' }}
            >
              {card.initial}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{card.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Age {card.age} · Apex Patient</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed italic mb-4" style={{ color: 'var(--text-secondary)' }}>{card.quote}</p>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Plan & goals</p>
          <div className="flex flex-col gap-1.5">
            {card.goals.map((g, i) => (
              <div key={g} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: 'var(--teal)', color: '#070a0d' }}
                >
                  {i + 1}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{g}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2">
        {personas.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Persona ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{ width: i === idx ? 24 : 8, backgroundColor: i === idx ? 'var(--teal)' : 'var(--border)' }}
          />
        ))}
      </div>
    </div>
  )
}

function TestimonialCarousel({ testimonials, idx, onNext }: {
  testimonials: { title: string; quote: string; name: string; tag: string }[]
  idx: number
  onNext: () => void
}) {
  return (
    <div className="mb-6">
      <div className="apex-card p-6 mb-3" style={{ border: '1px solid rgba(0,194,184,0.2)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {testimonials[idx].title}
            </p>
            <p className="text-sm leading-relaxed italic mb-4" style={{ color: 'var(--text-secondary)' }}>
              &ldquo;{testimonials[idx].quote}&rdquo;
            </p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonials[idx].name}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonials[idx].tag}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={onNext}
            aria-label={`Testimonial ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{ width: i === idx ? 24 : 8, backgroundColor: i === idx ? 'var(--teal)' : 'var(--border)' }}
          />
        ))}
      </div>
    </div>
  )
}

function DisqualifiedScreen() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Quiz — Lead Ineligible (Active Treatment)',
          email,
          message: 'User indicated they are currently undergoing treatment for a serious illness. Follow up when ready.',
        }),
      })
    } catch { /* silent */ }
    setSubmitted(true)
  }

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
      >
        Unfortunately, we can&apos;t support you during active treatment.
      </h2>
      <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
        Your health and safety come first.
      </p>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
        Our programs aren&apos;t appropriate for individuals currently undergoing active treatment for serious illness. We&apos;d love to support you once treatment is complete. Leave your details and we&apos;ll be in touch when the time is right.
      </p>
      {!submitted ? (
        <>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-sm mb-4 text-sm"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <button
            onClick={handleSubmit}
            disabled={!email}
            className="btn-teal w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Stay in touch
          </button>
        </>
      ) : (
        <div
          className="rounded-sm p-4 text-center"
          style={{ backgroundColor: 'rgba(0,194,184,0.05)', border: '1px solid rgba(0,194,184,0.2)' }}
        >
          <p className="text-sm" style={{ color: 'var(--teal)' }}>
            We&apos;ll be in touch. Wishing you a smooth recovery.
          </p>
        </div>
      )}
    </div>
  )
}
