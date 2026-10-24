import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/membership',
  title: 'Membership',
  description: 'Apex membership: ongoing doctor-led care for one monthly fee, with member consult and panel rates. Pause or cancel from your account.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
