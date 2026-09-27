'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RevealText from '@/components/motion/RevealText'

type Sex = 'male' | 'female'

type Region = {
  id: string
  label: string
  /** Label in the pillar row under the button. */
  short: string
  /** Tests on the Apex panel. Test names only, never medicines or outcomes. */
  markers: Record<Sex, string>
  /** The first /start question this region answers (t = pathway, why = reason). */
  t: string
  why: string
  whyLabel: string
  /** Position as a fraction of the figure image, per figure. */
  at: Record<Sex, [number, number]>
}

// The four pillars, each placed where the body tells that story. Every one
// maps to a /start pathway (t) and first answer (why), so choosing a system
// on the figure answers the funnel's first question. Test names only.
const REGIONS: Region[] = [
  {
    id: 'hormones', short: 'Hormones', label: 'Hormones',
    markers: { male: 'Testosterone, SHBG, oestradiol, LH, FSH and prolactin', female: 'Oestradiol, progesterone, testosterone, LH, FSH and prolactin' },
    t: 'hormone', why: 'energy', whyLabel: 'hormones',
    at: { male: [0.5, 0.088], female: [0.5, 0.078] },
  },
  {
    id: 'metabolic', short: 'Metabolic', label: 'Metabolic health',
    markers: { male: 'Glucose, liver and kidney function, uric acid and lipids', female: 'Glucose, HbA1c, liver and kidney function and lipids' },
    t: 'weight', why: 'weight', whyLabel: 'metabolic health',
    at: { male: [0.46, 0.545], female: [0.5, 0.49] },
  },
  {
    id: 'recovery', short: 'Recovery', label: 'Recovery',
    markers: { male: 'Testosterone, IGF-1, cortisol and hs-CRP', female: 'Testosterone, cortisol, iron studies and hs-CRP' },
    t: 'recovery', why: 'recovery', whyLabel: 'recovery',
    at: { male: [0.2, 0.39], female: [0.21, 0.39] },
  },
  {
    id: 'longevity', short: 'Longevity', label: 'Longevity',
    markers: { male: 'Cholesterol, triglycerides, hs-CRP, IGF-1 and a full blood count', female: 'Cholesterol, triglycerides, hs-CRP, vitamin D and a full blood count' },
    t: 'longevity', why: 'ageing', whyLabel: 'longevity',
    at: { male: [0.53, 0.405], female: [0.52, 0.365] },
  },
]

const FIGURE: Record<Sex, { src: string; w: number; h: number; alt: string }> = {
  male:   { src: '/photos/anatomy.webp',        w: 1106, h: 1900, alt: 'Illustrated male figure showing the systems the Apex panel measures' },
  female: { src: '/photos/anatomy-female.webp', w: 1073, h: 1900, alt: 'Illustrated female figure showing the systems the Apex panel measures' },
}
// The frame takes the male aspect; the slightly narrower female figure is centred in it.
const BOX_ASPECT = FIGURE.male.w / FIGURE.male.h
const toBox = (sex: Sex, [x, y]: [number, number]): [number, number] => {
  const scale = (FIGURE[sex].w / FIGURE[sex].h) / BOX_ASPECT
  return [(1 - scale) / 2 + x * scale, y]
}

const CYCLE_MS = 3600
const lerp = (a: number, b: number, k: number) => a + (b - a) * k

/**
 * HOOK. One question, one line, one button. The figure is the instrument:
 * a pale body with a scanner ring that rides to whichever system is active,
 * a lens that shows the anatomy only where you look, and a line that runs
 * from that system to the button. Choosing a system carries it into /start.
 */
