/** Lower-case, no fadas, no punctuation, single spaces: so "Cén chaoi?" and "cen chaoi" match. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** True when the typed or heard text matches the expected phrase (ignoring case, fadas and punctuation). */
export function isCorrect(heard: string, expected: string): boolean {
  const h = normalize(heard)
  return h !== '' && h === normalize(expected)
}
