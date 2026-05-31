import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AgeGate from '@/components/AgeGate'
import ReferralCapture from '@/components/ReferralCapture'
import { ThemeProvider } from '@/components/ThemeProvider'

const GA_ID = 'G-DFH5B44HVQ'
const AW_ID = 'AW-18089713060'

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
    <html lang="en-AU" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('apex-theme');var d=t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            gtag('config', '${AW_ID}');
          `}
        </Script>
        <ThemeProvider>
          <AgeGate />
          <ReferralCapture />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
