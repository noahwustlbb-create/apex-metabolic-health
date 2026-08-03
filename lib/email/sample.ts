import type { EmailData } from './templates'

/** Realistic placeholder data so previews show how a real send actually looks. */
export const SAMPLE: EmailData = {
  firstName: 'James',
  program: 'Hormone Optimisation',
  doctorName: 'Dr Sarah Chen',
  appointmentDate: 'Thursday, 14 August 2026',
  appointmentTime: '10:30am AEST',
  appointmentFormat: 'Telehealth video call',
  panelName: 'Comprehensive Hormone Panel (32 markers)',
  amount: '$249.00',
  orderRef: 'APX-48213',
  trackingNumber: 'AP7739210458',
  trackingUrl: 'https://auspost.com.au/mypost/track',
  missingItems: ['Medical history form', 'Current medication list'],
  effectiveDate: '1 September 2026',
  accessUntil: 'Until 1 September 2026',
}
