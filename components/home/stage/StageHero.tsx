'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/components/audience/Img'
import { useStageArt, useStageTone } from './StageTone'
import { motion, useReducedMotion, useTransform, useMotionValueEvent, useMotionTemplate } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'
import { useAudience } from '@/components/audience/Audience'
import TickGauge from '../../motion/TickGauge'

type Sex = 'male' | 'female'

type Pillar = {
  id: string
  label: string
  /** Tests on the Apex panel. Test names only, never medicines or outcomes. */
  markers: Record<Sex, string>
  /** First /start question this pillar answers. */
  t: string
  why: string
  /** Where the dot sits, as a fraction of the figure box. */
  at: Record<Sex, [number, number]>
  /** Which side of the dot the chip opens to. */
  side: 'left' | 'right'
}

const PILLARS: Pillar[] = [
  {
    id: 'hormones', label: 'Hormones', side: 'left',
    markers: { male: 'Testosterone, SHBG, oestradiol, LH, FSH, prolactin', female: 'Oestradiol, progesterone, testosterone, LH, FSH, prolactin' },
    t: 'hormone', why: 'energy',
    at: { male: [0.36, 0.2], female: [0.4, 0.2] },
  },
  {
    id: 'longevity', label: 'Longevity', side: 'left',
    markers: { male: 'Cholesterol, triglycerides, hs-CRP, IGF-1, full blood count', female: 'Cholesterol, triglycerides, hs-CRP, vitamin D, full blood count' },
    t: 'longevity', why: 'ageing',
    at: { male: [0.57, 0.71], female: [0.56, 0.7] },
  },
  {
    id: 'recovery', label: 'Recovery', side: 'left',
    markers: { male: 'Testosterone, IGF-1, cortisol, hs-CRP', female: 'Testosterone, cortisol, iron studies, hs-CRP' },
    t: 'recovery', why: 'recovery',
    at: { male: [0.13, 0.63], female: [0.14, 0.63] },
  },
  {
    id: 'metabolic', label: 'Metabolic', side: 'left',
    markers: { male: 'Glucose, liver and kidney function, uric acid, lipids', female: 'Glucose, HbA1c, liver and kidney function, lipids' },
    t: 'weight', why: 'weight',
    at: { male: [0.62, 0.93], female: [0.6, 0.93] },
  },
]

const FIG_ASPECT = 1647 / 2200

/**
 * HOOK, BioTrack structure. An ice stage holds the glass body, bleeding off
 * the bottom edge. It loads ghost → glow → full. Four pillar chips sit on the
 * body on dot leaders; the active one opens with its markers. Scrolling hands
 * the body over to the heart and the headline over to the doctor.
 */
// The hook: what "flat" feels like. Symptoms people describe, never claims.
const FEEL: Record<Sex, { t: string; at: [number, number] }[]> = {
  male: [
    { t: 'Tired all the time', at: [0.02, 0.3] }, { t: 'Poor sleep', at: [0.66, 0.16] },
    { t: 'Low drive', at: [0.06, 0.56] }, { t: 'Weight that won’t move', at: [0.6, 0.48] },
  ],
  female: [
    { t: 'Tired all the time', at: [0.02, 0.3] }, { t: 'Poor sleep', at: [0.66, 0.16] },
    { t: 'Brain fog', at: [0.08, 0.56] }, { t: 'Weight that won’t move', at: [0.6, 0.48] },
  ],
}

