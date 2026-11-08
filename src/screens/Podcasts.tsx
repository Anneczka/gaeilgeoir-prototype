import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import { fill } from '../data/fill'
import podcast from '../assets/icons/podcast.svg'
import play from '../assets/icons/play.svg'

/** 10b · Podcast error. Podcasts are not built for the test: the screen shows the "can't play" state with other episodes. */
export function Podcasts() {
  const c = content.podcasts
  const navigate = useNavigate()
  const [retrying, setRetrying] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  function retry() {
    setRetrying(true) // the "network" is still down: after a moment the same error is shown again
    timer.current = window.setTimeout(() => setRetrying(false), 1200)
  }

  return (
    <main className="screen screen--top58">
      <StatusBar />
      <TitleHeader onClick={() => navigate(-1)} title={c.title} />
      <div className="screen__body podcasts">
        <section className="empty-state" role="alert">
          <span className="empty-state__icon">
            <Icon src={podcast} size={24} color="var(--icon-brand)" />
          </span>
          <h1 className="t-h3 empty-state__title">{c.errorTitle}</h1>
          <p className="t-body empty-state__body">{c.errorBody}</p>
          <div className="empty-state__cta">
            <Button variant="outline" onClick={retry} disabled={retrying}>
              {retrying ? c.retrying : c.retry}
            </Button>
          </div>
        </section>

        <h2 className="t-h3">{c.others}</h2>
        <ul className="mywords__list">
          {c.episodes.map((e) => (
            <li key={e.title} className="mywords__row">
              <div className="mywords__text">
                <p className="t-body-strong">{e.title}</p>
                <p className="t-small mywords__en">{e.meta}</p>
              </div>
              <button type="button" className="hit-44" aria-label={fill(playing === e.title ? c.pause : c.play, { title: e.title })} aria-pressed={playing === e.title} onClick={() => setPlaying(playing === e.title ? null : e.title)}>
                {playing === e.title ? <span className="song__pause song__pause--small" aria-hidden="true" /> : <Icon src={play} color="var(--icon-brand)" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
