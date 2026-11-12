import type { MetadataRoute } from 'next'
import { programs } from '@/lib/programs'
import { FIELD_NOTES } from '@/lib/field-notes'

const SITE_URL = 'https://www.apexmetabolichealth.com.au'

const publicRoutes = [
  '',
  '/about',
  '/app',
  '/book',
  '/discovery-call',
  '/faqs',
  '/field-notes',
  '/get-started',
  '/how-it-works',
  '/membership',
  '/pricing',
  '/order-bloods',
  '/privacy-policy',
  '/terms',
  '/treatments',
]

const fieldNoteRoutes = FIELD_NOTES.map(n => `/field-notes/${n.slug}`)

const additionalProgramRoutes = [
  '/programs/pathology',
  '/programs/sexual-health',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date()
  const staticPages = publicRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '' ? 1 : 0.7,
  }))

  const programPages = programs.map(({ slug }) => ({
    url: `${SITE_URL}/programs/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const additionalProgramPages = additionalProgramRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const notePages = fieldNoteRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...programPages, ...additionalProgramPages, ...notePages]
}
