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
 *
 * variant="pricing" (/pricing only, Noah 15 Nov 2026: BIOV8 compare, changes 2 and 3):
 * the same Basic card with its name and price on one line and the buttons above the
 * description, so a price sits on the first phone screen, and the two "Coming soon"
 * panels in one white card (name, the same sentence, one Notify me). /order-bloods
 * passes no variant and renders exactly as before.
 */
export default function CoreHealthPanels({ headingLevel = 'h2', variant = 'default' }: { headingLevel?: 'h1' | 'h2'; variant?: 'default' | 'pricing' }) {
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

  if (variant === 'pricing') {
    const live = panels.filter(p => p.live)
    const soon = panels.filter(p => !p.live)
    return (
      <section className="chp" aria-labelledby={`${selectId}-h`} data-sex={sex} data-variant="pricing">
        <div className="chp-wrap">
          <div className="chp-head">
            <H id={`${selectId}-h`} className="chp-h">Core Health <span className="al-acc">Panels</span></H>
            <div className="chp-pick">
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
            </div>
          </div>

          <ul className="chp-grid" aria-live="polite">
            {live.map((p, i) => <PricingPanelCard key={`${sex}-${p.tier}`} panel={p} sex={sex} eager={i === 0} />)}
            {soon.length > 0 && <SoonCard key={`${sex}-soon`} panels={soon} sex={sex} />}
          </ul>
          <p className="chp-lead">One doctor-reviewed panel today, two deeper panels on the way.</p>
        </div>
      </section>
    )
  }

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

        <H id={`${selectId}-h`} className="chp-h">Core Health <span className="al-acc">Panels</span></H>
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

/** /pricing: the live panel with its name and price first, then the buttons, then the detail. */
function PricingPanelCard({ panel: p, sex, eager }: { panel: BloodPanel; sex: PanelSex; eager: boolean }) {
  const who = sex === 'male' ? 'Male' : 'Female'
  return (
    <li className="chp-card" data-tier={p.tier}>
      <Image
        src={p.texture}
        alt=""
        fill
        sizes="(min-width: 1200px) 600px, (min-width: 640px) 600px, calc(100vw - 40px)"
        className="chp-bg"
        priority={eager}
        loading={eager ? undefined : 'lazy'}
      />
      <div className="chp-frame">
        <div className="chp-top">
          <h3 className="chp-title">{p.name} {who} Panel</h3>
          <p className="chp-price"><span className="sr-only">Price </span>{p.price}</p>
        </div>
        <div className="chp-price-row">
          <p className="chp-count">{p.markers}</p>
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
        <hr className="chp-rule" />
        <div className="chp-meta">
          <svg className="chp-flask" aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M7.5 2.5h5M8.5 2.5v5.2L3.8 15.6a1.3 1.3 0 0 0 1.1 1.9h10.2a1.3 1.3 0 0 0 1.1-1.9l-4.7-7.9V2.5" />
          </svg>
          <span className="chp-sq" aria-hidden="true" />
          <span>{who}</span>
          <span className="chp-sq" aria-hidden="true" />
          <span className="chp-lab">Lab:{' '}<b>{PANEL_LAB}</b></span>
        </div>
        <p className="chp-body">{p.body}</p>
      </div>
    </li>
  )
}

/** /pricing: the panels not yet available, in one white card with one Notify me. */
function SoonCard({ panels, sex }: { panels: BloodPanel[]; sex: PanelSex }) {
  const who = sex === 'male' ? 'Male' : 'Female'
  const names = panels.map(p => p.name).join(' and ')
  return (
    <li className="chp-soon">
      <span className="chp-chip">Coming soon</span>
      <ul className="chp-soon-list" role="list">
        {panels.map(p => (
          <li key={p.tier}>
            <h3 className="chp-soon-name">{p.name} {who} Panel</h3>
            <p className="chp-soon-body">{p.body}</p>
          </li>
        ))}
      </ul>
      <Link
        href={PANEL_NOTIFY_HREF}
        className="chp-btn chp-btn-ink"
        onClick={() => track('panel_notify_click', { sex, tier: panels.map(p => p.tier).join('+') })}
      >
        Notify me<span className="sr-only"> when the {names} {who} Panels are ready</span>
      </Link>
    </li>
  )
}
