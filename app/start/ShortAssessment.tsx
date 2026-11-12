'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useAudience } from '@/components/audience/Audience'
import { captureLead } from '@/lib/captureLead'
import { track } from '@/lib/analytics'
import { PORTAL_SIGNUP } from '@/lib/portal'
import { phasesFor, stepNumber, startTotal, type StartPhase } from '@/lib/startFunnel'
import {
  AGE_BANDS, GOALS, PROGRAMS, evaluateQuiz, portalPrograms, safetyFor, symptomQuestion, symptomsFor, whyLine,
  type AgeBand, type Goal, type ProgramId, type QuizResult, type Sex,
} from '@/lib/quiz-logic'

/**
 * The health quiz (/start/quiz), rebuilt from the program guide (Noah, 12 Nov
 * 2026). Questions and the answer-to-program mapping live in lib/quiz-logic.ts;
 * the screen order in lib/startFunnel.ts; the look in styles/quiz.css (the same
 * system as /signup). Nothing here diagnoses, promises or prices anything.
 */

const ease = [0.22, 1, 0.36, 1] as const
type Phase = StartPhase | 'result'

const SOURCE_OPTIONS = [
  { id: 'google', label: 'Google search' },
  { id: 'instagram', label: 'Instagram or Facebook' },
  { id: 'tiktok', label: 'TikTok or YouTube' },
  { id: 'friend', label: 'A friend or family member' },
  { id: 'doctor', label: 'A doctor, pharmacist or trainer' },
  { id: 'other', label: 'Somewhere else' },
]

const Tick = () => (
  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3L9.5 3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

// ── Pieces ─────────────────────────────────────────────────────────────────────
function Option({ n, label, sub, on, onClick, role = 'button' }: { n: number; label: string; sub?: string; on: boolean; onClick: () => void; role?: 'button' | 'checkbox' }) {
  const pressed = role === 'checkbox' ? { role: 'checkbox' as const, 'aria-checked': on } : { 'aria-pressed': on }
  return (
    <button type="button" className="qz-opt" onClick={onClick} {...pressed}>
      <span className="qz-opt-n" aria-hidden="true">{String(n).padStart(2, '0')}</span>
      <span className="qz-opt-t"><strong>{label}</strong>{sub && <span>{sub}</span>}</span>
      <span className="qz-opt-box" aria-hidden="true"><Tick /></span>
    </button>
  )
}

function Heading({ step, total, title, lead }: { step: number; total: number; title: string; lead?: string }) {
  return (
    <>
      <p className="al-k qz-k">{`// Step ${step} of ${total}`}</p>
      <h1 className="qz-h1">{title}</h1>
      {lead && <p className="qz-lead">{lead}</p>}
    </>
  )
}

function Progress({ step, total, canBack, onBack }: { step: number; total: number; canBack: boolean; onBack: () => void }) {
  return (
    <div className="qz-prog">
      <button type="button" className="qz-back" onClick={onBack} disabled={!canBack} aria-label="Back">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="qz-bar" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step} aria-label={`Step ${step} of ${total}`}>
        <span style={{ width: `${Math.round((step / total) * 100)}%` }} />
      </div>
      <span className="qz-count" aria-hidden="true">{String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  )
}

function EmailStep({ step, total, program, onSaved, onSkip }: { step: number; total: number; program: string; onSaved: () => void; onSkip: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const clean = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) { setErr('Please enter a valid email address.'); return }
    setErr(''); setBusy(true)
    // Admin email + HighLevel, PostHog 'lead_captured' (lib/captureLead.ts).
    // Identity and the program only, never the answers.
    try { await captureLead({ name: name.trim(), email: clean, source: 'assessment', program }) } catch { /* never block the visitor */ }
    setBusy(false)
    onSaved()
  }
  return (
    <form onSubmit={submit} noValidate>
      <Heading step={step} total={total} title="Where should we send your result?" lead="We save your progress so you can pick up where you left off. Your answers stay with your care team, and you can skip this." />
      <div className="qz-fields">
        <label className="qz-field">
          <span>First name <em>(optional)</em></span>
          <input value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" className="qz-input" />
        </label>
        <label className="qz-field">
          <span>Email</span>
          <input type="email" inputMode="email" autoComplete="email" required value={email} onChange={e => { setEmail(e.target.value); if (err) setErr('') }} aria-invalid={!!err} aria-describedby={err ? 'qz-email-err' : undefined} placeholder="you@example.com" className="qz-input" />
        </label>
        {err && <p id="qz-email-err" role="alert" className="qz-err">{err}</p>}
      </div>
      <div className="qz-actions">
        <button type="submit" disabled={busy} className="al-pill al-pill-lg">{busy ? 'Saving' : 'Save and continue'}<Arrow /></button>
        <button type="button" onClick={onSkip} className="qz-skip">Skip for now</button>
      </div>
    </form>
  )
}

