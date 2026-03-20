import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import FloatingCTA from '@/components/FloatingCTA'
import AgeGate from '@/components/AgeGate'
import ReferralCapture from '@/components/ReferralCapture'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "Apex Metabolic Health | Doctor-Led Telehealth — Australia",
  description:
    "Doctor-led telehealth clinic. Hormone optimisation, metabolic medicine, performance protocols, and more. Evidence-based. AHPRA-registered practitioners. 100% online, Australia-wide.",
  keywords: [
    'hormonal health',
    'telehealth',
    'hormone optimisation',
    'Australia',
    'metabolic health',
    'TRT',
    'low testosterone',
    'weight loss',
    'performance',
  ],
  openGraph: {
    title: "Apex Metabolic Health | Doctor-Led Telehealth",
    description:
      "Real answers. Not reassurance. Doctor-led hormonal and metabolic medicine delivered online across Australia.",
    type: 'website',
    locale: 'en_AU',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        className="antialiased overflow-x-hidden"
        style={{ backgroundColor: '#070a0d', color: '#f0f4f8' }}
      >
        <AgeGate />
        <ReferralCapture />
        {children}
        <FloatingCTA />
      </body>
    </html>
  )
}
