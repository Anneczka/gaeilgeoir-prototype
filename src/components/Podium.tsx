import { formatXp } from '../logic/leaderboard'

export type PodiumEntry = { place: number; name: string; initials: string; xp: number }

/** UI/Podium: top three, first place in the middle and tallest. */
export function Podium({ entries }: { entries: readonly PodiumEntry[] }) {
  const order = [2, 1, 3].map((p) => entries.find((e) => e.place === p)!)
  return (
    <div className="podium">
      {order.map((e) => (
        <div key={e.place} className={`podium__place podium__place--${e.place}`}>
          <span className={`podium__medal podium__medal--${e.place} t-caption`} aria-label={`Place ${e.place}`}>
            {e.place}
          </span>
          <span className="podium__avatar t-h3" aria-hidden="true">
            {e.initials}
          </span>
          <span className="t-body-strong podium__name">{e.name}</span>
          <span className="t-small podium__xp">{formatXp(e.xp)}</span>
          <span className="podium__base t-h2" aria-hidden="true">
            {e.place}
          </span>
        </div>
      ))}
    </div>
  )
}
