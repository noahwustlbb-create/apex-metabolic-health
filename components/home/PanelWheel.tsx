'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/**
 * Everlab's biomarker wheel / Lucis's body systems, for the real Apex panel:
 * one ring segment per group, one dot per marker. The ring draws itself in,
 * then walks the groups on its own until the visitor picks one.
 */
type Group = [string, string]
const ease = [0.22, 1, 0.36, 1] as const

const split = (s: string) => s.split(/,\s*/).map(x => x.trim()).filter(Boolean)

export default function PanelWheel({ men, women }: { men: Group[]; women: Group[] }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [sex, setSex] = useState<'men' | 'women'>('men')
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)

  const groups = useMemo(() => (sex === 'men' ? men : women).map(([name, list]) => ({ name, markers: split(list) })), [sex, men, women])
  const total = groups.reduce((n, g) => n + g.markers.length, 0)

  // Walk the groups until the visitor takes over.
  useEffect(() => {
    if (!inView || touched || reduced) return
    const t = setInterval(() => setActive(a => (a + 1) % groups.length), 2600)
    return () => clearInterval(t)
  }, [inView, touched, reduced, groups.length])

  const pick = (i: number) => { setTouched(true); setActive(i) }
  const flip = (s: 'men' | 'women') => { setSex(s); setActive(0) }

  // Geometry: segments sized by marker count, a small gap between groups.
  const C = 200, R = 150, RD = 176, GAP = 0.12
  const arcs = useMemo(() => {
    let a0 = -Math.PI / 2
    const full = Math.PI * 2 - GAP * groups.length
    return groups.map(g => {
      const span = (g.markers.length / total) * full
      const start = a0, end = a0 + span
      a0 = end + GAP
      return { start, end }
    })
  }, [groups, total])
  const pt = (r: number, a: number) => [C + r * Math.cos(a), C + r * Math.sin(a)].map(n => Math.round(n * 100) / 100)
  const arcPath = (s: number, e: number) => {
    const [x1, y1] = pt(R, s), [x2, y2] = pt(R, e)
    return `M${x1} ${y1} A${R} ${R} 0 ${e - s > Math.PI ? 1 : 0} 1 ${x2} ${y2}`
  }

  const g = groups[active]
  let dotIndex = 0

  return (
    <div ref={ref} className="pw">
      <div className="pw-wheel">
        <svg viewBox="0 0 400 400" role="img" aria-label={`${total} markers on the ${sex === 'men' ? 'men’s' : 'women’s'} panel, in ${groups.length} groups`}>
          {arcs.map((a, i) => (
            <motion.path key={`${sex}-${i}`} d={arcPath(a.start, a.end)} fill="none" strokeWidth={i === active ? 26 : 18} strokeLinecap="butt"
              stroke={i === active ? 'var(--stage-blue)' : 'color-mix(in srgb, var(--stage-blue) 28%, #d4e8f8)'}
              initial={reduced ? false : { pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
              style={{ cursor: 'pointer', transition: 'stroke 0.4s ease, stroke-width 0.4s ease' }}
              onClick={() => pick(i)} />
          ))}
          {arcs.map((a, i) => groups[i].markers.map((m, j) => {
            const n = groups[i].markers.length
            const ang = a.start + ((j + 0.5) / n) * (a.end - a.start)
            const [x, y] = pt(RD, ang)
            const k = dotIndex++
            return (
              <motion.circle key={`${sex}-${i}-${j}`} cx={x} cy={y} r={i === active ? 4.2 : 3}
                fill={i === active ? 'var(--stage-blue)' : 'var(--stage-ink-muted)'} fillOpacity={i === active ? 1 : 0.35}
                initial={reduced ? false : { opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.9 + k * 0.025, ease }}>
                <title>{m}</title>
              </motion.circle>
            )
          }))}
        </svg>
        <div className="pw-centre" aria-live="polite">
          <span className="stage-readout pw-n">{g.markers.length}</span>
          <span className="pw-g">{g.name}</span>
          <span className="pw-of">of {total} markers</span>
        </div>
      </div>

      <div className="pw-side">
        <div className="pw-toggle" role="tablist" aria-label="Panel">
          {(['men', 'women'] as const).map(s => (
            <button key={s} role="tab" aria-selected={sex === s} className={sex === s ? 'is-on' : ''} onClick={() => flip(s)}>{s === 'men' ? 'Men’s panel' : 'Women’s panel'}</button>
          ))}
        </div>
        <ul className="pw-groups">
          {groups.map((x, i) => (
            <li key={`${sex}-${x.name}`}>
              <button className={i === active ? 'is-on' : ''} aria-pressed={i === active} onClick={() => pick(i)}>
                <span>{x.name}</span><span className="pw-count">{x.markers.length}</span>
              </button>
              {i === active && (
                <motion.p className="pw-list" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }}>
                  {x.markers.join(', ')}
                </motion.p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
