import { Link } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { ProgressBar } from '../components/ProgressBar'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { useStore } from '../state/store'
import words from '../assets/icons/words.svg'
import tileQuizzes from '../assets/icons/tile-quizzes.svg'
import tileSongs from '../assets/icons/tile-songs.svg'
import tilePodcasts from '../assets/icons/tile-podcasts.svg'
import tileVideos from '../assets/icons/tile-videos.svg'
import tileMyWords from '../assets/icons/tile-mywords.svg'

const tileIcons: Record<string, string> = { quizzes: tileQuizzes, songs: tileSongs, podcasts: tilePodcasts, videos: tileVideos, mywords: tileMyWords }

/** 10 · Practice */
export function Practice() {
  const c = content.practice
  const { state } = useStore()
  const lesson = 1 + state.wordStep
  const wordsLearned = (lesson - 1) * 10
  const vars = { lesson: String(lesson), words: String(wordsLearned), saved: String(state.savedWords.length) }
  return (
    <main className="screen screen--surface screen--top56">
      <StatusBar />
      <div className="screen__body practice">
        <h1 className="t-h1">{c.title}</h1>
        <p className="t-body practice__lead">{c.body}</p>

        <section className="wordway-card" aria-label={c.wordWayTitle}>
          <div className="wordway-card__row">
            <span className="wordway-card__icon">
              <Icon src={words} size={24} color="var(--icon-on-brand)" />
            </span>
            <div className="wordway-card__text">
              <h2 className="t-h2">{c.wordWayTitle}</h2>
              <p className="t-small wordway-card__count">{fill(c.wordWayCount, vars)}</p>
            </div>
          </div>
          <p className="t-small wordway-card__body">{c.wordWayBody}</p>
          <ProgressBar value={wordsLearned / 1000} label="1000 Word Way progress" tone="success" />
          <Button to="/practice/words">{fill(c.wordWayCta, vars)}</Button>
        </section>

        <h2 className="t-h2">{c.moreTitle}</h2>
        <div className="tiles">
          {c.tiles.map((t) => (
            <Link key={t.key} to={t.to} className={`tile tile--${t.color}${'wide' in t && t.wide ? ' tile--wide' : ''}`}>
              <span className="tile__icon">
                <img src={tileIcons[t.key]} width={22} height={22} alt="" />
              </span>
              <span className="t-body-strong">{t.name}</span>
              <span className="t-caption tile__text">{fill(t.text, vars)}</span>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
