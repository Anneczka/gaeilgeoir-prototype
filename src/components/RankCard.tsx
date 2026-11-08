import { Link } from 'react-router-dom'
import { content } from '../data/content'
import { fake } from '../data/fake'
import chevron from '../assets/icons/chevron-right.svg'

/** Leaderboard entry card ("You're 12th this week"). Links to the leaderboard. */
export function RankCard() {
  const c = content.home
  return (
    <Link to="/leaderboard" className="rank-card">
      <span className="rank-card__num t-body-strong">{fake.leaderboard.rank}</span>
      <span className="rank-card__text">
        <span className="t-body-strong">{c.leaderboardTitle}</span>
        <span className="t-small">{`${fake.leaderboard.xpToNextRank} XP to reach ${fake.leaderboard.rank - 1}th · See leaderboard`}</span>
      </span>
      <img src={chevron} width={24} height={24} alt="" />
    </Link>
  )
}
