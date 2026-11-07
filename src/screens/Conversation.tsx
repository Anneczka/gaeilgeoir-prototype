import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { ActivityHeader } from '../components/ActivityHeader'
import { StepGoal } from '../components/StepGoal'
import { TutorVideo } from '../components/TutorVideo'
import { TutorMessage } from '../components/TutorMessage'
import { UserMessage } from '../components/UserMessage'
import { FeedbackCard } from '../components/FeedbackCard'
import { SuggestionCard } from '../components/SuggestionCard'
import { MicBar } from '../components/MicBar'
import { BottomSheet, Dialog } from '../components/Modal'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { VoiceSettings } from './VoiceSettings'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { fill } from '../data/fill'
import { useStore } from '../state/store'
import pencil from '../assets/icons/pencil.svg'

type Phase = 'idle' | 'recording' | 'heard'

const MIN_RECORDING_MS = 1200 // a quick tap still shows a believable recording
const SPEAKING_MS = 2500

/**
 * 07 · Conversation, 08 · Correction, 09 · What we heard (+ 07b exit dialog, 09b voice settings).
 * One scripted conversation ("beat" 0, 1, 2). Voice is simulated: the recognised text comes from content.ts.
 *   beat 0: say your name  ->  beat 1: ask how someone is  ->  beat 2: correction, try again  ->  step complete
 */
export function Conversation() {
  const c = content.conversation
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const vars = { name: fake.user.name, misheard: fake.user.misheard }

  const [beat, setBeat] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [heard, setHeard] = useState('')
  const [editing, setEditing] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
  const [showSuggestion, setShowSuggestion] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [showEnglish, setShowEnglish] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const bodyRef = useRef<HTMLDivElement>(null)
  const startedAt = useRef(0)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Keep the newest message in view
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [beat, sent, showSuggestion, videoOn])

  const goal = c.goals[beat === 0 ? 0 : 1]
  const tutor = c.tutor[beat === 0 ? 0 : 1]
  const suggestion = c.suggestions[beat === 0 ? 0 : 1]
  const speaker = state.voice.speaker
  const dialect = state.dialect ?? 'Munster'
  const progress = [0.4, 0.6, 0.8][beat]

  function playTutor() {
    setSpeaking(true)
    later(() => setSpeaking(false), SPEAKING_MS)
  }

  // --- simulated "hold to speak" ---
  function holdStart() {
    if (phase !== 'idle') return
    startedAt.current = Date.now()
    setPhase('recording')
  }
  function holdEnd() {
    if (phase !== 'recording') return
    const wait = Math.max(0, MIN_RECORDING_MS - (Date.now() - startedAt.current))
    later(() => {
      setHeard(fill(c.heard[beat], vars))
      setEditing(false)
      setPhase('heard')
    }, wait)
  }

  function submitTyped(e: FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setHeard(text)
    setDraft('')
    setTyping(false)
    setEditing(false)
    setPhase('heard')
  }

  function retake() {
    setPhase('idle')
    setEditing(false)
  }

  function send() {
    const text = heard.trim()
    if (!text) return
    setPhase('idle')
    setEditing(false)
    if (beat === 0) {
      setBeat(1)
      setSent(null)
      setVideoOn(false)
      setShowSuggestion(false)
    } else if (beat === 1) {
      setBeat(2)
      setSent(text)
    } else {
      dispatch({ type: 'completeConvStep' })
      navigate('/conversation/complete', { replace: true })
    }
  }

  function onHint() {
    setShowSuggestion(true)
    setTyping(false)
  }

  const tag = fill(c.tutorTag, { speaker, dialect })
  const initial = speaker[0]

  return (
    <main className="screen screen--surface screen--top48">
      <StatusBar />
      <ActivityHeader progress={progress} onClose={() => setExitOpen(true)} onSettings={() => setSettingsOpen(true)} onShowVideo={videoOn ? undefined : () => setVideoOn(true)} />

      <div className="screen__body conv__body" ref={bodyRef}>
        <StepGoal overline={goal.overline} title={goal.title} done={goal.done} />
        {videoOn && <TutorVideo tag={tag} initial={initial} usePhoto={speaker === 'Pádraig'} speaking={speaking} onHide={() => setVideoOn(false)} />}
        <TutorMessage
          irish={tutor.irish}
          english={tutor.english}
          showEnglish={showEnglish}
          initial={initial}
          photoAvatar={!videoOn && speaker === 'Pádraig'}
          onPlay={playTutor}
          onTranslate={() => setShowEnglish((v) => !v)}
        />
        {beat === 2 && sent && <UserMessage text={sent} />}
        {beat === 2 && <FeedbackCard overline={c.feedback.overline} title={c.feedback.title} body={c.feedback.body} />}
        {showSuggestion && beat < 2 && (
          <SuggestionCard
            overline={c.suggestionOverline}
            irish={fill(suggestion.irish, vars)}
            english={fill(suggestion.english, vars)}
            onPlay={playTutor}
            onClose={() => setShowSuggestion(false)}
          />
        )}
      </div>

      {typing ? (
        <form className="type-bar" onSubmit={submitTyped}>
          <label className="sr-only" htmlFor="type-input">
            {c.typePlaceholder}
          </label>
          <input id="type-input" className="text-input__field t-body-lg" autoFocus autoComplete="off" autoCapitalize="off" placeholder={c.typePlaceholder} value={draft} onChange={(e) => setDraft(e.target.value)} />
          <Button type="submit" disabled={!draft.trim()}>
            {c.typeSend}
          </Button>
          <button type="button" className="type-bar__back t-body-strong" onClick={() => setTyping(false)}>
            {c.hold}
          </button>
        </form>
      ) : (
        <MicBar recording={phase === 'recording'} labels={c} onHint={onHint} onType={() => setTyping(true)} onHoldStart={holdStart} onHoldEnd={holdEnd} />
      )}
      <span className="sr-only" aria-live="polite">
        {phase === 'recording' ? c.listening : ''}
      </span>

      {phase === 'heard' && (
        <BottomSheet label={c.heardOverline} onClose={retake}>
          <p className="t-overline sheet__overline">{c.heardOverline}</p>
          <div className="heard">
            {editing ? (
              <input className="heard__input t-h2" autoFocus value={heard} onChange={(e) => setHeard(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setEditing(false)} aria-label={c.heardOverline} />
            ) : (
              <button type="button" className="heard__text t-h2" onClick={() => setEditing(true)} aria-label={`${heard}. Edit`}>
                <span>{heard}</span>
                <Icon src={pencil} size={20} color="var(--icon-brand)" />
              </button>
            )}
          </div>
          <p className="t-small sheet__lead">{c.heardHelp}</p>
          <div className="sheet__actions">
            <Button variant="outline" onClick={retake}>
              {c.retake}
            </Button>
            <Button onClick={send}>{c.send}</Button>
          </div>
        </BottomSheet>
      )}

      {settingsOpen && <VoiceSettings onClose={() => setSettingsOpen(false)} onPreview={() => { setSettingsOpen(false); playTutor() }} />}

      {exitOpen && (
        <Dialog title={c.exit.title} body={c.exit.body} onClose={() => setExitOpen(false)}>
          <Button onClick={() => setExitOpen(false)}>{c.exit.keep}</Button>
          <Button variant="ghost" to="/home">
            {c.exit.end}
          </Button>
        </Dialog>
      )}
    </main>
  )
}
