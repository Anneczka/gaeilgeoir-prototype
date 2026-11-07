import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { StepHeader } from '../components/StepHeader'
import { OptionCard } from '../components/OptionCard'
import { Button } from '../components/Button'
import { content } from '../data/content'
import { useStore } from '../state/store'

/** 01 · Onboarding: level */
export function OnboardingLevel() {
  const c = content.level
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [sel, setSel] = useState<string | null>(state.level)
  return (
    <main className="screen screen--top45">
      <StatusBar />
      <StepHeader step={1} total={2} onBack={() => navigate('/login')} />
      <div className="screen__body onboarding">
        <h1 className="t-display">{c.title}</h1>
        <p className="t-body onboarding__lead">{c.body}</p>
        <div className="onboarding__list" role="radiogroup" aria-label="Irish level">
          {c.options.map((o) => (
            <OptionCard key={o.code} code={o.code} title={o.name} text={o.text} selected={sel === o.code} onSelect={() => setSel(o.code)} />
          ))}
        </div>
      </div>
      <div className="screen__actions">
        <Button
          disabled={!sel}
          onClick={() => {
            if (!sel) return
            dispatch({ type: 'setLevel', level: sel })
            navigate('/onboarding/dialect')
          }}
        >
          {c.cta}
        </Button>
      </div>
    </main>
  )
}

/** 02 · Onboarding: dialect */
export function OnboardingDialect() {
  const c = content.dialect
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [sel, setSel] = useState<string | null>(state.dialect)
  return (
    <main className="screen screen--top45">
      <StatusBar />
      <StepHeader step={2} total={2} onBack={() => navigate('/onboarding/level')} />
      <div className="screen__body onboarding">
        <h1 className="t-display">{c.title}</h1>
        <p className="t-body onboarding__lead">{c.body}</p>
        <div className="onboarding__list" role="radiogroup" aria-label="Irish dialect">
          {c.options.map((o) => (
            <OptionCard key={o.code} code={o.code} title={o.name} text={o.text} selected={sel === o.name} onSelect={() => setSel(o.name)} />
          ))}
        </div>
        <p className="t-small onboarding__note">{c.note}</p>
      </div>
      <div className="screen__actions">
        <Button
          disabled={!sel}
          onClick={() => {
            if (!sel) return
            dispatch({ type: 'setDialect', dialect: sel })
            navigate('/home')
          }}
        >
          {c.cta}
        </Button>
      </div>
    </main>
  )
}
