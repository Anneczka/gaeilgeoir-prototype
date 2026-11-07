/** UI/Option card (Default / Selected): level or dialect choice. */
export function OptionCard({ code, title, text, selected, onSelect }: { code: string; title: string; text: string; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={selected} className={`option-card${selected ? ' option-card--selected' : ''}`} onClick={onSelect}>
      <span className="option-card__badge t-h3">{code}</span>
      <span className="option-card__text">
        <span className="t-h3">{title}</span>
        <span className="t-small option-card__desc">{text}</span>
      </span>
    </button>
  )
}
