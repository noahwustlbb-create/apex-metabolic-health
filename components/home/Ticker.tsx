const ITEMS = [
  'AHPRA-registered doctors',
  'TGA-compliant pharmacy',
  'NATA-accredited pathology',
  'LegitScript certified',
  '4,000+ collection centres',
  'No GP referral',
  '100% online, Australia-wide',
]

/**
 * A slow line of the things a visitor can verify. Duplicated once so the
 * loop is seamless; pauses under the cursor.
 */
export default function Ticker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }} aria-label="What you can verify">
      <div className="ticker-track flex items-center" style={{ width: 'max-content' }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center t-mono" style={{ color: 'var(--text-muted)', padding: '18px 0', fontSize: 11 }} aria-hidden={i >= ITEMS.length}>
            {t}
            <span className="mx-8 w-1 h-1 rounded-full inline-block" style={{ background: 'var(--blue)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
