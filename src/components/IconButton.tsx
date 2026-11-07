import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** UI/Icon button: 44x44 hit area, always needs an aria-label. */
export function IconButton({ label, onClick, to, children }: { label: string; onClick?: () => void; to?: string; children: ReactNode }) {
  if (to) {
    return (
      <Link to={to} className="icon-btn" aria-label={label}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className="icon-btn" aria-label={label} onClick={onClick}>
      {children}
    </button>
  )
}
