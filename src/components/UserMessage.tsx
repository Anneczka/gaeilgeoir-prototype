import { Icon } from './Icon'
import mic from '../assets/icons/mic-small.svg'

/** UI/User message: green bubble on the right. */
export function UserMessage({ text }: { text: string }) {
  return (
    <div className="user-message">
      <div className="user-message__bubble">
        <Icon src={mic} size={16} color="var(--icon-on-brand)" />
        <p className="t-body-lg">{text}</p>
      </div>
    </div>
  )
}
