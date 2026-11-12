'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'
import { START_HREF } from '@/lib/portal'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'
import dynamic from 'next/dynamic'
import { useAudience } from '@/components/audience/Audience'
import { preload } from 'react-dom'

// The turntable's code and frames load only after a pick, never before the LCP.
const Turntable = dynamic(() => import('./Turntable'), { ssr: false })

type Sex = 'male' | 'female'
type Who = 'men' | 'women'

/**
 * 12 Nov 2026 (Noah: "keep the avatars back, make them bigger and premium,
 * kinda like when you enter the portal, gender neutral till the user picks,
 * then rose pink or blue"). The portal login ice stage, full bleed (no box,
 * per 11 Nov AM): kicker, two-line title, readouts on dot leaders, and the
 * glass figures large on the right. On load both figures are grey on a grey
 * ice ground; the pick floods the stage blue (men) or rose (women) and the
 * chosen figure turns to colour. Older notes below are history.
 *
 * HERO (Noah, 24 Oct 2026: "choose a gender first ... with the award winning
 * 3D hero"; S tier pass 28 Oct 2026 after the wearebrand playbook). The
 * visitor picks Men or Women inside the hero. Before the pick the hero is
 * neutral: two quiet glass figures side by side in a framed plate beside the
 * copy, and the default figure (men) is already turning from first paint, so
 * one live object owns the screen before anyone touches it. The pick sits in
 * the copy column above the CTA, never the fold. The pick is the moment: the
 * hero floods into that colour world from the tapped button, the chosen figure
 * steps forward in colour (a real 360 degree turntable, drag to turn), the copy
 * and the /start link follow. A fixed pill CTA sits bottom centre from the
 * first pixel on desktop; on phones the hero's own buttons carry it, and the
 * pill only appears while the scroll beat steps the copy back.
 *
 * A short scroll (pinned under one screen) faces the figure to camera and
 * lights the four systems the panel reads, one by one. Every name on a marker
 * is a test on the Apex panel (components/home/PanelMarkers.tsx), never a
 * medicine or an outcome.
 *
 * 11 Nov 2026 PM (Noah, ASKS item 22: "apex hero still isn't hitting", AlgoRx
 * approach): one dark full-bleed stage, the headline "The art of living better.
 * The science of performing better." (Noah, 12 Nov 2026) bottom left, one subline, one CTA. The figures are
 * coloured from first paint (man blue, woman rose) and are themselves the
 * pick ("For men" / "For women"). Removed from the hero: the 23+ markers
 * readout box, the 18 to 80 kicker (now on the start tiles), the long lead,
 * the Men / Women cards (now on the start tiles too), See pricing, the phone
 * line (now in the phone sticky bar and the close) and the fixed pill.
 *
 * 11 Nov 2026 AM (Noah: "I hate the box landing page"): no ice card, no framed
 * plate. One night ground, full bleed; on phones the figures stand full width
 * above the copy. Neutral is grey; after the pick the figure faces the camera
 * with Hormones lit and the "on your panel" card showing from the first screen.
 *
 * State lives on <html>: data-chosen (men | women, absent = neutral) and
 * data-audience (the site-wide rose tokens). The <head> boot script stamps
 * both before paint, so a returning visitor or ?for=women never sees the
 * neutral hero flash first. CSS drives the look; React drives the moment.
 */

// Every name on a marker is a system the panel reads, never a medicine.
const SYSTEMS: { id: string; label: string; at: Record<Sex, [number, number]> }[] = [
  { id: 'hormones', label: 'Hormones', at: { male: [0.6, 0.12], female: [0.6, 0.1] } },
  { id: 'energy', label: 'Energy', at: { male: [0.54, 0.47], female: [0.55, 0.44] } },
  { id: 'heart', label: 'Heart', at: { male: [0.5, 0.76], female: [0.46, 0.74] } },
  { id: 'metabolic', label: 'Metabolic', at: { male: [0.36, 0.82], female: [0.36, 0.82] } },
]

