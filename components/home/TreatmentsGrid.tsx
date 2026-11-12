import Link from 'next/link'
import { TREATMENT_CARDS, type GridCard } from '@/lib/treatments-grid'

/**
 * 03 PROTOCOLS (Noah 12 Nov 2026: "one large cinematic Hormonal Optimisation
 * card followed by smaller cards in an alternating layout, like your AlgoRx
 * references. On mobile, tap to navigate; on desktop, hover to expand").
 * Server rendered, CSS only.
 *
 * - One full-bleed feature card (Hormone Optimisation): image, dark gradient,
 *   white label bottom left.
 * - Then rows of three that alternate: image card + two bordered white cards,
 *   two white cards + image card, and so on.
 * - Desktop with a fine pointer: the hovered or focused card widens in its
 *   row and every other card steps back (isolate); a white card shows its
 *   image while it is the one in focus.
 * - Phones and touch: no hover content. Every card is a plain link to its
 *   program page; image cards span the row, white cards sit two up.
 */
const Arrow = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Img({ c, sizes }: { c: GridCard; sizes: string }) {
  return (
    <picture className="tg-img" aria-hidden="true">
      <source type="image/avif" srcSet={`${c.img}-600.avif 600w, ${c.img}-1200.avif 1200w`} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${c.img}-600.webp`} alt="" width={1200} height={708} loading="lazy" decoding="async" />
    </picture>
  )
}

function Card({ c, kind }: { c: GridCard; kind: 'img' | 'text' }) {
  return (
    <Link href={c.href} className="tg-card" data-kind={kind}>
      <Img c={c} sizes={kind === 'img' ? '(min-width: 900px) 40vw, 100vw' : '(min-width: 900px) 40vw, 50vw'} />
      <span className="tg-n">{c.n}</span>
      {kind === 'text' && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="tg-thumb" src={`${c.img}-160.webp`} alt="" width={40} height={40} loading="lazy" decoding="async" aria-hidden="true" />
      )}
      <span className="tg-text">
        <span className="tg-name">{c.name}</span>
        <span className="tg-sub">{c.sub}</span>
      </span>
    </Link>
  )
}

export default function TreatmentsGrid() {
  const [feature, ...rest] = TREATMENT_CARDS
  // Rows of three, alternating image position: [img, text, text], [text, text, img], ...
  const rows: GridCard[][] = []
  for (let i = 0; i < rest.length; i += 3) rows.push(rest.slice(i, i + 3))
  return (
    <section className="tg al-sec" id="programs" aria-labelledby="tg-title">
      <div className="container-x">
        <div className="al-head">
          <div>
            <p className="al-k al-num">// 03 Protocols</p>
            <h2 id="tg-title" className="al-h2">Choose your program.</h2>
          </div>
          <p className="al-cap"><span>Nine programs<br /></span><span>Measure first<br /></span><span>Doctor-led, online</span></p>
        </div>

        <div className="tg-board">
          <Link href={feature.href} className="tg-feature">
            {/* The Hormonal texture, not the runner (Noah, 12 Nov 2026: "change the hormonal photo back to the original one"). */}
            <Img c={feature} sizes="100vw" />
            <span className="tg-feature-k al-k">{feature.n} · Featured program</span>
            <span className="tg-feature-text">
              <span className="tg-feature-name">{feature.name}</span>
              <span className="tg-feature-sub">{feature.sub}</span>
            </span>
            <span className="tg-feature-arrow"><Arrow /></span>
          </Link>

          {rows.map((row, r) => (
            <div key={r} className="tg-row" data-flip={r % 2 === 1 || undefined}>
              {row.map((c, i) => {
                const imgAt = r % 2 === 1 ? 2 : 0
                return <Card key={c.slug} c={c} kind={i === imgAt ? 'img' : 'text'} />
              })}
              {row.length < 3 && (
                <Link href="/treatments" className="tg-all">
                  <span className="al-k tg-all-k">All treatments</span>
                  <span className="tg-all-row">
                    <span className="tg-all-name">View all programs</span>
                    <span className="tg-all-arrow"><Arrow /></span>
                  </span>
                </Link>
              )}
            </div>
          ))}
          {rest.length % 3 === 0 && (
            <Link href="/treatments" className="tg-all tg-all-wide">
              <span className="al-k tg-all-k">All treatments</span>
              <span className="tg-all-row">
                <span className="tg-all-name">View all programs</span>
                <span className="tg-all-arrow"><Arrow /></span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
