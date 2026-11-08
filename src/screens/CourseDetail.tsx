import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { ModuleStep } from '../components/ModuleStep'
import { ProgressBar } from '../components/ProgressBar'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { fill } from '../data/fill'
import { progressOf } from '../logic/progress'
import { useStore } from '../state/store'
import back from '../assets/icons/back.svg'

/** 06 · Course detail: modules and steps, with a button to the next step. */
export function CourseDetail() {
  const c = content.courseDetail
  const navigate = useNavigate()
  const { lessonsDone } = progressOf(useStore().state)
  return (
    <main className="screen screen--top56">
      <StatusBar />
      <div className="screen__body course-detail">
        <button type="button" className="course-detail__back t-body" aria-label={c.back} onClick={() => navigate('/courses')}>
          <Icon src={back} size={20} color="var(--icon-default)" />
          {c.crumb}
        </button>
        <h1 className="t-h1">{c.title}</h1>
        <p className="t-small course-detail__meta">{c.meta}</p>
        <ProgressBar value={lessonsDone / fake.course.lessonsTotal} label="Course progress" />
        <Button to="/conversation">{c.cta}</Button>
        {c.modules.map((m) => (
          <section key={m.title} className="module-card" aria-label={m.title}>
            <h2 className="t-h3">{m.title}</h2>
            {m.steps.map((st) => (
              <ModuleStep key={st.title} status={st.status as 'done' | 'current' | 'todo'} title={st.title} text={fill(st.text, { name: fake.user.name })} to="/conversation" />
            ))}
          </section>
        ))}
      </div>
      <BottomNav />
    </main>
  )
}
