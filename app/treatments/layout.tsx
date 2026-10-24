import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/treatments',
  title: 'Treatments',
  description: 'Doctor-led programs built around your biology. Every program starts with a blood panel and a telehealth review with an AHPRA-registered doctor.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
