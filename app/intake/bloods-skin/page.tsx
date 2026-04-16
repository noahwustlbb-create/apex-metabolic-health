import type { Metadata } from 'next'
import SkinBloodsForm from './SkinBloodsForm'

export const metadata: Metadata = {
  title: 'Order Skin Regeneration Panel | Apex Metabolic Health',
  description: 'Order your Skin Regeneration Blood Panel — doctor-ordered, no GP referral required.',
  robots: 'noindex, nofollow',
}

export default function SkinBloodsPage() {
  return <SkinBloodsForm />
}
