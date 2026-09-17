import type { Metadata } from 'next'
import SignupForm from './SignupForm'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your Apex Metabolic Health account to get started.',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return <SignupForm />
}
