// Single source of truth for consult booking links on the public website.
// The website only offers standard rates; member rates live in the portal,
// where membership is known. Switch Calendly -> GoHighLevel with this one
// constant (keep it in step with apex-portal src/lib/booking.ts).
export const BOOKING_PROVIDER: 'calendly' | 'ghl' = 'calendly'

const LINKS = {
  hormone: {
    calendly: 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation',
    ghl: 'https://api.leadconnectorhq.com/widget/bookings/comprehensive-hormone-consultation',
  },
  general: {
    calendly: 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult',
    ghl: 'https://api.leadconnectorhq.com/widget/bookings/quick-check-up-peptide-consult',
  },
} as const

export type ConsultKind = keyof typeof LINKS

export const HORMONE_BOOKING_URL = LINKS.hormone[BOOKING_PROVIDER]
export const GENERAL_BOOKING_URL = LINKS.general[BOOKING_PROVIDER]
export const bookingUrl = (kind: ConsultKind) => LINKS[kind][BOOKING_PROVIDER]
