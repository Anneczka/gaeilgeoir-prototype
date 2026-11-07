import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'

export type Speaker = 'Pádraig' | 'Sibéal'
export type Speed = '0.85x' | '1x' | '1.5x'

export type State = {
  loggedIn: boolean
  level: string | null
  dialect: string | null
  savedWords: string[]
  convStep: number
  wordStep: number
  voice: { speaker: Speaker; speed: Speed }
}

export type Action =
  | { type: 'login' }
  | { type: 'setLevel'; level: string }
  | { type: 'setDialect'; dialect: string }
  | { type: 'completeConvStep' }
  | { type: 'completeWordStep' }
  | { type: 'setVoice'; speaker: Speaker; speed: Speed }
  | { type: 'saveWord'; word: string }
  | { type: 'reset' }

export const initialState: State = {
  loggedIn: false,
  level: null,
  dialect: null,
  savedWords: [],
  convStep: 0,
  wordStep: 0,
  voice: { speaker: 'Pádraig', speed: '1x' },
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login':
      return { ...state, loggedIn: true }
    case 'setLevel':
      return { ...state, level: action.level }
    case 'setDialect':
      return { ...state, dialect: action.dialect }
    case 'completeConvStep':
      return { ...state, convStep: state.convStep + 1 }
    case 'completeWordStep':
      return { ...state, wordStep: state.wordStep + 1 }
    case 'setVoice':
      return { ...state, voice: { speaker: action.speaker, speed: action.speed } }
    case 'saveWord':
      return state.savedWords.includes(action.word)
        ? state
        : { ...state, savedWords: [...state.savedWords, action.word] }
    case 'reset':
      return initialState
  }
}

const StoreContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
