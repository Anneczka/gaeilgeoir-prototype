import { audioKey, type Voice } from './key'

// Every mp3 in src/assets/audio, found by file name (made with `npm run audio`)
const files = import.meta.glob('../assets/audio/*.mp3', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const byKey: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) byKey[path.split('/').pop()!.replace('.mp3', '')] = url

let current: HTMLAudioElement | null = null

export const voiceOf = (speaker: string): Voice => (speaker === 'Sibéal' ? 'sibeal' : 'padraig')

/** Stops whatever is playing. */
export function stopSpeaking() {
  current?.pause()
  current = null
}

/**
 * Plays the recorded voice for a text. `speed` is "0.85x", "1x" or "1.5x".
 * Returns false when there is no audio file for it, so the caller can fall back to the silent animation.
 */
export function speak(text: string, speaker: string, speed: string, onEnd?: () => void): boolean {
  const url = byKey[audioKey(voiceOf(speaker), text)]
  if (!url) return false
  stopSpeaking()
  const audio = new Audio(url)
  audio.playbackRate = parseFloat(speed) || 1
  audio.onended = () => {
    if (current === audio) current = null
    onEnd?.()
  }
  current = audio
  audio.play().catch(() => onEnd?.())
  return true
}
