import { Icon } from './Icon'
import check from '../assets/icons/check.svg'

/** UI/Toast: dark message with a check and an "Undo" action. */
export function Toast({ message, action, onAction }: { message: string; action?: string; onAction?: () => void }) {
  return (
    <div className="toast" role="status">
      <Icon src={check} size={24} color="var(--icon-on-brand)" />
      <p className="t-body toast__text">{message}</p>
      {action && (
        <button type="button" className="toast__action t-body-strong" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  )
}
