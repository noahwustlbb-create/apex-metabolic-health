import type { Metadata } from 'next'

// Per-page metadata. Every indexable page gets its own title, description and
// a canonical pointing at itself. The root layout deliberately sets no
// canonical, because a canonical there is inherited by every page and tells
// Google each page is a copy of the homepage (live QA, 24 Oct 2026).
//
// `title` is the page name only. The brand suffix is added here as an absolute
// title, because a nested layout with its own title stops the root template.

export const SITE_URL = 'https://www.apexmetabolichealth.com.au'
const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: 'Apex Metabolic Health, doctor-led hormone and metabolic care' }

export function pageMetadata({
  path,
  title,
  description,
  noindex = false,
}: {
  path: string
  title: string
  description: string
  noindex?: boolean
}): Metadata {
  const fullTitle = `${title} | Apex Metabolic Health`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      locale: 'en_AU',
      siteName: 'Apex Metabolic Health',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: ['/og.jpg'] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
