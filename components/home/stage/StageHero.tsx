'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useMotionValueEvent } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'
import Turntable from './Turntable'
import { useAudience } from '@/components/audience/Audience'

type Sex = 'male' | 'female'
type Who = 'men' | 'women'

/**
 * HERO (Noah, 24 Oct 2026: "choose a gender first ... with the award winning
 * 3D hero"). The visitor picks Men or Women inside the hero. Before the pick
 * the hero is neutral: two grey glass figures side by side. The pick is the
 * moment: the hero floods into that colour world from the tapped button, the
 * chosen figure steps forward in colour and starts to turn (a real 360 degree
 * turntable, drag to turn), the copy and the /start link follow.
 *
 * A short scroll (pinned under one screen) faces the figure to camera and
 * lights the four systems the panel reads, one by one. Every name on a marker
 * is a test on the Apex panel (components/home/PanelMarkers.tsx), never a
 * medicine or an outcome.
 *
 * State lives on <html>: data-chosen (men | women, absent = neutral) and
 * data-audience (the site-wide rose tokens). The <head> boot script stamps
 * both before paint, so a returning visitor or ?for=women never sees the
 * neutral hero flash first. CSS drives the look; React drives the moment.
 */

const SYSTEMS: { id: string; label: string; tests: Record<Sex, string>; at: Record<Sex, [number, number]> }[] = [
  {
    id: 'hormones', label: 'Hormones',
    tests: { male: 'Testosterone, SHBG, oestradiol, LH, FSH, prolactin', female: 'Oestradiol, progesterone, testosterone, LH, FSH, prolactin' },
    at: { male: [0.6, 0.12], female: [0.6, 0.1] },
  },
  {
    id: 'energy', label: 'Energy',
    tests: { male: 'Thyroid (TSH), full blood count, cortisol, IGF-1', female: 'Thyroid (TSH, free T4, free T3), iron studies, vitamin D' },
    at: { male: [0.54, 0.47], female: [0.55, 0.44] },
  },
  {
    id: 'heart', label: 'Heart',
    tests: { male: 'Cholesterol, triglycerides, hs-CRP', female: 'Cholesterol, triglycerides, hs-CRP' },
    at: { male: [0.5, 0.76], female: [0.46, 0.74] },
  },
  {
    id: 'metabolic', label: 'Metabolic',
    tests: { male: 'Glucose, liver and kidney function, uric acid', female: 'Glucose, HbA1c, liver and kidney function' },
    at: { male: [0.36, 0.82], female: [0.36, 0.82] },
  },
]

const POSTER: Record<Sex, string> = { male: '/3d/turn/male/00.webp', female: '/3d/turn/female/00.webp' }
const POSTER_SM: Record<Sex, string> = { male: '/3d/turn/male/poster-540.webp', female: '/3d/turn/female/poster-540.webp' }

const readChosen = (): Who | null => {
  const c = typeof document !== 'undefined' ? document.documentElement.dataset.chosen : undefined
  return c === 'men' || c === 'women' ? c : null
}

