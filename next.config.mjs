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
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
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
