/** UI/Feedback card: amber "almost there" correction. */
export function FeedbackCard({ overline, title, body }: { overline: string; title: string; body: string }) {
  return (
    <div className="feedback-card" role="status">
      <span className="t-overline feedback-card__overline">{overline}</span>
      <p className="t-body-strong">{title}</p>
      <p className="t-small feedback-card__body">{body}</p>
    </div>
  )
}
