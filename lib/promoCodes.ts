// Add or remove promo codes here
// Format: { code: 'CODE', description: 'What it represents' }

export const PROMO_CODES: Record<string, string> = {
  // Example — add your codes here when ready:
  // 'JENNA10': 'Jenna referral promo',
  // 'APEX20': 'Launch promo',
}

export function validatePromoCode(code: string): boolean {
  return code.toUpperCase().trim() in PROMO_CODES
}

export function getPromoDescription(code: string): string {
  return PROMO_CODES[code.toUpperCase().trim()] || ''
}
