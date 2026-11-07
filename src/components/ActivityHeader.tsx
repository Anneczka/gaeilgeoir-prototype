import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { ProgressBar } from './ProgressBar'
import close from '../assets/icons/close.svg'
import settings from '../assets/icons/settings.svg'
import video from '../assets/icons/video.svg'

/** UI/Activity header: X always top-left (same exit pattern everywhere), progress, optional video toggle, settings. */
export function ActivityHeader({ progress, onClose, onSettings, onShowVideo }: { progress: number; onClose: () => void; onSettings?: () => void; onShowVideo?: () => void }) {
  return (
    <div className="activity-header">
      <IconButton label="Close" onClick={onClose}>
        <Icon src={close} />
      </IconButton>
      <div className="activity-header__bar">
        <ProgressBar value={progress} label="Lesson progress" />
      </div>
      {onShowVideo && (
        <button type="button" className="activity-header__video" aria-label="Show tutor video" onClick={onShowVideo}>
          <Icon src={video} />
        </button>
      )}
      {onSettings && (
        <IconButton label="Voice settings" onClick={onSettings}>
          <Icon src={settings} />
        </IconButton>
      )}
    </div>
  )
}
