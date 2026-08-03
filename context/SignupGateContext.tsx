'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import GetStartedModal from '@/components/GetStartedModal'

interface GateMeta {
  /** Show the lightweight contact-capture form before sending the visitor to portal signup. */
  capture?: boolean
  /** Program the visitor is interested in, recorded with the lead. */
  program?: string
  /** Destination signup URL (may already carry query params). */
  signupUrl?: string
}

interface SignupGateContextValue {
  open: (onConfirm?: () => void, meta?: GateMeta) => void
}

const SignupGateContext = createContext<SignupGateContextValue>({ open: () => {} })

export function SignupGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmFn, setConfirmFn] = useState<(() => void) | undefined>(undefined)
  const [meta, setMeta] = useState<GateMeta>({})

  const open = useCallback((onConfirm?: () => void, m?: GateMeta) => {
    setConfirmFn(() => onConfirm)
    setMeta(m ?? {})
    setIsOpen(true)
  }, [])

  return (
    <SignupGateContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <GetStartedModal
            onClose={() => setIsOpen(false)}
            onConfirm={confirmFn}
            capture={meta.capture}
            program={meta.program}
            signupUrl={meta.signupUrl}
          />
        )}
      </AnimatePresence>
    </SignupGateContext.Provider>
  )
}

export const useSignupGate = () => useContext(SignupGateContext)
