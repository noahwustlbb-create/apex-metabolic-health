'use client'

import { useState } from 'react'
import { programs } from '@/lib/programs'
import { captureLead } from '@/lib/captureLead'

/**
 * The enquiry form from /get-started (same fields, same captureLead call),
 * restyled to the AlgoRx system: one bordered card, mono labels, 1px inputs,
 * an ink pill. Two independent channels inside captureLead, so a blocked
 * third-party request alone never loses the enquiry.
 */
export default function EnquiryForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(e.currentTarget)
    const fields = Object.fromEntries(data.entries()) as Record<string, string>
    try {
      await captureLead({
        ...fields,
        email: fields.email ?? '',
        marketingConsent: fields.marketingConsent === 'on',
        source: 'get-started-enquiry',
        subject: 'New Enquiry | Apex Metabolic Health',
      })
      setSubmitted(true)
      window.location.href = '/confirmation'
    } catch {
      setError('Something went wrong. Please try again, or email admin@apexmetabolichealth.com.au.')
    }
    setSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="al-card ip-done" role="status">
        <p className="al-k">{'// Received'}</p>
        <h2 className="al-h2">Enquiry received.</h2>
        <p>We will be in touch within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="al-card ip-form-card ip-form" noValidate aria-label="Send an enquiry">
      <div className="ip-form-row">
        <label className="ip-field"><span>Full name</span><input type="text" name="fullName" autoComplete="name" placeholder="Your full name" /></label>
        <label className="ip-field"><span>Email</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
      </div>
      <div className="ip-form-row">
        <label className="ip-field"><span>Phone</span><input type="tel" name="phone" autoComplete="tel" placeholder="04XX XXX XXX" /></label>
        <label className="ip-field">
          <span>Program of interest</span>
          <select name="program" defaultValue="">
            <option value="" disabled>Select a program</option>
            {programs.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            <option value="pathology">Comprehensive Blood Tests</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="ip-field">
        <span>How did you hear about us?</span>
        <select name="referral" defaultValue="">
          <option value="" disabled>Select an option</option>
          {['Google search', 'Social media', 'Referral from a friend', 'GP or medical referral', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="ip-field"><span>Message</span><textarea name="message" rows={5} placeholder="What you are experiencing, or what you want to know." /></label>
      <label className="ip-check" htmlFor="gs-consent">
        <input id="gs-consent" name="marketingConsent" type="checkbox" />
        <span>Send me health tips, program updates and offers from Apex by email and SMS. Optional. You can unsubscribe any time.</span>
      </label>
      {error && <p className="ip-err" role="alert">{error}</p>}
      <button type="submit" className="al-pill al-pill-lg" disabled={submitting}>{submitting ? 'Sending' : 'Send enquiry'}</button>
      <p className="ip-form-note">We respond within 1 business day. Your information is kept strictly private.</p>
    </form>
  )
}
