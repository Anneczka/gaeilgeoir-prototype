import { describe, expect, it } from 'vitest'
import { isCorrect, normalize } from './conversation'

describe('answer checking (typed or spoken text)', () => {
  it('ignores capital letters, punctuation and extra spaces', () => {
    expect(isCorrect('dia   duit.', 'Dia duit')).toBe(true)
  })
  it('ignores fadas so typing without accents still counts', () => {
    expect(isCorrect('Cen chaoi a bhfuil tu?', 'Cén chaoi a bhfuil tú?')).toBe(true)
  })
  it('rejects a different phrase', () => {
    expect(isCorrect('Dia a dúirt', 'Dia duit')).toBe(false)
  })
  it('normalize turns curly quotes and punctuation into spaces', () => {
    expect(normalize('“Dia duit”!')).toBe('dia duit')
  })
  it('empty text is never correct', () => {
    expect(isCorrect('   ', 'Dia duit')).toBe(false)
  })
})
