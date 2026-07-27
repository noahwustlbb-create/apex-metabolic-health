import type { Metadata } from 'next'
import RepeatOrderForm from './RepeatOrderForm'

export const metadata: Metadata = {
  title: 'Repeat Order | Consult Form | Apex Metabolic Health',
  description: 'Repeat Order and Existing Patient Renewal Form. For existing Apex Metabolic Health patients.',
  robots: { index: false, follow: false },
}

export default function RepeatOrderPage() {
  return <RepeatOrderForm />
}
