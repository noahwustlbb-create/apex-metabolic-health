import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/book',
  title: 'Book a Consultation',
  description: 'Choose the consultation that fits why you are here. Telehealth with an AHPRA-registered doctor, blood panel included in the pathway, no GP referral needed.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
