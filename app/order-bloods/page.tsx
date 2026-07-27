import type { Metadata } from 'next'
import BgtOrderPage from './BgtOrderPage'

export const metadata: Metadata = {
  title: 'Order Blood Tests | Apex Metabolic Health',
  description: 'Order doctor-reviewed blood panels online. Results in 1–3 days at accredited collection centres across Australia.',
}

export default function OrderBloodsPage() {
  return <BgtOrderPage />
}
