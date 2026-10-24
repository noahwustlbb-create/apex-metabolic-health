import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: 'The terms that apply when you use the Apex Metabolic Health website, portal and telehealth services.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
