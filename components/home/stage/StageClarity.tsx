'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useStageArt } from './StageTone'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

type Card = { tone: 'night' | 'blue' | 'ice' | 'mist'; title: string; body: string; icon: 'drop' | 'doctor' | 'grid' | 'plan'; lift: number }

// Four tall cards in four materials, the BioTrack "Clarity and Trust" row.
// Every line is something the clinic already states elsewhere on the site.
const CARDS: Card[] = [
  { tone: 'night', icon: 'drop',   lift: 0,  title: 'Bloods first',            body: '23+ markers, collected at one of 4,000+ accredited centres near you.' },
  { tone: 'blue',  icon: 'doctor', lift: 44, title: 'Read by a doctor',        body: 'An AHPRA-registered doctor reviews every result with you on the call.' },
  { tone: 'ice',   icon: 'grid',   lift: 10, title: 'Four systems, one panel', body: 'Hormones, metabolic health, recovery and longevity, in plain English.' },
  { tone: 'mist',  icon: 'plan',   lift: 56, title: 'Your plan, in your portal', body: 'Results, your plan and follow-ups, kept in one place.' },
]

function Icon({ name }: { name: Card['icon'] }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      {name === 'drop' && <path {...p} d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" />}
      {name === 'doctor' && <><circle {...p} cx="12" cy="8" r="3.5" /><path {...p} d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5M12 14.5V18m-1.8-1.8h3.6" /></>}
      {name === 'grid' && <><rect {...p} x="4" y="4" width="7" height="7" rx="2" /><rect {...p} x="13" y="4" width="7" height="7" rx="2" /><rect {...p} x="4" y="13" width="7" height="7" rx="2" /><rect {...p} x="13" y="13" width="7" height="7" rx="2" /></>}
      {name === 'plan' && <><rect {...p} x="5" y="3.5" width="14" height="17" rx="3" /><path {...p} d="M9 9h6M9 12.5h6M9 16h3.5" /></>}
    </svg>
  )
}

/** PROVE, the promise in four objects. Cards rise in, frosted, then sharpen. */
export default function StageClarity() {
  const art = useStageArt()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section ref={ref} className="stage-clarity" aria-labelledby="clarity-title">
      <div className="container-x">
        <motion.h2
          id="clarity-title"
          className="stage-h2 stage-center"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          Built for clarity<br /><span className="stage-muted">and trust.</span>
        </motion.h2>
        <motion.p
          className="stage-lead stage-center"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          What every Apex member gets before a plan is written.
        </motion.p>

        <div className="stage-cards">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.title}
              className="stage-card"
              data-tone={c.tone}
              style={{ ['--lift' as string]: `${c.lift}px` }}
              initial={reduced ? false : { opacity: 0, y: 90, filter: 'blur(14px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
            >
              <span className="stage-card-icon"><Icon name={c.icon} /></span>
              {c.tone === 'blue' && (
                <span className="stage-card-art" aria-hidden="true">
                  <Image src="/3d/drop.png" alt="" fill sizes="220px" className="object-contain" />
                </span>
              )}
              {c.tone === 'ice' && (
                <span className="stage-card-art stage-card-art-heart" aria-hidden="true">
                  <Image src={art('heart')} alt="" fill sizes="260px" className="object-cover" />
                </span>
              )}
              <div className="stage-card-text">
                <h3 className="stage-card-title">{c.title}</h3>
                <p className="stage-card-body">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
