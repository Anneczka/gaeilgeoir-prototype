import type { Lines } from '../data/types'

/** The plain Irish text of a tutor message (word buttons are joined back into the sentence). */
export function messageText(lines: Lines): string {
  return lines.map((line) => line.map((seg) => (typeof seg === 'string' ? seg : seg.w)).join('')).join(' ')
}
