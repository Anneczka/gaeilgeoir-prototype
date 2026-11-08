import { Link } from 'react-router-dom'
import { ProgressBar } from './ProgressBar'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { progressOf } from '../logic/progress'
import { useStore } from '../state/store'

/** UI/Current course card: the course in progress. `to` = where it goes, `cta` = the label that says so ("Continue →" resumes the lesson, "View course →" opens the detail). */
export function CurrentCourseCard({ to = '/courses/1', cta }: { to?: string; cta?: string }) {
  const c = content.home
  const { lessonsDone } = progressOf(useStore().state)
  return (
    <Link to={to} className="course-card">
      <span className="t-overline course-card__overline">{c.courseOverline}</span>
      <span className="t-h2">{c.courseTitle}</span>
      <span className="t-small course-card__body">{c.courseBody}</span>
      <ProgressBar value={lessonsDone / fake.course.lessonsTotal} label="Course progress" />
      <span className="course-card__footer">
        <span className="t-caption course-card__count">{`${lessonsDone} of ${fake.course.lessonsTotal} lessons`}</span>
        <span className="t-body-strong course-card__cta">{cta ?? c.courseContinue}</span>
      </span>
    </Link>
  )
}
