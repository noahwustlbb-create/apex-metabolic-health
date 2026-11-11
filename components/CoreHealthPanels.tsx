'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAudience } from '@/components/audience/Audience'
import { BLOOD_PANELS, PANEL_LAB, PANEL_NOTIFY_HREF, type BloodPanel, type PanelSex } from '@/lib/blood-panels'
import { track } from '@/lib/analytics'

/**
 * Core Health Panels: AlgoRx /labs layout 1:1 (Noah, 12 Nov 2026), Apex content.
 * Who-for select, heading, then one tall texture card per tier. Basic is live;
 * Intermediate and Advanced are "Coming soon" with a Notify me link only.
 * Styles: styles/panels.css (.chp-*).
 */
export default function CoreHealthPanels({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const { audience } = useAudience()
  const [sex, setSex] = useState<PanelSex>('male')
  const touched = useRef(false)
  const selectId = useId()
  const H = headingLevel

  // Default to whoever the visitor already told the site they are, until they pick here.
  useEffect(() => {
    if (!touched.current) setSex(audience === 'women' ? 'female' : 'male')
  }, [audience])

  const panels = BLOOD_PANELS[sex]

  return (
    <section className="chp" aria-labelledby={`${selectId}-h`} data-sex={sex}>
      <div className="chp-wrap">
        <label className="chp-k" htmlFor={selectId}>Who are these panels for?</label>
        <div className="chp-select">
          <select
            id={selectId}
            value={sex}
            onChange={e => {
              touched.current = true
              const v = e.target.value as PanelSex
              setSex(v)
              track('panels_audience_select', { sex: v })
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4" /></svg>
        </div>

        <H id={`${selectId}-h`} className="chp-h">Core Health Panels</H>
        <p className="chp-lead">One doctor-reviewed panel today, two deeper panels on the way.</p>

        <ul className="chp-grid" aria-live="polite">
          {panels.map((p, i) => <PanelCard key={`${sex}-${p.tier}`} panel={p} sex={sex} eager={i === 0} />)}
        </ul>
      </div>
    </section>
  )
}

function PanelCard({ panel: p, sex, eager }: { panel: BloodPanel; sex: PanelSex; eager: boolean }) {
  const who = sex === 'male' ? 'Male' : 'Female'
  return (
    <li className="chp-card" data-tier={p.tier}>
      <Image
        src={p.texture}
        alt=""
        fill
        sizes="(min-width: 1200px) 400px, (min-width: 640px) 600px, calc(100vw - 40px)"
        className="chp-bg"
        priority={eager}
        loading={eager ? undefined : 'lazy'}
      />
      <div className="chp-frame">
        <div className="chp-meta">
          <svg className="chp-flask" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M7.5 2.5h5M8.5 2.5v5.2L3.8 15.6a1.3 1.3 0 0 0 1.1 1.9h10.2a1.3 1.3 0 0 0 1.1-1.9l-4.7-7.9V2.5" />
          </svg>
          <span className="chp-sq" aria-hidden="true" />
          <span>{who}</span>
          <span className="chp-sq" aria-hidden="true" />
          <span className="chp-lab">Lab:{' '}<b>{PANEL_LAB}</b></span>
          <span className="chp-rings" aria-hidden="true"><i /><i /><i /></span>
        </div>

        <h3 className="chp-title">{p.name}<br />{who} Panel</h3>
        <p className="chp-body">{p.body}</p>

        <div className="chp-foot">
          <hr className="chp-rule" />
          {p.live ? (
            <>
              <p className="chp-count">{p.markers}</p>
              <div className="chp-price-row">
                <p className="chp-price"><span className="sr-only">Price </span>{p.price}</p>
                <span className="chp-chip">{p.memberChip}</span>
              </div>
              <Link
                href={p.orderHref!}
                className="chp-btn chp-btn-solid"
                onClick={() => track('panel_order_click', { sex, tier: p.tier })}
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M8 1.8c2.2 3 4.2 5.3 4.2 7.7a4.2 4.2 0 0 1-8.4 0C3.8 7.1 5.8 4.8 8 1.8z" /></svg>
                Order panel<span className="sr-only">: Basic {who} Panel</span>
              </Link>
              <Link href={p.learnHref!} className="chp-btn chp-btn-line">
                Learn more<span className="sr-only"> about the Basic {who} Panel</span>
                <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 11l6-6M6 5h5v5" /></svg>
              </Link>
            </>
          ) : (
            <>
              <div className="chp-price-row chp-soon-row">
                <span className="chp-chip">Coming soon</span>
              </div>
              <Link
                href={PANEL_NOTIFY_HREF}
                className="chp-btn chp-btn-line"
                onClick={() => track('panel_notify_click', { sex, tier: p.tier })}
              >
                Notify me<span className="sr-only"> when the {p.name} {who} Panel is ready</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </li>
  )
}
