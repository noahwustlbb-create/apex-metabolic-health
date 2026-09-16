'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export const STEPS = [
  {
    n: '01',
    title: 'Create your account',
    clock: '2 minutes',
    body: 'Register online. No GP referral, no waiting room. Your intake is a short structured form your doctor reads before you speak.',
    src: '/photos/intake-sofa.webp',
    alt: 'A patient completing the Apex intake on her phone at home',
  },
  {
    n: '02',
    title: 'Pathology, near you',
    clock: 'Results in 48 hours',
    body: 'We issue the referral electronically. Attend any of 4,000+ accredited collection centres across Australia. Most results are back within two days.',
    src: '/photos/pathology-draw.webp',
    alt: 'Blood collection at an accredited pathology centre',
  },
  {
    n: '03',
    title: 'Your doctor, on the call',
    clock: '45 to 60 minutes',
    body: 'An AHPRA-registered doctor reviews the full panel with you by phone or video and builds a protocol around your numbers, not a template.',
    src: '/photos/telehealth-call.webp',
    alt: 'A telehealth consultation with an Apex doctor',
  },
  {
    n: '04',
    title: 'Protocol and reviews',
    clock: 'Every 3 months',
    body: 'Scripts are filled by a TGA-compliant Australian pharmacy and delivered discreetly. Structured reviews every three months, with support in between.',
    src: '/photos/protocol-box.webp',
    alt: 'A discreet Apex delivery on a kitchen bench',
  },
]

/**
 * EXPLAIN. The pathway as a locked split: the heading and photograph hold
 * still on the left while the four steps scroll past on the right, and the
 * photograph swaps to the step that is in view. On a phone each step carries
 * its own image inline.
 */
export default function Pathway() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[]
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="pathway" className="band-light section-y" aria-label="How it works">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24">

          {/* Left: holds still on desktop. */}
          <div className="lg:sticky lg:self-start" style={{ top: 112 }}>
            <p className="t-eyebrow" style={{ marginBottom: 20 }}>How it works</p>
            <h2 className="t-h2" style={{ marginBottom: 20, maxWidth: '14ch' }}>From intake to protocol in four steps.</h2>
            <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '44ch', marginBottom: 36 }}>
              Every step has a stated clock. Nothing waits on a waiting room.
            </p>

            <div className="relative hidden lg:block rounded-2xl overflow-hidden" style={{ aspectRatio: '4 / 5', maxHeight: '58vh', background: '#dfe3e8' }} aria-hidden="true">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={STEPS[active].src}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="absolute inset-0"
                >
                  <Image src={STEPS[active].src} alt="" fill sizes="(min-width: 1024px) 480px, 0px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute left-5 bottom-5 t-mono" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Step {STEPS[active].n} · {STEPS[active].clock}
              </div>
            </div>
          </div>

          {/* Right: the steps. Tall on desktop so scroll drives the swap. */}
          <ol className="list-none p-0 m-0">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                ref={el => { stepRefs.current[i] = el }}
                data-index={i}
                className="grid grid-cols-[52px_1fr] gap-4 lg:gap-8 py-10 lg:py-16 xl:py-20"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span className="t-mono pt-2" style={{ color: i === active ? 'var(--blue)' : 'var(--text-muted)', fontSize: 12, transition: 'color 0.3s ease' }}>{s.n}</span>
                <div>
                  <div className="lg:hidden relative rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '4 / 5' }}>
                    <Image src={s.src} alt={s.alt} fill sizes="100vw" className="object-cover" />
                  </div>
                  <h3 className="t-h3" style={{ marginBottom: 10 }}>{s.title}</h3>
                  <p className="t-mono" style={{ color: 'var(--blue)', marginBottom: 14 }}>{s.clock}</p>
                  <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '50ch' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  )
}
