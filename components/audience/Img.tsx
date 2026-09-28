'use client'

import NextImage, { type ImageProps } from 'next/image'
import { useArt } from './Audience'

/**
 * Drop-in for next/image that serves the rose twin on the women's site.
 * Static imports and remote URLs pass through untouched.
 */
export default function Image(props: ImageProps) {
  const art = useArt()
  const src = typeof props.src === 'string' ? art(props.src) : props.src
  // eslint-disable-next-line jsx-a11y/alt-text
  return <NextImage {...props} src={src} />
}

/** Same for a plain <img>. */
export function ArtImg({ src, alt = '', ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const art = useArt()
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} alt={alt} src={typeof src === 'string' ? art(src) : src} />
}
