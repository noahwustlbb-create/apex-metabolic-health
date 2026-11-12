// Blood panels shown on /order-bloods (AlgoRx "Core Health Panels" layout, Noah 12 Nov 2026).
//
// Truth only. Every fact here has a source:
//   Price $280, members $199, men and women: app/pricing/page.tsx ("Initial Blood Referral")
//     and the portal's api/_bloodPrices.ts PRICE_CENTS.full (Noah, 11 Nov 2026).
//   "23+ markers": the site's standing claim (app/programs/pathology/page.tsx, components/home/Hero.tsx).
//   Body systems: the portal's src/lib/pathology.ts APEX_PANELS, read from the live iMedical
//     checkouts on 11 Nov 2026. The paragraph names only what BOTH the member and the standard
//     checkout include, then says what the standard one adds, so no buyer is promised a test
//     their checkout does not carry.
//   Lab: the site names its pathology "NATA-accredited" (components/DoctorCard.tsx, app/about).
// Intermediate and Advanced do not exist yet: no price, no marker count, no marker names.

import { PORTAL_ORDER_BLOODS } from './portal'

export type PanelSex = 'male' | 'female'
export type PanelTier = 'basic' | 'intermediate' | 'advanced'

export type BloodPanel = {
  tier: PanelTier
  name: string
  body: string
  texture: string
  live: boolean
  markers?: string
  price?: string
  memberChip?: string
  orderHref?: string
  learnHref?: string
}

export const PANEL_LAB = 'NATA-accredited'
export const PANEL_NOTIFY_HREF = '/signup'

const TEXTURE: Record<PanelTier, string> = {
  basic: '/programs-grid/pathology-1200.webp',
  intermediate: '/programs-grid/metabolic-weight-loss-1200.webp',
  advanced: '/programs-grid/longevity-1200.webp',
}

const LIVE = {
  live: true,
  markers: '23+ markers',
  price: '$280',
  memberChip: 'Members $199',
  orderHref: PORTAL_ORDER_BLOODS,
  learnHref: '/programs/pathology',
} as const

const comingSoon = (tier: Exclude<PanelTier, 'basic'>, body: string): BloodPanel => ({
  tier,
  name: tier === 'intermediate' ? 'Intermediate' : 'Advanced',
  body,
  texture: TEXTURE[tier],
  live: false,
})

const INTERMEDIATE_BODY = 'Builds on the Basic with a deeper look at inflammation, nutrient status and hormones. Not available yet.'
const ADVANCED_BODY = 'Our most detailed panel, still in development: a wider view of hormones, nutrients, and heart and metabolic health.'

export const BLOOD_PANELS: Record<PanelSex, BloodPanel[]> = {
  male: [
    {
      tier: 'basic',
      name: 'Basic',
      body: 'Your first full panel, ordered and reviewed by an AHPRA-registered doctor. One morning draw covers hormone markers, thyroid, prostate and metabolic markers, a full blood count, inflammation (hs-CRP), and liver and kidney function, glucose and cholesterol. The standard panel also includes HbA1c and iron studies. Your doctor reviews every marker in context.',
      texture: TEXTURE.basic,
      ...LIVE,
    },
    comingSoon('intermediate', INTERMEDIATE_BODY),
    comingSoon('advanced', ADVANCED_BODY),
  ],
  female: [
    {
      tier: 'basic',
      name: 'Basic',
      body: 'Your first full panel, ordered and reviewed by an AHPRA-registered doctor. One morning draw covers hormones, thyroid, iron, a full blood count, inflammation (hs-CRP), and liver and kidney function, glucose and cholesterol. The standard panel also includes free T3, free T4 and vitamin D. Your doctor reviews every marker in context.',
      texture: TEXTURE.basic,
      ...LIVE,
    },
    comingSoon('intermediate', INTERMEDIATE_BODY),
    comingSoon('advanced', ADVANCED_BODY),
  ],
}
