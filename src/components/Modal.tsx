import { useEffect, useRef, type ReactNode } from 'react'

/** Shared behaviour for dialogs and sheets: dark scrim, Escape closes, focus moves inside. */
function useModal(onClose?: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const first = ref.current?.querySelector<HTMLElement>('button, input, [tabindex]')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return ref
}

/** UI/Bottom sheet. `tall` = the big voice-settings sheet. */
export function BottomSheet({ label, onClose, tall = false, dark = false, className = '', children }: { label: string; onClose?: () => void; tall?: boolean; dark?: boolean; className?: string; children: ReactNode }) {
  const ref = useModal(onClose)
  return (
    <>
      <div className={`scrim ${dark ? 'scrim--dark' : 'scrim--light'}`} onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={`sheet${tall ? ' sheet--tall' : ''}${className ? ` ${className}` : ''}`} role="dialog" aria-modal="true" aria-label={label}>
        <span className="sheet__handle" aria-hidden="true" />
        {children}
      </div>
    </>
  )
}

/** UI/Dialog: centred alert with two actions. */
export function Dialog({ title, body, children, onClose }: { title: string; body: string; children: ReactNode; onClose: () => void }) {
  const ref = useModal(onClose)
  return (
    <>
      <div className="scrim scrim--dark" aria-hidden="true" />
      <div className="dialog-wrap">
        <div ref={ref} className="dialog" role="alertdialog" aria-modal="true" aria-label={title}>
          <h2 className="t-h2">{title}</h2>
          <p className="t-body dialog__body">{body}</p>
          <div className="dialog__actions">{children}</div>
        </div>
      </div>
    </>
  )
}
