'use client'

import { useEffect, useRef, useState } from 'react'
import Image from '@/components/audience/Img'
import { useStageArt, useStageTone } from './StageTone'
import { motion, useReducedMotion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'
import { useAudience } from '@/components/audience/Audience'

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
  // The Men / Women switch is the whole site's switch (components/audience).
  const { audience, setAudience } = useAudience()
  const sex: Sex = audience === 'women' ? 'female' : 'male'
  const [chose, setChose] = useState(false)
  const setSex = (s: Sex) => { setAudience(s === 'female' ? 'women' : 'men'); setChose(true) }
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)


  const p = useSectionProgress(ref, 'pin')
  const bodyOpacity = useTransform(p, [0, 0.42, 0.6], [1, 1, 0])
  const bodyScale = useTransform(p, [0, 0.6], [1, 1.08])
  const bodyY = useTransform(p, [0, 0.6], ['0%', '-3%'])
  const heartOpacity = useTransform(p, [0.44, 0.62], [0, 1])
  const heartScale = useTransform(p, [0.44, 0.8], [0.9, 1])
  const heartRotate = useTransform(p, [0.44, 0.72, 1], [-16, 2, 5])
  // The box spins in (Noah, 29 Sep): a scroll-linked turn in depth as it
  // rises, then it keeps turning slowly under the doctor copy.
  const heartSpin = useTransform(p, [0.44, 0.72, 1], [-70, 0, 18])
  const heartRise = useTransform(p, [0.44, 0.7], ['18%', '0%'])
  const chips = useTransform(p, [0.34, 0.42], [1, 0])
  const chipsEvents = useTransform(p, v => (v > 0.4 ? 'none' : 'auto'))
  const copyA = useTransform(p, [0, 0.14, 0.2], [1, 1, 0])
  const copyAY = useTransform(p, [0.14, 0.2], [0, -28])
  // Faded copy must not swallow taps meant for the Men / Women switch.
  const [copyFaded, setCopyFaded] = useState(false)
  useMotionValueEvent(copyA, 'change', v => setCopyFaded(v < 0.3))
  // Who: the visitor picks Men or Women while the body walks its systems.
  const copyW = useTransform(p, [0.18, 0.24, 0.38, 0.44], [0, 1, 1, 0])
  const copyWY = useTransform(p, [0.18, 0.24, 0.38, 0.44], [28, 0, 0, -28])
  const [whoOn, setWhoOn] = useState(false)
  useMotionValueEvent(copyW, 'change', v => setWhoOn(v > 0.6))
  const copyB = useTransform(p, [0.5, 0.62], [0, 1])
  const copyBY = useTransform(p, [0.5, 0.62], [28, 0])

  // Masterclass rule: motion is scroll-linked, never a timer. Until the
  // visitor picks a system, the first third of the pinned scroll walks the
  // four pillars in order, and reverses cleanly on the way back up.
  useEffect(() => {
    if (picked || reduced) return
    return p.on('change', v => {
      const i = Math.min(PILLARS.length - 1, Math.floor((v / 0.4) * PILLARS.length))
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

  // No prices on the homepage (Noah, 29 Sep). Two hooks instead, both real
  // portal features: the Apex score (progress you can watch, only in our
  // app) and follow-up bloods booked for you (nothing to chase, nothing slips).
  const perks = (
    <ul className="stage-perks">
      <li><em>Only in the Apex app</em><strong>Your Apex score</strong><span>One number from your whole panel. Watch it move every test.</span></li>
      <li><em>Nothing to chase</em><strong>We book the follow-ups</strong><span>On a program, your next bloods are scheduled for you.</span></li>
    </ul>
  )

  const who = (
    <div className="stage-who" role="group" aria-label="Who is the test for?">
      {(['male', 'female'] as Sex[]).map(s => (
        <button key={s} type="button" onClick={() => setSex(s)} aria-pressed={sex === s} data-on={sex === s || undefined}>
          <strong>{s === 'male' ? 'Men' : 'Women'}</strong>
          <span>{s === 'male' ? 'Testosterone, energy, recovery' : 'Hormones, cycle, iron'}</span>
        </button>
      ))}
    </div>
  )

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
              <div className="stage-fig-media" ref={mediaRef}>
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
              <span className="stage-scan" aria-hidden="true" />
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
            </motion.div>

            {!reduced && (
              <motion.div className="stage-heart-box" style={{ opacity: heartOpacity, scale: heartScale, rotate: heartRotate, rotateY: heartSpin, y: heartRise, transformPerspective: 1100 }} aria-hidden="true">
                {/* Noah 29 Sep: the hand-off is the Apex box, not the vials. */}
                <Image src="/3d/product/box-tall.jpg" alt="" fill sizes="(min-width: 900px) 40vw, 80vw" className="stage-fig-img" />
                <span className="stage-float stage-float-a">
                  <span className="stage-float-k">Starts with</span>
                  <span className="stage-float-v">One blood panel, 23+ markers</span>
                </span>
                <span className="stage-float stage-float-b">
                  <span className="stage-float-k">Delivered</span>
                  <span className="stage-float-v">Plain outer pack, to your door</span>
                </span>
              </motion.div>
            )}
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
            {reduced && perks}
            <div className="stage-actions hero-in" style={{ animationDelay: '460ms' }}>
              <StageCta href={href}>Start your assessment</StageCta>
              <a href="#panel" className="stage-link">See what we measure</a>
            </div>
            {reduced && who}
          </motion.div>

          {/* Copy W: who are we testing? The pick tells the rest of the story. */}
          {!reduced && (
            <motion.div className="stage-hero-copy stage-hero-copy-who" data-faded={!whoOn || undefined} style={{ opacity: copyW, y: copyWY }}>
              <h2 className="stage-display">
                Who are we<br /><span className="stage-muted">testing?</span>
              </h2>
              {who}
              <p className="stage-caption" aria-live="polite">
                {picked ? <>Your assessment will start with <strong>{pillar.label.toLowerCase()}</strong>.</> : <><strong>{pillar.label}:</strong> {pillar.markers[sex]}.</>}
              </p>
            </motion.div>
          )}

          {/* Copy B: the doctor */}
          {!reduced && (
            <motion.div className="stage-hero-copy stage-hero-copy-b" style={{ opacity: copyB, y: copyBY }} aria-hidden="true">
              <h2 className="stage-display">
                {chose ? (sex === 'female' ? 'Her plan,' : 'His plan,') : 'Your plan,'}<br /><span className="stage-muted">written by a doctor.</span>
              </h2>
              <p className="stage-lead">
                An AHPRA-registered doctor reads {sex === 'female' ? 'your hormones, iron and metabolic markers' : 'your testosterone, metabolic and heart markers'} with you on the call, decides what is suitable, and your plan arrives at your door.
              </p>
              {perks}
            </motion.div>
          )}


          <p className="stage-foot">Illustrative render. Every marker named is on the Apex panel. For Australian adults 18+. General information, not medical advice.</p>
        </div>
      </div>
    </section>
  )
}

