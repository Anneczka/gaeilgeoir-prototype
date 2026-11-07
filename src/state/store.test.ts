import { describe, expect, it } from 'vitest'
import { initialState, reducer } from './store'

describe('prototype store', () => {
  it('starts logged out with nothing chosen', () => {
    expect(initialState.loggedIn).toBe(false)
    expect(initialState.level).toBeNull()
    expect(initialState.dialect).toBeNull()
  })

  it('login marks the user as logged in', () => {
    expect(reducer(initialState, { type: 'login' }).loggedIn).toBe(true)
  })

  it('stores level and dialect', () => {
    let s = reducer(initialState, { type: 'setLevel', level: 'A2' })
    s = reducer(s, { type: 'setDialect', dialect: 'Munster' })
    expect(s.level).toBe('A2')
    expect(s.dialect).toBe('Munster')
  })

  it('completeConvStep moves to the next conversation step', () => {
    const s = reducer(initialState, { type: 'completeConvStep' })
    expect(s.convStep).toBe(initialState.convStep + 1)
  })

  it('completeWordStep moves to the next word step', () => {
    const s = reducer(initialState, { type: 'completeWordStep' })
    expect(s.wordStep).toBe(initialState.wordStep + 1)
  })

  it('saveWord does not add the same word twice', () => {
    let s = reducer(initialState, { type: 'saveWord', word: 'dia duit' })
    s = reducer(s, { type: 'saveWord', word: 'dia duit' })
    expect(s.savedWords.filter((w) => w === 'dia duit')).toHaveLength(1)
  })

  it('setVoice stores speaker and speed', () => {
    const s = reducer(initialState, { type: 'setVoice', speaker: 'Sibéal', speed: '1.5x' })
    expect(s.voice).toEqual({ speaker: 'Sibéal', speed: '1.5x' })
  })

  it('reset clears everything, even in the middle of a conversation', () => {
    let s = reducer(initialState, { type: 'login' })
    s = reducer(s, { type: 'completeConvStep' })
    s = reducer(s, { type: 'saveWord', word: 'bainne' })
    expect(reducer(s, { type: 'reset' })).toEqual(initialState)
  })
})
