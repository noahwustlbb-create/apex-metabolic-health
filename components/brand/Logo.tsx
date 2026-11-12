/**
 * The Apex logo: Noah's triangle lockup (his hf_20260817_031310), everywhere, header included (Noah, 13 Nov 2026:
 * "add our real logo everywhere including on front page header"). The art (triangle + APEX) is cut out of its black
 * background (public/brand/lockup-2026-*.webp; mark-2026-*.webp is the triangle alone). METABOLIC HEALTH is live
 * text in the lockup's blue, in the box it fills in his file (x 790-2347, baseline 634 of 2370 x 662), so it stays
 * crisp and readable at header size. Silver and blue on transparent: dark canvases only (the header and footer are
 * black on every page).
 */

const LOCKUP_RATIO = 2370 / 662
const MARK_RATIO = 1.125 // mark-2026-*.webp width / height

function Lockup({ width, src, className }: { width: number; src: string; className?: string }) {
  return (
    <svg viewBox="0 0 2370 662" width={width} height={Math.round(width / LOCKUP_RATIO)} className={className} role="img" aria-label="Apex Metabolic Health" style={{ display: 'block', maxWidth: '100%', height: 'auto', overflow: 'visible' }}>
      <image href={src} x="0" y="0" width="2370" height="662" />
      <text x="790" y="634" textLength="1557" lengthAdjust="spacing" fill="#3a86f6" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 104, fontWeight: 600 }}>
        METABOLIC HEALTH
      </text>
    </svg>
  )
}

type Variant = 'nav' | 'footer' | 'mark'

export default function Logo({ variant = 'nav', className }: { variant?: Variant; className?: string }) {
  if (variant === 'mark') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/mark-2026-192.webp" alt="Apex Metabolic Health" width={96} height={Math.round(96 / MARK_RATIO)} className={className} style={{ display: 'block', height: 'auto' }} />
    )
  }
  if (variant === 'footer') return <Lockup width={280} src="/brand/lockup-2026-1280.webp" className={className} />
  // Header: 150 px wide on phones (42 tall), 186 px from 768 (52 tall); see .apex-navlock in globals.css.
  return <Lockup width={186} src="/brand/lockup-2026-640.webp" className={`apex-navlock ${className || ''}`} />
}
