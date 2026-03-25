// Add or remove promo codes here
// Format: { code: 'CODE', description: 'What it represents' }

export const PROMO_CODES: Record<string, string> = {
  'MMFITNESS': 'MM Fitness referral',
}

export function validatePromoCode(code: string): boolean {
  return code.toUpperCase().trim() in PROMO_CODES
}

export function getPromoDescription(code: string): string {
  return PROMO_CODES[code.toUpperCase().trim()] || ''
}
