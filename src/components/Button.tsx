import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'surface' | 'ghost' | 'ghost-on-dark'

type Props = {
  variant?: Variant
  to?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
  children: ReactNode
}

/** UI/Button. Primary = main action (one per screen). Secondary = alternative. Ghost = text link. */
export function Button({ variant = 'primary', to, onClick, disabled, type = 'button', children }: Props) {
  const cls = `btn btn--${variant} t-button`
  if (to && !disabled) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
