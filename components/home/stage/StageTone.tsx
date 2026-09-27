'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Glow tone for the stage renders: 'cyan' (Apex default) or 'red' (the
 * BioTrack-style comparison Noah asked for on 2026-09-27). Chosen by
 * ?tone=red, remembered for the visit, and stamped on <html> so CSS tokens
 * and the PostHog super property can read it.
 */
export type Tone = 'cyan' | 'red'
const ToneCtx = createContext<Tone>('cyan')

export function StageToneProvider({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState<Tone>('cyan')
  useEffect(() => {
    let t: Tone = 'cyan'
    try {
      const q = new URLSearchParams(window.location.search).get('tone')
      if (q === 'red' || q === 'cyan') sessionStorage.setItem('apex-stage-tone', q)
      t = sessionStorage.getItem('apex-stage-tone') === 'red' ? 'red' : 'cyan'
    } catch { /* storage blocked: default tone */ }
    setTone(t)
    document.documentElement.dataset.stageTone = t
    const ph = (window as unknown as { posthog?: { register?: (p: Record<string, string>) => void } }).posthog
    ph?.register?.({ stage_tone: t })
  }, [])
  return <ToneCtx.Provider value={tone}>{children}</ToneCtx.Provider>
}

export const useStageTone = () => useContext(ToneCtx)

/** Path to a stage render for the current tone. */
export const useStageArt = () => {
  const tone = useStageTone()
  return (name: 'body-male' | 'body-female' | 'heart') => `/3d/${tone === 'red' ? 'red/' : ''}${name}.jpg`
}
