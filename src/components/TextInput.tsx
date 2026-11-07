import { useId, type InputHTMLAttributes } from 'react'

type Props = {
  label: string
  hint?: string
  error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

/** UI/Text input (Default / Focus / Error). Real <label> + <input>. */
export function TextInput({ label, hint, error, ...rest }: Props) {
  const id = useId()
  const msgId = `${id}-msg`
  return (
    <div className="text-input">
      <label htmlFor={id} className="t-body-strong">
        {label}
      </label>
      <input
        id={id}
        className={`text-input__field t-body-lg${error ? ' text-input__field--error' : ''}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={msgId}
        {...rest}
      />
      <p id={msgId} className={`t-small ${error ? 'text-input__error' : 'text-input__hint'}`} role={error ? 'alert' : undefined}>
        {error ?? hint}
      </p>
    </div>
  )
}
