// Legacy public consultation-intake forms collected medical data (DOB,
// conditions, medications) without an account. Medical intake now happens
// inside the logged-in portal, so these routes send visitors to portal
// signup instead. Temporary (307) redirects — reversible if ever needed.
const PORTAL_SIGNUP = 'https://app.apexmetabolichealth.com.au/signup'
const LEGACY_INTAKE_ROUTES = [
  '/intake/hormone-consult',
  '/intake/general-consult',
  '/intake/hormone',
  '/intake/general',
  '/intake/hair',
  '/intake/skin',
  '/intake/injury',
  '/intake/metabolic',
  '/intake/performance',
  '/intake-v2',
  '/forms/hormone',
  '/forms/general',
  // Clinical intake belongs in the portal: these pages collected health data
  // on the public site (privacy fix 2026-09-14).
  '/intake/bloods-hair',
  '/intake/bloods-hormone',
  '/intake/bloods-injury',
  '/intake/bloods-metabolic',
  '/intake/bloods-performance',
  '/intake/bloods-skin',
  '/intake/bloods-trt',
  '/intake/pre-screen',
  '/intake/fast-track',
]

const PORTAL_LOGIN = 'https://app.apexmetabolichealth.com.au/login'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF disabled: Next.js AVIF image-optimizer RCE advisory
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // PostHog through our own domain so ad blockers don't drop analytics.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      ...LEGACY_INTAKE_ROUTES.map((source) => ({
        source,
        destination: PORTAL_SIGNUP,
        permanent: false,
      })),
      // Existing patients reorder inside the portal.
      { source: '/intake/repeat-order', destination: PORTAL_LOGIN, permanent: false },
    ]
  },
}

export default nextConfig
