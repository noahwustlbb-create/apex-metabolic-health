import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react'

/**
 * The accent line of a headline (Noah, 15 Nov 2026, women's pages: "Add pink to it! Maybe to the headline or sub,
 * or the CTA can be pink as well", then "Do the same for men"). PR #84 did it on the program pages: the second
 * headline line turns rose for women and Apex blue for men, and stays as it is before a pick. This marks the same
 * part of every other headline on the site with .al-acc; the colours live in styles/accent.css.
 *
 * Which part: the words after a line break, else the last sentence ("Measure first. Then treat."), else a short
 * tail after a comma or colon ("Your first 3 months, added up."), else the last word ("Choose your program.").
 */
const MAX_TAIL_WORDS = 4

function splitText(text: string): [string, string] | null {
  const t = text.trim()
  const sentence = t.match(/^(.*[.?!])\s+([^.?!]+[.?!]?)$/)
  if (sentence) return [sentence[1] + ' ', sentence[2]]
  const clause = t.match(/^(.*[,:])\s+(.+)$/)
  if (clause && clause[2].split(/\s+/).length <= MAX_TAIL_WORDS) return [clause[1] + ' ', clause[2]]
  const i = t.lastIndexOf(' ')
  if (i > 0) return [t.slice(0, i + 1), t.slice(i + 1)]
  return null
}

export function accent(title: ReactNode): ReactNode {
  if (typeof title === 'string') {
    const s = splitText(title)
    return s ? <>{s[0]}<span className="al-acc">{s[1]}</span></> : title
  }
  // <>First line.<br />Second line.</>: the part after the last <br /> is the accent line.
  if (isValidElement(title) && title.type === Fragment) {
    const kids = Children.toArray((title as ReactElement<{ children?: ReactNode }>).props.children)
    let br = -1
    kids.forEach((k, i) => { if (isValidElement(k) && k.type === 'br') br = i })
    if (br > -1 && br < kids.length - 1) return <>{kids.slice(0, br + 1)}<span className="al-acc">{kids.slice(br + 1)}</span></>
  }
  return title
}

/** `<Accent>Choose your program.</Accent>` inside an h1 or h2. */
export function Accent({ children }: { children: ReactNode }) {
  return <>{accent(children)}</>
}