// ── Result ─────────────────────────────────────────────────────────────────────
function Result({ result, sex, caregiver, signupHref }: { result: QuizResult; sex: Sex | ''; caregiver: boolean; signupHref: string }) {
  const they = caregiver ? 'they' : 'you'
  const their = caregiver ? 'their' : 'your'

  if (result.outcome === 'stop') {
    return (
      <div>
        <p className="al-k qz-k">{'// Before anything else'}</p>
        <h1 className="qz-h1">Speak to your GP.</h1>
        <p className="qz-lead">
          {result.stopReason === 'under18'
            ? 'Apex sees adults from 18 to 80. For anyone younger, a GP is the right first call, and they can refer on if needed.'
            : 'Apex does not run its programs during pregnancy or breastfeeding. Your GP or midwife is the right first call, and the door here stays open for later.'}
        </p>
        <div className="qz-stop">
          <Link href="/" className="al-pill al-pill-lg">Back to the home page<Arrow /></Link>
        </div>
        <p className="qz-alt">Prefer to talk? <a href="tel:+61468085700">Call 0468 085 700</a>, Mon to Fri, 9am to 5pm AEST.</p>
      </div>
    )
  }

  const primary = PROGRAMS[result.primary]
  return (
    <div>
      <p className="al-k qz-k">{caregiver ? '// Their starting point' : '// Your starting point'}</p>
      <h1 className="qz-h1">Here is where to start.</h1>
      <p className="qz-lead">Every Apex program starts the same way: one blood panel, collected near {they === 'you' ? 'you' : 'them'}, read by an AHPRA-registered doctor. From what {they === 'you' ? 'you' : 'they'} told us, this is the program to read about while the panel is on its way.</p>

      {result.doctorFirst && (
        <section className="al-card qz-flag" aria-label="See a doctor first">
          <p className="al-k">{'// See a doctor first'}</p>
          <ul>
            {result.doctorFirstReasons.map(r => <li key={r}>{r}</li>)}
          </ul>
          <p>{caregiver ? 'They' : 'You'} can still create an account and order the panel. {caregiver ? 'Their' : 'Your'} doctor reads it with this in mind, and will say if an in-person visit comes first.</p>
        </section>
      )}

      <article className="al-card qz-primary">
        <p className="al-k">{'// Start here'}</p>
        <h2>{primary.name}</h2>
        <p>{whyLine(primary.id, sex, true)}</p>
        <a href={signupHref} className="al-pill al-pill-lg">{caregiver ? 'Create a caregiver account' : 'Create your free account'}<Arrow /></a>
        <Link href={primary.href} className="al-why-link">Read about this program</Link>
      </article>

      {result.secondary.length > 0 && (
        <div className="qz-secs">
          <p className="al-k">{'// Also worth reading'}</p>
          {result.secondary.map(id => (
            <article key={id} className="al-card qz-sec">
              <h3>{PROGRAMS[id].name}</h3>
              <p>{whyLine(id, sex, false)}</p>
            </article>
          ))}
        </div>
      )}

      <p className="qz-fine">Whether it is right for {they} is a decision {their} doctor makes after {their} bloods. Creating an account is free and nothing is prescribed from a quiz.</p>

      {caregiver && (
        <section className="al-card qz-care" aria-label="How caregiver accounts work">
          <p className="al-k">{'// How caregiver accounts work'}</p>
          <ul>
            <li>Create an account using your own name and contact details</li>
            <li>During intake, enter the patient&apos;s full name and date of birth</li>
            <li>Upload their blood test results, even if the patient&apos;s name is on the report</li>
            <li>The clinical team confirms consent with the patient before any treatment begins</li>
          </ul>
        </section>
      )}

      <p className="qz-alt">Already have an account? <a href="https://app.apexmetabolichealth.com.au/login">Log in</a></p>
      <p className="qz-alt" style={{ marginTop: 0 }}>Prefer to talk? <a href="tel:+61468085700">Call 0468 085 700</a>, Mon to Fri, 9am to 5pm AEST.</p>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function ShortAssessment() {
  const params = useSearchParams()
  const { audience, setAudience } = useAudience()

  // Sex carried in from the hero: ?for= wins, else the remembered choice the
  // <head> boot script stamped on <html> (components/audience/Audience.tsx).
  const forParam = params.get('for')
  const [sexCarried] = useState<boolean>(() => {
    if (forParam === 'men' || forParam === 'women') return true
    if (typeof document === 'undefined') return false
    const c = document.documentElement.dataset.chosen
    return c === 'men' || c === 'women'
  })
  const [sex, setSex] = useState<Sex | ''>(() => {
    if (forParam === 'men' || forParam === 'women') return forParam
    if (typeof document === 'undefined') return ''
    const c = document.documentElement.dataset.chosen
    return c === 'men' || c === 'women' ? c : ''
  })
  const opts = { hasSex: sexCarried }
  const phases = phasesFor(opts)
  const total = startTotal()

  const [phase, setPhase] = useState<Phase>(phases[0])
  const [dir, setDir] = useState(1)
  const [age, setAge] = useState<AgeBand | ''>('')
  const [goal, setGoal] = useState<Goal | ''>('')
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [safety, setSafety] = useState<string[]>([])
  const [source, setSource] = useState('')
  const [caregiver, setCaregiver] = useState(false)
  const refCode = (params.get('ref') || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32)
  const whyId = params.get('why') || ''

  // A refresh, a mis-tap on Back, or a phone call used to destroy the answers
  // with no warning. sessionStorage keeps them for this tab only.
  const DRAFT_KEY = 'apex.start.draft.v3'
  const [restored, setRestored] = useState(false)
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        if (d.sex === 'men' || d.sex === 'women') setSex(d.sex)
        if (AGE_BANDS.some(b => b.id === d.age)) setAge(d.age)
        if (GOALS.some(g => g.id === d.goal)) setGoal(d.goal)
        if (Array.isArray(d.symptoms)) setSymptoms(d.symptoms.filter((s: unknown) => typeof s === 'string'))
        if (Array.isArray(d.safety)) setSafety(d.safety.filter((s: unknown) => typeof s === 'string'))
        if (typeof d.source === 'string') setSource(d.source)
        if (typeof d.caregiver === 'boolean') setCaregiver(d.caregiver)
        // Never restore straight into the result.
        if (phases.includes(d.phase)) setPhase(d.phase)
      }
    } catch { /* private mode, quota, disabled storage: start fresh. */ }
    setRestored(true)
    // Restore once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (!restored) return
    try { window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ phase, sex, age, goal, symptoms, safety, source, caregiver })) } catch { /* storage unavailable: the quiz still works, it just won't resume. */ }
  }, [restored, phase, sex, age, goal, symptoms, safety, source, caregiver])

  const step = phase === 'result' ? total : stepNumber(phase, opts)
  const idx = phase === 'result' ? phases.length : phases.indexOf(phase)

  const go = (next: Phase, d = 1) => { setDir(d); setPhase(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const advance = () => go(idx + 1 < phases.length ? phases[idx + 1] : 'result')
  const back = () => { if (idx > 0) go(phases[idx - 1], -1) }
  const tap = (fn: () => void) => { fn(); window.setTimeout(advance, 200) }

  const result = useMemo(() => evaluateQuiz({ sex, age, goal, symptoms, safety }), [sex, age, goal, symptoms, safety])
  useEffect(() => {
    if (phase !== 'result') return
    // Routing context only, never identity or the answers themselves.
    track('quiz_result', { outcome: result.outcome, primary: result.primary, secondary: result.secondary.length, doctor_first: result.doctorFirst })
  }, [phase, result])

  // Hand-off: the site /signup page collects the email, then the portal creates
  // the account with every program already set (?programs=, pipe-separated).
  const signupHref = useMemo(() => {
    const qs = new URLSearchParams()
    if (caregiver) qs.set('type', 'caregiver')
    if (source) qs.set('src', source)
    if (refCode) qs.set('ref', refCode)
    if (sex) qs.set('for', sex)
    if (age) qs.set('age', age)
    if (whyId) qs.set('why', whyId)
    const programs = portalPrograms(result)
    if (programs.length) qs.set('programs', programs.join('|'))
    if (result.notes.length) qs.set('notes', result.notes.join(','))
    const portal = `${PORTAL_SIGNUP}${qs.toString() ? `?${qs}` : ''}`
    return `/signup?redirect=${encodeURIComponent(portal)}`
  }, [caregiver, source, refCode, sex, age, whyId, result])

  const women = audience === 'women' || sex === 'women'
  const symptomOpts = goal ? symptomsFor(goal, sex) : []
  const safetyOpts = safetyFor(sex)
  const toggle = (list: string[], set: (v: string[]) => void, id: string) => set(list.includes(id) ? list.filter(x => x !== id) : [...list, id])
  const toggleSafety = (id: string) => {
    if (id === 'none') { setSafety(safety.includes('none') ? [] : ['none']); return }
    setSafety(safety.includes(id) ? safety.filter(x => x !== id) : [...safety.filter(x => x !== 'none'), id])
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24 }),
  }

  const leadProgram = PROGRAMS[result.primary as ProgramId]?.name ?? 'Health quiz'

  return (
    <>
      <Nav />
      <main id="main-content" className="qz al-page">
        <div className="qz-main">
          {phase !== 'result' && <Progress step={step} total={total} canBack={idx > 0} onBack={back} />}

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={phase} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.26, ease }}>

              {phase === 'sex' && (
                <div>
                  <Heading step={step} total={total} title="Who is this for?" lead="Seven quick taps, under a minute. It points you to the right program to read about. It is not a diagnosis, and nothing is prescribed from a quiz." />
                  <div className="qz-opts" data-cols="2">
                    <Option n={1} label="Men" on={sex === 'men'} onClick={() => tap(() => { setSex('men'); setAudience('men') })} />
                    <Option n={2} label="Women" on={sex === 'women'} onClick={() => tap(() => { setSex('women'); setAudience('women') })} />
                  </div>
                </div>
              )}

              {phase === 'age' && (
                <div>
                  <Heading step={step} total={total} title={caregiver ? 'How old are they?' : 'How old are you?'} lead={sexCarried && idx === 0 ? 'Seven quick taps, under a minute. It points you to the right program to read about. It is not a diagnosis, and nothing is prescribed from a quiz.' : 'A doctor reads every result against your age.'} />
                  <div className="qz-opts" data-cols="2">
                    {AGE_BANDS.map((b, i) => <Option key={b.id} n={i + 1} label={b.label} on={age === b.id} onClick={() => tap(() => setAge(b.id))} />)}
                  </div>
                  <div className="qz-actions">
                    <button type="button" onClick={() => setCaregiver(c => !c)} aria-pressed={caregiver} className="qz-skip">
                      {caregiver ? 'Doing this for yourself? Switch back' : 'Doing this for someone you care for?'}
                    </button>
                  </div>
                </div>
              )}

              {phase === 'goal' && (
                <div>
                  <Heading step={step} total={total} title="What matters most right now?" lead="Pick one. The next screen is about that." />
                  <div className="qz-opts">
                    {GOALS.map((g, i) => <Option key={g.id} n={i + 1} label={g.label} sub={g.sub} on={goal === g.id} onClick={() => tap(() => { if (goal !== g.id) setSymptoms([]); setGoal(g.id) })} />)}
                  </div>
                </div>
              )}

              {phase === 'symptoms' && (
                <div>
                  <Heading step={step} total={total} title={goal ? symptomQuestion(goal, caregiver) : 'What sounds like you?'} lead="Tick everything that applies." />
                  {goal ? (
                    <div className="qz-opts" role="group" aria-label="Symptoms">
                      {symptomOpts.map((s, i) => <Option key={s.id} role="checkbox" n={i + 1} label={s.label} on={symptoms.includes(s.id)} onClick={() => toggle(symptoms, setSymptoms, s.id)} />)}
                    </div>
                  ) : (
                    <div className="qz-actions"><button type="button" className="qz-skip" onClick={back}>Pick a goal first</button></div>
                  )}
                  <div className="qz-actions" data-sticky="">
                    <button type="button" className="al-pill al-pill-lg" disabled={symptoms.length === 0} onClick={advance}>Continue<Arrow /></button>
                    <button type="button" className="qz-skip" onClick={() => { setSymptoms([]); advance() }}>None of these</button>
                  </div>
                </div>
              )}

              {phase === 'email' && <EmailStep step={step} total={total} program={leadProgram} onSaved={advance} onSkip={advance} />}

              {phase === 'safety' && (
                <div>
                  <Heading step={step} total={total} title={caregiver ? 'Anything their doctor must know first?' : 'Anything your doctor must know first?'} lead="Tick any that apply. Some of these change where to start, and a doctor sees them before anything else." />
                  <div className="qz-opts" role="group" aria-label="Safety">
                    {safetyOpts.map((s, i) => <Option key={s.id} role="checkbox" n={i + 1} label={s.label} on={safety.includes(s.id)} onClick={() => toggleSafety(s.id)} />)}
                    <Option role="checkbox" n={safetyOpts.length + 1} label="None of these" on={safety.includes('none')} onClick={() => toggleSafety('none')} />
                  </div>
                  <div className="qz-actions" data-sticky="">
                    <button type="button" className="al-pill al-pill-lg" disabled={safety.length === 0} onClick={advance}>Continue<Arrow /></button>
                  </div>
                </div>
              )}

              {phase === 'source' && (
                <div>
                  <Heading step={step} total={total} title="Where did you hear about Apex?" lead="Last one. It helps us spend less on ads and more on doctors." />
                  <div className="qz-opts">
                    {SOURCE_OPTIONS.map((o, i) => <Option key={o.id} n={i + 1} label={o.label} on={source === o.id} onClick={() => tap(() => setSource(o.id))} />)}
                  </div>
                  <div className="qz-actions">
                    <button type="button" className="qz-skip" onClick={advance}>Skip this question</button>
                  </div>
                </div>
              )}

              {phase === 'result' && <Result result={result} sex={sex} caregiver={caregiver} signupHref={signupHref} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="qz-aside" aria-hidden="true">
          {/* A person, not a vial (no needles, vials or pens anywhere on the site). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={women ? '/photos/woman-stairs.webp' : '/photos/man-park-bench.webp'} alt="" loading="lazy" decoding="async" />
          <ul className="qz-points">
            {[
              ['01', 'One blood panel', 'Collected near you, results in about 48 hours.'],
              ['02', 'A doctor reads them', 'An AHPRA-registered doctor, with your results open.'],
              ['03', 'A written plan', 'In your portal, with follow-ups when they are due.'],
            ].map(([n, t, b]) => (
              <li key={n}><span className="t-readout">{n}</span><strong>{t}</strong><span>{b}</span></li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  )
}
