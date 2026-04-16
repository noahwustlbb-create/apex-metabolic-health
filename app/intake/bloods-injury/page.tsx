import type { Metadata } from 'next'
import InjuryBloodsForm from './InjuryBloodsForm'

export const metadata: Metadata = {
  title: 'Order Injury Repair & Recovery Panel | Apex Metabolic Health',
  description: 'Order your Injury Repair & Recovery Blood Panel — doctor-ordered, no GP referral required.',
  robots: 'noindex, nofollow',
}

export default function InjuryBloodsPage() {
  return <InjuryBloodsForm />
}
