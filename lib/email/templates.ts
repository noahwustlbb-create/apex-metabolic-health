// The Apex email journey.
//
// Every template is data, not markup — one shell renders all of them, so the
// design stays consistent and copy is the only thing that varies.
//
// COMPLIANCE RULES baked in here, do not loosen without clinical sign-off:
//  • Never state or imply the patient is approved, eligible, or guaranteed
//    treatment. Use "may be suitable to continue", "subject to clinical review".
//  • Never name a medication, compound or dose. Prescribing stays with the doctor.
//  • `category: 'marketing'` mail carries an unsubscribe link and needs consent.
//    `category: 'service'` mail is care-related and must not carry promotional
//    content — mixing the two turns a service message into a commercial one.

import { PORTAL, SITE, T, type Stage } from './shell'

export interface EmailData {
  firstName?: string
  program?: string
  doctorName?: string
  appointmentDate?: string
  appointmentTime?: string
  appointmentFormat?: string
  panelName?: string
  amount?: string
  orderRef?: string
  trackingNumber?: string
  trackingUrl?: string
  resumeUrl?: string
  missingItems?: string[]
  effectiveDate?: string
  accessUntil?: string
  reason?: string
  [key: string]: unknown
}

export interface Template {
  category: 'service' | 'marketing'
  stage?: Stage
  eyebrow: string
  subject: (d: EmailData) => string
  preheader: (d: EmailData) => string
  heading: (d: EmailData) => string
  intro: (d: EmailData) => string
  detailsTitle?: string
  details?: (d: EmailData) => { label: string; value: string }[]
  body?: (d: EmailData) => string[]
  steps?: (d: EmailData) => string[]
  cta?: (d: EmailData) => { label: string; url: string } | null
  note?: (d: EmailData) => string
}

const hi = (d: EmailData) => (d.firstName ? `Hi ${d.firstName}, ` : '')
const Hi = (d: EmailData) => (d.firstName ? `Hi ${d.firstName}. ` : '')
const prog = (d: EmailData) => d.program || 'your program'
const doc = (d: EmailData) => d.doctorName || 'your Apex doctor'

// Every URL here is checked against a real route. Portal patient pages live
// under /dashboard/* — linking to bare /bloods or /consultations loads the SPA
// shell, matches nothing and leaves the patient on an endless spinner.
const U = {
  assessment: `${SITE}/start`,
  bloods: `${PORTAL}/dashboard/bloods`,
  book: `${PORTAL}/dashboard/consultations`,
  portal: `${PORTAL}/dashboard`,
  results: `${PORTAL}/dashboard/results`,
  account: `${PORTAL}/account`,
  billing: `${PORTAL}/account`,
  intake: `${PORTAL}/dashboard/intake`,
  orders: `${PORTAL}/dashboard/orders`,
  checkin: `${PORTAL}/dashboard/check-in`,
  contact: `${SITE}/start`,
  centres: 'https://www.google.com/maps/search/pathology+collection+centre+near+me',
}

/** Standing compliance line for anything touching suitability. */
const SUITABILITY = 'Final treatment suitability and any prescribing decision remain with your AHPRA-registered Apex doctor, following clinical assessment.'

