import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/services',
  title: 'Services',
  description: 'Doctor-led programs for hormonal, metabolic, sexual, recovery, longevity, skin and hair health, each starting with a comprehensive blood panel.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
