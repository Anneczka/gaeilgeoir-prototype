import { Link } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { Chip } from '../components/Chip'
import { CurrentCourseCard } from '../components/CurrentCourseCard'
import { RankCard } from '../components/RankCard'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { useStore } from '../state/store'
import flame from '../assets/icons/flame.svg'
import tileWords from '../assets/icons/tile-words.svg'
import tileQuizzes from '../assets/icons/tile-quizzes.svg'
import tileSongs from '../assets/icons/tile-songs.svg'
import tilePodcasts from '../assets/icons/tile-podcasts.svg'
import tileVideos from '../assets/icons/tile-videos.svg'
import tileMyWords from '../assets/icons/tile-mywords.svg'

const tileIcons: Record<string, string> = {
  words: tileWords,
  quizzes: tileQuizzes,
  songs: tileSongs,
  podcasts: tilePodcasts,
  videos: tileVideos,
  mywords: tileMyWords,
}

/** 03 · Home */
export function Home() {
  const c = content.home
  const { state } = useStore()
  const saved = 12 + state.savedWords.length
  return (
    <main className="screen">
      <StatusBar />
      <div className="screen__body home__scroll">
        <div className="home__greeting">
          <div>
            <p className="t-body home__hello">{c.greeting}</p>
            <p className="t-h1">{fake.user.name}</p>
          </div>
          <Chip icon={flame}>{`${fake.streakDays}-day streak`}</Chip>
        </div>

        <Link to="/conversation" className="talk-card">
          <div className="talk-card__row">
            <span className="avatar avatar--m t-h3" aria-hidden="true">
              {fake.tutor.initial}
            </span>
            <div className="talk-card__text">
              <span className="t-overline">{c.talkOverline}</span>
              <span className="t-h2">{c.talkTitle}</span>
            </div>
          </div>
          <span className="t-small talk-card__body">{c.talkBody}</span>
          <span className="btn btn--surface t-button">{c.talkCta}</span>
        </Link>

        <div className="section-title">
          <h2 className="t-h2">{c.continueTitle}</h2>
          <Link to="/courses" className="t-body-strong section-title__link">
            {c.allCourses}
          </Link>
        </div>

        <CurrentCourseCard />

        <RankCard />

        <div className="section-title">
          <h2 className="t-h2">{c.practiseTitle}</h2>
        </div>
        <div className="tiles">
          {c.tiles.map((t) => (
            <Link key={t.key} to={t.to} className={`tile tile--${t.color}`}>
              <span className="tile__icon">
                <img src={tileIcons[t.key]} width={22} height={22} alt="" />
              </span>
              <span className="t-body-strong">{t.name}</span>
              <span className="t-caption tile__text">{t.key === 'mywords' ? `${saved} saved words` : t.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
