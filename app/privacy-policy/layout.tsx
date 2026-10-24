import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/privacy-policy',
  title: 'Privacy Policy',
  description: 'How Apex Metabolic Health collects, uses, stores and protects your personal and health information under the Australian Privacy Principles.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