export default function StageHero() {
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const washRef = useRef<HTMLDivElement>(null)
  const { setAudience } = useAudience()
  const [chosen, setChosen] = useState<Who | null>(null)
  const [mounted, setMounted] = useState(false)
  const [still, setStill] = useState(false)
  const [live, setLive] = useState<Record<Sex, boolean>>({ male: false, female: false })
  const [lit, setLit] = useState(-1)
  const [away, setAway] = useState(1)
  const [beat, setBeat] = useState(false)
  const face = useRef(0)
  const anim = useRef<{ a?: Animation; t?: number }>({})

  useEffect(() => {
    setMounted(true)
    setChosen(readChosen())
    // Reduced motion, Save-Data and low-power devices keep the composed still.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
    const low = !!nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency || 8) <= 2
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setStill(mq.matches || low)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const sex: Sex | null = chosen === 'women' ? 'female' : chosen === 'men' ? 'male' : null

  // The pick: flood the hero with the new colour world from the button.
  const choose = useCallback((who: Who, e?: React.MouseEvent<HTMLButtonElement>) => {
    const html = document.documentElement
    const frame = frameRef.current
    const wash = washRef.current
    const prev = anim.current
    prev.a?.cancel(); if (prev.t) window.clearTimeout(prev.t)
    const commit = () => { setAudience(who) }
    if (!frame || !wash || still || html.dataset.chosen === who) {
      html.dataset.chosen = who; commit(); setChosen(who)
      frame?.style.removeProperty('--hx-bg-now')
      return
    }
    // Hold the current background while the wash grows over it.
    const bgNow = getComputedStyle(frame).backgroundColor
    frame.style.setProperty('--hx-bg-now', bgNow)
    wash.dataset.to = who
    const fr = frame.getBoundingClientRect()
    const br = e?.currentTarget.getBoundingClientRect()
    const x = br ? br.left + br.width / 2 - fr.left : fr.width / 2
    const y = br ? br.top + br.height / 2 - fr.top : fr.height
    const R = Math.hypot(Math.max(x, fr.width - x), Math.max(y, fr.height - y)) + 40
    html.dataset.chosen = who
    setChosen(who)
    // Tokens (CTA, glows) turn as the edge of the wash passes the copy.
    prev.t = window.setTimeout(commit, 320)
    const a = wash.animate(
      [{ clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 }, { clipPath: `circle(${R}px at ${x}px ${y}px)`, opacity: 1 }],
      { duration: 820, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' },
    )
    prev.a = a
    a.onfinish = () => { frame.style.removeProperty('--hx-bg-now'); a.cancel(); delete wash.dataset.to }
  }, [setAudience, still])

  // The short scroll beat: face the camera, light the systems in order.
  const p = useSectionProgress(ref, 'pin')
  useMotionValueEvent(p, 'change', v => {
    face.current = Math.min(1, v / 0.08)
    const i = v < 0.12 ? -1 : Math.min(SYSTEMS.length - 1, Math.floor((v - 0.12) / 0.19))
    setLit(l => (l === i ? l : i))
    setBeat(b => (b === v > 0.05 ? b : v > 0.05))
  })

  const onAngle = useCallback((a: number) => setAway(a), [])
  const readyM = useCallback(() => setLive(l => ({ ...l, male: true })), [])
  const readyF = useCallback(() => setLive(l => ({ ...l, female: true })), [])

  const href = chosen ? `/start?for=${chosen}` : '/start'
  const markerShow = sex && (still ? 1 : 1 - away)
  const sys = lit >= 0 ? SYSTEMS[lit] : null

  return (
    <section ref={ref} id="hero" className="hx" data-still={still || undefined} data-pin={(!!chosen && !still) || undefined} data-beat={(beat && !!chosen && !still) || undefined} aria-label="Introduction">
      <div className="hx-pin">
        <div className="hx-frame stage-frame" ref={frameRef}>
          <div className="hx-wash" ref={washRef} aria-hidden="true" />

          <div className="hx-copy">
            <p className="stage-kicker hero-in" style={{ animationDelay: '80ms' }}>
              <span className="stage-kicker-dot" aria-hidden="true" />
              <span><span className="hx-when-none">Australian adults 18 to 80</span><span className="hx-when-men">Australian men 18 to 80</span><span className="hx-when-women">Australian women 18 to 80</span> · AHPRA-registered doctors</span>
            </p>
            <h1 className="stage-display hero-in" style={{ animationDelay: '140ms' }}>
              Fine on paper.<br /><span className="stage-muted">Flat in real life.</span>
            </h1>
            <p className="stage-lead hx-lead hero-in" style={{ animationDelay: '260ms' }}>
              <span className="hx-when-none">One blood panel, 23+ markers, read with you by a doctor online. No GP referral.</span>
              <span className="hx-when-men">One blood panel, 23+ markers including testosterone, read with you by a doctor online. No GP referral.</span>
              <span className="hx-when-women">One blood panel for hormones, cycle, iron and thyroid, read with you by a doctor online. No GP referral.</span>
            </p>
            {/* One price line (24 Oct fundamentals pass). Detail lives on /pricing. */}
            <p className="stage-price hx-price hero-in" style={{ animationDelay: '320ms' }}>
              <span className="stage-price-lead">Doctor consults from <strong>$99</strong> members · <strong>$199</strong> standard</span><span>Bloods from <strong>$199</strong></span><span>No Medicare rebate</span>
            </p>
            <div className="stage-actions hx-actions hero-in" style={{ animationDelay: '380ms' }}>
              <StageCta href={href}>Start your assessment</StageCta>
              <Link href="/pricing" className="stage-link">See pricing</Link>
            </div>
          </div>

          <div className="hx-stage">
            {(['male', 'female'] as Sex[]).map(s => {
              const isOn = sex === s
              return (
                <div key={s} className="hx-fig" data-sex={s} data-live={(live[s] && !still) || undefined}>
                  <picture>
                    <source media="(max-width: 899px)" srcSet={POSTER_SM[s]} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={POSTER[s]}
                      alt={s === 'male' ? 'Glass figure of a man, his blood vessels lit from the heart outward' : 'Glass figure of a woman, her blood vessels lit from the heart outward'}
                      width={828} height={1108}
                      fetchPriority="high"
                      decoding="async"
                      className="hx-poster"
                    />
                  </picture>
                  {mounted && !still && (
                    <Turntable sex={s} active={isOn} face={face} onAngle={isOn ? onAngle : undefined} onReady={s === 'male' ? readyM : readyF} />
                  )}
                  {isOn && (
                    <div className="hx-marks" style={{ opacity: markerShow || 0 }} aria-hidden="true">
                      {SYSTEMS.map((m, i) => (
                        <span key={m.id} className="hx-mark" data-on={i <= lit || undefined} data-now={i === lit || undefined} style={{ left: `${m.at[s][0] * 100}%`, top: `${m.at[s][1] * 100}%` }}>
                          <span className="hx-mark-dot" />
                          <span className="hx-mark-label">{m.label}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* What the lit system measures. Announced for screen readers. */}
            <div className="hx-readout" data-on={(!!sys && !!sex) || undefined} aria-live="polite">
              {sys && sex && (<><span className="hx-readout-k">{sys.label} · on your panel</span><span className="hx-readout-v">{sys.tests[sex]}</span></>)}
            </div>

            <div className="hx-pick" role="group" aria-labelledby="hx-pick-k">
              <p id="hx-pick-k" className="hx-pick-k">{chosen ? <>Showing the {chosen === 'women' ? 'women’s' : 'men’s'} panel. <span className="hx-hint">Drag to turn.</span></> : 'Who is this for? Start here.'}</p>
              <div className="hx-pick-row">
                {(['men', 'women'] as Who[]).map(w => (
                  <button key={w} type="button" className="hx-pick-btn" data-who={w} aria-pressed={chosen === w} onClick={e => choose(w, e)}>
                    <strong>{w === 'men' ? 'Men' : 'Women'}</strong>
                    <span>{w === 'men' ? 'Testosterone, energy' : 'Hormones, cycle, iron'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="stage-foot hx-foot">Illustrative render. Every marker named is on the Apex panel. General information, not medical advice.</p>
        </div>
      </div>
    </section>
  )
}
