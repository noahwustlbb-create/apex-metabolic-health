import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/unsubscribe',
  title: 'Unsubscribe',
  description: 'Manage your Apex Metabolic Health email preferences.', noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
