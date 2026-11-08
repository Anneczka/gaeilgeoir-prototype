import { formatXp } from '../logic/leaderboard'
import badge1 from '../assets/img/badge-1.svg'
import badge2 from '../assets/img/badge-2.svg'
import badge3 from '../assets/img/badge-3.svg'

export type PodiumEntry = { place: number; name: string; initials: string; xp: number }

const badges: Record<number, string> = { 1: badge1, 2: badge2, 3: badge3 }

/** UI/Podium: top three, first place in the middle and tallest. Each place has a medal badge. */
export function Podium({ entries }: { entries: readonly PodiumEntry[] }) {
  const order = [2, 1, 3].map((p) => entries.find((e) => e.place === p)!)
  return (
    <div className="podium">
      {order.map((e) => (
        <div key={e.place} className={`podium__place podium__place--${e.place}`}>
          <div className="podium__who">
            <span className="podium__avatar t-h3" aria-hidden="true">
              {e.initials}
            </span>
            <img className="podium__badge" src={badges[e.place]} width={40} height={40} alt={`Place ${e.place}`} />
          </div>
          <div className="podium__base">
            <span className="t-body podium__name">{e.name}</span>
            <span className="podium__xp">{formatXp(e.xp)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