export const TEMPLATES: Record<string, Template> = {

  // ─── Assessment ────────────────────────────────────────────────────────────

  'assessment-abandoned': {
    category: 'service', stage: 'assessment', eyebrow: 'Assessment in progress',
    subject: () => 'Your Apex assessment is still open',
    preheader: () => 'Pick up exactly where you left off — nothing has been lost.',
    heading: d => `${Hi(d)}Your assessment is saved.`,
    intro: () => 'You started your health assessment but didn\'t finish it. Your answers are saved, so you can pick up exactly where you left off — you won\'t need to start again.',
    body: () => ['It takes about 90 seconds to complete, and it\'s what allows our clinical team to understand your symptoms properly rather than guessing.'],
    cta: d => ({ label: 'Continue my assessment', url: (d.resumeUrl as string) || U.assessment }),
    note: () => 'If something wasn\'t clear or you got stuck, reply to this email and a member of our team will help.',
  },

  'assessment-complete': {
    category: 'service', stage: 'assessment', eyebrow: 'Step 1 complete',
    subject: () => 'Your Apex assessment is complete',
    preheader: () => 'Here\'s where you are and what happens next.',
    heading: d => `${Hi(d)}Your assessment is complete.`,
    intro: () => 'Thank you — your responses have been received and recorded against your file. Based on what you\'ve told us, you may be suitable to continue to the next stage of the assessment process.',
    steps: () => [
      'Complete the recommended blood panel — collected at any of 4,000+ accredited centres Australia-wide',
      'Attend a telehealth consultation with an AHPRA-registered Apex doctor',
      'Receive an individual clinical recommendation based on your results and history',
    ],
    cta: () => ({ label: 'Continue to blood testing', url: U.bloods }),
    note: () => SUITABILITY,
  },

  'assessment-may-continue': {
    category: 'service', stage: 'assessment', eyebrow: 'Next stage available',
    subject: () => 'You\'re ready for the next stage of your Apex assessment',
    preheader: () => 'Your responses indicate you may be suitable to continue.',
    heading: d => `${Hi(d)}You can continue to the next stage.`,
    intro: () => 'Your responses indicate that you may be suitable to continue to the next stage of the assessment process. The next step is objective data — a blood panel that shows your doctor what your symptoms alone cannot.',
    body: () => ['Standard GP panels typically measure a handful of markers. The Apex panel is built around the biomarkers that actually explain how you feel, so your consultation starts from evidence rather than assumption.'],
    cta: () => ({ label: 'Get started', url: U.bloods }),
    note: () => SUITABILITY,
  },

  'process-explainer': {
    category: 'service', stage: 'assessment', eyebrow: 'How Apex works',
    subject: () => 'What happens next with Apex',
    preheader: () => 'The full pathway, and answers to the questions we\'re asked most.',
    heading: d => `${Hi(d)}Here's how the process works.`,
    intro: () => 'You\'ve completed your assessment. Here\'s exactly what the rest of the pathway involves, so there are no surprises.',
    steps: () => [
      'Blood testing gives your doctor objective information about what\'s actually happening',
      'Your consultation reviews your symptoms, goals, history and results together',
      'Your doctor determines whether ongoing clinical care is appropriate for you',
      'If it is, you receive structured monitoring and scheduled reviews',
    ],
    body: () => [
      `<strong style="color:${T.text};">Do I need a GP referral?</strong> No. Your pathology request is issued by an Apex doctor.`,
      `<strong style="color:${T.text};">Can I do this online?</strong> Yes — everything except the blood draw itself.`,
      `<strong style="color:${T.text};">Where do I get tested?</strong> Any of 4,000+ accredited collection centres Australia-wide.`,
      `<strong style="color:${T.text};">Am I guaranteed treatment?</strong> No. Suitability is a clinical decision made by your doctor after reviewing your results.`,
      `<strong style="color:${T.text};">What if it isn't suitable?</strong> Your doctor will explain why and discuss appropriate alternatives or referrals.`,
    ],
    cta: () => ({ label: 'Complete your next step', url: U.bloods }),
  },

  'action-reminder': {
    category: 'service', stage: 'assessment', eyebrow: 'Your next step',
    subject: () => 'Your next Apex step is ready',
    preheader: () => 'Your assessment is saved and waiting.',
    heading: d => `${Hi(d)}Your next step is ready.`,
    intro: () => 'Your assessment is complete and saved. The next step — your blood panel — is ready whenever you are.',
    details: () => [
      { label: 'Assessment', value: 'Complete' },
      { label: 'Blood testing', value: 'Ready to order' },
      { label: 'Clinical review', value: 'Pending your results' },
    ],
    detailsTitle: 'Where you are',
    cta: () => ({ label: 'Continue where you left off', url: U.bloods }),
    note: () => 'Everything is online, and our team is available if you have questions before you commit.',
  },

  'final-followup': {
    category: 'service', stage: 'assessment', eyebrow: 'Still here when you need us',
    subject: () => 'Do you still want to continue with Apex?',
    preheader: () => 'Your assessment stays available — no pressure either way.',
    heading: d => `${Hi(d)}Your assessment is still here.`,
    intro: () => 'We haven\'t heard from you, which is completely fine. Your assessment remains saved and you can continue whenever the timing suits.',
    body: () => ['If something is holding you up — how blood testing works, what the consultation involves, or what the pathway costs — just reply and we\'ll answer honestly.'],
    cta: () => ({ label: 'Resume my assessment', url: U.assessment }),
  },

  'clinical-review-required': {
    category: 'service', stage: 'assessment', eyebrow: 'Additional review',
    subject: () => 'Your Apex assessment needs additional clinical review',
    preheader: () => 'A doctor is taking a closer look. No action needed yet.',
    heading: d => `${Hi(d)}Your assessment needs a closer look.`,
    intro: () => 'Based on your responses, one of our doctors would like to review your case in more detail before recommending a next step. This is routine and is not a decision about your care.',
    body: () => ['You don\'t need to do anything right now. We\'ll be in touch within 1 business day with the outcome and any next step.'],
    note: () => 'If anything changes or you\'d like to speak to someone sooner, reply to this email.',
  },

  // ─── Blood testing ─────────────────────────────────────────────────────────

  'bloods-selected': {
    category: 'service', stage: 'bloods', eyebrow: 'Panel selected',
    subject: () => 'Your Apex blood panel has been selected',
    preheader: () => 'One step left to have your pathology request issued.',
    heading: d => `${Hi(d)}Your panel is selected.`,
    intro: () => 'Your blood panel has been added to your file. To have your pathology request issued by an Apex doctor, complete the final step below.',
    details: d => [
      { label: 'Panel', value: d.panelName || 'Comprehensive panel' },
      { label: 'Status', value: 'Awaiting confirmation' },
    ],
    detailsTitle: 'Your order',
    cta: () => ({ label: 'Complete your order', url: U.bloods }),
  },

  'bloods-payment-received': {
    category: 'service', stage: 'bloods', eyebrow: 'Order confirmed',
    subject: () => 'Your blood test order is confirmed',
    preheader: () => 'Your pathology request is being issued now.',
    heading: d => `${Hi(d)}Your order is confirmed.`,
    intro: () => 'Payment received, and your order is confirmed. An Apex doctor is now issuing your pathology request — you\'ll receive it by email shortly.',
    details: d => [
      { label: 'Panel', value: d.panelName || 'Comprehensive panel' },
      ...(d.amount ? [{ label: 'Amount paid', value: d.amount }] : []),
      ...(d.orderRef ? [{ label: 'Reference', value: d.orderRef }] : []),
    ],
    detailsTitle: 'Order summary',
    steps: () => [
      'Your pathology request arrives by email, usually within a few hours',
      'Attend any accredited collection centre — no appointment needed at most',
      'Results return to Apex directly, typically within 2–5 business days',
    ],
    cta: () => ({ label: 'View my order', url: U.orders }),
    note: () => 'You don\'t need to do anything until your request arrives.',
  },

  'pathology-issued': {
    category: 'service', stage: 'bloods', eyebrow: 'Request issued',
    subject: () => 'Your pathology request is ready',
    preheader: () => 'Everything you need for your blood collection.',
    heading: d => `${Hi(d)}Your pathology request is ready.`,
    intro: () => 'Your doctor-issued pathology request is now available in your Apex account. You can attend any accredited collection centre in Australia — no GP referral required.',
    details: () => [
      { label: 'Fasting', value: 'Required — 8 hours, water only' },
      { label: 'Best time', value: 'Morning, before 10am where possible' },
      { label: 'Bring', value: 'Photo ID and your request form' },
      { label: 'Cost', value: 'Covered by your Apex order' },
    ],
    detailsTitle: 'Before you go',
    body: () => ['Morning collection matters for hormone panels — several markers follow a daily rhythm, and testing outside that window can make results difficult to interpret.'],
    cta: () => ({ label: 'View my request', url: U.bloods }),
    note: () => 'Results return to Apex automatically. You don\'t need to collect or forward anything.',
  },

  'bloods-reminder': {
    category: 'service', stage: 'bloods', eyebrow: 'Reminder',
    subject: () => 'A reminder to complete your blood test',
    preheader: () => 'Your pathology request is still open and ready to use.',
    heading: d => `${Hi(d)}Your blood test is still outstanding.`,
    intro: () => 'Your pathology request has been issued but we haven\'t received your results yet. Your request stays valid — you can attend a collection centre whenever it suits.',
    body: () => ['Remember to fast for 8 hours beforehand and attend in the morning where possible.'],
    cta: () => ({ label: 'Find a collection centre', url: U.centres }),
    note: () => 'If you\'ve already been tested, results can take a few business days to reach us — no action needed.',
  },

  'bloods-results-received': {
    category: 'service', stage: 'bloods', eyebrow: 'Results received',
    subject: () => 'We have received your blood results',
    preheader: () => 'Your consultation can now be booked.',
    heading: d => `${Hi(d)}Your results have arrived.`,
    intro: () => 'Your blood results have been received by Apex and added to your file. Your doctor will review and interpret them with you during your consultation.',
    body: () => ['We don\'t interpret results by email — context matters, and your history and symptoms are part of the picture. That conversation happens with your doctor.'],
    cta: () => ({ label: 'Book your consultation', url: U.book }),
  },

  // ─── Consultation ──────────────────────────────────────────────────────────

  'consult-available': {
    category: 'service', stage: 'consultation', eyebrow: 'Ready to book',
    subject: () => 'Your Apex consultation is ready to book',
    preheader: () => 'Choose a time that suits you.',
    heading: d => `${Hi(d)}You can book your consultation.`,
    intro: () => 'Everything your doctor needs is now on file. The next step is your telehealth consultation, where your results, symptoms and goals are reviewed together.',
    cta: () => ({ label: 'Book your consultation', url: U.book }),
    note: () => 'Consultations run Australia-wide by phone or video. Most take 20–30 minutes.',
  },

  'consult-booking-abandoned': {
    category: 'service', stage: 'consultation', eyebrow: 'Booking incomplete',
    subject: () => 'Finish booking your Apex consultation',
    preheader: () => 'Your selected time hasn\'t been confirmed yet.',
    heading: d => `${Hi(d)}Your booking isn't confirmed yet.`,
    intro: () => 'You started booking a consultation but didn\'t finish, so no appointment has been reserved. Available times change daily — the sooner you confirm, the more choice you\'ll have.',
    cta: () => ({ label: 'Finish booking', url: U.book }),
  },

  'consult-confirmed': {
    category: 'service', stage: 'consultation', eyebrow: 'Appointment confirmed',
    subject: () => 'Your Apex consultation is confirmed',
    preheader: () => 'Your appointment details and how to prepare.',
    heading: d => `${Hi(d)}Your consultation is confirmed.`,
    intro: () => 'Your appointment is booked. Here are the details and a short note on how to get the most from it.',
    details: d => [
      { label: 'Date', value: d.appointmentDate || 'To be confirmed' },
      { label: 'Time', value: d.appointmentTime || 'To be confirmed' },
      { label: 'Doctor', value: doc(d) },
      { label: 'Format', value: d.appointmentFormat || 'Telehealth' },
    ],
    detailsTitle: 'Your appointment',
    body: () => ['Find somewhere quiet where you can speak openly. Have a list of any current medications and supplements handy, and think about the two or three things you most want to address.'],
    cta: () => ({ label: 'View appointment details', url: U.book }),
    note: () => 'Need to change it? Reschedule from your account, or reply here and we\'ll sort it out.',
  },

  'consult-reminder-24h': {
    category: 'service', stage: 'consultation', eyebrow: 'Tomorrow',
    subject: () => 'Your Apex consultation is tomorrow',
    preheader: () => 'A short note on how to prepare.',
    heading: d => `${Hi(d)}Your consultation is tomorrow.`,
    intro: () => 'Just a reminder ahead of your appointment, with a couple of things worth doing beforehand.',
    details: d => [
      { label: 'Time', value: d.appointmentTime || 'As booked' },
      { label: 'Doctor', value: doc(d) },
      { label: 'Format', value: d.appointmentFormat || 'Telehealth' },
    ],
    detailsTitle: 'Tomorrow',
    body: () => ['Have your medication and supplement list ready, find a private space, and note down the questions you don\'t want to forget.'],
    cta: () => ({ label: 'View appointment', url: U.book }),
  },

  'consult-reminder-2h': {
    category: 'service', stage: 'consultation', eyebrow: 'Starting soon',
    subject: () => 'Your Apex consultation is in 2 hours',
    preheader: () => 'Everything you need, ready to go.',
    heading: d => `${Hi(d)}Your consultation is in about 2 hours.`,
    intro: () => 'Your doctor will contact you at your booked time. Somewhere quiet with decent reception is ideal.',
    details: d => [
      { label: 'Time', value: d.appointmentTime || 'As booked' },
      { label: 'Doctor', value: doc(d) },
    ],
    detailsTitle: 'Today',
    cta: () => ({ label: 'View appointment', url: U.book }),
  },

  'info-required': {
    category: 'service', stage: 'consultation', eyebrow: 'Action needed',
    subject: () => 'We need one more detail before your consultation',
    preheader: () => 'A short form to complete before you see your doctor.',
    heading: d => `${Hi(d)}We need one more detail.`,
    intro: () => 'Before your consultation, your doctor needs a little more information. It only takes a moment, and it means your appointment can be spent on you rather than on paperwork.',
    details: d => (d.missingItems as string[] | undefined)?.length
      ? (d.missingItems as string[]).map(item => ({ label: 'Required', value: item }))
      : [{ label: 'Required', value: 'Medical history form' }],
    detailsTitle: 'Outstanding',
    cta: () => ({ label: 'Complete your information', url: U.intake }),
    note: () => 'If you\'re unsure how to answer something, leave it and mention it to your doctor.',
  },

  'consult-complete': {
    category: 'service', stage: 'review', eyebrow: 'Consultation complete',
    subject: () => 'Your Apex consultation is complete',
    preheader: () => 'What happens in the next stage.',
    heading: d => `${Hi(d)}Thank you for your consultation.`,
    intro: d => `You've now spoken with ${doc(d)}. Your case moves into clinical review, where your doctor finalises their assessment and documents their recommendation.`,
    steps: () => [
      'Your doctor completes their clinical assessment and documentation',
      'You receive your individual clinical recommendation',
      'If ongoing care is appropriate, you\'ll be shown how to proceed',
    ],
    note: () => SUITABILITY,
  },

  // ─── Plan, membership, treatment ───────────────────────────────────────────

  'plan-ready': {
    category: 'service', stage: 'review', eyebrow: 'Clinical plan ready',
    subject: () => 'Your Apex care plan is ready',
    preheader: () => 'Your doctor\'s recommendation is available to review.',
    heading: d => `${Hi(d)}Your care plan is ready.`,
    intro: d => `${doc(d)} has completed your clinical review and documented their recommendation. It's available now in your Apex account.`,
    cta: () => ({ label: 'Review my care plan', url: U.portal }),
    note: () => 'Your plan is based on your results, history and goals. If anything is unclear, your doctor can talk it through with you.',
  },

  'membership-activated': {
    category: 'service', stage: 'ongoing', eyebrow: 'Membership active',
    subject: () => 'Welcome to Apex ongoing care',
    preheader: () => 'Everything your membership includes.',
    heading: d => `${Hi(d)}Welcome to ongoing care.`,
    intro: () => 'Your Apex membership is active. This is the part that matters most clinically — structured oversight over time, rather than a single consultation and silence.',
    details: () => [
      { label: 'Included', value: 'Ongoing clinical oversight' },
      { label: 'Included', value: 'Scheduled review cycles' },
      { label: 'Included', value: 'Biomarker monitoring' },
      { label: 'Included', value: 'Priority clinical support' },
      { label: 'Included', value: 'Apex account access' },
    ],
    detailsTitle: 'Your membership',
    cta: () => ({ label: 'Access your account', url: U.portal }),
  },

  'treatment-payment-received': {
    category: 'service', stage: 'ongoing', eyebrow: 'Payment received',
    subject: () => 'Your Apex payment has been received',
    preheader: () => 'Confirmation of your payment.',
    heading: d => `${Hi(d)}Your payment has been received.`,
    intro: () => 'Thank you — your payment has been processed successfully and your file has been updated.',
    details: d => [
      ...(d.amount ? [{ label: 'Amount', value: d.amount }] : []),
      ...(d.orderRef ? [{ label: 'Reference', value: d.orderRef }] : []),
      { label: 'Status', value: 'Paid' },
    ],
    detailsTitle: 'Receipt',
    cta: () => ({ label: 'View my account', url: U.account }),
  },

  'prescription-sent': {
    category: 'service', stage: 'ongoing', eyebrow: 'Sent to pharmacy',
    subject: () => 'Your prescription has been sent for processing',
    preheader: () => 'Your partner pharmacy has received it.',
    heading: d => `${Hi(d)}Your prescription has been sent.`,
    intro: () => 'Your doctor\'s prescription has been securely transmitted to our TGA-compliant partner pharmacy for processing.',
    steps: () => [
      'The pharmacy completes its own independent checks',
      'They may contact you directly if they need to confirm anything',
      'Once cleared, your order is prepared for dispatch',
    ],
    note: () => 'Final dispensing remains subject to the pharmacy\'s own clinical and regulatory checks.',
  },

  'pharmacy-processing': {
    category: 'service', stage: 'ongoing', eyebrow: 'In preparation',
    subject: () => 'Your pharmacy order is being prepared',
    preheader: () => 'Where your order is up to.',
    heading: d => `${Hi(d)}Your order is being prepared.`,
    intro: () => 'The partner pharmacy is preparing your order now. You\'ll receive a further update once it\'s dispatched.',
    body: () => ['Preparation usually takes 1–3 business days. For questions specific to dispensing or delivery, the pharmacy is best placed to help — reply here and we\'ll connect you.'],
  },

  'order-dispatched': {
    category: 'service', stage: 'ongoing', eyebrow: 'On its way',
    subject: () => 'Your Apex order is on its way',
    preheader: () => 'Tracking and storage information.',
    heading: d => `${Hi(d)}Your order has been dispatched.`,
    intro: () => 'Your order has left the pharmacy and is on its way to you.',
    details: d => [
      ...(d.trackingNumber ? [{ label: 'Tracking', value: d.trackingNumber }] : []),
      { label: 'Storage', value: 'Follow the instructions enclosed' },
    ],
    detailsTitle: 'Delivery',
    cta: d => (d.trackingUrl ? { label: 'Track my order', url: d.trackingUrl as string } : null),
    note: () => 'Store your order exactly as directed on the packaging. If anything arrives damaged or looks incorrect, contact us before using it.',
  },

  'treatment-started': {
    category: 'service', stage: 'ongoing', eyebrow: 'Getting started',
    subject: () => 'Your Apex support starts here',
    preheader: () => 'How to get started safely, and who to contact.',
    heading: d => `${Hi(d)}You're ready to begin.`,
    intro: () => 'Follow the instructions provided by your doctor and the pharmacy exactly as written — those documents are specific to you, and they take precedence over anything general.',
    body: () => ['Most people find the first few weeks are about consistency rather than dramatic change. Your scheduled reviews exist to check how you\'re responding and adjust where clinically appropriate.'],
    note: () => 'If you experience anything unexpected or concerning, contact us. In a medical emergency call 000.',
  },

  'patient-checkin': {
    category: 'service', stage: 'ongoing', eyebrow: 'Check-in',
    subject: () => 'How are you going so far?',
    preheader: () => 'A short structured check-in for your doctor.',
    heading: d => `${Hi(d)}How have the first few weeks been?`,
    intro: () => 'Your doctor would like a short structured check-in. It takes a couple of minutes and goes straight onto your file ahead of your next review.',
    cta: () => ({ label: 'Complete your check-in', url: U.checkin }),
    note: () => 'Please use the check-in form rather than replying with clinical details — it keeps everything on your medical record where your doctor will see it.',
  },

  // ─── Ongoing monitoring ────────────────────────────────────────────────────

  'followup-bloods-due': {
    category: 'service', stage: 'ongoing', eyebrow: 'Monitoring due',
    subject: () => 'It\'s time for your follow-up blood test',
    preheader: () => 'Your next monitoring panel is due.',
    heading: d => `${Hi(d)}Your follow-up bloods are due.`,
    intro: () => 'Monitoring is how your doctor confirms that your response is what they expected, and catches anything that needs adjusting before it becomes a problem.',
    cta: () => ({ label: 'Order my follow-up panel', url: U.bloods }),
    note: () => 'Fast for 8 hours and attend in the morning where possible, as with your first panel.',
  },

  'review-ready-to-book': {
    category: 'service', stage: 'ongoing', eyebrow: 'Review available',
    subject: () => 'Your Apex review is ready to book',
    preheader: () => 'Your results are in and your review can be scheduled.',
    heading: d => `${Hi(d)}Your review is ready to book.`,
    intro: () => 'Your follow-up results have been received. Your doctor can now review your progress with you and determine whether any adjustment is clinically appropriate.',
    cta: () => ({ label: 'Book my review', url: U.book }),
  },

  'four-month-review': {
    category: 'service', stage: 'ongoing', eyebrow: 'Review approaching',
    subject: () => 'Your next Apex review is approaching',
    preheader: () => 'What to complete beforehand.',
    heading: d => `${Hi(d)}Your next review is coming up.`,
    intro: () => 'Your scheduled review is approaching. Completing these beforehand means your doctor has everything they need on the day.',
    steps: () => [
      'Order and complete your monitoring blood panel',
      'Update anything that has changed in your health information',
      'Book your review consultation',
    ],
    cta: () => ({ label: 'Start my review', url: U.portal }),
  },

  // ─── Recovery and exceptions ───────────────────────────────────────────────

  'payment-failed': {
    category: 'service', eyebrow: 'Payment issue',
    subject: () => 'There was an issue with your Apex payment',
    preheader: () => 'A quick update to your payment details will fix it.',
    heading: d => `${Hi(d)}Your payment didn't go through.`,
    intro: () => 'Your most recent payment was declined. This is usually something minor — an expired card or a bank verification step — and takes a moment to resolve.',
    cta: () => ({ label: 'Update payment details', url: U.billing }),
    note: () => 'Nothing has been cancelled. If you think this is an error, reply and we\'ll look into it.',
  },

  'checkout-abandoned': {
    category: 'service', eyebrow: 'Checkout open',
    subject: () => 'Your Apex checkout is still available',
    preheader: () => 'Pick up without starting again.',
    heading: d => `${Hi(d)}Your checkout is still open.`,
    intro: () => 'You started checking out but didn\'t finish. Everything you selected has been kept, so you can resume without re-entering anything.',
    cta: d => ({ label: 'Resume checkout', url: (d.resumeUrl as string) || U.portal }),
  },

  'appointment-rescheduled': {
    category: 'service', stage: 'consultation', eyebrow: 'Appointment updated',
    subject: () => 'An update to your Apex appointment',
    preheader: () => 'Your new appointment details.',
    heading: d => `${Hi(d)}Your appointment has changed.`,
    intro: () => 'Your consultation has been rescheduled. We\'re sorry for the disruption — here are the updated details.',
    details: d => [
      { label: 'New date', value: d.appointmentDate || 'To be confirmed' },
      { label: 'New time', value: d.appointmentTime || 'To be confirmed' },
      { label: 'Doctor', value: doc(d) },
    ],
    detailsTitle: 'Updated appointment',
    cta: () => ({ label: 'View or change', url: U.book }),
    note: () => 'If the new time doesn\'t work, you can choose another from your account.',
  },

  'additional-info-required': {
    category: 'service', stage: 'review', eyebrow: 'Further information',
    subject: () => 'Additional information is needed',
    preheader: () => 'Your doctor needs a little more before deciding.',
    heading: d => `${Hi(d)}Your doctor needs more information.`,
    intro: () => 'Before making a clinical decision, your doctor has asked for some additional information. This is a normal part of a careful assessment and is not an outcome.',
    details: d => (d.missingItems as string[] | undefined)?.length
      ? (d.missingItems as string[]).map(item => ({ label: 'Requested', value: item }))
      : [{ label: 'Requested', value: 'Further clinical detail' }],
    detailsTitle: 'What\'s needed',
    cta: () => ({ label: 'Provide information', url: U.intake }),
    note: () => 'If you\'re not sure what\'s being asked for, reply and we\'ll clarify.',
  },

  'not-suitable': {
    category: 'service', stage: 'review', eyebrow: 'Assessment outcome',
    subject: () => 'An update following your Apex assessment',
    preheader: () => 'Your doctor\'s findings and what your options are.',
    heading: d => `${Hi(d)}An update on your assessment.`,
    intro: d => `Having reviewed your results and history, ${doc(d)} was unable to recommend the pathway you enquired about at this time. We know that isn't the answer you were hoping for, and we want to be clear about why and what comes next.`,
    body: d => [
      d.reason ? String(d.reason) : 'Your doctor will have documented their clinical reasoning in your account, and is happy to talk it through with you.',
      'This decision reflects what is clinically appropriate for you right now. It may not be permanent, and it does not prevent you from being reassessed if your circumstances change.',
    ],
    cta: () => ({ label: 'View my account', url: U.portal }),
    note: () => 'If you\'d like to discuss the decision, request a referral, or ask about a refund where applicable, reply to this email and we\'ll help.',
  },

  'membership-overdue': {
    category: 'service', stage: 'ongoing', eyebrow: 'Payment overdue',
    subject: () => 'Please update your Apex payment details',
    preheader: () => 'Your membership payment hasn\'t gone through.',
    heading: d => `${Hi(d)}Your membership payment is overdue.`,
    intro: () => 'We haven\'t been able to process your most recent membership payment. Your clinical care continues for now, but access to scheduled reviews and monitoring may be affected if it stays unresolved.',
    cta: () => ({ label: 'Update payment details', url: U.billing }),
    note: () => 'If you\'re reconsidering your membership or your circumstances have changed, reply — we\'d rather talk than have you simply lapse.',
  },

  'membership-cancelled': {
    category: 'service', stage: 'ongoing', eyebrow: 'Membership cancelled',
    subject: () => 'Your Apex membership has been cancelled',
    preheader: () => 'What this means for your ongoing care.',
    heading: d => `${Hi(d)}Your membership has been cancelled.`,
    intro: () => 'Your cancellation has been processed and no further payments will be taken. Here\'s what that means practically.',
    details: d => [
      { label: 'Effective', value: d.effectiveDate || 'Immediately' },
      { label: 'Account access', value: d.accessUntil || 'Retained for your records' },
      { label: 'Clinical records', value: 'Kept securely as legally required' },
    ],
    detailsTitle: 'Your cancellation',
    body: () => ['If you are currently under active clinical care, please speak to us before stopping anything, so your doctor can advise on continuity and any appropriate handover to your GP.'],
    cta: () => ({ label: 'Talk to our team', url: U.contact }),
  },

  're-engagement': {
    category: 'marketing', eyebrow: 'Still here',
    subject: () => 'Ready to continue your Apex journey?',
    preheader: () => 'Your progress is saved and waiting.',
    heading: d => `${Hi(d)}Your progress is saved.`,
    intro: d => `You started with us but didn't finish ${d.program ? `your ${prog(d)} pathway` : 'the process'}. Everything you completed is still on file, and you can continue from exactly where you stopped.`,
    body: () => ['If something got in the way — cost, timing, or simply not being sure it was right for you — we\'d genuinely rather hear it than keep emailing you.'],
    cta: () => ({ label: 'Continue where I left off', url: U.portal }),
  },
}

export type TemplateKey = keyof typeof TEMPLATES
