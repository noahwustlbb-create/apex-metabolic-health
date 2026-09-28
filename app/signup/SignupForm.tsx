'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { captureLead } from '@/lib/captureLead'
import { ArtImg } from '@/components/audience/Img'

const PORTAL_SIGNUP = 'https://app.apexmetabolichealth.com.au/signup'

function SignupFormInner() {
  const router = useRouter()
  const params = useSearchParams()
  // Accounts are created in the portal (Supabase auth) — this page only collects
  // the email and hands off. It must never ask for a password it cannot use.
  const redirect = params.get('redirect') || PORTAL_SIGNUP

  const [form, setForm] = useState({ email: '', emailConfirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const valid =
    form.email.includes('@') &&
    form.email === form.emailConfirm

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setError('')
    setLoading(true)

    // Best-effort lead capture: this form's job is to get the visitor to the
    // portal, so a delivery failure must never block the redirect.
    try {
      await captureLead({
        email: form.email,
        source: 'signup',
        program: 'New account registration',
      })
    } catch {
      /* captureLead already logs; both channels down shouldn't strand the user */
    }
    // The portal lives on a different origin, so next/router can't navigate there.
    if (/^https?:\/\//i.test(redirect)) {
      const sep = redirect.includes('?') ? '&' : '?'
      window.location.href = `${redirect}${sep}email=${encodeURIComponent(form.email.trim())}`
    } else {
      router.push(redirect)
    }
  }

  const bad = (on: boolean) => (on ? ' su-input-bad' : '')

  return (
    <main className="su">
      <div className="su-form">
        <Link href="/" className="su-logo" aria-label="Apex Metabolic Health home"><Logo variant="nav" /></Link>

        <p className="su-kicker">Create your account</p>
        <h1 className="stage-display su-title">
          Start with your email.<br /><span className="stage-muted">The rest takes minutes.</span>
        </h1>
        <p className="stage-lead su-lead">
          Your account holds your assessment, your results and your doctor&apos;s plan. You choose a password on the next step, in the secure patient portal.
        </p>

        <form onSubmit={handleSubmit} className="su-fields" noValidate>
          <label className="su-field">
            <span>Email</span>
            <input
              id="su-email" type="email" autoComplete="email" placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className={'su-input' + bad(!!form.email && !form.email.includes('@'))}
              required
            />
          </label>
          <label className="su-field">
            <span>Confirm email</span>
            <input
              id="su-email-confirm" type="email" autoComplete="email" placeholder="Type it again"
              value={form.emailConfirm}
              onChange={e => setForm(f => ({ ...f, emailConfirm: e.target.value }))}
              className={'su-input' + bad(!!form.emailConfirm && form.emailConfirm !== form.email)}
              required
            />
            {form.emailConfirm && form.emailConfirm !== form.email && <em className="su-err">The two emails do not match yet.</em>}
          </label>

          {error && <p className="su-err" role="alert">{error}</p>}

          <button type="submit" disabled={!valid || loading} className="stage-cta su-submit">
            <span className="stage-cta-label">{loading ? 'Continuing…' : 'Continue'}</span>
            <span className="stage-cta-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>
        </form>

        <p className="su-alt">
          Not sure yet? <Link href="/start">Take the two-minute assessment</Link> first.<br />
          Already have an account? <a href="https://app.apexmetabolichealth.com.au/login">Log in</a>
        </p>
      </div>

      <aside className="su-aside" aria-hidden="true">
        <ArtImg src="/start/quiz/vials.jpg" alt="" />
        <ul className="su-points">
          {[
            ['01', 'One blood panel', 'Collected near you, results in about 48 hours.'],
            ['02', 'A doctor reads them', 'An AHPRA-registered doctor, with your results open.'],
            ['03', 'A written plan', 'In your portal, with follow-ups when they are due.'],
          ].map(([n, t, b]) => (
            <li key={n}><span className="t-readout">{n}</span><strong>{t}</strong><span>{b}</span></li>
          ))}
        </ul>
      </aside>
    </main>
  )
}

export default function SignupForm() {
  return (
    <Suspense>
      <SignupFormInner />
    </Suspense>
  )
}
