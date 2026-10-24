import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/faqs',
  title: 'FAQs',
  description: 'Straight answers about Apex: how telehealth consults work, blood panels, pricing, membership, prescriptions and privacy.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
