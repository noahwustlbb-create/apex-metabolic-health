import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/app',
  title: 'The Apex Portal',
  description: 'Your care, visible over time. Results, plans, bookings and messages with your doctor in one secure patient portal.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
