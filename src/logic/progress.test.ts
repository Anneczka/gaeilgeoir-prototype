import { describe, expect, it } from 'vitest'
import { initialState } from '../state/store'
import { progressOf } from './progress'

describe('progress logic', () => {
  it('a new participant starts at zero', () => {
    expect(progressOf(initialState)).toEqual({ lessonsDone: 0, streakDays: 0, savedWords: 0 })
  })
  it('each finished step or word lesson counts as one lesson and starts the streak', () => {
    const p = progressOf({ ...initialState, convStep: 1, wordStep: 1 })
    expect(p.lessonsDone).toBe(2)
    expect(p.streakDays).toBe(1)
  })
  it('counts only the words the participant saved', () => {
    expect(progressOf({ ...initialState, savedWords: ['bainne', 'tae'] }).savedWords).toBe(2)
  })
})
