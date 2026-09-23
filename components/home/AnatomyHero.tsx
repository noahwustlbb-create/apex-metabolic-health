'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'
import Magnetic from '@/components/motion/Magnetic'
import AgeNotice from '@/components/AgeNotice'
import { hotspotsFor, type Sex } from '@/components/home/AnatomyFigure'
import { START_TOTAL_STEPS } from '@/lib/startFunnel'
import type { AnatomyScene } from '@/components/home/anatomyScene'

/**
 * HERO. The headline, the first question and the body, as one object.
 *
 * They used to be three things side by side: a headline, a row of chips, and a
 * flat picture of a torso that did nothing. The picture was decoration, and
 * the chips asked "what brings you here?" in the abstract — a question that is
 * much easier to answer by pointing at yourself.
 *
 * So the figure *is* the question. Every system on it is one of the answers,
 * and choosing one carries straight into the assessment as step one of
 * ten. The chips stay underneath for anyone who would rather read a list, who
 * is on a keyboard, or whose device never loads the 3D at all.
 *
 * Which system maps to which pathway is defined once, in AnatomyFigure, and
 * imported here — the marker names and protocols on the body are the same data
 * the rest of the page uses.
 */

/** Each system on the body, and the /start pathway it opens. */
const PATHWAY: Record<string, string> = {
  brain: 'longevity',
  hair: 'hair',
  skin: 'skin',
  thyroid: 'weight',
  heart: 'general',
  muscle: 'performance',
  liver: 'general',
  metabolic: 'weight',
  joint: 'recovery',
  repro: 'hormone',
  sexual: 'sexual',
}

/** The short prompt each system answers, in the visitor's words rather than ours. */
const PROMPT: Record<string, string> = {
  brain: 'Ageing well',
  hair: 'Thinning hair',
  skin: 'Skin changes',
  thyroid: 'Energy and weight',
  heart: 'Heart and bloods',
  muscle: 'Strength and recovery',
  liver: 'General health check',
  metabolic: 'Weight that won’t move',
  joint: 'Injury or joint pain',
  repro: 'Low energy or drive',
  sexual: 'Libido or performance',
}

