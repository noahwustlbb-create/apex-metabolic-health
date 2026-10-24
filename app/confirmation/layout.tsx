import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/confirmation',
  title: 'Confirmation',
  description: 'Your Apex request has been received.', noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
