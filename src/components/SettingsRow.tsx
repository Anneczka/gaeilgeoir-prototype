import type { ReactNode } from 'react'
import { Icon } from './Icon'
import chevron from '../assets/icons/chevron-right.svg'

/** A titled group of settings rows (rounded card with dividers). */
export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="settings-group">
      <h2 className="t-overline settings-group__title">{title}</h2>
      <div className="settings-group__card">{children}</div>
    </section>
  )
}

/** UI/Settings row: label, current value, chevron. `danger` = red label. */
export function SettingsRow({ label, value, onClick, danger = false }: { label: string; value?: string; onClick: () => void; danger?: boolean }) {
  return (
    <button type="button" className="settings-row" onClick={onClick}>
      <span className={`t-body settings-row__label${danger ? ' settings-row__label--danger' : ''}`}>{label}</span>
      {value && <span className="t-body settings-row__value">{value}</span>}
      <Icon src={chevron} size={18} color="var(--icon-muted)" />
    </button>
  )
}
