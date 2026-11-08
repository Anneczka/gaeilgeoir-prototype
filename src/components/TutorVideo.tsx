import { Icon } from './Icon'
import { tutorLook, type TutorName } from '../data/tutors'
import ringOuter from '../assets/img/speaking-ring-outer.svg'
import ring from '../assets/img/speaking-ring.svg'
import volume from '../assets/icons/volume.svg'
import cameraOff from '../assets/icons/camera-off.svg'

/**
 * UI/Tutor video. Photo of the tutor, or (speaking / other speaker) an avatar with rings.
 * Video is simulated: there is no real video.
 */
export function TutorVideo({ tag, initial, speaker, speaking, onHide }: { tag: string; initial: string; speaker: TutorName; speaking: boolean; onHide: () => void }) {
  const avatarMode = speaking
  const look = tutorLook[speaker]
  return (
    <div className={`tutor-video${avatarMode ? ' tutor-video--avatar' : ''}`} style={avatarMode ? undefined : { background: look.bg }}>
      {avatarMode ? (
        <>
          <img className="tutor-video__ring tutor-video__ring--outer" src={ringOuter} width={148} height={148} alt="" />
          <img className="tutor-video__ring" src={ring} width={120} height={120} alt="" />
          <span className="tutor-video__avatar" aria-hidden="true">
            {initial}
          </span>
        </>
      ) : (
        <img className="tutor-video__photo" src={look.photo} alt="" style={{ width: `${look.crop.w}%`, height: `${look.crop.h}%`, left: `${look.crop.left}%`, top: `${look.crop.top}%` }} />
      )}
      <span className="tutor-video__tag t-caption">{tag}</span>
      <div className="tutor-video__tools">
        {!avatarMode && (
          <span className="tutor-video__tool" aria-hidden="true">
            <Icon src={volume} size={20} />
          </span>
        )}
        <button type="button" className="tutor-video__tool" aria-label="Hide tutor video" onClick={onHide}>
          <Icon src={cameraOff} size={20} />
        </button>
      </div>
    </div>
  )
}
