import type { Metadata } from 'next'
import HormoneBloodsForm from './HormoneBloodsForm'

export const metadata: Metadata = {
  title: 'Order Hormone Health Panel | Apex Metabolic Health',
  description: 'Order your Hormone Health Blood Panel — doctor-ordered, no GP referral required. Collect at any accredited centre near you.',
  robots: 'noindex, nofollow',
}

export default function HormoneBloodsPage() {
  return <HormoneBloodsForm />
}
