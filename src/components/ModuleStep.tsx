import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import check from '../assets/icons/step-check.svg'

export type StepStatus = 'done' | 'current' | 'todo'

/** UI/Module step (Done / Current / Todo). The current step is a link to the lesson. */
export function ModuleStep({ status, title, text, to }: { status: StepStatus; title: string; text: string; to?: string }) {
  const body = (
    <>
      <span className={`module-step__status module-step__status--${status}`}>{status === 'done' && <Icon src={check} size={14} color="var(--icon-on-brand)" />}</span>
      <span className="module-step__text">
        <span className={`${status === 'current' ? 't-body-strong' : 't-body'}${status === 'todo' ? ' module-step__title--todo' : ''}`}>{title}</span>
        <span className="t-small module-step__sub">{text}</span>
      </span>
    </>
  )
  const a11y = `${title}, ${status === 'done' ? 'done' : status === 'current' ? 'current step' : 'not started'}`
  return to && status === 'current' ? (
    <Link to={to} className="module-step" aria-label={a11y}>
      {body}
    </Link>
  ) : (
    <div className="module-step" role="group" aria-label={a11y}>
      {body}
    </div>
  )
}
