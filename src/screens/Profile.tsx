import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { RankCard } from '../components/RankCard'
import { Stat } from '../components/Stat'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { fill } from '../data/fill'
import { progressOf } from '../logic/progress'
import { useStore } from '../state/store'
import streak from '../assets/icons/stat-streak.svg'
import lessons from '../assets/icons/stat-lessons.svg'
import quizzes from '../assets/icons/stat-quizzes.svg'
import words from '../assets/icons/stat-words.svg'

const statIcons: Record<string, string> = { streak, lessons, quizzes, words }

/** 15 · Profile */
export function Profile() {
  const c = content.profile
  const navigate = useNavigate()
  const { state } = useStore()
  const level = content.level.options.find((o) => o.code === (state.level ?? 'A1'))!
  const progress = progressOf(state)
  const vars = { streak: String(progress.streakDays), saved: String(progress.savedWords), lessons: String(progress.lessonsDone), dialect: state.dialect ?? 'Munster' }
  return (
    <main className="screen screen--surface screen--top56">
      <StatusBar />
      <div className="screen__body profile">
        <div className="profile__card">
          <span className="avatar avatar--l" aria-hidden="true">
            {fake.user.initials}
          </span>
          <h1 className="t-h2">{fake.user.fullName}</h1>
          <p className="t-small profile__since">{fill(c.since, vars)}</p>
          <div className="profile__edit">
            <Button variant="outline" to="/settings">
              {c.edit}
            </Button>
          </div>
        </div>

        <h2 className="t-h2">{c.myCourse}</h2>
        <div className="profile__course">
          <span className="profile__badge t-h3">{level.code}</span>
          <span className="profile__course-text">
            <span className="t-h3">{level.name}</span>
            <span className="t-small profile__course-line">{fill(c.courseLine, vars)}</span>
          </span>
          <button type="button" className="chip t-body-strong" onClick={() => navigate('/courses', { state: { openLevel: true } })}>
            {c.change}
          </button>
        </div>

        <RankCard />

        <h2 className="t-h2">{c.myProgress}</h2>
        <div className="stats">
          {c.stats.map((s) => (
            <Stat key={s.key} icon={statIcons[s.key]} value={fill(s.value, vars)} label={s.label} />
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  )
}
