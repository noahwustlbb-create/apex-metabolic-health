import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/book/hormone-consult',
  title: 'Hormone Consultation',
  description: 'A doctor-led hormone consultation built on a 23+ marker blood panel. Telehealth, Australia-wide, no GP referral needed.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
