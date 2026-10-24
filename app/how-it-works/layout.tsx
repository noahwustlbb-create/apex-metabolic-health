import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/how-it-works',
  title: 'How It Works',
  description: 'Sign up, complete your intake, get your blood panel, then review the results with an AHPRA-registered doctor by telehealth. Reviews every three months.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
