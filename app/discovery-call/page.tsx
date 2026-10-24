import DiscoveryCallForm from './DiscoveryCallForm'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/discovery-call',
  title: 'Free Discovery Call',
  description: 'Request a free discovery call with our clinical team. We will review your situation and confirm whether an Apex program is the right fit for you.',
})

export default function DiscoveryCallPage() {
  return <DiscoveryCallForm />
}
