import Link from 'next/link'

type Pillar = {
  n: string
  name: string
  line: string
  /** The point on the hero figure this pillar crops to (image fractions). */
  at: [number, number]
  primary: { label: string; href: string }
  more: { label: string; href: string }[]
}

// The four areas Apex works in. Areas, never compounds: the public site names
// what is measured and who reads it, not what might be prescribed.
const PILLARS: Pillar[] = [
  {
    n: '01', name: 'Hormones', at: [0.5, 0.1],
    line: 'Energy, drive, mood and body composition, read from the hormones behind them.',
    primary: { label: 'Hormone Optimisation', href: '/programs/hormone-optimisation' },
    more: [{ label: 'Sexual Health', href: '/programs/sexual-health' }],
  },
  {
    n: '02', name: 'Metabolic health', at: [0.47, 0.55],
    line: 'Weight that will not move, blood sugar and lipids, managed by a doctor with your numbers open.',
    primary: { label: 'Medical Weight Loss', href: '/programs/metabolic-weight-loss' },
    more: [],
  },
  {
    n: '03', name: 'Recovery', at: [0.24, 0.37],
    line: 'Training load, injury and repair, with the markers that show how your body is coping.',
    primary: { label: 'Recovery and Injury Repair', href: '/programs/injury-repair' },
    more: [{ label: 'Performance Plus', href: '/programs/performance-plus' }],
  },
  {
    n: '04', name: 'Longevity', at: [0.52, 0.4],
    line: 'Inflammation, heart and metabolic risk, skin and hair, tracked over years rather than one visit.',
    primary: { label: 'Anti-Ageing and Longevity', href: '/programs/longevity' },
    more: [{ label: 'Skin Regeneration', href: '/programs/skin-regeneration' }, { label: 'Hair Restoration', href: '/programs/hair-restoration' }],
  },
]

// Crop maths: the figure is drawn at SCALE x the card width inside a 4:3 frame;
// solve background-position so the pillar's point sits in the centre.
const SCALE = 2.6
const IMG_ASPECT = 1900 / 1106
const pos = ([x, y]: [number, number]) => {
  const sy = (SCALE * IMG_ASPECT) / 0.75
  const px = ((x * SCALE - 0.5) / (SCALE - 1)) * 100
  const py = ((y * sy - 0.5) / (sy - 1)) * 100
  return `${Math.max(0, Math.min(100, px)).toFixed(1)}% ${Math.max(0, Math.min(100, py)).toFixed(1)}%`
}

/**
 * OFFER. Four areas, one standard. Each card is a crop of the hero figure at
 * the system that area reads, so the object from the first screen carries
 * down the page. The whole card is the link; related protocols sit under it.
 */
export default function Pillars() {
  return (
    <section id="treatments" className="band-light section-y" style={{ background: 'var(--surface)' }} aria-label="What we treat">
      <div className="container-x">
        <div className="section-head">
          <h2 className="t-h2 m-0">Four areas. One doctor. Your numbers.</h2>
          <p className="t-body m-0" style={{ color: 'var(--text-secondary)', maxWidth: '44ch' }}>
            Every plan starts the same way: a full blood panel, read with you by an AHPRA&#8209;registered doctor.
            Only want the bloods? <Link href="/programs/pathology" className="link-draw" style={{ color: 'var(--text-primary)' }}>Comprehensive Blood Tests</Link>.
          </p>
        </div>

        <ul className="pillars list-none p-0 m-0">
          {PILLARS.map(p => (
            <li key={p.n} className="pillar">
              <div className="pillar-crop" aria-hidden="true">
                <span className="pillar-img pillar-ghost" style={{ backgroundPosition: pos(p.at) }} />
                <span className="pillar-img pillar-vivid" style={{ backgroundPosition: pos(p.at) }} />
                <span className="pillar-dot" />
              </div>
              <div className="pillar-body">
                <span className="pillar-n">{p.n}</span>
                <h3 className="t-h3 m-0">
                  <Link href={p.primary.href} className="pillar-link">{p.name}</Link>
                </h3>
                <p className="pillar-line">{p.line}</p>
                <ul className="pillar-more list-none p-0 m-0">
                  <li><Link href={p.primary.href}>{p.primary.label}</Link></li>
                  {p.more.map(m => <li key={m.href}><Link href={m.href}>{m.label}</Link></li>)}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
