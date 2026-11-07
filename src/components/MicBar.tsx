import type { KeyboardEvent, PointerEvent } from 'react'
import { Icon } from './Icon'
import hint from '../assets/icons/hint.svg'
import mic from '../assets/icons/mic.svg'
import pencil from '../assets/icons/pencil.svg'
import glow from '../assets/img/mic-glow.svg'

type Props = {
  recording: boolean
  labels: { hint: string; hold: string; listening: string; type: string }
  onHint: () => void
  onType: () => void
  onHoldStart: () => void
  onHoldEnd: () => void
}

/** UI/Mic bar: Hint · Hold to speak · Type. Voice is simulated: nothing is really recorded. */
export function MicBar({ recording, labels, onHint, onType, onHoldStart, onHoldEnd }: Props) {
  const down = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    onHoldStart()
  }
  const keyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault()
      onHoldStart()
    }
  }
  const keyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onHoldEnd()
    }
  }
  return (
    <div className="mic-bar">
      <img className="mic-bar__glow" src={glow} width={92} height={92} alt="" />
      <div className="mic-bar__side">
        <button type="button" className="mic-bar__small" onClick={onHint}>
          <span className="mic-bar__circle">
            <Icon src={hint} />
          </span>
          <span className="t-caption mic-bar__label mic-bar__label--muted">{labels.hint}</span>
        </button>
      </div>
      <button
        type="button"
        className={`mic-bar__mic${recording ? ' mic-bar__mic--recording' : ''}`}
        onPointerDown={down}
        onPointerUp={onHoldEnd}
        onPointerCancel={onHoldEnd}
        onKeyDown={keyDown}
        onKeyUp={keyUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span className="mic-bar__big">
          <Icon src={mic} size={30} color="var(--icon-on-brand)" />
        </span>
        <span className="t-caption mic-bar__label">{recording ? labels.listening : labels.hold}</span>
      </button>
      <div className="mic-bar__side">
        <button type="button" className="mic-bar__small" onClick={onType}>
          <span className="mic-bar__circle">
            <Icon src={pencil} color="var(--icon-default)" />
          </span>
          <span className="t-caption mic-bar__label mic-bar__label--muted">{labels.type}</span>
        </button>
      </div>
    </div>
  )
}
