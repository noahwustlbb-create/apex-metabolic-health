import type { Metadata } from 'next'
import MetabolicBloodsForm from './MetabolicBloodsForm'

export const metadata: Metadata = {
  title: 'Order Metabolic Health Panel | Apex Metabolic Health',
  description: 'Order your Metabolic Health Blood Panel — doctor-ordered, no GP referral required. Collect at any accredited centre near you.',
  robots: 'noindex, nofollow',
}

export default function MetabolicBloodsPage() {
  return <MetabolicBloodsForm />
}
