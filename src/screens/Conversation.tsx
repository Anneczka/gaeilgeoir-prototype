import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { ActivityHeader } from '../components/ActivityHeader'
import { StepGoal } from '../components/StepGoal'
import { TutorVideo } from '../components/TutorVideo'
import { TutorMessage } from '../components/TutorMessage'
import { UserMessage } from '../components/UserMessage'
import { SuggestionCard } from '../components/SuggestionCard'
import { MicBar } from '../components/MicBar'
import { Toast } from '../components/Toast'
import { BottomSheet, Dialog } from '../components/Modal'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { VoiceSettings } from './VoiceSettings'
import { SaveWord } from './SaveWord'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { isCorrect, normalize } from '../logic/conversation'
import { useStore } from '../state/store'
import { speak, stopSpeaking } from '../audio/speak'
import { messageText } from '../audio/text'
import type { Step } from '../data/types'
import pencil from '../assets/icons/pencil.svg'

type Phase = 'idle' | 'recording' | 'heard'
type Msg =
  | { id: number; kind: 'tutor'; step: number }
  | { id: number; kind: 'user'; text: string }
  | { id: number; kind: 'fix'; lines: readonly string[]; english: string }

const MIN_RECORDING_MS = 1200 // a quick tap still shows a believable recording
const TOAST_MS = 3500

/**
 * 07 · Conversation (with tutor video, or chat-only when the video is hidden), 08 · Correction,
 * 09 · What we heard, 07b exit dialog, 09b voice settings, and the "save word" sheet.
 * The voice is simulated: what the microphone "hears" comes from content.ts.
 */
export type LessonConfig = {
  steps: readonly Step[]
  /** Replaces {placeholders} in step texts, e.g. the lesson number */
  vars?: Record<string, string>
  /** Where "End conversation" goes */
  exitTo: string
  /** Where "Finish the lesson" goes */
  completeTo: string
  onComplete: 'conversation' | 'words'
}

export function Conversation() {
  return <ConversationView steps={content.conversation.steps} exitTo="/home" completeTo="/conversation/complete" onComplete="conversation" />
}

