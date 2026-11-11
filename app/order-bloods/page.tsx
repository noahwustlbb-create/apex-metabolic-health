import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CoreHealthPanels from '@/components/CoreHealthPanels'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/order-bloods',
  title: 'Order Blood Tests',
  description: 'Doctor-reviewed blood panels for men and women. 23+ markers, $280 or $199 for members, collected at accredited centres across Australia.',
})

/**
 * Order bloods: the panel picker (AlgoRx "Core Health Panels" layout, Noah 12 Nov 2026).
 * This page only shows the panels. Ordering still happens in the portal, which checks
 * membership and picks the right iMedical checkout server-side: ORDER PANEL goes through
 * /signup to the portal's Order Blood Tests tab (lib/portal.ts PORTAL_ORDER_BLOODS).
 */
export default function OrderBloodsPage() {
  return (
    <>
      <Nav />
      <main>
        <CoreHealthPanels headingLevel="h1" />
      </main>
      <Footer />
    </>
  )
}
