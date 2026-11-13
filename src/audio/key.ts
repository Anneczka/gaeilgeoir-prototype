export type Voice = 'padraig' | 'sibeal'

/** Same text + same voice = same file name. Used by the generator script and by the player. */
export function audioKey(voice: Voice, text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  let h = 0
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)!) >>> 0
  return `${voice}__${slug}-${h.toString(36)}`
}
