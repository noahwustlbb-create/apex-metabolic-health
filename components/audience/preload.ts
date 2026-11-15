/**
 * Inline script for a first-screen photo that has a women's twin (Noah, 15 Nov 2026).
 * The twin <img> is lazy so the men's site never downloads it. On the women's site that made the hero
 * start late (measured about 0.8s on a throttled phone), so this starts its download at high priority
 * as soon as the parser reaches the hero. Not a 'use client' module: server components call it too.
 */
export function womenPreload(o: { href?: string; srcset?: string; sizes?: string }) {
  const set = [
    o.href ? `l.href=${JSON.stringify(o.href)};` : '',
    o.srcset ? `l.imageSrcset=${JSON.stringify(o.srcset)};l.imageSizes=${JSON.stringify(o.sizes ?? '100vw')};` : '',
  ].join('')
  return `if(document.documentElement.dataset.audience==='women'){var l=document.createElement('link');l.rel='preload';l.as='image';l.fetchPriority='high';${set}document.head.appendChild(l)}`
}
