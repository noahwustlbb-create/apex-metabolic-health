import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import FieldNotes from '@/components/FieldNotes'
import { FIELD_NOTES } from '@/lib/field-notes'
import { pageMetadata } from '@/lib/seo'
import { CtaBand, InnerFoot, SHOTS } from '@/components/inner/InnerSections'

export const metadata = pageMetadata({
  path: '/field-notes',
  title: 'Field Notes',
  description: 'Short, plain-English notes from Apex Metabolic Health on blood tests, hormones, training, recovery and longevity. General information, read with your doctor.',
})

export default function FieldNotesIndex() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <div style={{ paddingTop: 88 }}>
          <FieldNotes notes={FIELD_NOTES} id="fn-index" all={false} h="h1" />
        </div>
        <CtaBand shot={SHOTS.duskWoman} />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
