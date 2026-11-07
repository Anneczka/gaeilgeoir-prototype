import { Icon } from './Icon'
import { IconButton } from './IconButton'
import close from '../assets/icons/close.svg'
import back from '../assets/icons/back.svg'

/** UI/Title header: close (X) or back arrow on the left, optional title. */
export function TitleHeader({ to, onClick, title, icon = 'close' }: { to?: string; onClick?: () => void; title?: string; icon?: 'close' | 'back' }) {
  return (
    <div className="title-header">
      <IconButton label={icon === 'close' ? 'Close' : 'Back'} to={to} onClick={onClick}>
        <Icon src={icon === 'close' ? close : back} />
      </IconButton>
      <span className="t-h3">{title ?? ' '}</span>
    </div>
  )
}
