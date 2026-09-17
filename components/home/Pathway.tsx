'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const

export const STEPS = [
  { when: 'Today',    readout: 'Day 01', title: 'Two-minute assessment', body: 'Answer a handful of questions online. No GP referral, no waiting room. Your doctor reads your intake before you speak.', src: '/photos/intake-sofa.webp', alt: 'A patient completing the Apex intake on her phone at home' },
  { when: '48 hours', readout: 'Day 02', title: 'Bloods, near you', body: 'We issue the referral electronically. Attend any of 4,000+ accredited collection centres. Most results are back within two days.', src: '/photos/pathology-draw.webp', alt: 'Blood collection at an accredited pathology centre' },
  { when: 'Day 5',    readout: 'Day 05', title: 'Your doctor, on the call', body: 'An AHPRA-registered doctor walks the full panel with you by phone or video, and builds a protocol around your numbers.', src: '/photos/telehealth-call.webp', alt: 'A telehealth consultation with an Apex doctor' },
  { when: 'Week 2',   readout: 'Wk 02',  title: 'Protocol at your door', body: 'Anything prescribed is filled by a TGA-compliant Australian pharmacy and delivered discreetly, with instructions in your portal.', src: '/photos/protocol-box-white.webp', alt: 'A plain white Apex delivery box on an entry table' },
  { when: 'Month 3',  readout: 'Mo 03',  title: 'Re-test and review', body: 'Repeat bloods, a structured review with your doctor, and the protocol adjusted to what the numbers now say. Support in between.', src: '/photos/hands-results.webp', alt: 'Results being reviewed on paper' },
]

/**
 * EXPLAIN, told as "here is where you are headed". A vertical timeline of
 * five glass cards; each is out of focus until it arrives (the interstitial
 * pattern from onboarding flows), and the readout on the left counts up
 * with the card in view.
 */
export default function Pathway() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState<boolean[]>(() => STEPS.map(() => !!reduced))
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[]
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        const i = Number((e.target as HTMLElement).dataset.index)
        if (e.isIntersecting) {
          setActive(i)
          setSeen(s => (s[i] ? s : s.map((v, j) => (j === i ? true : v))))
        }
      }
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="pathway" className="band-light section-y mesh-blue" aria-label="How it works">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-24">

          <div className="lg:sticky lg:self-start" style={{ top: 112 }}>
            <p className="t-eyebrow" style={{ marginBottom: 20 }}>How it works</p>
            <RevealText as="h2" className="t-h2" style={{ marginBottom: 20, maxWidth: '14ch' }} text="You’re in the right place. Here’s where you’re headed." />
            <p className="t-body" style={{ color: 'var(--text-secondary)', maxWidth: '44ch', marginBottom: 36 }}>
              Five steps, each with a stated clock. Nothing waits on a waiting room.
            </p>
            <div className="hidden lg:block glass-card" style={{ padding: '26px 28px', maxWidth: 300 }}>
              <span className="t-mono block" style={{ color: 'var(--text-muted)' }}>Where you are</span>
              <motion.span key={active} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="t-readout block mt-3" style={{ fontSize: 64, color: 'var(--text-primary)' }}>
                {STEPS[active].readout}
              </motion.span>
              <span className="block mt-3 text-[14px] font-medium" style={{ color: 'var(--text-secondary)' }}>{STEPS[active].title}</span>
              <div className="flex gap-1.5 mt-5" aria-hidden="true">
                {STEPS.map((_, i) => <span key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i === active ? 28 : 10, background: i <= active ? 'var(--blue)' : 'rgba(15,23,42,0.12)' }} />)}
              </div>
            </div>
          </div>

          <ol className="list-none p-0 m-0 relative">
            <span aria-hidden="true" className="absolute left-[15px] top-6 bottom-6 w-px" style={{ background: 'linear-gradient(180deg, rgba(72,144,247,0.5), rgba(72,144,247,0.08))' }} />
            {STEPS.map((s, i) => (
              <li key={s.when} ref={el => { refs.current[i] = el }} data-index={i} className={`relative pl-12 lg:pl-16 py-5 lg:py-7 blur-in ${seen[i] ? 'is-in' : ''}`}>
                <span aria-hidden="true" className="absolute left-0 top-9 lg:top-11 w-[31px] h-[31px] rounded-full flex items-center justify-center" style={{ background: i <= active ? 'var(--blue)' : '#fff', border: '1px solid rgba(72,144,247,0.4)', boxShadow: '0 0 0 4px #f6f8fa', transition: 'background 0.4s ease' }}>
                  {i < active && <svg viewBox="0 0 12 12" fill="none" width={12} height={12}><path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  {i === active && <span className="w-2 h-2 rounded-full" style={{ background: '#fff' }} />}
                </span>
                <div className="glass-card grid grid-cols-1 md:grid-cols-[1fr_180px] gap-6 items-center" style={{ padding: '24px 26px' }}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="t-mono px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.10)', color: 'var(--color-accent-fg)', fontSize: 9.5 }}>{s.when}</span>
                    </div>
                    <h3 className="t-h3" style={{ marginBottom: 8 }}>{s.title}</h3>
                    <p className="t-body m-0" style={{ color: 'var(--text-secondary)', fontSize: 15.5, maxWidth: '46ch' }}>{s.body}</p>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 180px, 100vw" className="object-cover" />
                  </div>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  )
}
