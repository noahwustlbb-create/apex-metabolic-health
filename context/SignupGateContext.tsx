'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import GetStartedModal from '@/components/GetStartedModal'

interface SignupGateContextValue {
  open: (onConfirm?: () => void) => void
}

const SignupGateContext = createContext<SignupGateContextValue>({ open: () => {} })

export function SignupGateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmFn, setConfirmFn] = useState<(() => void) | undefined>(undefined)

  const open = useCallback((onConfirm?: () => void) => {
    setConfirmFn(() => onConfirm)
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
          />
        )}
      </AnimatePresence>
    </SignupGateContext.Provider>
  )
}

export const useSignupGate = () => useContext(SignupGateContext)
