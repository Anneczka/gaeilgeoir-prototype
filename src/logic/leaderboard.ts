import type { State } from '../state/store'

export type Period = 'week' | 'all'

/** A participant gets on the (fake) leaderboard after finishing one conversation step or word lesson. */
export function isOnBoard(state: State): boolean {
  return state.convStep + state.wordStep > 0
}

export function formatXp(xp: number): string {
  return `${xp.toLocaleString('en-US')} XP`
}

/** "All time" numbers are just the weekly numbers scaled up (the data is fake). */
export function scaleXp(xp: number, period: Period): number {
  return period === 'all' ? xp * 6 : xp
}
