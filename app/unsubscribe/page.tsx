'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Marketing email must carry a working unsubscribe path — it's a legal
// requirement, not a courtesy. Service messages about a patient's own care
// (results, appointments, pathology requests) are not marketing and continue
// regardless, which this page states plainly so nobody unsubscribes expecting
// their appointment reminders to stop.

const ACCENT = 'var(--blue)'

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source: 'unsubscribe',
          program: 'Unsubscribe request',
          message: 'Patient requested removal from Apex marketing emails.',
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Nav />
      <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 120, paddingBottom: 100 }}>
        <div className="container-tight" style={{ maxWidth: 520 }}>
          {status === 'done' ? (
            <>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>
                Request received
              </p>
              <h1 className="font-bold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px,4vw,36px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                You&apos;ve been unsubscribed.
              </h1>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                We&apos;ve removed <strong style={{ color: 'var(--text-primary)' }}>{email}</strong> from Apex marketing emails.
                You may receive one already in transit.
              </p>
              <Link href="/" className="btn-pill">Back to Apex</Link>
            </>
          ) : (
            <>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>
                Email preferences
              </p>
              <h1 className="font-bold tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px,4vw,36px)', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                Unsubscribe from Apex emails.
              </h1>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                Enter the email address you&apos;d like removed from our marketing list.
              </p>

              <div className="rounded-xl px-5 py-4 mb-7"
                style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.15)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                  This stops marketing and educational emails only. Messages about your own care — appointment
                  confirmations, pathology requests, results and clinical updates — will continue, as they&apos;re part
                  of your treatment.
                </p>
              </div>

              <form onSubmit={submit} className="flex flex-col gap-3">
                <label htmlFor="unsub-email" className="text-[10px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: 'var(--text-primary)', opacity: 0.72 }}>
                  Email address
                </label>
                <input
                  id="unsub-email" type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
                />
                {status === 'error' && (
                  <p className="text-xs" style={{ color: 'var(--color-danger-fg)' }}>
                    Something went wrong. Email admin@apexmetabolichealth.com.au and we&apos;ll remove you manually.
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'}
                  className="btn-pill w-full justify-center mt-1"
                  style={{ opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? 'Processing…' : 'Unsubscribe'}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
