import type { Metadata } from 'next'
import TrtBloodsForm from './TrtBloodsForm'

export const metadata: Metadata = {
  title: 'TRT Monitoring Panel | Apex Metabolic Health',
  description: 'Order your TRT monitoring blood panel — doctor-ordered, no GP referral required. Essential markers for patients on testosterone therapy.',
  robots: { index: false, follow: false },
}

export default function TrtBloodsPage() {
  return <TrtBloodsForm />
}
