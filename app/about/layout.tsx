import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/about',
  title: 'About Apex',
  description: 'The clinical team behind Apex Metabolic Health: AHPRA-registered doctors, accredited pathology and an Australian pharmacy partner, delivered by telehealth.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
