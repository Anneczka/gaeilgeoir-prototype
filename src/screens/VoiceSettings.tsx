import { useState } from 'react'
import { BottomSheet } from '../components/Modal'
import { SegmentedControl } from '../components/SegmentedControl'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import { fill } from '../data/fill'
import { useStore, type Speaker, type Speed } from '../state/store'
import volume from '../assets/icons/volume.svg'

/** 09b · Voice settings (bottom sheet). Changes apply only when "Save" is pressed. */
export function VoiceSettings({ onClose, onPreview }: { onClose: () => void; onPreview: () => void }) {
  const c = content.voice
  const { state, dispatch } = useStore()
  const [speaker, setSpeaker] = useState<Speaker>(state.voice.speaker)
  const [dialect, setDialect] = useState<string>(state.dialect ?? 'Munster')
  const [speed, setSpeed] = useState<Speed>(state.voice.speed)

  function save() {
    dispatch({ type: 'setVoice', speaker, speed })
    dispatch({ type: 'setDialect', dialect })
    onClose()
  }

  return (
    <BottomSheet label={c.title} onClose={onClose} tall>
      <h2 className="t-h2 sheet__title">{c.title}</h2>
      <p className="t-small sheet__lead">{c.body}</p>
      <div className="setting">
        <p className="t-body-lg-strong">{c.speaker}</p>
        <SegmentedControl label={c.speaker} options={c.speakers.map((s) => ({ value: s.value as Speaker, label: s.label }))} value={speaker} onChange={setSpeaker} />
      </div>
      <div className="setting">
        <p className="t-body-lg-strong">{c.dialect}</p>
        <SegmentedControl label={c.dialect} options={c.dialects.map((d) => ({ value: d, label: d }))} value={dialect} onChange={setDialect} />
        <p className="t-small setting__note">{fill(c.dialectNote, { dialect })}</p>
      </div>
      <div className="setting">
        <p className="t-body-lg-strong">{c.speed}</p>
        <SegmentedControl label={c.speed} options={c.speeds.map((s) => ({ value: s as Speed, label: s }))} value={speed} onChange={setSpeed} />
      </div>
      <div className="setting setting--footer">
        <p className="t-small setting__note">{fill(c.provider, { speaker })}</p>
        <Button variant="outline" onClick={onPreview}>
          <Icon src={volume} />
          {c.preview}
        </Button>
        <Button onClick={save}>{c.save}</Button>
      </div>
    </BottomSheet>
  )
}
