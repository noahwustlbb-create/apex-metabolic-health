export type EnquiryType =
  | 'trt'
  | 'peptides'
  | 'weight-loss'
  | 'injury-repair'
  | 'hair'
  | 'skin'
  | 'sexual-health'
  | 'anti-aging'
  | 'sleep'

export const ENQUIRY_LABELS: Record<EnquiryType, string> = {
  'trt': 'TRT / Hormone Optimisation',
  'peptides': 'Peptides',
  'weight-loss': 'Weight Loss',
  'injury-repair': 'Injury Repair & Recovery',
  'hair': 'Hair Restoration',
  'skin': 'Skin Regeneration',
  'sexual-health': 'Sexual Health',
  'anti-aging': 'Anti-Aging & Longevity',
  'sleep': 'Sleep Optimisation',
}

export type ProductType =
  | 'panel-hormone'
  | 'panel-weight-loss'
  | 'panel-injury'
  | 'panel-hair'
  | 'panel-skin'
  | 'consult-hormone'
  | 'consult-hormone-recovery'
  | 'consult-general'

export interface Product {
  type: ProductType
  name: string
  description: string
  price: number
  priceEnvKey: string
}

const PRODUCTS: Record<ProductType, Omit<Product, 'type'>> = {
  'panel-hormone': {
    name: 'Hormone Health Panel',
    description: 'Comprehensive hormone and metabolic blood panel. Doctor-issued referral sent within 24 hours. Collect at any accredited pathology centre nationwide — no appointment required.',
    price: 199,
    priceEnvKey: 'STRIPE_PRICE_PANEL_HORMONE',
  },
  'panel-weight-loss': {
    name: 'Metabolic Weight Loss Panel',
    description: 'Targeted metabolic and hormonal markers to guide your weight loss protocol. Doctor-issued referral sent within 24 hours.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_WEIGHT_LOSS',
  },
  'panel-injury': {
    name: 'Injury Recovery Panel',
    description: 'Markers to assess recovery capacity, inflammation, and tissue repair. Doctor-issued referral sent within 24 hours.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_INJURY',
  },
  'panel-hair': {
    name: 'Hair Restoration Panel',
    description: 'Hormonal and nutritional markers linked to hair loss and scalp health. Doctor-issued referral sent within 24 hours.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_HAIR',
  },
  'panel-skin': {
    name: 'Skin Regeneration Panel',
    description: 'Hormonal and inflammatory markers that influence skin health and regeneration. Doctor-issued referral sent within 24 hours.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_SKIN',
  },
  'consult-hormone': {
    name: 'Hormone Consultation',
    description: 'One-on-one telehealth consultation with an AHPRA-registered doctor. Your results are reviewed and a personalised protocol is discussed where clinically appropriate.',
    price: 275,
    priceEnvKey: 'STRIPE_PRICE_CONSULT_HORMONE',
  },
  'consult-hormone-recovery': {
    name: 'Hormone & Recovery Consultation',
    description: 'Comprehensive telehealth consultation covering hormone optimisation and recovery. Your doctor reviews your results and builds your protocol where clinically appropriate.',
    price: 300,
    priceEnvKey: 'STRIPE_PRICE_CONSULT_HORMONE_RECOVERY',
  },
  'consult-general': {
    name: 'General Consultation',
    description: 'Telehealth consultation with an AHPRA-registered doctor. Your health history is reviewed and next clinical steps are discussed.',
    price: 125,
    priceEnvKey: 'STRIPE_PRICE_CONSULT_GENERAL',
  },
}

export function getProduct(enquiry: EnquiryType, hasBloods: boolean): Product {
  let type: ProductType

  if (hasBloods) {
    if (enquiry === 'peptides') type = 'consult-hormone-recovery'
    else if (['weight-loss', 'injury-repair', 'hair', 'skin'].includes(enquiry)) type = 'consult-general'
    else type = 'consult-hormone'
  } else {
    if (enquiry === 'weight-loss') type = 'panel-weight-loss'
    else if (enquiry === 'injury-repair') type = 'panel-injury'
    else if (enquiry === 'hair') type = 'panel-hair'
    else if (enquiry === 'skin') type = 'panel-skin'
    else type = 'panel-hormone'
  }

  return { type, ...PRODUCTS[type] }
}

export function getPriceId(productType: ProductType): string {
  const product = PRODUCTS[productType]
  const id = process.env[product.priceEnvKey]
  if (!id) throw new Error(`Missing env var: ${product.priceEnvKey}`)
  return id
}
