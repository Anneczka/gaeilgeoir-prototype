import { Link } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { ProgressBar } from '../components/ProgressBar'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { useStore } from '../state/store'
import check from '../assets/icons/path-check.svg'
import play from '../assets/icons/path-play.svg'
import lock from '../assets/icons/path-lock.svg'

// Zig-zag positions (centre x of each lesson circle) and spacing, taken from the Figma path
const LEFT = [94, 114, 124, 104]
const RIGHT = [234, 244, 234, 244]
/** Centre x of lesson number i (0-based): the first five match Figma, then it keeps zig-zagging. */
const centre = (i: number) => (i % 2 === 0 ? LEFT : RIGHT)[Math.floor(i / 2) % 4]
const ROW = 100
const NODE = 68

/** 13 · 1000 Word Way (lesson path) */
export function WordWay() {
  const c = content.wordWay
  const { state } = useStore()
  const current = 3 + state.wordStep
  const total = current + 3
  const lessons = Array.from({ length: total }, (_, i) => i + 1)
  const points = lessons.map((_, i) => `${centre(i)},${i * ROW + NODE / 2}`).join(' ')
  const words = (current - 1) * 10
  return (
    <main className="screen screen--surface screen--top58">
      <StatusBar />
      <TitleHeader to="/practice" title={c.title} />
      <div className="screen__body wordway">
        <div className="progress-card">
          <div className="progress-card__row t-h3">
            <span>{c.yourWords}</span>
            <span className="progress-card__count">{fill(c.count, { words: String(words) })}</span>
          </div>
          <ProgressBar value={words / 1000} label="Your words" tone="success" />
          <p className="t-caption progress-card__caption">{fill(c.caption, { lesson: String(current) })}</p>
        </div>

        <div className="path" style={{ height: lessons.length * ROW + 40 }}>
          <svg className="path__line" width="375" height={lessons.length * ROW} aria-hidden="true">
            <polyline points={points} fill="none" stroke="var(--green-200)" strokeWidth="4" strokeDasharray="8 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {lessons.map((n, i) => {
            const status = n < current ? 'done' : n === current ? 'current' : 'locked'
            const label = fill(c.lessonLabel, { n: String(n) })
            const a = (n - 1) * 10 + 1
            const range = fill(c.wordsRange, { a: String(a), b: String(a + 9) })
            const circle = (
              <span className={`path-node__circle path-node__circle--${status}`}>
                <Icon src={status === 'done' ? check : status === 'current' ? play : lock} size={status === 'current' ? 30 : status === 'done' ? 28 : 22} color={status === 'locked' ? 'var(--icon-muted)' : 'var(--icon-on-brand)'} />
              </span>
            )
            const text = (
              <>
                <span className={`t-body-strong path-node__label${status === 'locked' ? ' path-node__label--locked' : ''}`}>{label}</span>
                <span className="t-caption path-node__range">{range}</span>
              </>
            )
            const style = { left: centre(i), top: i * ROW }
            return status === 'current' ? (
              <Link key={n} to="/practice/words/lesson" className="path-node" style={style} aria-label={`${label}, ${range}, ${c.current}`}>
                {circle}
                {text}
              </Link>
            ) : (
              <div key={n} className="path-node path-node--static" style={style} aria-label={`${label}, ${range}, ${status === 'done' ? c.done : c.locked}`} role="img">
                {circle}
                {text}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