export default function Hero() {
  const [sex, setSex] = useState<Sex>('male')
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)
  const [reduced, setReduced] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const figRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const pulseRef = useRef<SVGCircleElement>(null)
  const endRef = useRef<SVGCircleElement>(null)
  const ringBackRef = useRef<SVGPathElement>(null)
  const ringFrontRef = useRef<SVGPathElement>(null)
  const ringSvgRefs = useRef<(SVGSVGElement | null)[]>([])

  // Everything the frame loop reads lives in one mutable object, so pointer
  // moves never re-render React.
  const live = useRef({
    px: 0, py: 0, overFig: false, fx: 0.5, fy: 0.5,
    tx: 0, ty: 0, lx: 0.5, ly: 0.3, ringY: 0.3,
    drawStart: 0, active: 0, sex: 'male' as Sex, reduced: false, visible: true,
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => { setReduced(mq.matches); live.current.reduced = mq.matches }
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  useEffect(() => {
    live.current.active = active
    live.current.sex = sex
    live.current.drawStart = performance.now()
  }, [active, sex])

  // Auto-cycle until the visitor chooses. Pauses while the cursor is on the figure.
  useEffect(() => {
    if (picked || reduced) return
    const id = window.setInterval(() => {
      if (document.hidden || !live.current.visible) return
      setActive(a => (a + 1) % REGIONS.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [picked, reduced])

  const choose = useCallback((i: number) => { setActive(i); setPicked(true) }, [])

  // Frame loop: tilt, lens, ring, leader line. Runs only while the hero is on screen.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const io = new IntersectionObserver(([e]) => { live.current.visible = e.isIntersecting }, { threshold: 0 })
    io.observe(hero)
    let raf = 0

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const L = live.current
      if (!L.visible) return
      const fig = figRef.current, stage = stageRef.current, cta = ctaRef.current, path = pathRef.current
      if (!fig || !stage || !cta || !path) return
      const k = L.reduced ? 1 : 0.075

      // Tilt follows the pointer (desktop only, the pointer never moves on touch).
      const targetX = L.overFig || L.px ? L.px : 0
      L.tx = lerp(L.tx, L.reduced ? 0 : targetX, k)
      L.ty = lerp(L.ty, L.reduced ? 0 : L.py, k)
      stage.style.transform = `rotateY(${(L.tx * 7).toFixed(3)}deg) rotateX(${(-L.ty * 4).toFixed(3)}deg) translate3d(${(L.tx * -8).toFixed(2)}px, ${(L.ty * -6).toFixed(2)}px, 0)`

      // Lens: on the cursor while it is over the figure, otherwise on the active system.
      const target = toBox(L.sex, REGIONS[L.active].at[L.sex])
      const lensTo = L.overFig ? [L.fx, L.fy] : target
      L.lx = lerp(L.lx, lensTo[0], L.reduced ? 1 : 0.09)
      L.ly = lerp(L.ly, lensTo[1], L.reduced ? 1 : 0.09)
      L.ringY = lerp(L.ringY, L.ly, L.reduced ? 1 : 0.06)
      const fw = fig.offsetWidth, fh = fig.offsetHeight
      fig.style.setProperty('--lx', `${(L.lx * 100).toFixed(2)}%`)
      fig.style.setProperty('--ly', `${(L.ly * 100).toFixed(2)}%`)
      fig.style.setProperty('--lr', `${Math.round(fw * 0.34)}px`)

      // Scanner ring around the body at the lens height. Back half is drawn
      // under the figure, front half over it. Pointer changes its pitch.
      const cx = fw / 2, cy = L.ringY * fh
      const rx = fw * 0.6, ry = fw * (0.085 + L.ty * 0.035)
      ringBackRef.current?.setAttribute('d', `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`)
      ringFrontRef.current?.setAttribute('d', `M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`)
      ringSvgRefs.current.forEach(s => { if (s) s.style.transform = `rotate(${(L.tx * -3).toFixed(2)}deg)` })

      // Leader line: from the active system to the button.
      const hr = hero.getBoundingClientRect()
      const spot = fig.querySelector<HTMLElement>(`[data-region="${REGIONS[L.active].id}"]`)
      if (!spot) return
      const sr = spot.getBoundingClientRect(), cr = cta.getBoundingClientRect()
      const sx = sr.left + sr.width / 2 - hr.left, sy = sr.top + sr.height / 2 - hr.top
      let ex: number, ey: number, d: string
      const cl = cr.left - hr.left, ct = cr.top - hr.top
      if (sx > cr.right - hr.left + 40) {
        // Figure beside the button (desktop): land on its right edge.
        ex = cr.right - hr.left + 12; ey = ct + cr.height / 2
        const dx = sx - ex
        d = `M ${sx} ${sy} C ${sx - dx * 0.55} ${sy}, ${ex + dx * 0.4} ${ey}, ${ex} ${ey}`
      } else if (sy < ct) {
        // Figure above the button (phone): drop onto its top edge.
        ex = cl + cr.width * 0.5; ey = ct - 10
        const dy = ey - sy
        d = `M ${sx} ${sy} C ${sx} ${sy + dy * 0.6}, ${ex} ${ey - dy * 0.5}, ${ex} ${ey}`
      } else {
        ex = cl + cr.width / 2; ey = cr.bottom - hr.top + 12
        const dy = sy - ey
        d = `M ${sx} ${sy} C ${sx} ${sy - dy * 0.55}, ${ex} ${ey + dy * 0.45}, ${ex} ${ey}`
      }
      path.setAttribute('d', d)
      const len = path.getTotalLength()
      const t = L.reduced ? 1 : Math.min(1, (now - L.drawStart) / 900)
      const drawn = 1 - Math.pow(1 - t, 3)
      path.style.strokeDasharray = `${(len * drawn).toFixed(1)} ${len.toFixed(1)}`
      endRef.current?.setAttribute('cx', String(ex))
      endRef.current?.setAttribute('cy', String(ey))
      endRef.current?.setAttribute('opacity', drawn > 0.98 ? '1' : '0')
      const pulse = pulseRef.current
      if (pulse) {
        if (L.reduced || t < 1) { pulse.setAttribute('opacity', '0') }
        else {
          const p = ((now - L.drawStart - 900) % 2400) / 2400
          const pt = path.getPointAtLength(len * p)
          pulse.setAttribute('cx', pt.x.toFixed(1)); pulse.setAttribute('cy', pt.y.toFixed(1))
          pulse.setAttribute('opacity', (Math.sin(p * Math.PI) * 0.9).toFixed(2))
        }
      }
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const hero = heroRef.current, fig = figRef.current
    if (!hero || !fig) return
    const hr = hero.getBoundingClientRect()
    live.current.px = ((e.clientX - hr.left) / hr.width - 0.5) * 2
    live.current.py = ((e.clientY - hr.top) / hr.height - 0.5) * 2
    const fr = fig.getBoundingClientRect()
    const fx = (e.clientX - fr.left) / fr.width, fy = (e.clientY - fr.top) / fr.height
    live.current.overFig = fx > 0.08 && fx < 0.92 && fy > 0 && fy < 1
    live.current.fx = fx; live.current.fy = fy
  }
  const onPointerLeave = () => { live.current.px = 0; live.current.py = 0; live.current.overFig = false }

  const region = REGIONS[active]
  const href = picked ? `/start?t=${region.t}&why=${region.why}` : '/start'

  return (
    <section
      id="hero"
      ref={heroRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Introduction"
    >
      <div aria-hidden="true" className="absolute pointer-events-none hero-glow" />

      {/* Leader line, drawn in hero coordinates so it can cross the columns. */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 4, overflow: 'visible' }}>
        <defs>
          <linearGradient id="hero-lead" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#4890f7" stopOpacity="0.9" />
            <stop offset="1" stopColor="#1d4fd8" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path ref={pathRef} fill="none" stroke="url(#hero-lead)" strokeWidth="1.25" strokeLinecap="round" style={{ strokeDasharray: '0 9999' }} />
        <circle ref={pulseRef} r="3" fill="#4890f7" opacity="0" />
        <circle ref={endRef} r="3.5" fill="#fff" stroke="#1d4fd8" strokeWidth="1.5" opacity="0" />
      </svg>

      <div className="container-x relative" style={{ zIndex: 3 }}>
        <div className="hero-grid">
          <div className="relative" style={{ zIndex: 5 }}>
            <RevealText
              as="h1"
              className="hero-title"
              delay={0.05}
              segments={[{ text: 'Fine on paper.' }, { text: 'Flat in real life.', accent: true }]}
            />

            <p className="t-lead hero-in hero-sub" style={{ animationDelay: '380ms' }}>
              A standard panel looks for disease. Ours reads 23+ markers for how you actually function, and an AHPRA&#8209;registered doctor builds your plan from them. No GP referral.
            </p>

            <div className="hero-in hero-ctas" style={{ animationDelay: '480ms' }}>
              <a href="#panel" className="hero-secondary link-draw">See what we measure</a>
              <Link ref={ctaRef} href={href} className="btn-primary btn-lg group">
                Start your assessment
                <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

<div className="hero-in hero-pillars" style={{ animationDelay: '580ms' }}>
              <div className="hero-tabs" role="group" aria-label="What we look at">
                {REGIONS.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    className="hero-tab"
                    data-on={i === active || undefined}
                    aria-pressed={i === active}
                    onClick={() => choose(i)}
                  >
                    {r.short}
                    <span className="hero-tab-bar" aria-hidden="true">
                      <span key={`${active}-${picked}`} className="hero-tab-fill" data-run={(!picked && !reduced && i === active) || undefined} style={{ animationDuration: `${CYCLE_MS}ms` }} />
                    </span>
                  </button>
                ))}
              </div>
              <p className="hero-caption" aria-live="polite">
                <strong>{region.label}.</strong> {region.markers[sex]} are on your panel.
                {picked && <span className="block" style={{ color: 'var(--color-accent-fg)' }}>Your assessment will start with {region.whyLabel}.</span>}
              </p>
            </div>
          </div>

          <div className="hero-figure-col hero-in" style={{ animationDelay: '260ms' }}>
            <div className="hero-perspective">
              <div ref={stageRef} className="hero-stage">
                <div
                  ref={figRef}
                  className="hero-figure"
                  style={{ aspectRatio: `${FIGURE.male.w} / ${FIGURE.male.h}` }}
                >
                  <svg ref={el => { ringSvgRefs.current[0] = el }} aria-hidden="true" className="hero-ring">
                    <path ref={ringBackRef} fill="none" stroke="rgba(29,79,216,0.22)" strokeWidth="1" strokeDasharray="2 5" />
                  </svg>

                  {(['male', 'female'] as Sex[]).map(s => (
                    <div key={s} className="hero-figure-layer" style={{ opacity: s === sex ? 1 : 0 }} aria-hidden={s !== sex}>
                      <Image src={FIGURE[s].src} alt={s === sex ? FIGURE[s].alt : ''} fill priority={s === 'male'} sizes="(min-width: 1024px) 460px, 70vw" className="object-contain hero-ghost" />
                      <Image src={FIGURE[s].src} alt="" fill sizes="(min-width: 1024px) 460px, 70vw" className="object-contain hero-vivid" />
                    </div>
                  ))}

                  <svg ref={el => { ringSvgRefs.current[1] = el }} aria-hidden="true" className="hero-ring" style={{ zIndex: 3 }}>
                    <defs>
                      <linearGradient id="hero-ring-front" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#1d4fd8" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#1d4fd8" stopOpacity="0.7" />
                        <stop offset="1" stopColor="#1d4fd8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path ref={ringFrontRef} fill="none" stroke="url(#hero-ring-front)" strokeWidth="1.5" />
                  </svg>

                  {REGIONS.map((r, i) => {
                    const [x, y] = toBox(sex, r.at[sex])
                    const on = i === active
                    return (
                      <button
                        key={r.id}
                        type="button"
                        data-region={r.id}
                        onMouseEnter={() => choose(i)}
                        onFocus={() => choose(i)}
                        onClick={() => choose(i)}
                        aria-pressed={on && picked}
                        aria-label={`${r.label}: ${r.markers[sex]}`}
                        className="hero-spot"
                        data-on={on || undefined}
                        style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
                      >
                        <span className="hero-spot-dot" aria-hidden="true" />
                        <span className="hero-spot-tag" aria-hidden="true">{r.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="hero-sex" role="group" aria-label="Show figure for">
              {(['male', 'female'] as Sex[]).map(s => (
                <button key={s} type="button" onClick={() => setSex(s)} aria-pressed={sex === s} data-on={sex === s || undefined}>
                  {s === 'male' ? 'Men' : 'Women'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <dl className="hero-proof hero-in" style={{ animationDelay: '700ms' }}>
          <div><dt>23+</dt><dd>markers on every panel</dd></div>
          <div><dt>4,000+</dt><dd>accredited collection centres</dd></div>
          <div><dt>48 hours</dt><dd>most results back</dd></div>
        </dl>
        <p className="hero-foot">
          For Australian adults 18 and over. Illustrative figure; every marker named is on the Apex panel. General information, not medical advice.
        </p>
      </div>
    </section>
  )
}
