import Link from 'next/link'
import { TREATMENT_CARDS, DEFAULT_FEATURES, type GridCard } from '@/lib/treatments-grid'

/**
 * Treatments bento (AlgoRx reference, Noah 11 Nov 2026). Server rendered, CSS
 * only. Desktop with a fine pointer: three columns; a feature card is tall,
 * with its image filling the card and the name in white bottom left; a text
 * card is short and white (number, round thumbnail, name, mono sub-line).
 * Nothing hovered: the DEFAULT_FEATURES diagonal. Hovering or focusing a card
 * makes it the only feature. Phones and touch: no hover, every card is a flat
 * image card that links to its program page.
 */
const Arrow = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Card({ c }: { c: GridCard }) {
  return (
    <Link href={c.href} className="tg-card" data-default={DEFAULT_FEATURES.includes(c.slug) || undefined}>
      <picture className="tg-img" aria-hidden="true">
        <source type="image/avif" srcSet={`${c.img}-600.avif 600w, ${c.img}-1200.avif 1200w`} sizes="(min-width: 900px) 33vw, 50vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${c.img}-600.webp`} srcSet={`${c.img}-600.webp 600w, ${c.img}-1200.webp 1200w`} sizes="(min-width: 900px) 33vw, 50vw" alt="" width={1200} height={708} loading="lazy" decoding="async" />
      </picture>
      <span className="tg-n">{c.n}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="tg-thumb" src={`${c.img}-600.webp`} alt="" width={40} height={40} loading="lazy" decoding="async" aria-hidden="true" />
      <span className="tg-text">
        <span className="tg-name">{c.name}</span>
        <span className="tg-sub">{c.sub}</span>
      </span>
    </Link>
  )
}

export default function TreatmentsGrid() {
  const cols = [0, 1, 2].map(k => TREATMENT_CARDS.filter((_, i) => i % 3 === k))
  return (
    <section className="tg al-sec" aria-labelledby="tg-title">
      <div className="container-x">
        <div className="al-head">
          <h2 id="tg-title" className="al-h2">Choose your program.</h2>
          <p className="al-cap"><span>Nine programs<br /></span><span>Measure first<br /></span><span>Doctor-led, online</span></p>
        </div>
        <p className="al-k tg-k"><span className="tg-k-hover">→ Hover to expand · Any card becomes the feature · </span>All 9 programs</p>
        <div className="tg-grid">
          {cols.map((col, k) => (
            <div key={k} className="tg-col">
              {col.map(c => <Card key={c.slug} c={c} />)}
            </div>
          ))}
          <Link href="/treatments" className="tg-all">
            <span className="al-k tg-all-k">All treatments</span>
            <span className="tg-all-row">
              <span className="tg-all-name">View all programs</span>
              <span className="tg-all-arrow"><Arrow /></span>
            </span>
          </Link>
        </div>
        <p className="tg-note">Program images are temporary placeholders</p>
      </div>
    </section>
  )
}
