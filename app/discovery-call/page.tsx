import DiscoveryCallForm from './DiscoveryCallForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Discovery Call | Apex Metabolic Health',
  description: 'Book a free discovery call with our clinical team. We will review your situation and confirm whether an Apex program is the right fit for you.',
}

export default function DiscoveryCallPage() {
  return <DiscoveryCallForm />
}
