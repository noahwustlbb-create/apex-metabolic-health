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

// Live Google Ads final URLs that point at paths this site has never had.
// Verified 2026-09-19 against www.apexmetabolichealth.com.au: /get/started,
// /hormone/consult, /peptide/consult and /bloods all returned 404 while the
// account was spending. Fixing the ads themselves needs a Google re-auth we
// cannot complete from here, so the destination absorbs the mistake instead —
// every paid click now lands on a real page. Temporary (307): the moment the
// ad URLs are corrected these become dead weight and can be deleted.
const AD_LANDING_ROUTES = [
  ['/get/started', '/get-started'],
  ['/hormone/consult', '/start?t=hormone'],
  // No peptide page exists, and peptides are Schedule 4 — a dedicated landing
  // page would be prescription-drug advertising. Conditions overview instead.
  ['/peptide/consult', '/what-we-treat'],
  ['/peptides', '/what-we-treat'],
  ['/bloods', '/order-bloods'],
]

// The old per-program quizzes, retired 28 Sep 2026 (Noah: no old quizzes).
// /start is the one assessment; ?t= preselects the pathway. Some of these
// are live Google Ads destinations, so they redirect rather than 404.
const RETIRED_QUIZZES = [
  ['/intake/quiz/hormone', '/start?t=hormone'],
  ['/intake/quiz/weightloss', '/start?t=weight'],
  ['/intake/quiz/performance', '/start?t=recovery'],
  ['/intake/quiz/hair', '/start?t=skinhair'],
  ['/intake/quiz/injury', '/start?t=recovery'],
  ['/intake/quiz/antiageing', '/start?t=longevity'],
  ['/intake/quiz/sexual', '/start?t=sexual'],
  ['/intake/quiz/skin', '/start?t=skinhair'],
  ['/hormone-check', '/start?t=hormone'],
  ['/metabolic-check', '/start?t=weight'],
  ['/assessment', '/start'],
  ['/quiz', '/start'],
  ['/programs-select', '/start'],
]

// Content-Security-Policy, ENFORCED (security leftover from the 5 Oct 2026
// audit). Every origin below was inventoried from the live site on 10 Oct 2026:
// the GTM container (GTM-KTMMBP3M) only carries the Google Ads tag
// AW-18089713060 + the gclid linker, PostHog is proxied through /ingest, and
// the GoHighLevel external tracker loads from links.apexmetabolichealth.com.au
// and reports to backend.leadconnectorhq.com. Adding a new third party (a new
// GTM tag vendor, an embed, a chat widget) means adding its origin here first,
// or the browser will block it.
// 'unsafe-inline' stays on script-src: Next renders inline bootstrap + JSON-LD
// scripts and GTM is inlined in app/layout.tsx. Nonces would force every page
// to render dynamically; not worth it for a marketing site with no user data.
const isPreview = process.env.VERCEL_ENV === 'preview'
const VERCEL_LIVE = isPreview ? ['https://vercel.live', 'wss://ws-us3.pusher.com'] : []
const GOOGLE = [
  'https://www.googletagmanager.com',
  'https://www.google.com',
  'https://www.google.com.au',
  'https://googleads.g.doubleclick.net',
  'https://www.googleadservices.com',
  'https://*.doubleclick.net',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://*.analytics.google.com',
  'https://pagead2.googlesyndication.com',
]
const GHL = ['https://links.apexmetabolichealth.com.au', 'https://*.leadconnectorhq.com']
const POSTHOG = ['https://us.i.posthog.com', 'https://us-assets.i.posthog.com']
const CSP = [
  "default-src 'self'",
  ["script-src 'self' 'unsafe-inline'", ...GOOGLE, ...GHL, ...POSTHOG, ...VERCEL_LIVE].join(' '),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  ["connect-src 'self' https://app.apexmetabolichealth.com.au", ...GOOGLE, ...GHL, ...POSTHOG, ...VERCEL_LIVE].join(' '),
  [
    "frame-src 'self'",
    'https://www.googletagmanager.com',
    'https://td.doubleclick.net',
    'https://*.doubleclick.net',
    'https://www.google.com',
    'https://calendly.com',
    'https://*.calendly.com',
    'https://my.bloodygoodtests.com.au',
    ...GHL,
    ...VERCEL_LIVE,
  ].join(' '),
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com https://app.apexmetabolichealth.com.au",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

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
          { key: 'Content-Security-Policy', value: CSP },
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
      ...RETIRED_QUIZZES.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Existing patients reorder inside the portal.
      { source: '/intake/repeat-order', destination: PORTAL_LOGIN, permanent: false },
      ...AD_LANDING_ROUTES.map(([source, destination]) => ({
        source,
        destination,
        permanent: false,
      })),
    ]
  },
}

export default nextConfig
