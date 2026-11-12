'use client'

// Optional, unticked-by-default marketing consent (Spam Act 2003).
// Consent travels to HighLevel as the `marketing-consent` tag; marketing
// workflows must only message contacts carrying it. Care messages about a
// patient's own enquiry or treatment are not marketing and don't need it.

interface Props {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function MarketingConsent({ id, checked, onChange }: Props) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', minHeight: 44, padding: '6px 0',
        fontSize: 12, lineHeight: 1.55, color: 'var(--text-secondary)', textAlign: 'left',
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ marginTop: 1, width: 22, height: 22, flexShrink: 0, accentColor: 'var(--blue)' }}
      />
      <span>
        Send me health tips, program updates and offers from Apex by email and SMS. Optional.
        You can unsubscribe any time.
      </span>
    </label>
  )
}
