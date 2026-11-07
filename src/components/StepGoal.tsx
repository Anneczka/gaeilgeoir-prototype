/** UI/Step goal: "MODULE 2 · STEP 1 OF 3" + goal + 3 progress dots. */
export function StepGoal({ overline, title, done }: { overline: string; title: string; done: number }) {
  return (
    <div className="step-goal">
      <div className="step-goal__text">
        <span className="t-overline step-goal__overline">{overline}</span>
        <span className="t-h3">{title}</span>
      </div>
      <div className="step-goal__dots" role="img" aria-label={`Step ${done} of 3`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`step-goal__dot${n <= done ? ' step-goal__dot--done' : ''}`} />
        ))}
      </div>
    </div>
  )
}
