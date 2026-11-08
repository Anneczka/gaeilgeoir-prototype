import { Link } from 'react-router-dom'
import { content } from '../data/content'
import { fake } from '../data/fake'
import { isOnBoard } from '../logic/leaderboard'
import { useStore } from '../state/store'
import chevron from '../assets/icons/chevron-right.svg'

/** Leaderboard entry card ("You're 12th this week"). Links to the leaderboard. */
export function RankCard() {
  const c = content.home
  const { state } = useStore()
  const joined = isOnBoard(state) // a brand-new participant is not on the board yet
  return (
    <Link to="/leaderboard" className="rank-card">
      <span className="rank-card__num t-body-strong">{joined ? fake.leaderboard.rank : '–'}</span>
      <span className="rank-card__text">
        <span className="t-body-strong">{joined ? c.leaderboardTitle : c.leaderboardJoinTitle}</span>
        <span className="t-small">{joined ? `${fake.leaderboard.xpToNextRank} XP to reach ${fake.leaderboard.rank - 1}th · See leaderboard` : c.leaderboardJoinBody}</span>
      </span>
      <img src={chevron} width={24} height={24} alt="" />
    </Link>
  )
}
