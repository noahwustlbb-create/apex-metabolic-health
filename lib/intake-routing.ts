export type EnquiryType =
  | 'trt'
  | 'performance'
  | 'weight-loss'
  | 'injury-repair'
  | 'hair'
  | 'skin'
  | 'sexual-health'
  | 'anti-aging'
  | 'sleep'

export const ENQUIRY_LABELS: Record<EnquiryType, string> = {
  'trt': 'Hormone Optimisation',
  'performance': 'Performance & Recovery',
  'weight-loss': 'Weight Loss',
  'injury-repair': 'Injury Repair & Recovery',
  'hair': 'Hair Restoration',
  'skin': 'Skin Regeneration',
  'sexual-health': 'Sexual Health',
  'anti-aging': 'Anti-Aging & Longevity',
  'sleep': 'Sleep Optimisation',
}

// bloodygoodtests.com.au panel URLs — shown when patient has no existing bloods
export const PANEL_URLS: Record<EnquiryType, string> = {
  'trt':          'https://app.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
  'sexual-health':'https://app.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
  'anti-aging':   'https://app.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
  'sleep':        'https://app.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
  'performance':  'https://app.bloodygoodtests.com.au/buy/6b4a52f4-fcb8-422c-aefb-aa2811451d0f',
  'injury-repair':'https://app.bloodygoodtests.com.au/buy/6b4a52f4-fcb8-422c-aefb-aa2811451d0f',
  'weight-loss':  'https://app.bloodygoodtests.com.au/buy/6b4a52f4-fcb8-422c-aefb-aa2811451d0f',
  'hair':         'https://app.bloodygoodtests.com.au/buy/a09b6127-f307-4446-81a6-ab7789440754',
  'skin':         'https://app.bloodygoodtests.com.au/buy/a09b6127-f307-4446-81a6-ab7789440754',
}

export type ProductType =
  | 'panel-hormone'
  | 'panel-performance'
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
    name: 'Hormone Panel',
    description: 'Comprehensive hormone and metabolic blood panel. Collect at any accredited pathology centre nationwide — no appointment required.',
    price: 199,
    priceEnvKey: 'STRIPE_PRICE_PANEL_HORMONE',
  },
  'panel-performance': {
    name: 'Performance & Recovery Panel',
    description: 'Markers covering hormonal output, recovery capacity, inflammation, and tissue repair. Collect at any accredited pathology centre.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_INJURY',
  },
  'panel-weight-loss': {
    name: 'Metabolic Weight Loss Panel',
    description: 'Targeted metabolic and hormonal markers to guide your weight loss protocol. Collect at any accredited pathology centre.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_WEIGHT_LOSS',
  },
  'panel-injury': {
    name: 'Injury Recovery Panel',
    description: 'Markers to assess recovery capacity, inflammation, and tissue repair. Collect at any accredited pathology centre.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_INJURY',
  },
  'panel-hair': {
    name: 'Hair Restoration Panel',
    description: 'Hormonal and nutritional markers linked to hair loss and scalp health. Collect at any accredited pathology centre.',
    price: 150,
    priceEnvKey: 'STRIPE_PRICE_PANEL_HAIR',
  },
  'panel-skin': {
    name: 'Skin Regeneration Panel',
    description: 'Hormonal and inflammatory markers that influence skin health and regeneration. Collect at any accredited pathology centre.',
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
    if (['weight-loss', 'injury-repair', 'hair', 'skin'].includes(enquiry)) type = 'consult-general'
    else if (enquiry === 'performance') type = 'consult-hormone-recovery'
    else type = 'consult-hormone'
  } else {
    if (enquiry === 'weight-loss') type = 'panel-weight-loss'
    else if (enquiry === 'injury-repair') type = 'panel-injury'
    else if (enquiry === 'performance') type = 'panel-performance'
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
