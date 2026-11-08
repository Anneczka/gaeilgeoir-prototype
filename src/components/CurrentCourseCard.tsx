import { Link } from 'react-router-dom'
import { ProgressBar } from './ProgressBar'
import { content } from '../data/content'
import { fake } from '../data/fake'

/** UI/Current course card: the course in progress. `to` = where it goes (course detail by default). */
export function CurrentCourseCard({ to = '/courses/1' }: { to?: string }) {
  const c = content.home
  return (
    <Link to={to} className="course-card">
      <span className="t-overline course-card__overline">{c.courseOverline}</span>
      <span className="t-h2">{c.courseTitle}</span>
      <span className="t-small course-card__body">{c.courseBody}</span>
      <ProgressBar value={fake.course.lessonsDone / fake.course.lessonsTotal} label="Course progress" />
      <span className="course-card__footer">
        <span className="t-caption course-card__count">{`${fake.course.lessonsDone} of ${fake.course.lessonsTotal} lessons`}</span>
        <span className="t-body-strong course-card__cta">{c.courseContinue}</span>
      </span>
    </Link>
  )
}
