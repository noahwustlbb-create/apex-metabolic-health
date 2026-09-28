'use client'

import { useRef } from 'react'
import Image from '@/components/audience/Img'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Hims opens on the problem, not the product. Each tile drops the visitor into
// /start already on that pathway. Areas only, never a medicine.
const TILES = [
  { t: 'hormone',   why: 'energy',   label: 'Energy and drive',     sub: 'Hormones',            art: '/protocols/hormone.jpg' },
  { t: 'weight',    why: 'weight',   label: 'Weight that won’t move', sub: 'Metabolic health', art: '/protocols/weight.jpg' },
  { t: 'sexual',    why: 'libido',   label: 'Sex and confidence',   sub: 'Sexual health',       art: '/protocols/sexual.jpg' },
  { t: 'recovery',  why: 'recovery', label: 'Slow recovery',        sub: 'Recovery and repair', art: '/protocols/recovery.jpg' },
  { t: 'longevity', why: 'ageing',   label: 'Ageing well',          sub: 'Longevity',           art: '/protocols/longevity.jpg' },
  { t: 'skinhair',  why: 'unsure',   label: 'Hair and skin',        sub: 'Skin and hair',       art: '/protocols/hair.jpg' },
]

// Ahead Health's other door: start from where you are in life, not a symptom.
const STAGES = [
  { why: 's30', label: 'Late 30s', sub: 'Getting ahead of it' },
  { why: 's40', label: 'Mid 40s', sub: 'Noticing the shift' },
  { why: 's50', label: '50s and on', sub: 'Staying strong' },
]

export default function StageStartTiles() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return (
    <section ref={ref} className="st-tiles container-x" aria-labelledby="st-tiles-title">
      <div className="st-tiles-head">
        <h2 id="st-tiles-title" className="stage-h2">What brings you here?<br /><span className="stage-muted">Start with that.</span></h2>
        <p className="stage-lead">Pick what is bothering you. The 2-minute check starts there, and one blood panel covers everything you add.</p>
      </div>
      <div className="st-tiles-grid">
        {TILES.map((x, i) => (
          <motion.div key={x.t} initial={reduced ? false : { opacity: 0, y: 40, filter: 'blur(10px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}>
            <Link href={`/start?t=${x.t}&why=${x.why}`} className="st-tile">
              <span className="st-tile-art" aria-hidden="true"><Image src={x.art} alt="" fill sizes="(min-width: 900px) 30vw, 90vw" className="object-cover" /></span>
              <span className="st-tile-text">
                <span className="st-tile-sub">{x.sub}</span>
                <span className="st-tile-label">{x.label}</span>
              </span>
              <span className="st-tile-arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div className="st-stages" initial={reduced ? false : { opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6, ease }}>
        <span className="st-stages-k">Or start from where you are in life</span>
        {STAGES.map(x => (
          <Link key={x.why} href={`/start?why=${x.why}`} className="st-stage">
            <strong>{x.label}</strong><span>{x.sub}</span>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
