'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useStageArt, useStageTone } from './StageTone'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'

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
export default function StageHero() {
  const art = useStageArt()
  const glow = useStageTone() === 'red' ? 'red' : 'Apex blue'
  const FIG = {
    male:   { src: art('body-male'),   alt: `Dark glass figure of a man, blood vessels lit in ${glow} from the heart outward` },
    female: { src: art('body-female'), alt: `Dark glass figure of a woman, blood vessels lit in ${glow} from the heart outward` },
  }
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [sex, setSex] = useState<Sex>('male')
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)


  const p = useSectionProgress(ref, 'pin')
  const bodyOpacity = useTransform(p, [0, 0.42, 0.6], [1, 1, 0])
  const bodyScale = useTransform(p, [0, 0.6], [1, 1.08])
  const bodyY = useTransform(p, [0, 0.6], ['0%', '-3%'])
  const heartOpacity = useTransform(p, [0.44, 0.62], [0, 1])
  const heartScale = useTransform(p, [0.44, 0.8], [0.9, 1])
  const heartRotate = useTransform(p, [0.44, 1], [-7, 2])
  const chips = useTransform(p, [0.28, 0.4], [1, 0])
  const chipsEvents = useTransform(p, v => (v > 0.38 ? 'none' : 'auto'))
  const copyA = useTransform(p, [0, 0.34, 0.44], [1, 1, 0])
  const copyAY = useTransform(p, [0.34, 0.44], [0, -28])
  const copyB = useTransform(p, [0.5, 0.62], [0, 1])
  const copyBY = useTransform(p, [0.5, 0.62], [28, 0])

  // Masterclass rule: motion is scroll-linked, never a timer. Until the
  // visitor picks a system, the first third of the pinned scroll walks the
  // four pillars in order, and reverses cleanly on the way back up.
  useEffect(() => {
    if (picked || reduced) return
    return p.on('change', v => {
      const i = Math.min(PILLARS.length - 1, Math.floor((v / 0.32) * PILLARS.length))
      setActive(a => (a === i ? a : i))
    })
  }, [p, picked, reduced])

  const pillar = PILLARS[active]
  const href = picked ? `/start?t=${pillar.t}&why=${pillar.why}` : '/start'
  const choose = (i: number) => { setActive(i); setPicked(true) }

  return (
    <section ref={ref} id="hero" className="stage-hero" data-still={reduced || undefined} aria-label="Introduction">
      <div className="stage-hero-pin">
        <div className="stage-frame stage-hero-frame">
          {/* Figure: body, then heart */}
          <div className="stage-hero-figure" aria-hidden={false}>
            <motion.div className="stage-fig-box stage-load" style={reduced ? undefined : { opacity: bodyOpacity, scale: bodyScale, y: bodyY, aspectRatio: FIG_ASPECT }}>
              <div className="stage-fig-media">
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
              <span className="stage-pulse" aria-hidden="true" />
              </div>

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

            {!reduced && (
              <motion.div className="stage-heart-box" style={{ opacity: heartOpacity, scale: heartScale, rotate: heartRotate }} aria-hidden="true">
                <Image src={art('tube')} alt="" fill sizes="(min-width: 900px) 40vw, 80vw" className="stage-fig-img" />
                <span className="stage-float stage-float-a">
                  <span className="stage-float-k">Starts with</span>
                  <span className="stage-float-v">One blood panel, 23+ markers</span>
                </span>
                <span className="stage-float stage-float-b">
                  <span className="stage-float-k">Delivered</span>
                  <span className="stage-float-v">Discreetly, to your door</span>
                </span>
              </motion.div>
            )}
          </div>

          {/* Copy A: the hook */}
          <motion.div className="stage-hero-copy" style={reduced ? undefined : { opacity: copyA, y: copyAY }}>
            <p className="stage-kicker hero-in" style={{ animationDelay: '120ms' }}>
              <span className="stage-kicker-dot" aria-hidden="true" /> AHPRA-registered doctors · Australia-wide
            </p>
            <h1 className="stage-display hero-in" style={{ animationDelay: '200ms' }}>
              Fine on paper.<br /><span className="stage-muted">Flat in real life.</span>
            </h1>
            <p className="stage-lead hero-in" style={{ animationDelay: '360ms' }}>
              A standard panel looks for disease. Ours reads 23+ markers for how you actually function, and a doctor builds your plan from them. No GP referral.
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
            <motion.div className="stage-hero-copy stage-hero-copy-b" style={{ opacity: copyB, y: copyBY }} aria-hidden="true">
              <h2 className="stage-display">
                Your plan,<br /><span className="stage-muted">written by a doctor.</span>
              </h2>
              <p className="stage-lead">
                An AHPRA-registered doctor reads your panel with you on the call, decides what is suitable, and your plan arrives at your door.
              </p>
            </motion.div>
          )}


          <p className="stage-foot">Illustrative render. Every marker named is on the Apex panel. For Australian adults 18+. General information, not medical advice.</p>
        </div>
      </div>
    </section>
  )
}

