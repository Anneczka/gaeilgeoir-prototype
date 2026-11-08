import { formatXp } from '../logic/leaderboard'

/** UI/Leaderboard row (You = true highlights the learner's own row). */
export function LeaderboardRow({ rank, initials, name, xp, you = false }: { rank: number; initials: string; name: string; xp: number; you?: boolean }) {
  return (
    <div className={`lb-row${you ? ' lb-row--you' : ''}`} aria-current={you ? 'true' : undefined}>
      <span className="t-body-strong lb-row__rank">{rank}</span>
      <span className="lb-row__avatar t-caption" aria-hidden="true">
        {initials}
      </span>
      <span className="t-body-strong lb-row__name">{name}</span>
      <span className="t-body-strong lb-row__xp">{formatXp(xp)}</span>
    </div>
  )
}
