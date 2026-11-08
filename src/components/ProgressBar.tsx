/** UI/Progress bar. `value` is 0 to 1. */
export function ProgressBar({ value, label, tone = 'default', small = false }: { value: number; label: string; tone?: 'default' | 'success'; small?: boolean }) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div className={`progress${tone === 'success' ? ' progress--success' : ''}${small ? ' progress--small' : ''}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
      <div className="progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
