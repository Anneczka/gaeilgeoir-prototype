type State = 'default' | 'correct' | 'wrong'

/** UI/Quiz option (Default / Correct / Wrong). The state is also written for screen readers, never colour alone. */
export function QuizOption({ letter, text, state = 'default', mark, disabled, onClick }: { letter: string; text: string; state?: State; mark?: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className={`quiz-opt quiz-opt--${state}`} onClick={onClick} disabled={disabled}>
      <span className="quiz-opt__letter t-body-strong" aria-hidden="true">
        {letter}
      </span>
      <span className="t-body quiz-opt__text">{text}</span>
      {state !== 'default' && mark && <span className="sr-only">{mark}</span>}
    </button>
  )
}
