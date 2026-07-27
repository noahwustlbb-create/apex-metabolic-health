'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const BLUE = 'var(--blue)'
const BG   = '#070a0d'

function SignupFormInner() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/book'

  const [form, setForm] = useState({ email: '', emailConfirm: '', password: '', passwordConfirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const valid =
    form.email.includes('@') &&
    form.email === form.emailConfirm &&
    form.password.length >= 8 &&
    form.password === form.passwordConfirm

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setError('')
    setLoading(true)

    try {
      await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          source: 'signup',
          program: 'New account registration',
        }),
      })
      router.push(redirect)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: BG }}>
      {/* Left - form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 max-w-xl">
        <Link href="/" className="flex flex-col leading-none mb-12">
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: BLUE }}>Metabolic Health</span>
        </Link>

        <h1 className="font-bold mb-2 leading-tight" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Take the first step<br />
          to a <span style={{ color: BLUE }}>better you.</span>
        </h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>
          Create your account to access your personalised health protocol and book your consultation.
        </p>

        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke={BLUE} strokeWidth="1.5" />
              <path d="M6.5 10l2.5 2.5 4-4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs" style={{ color: 'rgba(240,244,248,0.6)' }}>Get treatment in days, not months</span>
          </div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke={BLUE} strokeWidth="1.5" />
              <path d="M6.5 10l2.5 2.5 4-4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs" style={{ color: 'rgba(240,244,248,0.6)' }}>Doctor prescribed, tailored to you</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-email" className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.6)' }}>Email</label>
              <input
                id="su-email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.email && !form.email.includes('@') ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-email-confirm" className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.6)' }}>Confirm email</label>
              <input
                id="su-email-confirm"
                type="email"
                placeholder="Enter email again"
                value={form.emailConfirm}
                onChange={e => setForm(f => ({ ...f, emailConfirm: e.target.value }))}
                className="px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.emailConfirm && form.emailConfirm !== form.email ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-password" className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.6)' }}>Password</label>
              <input
                id="su-password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.password && form.password.length < 8 ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
                minLength={8}
              />
              {form.password && form.password.length < 8 && (
                <p className="text-[10px]" style={{ color: '#ef4444' }}>Min 8 characters</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="su-password-confirm" className="text-xs font-semibold" style={{ color: 'rgba(240,244,248,0.6)' }}>Confirm password</label>
              <input
                id="su-password-confirm"
                type="password"
                placeholder="Enter confirm password"
                value={form.passwordConfirm}
                onChange={e => setForm(f => ({ ...f, passwordConfirm: e.target.value }))}
                className="px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.passwordConfirm && form.passwordConfirm !== form.password ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
              />
            </div>
          </div>

          {error && <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>}

          <button
            type="submit"
            disabled={!valid || loading}
            className="w-full py-4 rounded-sm text-sm font-bold tracking-wide transition-all duration-150 mt-2"
            style={{
              background: valid && !loading ? BLUE : 'rgba(255,255,255,0.06)',
              color: valid && !loading ? '#fff' : 'rgba(255,255,255,0.3)',
              cursor: valid && !loading ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-space-grotesk)',
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm mt-6" style={{ color: 'rgba(240,244,248,0.4)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: BLUE }} className="hover:underline">Login</Link>
        </p>
      </div>

      {/* Right - trust panel */}
      <div className="hidden lg:flex flex-col justify-center gap-6 px-12 flex-1" style={{ background: 'rgba(255,255,255,0.015)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {[
          {
            title: 'Personalised prescription care',
            body: 'Access science-backed treatments and protocols, proven to work based on research.',
            accent: BLUE,
          },
          {
            title: 'Pharmacy delivery next day in Australia',
            body: 'If eligible, receive a personalised prescribed treatment plan delivered to your home.',
            accent: '#7bb3ff',
          },
          {
            title: 'Unlimited doctor consultations',
            body: "Ongoing care from Australia's most experienced doctors, whenever you need it.",
            accent: BLUE,
          },
          {
            title: '100% telehealth based',
            body: 'No more drives, queues, or waiting rooms. Enjoy quality care from your home.',
            accent: '#7bb3ff',
          },
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs font-bold mb-1" style={{ color: item.accent }}>{item.title.split(' ').slice(0, 2).join(' ')}</p>
            <p className="font-bold mb-2 leading-tight" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', fontSize: '15px' }}>{item.title.split(' ').slice(2).join(' ')}</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SignupForm() {
  return (
    <Suspense>
      <SignupFormInner />
    </Suspense>
  )
}
