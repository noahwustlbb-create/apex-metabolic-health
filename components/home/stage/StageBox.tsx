'use client'

import { useEffect, useRef, useState } from 'react'
import NextImage from 'next/image'
import { motion, useTransform } from 'framer-motion'
import { useSectionProgress } from './useSectionProgress'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * THE APEX BOX (restored 11 Nov 2026, Noah: "we used to have an animation of
 * an Apex delivery box; it's not there anymore when you scroll"). The motion
 * and the copy are the 29 Sep hand-off (PR #36 + #40, commit 42ba5720),
 * removed from the hero when the Men / Women hero landed (PR #43). It now has
 * its own section right after the hero and plays on phones too: a
 * scroll-linked turn in depth as it rises, then it keeps turning slowly.
 * The render shows the Apex logo and "Measure first. Then treat.", so the copy
 * makes no "plain pack" claim and carries an ILLUSTRATIVE RENDER caption.
 * No medicine names, no needles (TGA advertising rules).
 *
 * The fixed pill (StageHero) carries Start here; the band adds the call line.
 * The server renders the box flat and visible; the turn starts after mount,
 * and never under reduced motion.
 */
export default function StageBox() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionSafe()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const p = useSectionProgress(ref, 'cross')
  const spin = useTransform(p, [0.12, 0.46, 1], [-70, 0, 18])
  const tilt = useTransform(p, [0.12, 0.42, 1], [-16, 2, 5])
  const rise = useTransform(p, [0.12, 0.44], ['18%', '0%'])
  const scale = useTransform(p, [0.12, 0.48], [0.9, 1])
  const chips = useTransform(p, [0.3, 0.46], [0, 1])
  const live = mounted && !reduced

  return (
    <section ref={ref} className="st-box" aria-labelledby="st-box-title">
      <div className="st-box-head container-x">
        <p className="al-k">→ Doctor-led, start to finish</p>
        <h2 id="st-box-title" className="al-h2">Measure first. Then treat.</h2>
      </div>
      <div className="st-box-stage">
        <motion.div
          className="st-box-fig"
          style={live ? { rotateY: spin, rotate: tilt, y: rise, scale, transformPerspective: 1100 } : undefined}
        >
          <NextImage
            src="/3d/product/box-tall-grey.jpg"
            alt="A white Apex Metabolic Health box printed with the Apex logo and Measure first. Then treat."
            fill
            sizes="(min-width: 900px) 880px, 92vw"
            className="st-box-img"
          />
        </motion.div>
        <motion.span className="stage-float st-box-float st-box-float-a st-box-chip" style={live ? { opacity: chips } : undefined}>
          <svg className="st-box-chip-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2.8 20.5 7.3v9.4L12 21.2 3.5 16.7V7.3Z" />
            <path d="M3.5 7.3 12 11.8l8.5-4.5M12 11.8v9.4M7.8 5 16.2 9.6" />
          </svg>
          <span className="st-box-chip-txt">
            <span className="stage-float-k">Medication dispensed discreetly</span>
            <span className="stage-float-v">via approved cGMP partnering pharmacies Australia-wide.</span>
          </span>
        </motion.span>
        <motion.span className="stage-float st-box-float st-box-float-b st-box-chip" style={live ? { opacity: chips } : undefined}>
          <svg className="st-box-chip-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11h18c0 4.4-3.6 8-8 8h-2c-4.4 0-8-3.6-8-8Z" />
            <path d="M9 19.4V21h6v-1.6M15.5 11l4-7.5a1.4 1.4 0 0 1 2.4 1.4L17.6 11" />
            <path d="M12 12.8v4.4M9.8 15h4.4" />
          </svg>
          <span className="st-box-chip-txt">
            <span className="stage-float-k">Approved <span style={{ textTransform: 'none' }}>cGMP</span></span>
            <span className="stage-float-v">Partnering pharmacies Australia-wide.</span>
          </span>
        </motion.span>
      </div>
      <div className="stage-actions st-box-actions">
        <a className="stage-link st-box-call" href={`tel:${CLINIC_PHONE_E164}`}>Call {CLINIC_PHONE_DISPLAY}</a>
      </div>
    </section>
  )
}
