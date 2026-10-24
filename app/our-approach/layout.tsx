import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/our-approach',
  title: 'Our Approach',
  description: 'We work by system, not by symptom. How Apex doctors read your blood panel across hormones, metabolism, recovery and longevity.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