/** Readouts on dot leaders (portal ice stage). Approved facts only, no prices. */
const READS = [
  { v: '23+', k: 'Markers', sk: 'Markers', d: 'One blood panel, one draw' },
  { v: '48 h', k: 'Most results back', sk: 'Results', d: 'Collection centre near you' },
  { v: 'AHPRA', k: 'Registered doctors', sk: 'Doctors', d: 'A doctor reads every result' },
]

const POSTER: Record<Sex, string> = { male: '/3d/turn/male/00.webp', female: '/3d/turn/female/00.webp' }
const POSTER_SM: Record<Sex, string> = { male: '/3d/turn/male/poster-540.webp', female: '/3d/turn/female/poster-540.webp' }
// The neutral pair: both figures in greyscale, composed at their neutral
// positions and side-faded, pre-rendered so first paint needs no CSS filter.
// Made from the 00 frames with Pillow (12 Nov 2026); 1225 x 1108.
const PAIR = {
  src: '/3d/turn/pair-neutral-900.webp',
  srcSet: '/3d/turn/pair-neutral-600.webp 600w, /3d/turn/pair-neutral-900.webp 900w, /3d/turn/pair-neutral-1225.webp 1225w',
}

const readChosen = (): Who | null => {
  const c = typeof document !== 'undefined' ? document.documentElement.dataset.chosen : undefined
  return c === 'men' || c === 'women' ? c : null
}

