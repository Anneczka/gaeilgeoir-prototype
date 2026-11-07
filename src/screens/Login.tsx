import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'
import { content } from '../data/content'
import { useStore } from '../state/store'

/** 00b · Log in. Any non-empty email + password works (participants get a temporary login from GO). */
export function Login() {
  const c = content.login
  const navigate = useNavigate()
  const { dispatch } = useStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tried, setTried] = useState(false)

  const emailError = tried && !email.trim() ? c.emailError : undefined
  const passwordError = tried && !password ? c.passwordError : undefined

  function submit(e: FormEvent) {
    e.preventDefault()
    setTried(true)
    if (!email.trim() || !password) return
    dispatch({ type: 'login' })
    navigate('/onboarding/level')
  }

  return (
    <form className="screen screen--surface screen--top58" onSubmit={submit} noValidate>
      <StatusBar />
      <TitleHeader to="/" />
      <div className="screen__body login__body">
        <h1 className="t-h1">{c.title}</h1>
        <TextInput
          label={c.emailLabel}
          type="email"
          autoComplete="username"
          placeholder={c.emailPlaceholder}
          hint={c.emailHint}
          error={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label={c.passwordLabel}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          hint={c.passwordHint}
          error={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="login__forgot t-body-strong">
          {c.forgot}
        </button>
      </div>
      <div className="screen__actions">
        <Button type="submit">{c.submit}</Button>
      </div>
    </form>
  )
}
