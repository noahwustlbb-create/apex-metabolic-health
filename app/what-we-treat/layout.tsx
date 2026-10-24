import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/what-we-treat',
  title: 'What We Treat',
  description: 'The symptoms and concerns Apex doctors assess: energy, weight, libido, recovery, ageing, skin and hair, read clinically from your blood panel.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