export default function StageHero() {
  // The neutral pair is the LCP on every width: preload it in <head>.
  preload(PAIR.src, { as: 'image', fetchPriority: 'high', imageSrcSet: PAIR.srcSet, imageSizes: '(max-width: 899px) 120vw, 60vw' })
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const washRef = useRef<HTMLDivElement>(null)
  const { setAudience } = useAudience()
  const [chosen, setChosen] = useState<Who | null>(null)
  const [mounted, setMounted] = useState(false)
  const [still, setStill] = useState(false)
  const [live, setLive] = useState<Record<Sex, boolean>>({ male: false, female: false })
  // Colour posters are fetched after the page has loaded (or on the pick), so
  // the neutral pair image is the only hero image on first paint.
  const [figsOn, setFigsOn] = useState(false)
  const [lit, setLit] = useState(-1)
  const [away, setAway] = useState(1)
  const face = useRef(0)
  const anim = useRef<{ a?: Animation; t?: number }>({})

  useEffect(() => {
    setMounted(true)
    const c0 = readChosen()
    setChosen(c0)
    const go = () => setFigsOn(true)
    if (c0 || document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true })
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
    setLive({ male: false, female: false })
    prev.a?.cancel(); if (prev.t) window.clearTimeout(prev.t)
    const commit = () => { setAudience(who) }
    if (!frame || !wash || still || html.dataset.chosen === who) {
      html.dataset.chosen = who; commit(); setChosen(who); setFigsOn(true)
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
    setFigsOn(true)
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
  // 11 Nov 2026 (Noah): once picked, the figure faces the camera with its first
  // system lit from the first screen; the scroll then walks the other three.
  const p = useSectionProgress(ref, 'pin')
  const chosenRef = useRef(false)
  chosenRef.current = !!chosen
  useEffect(() => { if (chosen) face.current = 1 }, [chosen])
  useMotionValueEvent(p, 'change', v => {
    face.current = chosenRef.current ? 1 : Math.min(1, v / 0.08)
    const i = v < 0.12 ? 0 : Math.min(SYSTEMS.length - 1, Math.floor((v - 0.12) / 0.19))
    setLit(l => (l === i ? l : i))
  })

  const onAngle = useCallback((a: number) => setAway(a), [])
  const readyM = useCallback(() => setLive(l => ({ ...l, male: true })), [])
  const readyF = useCallback(() => setLive(l => ({ ...l, female: true })), [])

  const href = START_HREF
  const markerShow = sex && (still ? 1 : 1 - away)
  const litNow = sex ? Math.max(0, lit) : -1

  return (
    <section ref={ref} id="hero" className="hx" data-still={still || undefined} data-pin={(!!chosen && !still) || undefined} aria-labelledby="hx-title">
      <div className="hx-pin">
        <div className="hx-frame" ref={frameRef}>
          <div className="hx-wash" ref={washRef} aria-hidden="true" />

          <div className="hx-plate">
            <div className="hx-stage">
              {/* Neutral first paint: one pre-rendered greyscale pair (the LCP). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="hx-pair"
                src={PAIR.src}
                srcSet={PAIR.srcSet}
                sizes="(max-width: 899px) 120vw, 60vw"
                alt="Two glass figures, a man and a woman, side by side in grey"
                width={1225} height={1108}
                fetchPriority="high"
                decoding="async"
              />
              {(['male', 'female'] as Sex[]).map(s => {
                const isOn = sex === s
                return (
                  <div key={s} className="hx-fig" data-sex={s} data-live={(live[s] && !still) || undefined} aria-hidden={!isOn || undefined}>
                    {figsOn && (
                      <picture>
                        <source media="(max-width: 899px)" srcSet={POSTER_SM[s]} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={POSTER[s]}
                          alt={s === 'male' ? 'Glass figure of a man, his blood vessels lit blue from the heart outward' : 'Glass figure of a woman, her blood vessels lit rose from the heart outward'}
                          width={828} height={1108}
                          loading="eager"
                          decoding="async"
                          className="hx-poster"
                        />
                      </picture>
                    )}
                    {mounted && !still && isOn && (
                      <Turntable sex={s} active face={face} onAngle={onAngle} onReady={s === 'male' ? readyM : readyF} />
                    )}
                    {isOn && (
                      <div className="hx-marks" style={{ opacity: markerShow || 0 }} aria-hidden="true">
                        {SYSTEMS.map((m, i) => (
                          <span key={m.id} className="hx-mark" data-on={i <= litNow || undefined} data-now={i === litNow || undefined} style={{ left: `${m.at[s][0] * 100}%`, top: `${m.at[s][1] * 100}%` }}>
                            <span className="hx-mark-dot" />
                            <span className="hx-mark-label">{m.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {/* The pick: grey until chosen, then that colour world. */}
            <div className="hx-pick" role="group" aria-label="Show the panel for">
              {(['men', 'women'] as Who[]).map(w => (
                <button key={w} type="button" className="hx-pick-btn" data-who={w} aria-pressed={chosen === w} onClick={e => choose(w, e)}>
                  For {w}
                </button>
              ))}
            </div>
            <ul className="hx-reads" aria-label="At a glance">
              {READS.map((r, i) => (
                <li key={r.k} data-i={i} className="hero-in" style={{ animationDelay: `${500 + i * 120}ms` }}>
                  <span className="hx-read-v">{r.v}</span>
                  <strong><span className="hx-read-k">{r.k}</span><span className="hx-read-sk">{r.sk}</span></strong>
                  <span>{r.d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hx-copy">
            <p className="hx-kicker hero-in" style={{ animationDelay: '40ms' }}><span aria-hidden="true" />Doctor-led telehealth · Australia-wide</p>
            <h1 id="hx-title" className="hx-h1 hero-in" style={{ animationDelay: '80ms' }}>
              The art of <span className="hx-nw">living better.</span><br /><span className="hx-h1-b">The science of <span className="hx-nw">performing better.</span></span>
            </h1>
            <p className="hx-sub hero-in" style={{ animationDelay: '200ms' }}>
              <span className="hx-when-none">Hormone and metabolic health for men and women. Bloods near you, read by a doctor online. No GP referral.</span>
              <span className="hx-when-men">Hormone and metabolic health for men. One blood panel with your hormone markers, read by a doctor online.</span>
              <span className="hx-when-women">Hormone and metabolic health for women. One blood panel for hormone markers, cycle, iron and thyroid, read by a doctor online.</span>
            </p>
            {/* One action. No prices in the hero (Noah, 28 Oct; 2 Nov). */}
            <div className="hx-actions hero-in" style={{ animationDelay: '300ms' }}>
              <StageCta href={href} tone="dark">Create your free account</StageCta>
              <a className="hx-tel" href={`tel:${CLINIC_PHONE_E164}`}>or call {CLINIC_PHONE_DISPLAY}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
