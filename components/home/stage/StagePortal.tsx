'use client'

import { useRef } from 'react'
import Image from '@/components/audience/Img'
import { useStageArt } from './StageTone'
import { motion, motionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
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

function Gauge({ pct, draw }: { pct: number; draw?: MotionValue<number> }) {
  const r = 30, c = Math.PI * r
  const len = useTransform(draw ?? motionValue(1), v => v * pct)
  return (
    <svg viewBox="0 0 80 46" className="stage-gauge" aria-hidden="true">
      <path d="M10 40a30 30 0 0 1 60 0" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="6" strokeLinecap="round" />
      {draw
        ? <motion.path d="M10 40a30 30 0 0 1 60 0" fill="none" stroke="url(#stage-g)" strokeWidth="6" strokeLinecap="round" style={{ pathLength: len }} />
        : <path d="M10 40a30 30 0 0 1 60 0" fill="none" stroke="url(#stage-g)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />}
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
  // BioTrack website reel (12345 now.mp4): the device keeps growing until it
  // nearly fills the band, then the gauges fill, the trend draws and the rows
  // land one by one.
  const zoom = useTransform(p, [0.3, 0.6], [1, 1.06])
  const draw = useTransform(p, [0.32, 0.52], [0, 1])
  const trend = useTransform(p, [0.4, 0.62], [0, 1])
  const rowIn = [0, 1, 2, 3, 4].map(i => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    opacity: useTransform(p, [0.42 + i * 0.03, 0.48 + i * 0.03], [0, 1]),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    x: useTransform(p, [0.42 + i * 0.03, 0.48 + i * 0.03], [14, 0]),
  }))

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
          <motion.div className="stage-device-screen" style={reduced ? undefined : { scale: zoom }}>
            <aside className="stage-dash-rail" aria-hidden="true">
              {[0, 1, 2, 3, 4].map(i => <span key={i} data-on={i === 0 || undefined} />)}
            </aside>
            <div className="stage-dash-figure" aria-hidden="true">
              <motion.div className="stage-dash-img" style={reduced ? undefined : { opacity: body }}>
                <Image src={art('body-male')} alt="" fill sizes="(min-width: 900px) 34vw, 90vw" className="object-cover object-top" />
              </motion.div>
              {!reduced && (
                <motion.div className="stage-dash-img" style={{ opacity: heart }}>
                  <Image src={art('tube')} alt="" fill sizes="(min-width: 900px) 34vw, 90vw" className="object-cover" />
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
                    <Gauge pct={g.pct} draw={reduced ? undefined : draw} />
                    <span className="stage-readout stage-dash-v">{g.v}</span>
                    <span className="stage-dash-of">{g.of}</span>
                  </div>
                ))}
              </div>
              <div className="stage-dash-card stage-dash-trend" aria-hidden="true">
                <span className="stage-dash-k">Trend across panels</span>
                <svg viewBox="0 0 300 70" preserveAspectRatio="none">
                  <path d="M0 58 L300 58" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 5" />
                  <motion.path d="M0 50 C30 46 45 30 70 34 S115 52 140 40 S185 16 210 22 S260 34 300 12" fill="none" stroke="var(--stage-blue)" strokeWidth="2.4" strokeLinecap="round" style={reduced ? undefined : { pathLength: trend }} />
                  <motion.path d="M0 60 C40 58 60 50 90 52 S150 44 180 46 S250 38 300 36" fill="none" stroke="var(--stage-gauge)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" style={reduced ? undefined : { pathLength: trend }} />
                </svg>
              </div>
              <div className="stage-dash-card stage-dash-table" role="table" aria-label="Sample markers">
                <div className="stage-dash-tr stage-dash-th" role="row">
                  <span role="columnheader">Marker</span><span role="columnheader">System</span><span role="columnheader">Status</span>
                </div>
                {ROWS.map((r, i) => (
                  <motion.div key={r.m} className="stage-dash-tr" role="row" style={reduced ? undefined : rowIn[i]}>
                    <span role="cell">{r.m}</span>
                    <span role="cell" className="stage-muted">{r.r}</span>
                    <span role="cell"><span className="stage-status" data-s={r.s === 'Discuss' ? 'discuss' : 'ok'}>{r.s}</span></span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        <p className="stage-night-note">Sample layout with invented values, not a patient. Your report is written by your doctor from your own results. A consultation never guarantees a prescription.</p>
      </div>
    </section>
  )
}
