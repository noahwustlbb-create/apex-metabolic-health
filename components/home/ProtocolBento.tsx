'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, LayoutGroup, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { PROTOCOLS, type Protocol } from '@/components/ProtocolGrid'
import RevealText from '@/components/motion/RevealText'

const ease = [0.22, 1, 0.36, 1] as const
const ROW = 88
const ROW_MOBILE = 108

/**
 * OFFER. The protocol bento, interactive at every width.
 *
 * Desktop: three columns, two cards open at rest, the card under the cursor
 * opens and the rest fold to compact rows. Phone: two columns, one card open;
 * a tap opens a card, a second tap on the open card goes to the protocol.
 * Compact cards drift gently; the open card tilts toward the cursor.
 */
export default function ProtocolBento() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (min-width: 1024px)')
    const update = () => { setHover(mq.matches); setActive(null) }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const isFeatured = useCallback((id: string) => {
    if (active) return active === id
    return hover ? id === 'hormone' || id === 'longevity' : id === 'hormone'
  }, [active, hover])

  return (
    <section ref={ref} id="treatments" className="section-y relative" style={{ background: 'var(--bg)' }} aria-label="Choose your protocol">
      <div className="container-tight">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8 md:mb-12">
          <RevealText as="h2" className="t-h2" text="Choose your protocol." />
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="t-mono text-right max-w-[260px] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Nine pathways, one doctor-led standard. {hover ? 'Hover a card to open it.' : 'Tap a card to open it.'}
          </motion.p>
        </div>

        <LayoutGroup id="bento">
          <ul
            className="list-none p-0 m-0 grid grid-cols-2 lg:grid-cols-3 gap-2.5 auto-rows-[108px] lg:auto-rows-[88px]"
            style={{ gridAutoFlow: 'dense' }}
            onMouseLeave={() => { if (hover) setActive(null) }}
          >
            {PROTOCOLS.map((p, i) => {
              const featured = isFeatured(p.id)
              return (
                <motion.li
                  key={p.id}
                  layout={reduced ? false : 'position'}
                  transition={{ layout: { duration: 0.5, ease } }}
                  initial={reduced ? false : { opacity: 0, y: 26 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  className={`min-w-0 ${featured ? 'col-span-2 lg:col-span-1' : 'col-span-1'} ${!featured && !reduced ? `float-${['a', 'b', 'c'][i % 3]}` : ''}`}
                  style={{ gridRow: featured ? 'span 3' : 'span 1', gridColumn: hover ? p.col : undefined, transitionDelay: `${i * 0.05}s` }}
                >
                  <Card
                    p={p}
                    index={i}
                    featured={featured}
                    hover={hover}
                    reduced={!!reduced}
                    onEnter={() => { if (hover) setActive(p.id) }}
                    onTap={e => { if (!hover && !featured) { e.preventDefault(); setActive(p.id) } }}
                  />
                </motion.li>
              )
            })}

            <li className="min-w-0 col-span-2 lg:col-span-1" style={{ gridColumn: hover ? 3 : undefined }}>
              <a href="/start" className="group no-underline flex flex-col justify-between h-full rounded-2xl px-4 py-3.5 transition-transform duration-300 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', minHeight: ROW, boxShadow: '0 16px 40px rgba(72,144,247,0.28)' }}>
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
            </li>
          </ul>
        </LayoutGroup>
      </div>
    </section>
  )
}

function Card({ p, index, featured, hover, reduced, onEnter, onTap }: {
  p: Protocol; index: number; featured: boolean; hover: boolean; reduced: boolean
  onEnter: () => void; onTap: (e: React.MouseEvent) => void
}) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 16 })
  const sry = useSpring(ry, { stiffness: 120, damping: 16 })

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!featured || !hover || reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -8)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.a
      href={p.href}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onTap}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={featured ? `Open ${p.label} protocol` : `Show ${p.label}`}
      className="group relative block h-full w-full overflow-hidden no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderRadius: 18,
        background: featured ? '#0f172a' : 'var(--card-bg)',
        border: `1px solid ${featured ? 'transparent' : 'var(--border)'}`,
        minHeight: hover ? ROW : ROW_MOBILE,
        outlineColor: 'var(--blue)',
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        boxShadow: featured ? '0 30px 60px rgba(15,23,42,0.22)' : '0 1px 2px rgba(15,23,42,0.04)',
        transition: 'background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.4s ease',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: featured ? 1 : 0, transition: reduced ? 'none' : 'opacity 0.45s ease', transform: featured ? 'scale(1)' : 'scale(1.06)' }} aria-hidden="true">
        <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,13,0.85) 0%, rgba(4,6,13,0.25) 45%, transparent 72%)' }} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {featured ? (
          <motion.div key="feature" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }} transition={{ duration: 0.28, ease }} className="absolute inset-0 flex flex-col justify-between p-4">
            <span className="flex items-center justify-between">
              <span className="w-2 h-2 rounded-full" style={{ background: p.swatch, boxShadow: `0 0 0 3px ${p.swatch}33` }} aria-hidden="true" />
              <span className="glass t-mono" style={{ padding: '6px 10px', borderRadius: 999, fontSize: 9.5, color: 'var(--text-primary)' }}>{p.code}</span>
            </span>
            <div>
              {p.tag && <span className="inline-block mb-2.5 t-mono px-2.5 py-1 rounded-full text-white" style={{ fontSize: 9, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.24)', backdropFilter: 'blur(6px)' }}>{p.tag}</span>}
              <h3 className="text-[21px] font-semibold leading-tight text-white" style={{ letterSpacing: '-0.02em' }}>{p.label}</h3>
              <p className="t-mono mt-1 text-white/70">{p.sub}</p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-[12.5px] font-semibold text-white">
                View protocol
                <svg viewBox="0 0 16 16" fill="none" width={13} height={13} className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="compact" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="relative flex flex-col justify-between h-full px-4 py-3.5">
            <div className="flex items-start justify-between">
              <span className="t-mono" style={{ color: 'var(--text-muted)' }}>{num}</span>
              <span className="relative w-[26px] h-[26px] rounded-md overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }} aria-hidden="true">
                <Image src={p.image} alt="" fill sizes="26px" className="object-cover" />
              </span>
            </div>
            <div className="min-w-0">
              <span className="block text-[14.5px] font-semibold leading-tight line-clamp-2 lg:truncate" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{p.label}</span>
              <span className="t-mono block mt-1 truncate" style={{ color: 'var(--text-muted)' }}>{p.code}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
