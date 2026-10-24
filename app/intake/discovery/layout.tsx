import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/intake/discovery',
  title: 'Discovery Call Request',
  description: 'Request a free discovery call with the Apex clinical coordination team.', noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
