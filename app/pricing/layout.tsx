import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/pricing',
  title: 'Pricing',
  description: 'What Apex costs, added up: blood panels, consults, membership and pharmacy fees for your first three months. Private clinic, no Medicare rebate.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