export default function StageHero() {
  const art = useStageArt()
  const glow = useStageTone() === 'red' ? 'red' : 'Apex blue'
  const FIG = {
    male:   { src: art('body-male'),   alt: `Dark glass figure of a man, blood vessels lit in ${glow} from the heart outward` },
    female: { src: art('body-female'), alt: `Dark glass figure of a woman, blood vessels lit in ${glow} from the heart outward` },
  }
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // The Men / Women switch is the whole site's switch (components/audience).
  const { audience, setAudience } = useAudience()
  const sex: Sex = audience === 'women' ? 'female' : 'male'
  const setSex = (s: Sex) => setAudience(s === 'female' ? 'women' : 'men')
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)


  const p = useSectionProgress(ref, 'pin')
  // The journey (masterclass: HOOK, INTRODUCE, EXPLAIN, INVITE), one object
  // the whole way. The body opens flat and grey ("flat in real life"), what
  // that feels like surfaces around it, a scan reads it, and it ignites from
  // the heart out when the markers land. Then the doctor, then the button.
  const bodyScale = useTransform(p, [0, 1], [1, 1.06])
  const bodyY = useTransform(p, [0, 1], ['0%', '-2%'])
  const lit = useTransform(p, [0.4, 0.56], [0, 1])
  const gray = useTransform(lit, [0, 1], [0.92, 0])
  const bright = useTransform(lit, [0, 1], [0.84, 1])
  const bodyFilter = useMotionTemplate`grayscale(${gray}) brightness(${bright})`
  const pulse = useTransform(lit, [0, 0.6, 1], [0, 1, 0.75])
  const scanTop = useTransform(p, [0.3, 0.46], ['-12%', '104%'])
  const scanOpacity = useTransform(p, [0.29, 0.32, 0.43, 0.47], [0, 1, 1, 0])
  const scoreOpacity = useTransform(lit, [0.55, 1], [0, 1])
  const feel = [0, 1, 2, 3].map(i => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    opacity: useTransform(p, [0.04 + i * 0.055, 0.1 + i * 0.055, 0.32, 0.4], [0, 1, 1, 0]),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    y: useTransform(p, [0.04 + i * 0.055, 0.1 + i * 0.055], [14, 0]),
  }))
  const chips = useTransform(p, [0.5, 0.6], [0, 1])
  const chipsEvents = useTransform(p, v => (v < 0.54 ? 'none' : 'auto'))
  const copyA = useTransform(p, [0, 0.32, 0.4], [1, 1, 0])
  const copyAY = useTransform(p, [0.32, 0.4], [0, -28])
  // Faded copy must not swallow taps meant for the Men / Women switch.
  const [copyFaded, setCopyFaded] = useState(false)
  useMotionValueEvent(copyA, 'change', v => setCopyFaded(v < 0.3))
  const copyB = useTransform(p, [0.4, 0.5], [0, 1])
  const copyBY = useTransform(p, [0.4, 0.5], [28, 0])
  const [copyBOn, setCopyBOn] = useState(false)
  useMotionValueEvent(copyB, 'change', v => setCopyBOn(v > 0.6))

  // Masterclass rule: motion is scroll-linked, never a timer. Until the
  // visitor picks a system, the first third of the pinned scroll walks the
  // four pillars in order, and reverses cleanly on the way back up.
  useEffect(() => {
    if (picked || reduced) return
    return p.on('change', v => {
      if (v < 0.62) return
      const i = Math.min(PILLARS.length - 1, Math.floor(((v - 0.62) / 0.33) * PILLARS.length))
      setActive(a => (a === i ? a : i))
    })
  }, [p, picked, reduced])

  // The body turns a few degrees toward the cursor (BioTrack app reference).
  const mediaRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = mediaRef.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--tx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3))
        el.style.setProperty('--ty', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf) }
  }, [reduced])

  const pillar = PILLARS[active]
  const href = picked ? `/start?t=${pillar.t}&why=${pillar.why}` : '/start'
  const choose = (i: number) => { setActive(i); setPicked(true) }

  return (
    <section ref={ref} id="hero" className="stage-hero" data-still={reduced || undefined} aria-label="Introduction">
      <div className="stage-hero-pin">
        <div className="stage-frame stage-hero-frame">
          {/* Figure: body, then heart */}
          <div className="stage-hero-figure" aria-hidden={false}>
            <motion.div className="stage-fig-box stage-load" style={reduced ? undefined : { scale: bodyScale, y: bodyY, aspectRatio: FIG_ASPECT }}>
              <motion.div className="stage-fig-media" ref={mediaRef} style={reduced ? undefined : { filter: bodyFilter }}>
              {(['male', 'female'] as Sex[]).map(s => (
                <Image
                  key={s}
                  src={FIG[s].src}
                  alt={s === sex ? FIG[s].alt : ''}
                  fill
                  priority={s === 'male'}
                  sizes="(min-width: 900px) 46vw, 92vw"
                  className="stage-fig-img"
                  style={{ opacity: s === sex ? 1 : 0 }}
                />
              ))}
              <motion.span className="stage-pulse" aria-hidden="true" style={reduced ? undefined : { opacity: pulse }} />
              <span className="stage-scan" aria-hidden="true" />
              {!reduced && <motion.span className="stage-scanband" aria-hidden="true" style={{ top: scanTop, opacity: scanOpacity }} />}
              </motion.div>

              {/* HOOK: what flat feels like, one line at a time as you scroll. */}
              {!reduced && (
                <div className="stage-feel" aria-hidden="true">
                  {FEEL[sex].map((f, i) => (
                    <motion.span key={f.t} className="stage-feel-chip" style={{ left: `${f.at[0] * 100}%`, top: `${f.at[1] * 100}%`, opacity: feel[i].opacity, y: feel[i].y }}>
                      <span className="stage-feel-dot" />{f.t}
                    </motion.span>
                  ))}
                </div>
              )}

              <motion.div className="stage-chips" style={reduced ? undefined : { opacity: chips, pointerEvents: chipsEvents }}>
              {PILLARS.map((pl, i) => {
                const [x, y] = pl.at[sex]
                const on = i === active
                return (
                  <button
                    key={pl.id}
                    type="button"
                    className="stage-chip"
                    data-on={on || undefined}
                    data-side={pl.side}
                    style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
                    onClick={() => choose(i)}
                    onMouseEnter={() => choose(i)}
                    onFocus={() => choose(i)}
                    aria-pressed={on && picked}
                    aria-label={`${pl.label}: ${pl.markers[sex]}`}
                  >
                    <span className="stage-chip-dot" aria-hidden="true" />
                    <span className="stage-chip-lead" aria-hidden="true" />
                    <span className="stage-chip-card" aria-hidden="true">
                      <span className="stage-chip-title">{pl.label}</span>
                      <span className="stage-chip-body">{pl.markers[sex]}</span>
                    </span>
                  </button>
                )
              })}
              </motion.div>
              <div className="stage-sex" role="group" aria-label="Show figure for">
                {(['male', 'female'] as Sex[]).map(s => (
                  <button key={s} type="button" onClick={() => setSex(s)} aria-pressed={sex === s} data-on={sex === s || undefined}>
                    {s === 'male' ? 'Men' : 'Women'}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Copy A: the hook */}
          <motion.div className="stage-hero-copy" data-faded={copyFaded || undefined} style={reduced ? undefined : { opacity: copyA, y: copyAY }}>
            <p className="stage-kicker hero-in" style={{ animationDelay: '120ms' }}>
              <span className="stage-kicker-dot" aria-hidden="true" /> AHPRA-registered doctors · Australia-wide
            </p>
            <h1 className="stage-display hero-in" style={{ animationDelay: '200ms' }}>
              Fine on paper.<br /><span className="stage-muted">Flat in real life.</span>
            </h1>
            <p className="stage-lead hero-in" style={{ animationDelay: '360ms' }}>
              A standard panel looks for disease. Ours reads 23+ markers for how you actually function, and a doctor builds your plan from them. No GP referral.
            </p>
            {/* Function / Superpower: the price is part of the promise. */}
            <p className="stage-price hero-in" style={{ animationDelay: '420ms' }}>
              <span><strong>$280</strong> one blood panel</span>
              <span className="stage-price-or">or</span>
              <span><strong>$99</strong>/month membership, two panels a year included</span>
            </p>
            <div className="stage-actions hero-in" style={{ animationDelay: '460ms' }}>
              <StageCta href={href}>Start your assessment</StageCta>
              <a href="#panel" className="stage-link">See what we measure</a>
            </div>
            <p className="stage-caption hero-in" aria-live="polite" style={{ animationDelay: '560ms' }}>
              {picked ? <>Your assessment will start with <strong>{pillar.label.toLowerCase()}</strong>.</> : <><strong>{pillar.label}:</strong> {pillar.markers[sex]}. Tap a system on the body to start there.</>}
            </p>
          </motion.div>

          {/* Copy B: the doctor */}
          {!reduced && (
            <motion.div className="stage-hero-copy stage-hero-copy-b" data-faded={!copyBOn || undefined} inert={!copyBOn || undefined} style={{ opacity: copyB, y: copyBY }}>
              <h2 className="stage-display">
                Measured properly.<br /><span className="stage-muted">Then a doctor writes the plan.</span>
              </h2>
              <p className="stage-lead">
                Your 23+ markers are read against optimal ranges, not just the disease cut-off. An AHPRA-registered doctor goes through them with you and decides what is suitable.
              </p>
              <div className="stage-actions">
                <StageCta href={href}>Start your assessment</StageCta>
                <a href="#panel" className="stage-link">See what we measure</a>
              </div>
            </motion.div>
          )}


          {/* AlgoRx / Superpower: one number, labelled as a sample. */}
          <motion.div className="stage-score" style={reduced ? undefined : { opacity: scoreOpacity }} aria-label="Sample Apex score, 74 out of 100. Not a real patient.">
            <TickGauge value={74} delay={900} size={104} />
            <div className="stage-score-t">
              <strong>Apex score</strong>
              <span>One number from your whole panel, tracked every test.</span>
              <em>Sample</em>
            </div>
          </motion.div>

          <p className="stage-foot">Illustrative render. Every marker named is on the Apex panel. For Australian adults 18+. General information, not medical advice.</p>
        </div>
      </div>
    </section>
  )
}

