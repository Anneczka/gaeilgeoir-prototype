import { useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { ProgressBar } from '../components/ProgressBar'
import { QuizOption } from '../components/QuizOption'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { content } from '../data/content'
import { fill } from '../data/fill'
import check from '../assets/icons/check.svg'

const c = content.quizzes
const all = c.questions.map((_, i) => i)
const letters = ['A', 'B', 'C', 'D']

/** 12 · Quizzes and 12b · Quiz results. One topic ("Eating out"), 10 questions, answers checked on tap. */
export function Quizzes() {
  const [order, setOrder] = useState<number[]>(all) // which questions are in this round
  const [pos, setPos] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [missed, setMissed] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const total = order.length
  const q = c.questions[order[pos]]
  const answered = picked !== null
  const right = picked === q.answer

  function pick(i: number) {
    if (answered) return
    setPicked(i)
    if (i !== q.answer) setMissed((m) => [...m, order[pos]])
  }
  function next() {
    if (pos < total - 1) {
      setPos(pos + 1)
      setPicked(null)
    } else {
      setDone(true)
    }
  }
  function restart(questions: number[]) {
    setOrder(questions)
    setPos(0)
    setPicked(null)
    setMissed([])
    setDone(false)
  }

  if (done) {
    const r = c.results
    const score = total - missed.length
    return (
      <main className="screen screen--surface screen--top58">
        <StatusBar />
        <TitleHeader to="/practice" title={c.title} />
        <div className="screen__body quiz-results">
          <p className="t-overline quiz-results__topic">{c.topic}</p>
          <p className="quiz-results__score">
            <span className="t-display">{score}</span> <span className="t-h2 quiz-results__total">{fill(r.score, { total: String(total) })}</span>
          </p>
          <p className="t-body quiz-results__msg">{score / total >= 0.8 ? r.great : r.keepGoing}</p>
          {missed.length > 0 ? (
            <>
              <h2 className="t-h3 quiz-results__review">{fill(r.toReview, { n: String(missed.length) })}</h2>
              <ul className="quiz-review">
                {missed.map((qi) => (
                  <li key={qi} className="quiz-review__item">
                    <p className="t-small quiz-review__prompt">“{c.questions[qi].prompt}”</p>
                    <p className="quiz-review__answer t-body-strong">
                      <Icon src={check} size={24} color="var(--icon-brand)" />
                      <span>{c.questions[qi].options[c.questions[qi].answer]}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="t-body-strong quiz-results__review">{r.perfect}</p>
          )}
        </div>
        <div className="quiz__actions">
          <Button onClick={() => restart(all)}>{r.another}</Button>
          {missed.length > 0 && (
            <Button variant="outline" onClick={() => restart(missed)}>
              {r.review}
            </Button>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="screen screen--surface screen--top58">
      <StatusBar />
      <TitleHeader to="/practice" title={c.title} />
      <div className="screen__body quiz">
        <div className="quiz__topic">
          <span className="t-body-strong quiz__topic-name">{c.topic}</span>
          <span className="t-caption quiz__counter">{fill(c.counter, { n: String(pos + 1), total: String(total) })}</span>
        </div>
        <ProgressBar value={(pos + 1) / total} label="Quiz progress" />
        <div className="quiz__question">
          <p className="t-small quiz__ask">{c.ask}</p>
          <h1 className="t-h2">“{q.prompt}”</h1>
        </div>
        {q.options.map((o, i) => (
          <QuizOption key={o} letter={letters[i]} text={o} state={!answered ? 'default' : i === q.answer ? 'correct' : i === picked ? 'wrong' : 'default'} mark={i === q.answer ? c.mark.correct : c.mark.wrong} disabled={answered} onClick={() => pick(i)} />
        ))}
        <div aria-live="polite">
          {answered && (
            <div className={`quiz-feedback quiz-feedback--${right ? 'right' : 'wrong'}`}>
              <p className="t-overline quiz-feedback__title">{right ? c.right : c.wrong}</p>
              {!right && <p className="t-body-strong">{fill(c.answerIs, { answer: q.options[q.answer] })}</p>}
              <p className="t-small">{q.why}</p>
            </div>
          )}
        </div>
      </div>
      <div className="quiz__actions">{answered && <Button onClick={next}>{pos < total - 1 ? c.next : c.seeResults}</Button>}</div>
    </main>
  )
}
