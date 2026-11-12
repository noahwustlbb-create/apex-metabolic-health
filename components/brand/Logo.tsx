import { APEX_WORD } from './logoPaths'

/**
 * Apex logos (Noah, 13 Nov 2026: "the logo on there is terrible, try this one for the header then this one
 * through the website").
 *  - nav: the plain APEX wordmark with METABOLIC HEALTH centred under it (his hf_20260817_123037). APEX is
 *    traced from his file and painted with currentColor, so it reads on the light and the dark header. The
 *    descriptor is set in type: drawn at header size it would be under 2 px tall.
 *  - footer / mark: the triangle lockup (his hf_20260817_031310), cut out of its black background
 *    (public/brand/lockup-2026-*.webp holds triangle + APEX; mark-2026-*.webp the triangle). Silver and blue on
 *    transparent: dark canvases only. The footer's METABOLIC HEALTH line is live text so it stays legible.
 */

const LOCKUP_RATIO = 3.58 // lockup-2026-*.webp width / height
const MARK_RATIO = 1.125 // mark-2026-*.webp width / height

/** Noah's 13 Nov APEX wordmark, currentColor. */
export function ApexWord({ height = 20, className }: { height?: number; className?: string }) {
  return (
    <svg viewBox={`0 0 ${APEX_WORD.w} ${APEX_WORD.h}`} width={Math.round((height * APEX_WORD.w) / APEX_WORD.h)} height={height} className={className} aria-hidden="true" focusable="false">
      <g transform={`translate(0 ${APEX_WORD.h}) scale(0.1 -0.1)`}>
        <path d={APEX_WORD.d} fill="currentColor" />
      </g>
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

  if (variant === 'footer') {
    // The lockup art (triangle + APEX) with METABOLIC HEALTH set as live text in the lockup's blue, in the exact
    // box it occupies in Noah's file (x 790-2347, baseline 634 of 2370 x 662). Drawn, it would be 4 px tall here.
    const w = 280
    return (
      <svg viewBox="0 0 2370 662" width={w} height={Math.round(w / LOCKUP_RATIO)} className={className} role="img" aria-label="Apex Metabolic Health" style={{ display: 'block', maxWidth: '100%', height: 'auto', overflow: 'visible' }}>
        <image href="/brand/lockup-2026-1280.webp" x="0" y="0" width="2370" height="662" />
        <text x="790" y="634" textLength="1557" lengthAdjust="spacing" fill="#3a86f6" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', fontSize: 88, fontWeight: 600 }}>
          METABOLIC HEALTH
        </text>
      </svg>
    )
  }

  // Header: APEX 24 px tall (87 px wide), descriptor centred under it, as in Noah's file.
  return (
    <span className={`apex-navword ${className || ''}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: 'var(--text-primary)', lineHeight: 1 }}>
      <ApexWord height={24} />
      <span
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 7,
          fontWeight: 600,
          letterSpacing: '0.24em',
          marginRight: '-0.24em', // tracking adds space after the last letter; pull it back so the line centres
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        Metabolic Health
      </span>
      <span className="sr-only">Apex Metabolic Health</span>
    </span>
  )
}