export default function AnatomyHero() {
  const reduced = useReducedMotion()
  const router = useRouter()
  const mount = useRef<HTMLDivElement>(null)
  const scene = useRef<AnatomyScene | null>(null)

  const stage = useRef<HTMLDivElement>(null)
  const [sex, setSex] = useState<Sex>('male')
  const [active, setActive] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [supported, setSupported] = useState(true)
  const [label, setLabel] = useState<{ x: number; y: number } | null>(null)
  // Where the choice came from. A phone shows the detail next to whichever
  // control the visitor actually used — under the body for a tap on it, inside
  // the card for a tap on the list — instead of printing it twice, a screen
  // apart. On a wide screen both are in view at once and both belong.
  const [via, setVia] = useState<'body' | 'list'>('body')

  const spots = hotspotsFor(sex)
  const current = spots.find(s => s.id === active) ?? null

  const pick = useCallback((id: string | null, from: 'body' | 'list' = 'body') => {
    setActive(id)
    setVia(from)
    scene.current?.setActive(id)
    if (id) scene.current?.faceHotspot(id)
  }, [])

  // The scene is loaded only in the browser and only once. Importing three.js
  // at module scope would put ~450KB into the server bundle for a page that
  // renders perfectly well without it.
  useEffect(() => {
    let live = true
    let instance: AnatomyScene | null = null
    ;(async () => {
      if (!mount.current) return
      // A device with no WebGL gets the list, not a blank rectangle.
      try {
        const probe = document.createElement('canvas')
        if (!probe.getContext('webgl2') && !probe.getContext('webgl')) { setSupported(false); return }
      } catch { setSupported(false); return }

      const { AnatomyScene: Ctor } = await import('@/components/home/anatomyScene')
      if (!live || !mount.current) return
      instance = new Ctor({
        container: mount.current,
        reducedMotion: !!reduced,
        onReady: () => { if (live) setReady(true) },
        onPick: id => { if (live) pick(id) },
      })
      scene.current = instance
    })()
    return () => { live = false; instance?.dispose(); scene.current = null }
  }, [reduced, pick])

  useEffect(() => { scene.current?.setSex(sex); pick(null) }, [sex, pick])

  // The callout is DOM, not 3D: real text stays crisp at every density and
  // remains selectable and readable by a screen reader. It only has to follow
  // the point it belongs to, which is one projection per frame.
  useEffect(() => {
    if (!active) { setLabel(null); return }
    let raf = 0
    const follow = () => {
      raf = requestAnimationFrame(follow)
      setLabel(scene.current?.projectHotspot(active) ?? null)
    }
    follow()
    return () => cancelAnimationFrame(raf)
  }, [active])

  // Scroll turns the figure a little as the hero leaves. The listener is
  // passive and never calls preventDefault, so the page scrolls normally —
  // including a finger dragged straight down the body on a phone.
  useEffect(() => {
    const onScroll = () => {
      const el = stage.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = 1 - (r.top + r.height) / (window.innerHeight + r.height)
      scene.current?.setScroll(Math.max(0, Math.min(1, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A hero nobody is looking at should not be rendering. Off-screen or a
  // hidden tab stops the loop outright, which is most of the battery cost of
  // a scene like this.
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => scene.current?.setRunning(e.isIntersecting), { threshold: 0.01 })
    io.observe(el)
    const onVis = () => scene.current?.setRunning(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [ready])

  const go = (id: string) => {
    const t = PATHWAY[id] ?? 'general'
    router.push(`/start?t=${t}&why=${id}`)
  }

  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: 'var(--bg)' }} aria-label="Introduction">
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-20%', width: 900, height: 900, background: 'radial-gradient(circle at center, rgba(72,144,247,0.14) 0%, rgba(72,144,247,0.04) 38%, transparent 62%)', filter: 'blur(20px)' }} />

      <div className="container-x relative" style={{ paddingTop: 'clamp(104px, 13vh, 150px)', paddingBottom: 'clamp(48px, 7vh, 96px)' }}>
        {/* Three blocks, two arrangements. On a phone the body has to come
            straight after the headline — stacked behind eleven chips it lands
            1300px down the page and the hero is a wall of buttons. On a wide
            screen the words stack in the left column and the body stands
            alongside them, spanning both rows. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] gap-y-7 lg:gap-x-14 lg:gap-y-0 lg:items-center">

          {/* ── headline ──────────────────────────────────────────── */}
          <div className="relative z-10 order-1 lg:col-start-1 lg:row-start-1">
            <p className="t-mono hero-in" style={{ animationDelay: '0ms', color: 'var(--text-muted)', marginBottom: 20 }}>
              Doctor-led telehealth · Australia-wide · No GP referral
            </p>

            <RevealText
              as="h1"
              className="t-display"
              style={{ marginBottom: 20 }}
              delay={0.1}
              segments={[{ text: 'Tired, flat, and told' }, { text: 'you’re fine?', accent: true }]}
            />

            <p className="t-lead hero-in" style={{ animationDelay: '420ms', color: 'var(--text-secondary)', maxWidth: '46ch', marginBottom: 26 }}>
              A standard panel is built to find disease, not to explain how you feel. Apex runs the full hormone and metabolic panel, an AHPRA-registered doctor reads it with you, and your protocol is built on those numbers.
            </p>
          </div>

          {/* ── the question, and the ways in ─────────────────────── */}
          <div className="relative z-10 order-3 lg:col-start-1 lg:row-start-2">
            <div className="hero-in glass-card" style={{ animationDelay: '520ms', padding: '18px 18px 16px', borderRadius: 22, marginBottom: 24, maxWidth: 580 }}>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <p className="m-0 text-[14.5px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Where does it show up?
                </p>
                <span className="t-mono" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Step 1 of {START_TOTAL_STEPS}</span>
              </div>
              <p className="m-0 text-[12.5px]" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>
                {supported ? 'Touch a point on the body, or pick from the list.' : 'Pick what fits best.'}
              </p>

              {/* The same eleven answers, as a list. Present on every device: it
                  is the keyboard path, the screen-reader path, and the whole
                  interface where WebGL never starts. */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Where does it show up?">
                {spots.map(s => {
                  const on = active === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => (on ? go(s.id) : pick(s.id, 'list'))}
                      // Keyboard focus previews the system on the body; a mouse
                      // click must not, or the first click would be read as the
                      // second and send the visitor to /start before they ever
                      // saw what the system measures.
                      onFocus={e => { if (e.currentTarget.matches(':focus-visible')) pick(s.id, 'list') }}
                      aria-pressed={on}
                      className="text-[13px] font-medium rounded-full transition-colors duration-200"
                      style={{
                        padding: '9px 14px',
                        background: on ? 'var(--text-primary)' : '#fff',
                        color: on ? '#fff' : 'var(--text-primary)',
                        border: `1px solid ${on ? 'var(--text-primary)' : 'var(--border)'}`,
                        cursor: 'pointer',
                        boxShadow: on ? '0 10px 24px rgba(15,23,42,0.18)' : '0 1px 2px rgba(15,23,42,0.05)',
                      }}
                    >
                      {PROMPT[s.id] ?? s.label}
                    </button>
                  )
                })}
              </div>

              {/* What the chosen system actually measures. Test names only. */}
              <div
                aria-live="polite"
                className={via === 'body' ? 'hidden sm:block' : undefined}
                style={{
                  marginTop: current ? 14 : 0,
                  maxHeight: current ? 240 : 0,
                  opacity: current ? 1 : 0,
                  overflow: 'hidden',
                  transition: reduced ? 'none' : 'max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s ease, margin-top .3s ease',
                }}
              >
                {current && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                    <p className="m-0 text-[13.5px] font-semibold" style={{ color: 'var(--text-primary)' }}>{current.label}</p>
                    <p className="m-0 mt-1 text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>{current.tells}</p>
                    <p className="t-mono m-0 mt-2" style={{ color: 'var(--text-muted)', fontSize: 10, lineHeight: 1.6 }}>{current.markers}</p>
                    <button
                      type="button"
                      onClick={() => go(current.id)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full text-[13.5px] font-semibold text-white"
                      style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 22px rgba(29,79,216,0.28)' }}
                    >
                      Start here
                      <svg viewBox="0 0 16 16" fill="none" width={13} height={13} aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="hero-in flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: '600ms', marginBottom: 22 }}>
              <Magnetic>
                <Link href="/start" className="btn-primary" style={{ fontSize: 15, padding: '18px 36px', borderRadius: 999 }}>
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <a href="#pathway" className="link-draw text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
                See how it works
              </a>
            </div>

            {/* Two more ways in, for visitors who already know what they want
                and should not have to sit through an assessment to get it. */}
            <div className="hero-in flex flex-wrap items-center gap-2.5" style={{ animationDelay: '660ms', marginBottom: 22 }}>
              <Link
                href="/order-bloods"
                className="inline-flex items-center gap-2 rounded-full text-[13.5px] font-semibold no-underline"
                style={{ padding: '11px 17px', background: '#fff', color: 'var(--text-primary)', border: '1px solid var(--border)', boxShadow: '0 1px 2px rgba(15,23,42,0.05)' }}
              >
                Order your panel
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full text-[13.5px] font-semibold no-underline"
                style={{ padding: '11px 17px', background: '#fff', color: 'var(--text-primary)', border: '1px solid var(--border)', boxShadow: '0 1px 2px rgba(15,23,42,0.05)' }}
              >
                Book a doctor call
              </Link>
              <Link
                href="/pricing"
                className="link-draw text-[13.5px] font-medium no-underline"
                style={{ color: 'var(--text-secondary)', padding: '11px 4px' }}
              >
                See pricing
              </Link>
            </div>

            <AgeNotice />
          </div>

          {/* ── body ──────────────────────────────────────────────── */}
          <div className="relative order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="flex justify-center lg:justify-end mb-3">
              <div className="glass-card flex" style={{ padding: 4, borderRadius: 999 }} role="group" aria-label="Figure">
                {(['male', 'female'] as Sex[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    aria-pressed={sex === s}
                    className="t-mono rounded-full transition-colors duration-200"
                    style={{ padding: '7px 15px', fontSize: 10, letterSpacing: '0.06em', border: 'none', cursor: 'pointer', background: sex === s ? 'var(--text-primary)' : 'transparent', color: sex === s ? '#fff' : 'var(--text-muted)' }}
                  >
                    {s === 'male' ? 'MEN' : 'WOMEN'}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={stage}
              className="relative mx-auto"
              style={{ width: '100%', maxWidth: 520, height: 'min(62vh, 560px)', minHeight: 340 }}
            >
              {/* Soft field behind the figure so it sits in something. */}
              <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 58% 62% at 50% 46%, rgba(72,144,247,0.16) 0%, rgba(72,144,247,0.05) 45%, transparent 72%)', borderRadius: 28 }} />

              <div
                ref={mount}
                className="absolute inset-0"
                style={{ opacity: ready ? 1 : 0, transition: 'opacity .7s ease' }}
                aria-hidden="true"
              />

              {/* Callout pinned to the chosen system. */}
              {current && label && ready && (
                <div
                  className="absolute pointer-events-none hidden sm:block"
                  style={{ left: label.x, top: label.y, transform: 'translate(14px, -50%)', zIndex: 3, transition: reduced ? 'none' : 'opacity .25s ease' }}
                >
                  <div className="glass-card" style={{ padding: '10px 13px', borderRadius: 14, maxWidth: 232, boxShadow: '0 14px 34px rgba(15,23,42,0.13)' }}>
                    <p className="t-mono m-0" style={{ color: 'var(--blue)', fontSize: 9 }}>{current.protocol.code}</p>
                    <p className="m-0 mt-0.5 text-[13px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{current.label}</p>
                    <p className="t-mono m-0 mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5, lineHeight: 1.65 }}>{current.markers}</p>
                  </div>
                </div>
              )}

              {!ready && supported && (
                <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                  <span className="t-mono" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Loading the figure…</span>
                </div>
              )}

              {!supported && (
                <div className="absolute inset-0 grid place-items-center px-6 text-center">
                  <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    Your browser can’t show the 3D figure. Everything it does is in the list on the left.
                  </p>
                </div>
              )}
            </div>

            {/* A phone has no room beside the body for the anchored callout,
                and the list below it is a screen away. So the chosen system
                reports directly underneath the figure instead — same content,
                same way into the assessment, no scrolling back. */}
            {current && via === 'body' && (
              <div className="sm:hidden glass-card mt-3" style={{ padding: '13px 15px', borderRadius: 18 }}>
                <p className="t-mono m-0" style={{ color: 'var(--blue)', fontSize: 9 }}>{current.protocol.code}</p>
                <p className="m-0 mt-0.5 text-[14px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{current.label}</p>
                <p className="m-0 mt-1 text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>{current.tells}</p>
                <p className="t-mono m-0 mt-2" style={{ color: 'var(--text-muted)', fontSize: 9.5, lineHeight: 1.6 }}>{current.markers}</p>
                <button
                  type="button"
                  onClick={() => go(current.id)}
                  className="mt-3 inline-flex items-center gap-2 rounded-full text-[13.5px] font-semibold text-white"
                  style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 22px rgba(29,79,216,0.28)' }}
                >
                  Start here
                  <svg viewBox="0 0 16 16" fill="none" width={13} height={13} aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <p className={`t-mono text-center mt-3 ${current && via === 'body' ? 'hidden sm:block' : ''}`} style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>
              {current ? current.protocol.code + ' · ' + current.protocol.name : 'Eleven systems · one panel'}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
