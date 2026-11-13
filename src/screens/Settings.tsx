import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { SettingsGroup, SettingsRow } from '../components/SettingsRow'
import { Toggle } from '../components/Toggle'
import { Button } from '../components/Button'
import { Toast } from '../components/Toast'
import { VoiceSettings } from './VoiceSettings'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { speak } from '../audio/speak'
import { useStore } from '../state/store'

/** 16 · Settings (+ "Reset prototype" for test sessions). */
export function Settings() {
  const c = content.settings
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const level = content.level.options.find((o) => o.code === (state.level ?? 'A1'))!

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(false), 2500)
    return () => window.clearTimeout(t)
  }, [toast])

  const unavailable = () => setToast(true) // rows that are not part of the prototype say so instead of doing nothing
  const speed = state.voice.speed === '1x' ? 'Normal' : state.voice.speed

  return (
    <main className="screen screen--surface screen--top58">
      <StatusBar />
      <TitleHeader to="/profile" title={c.title} />
      <div className="screen__body settings">
        <SettingsGroup title={c.personal}>
          <SettingsRow label={c.name} value={fake.user.fullName} onClick={unavailable} />
          <SettingsRow label={c.email} value={fake.user.email} onClick={unavailable} />
          <SettingsRow label={c.level} value={`${level.name} ${level.code}`} onClick={() => navigate('/courses', { state: { openLevel: true } })} />
        </SettingsGroup>
        <SettingsGroup title={c.voice}>
          <SettingsRow label={c.dialect} value={state.dialect ?? 'Munster'} onClick={() => setVoiceOpen(true)} />
          <SettingsRow label={c.speaker} value={state.voice.speaker} onClick={() => setVoiceOpen(true)} />
          <SettingsRow label={c.speed} value={speed} onClick={() => setVoiceOpen(true)} />
        </SettingsGroup>
        <SettingsGroup title={c.leaderboard}>
          <SettingsRow label={c.nickname} value={fake.user.nickname} onClick={unavailable} />
          <label className="settings-row settings-row--toggle">
            <span className="t-body settings-row__label">{c.showMe}</span>
            <Toggle on={state.showOnLeaderboard} label={c.showMe} onChange={(v) => dispatch({ type: 'setLeaderboardVisible', visible: v })} />
          </label>
        </SettingsGroup>
        <p className="t-small settings__note">{c.leaderboardNote}</p>
        <SettingsGroup title={c.subscription}>
          <SettingsRow label={c.plan} value={c.planValue} onClick={unavailable} />
          <SettingsRow label={c.trial} value={c.trialValue} onClick={() => navigate('/free-trial')} />
          <SettingsRow label={c.cancel} onClick={unavailable} danger />
        </SettingsGroup>
        <SettingsGroup title={c.account}>
          <SettingsRow label={c.password} value={c.passwordValue} onClick={unavailable} />
          <SettingsRow label={c.notifications} value={c.notificationsValue} onClick={unavailable} />
        </SettingsGroup>
        <button type="button" className="settings__delete t-button" onClick={unavailable}>
          {c.delete}
        </button>

        <section className="settings__prototype" aria-label={c.prototype}>
          <h2 className="t-overline settings-group__title">{c.prototype}</h2>
          <p className="t-small settings__note">{c.prototypeNote}</p>
          <Button
            variant="outline"
            onClick={() => {
              dispatch({ type: 'reset' })
              navigate('/', { replace: true })
            }}
          >
            {c.reset}
          </Button>
        </section>
      </div>
      {toast && (
        <div className="toast-wrap toast-wrap--low">
          <Toast message={c.notInPrototype} />
        </div>
      )}
      {voiceOpen && <VoiceSettings onClose={() => setVoiceOpen(false)} onPreview={(sp, spd) => {
            setVoiceOpen(false)
            speak('Dia duit', sp, spd)
          }} />}
    </main>
  )
}
