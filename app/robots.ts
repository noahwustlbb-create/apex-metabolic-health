import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.apexmetabolichealth.com.au'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/checkout',
        '/confirmation',
        '/forms/',
        '/intake/',
        '/intake-v2',
        '/unsubscribe',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
