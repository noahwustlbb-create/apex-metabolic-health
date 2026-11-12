import Link from 'next/link'
import type { FieldNote } from '@/lib/field-notes'

/**
 * "Field Notes." (Noah, 13 Nov 2026), after the AlgoRx home section, in our system (Hugo's spec, 13 Nov):
 * the site heading row (.al-head / .al-h2 / .al-cap), then 4:5 photo cards with an accent tag dot and a title.
 * Notes come from lib/field-notes.ts only.
 *   grid: one column on phones, three up from 768 (home, the index, "more" on an article).
 *   rail: a swipe row on phones, four up in two rows on desktop (longevity, eight notes).
 */
export default function FieldNotes({ notes, variant = 'grid', id = 'fn-title', title = 'Field Notes.', line = 'Notes on testing, training, recovery and longevity.', all = true, h = 'h2' }: {
  notes: FieldNote[]
  variant?: 'grid' | 'rail'
  id?: string
  title?: string
  line?: string
  all?: boolean
  h?: 'h1' | 'h2'
}) {
  const H = h
  return (
    <section className="al-sec fn" data-variant={variant} aria-labelledby={id}>
      <div className="container-x">
        <div className="al-head fn-head">
          <H id={id} className="al-h2">{title}</H>
          <p className="al-cap fn-line">{line}</p>
        </div>
        <ul className="fn-list" role="list">
          {notes.map(n => (
            <li key={n.slug}>
              <Link href={`/field-notes/${n.slug}`} className="fn-card">
                <span className="fn-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.img.src} srcSet={n.img.srcSet} sizes={variant === 'rail' ? '(min-width: 900px) 24vw, 78vw' : '(min-width: 768px) 31vw, 100vw'} alt={n.img.alt} loading="lazy" decoding="async" style={{ objectPosition: n.img.pos ?? '50% 50%' }} />
                </span>
                <span className="fn-tag"><span aria-hidden="true" />{n.tag}</span>
                <span className="fn-t">{n.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        {all && <p className="fn-all"><Link href="/field-notes">All field notes</Link></p>}
      </div>
    </section>
  )
}
