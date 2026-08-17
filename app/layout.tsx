import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import AgeGate from '@/components/AgeGate'
import ReferralCapture from '@/components/ReferralCapture'
import FloatingContact from '@/components/FloatingContact'
import ChatWidget from '@/components/ChatWidget'
import { SignupGateProvider } from '@/context/SignupGateContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import MotionProvider from '@/components/MotionProvider'

const GA_ID = 'G-DFH5B44HVQ'
const AW_ID = 'AW-18089713060'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Apex Metabolic Health | Doctor-Led Telehealth | Australia",
  description:
    "Doctor-led telehealth clinic. Hormone optimisation, metabolic medicine, performance protocols, and more. Evidence-based. AHPRA-registered practitioners. 100% online, Australia-wide.",
  keywords: [
    'hormonal health',
    'telehealth',
    'hormone optimisation',
    'Australia',
    'metabolic health',
    'weight loss',
    'performance',
    'AHPRA',
    'doctor-led',
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
    <html lang="en-AU" data-theme="dark" suppressHydrationWarning className={satoshi.variable}>
      <body className="antialiased overflow-x-hidden">
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KTMMBP3M');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KTMMBP3M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager */}
        {/* Runs before hydration - prevents light-mode flash when user has saved a preference */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('apex-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
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
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <AgeGate />
        <ReferralCapture />
        <ThemeProvider>
          <MotionProvider>
            <SignupGateProvider>
              {children}
              <FloatingContact />
              <ChatWidget />
            </SignupGateProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
