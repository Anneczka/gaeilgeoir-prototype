import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import check from '../assets/icons/check.svg'

/** 00c · Free trial: what happens on day 0, 5 and 7, plus the plan choice. Prices are placeholders. */
export function FreeTrial() {
  const c = content.trial
  const navigate = useNavigate()
  const [plan, setPlan] = useState('annual')
  return (
    <main className="screen screen--top58">
      <StatusBar />
      <div className="screen__body trial">
        <p className="t-overline trial__overline">{c.overline}</p>
        <h1 className="t-h1">{c.title}</h1>
        <ol className="trial__steps">
          {c.steps.map((s, i) => (
            <li key={s.key} className="trial__step">
              <span className={`trial__dot t-body-strong${i === 0 ? ' trial__dot--now' : ''}`} aria-hidden="true">
                {i === 0 ? <Icon src={check} size={24} color="var(--icon-on-brand)" /> : s.key}
              </span>
              <div className="trial__text">
                <p className="t-body-strong">{s.label}</p>
                <p className="t-small trial__desc">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="trial__plans" role="radiogroup" aria-label="Plan">
          {c.plans.map((p) => (
            <button key={p.key} type="button" role="radio" aria-checked={plan === p.key} className={`trial__plan${plan === p.key ? ' trial__plan--on' : ''}`} onClick={() => setPlan(p.key)}>
              <span className="t-body-strong">{p.label}</span>
              <span className="t-small trial__desc">{p.price}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="trial__actions">
        <Button onClick={() => navigate(-1)}>{c.cta}</Button>
        <p className="t-small trial__note">{c.note}</p>
      </div>
    </main>
  )
}
