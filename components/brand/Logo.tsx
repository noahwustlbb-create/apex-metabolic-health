import { WORD, WORD_CUT, BOX } from './logoPaths'

/**
 * The Apex lockup: the official triangle mark (Higgsfield clean-pass,
 * ~/Clients/Apex/brand/logo-revamp-2026-08/system-4k) beside the APEX
 * wordmark traced from the locked V3 SVG. The wordmark is painted with
 * currentColor so it sits on any canvas; the descriptor is set in type so it
 * stays legible at nav size, where the drawn version would be four pixels tall.
 */

const [wx0, wy0, wx1, wy1] = BOX.word
const WORD_VIEWBOX = `${wx0} ${wy0} ${wx1 - wx0} ${wy1 - wy0}`
const WORD_RATIO = (wx1 - wx0) / (wy1 - wy0)

export function Wordmark({ height = 18, className }: { height?: number; className?: string }) {
  return (
    <svg
      viewBox={WORD_VIEWBOX}
      width={Math.round(height * WORD_RATIO)}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="apex-wm" maskUnits="userSpaceOnUse" x={wx0} y={wy0} width={wx1 - wx0} height={wy1 - wy0}>
          {WORD.map((d, i) => <path key={i} d={d} fill="#fff" />)}
          {WORD_CUT.map((d, i) => <path key={`c${i}`} d={d} fill="#000" />)}
        </mask>
      </defs>
      <rect x={wx0} y={wy0} width={wx1 - wx0} height={wy1 - wy0} fill="currentColor" mask="url(#apex-wm)" />
    </svg>
  )
}

type Variant = 'nav' | 'footer' | 'mark'

export default function Logo({ variant = 'nav', className }: { variant?: Variant; className?: string }) {
  if (variant === 'mark') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brand/mark-192.webp" alt="Apex Metabolic Health" width={96} height={77} className={className} style={{ display: 'block', height: 'auto' }} />
    )
  }

  const footer = variant === 'footer'
  const markH = footer ? 52 : 30
  const wordH = footer ? 30 : 17

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: footer ? 18 : 11, color: 'var(--text-primary)', lineHeight: 1 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={footer ? '/brand/mark-192.webp' : '/brand/mark-96.webp'}
        alt=""
        aria-hidden="true"
        width={Math.round(markH * 1.243)}
        height={markH}
        style={{ display: 'block', flexShrink: 0 }}
      />
      <span style={{ display: 'inline-flex', flexDirection: 'column', gap: footer ? 7 : 4 }}>
        <Wordmark height={wordH} />
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: footer ? 10 : 7.5,
            fontWeight: 600,
            letterSpacing: footer ? '0.32em' : '0.3em',
            color: 'var(--color-accent-fg)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Metabolic Health
        </span>
      </span>
      <span className="sr-only">Apex Metabolic Health</span>
    </span>
  )
}
