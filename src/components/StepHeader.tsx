import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { ProgressBar } from './ProgressBar'
import back from '../assets/icons/back.svg'

/** UI/Step header: back + progress + "1/2". */
export function StepHeader({ onBack, step, total }: { onBack: () => void; step: number; total: number }) {
  return (
    <div className="step-header">
      <IconButton label="Back" onClick={onBack}>
        <Icon src={back} />
      </IconButton>
      <div className="step-header__bar">
        <ProgressBar value={step / total} label={`Step ${step} of ${total}`} />
      </div>
      <span className="t-caption step-header__count">
        {step}/{total}
      </span>
      <span className="step-header__spacer" aria-hidden="true" />
    </div>
  )
}
