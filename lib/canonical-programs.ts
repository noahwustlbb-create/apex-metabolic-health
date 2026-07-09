/** Single source of truth for program names, slugs, and destinations. */
export const CANONICAL_PROGRAMS = [
  {
    name: 'Hormone Optimisation',
    slug: 'hormone-optimisation',
    portalHref: 'https://app.apexmetabolichealth.com.au/intake/hormone',
    websiteHref: '/programs/hormone-optimisation',
    navType: 'hormone',
  },
  {
    name: 'Medical Weight Loss',
    slug: 'metabolic-weight-loss',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/metabolic-weight-loss',
    navType: 'weight',
  },
  {
    name: 'Sexual Health',
    slug: 'sexual-health',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/sexual-health',
    navType: 'sexual',
  },
  {
    name: 'Recovery and Injury Repair',
    slug: 'injury-repair',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/injury-repair',
    navType: 'recovery',
  },
  {
    name: 'Anti-Ageing and Longevity',
    slug: 'longevity',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/longevity',
    navType: 'longevity',
  },
  {
    name: 'Skin and Hair',
    slug: 'skin-regeneration',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/skin-regeneration',
    navType: 'skinhair',
  },
  {
    name: 'Comprehensive Blood Tests',
    slug: 'pathology',
    portalHref: 'https://app.apexmetabolichealth.com.au/signup',
    websiteHref: '/programs/pathology',
    navType: 'bloods',
  },
] as const

export type CanonicalProgram = typeof CANONICAL_PROGRAMS[number]
