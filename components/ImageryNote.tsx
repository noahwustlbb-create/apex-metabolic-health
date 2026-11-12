/**
 * One small mono caption for every inner page that uses the AI lifestyle
 * photos (Noah, 12 Nov 2026): replaces per-image "Illustrative render" tags.
 * Sits at the bottom of the last content section, before the footer.
 * tone="dark" on the black strip under a photo CTA band, "light" on the page
 * background. Styles: styles/inner.css (.ip-note).
 */
export default function ImageryNote({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <div className="ip-note" data-tone={tone}>
      <div className="container-x">
        <p className="al-k">Lifestyle imagery is illustrative. Nobody shown is a patient or staff.</p>
      </div>
    </div>
  )
}
