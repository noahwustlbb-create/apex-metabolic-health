import type { Metadata } from 'next'
import PerformanceBloodsForm from './PerformanceBloodsForm'

export const metadata: Metadata = {
  title: 'Order Performance & Recovery Panel | Apex Metabolic Health',
  description: 'Order your Performance & Recovery Blood Panel — doctor-ordered, no GP referral required.',
  robots: 'noindex, nofollow',
}

export default function PerformanceBloodsPage() {
  return <PerformanceBloodsForm />
}
