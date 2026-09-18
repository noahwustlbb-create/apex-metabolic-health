import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Order Blood Tests',
  description: 'Order doctor-reviewed blood panels online. Results in about 48 hours at accredited collection centres across Australia.',
}

/**
 * Bloody Good Tests is no longer the ordering path. iMedical is.
 *
 * This page used to fetch BGT bundles and open a BGT checkout in an iframe,
 * which meant the marketing site picked the panel and the price. It cannot do
 * that correctly: member pricing is $192 against a $254 standard panel, and
 * whether someone is a member is a database fact. Only the portal can check it,
 * and it already does, server-side, in api/_imedical.ts (pickImedicalLink).
 *
 * So ordering moves to the portal, which reads the membership, picks the right
 * iMedical checkout, and records the order against the patient. That also means
 * a patient who orders is a patient we can follow up, rather than an anonymous
 * lab order we later have to reconcile by hand.
 *
 * BGT itself is deliberately NOT removed from the codebase: it is still the
 * path results arrive on (lib/bgt-sync.ts, api/sync-bloods.ts in the portal).
 * iMedical's results API is not usable yet - the endpoint in their docs is
 * wrong, confirmed by their own developer on 18 Sep, and no token or client ID
 * has been issued. Ordering can move today; results cannot.
 */
export default function OrderBloodsPage() {
  permanentRedirect('https://app.apexmetabolichealth.com.au/dashboard/results?tab=order')
}
