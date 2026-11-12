import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import FieldNotes from '@/components/FieldNotes'
import { FIELD_NOTES, fieldNote } from '@/lib/field-notes'
import { pageMetadata } from '@/lib/seo'
import { CtaBand, InnerFoot, SHOTS } from '@/components/inner/InnerSections'

export const dynamicParams = false
export function generateStaticParams() {
  return FIELD_NOTES.map(n => ({ slug: n.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const n = fieldNote(params.slug)
  if (!n) return {}
  return pageMetadata({ path: `/field-notes/${n.slug}`, title: n.title.replace(/\.$/, ''), description: n.dek })
}

export default function FieldNotePage({ params }: { params: { slug: string } }) {
  const n = fieldNote(params.slug)
  if (!n) notFound()
  const more = FIELD_NOTES.filter(x => x.slug !== n.slug && x.tag === n.tag).concat(FIELD_NOTES.filter(x => x.slug !== n.slug && x.tag !== n.tag)).slice(0, 3)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: n.title, description: n.dek, publisher: { '@type': 'Organization', name: 'Apex Metabolic Health' } }
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <article className="fn-art" aria-labelledby="fn-art-title">
          <div className="container-x">
            <div className="fn-art-in">
              <span className="fn-tag" data-tag={n.tag}><span aria-hidden="true" />{n.tag}</span>
              <h1 id="fn-art-title">{n.title}</h1>
              <p className="fn-art-dek">{n.dek}</p>
              <p className="fn-art-meta">Field Notes · {n.minutes} min read</p>
            </div>
            <div className="fn-art-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.img.src} srcSet={n.img.srcSet} sizes="(min-width: 1100px) 1100px, 100vw" alt={n.img.alt} style={{ objectPosition: n.img.pos ?? '50% 50%' }} />
            </div>
            <div className="fn-art-in fn-art-body">
              {n.body.map((p, i) => <p key={i}>{p}</p>)}
              <p className="fn-art-note">General information only, not medical advice. Your own doctor decides what to test and whether any treatment is suitable for you. If you have urgent symptoms, call 000.</p>
            </div>
          </div>
        </article>
        <FieldNotes notes={more} id="fn-more" title="More field notes." />
        <CtaBand shot={SHOTS.duskWoman} />
        <ImageryNote />
      </main>
      <InnerFoot />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