/** The shared chat screen: used by the conversation lesson and by the 1000 Word Way word lesson. */
export function ConversationView({ steps, vars = {}, exitTo, completeTo, onComplete }: LessonConfig) {
  const c = content.conversation
  const navigate = useNavigate()
  const { state, dispatch } = useStore()

  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, kind: 'tutor', step: 0 }])
  const [stepIdx, setStepIdx] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [finished, setFinished] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [heard, setHeard] = useState('')
  const [editing, setEditing] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false) // only after tapping Hint
  const [videoOn, setVideoOn] = useState(true)
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [showEnglish, setShowEnglish] = useState(true)
  const [exitOpen, setExitOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [wordSheet, setWordSheet] = useState<{ w: string; en: string } | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const bodyRef = useRef<HTMLDivElement>(null)
  const startedAt = useRef(0)
  const nextId = useRef(1)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms)
    timers.current.push(t)
    return t
  }
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      stopSpeaking()
    },
    [],
  )

  // The tutor speaks each new message (and each correction) by itself, like in the real app
  useEffect(() => {
    const last = msgs[msgs.length - 1]
    const text = last.kind === 'tutor' ? messageText(steps[last.step].tutor.lines) : last.kind === 'fix' ? messageText(last.lines.map((l) => [l])) : null
    if (!text) return
    const t = window.setTimeout(() => playTutor(text), 450)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs.length])

  // Keep the newest message in view
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [msgs.length, showSuggestion, finished])

  const step = steps[stepIdx]
  const speaker = state.voice.speaker
  const dialect = state.dialect ?? 'Munster'
  const progress = finished ? 1 : 0.4 + 0.2 * stepIdx
  const avatar = videoOn ? null : ({ kind: 'photo', speaker } as const)

  /** Plays the recorded voice for `text` (the tutor's picture stays as it is). No audio file for it = silence. */
  function playTutor(text?: string, who: string = speaker, speed: string = state.voice.speed) {
    if (text) speak(text, who, speed)
  }

  // --- simulated "hold to speak" ---
  function holdStart() {
    if (phase !== 'idle' || finished) return
    startedAt.current = Date.now()
    setPhase('recording')
  }
  function holdEnd() {
    if (phase !== 'recording') return
    const wait = Math.max(0, MIN_RECORDING_MS - (Date.now() - startedAt.current))
    later(() => {
      setHeard(step.spoken[attempt] ?? step.expected.irish)
      setEditing(false)
      setPhase('heard')
    }, wait)
  }

  /** The learner's answer (spoken or typed) goes into the chat; the tutor reacts. */
  function submit(text: string) {
    const answer = text.trim()
    if (!answer) return
    const add: Msg[] = [{ id: nextId.current++, kind: 'user', text: answer }]
    if (isCorrect(answer, step.expected.irish)) {
      setShowSuggestion(false)
      setAttempt(0)
      if (stepIdx < steps.length - 1) {
        add.push({ id: nextId.current++, kind: 'tutor', step: stepIdx + 1 })
        setStepIdx(stepIdx + 1)
      } else {
        setFinished(true)
      }
    } else {
      const scriptedMistake = step.fix && normalize(answer) === normalize(step.spoken[0])
      add.push(
        scriptedMistake
          ? { id: nextId.current++, kind: 'fix', lines: step.fix.lines, english: step.fix.english }
          : {
              id: nextId.current++,
              kind: 'fix',
              lines: [fill(c.genericFix.line, { irish: step.expected.irish })],
              english: fill(c.genericFix.english, { english: step.expected.english }),
            },
      )
      setAttempt((a) => a + 1)
    }
    setMsgs((m) => [...m, ...add])
  }

  function sendHeard() {
    const text = heard
    setPhase('idle')
    setEditing(false)
    submit(text)
  }

  function sendTyped(e: FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    setTyping(false)
    submit(text) // typing goes straight back to the conversation, no "what we heard" step
  }

  function finishLesson() {
    dispatch({ type: onComplete === 'words' ? 'completeWordStep' : 'completeConvStep' })
    navigate(completeTo, { replace: true })
  }

  function openWord(w: string, en: string) {
    setWordSheet({ w, en })
  }
  const wordSaved = wordSheet ? state.savedWords.includes(wordSheet.w) : false
  function toggleWord() {
    if (!wordSheet) return
    if (wordSaved) {
      dispatch({ type: 'removeWord', word: wordSheet.w })
      return
    }
    dispatch({ type: 'saveWord', word: wordSheet.w })
    setWordSheet(null)
    setToast(wordSheet.w)
    later(() => setToast(null), TOAST_MS)
  }
  function undoToast() {
    if (toast) dispatch({ type: 'removeWord', word: toast })
    setToast(null)
  }

  const tag = fill(c.tutorTag, { speaker, dialect })
  const messageProps = { showEnglish, avatar, onPlay: (text: string) => playTutor(text), onTranslate: () => setShowEnglish((v) => !v), onWord: openWord }

  return (
    <main className="screen screen--surface screen--top48">
      <StatusBar />
      <ActivityHeader progress={progress} onClose={() => setExitOpen(true)} onSettings={() => setSettingsOpen(true)} onShowVideo={videoOn ? undefined : () => setVideoOn(true)} />

      <div className="screen__body conv__body" ref={bodyRef}>
        <div className="conv__sticky">
          <StepGoal overline={fill(step.overline, vars)} title={fill(step.goal, vars)} done={step.done} />
          {videoOn && <TutorVideo tag={tag} speaker={speaker} onHide={() => setVideoOn(false)} />}
        </div>
        <div className="conv__chat">
          {msgs.map((m) =>
            m.kind === 'tutor' ? (
              <TutorMessage key={m.id} lines={steps[m.step].tutor.lines} english={steps[m.step].tutor.english} {...messageProps} />
            ) : m.kind === 'user' ? (
              <UserMessage key={m.id} text={m.text} />
            ) : (
              <TutorMessage key={m.id} lines={m.lines.map((l) => [l])} english={m.english} badge={c.almostThere} {...messageProps} />
            ),
          )}
          {showSuggestion && !finished && <SuggestionCard overline={c.suggestionOverline} irish={step.expected.irish} english={step.expected.english} onPlay={() => playTutor(step.expected.irish)} onClose={() => setShowSuggestion(false)} />}
        </div>
      </div>

      {finished ? (
        <div className="finish-bar">
          <Button onClick={finishLesson}>{c.finish}</Button>
        </div>
      ) : typing ? (
        <form className="type-bar" onSubmit={sendTyped}>
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
        <MicBar recording={phase === 'recording'} labels={c} onHint={() => { setShowSuggestion(true); setTyping(false) }} onType={() => setTyping(true)} onHoldStart={holdStart} onHoldEnd={holdEnd} />
      )}
      <span className="sr-only" aria-live="polite">
        {phase === 'recording' ? c.listening : ''}
      </span>

      {toast && (
        <div className="toast-wrap">
          <Toast message={content.word.saved} action={content.word.undo} onAction={undoToast} />
        </div>
      )}

      {phase === 'heard' && (
        <BottomSheet
          label={c.heardOverline}
          onClose={() => {
            setPhase('idle')
            setEditing(false)
          }}
        >
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
            <Button
              variant="outline"
              onClick={() => {
                setPhase('idle')
                setEditing(false)
              }}
            >
              {c.retake}
            </Button>
            <Button onClick={sendHeard} disabled={!heard.trim()}>
              {c.send}
            </Button>
          </div>
        </BottomSheet>
      )}

      {wordSheet && <SaveWord word={wordSheet.w} meaning={wordSheet.en} saved={wordSaved} onToggleSave={toggleWord} onPlay={() => playTutor(wordSheet.w)} onClose={() => setWordSheet(null)} />}

      {settingsOpen && (
        <VoiceSettings
          onClose={() => setSettingsOpen(false)}
          onPreview={(sp, spd) => {
            setSettingsOpen(false)
            playTutor('Dia duit', sp, spd)
          }}
        />
      )}

      {exitOpen && (
        <Dialog title={c.exit.title} body={c.exit.body} onClose={() => setExitOpen(false)}>
          <Button onClick={() => setExitOpen(false)}>{c.exit.keep}</Button>
          <Button variant="ghost" to={exitTo}>
            {c.exit.end}
          </Button>
        </Dialog>
      )}
    </main>
  )
}
