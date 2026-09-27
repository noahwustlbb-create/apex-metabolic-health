'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useStageArt } from './StageTone'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import StageCta from './StageCta'

/** Invented values. The section says so twice; nothing here is a patient. */
const GAUGES = [
  { k: 'Hormones', v: '72', of: 'system score', pct: 0.72 },
  { k: 'Metabolic', v: '58', of: 'system score', pct: 0.58 },
  { k: 'Longevity', v: '81', of: 'system score', pct: 0.81 },
]
const ROWS = [
  { m: 'Total testosterone', r: 'Hormones',  s: 'In range' },
  { m: 'HbA1c',              r: 'Metabolic', s: 'Discuss' },
  { m: 'hs-CRP',             r: 'Longevity', s: 'In range' },
  { m: 'Ferritin',           r: 'Recovery',  s: 'Discuss' },
  { m: 'Triglycerides',      r: 'Metabolic', s: 'In range' },
]

function Gauge({ pct }: { pct: number }) {
  const r = 30, c = Math.PI * r
  return (
    <svg viewBox="0 0 80 46" className="stage-gauge" aria-hidden="true">
      <path d="M10 40a30 30 0 0 1 60 0" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="6" strokeLinecap="round" />
      <path d="M10 40a30 30 0 0 1 60 0" fill="none" stroke="url(#stage-g)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
      <defs>
        <linearGradient id="stage-g" x1="0" x2="1">
          <stop offset="0" stopColor="var(--stage-blue)" />
          <stop offset="1" stopColor="var(--stage-gauge)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/**
 * PROVE, shown: the portal on a night band. The device rises into place and
 * its figure hands from body to heart as you scroll, like the BioTrack
 * clinician section. Sample data, labelled.
 */
export default function StagePortal() {
  const art = useStageArt()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const p = useSectionProgress(ref, 'cross')
  const deviceY = useTransform(p, [0.05, 0.4], [120, 0])
  const deviceRot = useTransform(p, [0.05, 0.4], [10, 0])
  const deviceScale = useTransform(p, [0.05, 0.4], [0.92, 1])
  const body = useTransform(p, [0.48, 0.6], [1, 0])
  const heart = useTransform(p, [0.5, 0.62], [0, 1])

  return (
    <section ref={ref} id="portal" className="stage-night" aria-labelledby="portal-title">
      <div className="container-x">
        <div className="stage-night-head">
          <h2 id="portal-title" className="stage-h2">
            Your results,<br /><span className="stage-muted">in your portal.</span>
          </h2>
          <div>
            <p className="stage-lead">
              Every marker grouped by system and flagged where it matters. Your doctor explains it on the call, and your plan lives next to it.
            </p>
            <StageCta href="/start" tone="dark">Start your assessment</StageCta>
          </div>
        </div>

        <motion.div
          className="stage-device"
          style={reduced ? undefined : { y: deviceY, rotateX: deviceRot, scale: deviceScale, transformPerspective: 1600 }}
        >
          <div className="stage-device-screen">
            <aside className="stage-dash-rail" aria-hidden="true">
              {[0, 1, 2, 3, 4].map(i => <span key={i} data-on={i === 0 || undefined} />)}
            </aside>
            <div className="stage-dash-figure" aria-hidden="true">
              <motion.div className="stage-dash-img" style={reduced ? undefined : { opacity: body }}>
                <Image src={art('body-male')} alt="" fill sizes="(min-width: 900px) 34vw, 90vw" className="object-cover object-top" />
              </motion.div>
              {!reduced && (
                <motion.div className="stage-dash-img" style={{ opacity: heart }}>
                  <Image src={art('heart')} alt="" fill sizes="(min-width: 900px) 34vw, 90vw" className="object-cover" />
                </motion.div>
              )}
            </div>
            <div className="stage-dash-main">
              <div className="stage-dash-top">
                <p className="stage-dash-title">Your panel<span className="stage-muted"> · results</span></p>
                <span className="stage-pill">Sample report</span>
              </div>
              <div className="stage-dash-gauges">
                {GAUGES.map(g => (
                  <div key={g.k} className="stage-dash-card">
                    <span className="stage-dash-k">{g.k}</span>
                    <Gauge pct={g.pct} />
                    <span className="stage-readout stage-dash-v">{g.v}</span>
                    <span className="stage-dash-of">{g.of}</span>
                  </div>
                ))}
              </div>
              <div className="stage-dash-card stage-dash-table" role="table" aria-label="Sample markers">
                <div className="stage-dash-tr stage-dash-th" role="row">
                  <span role="columnheader">Marker</span><span role="columnheader">System</span><span role="columnheader">Status</span>
                </div>
                {ROWS.map(r => (
                  <div key={r.m} className="stage-dash-tr" role="row">
                    <span role="cell">{r.m}</span>
                    <span role="cell" className="stage-muted">{r.r}</span>
                    <span role="cell"><span className="stage-status" data-s={r.s === 'Discuss' ? 'discuss' : 'ok'}>{r.s}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <p className="stage-night-note">Sample layout with invented values, not a patient. Your report is written by your doctor from your own results. A consultation never guarantees a prescription.</p>
      </div>
    </section>
  )
}
