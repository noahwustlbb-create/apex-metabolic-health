import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/get-started',
  title: 'Get Started',
  description: 'Every way to begin with Apex: a short assessment, a blood panel, a consult or a free discovery call. Choose the path that suits you.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
