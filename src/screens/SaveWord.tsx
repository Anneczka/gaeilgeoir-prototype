import { BottomSheet } from '../components/Modal'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import volume from '../assets/icons/volume.svg'
import bookmark from '../assets/icons/bookmark.svg'

/** Sheet opened by tapping a green word: meaning in English + bookmark to save it to My words. */
export function SaveWord({ word, meaning, saved, onToggleSave, onPlay, onClose }: { word: string; meaning: string; saved: boolean; onToggleSave: () => void; onPlay: () => void; onClose: () => void }) {
  const c = content.word
  return (
    <BottomSheet label={word} onClose={onClose}>
      <div className="word-sheet__row">
        <h2 className="t-h1">{word}</h2>
        <div className="word-sheet__tools">
          <button type="button" className="hit-44" aria-label={c.play} onClick={onPlay}>
            <Icon src={volume} color="var(--icon-default)" />
          </button>
          <button type="button" className="hit-44" aria-label={saved ? c.unsave : c.save} aria-pressed={saved} onClick={onToggleSave}>
            {saved ? (
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 3H18V21L12 17L6 21V3Z" fill="var(--icon-brand)" stroke="var(--icon-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <Icon src={bookmark} color="var(--icon-default)" />
            )}
          </button>
        </div>
      </div>
      <div className="word-sheet__meaning">
        <p className="t-small word-sheet__label">{c.translate}</p>
        <p className="t-h3">{meaning}</p>
      </div>
      <p className="t-small sheet__lead">{c.help}</p>
    </BottomSheet>
  )
}
