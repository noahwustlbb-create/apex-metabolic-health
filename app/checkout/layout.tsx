import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/checkout',
  title: 'Checkout',
  description: 'Secure checkout for Apex Metabolic Health.', noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
