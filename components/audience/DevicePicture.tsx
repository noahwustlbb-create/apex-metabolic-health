/* eslint-disable @next/next/no-img-element */

/**
 * Noah's device renders: the phone where the slot is tall (phones), the tablet where it is wide (900 up).
 * Blue on the men's site, pink on the women's (Noah, 15 Nov 2026: "there is a blue iPhone screen. Meant to be
 * pink"). Both ship and html[data-audience] shows one (.for-men / .for-women in stage.css). The pink files are
 * the same renders, same framing, in public/photos/pink. No 'use client': server components use it too.
 */
export default function DevicePicture({ alt, sizesWide, imgClassName }: { alt: string; sizesWide: string; imgClassName?: string }) {
  const one = (dir: string, audience: string) => (
    <picture className={audience}>
      <source media="(min-width: 900px)" srcSet={`${dir}/device-tablet-900.webp 900w, ${dir}/device-tablet-1600.webp 1600w`} sizes={sizesWide} />
      <img src={`${dir}/device-phone-1200.webp`} srcSet={`${dir}/device-phone-700.webp 700w, ${dir}/device-phone-1200.webp 1200w`} sizes="100vw" alt={alt} loading="lazy" decoding="async" className={imgClassName} />
    </picture>
  )
  return <>{one('/photos', 'for-men')}{one('/photos/pink', 'for-women')}</>
}
