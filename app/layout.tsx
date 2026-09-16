import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AgeNotice from '@/components/AgeNotice'
import ReferralCapture from '@/components/ReferralCapture'
import FloatingContact from '@/components/FloatingContact'
import GhlChatWidget from '@/components/GhlChatWidget'
import { SignupGateProvider } from '@/context/SignupGateContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import MotionProvider from '@/components/MotionProvider'

const GA_ID = 'G-DFH5B44HVQ'
const AW_ID = 'AW-18089713060'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})


const SITE_URL = 'https://www.apexmetabolichealth.com.au'
const TITLE = 'Apex Metabolic Health | Doctor-Led Hormone & Metabolic Clinic, Australia'
const DESCRIPTION =
  'Doctor-led telehealth for hormone and metabolic health. Full pathology panels, AHPRA-registered doctors, and clinical protocols built on your numbers. 100% online, Australia-wide, no GP referral.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Apex Metabolic Health',
  },
  description: DESCRIPTION,
  applicationName: 'Apex Metabolic Health',
  keywords: [
    'hormone clinic Australia',
    'metabolic health clinic',
    'hormone optimisation telehealth',
    'doctor-led telehealth Australia',
    'comprehensive blood test Australia',
    'medical weight loss doctor',
    'AHPRA registered telehealth',
    'men\'s health clinic online',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'en_AU',
    siteName: 'Apex Metabolic Health',
    url: '/',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Apex Metabolic Health, doctor-led hormone and metabolic care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: '/apple-icon-180.png',
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

// Organisation and site graph for search engines. Facts only: no outcomes,
// no medication names, nothing a TGA advertising review would object to.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Apex Metabolic Health',
      legalName: 'Imperial Equity Investments Pty Ltd',
      url: SITE_URL,
      logo: `${SITE_URL}/icon-192.png`,
      image: `${SITE_URL}/og.jpg`,
      description: DESCRIPTION,
      email: 'admin@apexmetabolichealth.com.au',
      areaServed: { '@type': 'Country', name: 'Australia' },
      medicalSpecialty: ['Endocrinology', 'PrimaryCare'],
      availableService: [
        { '@type': 'MedicalProcedure', name: 'Telehealth consultation' },
        { '@type': 'MedicalTest', name: 'Comprehensive blood panel' },
      ],
      sameAs: ['https://instagram.com/apex_metabolichealth', 'https://facebook.com/apexmetabolichealth'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Apex Metabolic Health',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-AU',
    },
  ],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased overflow-x-hidden">
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
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
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            gtag('config', '${AW_ID}');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <AgeNotice />
        <ReferralCapture />
        <ThemeProvider>
          <MotionProvider>
            <SignupGateProvider>
              {children}
              <FloatingContact />
              <GhlChatWidget />
            </SignupGateProvider>
          </MotionProvider>
        </ThemeProvider>
        <Script
          id="ghl-external-tracking"
          src="https://links.apexmetabolichealth.com.au/js/external-tracking.js"
          data-tracking-id="tk_f305a784711e4fb7ba579d4cc0264718"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
