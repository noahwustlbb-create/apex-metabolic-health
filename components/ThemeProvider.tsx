'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'

type Theme = 'light'

// The site is white only (decision 2026-09-17). The provider stays so older
// imports keep working, but it always resolves to light and clears any dark
// preference a returning visitor saved.
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    try { localStorage.removeItem('apex-theme') } catch {}
  }, [])
  return <ThemeContext.Provider value={{ theme: 'light', toggle: () => {} }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
