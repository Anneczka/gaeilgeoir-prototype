import { StatusBar } from '../components/StatusBar'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/IconButton'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { fill } from '../data/fill'
import check from '../assets/icons/check.svg'
import volume from '../assets/icons/volume.svg'

/** 07c · Step complete */
export function StepComplete() {
  const c = content.complete
  const vars = { name: fake.user.name }
  return (
    <main className="screen screen--surface">
      <StatusBar />
      <div className="screen__body complete">
        <span className="complete__badge">
          <Icon src={check} size={40} color="var(--icon-brand)" />
        </span>
        <h1 className="t-h1 complete__title">{c.title}</h1>
        <p className="t-body complete__lead">{c.body}</p>
        <div className="complete__stats">
          {c.stats.map((s) => (
            <div key={s.label} className="complete__stat">
              <span className="t-h2">{s.value}</span>
              <span className="t-small complete__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <h2 className="t-h3 complete__review">{c.reviewTitle}</h2>
        <ul className="phrase-list">
          {c.phrases.map((p) => (
            <li key={p.irish} className="phrase-list__row">
              <div className="phrase-list__text">
                <span className="t-body-strong">{fill(p.irish, vars)}</span>
                <span className="t-small phrase-list__english">{fill(p.english, vars)}</span>
              </div>
              <IconButton label={`Play: ${fill(p.irish, vars)}`} onClick={() => {}}>
                <Icon src={volume} color="var(--icon-brand)" />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
      <div className="screen__actions">
        <Button to="/conversation">{c.next}</Button>
        <Button variant="ghost" to="/courses/1">
          {c.back}
        </Button>
      </div>
    </main>
  )
}
