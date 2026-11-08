import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { ProgressBar } from './ProgressBar'
import chevron from '../assets/icons/chevron-right.svg'

/** UI/Course row: number badge, title, short text, progress, chevron. */
export function CourseRow({ n, title, text, lessons, progress }: { n: number; title: string; text: string; lessons: string; progress: number }) {
  return (
    <Link to={`/courses/${n}`} className="course-row">
      <span className="course-row__badge">
        <span className="t-caption">Course</span>
        <span className="t-h3">{n}</span>
      </span>
      <span className="course-row__text">
        <span className="t-h3">{title}</span>
        <span className="t-small course-row__desc">{text}</span>
        <span className="course-row__meta">
          <ProgressBar value={progress} label={`Course ${n} progress`} small />
          <span className="t-caption course-row__lessons">{lessons}</span>
        </span>
      </span>
      <Icon src={chevron} size={20} color="var(--icon-muted)" />
    </Link>
  )
}
