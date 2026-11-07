import { Icon } from './Icon'
import volume from '../assets/icons/volume.svg'
import close from '../assets/icons/close.svg'

/** UI/Suggestion card: "WHAT TO SAY". */
export function SuggestionCard({ overline, irish, english, onPlay, onClose }: { overline: string; irish: string; english: string; onPlay: () => void; onClose: () => void }) {
  return (
    <div className="suggestion-card">
      <div className="suggestion-card__row">
        <span className="t-overline suggestion-card__overline">{overline}</span>
        <button type="button" className="hit-44" aria-label="Play suggested phrase" onClick={onPlay}>
          <Icon src={volume} size={20} color="var(--icon-brand)" />
        </button>
        <button type="button" className="hit-44" aria-label="Hide suggestion" onClick={onClose}>
          <Icon src={close} size={20} color="var(--icon-default)" />
        </button>
      </div>
      <p className="t-h3">{irish}</p>
      <p className="t-small suggestion-card__english">{english}</p>
    </div>
  )
}
