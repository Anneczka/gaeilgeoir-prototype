import { useState } from 'react'
import { BottomSheet } from '../components/Modal'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { progressOf } from '../logic/progress'
import { useStore } from '../state/store'

/** 05 · Change level (bottom sheet). Progress is kept when the level changes. */
export function LevelSheet({ onClose }: { onClose: () => void }) {
  const c = content.courses.levelSheet
  const { state, dispatch } = useStore()
  const current = state.level ?? 'A1'
  const [sel, setSel] = useState(current)
  const options = content.level.options
  const selName = options.find((o) => o.code === sel)?.name ?? ''

  return (
    <BottomSheet label={c.title} onClose={onClose} className="sheet--levels">
      <h2 className="t-h1 sheet__title">{c.title}</h2>
      <p className="t-small sheet__lead">{c.body}</p>
      <div className="level-list" role="radiogroup" aria-label={c.title}>
        {options.map((o) => {
          const isCurrent = o.code === current
          return (
            <button key={o.code} type="button" role="radio" aria-checked={sel === o.code} className={`option-card${sel === o.code ? ' option-card--selected' : ''}`} onClick={() => setSel(o.code)}>
              <span className="option-card__badge t-h3">{o.code}</span>
              <span className="option-card__text level-row__text">
                <span className="t-h3">{o.name}</span>
                <span className="t-small option-card__desc">{c.texts[o.code as keyof typeof c.texts]}</span>
                <ProgressBar value={isCurrent ? 3 / 135 : 0} label={`${o.name} progress`} small />
                <span className={`t-caption level-row__meta${isCurrent ? ' level-row__meta--current' : ''}`}>{isCurrent ? fill(c.yourLevel, { lessons: String(progressOf(state).lessonsDone) }) : c.courses}</span>
              </span>
            </button>
          )
        })}
      </div>
      <Button
        onClick={() => {
          dispatch({ type: 'setLevel', level: sel })
          onClose()
        }}
      >
        {fill(sel === current ? c.keep : c.switch, { name: selName })}
      </Button>
    </BottomSheet>
  )
}
