import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { BottomNav } from '../components/BottomNav'
import { BottomSheet } from '../components/Modal'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { IconButton } from '../components/IconButton'
import { LeaderboardRow } from '../components/LeaderboardRow'
import { Podium } from '../components/Podium'
import { ProgressBar } from '../components/ProgressBar'
import { SegmentedTabs } from '../components/SegmentedTabs'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { fill } from '../data/fill'
import { formatXp, isOnBoard, scaleXp, type Period } from '../logic/leaderboard'
import { useStore } from '../state/store'
import back from '../assets/icons/back.svg'
import help from '../assets/icons/help.svg'
import castle from '../assets/img/castle.svg'
import mic from '../assets/icons/mic.svg'
import words from '../assets/icons/words.svg'
import quiz from '../assets/icons/tile-quizzes.svg'
import streak from '../assets/icons/stat-streak.svg'
import flame from '../assets/icons/stat-streak.svg'

const xpIcons: Record<string, string> = { conversation: mic, words, quiz, streak }

/** 15c · Leaderboard, 15d · Leaderboard (new user), 15e · How XP works (sheet). */
export function Leaderboard() {
  const c = content.leaderboard
  const navigate = useNavigate()
  const { state } = useStore()
  const [period, setPeriod] = useState<Period>('week')
  const [xpSheet, setXpSheet] = useState(false)
  const lb = fake.leaderboard
  const joined = isOnBoard(state) // new participants see the "join" state until they finish a lesson
  const shown = joined && state.showOnLeaderboard
  const xp = (n: number) => scaleXp(n, period)

  return (
    <main className="screen">
      <StatusBar />
      <div className="top-bar">
        <IconButton label="Back" onClick={() => navigate(-1)}>
          <Icon src={back} />
        </IconButton>
        <h1 className="t-h3 top-bar__title">{c.title}</h1>
        <IconButton label={c.help} onClick={() => setXpSheet(true)}>
          <Icon src={help} />
        </IconButton>
      </div>

      <div className="screen__body lb">
        <div className="lb__art" aria-hidden="true">
          <img src={castle} width={335} height={96} alt="" />
        </div>
        <SegmentedTabs label="Period" options={c.tabs as unknown as { key: Period; label: string }[]} value={period} onChange={setPeriod} />

        {!joined && (
          <div className="empty-state">
            <span className="empty-state__icon">
              <Icon src={flame} size={24} color="var(--icon-brand)" />
            </span>
            <h2 className="t-h3 empty-state__title">{c.empty.title}</h2>
            <p className="t-body empty-state__body">{c.empty.body}</p>
            <div className="empty-state__cta">
              <Button variant="outline" to="/conversation">
                {c.empty.cta}
              </Button>
            </div>
          </div>
        )}

        {joined && !state.showOnLeaderboard && (
          <Link to="/settings" className="lb__hidden t-body">
            {c.hidden}
          </Link>
        )}

        {shown && (
          <section className="your-position" aria-label="Your position">
            <div className="your-position__row">
              <span className="your-position__rank t-h3">{lb.rank}</span>
              <div className="your-position__text">
                <p className="t-h3">{fill(period === 'week' ? c.youWeek : c.youAll, { rank: String(lb.rank) })}</p>
                <p className="t-small your-position__line">{fill(c.youLine, { xp: formatXp(xp(lb.xp)), gap: String(xp(lb.xpToNextRank)), next: String(lb.rank - 1) })}</p>
              </div>
            </div>
            <ProgressBar value={lb.xp / (lb.xp + lb.xpToNextRank)} label="Progress to the next rank" />
            {period === 'week' && <p className="t-caption your-position__resets">{c.resets}</p>}
          </section>
        )}

        <div className={joined ? undefined : 'lb__dim'} aria-hidden={joined ? undefined : true}>
          <Podium entries={lb.podium.map((p) => ({ ...p, xp: xp(p.xp) }))} />
        </div>

        {joined && (
          <>
            <div className="lb__card">
              {lb.top.map((r) => (
                <LeaderboardRow key={r.rank} rank={r.rank} initials={r.initials} name={r.name} xp={xp(r.xp)} />
              ))}
            </div>
            <h2 className="t-overline lb__near">{c.nearYou}</h2>
            <div className="lb__card">
              {lb.nearAbove.map((r) => (
                <LeaderboardRow key={r.rank} rank={r.rank} initials={r.initials} name={r.name} xp={xp(r.xp)} />
              ))}
              {shown && <LeaderboardRow rank={lb.rank} initials={fake.user.initials[0]} name={fill(c.youRow, { nickname: fake.user.nickname })} xp={xp(lb.xp)} you />}
              {lb.nearBelow.map((r) => (
                <LeaderboardRow key={r.rank} rank={r.rank} initials={r.initials} name={r.name} xp={xp(r.xp)} />
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav activePath="/profile" />

      {xpSheet && (
        <BottomSheet label={c.xp.title} onClose={() => setXpSheet(false)} dark className="sheet--xp">
          <h2 className="t-h2 sheet__title">{c.xp.title}</h2>
          <p className="t-body sheet__lead">{c.xp.body}</p>
          <ul className="xp-list">
            {c.xp.rows.map((r) => (
              <li key={r.key} className="xp-list__row">
                <span className="xp-list__icon">
                  <Icon src={xpIcons[r.key]} size={24} color="var(--icon-brand)" />
                </span>
                <span className="t-body-strong xp-list__label">{r.label}</span>
                <span className="t-body-strong xp-list__value">{r.value}</span>
              </li>
            ))}
          </ul>
          <Button onClick={() => setXpSheet(false)}>{c.xp.cta}</Button>
        </BottomSheet>
      )}
    </main>
  )
}
