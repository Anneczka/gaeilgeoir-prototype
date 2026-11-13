import { Icon } from './Icon'
import { tutorLook, type TutorName } from '../data/tutors'
import volume from '../assets/icons/volume.svg'
import cameraOff from '../assets/icons/camera-off.svg'

/** UI/Tutor video. Photo of the tutor; it stays the same while the tutor's audio plays. Video is simulated. */
export function TutorVideo({ tag, speaker, onHide }: { tag: string; speaker: TutorName; onHide: () => void }) {
  const look = tutorLook[speaker]
  return (
    <div className="tutor-video" style={{ background: look.bg }}>
      <img className="tutor-video__photo" src={look.photo} alt="" style={{ width: `${look.crop.w}%`, height: `${look.crop.h}%`, left: `${look.crop.left}%`, top: `${look.crop.top}%` }} />
      <span className="tutor-video__tag t-caption">{tag}</span>
      <div className="tutor-video__tools">
        <span className="tutor-video__tool" aria-hidden="true">
          <Icon src={volume} size={20} />
        </span>
        <button type="button" className="tutor-video__tool" aria-label="Hide tutor video" onClick={onHide}>
          <Icon src={cameraOff} size={20} />
        </button>
      </div>
    </div>
  )
}
