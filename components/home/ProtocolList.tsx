'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { PROTOCOLS } from '@/components/ProtocolGrid'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * OFFER. The protocol index.
 *
 * One row per pathway, and the row is the same object at every width: index
 * top-left, thumbnail top-right, name, then code and coverage. No bento, no
 * hover-to-open. The desktop version is the phone version, by request.
 */
export default function ProtocolList() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="treatments" className="section-y" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }} aria-label="Choose your protocol">
      <div className="container-tight">

        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 md:mb-14">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease }}
            className="t-h2"
          >
            Choose your protocol.
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="t-mono text-right max-w-[260px] leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Nine pathways, one doctor-led standard. Every protocol starts with your bloods.
          </motion.p>
        </div>

        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
          {PROTOCOLS.map((p, i) => (
            <motion.li
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.1 + i * 0.06, ease }}
            >
              <a
                href={p.href}
                aria-label={`View ${p.label} protocol`}
                className="protocol-row group flex flex-col justify-between rounded-2xl px-4 py-3.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ minHeight: 84, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outlineColor: 'var(--blue)' }}
              >
                <span className="flex items-start justify-between">
                  <span className="t-mono" style={{ color: 'var(--text-secondary)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="relative w-[26px] h-[26px] rounded-md overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }} aria-hidden="true">
                    <Image src={p.image} alt="" fill sizes="26px" className="protocol-thumb object-cover" />
                  </span>
                </span>
                <span className="flex items-end justify-between gap-4 min-w-0">
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-tight truncate" style={{ letterSpacing: '-0.01em' }}>
                      {p.label}
                      {p.tag && (
                        <span className="t-mono ml-2 align-middle" style={{ fontSize: 9, color: 'var(--blue)' }}>{p.tag}</span>
                      )}
                    </span>
                    <span className="t-mono block mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{p.code} · {p.sub}</span>
                  </span>
                  <span className="protocol-arrow hidden md:inline-flex items-center gap-1.5 text-[12px] font-medium flex-shrink-0" style={{ color: 'var(--blue)' }} aria-hidden="true">
                    View
                    <svg viewBox="0 0 16 16" fill="none" width={13} height={13}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </span>
              </a>
            </motion.li>
          ))}

          <motion.li
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.1 + PROTOCOLS.length * 0.06, ease }}
          >
            <a
              href="/start"
              className="group flex flex-col justify-between rounded-2xl px-4 py-3.5 no-underline"
              style={{ minHeight: 84, background: 'var(--text-primary)', color: 'var(--bg)' }}
            >
              <span className="flex items-start justify-between">
                <span className="t-mono opacity-60">Not sure?</span>
                <span className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ border: '1px solid currentColor', opacity: 0.7 }} aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M4 10L10 4M5.5 4H10v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
              <span>
                <span className="block text-[15px] font-semibold leading-tight" style={{ letterSpacing: '-0.01em' }}>Take the two-minute assessment</span>
                <span className="t-mono block mt-1 opacity-60">We match you to a pathway</span>
              </span>
            </a>
          </motion.li>
        </ul>
      </div>
    </section>
  )
}
