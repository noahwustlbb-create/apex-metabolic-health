'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's 3D figure: a full 360 degree turn of the glass body (a Kling
 * turntable of the approved Higgsfield master, cut out with Apple Vision),
 * drawn to a canvas. Neighbouring frames crossfade by the fractional angle, so
 * 48 frames read as a continuous turn.
 *
 * Behaviour
 * - Idle: turns slowly on its own (one turn every ~26 s).
 * - Drag sideways (mouse or thumb): turns it, with a little inertia.
 *   touch-action: pan-y keeps vertical swipes as normal page scroll.
 * - `face` (0..1): the scroll beat eases it round to face the camera and holds
 *   it there while the markers light. 0 hands control back to the idle turn.
 * - Frames load only when `active` (this sex is chosen), the hero is in view,
 *   and the page has painted. Until then the poster <img> underneath shows.
 *
 * `onAngle` reports how far the body is from facing the camera (0 = facing,
 * 1 = side on or worse) so the markers can fade as they turn away.
 */
export const TURN_FRAMES = 48

export default function Turntable({
  sex, active, face, onAngle, onReady,
}: {
  sex: 'male' | 'female'
  active: boolean
  face: React.MutableRefObject<number>
  onAngle?: (away: number) => void
  onReady?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef({ angle: 0, vel: 0, dragging: false, lastX: 0, lastT: 0, idle: 1 })
  const frames = useRef<(HTMLImageElement | null)[]>([])
  const started = useRef(false)

  // Load frames once this figure is chosen and visible. Frame 0 first (it is
  // the poster pose), then every 4th so a drag never shows a hole, then the rest.
  useEffect(() => {
    if (!active || started.current) return
    const el = canvasRef.current
    if (!el) return
    let cancelled = false
    const begin = () => {
      if (cancelled || started.current) return
      started.current = true
      const order: number[] = []
      for (const step of [4, 2, 1]) {
        for (let i = 0; i < TURN_FRAMES; i += step) if (!order.includes(i)) order.push(i)
      }
      frames.current = new Array(TURN_FRAMES).fill(null)
      let next = 0
      let first = true
      const pump = () => {
        if (cancelled || next >= order.length) return
        const i = order[next++]
        const img = new Image()
        img.decoding = 'async'
        img.src = `/3d/turn/${sex}/${String(i).padStart(2, '0')}.webp`
        img.decode().then(() => {
          if (cancelled) return
          frames.current[i] = img
          if (first && i === 0) { first = false; onReady?.() }
        }).catch(() => {}).finally(pump)
      }
      // Three requests in flight: fast on 4G, never a flood.
      pump(); pump(); pump()
    }
    const io = new IntersectionObserver(es => {
      if (es.some(e => e.isIntersecting)) {
        io.disconnect()
        const go = () => ('requestIdleCallback' in window ? (window as unknown as { requestIdleCallback: (f: () => void, o?: object) => void }).requestIdleCallback(begin, { timeout: 1200 }) : setTimeout(begin, 300))
        if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true })
      }
    })
    io.observe(el)
    return () => { cancelled = true; io.disconnect() }
  }, [active, sex, onReady])

  // Draw loop: only while chosen and on screen.
  useEffect(() => {
    if (!active) return
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    let raf = 0
    let visible = true
    let last = performance.now()
    const io = new IntersectionObserver(es => { visible = es.some(e => e.isIntersecting) })
    io.observe(cv)
    const s = state.current
    // Size from the layout box, not the bounding rect: the phone beat scales the
    // figure with a transform on every scroll frame, and a canvas that resizes on
    // every frame reallocates and clears itself. Oversample for that scale on
    // phones, never past the source frames.
    const SRC_W = 828, SRC_H = 1108
    const pm = window.matchMedia('(max-width: 899px)')
    const fit = () => {
      const lw = cv.offsetWidth
      if (!lw) return
      const ph = pm.matches
      const dpr = Math.min(ph ? 3 : 2, window.devicePixelRatio || 1)
      const over = ph ? 1.3 : 1                       // headroom for the beat's scale (tablets grow 0.3)
      const w = Math.min(SRC_W, Math.round(lw * dpr * over))
      const h = Math.round(w * SRC_H / SRC_W)
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h }
    }
    const nearest = (i: number) => {
      // Fall back to the closest loaded frame so a drag never shows a gap.
      for (let d = 0; d < TURN_FRAMES / 2; d++) {
        const a = frames.current[(i + d) % TURN_FRAMES]; if (a) return a
        const b = frames.current[(i - d + TURN_FRAMES) % TURN_FRAMES]; if (b) return b
      }
      return null
    }
    let lastAway = -1
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (t - last) / 1000); last = t
      if (!visible) return
      // Hold the poster pose until frame 0 has decoded: the idle clock starts from
      // what the visitor saw, so the first canvas draw never snaps away from the poster.
      if (!s.dragging && !frames.current[0]) return
      const f = face.current
      if (!s.dragging) {
        if (f > 0.001) {
          // Ease to the facing pose along the short way round.
          let d = -s.angle % 1; if (d > 0.5) d -= 1; if (d < -0.5) d += 1
          s.angle += d * Math.min(1, dt * 4 * f)
          s.vel *= 0.85
        } else {
          s.angle += s.vel * dt
          s.vel *= Math.pow(0.12, dt)
          // Idle turn resumes softly after a drag.
          s.idle = Math.min(1, s.idle + dt * 0.5)
          s.angle += (dt / 26) * s.idle
        }
      }
      s.angle = ((s.angle % 1) + 1) % 1
      fit()
      const pos = s.angle * TURN_FRAMES
      const i0 = Math.floor(pos) % TURN_FRAMES
      const i1 = (i0 + 1) % TURN_FRAMES
      const k = pos - Math.floor(pos)
      const a = frames.current[i0] ?? nearest(i0)
      const b = frames.current[i1]
      ctx.clearRect(0, 0, cv.width, cv.height)
      if (a) {
        ctx.globalAlpha = 1
        ctx.drawImage(a, 0, 0, cv.width, cv.height)
        if (b && b !== a && k > 0.02) { ctx.globalAlpha = k; ctx.drawImage(b, 0, 0, cv.width, cv.height); ctx.globalAlpha = 1 }
      }
      const off = Math.min(s.angle, 1 - s.angle) // 0 facing, 0.5 back
      const away = Math.min(1, off / 0.09)
      if (Math.abs(away - lastAway) > 0.01) { lastAway = away; onAngle?.(away) }
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [active, face, onAngle])

  // Drag to turn. Horizontal only; vertical stays page scroll.
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv || !active) return
    const s = state.current
    let startX = 0, startY = 0, decided = false, horizontal = false, id = -1
    const down = (e: PointerEvent) => {
      id = e.pointerId; startX = s.lastX = e.clientX; startY = e.clientY; s.lastT = performance.now()
      decided = e.pointerType === 'mouse'; horizontal = decided
      if (horizontal) { s.dragging = true; cv.setPointerCapture(id) }
    }
    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      if (!decided) {
        const dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY)
        if (dx < 6 && dy < 6) return
        decided = true; horizontal = dx > dy
        if (horizontal) { s.dragging = true; cv.setPointerCapture(id) } else return
      }
      if (!horizontal) return
      const now = performance.now()
      const w = cv.getBoundingClientRect().width || 1
      const d = (e.clientX - s.lastX) / (w * 1.6) // one width of drag = ~60 percent of a turn
      s.angle -= d
      const dt = Math.max(0.008, (now - s.lastT) / 1000)
      s.vel = -d / dt
      s.lastX = e.clientX; s.lastT = now; s.idle = 0
    }
    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      s.dragging = false; id = -1
      s.vel = Math.max(-1.2, Math.min(1.2, s.vel))
    }
    cv.addEventListener('pointerdown', down)
    cv.addEventListener('pointermove', move)
    cv.addEventListener('pointerup', up)
    cv.addEventListener('pointercancel', up)
    return () => {
      cv.removeEventListener('pointerdown', down)
      cv.removeEventListener('pointermove', move)
      cv.removeEventListener('pointerup', up)
      cv.removeEventListener('pointercancel', up)
    }
  }, [active])

  return <canvas ref={canvasRef} className="hx-canvas" aria-hidden="true" />
}
