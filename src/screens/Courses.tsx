import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { CurrentCourseCard } from '../components/CurrentCourseCard'
import { CourseRow } from '../components/CourseRow'
import { LevelSheet } from './LevelSheet'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { fake } from '../data/fake'
import { progressOf } from '../logic/progress'
import { useStore } from '../state/store'

/** 04 · Courses (+ 05 · Change level pop-up). */
export function Courses() {
  const c = content.courses
  const { state } = useStore()
  const location = useLocation()
  // Profile and Settings can open this page with the level sheet already showing
  const [sheet, setSheet] = useState(Boolean((location.state as { openLevel?: boolean } | null)?.openLevel))
  const { lessonsDone } = progressOf(state)
  const level = content.level.options.find((o) => o.code === (state.level ?? 'A1'))!

  return (
    <main className="screen screen--top56">
      <StatusBar />
      <div className="screen__body courses">
        <h1 className="t-h1">{c.title}</h1>
        <div className="courses__level">
          <p className="t-body courses__level-text">{fill(c.yourLevel, { name: level.name, code: level.code })}</p>
          <button type="button" className="chip t-body-strong" onClick={() => setSheet(true)}>
            {c.changeLevel}
          </button>
        </div>
        <CurrentCourseCard to="/conversation" />
        <h2 className="t-h2">{fill(c.listTitle, { name: level.name })}</h2>
        {c.list.map((course) => (
          <CourseRow key={course.n} n={course.n} title={course.title} text={course.text} lessons={c.lessons} progress={course.n === 1 ? lessonsDone / fake.course.lessonsTotal : 0} />
        ))}
      </div>
      <BottomNav />
      {sheet && <LevelSheet onClose={() => setSheet(false)} />}
    </main>
  )
}
