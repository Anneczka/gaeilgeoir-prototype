import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { ProgressBar } from '../components/ProgressBar'
import { Button } from '../components/Button'
import { content } from '../data/content'
import { fill } from '../data/fill'
import playCircle from '../assets/icons/play-circle.svg'

const c = content.songs
const LINES = 3 // the chorus is sung three times in the Figma screen
type Mark = 'ok' | 'bad'

// Every word is a question except the "Óró" that starts the 2nd and 3rd lines: 13 questions in all.
const keys: string[] = []
for (let l = 0; l < LINES; l++) c.line.forEach((_, w) => !(w === 0 && l > 0) && keys.push(`${l}:${w}`))
// Where the learner already is in the Figma screen: 4 answered (3 correct, 1 to review)
const seed: Record<string, Mark> = { '0:1': 'ok', '0:3': 'ok', '1:3': 'ok', '2:3': 'bad' }
const wordOf = (key: string) => c.line[Number(key.split(':')[1])].w

/** Four answer buttons: the right word plus three others, in a fixed (but mixed) order. */
function optionsFor(key: string, n: number): string[] {
  const right = wordOf(key)
  const others = c.pool.filter((w) => w !== right).slice(n % 3, (n % 3) + 3).concat(c.pool.filter((w) => w !== right)).slice(0, 3)
  const list = [...others]
  list.splice(n % 4, 0, right)
  return list
}

/** 11 · Songs. The video is a stand-in (no audio): the learner fills in the missing lyric word. */
export function Songs() {
  const [marks, setMarks] = useState<Record<string, Mark>>(seed)
  const [playing, setPlaying] = useState(false)

  const answered = Object.keys(marks).length
  const good = Object.values(marks).filter((m) => m === 'ok').length
  const bad = answered - good
  const current = keys.find((k) => !(k in marks))
  const options = current ? optionsFor(current, answered) : []
  const slotColours = ['blue', 'orange', 'yellow', 'purple']

  function pick(word: string) {
    if (!current) return
    setMarks((m) => ({ ...m, [current]: word === wordOf(current) ? 'ok' : 'bad' }))
  }

  return (
    <main className="screen screen--surface screen--top58">
      <StatusBar />
      <TitleHeader to="/practice" title={c.title} />
      <div className="screen__body song">
        <div className="song__title">
          <h1 className="t-h2">{c.song}</h1>
          <p className="t-small song__artist">{c.artist}</p>
        </div>
        <div className="song__progress">
          <div className="song__bar">
            <ProgressBar value={answered / keys.length} label="Song progress" />
            <span className="t-caption song__count">{`${answered} / ${keys.length}`}</span>
          </div>
          <div className="song__score">
            <span className="chip-pill chip-pill--ok t-caption">{fill(c.correct, { n: String(good) })}</span>
            <span className="chip-pill chip-pill--bad t-caption">{fill(c.review, { n: String(bad) })}</span>
            <span className="chip-pill t-caption">{fill(c.accuracy, { n: String(Math.round((good / answered) * 100)) })}</span>
          </div>
        </div>

        <div className="song__video">
          <button type="button" className="song__play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? c.pause : c.play} aria-pressed={playing}>
            {playing ? <span className="song__pause" aria-hidden="true" /> : <img src={playCircle} width={28} height={28} alt="" />}
          </button>
        </div>

        <div className="lyrics">
          {Array.from({ length: LINES }, (_, l) => (
            <p key={l} className="lyrics__line t-body-lg">
              {c.line.map((tok, w) => {
                const key = `${l}:${w}`
                const mark = marks[key]
                const isCurrent = key === current
                return (
                  <span key={w} className={`lyrics__word${isCurrent ? ' lyrics__word--blank' : ''}`}>
                    {isCurrent ? <span className="sr-only">{c.blank}</span> : tok.t}
                    {mark && (
                      <>
                        <span className={`lyrics__dot lyrics__dot--${mark}`} aria-hidden="true" />
                        <span className="sr-only">{mark === 'ok' ? c.rightMark : c.wrongMark}</span>
                      </>
                    )}
                  </span>
                )
              })}
            </p>
          ))}
        </div>
      </div>

      <section className="song-sheet" aria-label="Pick the missing word">
        {current ? (
          <div className="song-sheet__grid">
            {options.map((o, i) => (
              <button key={o} type="button" className={`song-word song-word--${slotColours[i]} t-button`} onClick={() => pick(o)}>
                {o}
              </button>
            ))}
          </div>
        ) : (
          <div className="song-sheet__done">
            <h2 className="t-h3">{c.doneTitle}</h2>
            <p className="t-body">{fill(c.doneBody, { correct: String(good), review: String(bad) })}</p>
            <Button to="/practice">{c.doneCta}</Button>
          </div>
        )}
      </section>
    </main>
  )
}
