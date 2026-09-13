import type { MetadataRoute } from 'next'
import { programs } from '@/lib/programs'

const SITE_URL = 'https://www.apexmetabolichealth.com.au'

const publicRoutes = [
  '',
  '/about',
  '/app',
  '/assessment',
  '/book',
  '/book/general-consult',
  '/book/hormone-consult',
  '/discovery-call',
  '/faqs',
  '/get-started',
  '/hormone-check',
  '/how-it-works',
  '/learn',
  '/membership',
  '/metabolic-check',
  '/order-bloods',
  '/our-approach',
  '/pricing',
  '/privacy-policy',
  '/programs-select',
  '/quiz',
  '/services',
  '/start',
  '/terms',
  '/treatments',
  '/what-we-treat',
]

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

  return [...staticPages, ...programPages, ...additionalProgramPages]
}
