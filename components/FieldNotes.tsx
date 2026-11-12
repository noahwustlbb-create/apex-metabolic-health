import Link from 'next/link'
import type { FieldNote } from '@/lib/field-notes'

/**
 * "Field Notes." (Noah, 13 Nov 2026), after the AlgoRx home section: title left, a mono line right (stacked on
 * phones), then 4:5 photo cards with a tag dot and a title. Notes come from lib/field-notes.ts only.
 * grid: three up on desktop, one column on phones (home). rail: a swipe row on every width (longevity, 7 notes).
 */
export default function FieldNotes({ notes, variant = 'grid', id = 'fn-title', title = 'Field Notes.', line = 'Notes on testing, training, recovery and longevity.', all = true }: {
  notes: FieldNote[]
  variant?: 'grid' | 'rail'
  id?: string
  title?: string
  line?: string
  all?: boolean
}) {
  return (
    <section className="fn" data-variant={variant} aria-labelledby={id}>
      <div className="container-x">
        <div className="fn-head">
          <h2 id={id} className="fn-h2">{title}</h2>
          <p className="fn-line">{line}</p>
        </div>
        <ul className="fn-list" role="list">
          {notes.map(n => (
            <li key={n.slug}>
              <Link href={`/field-notes/${n.slug}`} className="fn-card">
                <span className="fn-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.img.src} srcSet={n.img.srcSet} sizes={variant === 'rail' ? '(min-width: 900px) 30vw, 78vw' : '(min-width: 768px) 31vw, 100vw'} alt={n.img.alt} loading="lazy" decoding="async" style={{ objectPosition: n.img.pos ?? '50% 50%' }} />
                </span>
                <span className="fn-tag" data-tag={n.tag}><span aria-hidden="true" />{n.tag}</span>
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
