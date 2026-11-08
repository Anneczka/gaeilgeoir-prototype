import { StatusBar } from '../components/StatusBar'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/IconButton'
import { content } from '../data/content'
import { useStore } from '../state/store'
import check from '../assets/icons/check.svg'
import volume from '../assets/icons/volume.svg'

/** 07c · Step complete (for the conversation, and the same screen for a finished word lesson) */
export function StepComplete({ kind = 'conversation' }: { kind?: 'conversation' | 'words' }) {
  const { state } = useStore()
  const words = kind === 'words'
  const c = words ? content.wordComplete : content.complete
  const lessonWords = String((3 + state.wordStep - 1) * 10) // same count as the 1000 Word Way path
  const nextTo = words ? '/practice/words/lesson' : '/conversation'
  const backTo = words ? '/practice/words' : '/courses/1'
  return (
    <main className="screen screen--surface">
      <StatusBar />
      <div className="screen__body complete">
        <span className="complete__badge">
          <Icon src={check} size={40} color="var(--icon-brand)" />
        </span>
        <h1 className="t-h1 complete__title">{c.title}</h1>
        <p className="t-body complete__lead">{c.body}</p>
        <div className="complete__stats">
          {c.stats.map((s) => (
            <div key={s.label} className="complete__stat">
              <span className="t-h2">{s.value.replace('{words}', lessonWords)}</span>
              <span className="t-small complete__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <h2 className="t-h3 complete__review">{c.reviewTitle}</h2>
        <ul className="phrase-list">
          {c.phrases.map((p) => (
            <li key={p.irish} className="phrase-list__row">
              <div className="phrase-list__text">
                <span className="t-body-strong">{p.irish}</span>
                <span className="t-small phrase-list__english">{p.english}</span>
              </div>
              <IconButton label={`Play: ${p.irish}`} onClick={() => {}}>
                <Icon src={volume} color="var(--icon-brand)" />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
      <div className="screen__actions">
        <Button to={nextTo}>{c.next}</Button>
        <Button variant="ghost" to={backTo}>
          {c.back}
        </Button>
      </div>
    </main>
  )
}
