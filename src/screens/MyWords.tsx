import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { SegmentedTabs } from '../components/SegmentedTabs'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { useStore } from '../state/store'
import volume from '../assets/icons/volume.svg'

type Tab = 'all' | 'review' | 'learned'

/** Meanings of the words a learner can tap in the lessons (so saved words show their English). */
function meaningOf(word: string): string {
  const lessons = [...content.conversation.steps, ...content.wordLesson.steps]
  for (const step of lessons) {
    for (const line of step.tutor.lines) {
      for (const seg of line) if (typeof seg !== 'string' && seg.w === word) return seg.en
    }
  }
  return ''
}

/** 15b · My words: everything the learner saved (plus a few fake ones), with audio on each row. */
export function MyWords() {
  const c = content.myWords
  const navigate = useNavigate()
  const { state } = useStore()
  const [tab, setTab] = useState<Tab>('all')
  const [playing, setPlaying] = useState<string | null>(null)

  // Newly saved words go on top and start as "to review"
  const fresh = [...state.savedWords].reverse().map((w) => ({ w, en: meaningOf(w), status: 'review' as const }))
  const all = fresh // a new participant starts with no saved words
  const shown = tab === 'all' ? all : all.filter((m) => m.status === tab)
  const tabs = c.tabs.map((t) => ({ key: t.key as Tab, label: fill(t.label, { n: String(all.length) }) }))

  function play(w: string) {
    setPlaying(w) // the voice is simulated: just a short highlight
    window.setTimeout(() => setPlaying((p) => (p === w ? null : p)), 1500)
  }

  return (
    <main className="screen screen--top58">
      <StatusBar />
      <TitleHeader onClick={() => navigate(-1)} title={c.title} />
      <div className="screen__body mywords">
        <SegmentedTabs label="Filter" options={tabs} value={tab} onChange={setTab} />
        {shown.length === 0 ? (
          <p className="t-body mywords__empty">{tab === 'all' ? c.emptyAll : tab === 'review' ? c.emptyReview : c.emptyLearned}</p>
        ) : (
          <ul className="mywords__list">
            {shown.map((m) => (
              <li key={m.w} className="mywords__row">
                <div className="mywords__text">
                  <p className="t-body-strong">{m.w}</p>
                  {m.en && <p className="t-small mywords__en">{m.en}</p>}
                </div>
                <button type="button" className={`hit-44${playing === m.w ? ' mywords__play--on' : ''}`} aria-label={fill(c.play, { word: m.w })} onClick={() => play(m.w)}>
                  <Icon src={volume} color="var(--icon-brand)" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
