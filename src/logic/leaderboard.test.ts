import { describe, expect, it } from 'vitest'
import { initialState } from '../state/store'
import { formatXp, isOnBoard, scaleXp } from './leaderboard'

describe('leaderboard logic', () => {
  it('a brand-new participant is not on the board yet', () => {
    expect(isOnBoard(initialState)).toBe(false)
  })
  it('finishing a conversation step puts the participant on the board', () => {
    expect(isOnBoard({ ...initialState, convStep: 1 })).toBe(true)
  })
  it('finishing a word lesson puts the participant on the board', () => {
    expect(isOnBoard({ ...initialState, wordStep: 1 })).toBe(true)
  })
  it('formats XP with a thousands separator', () => {
    expect(formatXp(1240)).toBe('1,240 XP')
    expect(formatXp(240)).toBe('240 XP')
  })
  it('all-time XP is the weekly XP scaled up', () => {
    expect(scaleXp(240, 'all')).toBe(1440)
    expect(scaleXp(240, 'week')).toBe(240)
  })
})
