import { StatusBar } from '../components/StatusBar'
import { Button } from '../components/Button'
import { content } from '../data/content'
import glow from '../assets/img/welcome-glow.svg'
import ringOuter from '../assets/img/welcome-ring-outer.svg'
import ringInner from '../assets/img/welcome-ring-inner.svg'
import avatar from '../assets/img/avatar-tutor.png'

/** 00 · Welcome */
export function Welcome() {
  const c = content.welcome
  return (
    <main className="screen welcome">
      <div className="welcome__glow" aria-hidden="true">
        <img src={glow} alt="" />
      </div>
      <StatusBar tone="light" />
      <div className="welcome__content">
        <div className="welcome__logo" aria-hidden="true">
          <img className="welcome__ring" src={ringOuter} width={160} height={160} alt="" />
          <img className="welcome__ring" src={ringInner} width={140} height={140} alt="" />
          <img className="welcome__avatar" src={avatar} alt="" />
        </div>
        <h1 className="t-display">
          {c.title[0]}
          <br />
          {c.title[1]}
        </h1>
        <p className="t-body">{c.body}</p>
      </div>
      <div className="screen__actions welcome__actions">
        <Button variant="secondary" to="/login">
          {c.getStarted}
        </Button>
        <Button variant="ghost-on-dark" to="/login">
          {c.haveAccount}
        </Button>
      </div>
    </main>
  )
}
