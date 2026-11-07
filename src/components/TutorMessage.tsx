import { Icon } from './Icon'
import volume from '../assets/icons/volume.svg'
import translate from '../assets/icons/translate.svg'
import photo from '../assets/img/tutor-video.png'

/** UI/Tutor message: avatar + bubble with Irish, English and play / translate buttons. */
export function TutorMessage({ irish, english, showEnglish, initial, photoAvatar, onPlay, onTranslate }: { irish: string; english: string; showEnglish: boolean; initial: string; photoAvatar: boolean; onPlay: () => void; onTranslate: () => void }) {
  return (
    <div className="tutor-message">
      {photoAvatar ? (
        <span className="avatar avatar--s avatar--photo" style={{ backgroundImage: `url("${photo}")` }} aria-hidden="true" />
      ) : (
        <span className="avatar avatar--s avatar--tint t-caption" aria-hidden="true">
          {initial}
        </span>
      )}
      <div className="tutor-message__bubble">
        <p className="t-body-lg-strong">{irish}</p>
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
