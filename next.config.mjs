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
]

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
    return LEGACY_INTAKE_ROUTES.map((source) => ({
      source,
      destination: PORTAL_SIGNUP,
      permanent: false,
    }))
  },
}

export default nextConfig
