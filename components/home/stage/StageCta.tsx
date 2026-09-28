import Link from 'next/link'
import type { ReactNode } from 'react'

/** The BioTrack button: a pill joined to a round arrow. Same href rules as btn-primary. */
export default function StageCta({ href, children, tone = 'light' }: { href: string; children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <Link href={href} className="stage-cta" data-tone={tone}>
      <span className="stage-cta-label">{children}</span>
      <span className="stage-cta-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none">
          <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}
