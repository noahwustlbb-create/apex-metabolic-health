import type { Metadata } from 'next'
import HairBloodsForm from './HairBloodsForm'

export const metadata: Metadata = {
  title: 'Order Hair Restoration Panel | Apex Metabolic Health',
  description: 'Order your Hair Restoration Blood Panel — doctor-ordered, no GP referral required.',
  robots: 'noindex, nofollow',
}

export default function HairBloodsPage() {
  return <HairBloodsForm />
}
