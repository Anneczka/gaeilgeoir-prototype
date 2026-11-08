import { Icon } from './Icon'
import volume from '../assets/icons/volume.svg'
import translate from '../assets/icons/translate.svg'
import photo from '../assets/img/tutor-video.png'

import type { Lines } from '../data/types'

type Props = {
  lines: Lines
  english: string
  showEnglish: boolean
  /** Round avatar next to the card. Only shown in the chat version (video hidden). */
  avatar?: { kind: 'photo' } | { kind: 'initial'; letter: string } | null
  /** Pill above the text, e.g. "ALMOST THERE" for corrections. */
  badge?: string
  onPlay: () => void
  onTranslate: () => void
  onWord?: (word: string, meaning: string) => void
}

/** UI/Tutor message (also used for corrections, with a badge). */
export function TutorMessage({ lines, english, showEnglish, avatar, badge, onPlay, onTranslate, onWord }: Props) {
  return (
    <div className="tutor-message">
      {avatar?.kind === 'photo' && <span className="avatar avatar--s avatar--photo" style={{ backgroundImage: `url("${photo}")` }} aria-hidden="true" />}
      {avatar?.kind === 'initial' && (
        <span className="avatar avatar--s avatar--tint t-caption" aria-hidden="true">
          {avatar.letter}
        </span>
      )}
      <div className="tutor-message__bubble">
        {badge && <span className="pill-warning t-overline">{badge}</span>}
        <div className="t-body-lg-strong">
          {lines.map((line, i) => (
            <p key={i}>
              {line.map((seg, j) =>
                typeof seg === 'string' ? (
                  seg
                ) : (
                  <button key={j} type="button" className="word-btn" onClick={() => onWord?.(seg.w, seg.en)}>
                    {seg.w}
                  </button>
                ),
              )}
            </p>
          ))}
        </div>
        {showEnglish && <p className="t-small tutor-message__english">{english}</p>}
        <div className="tutor-message__actions">
          <button type="button" className="hit-44" aria-label="Play tutor audio" onClick={onPlay}>
            <Icon src={volume} size={20} color="var(--icon-brand)" />
          </button>
          <button type="button" className="hit-44" aria-label="Show or hide English translation" aria-pressed={showEnglish} onClick={onTranslate}>
            <Icon src={translate} size={20} color="var(--icon-brand)" />
          </button>
        </div>
      </div>
    </div>
  )
}
