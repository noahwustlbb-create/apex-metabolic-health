/**
 * Trust chips (AlgoRx's trust strip, Noah 12 Nov 2026): one row of outlined
 * pill chips, mono uppercase, a small accent dot at the left. Replaces the
 * big verification cards (the old DoctorCard). Every chip is still a link to
 * the body that can verify the claim, and opens in a new tab. Phones scroll
 * the row sideways (no scrollbar, edge fade); desktop shows one row.
 * Styles: styles/inner.css (.tc-*). Server component, no JS.
 *
 * Claims only where the proof is real. No individual clinician here: our
 * doctors are contracted practitioners, not the brand. A doctor is named on
 * the site only with their written OK (brand platform, decision 3).
 */
const ABN = '91 682 876 884'

export const TRUST_CHIPS: { label: string; href: string; verify: string }[] = [
  { label: 'AHPRA-registered doctors', href: 'https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx', verify: 'search the public register at ahpra.gov.au' },
  { label: 'LegitScript certified', href: 'https://www.legitscript.com/websites/?checker_keywords=apexmetabolichealth.com.au', verify: 'verify at legitscript.com' },
  { label: `ABN ${ABN}`, href: 'https://abr.business.gov.au/ABN/View?abn=91682876884', verify: 'look up the ABN at abr.business.gov.au' },
  { label: 'NATA-accredited pathology', href: 'https://nata.com.au/', verify: 'about NATA accreditation at nata.com.au' },
]

export default function TrustChips({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <section className={`tc ${className}`} data-dark={dark || undefined} aria-label="Verify our credentials">
      <div className="container-x">
        <div className="tc-scroll">
          <ul className="tc-row">
            {TRUST_CHIPS.map(c => (
              <li key={c.label}>
                <a className="tc-chip" href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`${c.label}: ${c.verify} (opens in a new tab)`}>
                  <span className="tc-dot" aria-hidden="true" />
                  {c.label}
                  <svg className="tc-ext" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 7.5l5-5M3.5 2.5h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
