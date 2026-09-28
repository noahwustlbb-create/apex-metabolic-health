'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * The women's website (Noah, 28 Sep 2026): the same site in rose. Chosen by
 * ?for=women (ads and links), the hero's Men / Women switch, or a remembered
 * choice. The <head> script in app/layout.tsx stamps data-audience before
 * first paint so nobody sees the blue version flash first.
 */
export type Audience = 'men' | 'women'
const KEY = 'apex-audience'
const Ctx = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({ audience: 'men', setAudience: () => {} })

/** Runs inline in <head>, before React. Keep it tiny and dependency-free. */
export const AUDIENCE_BOOT = `try{var q=new URLSearchParams(location.search).get('for');if(q==='women'||q==='men')localStorage.setItem('${KEY}',q);var a=localStorage.getItem('${KEY}');if(a==='women')document.documentElement.dataset.audience='women'}catch(e){}`

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, set] = useState<Audience>('men')
  useEffect(() => { if (document.documentElement.dataset.audience === 'women') set('women') }, [])
  const setAudience = useCallback((a: Audience) => {
    set(a)
    if (a === 'women') document.documentElement.dataset.audience = 'women'
    else delete document.documentElement.dataset.audience
    try { localStorage.setItem(KEY, a) } catch { /* storage blocked */ }
    const ph = (window as unknown as { posthog?: { register?: (p: Record<string, string>) => void } }).posthog
    ph?.register?.({ audience: a })
  }, [])
  return <Ctx.Provider value={{ audience, setAudience }}>{children}</Ctx.Provider>
}

export const useAudience = () => useContext(Ctx)

// Every render with a rose twin. A path not listed keeps its original, so a
// missing twin can never 404. Male figures never appear in rose: they map to
// the woman's render instead.
const ROSE: Record<string, string> = {
  '/3d/body-male.jpg': '/3d/pink/body-female.jpg',
  '/3d/body-female.jpg': '/3d/pink/body-female.jpg',
  '/3d/bloods.jpg': '/3d/pink/bloods.jpg',
  '/3d/molecular.jpg': '/3d/pink/molecular.jpg',
  '/3d/phone.jpg': '/3d/pink/phone.jpg',
  '/3d/tablet.jpg': '/3d/pink/phone.jpg',
  '/3d/tube.jpg': '/3d/pink/tube.jpg',
  '/3d/product/box-white.jpg': '/3d/product/pink/box-white.jpg',
  '/3d/product/tin.jpg': '/3d/product/pink/tin.jpg',
  '/3d/product/tub.jpg': '/3d/product/pink/tub.jpg',
  '/3d/product/vials.jpg': '/3d/product/pink/vials.jpg',
  '/protocols/bloods.jpg': '/protocols/pink/bloods.jpg',
  '/protocols/hair.jpg': '/protocols/pink/hair.jpg',
  '/protocols/hormone.jpg': '/protocols/pink/hormone.jpg',
  '/protocols/longevity.jpg': '/protocols/pink/longevity.jpg',
  '/protocols/performance.jpg': '/protocols/pink/performance.jpg',
  '/protocols/recovery.jpg': '/protocols/pink/performance.jpg',
  '/protocols/sexual.jpg': '/protocols/pink/sexual.jpg',
  '/protocols/skin.jpg': '/protocols/pink/skin.jpg',
  '/protocols/weight.jpg': '/protocols/pink/weight.jpg',
  '/photos/hands-results.webp': '/photos/pink/hands-results.webp',
  '/photos/intake-sofa.webp': '/photos/pink/intake-sofa.webp',
  '/photos/pathology-draw.webp': '/photos/pink/pathology-draw.webp',
  '/photos/telehealth-call.webp': '/photos/pink/telehealth-call.webp',
  '/start/quiz/body-male.jpg': '/start/quiz/rose/body-female.jpg',
  '/start/quiz/body-female.jpg': '/start/quiz/rose/body-female.jpg',
  '/start/quiz/box.jpg': '/start/quiz/rose/box.jpg',
  '/start/quiz/dna.jpg': '/start/quiz/rose/dna.jpg',
  '/start/quiz/phone.jpg': '/start/quiz/rose/phone.jpg',
  '/start/quiz/tablet.jpg': '/start/quiz/rose/phone.jpg',
  '/start/quiz/tin.jpg': '/start/quiz/rose/tin.jpg',
  '/start/quiz/vials.jpg': '/start/quiz/rose/vials.jpg',
}
export const roseOf = (path: string) => ROSE[path] ?? path
export const ROSE_PATHS = ROSE

/** `art(path)` gives the render for the current audience. */
export function useArt() {
  const { audience } = useAudience()
  return useCallback((path: string) => (audience === 'women' ? roseOf(path) : path), [audience])
}
