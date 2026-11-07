import { Icon } from './Icon'
import photo from '../assets/img/tutor-video.png'
import ringOuter from '../assets/img/speaking-ring-outer.svg'
import ring from '../assets/img/speaking-ring.svg'
import volume from '../assets/icons/volume.svg'
import cameraOff from '../assets/icons/camera-off.svg'

/**
 * UI/Tutor video. Photo of the tutor, or (speaking / other speaker) an avatar with rings.
 * Video is simulated: there is no real video.
 */
export function TutorVideo({ tag, initial, usePhoto, speaking, onHide }: { tag: string; initial: string; usePhoto: boolean; speaking: boolean; onHide: () => void }) {
  const avatarMode = !usePhoto || speaking
  return (
    <div className={`tutor-video${avatarMode ? ' tutor-video--avatar' : ''}`}>
      {avatarMode ? (
        <>
          <img className="tutor-video__ring tutor-video__ring--outer" src={ringOuter} width={148} height={148} alt="" />
          <img className="tutor-video__ring" src={ring} width={120} height={120} alt="" />
          <span className="tutor-video__avatar" aria-hidden="true">
            {initial}
          </span>
        </>
      ) : (
        <img className="tutor-video__photo" src={photo} alt="" />
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
