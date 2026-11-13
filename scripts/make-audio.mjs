// Makes the tutor audio with the free ABAIR Irish voices (Munster). Run: npm run audio
// It only creates the files that are missing, so it is safe to run again after changing the copy.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { content } from '../src/data/content.ts'
import { messageText } from '../src/audio/text.ts'
import { audioKey } from '../src/audio/key.ts'

const VOICES = { padraig: 'ga_MU_dms_piper', sibeal: 'ga_MU_nnc_piper' } // male, female (Munster)
const OUT = fileURLToPath(new URL('../src/assets/audio/', import.meta.url))
mkdirSync(OUT, { recursive: true })

const texts = new Set(['Dia duit'])
const steps = [...content.conversation.steps, ...content.wordLesson.steps]
for (const s of steps) {
  texts.add(messageText(s.tutor.lines))
  texts.add(s.expected.irish)
  texts.add(content.conversation.genericFix.line.replace('{irish}', s.expected.irish))
  if (s.fix) texts.add(s.fix.lines.join(' '))
  for (const line of s.tutor.lines) for (const seg of line) if (typeof seg !== 'string') texts.add(seg.w)
}

let made = 0
for (const [voice, name] of Object.entries(VOICES)) {
  for (const text of texts) {
    const file = `${OUT}${audioKey(voice, text)}.mp3`
    if (existsSync(file)) continue
    const res = await fetch('https://api.abair.ie/v3/synthesis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        synthinput: { text, ssml: 'string' },
        voiceparams: { languageCode: 'ga-IE', name, ssmlGender: 'UNSPECIFIED' },
        audioconfig: { audioEncoding: 'MP3', speakingRate: 1, pitch: 1, volumeGainDb: 0, htsParams: 'string', sampleRate: 0, effects: [] },
        outputType: 'JSON',
      }),
    })
    const data = await res.json()
    if (!data.audioContent) {
      console.error(`FAILED (${voice}): ${text}`, data.message ?? '')
      continue
    }
    writeFileSync(file, Buffer.from(data.audioContent, 'base64'))
    made++
    console.log(`ok ${voice}: ${text}`)
  }
}
console.log(`Done. ${made} new files, ${texts.size * 2} texts in total.`)
