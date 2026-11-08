import { ConversationView } from './Conversation'
import { content } from '../data/content'
import { useStore } from '../state/store'

/** 14 · Word lesson. Intentionally the same chat layout as the conversation (the 1000 Word Way is also a conversation today). */
export function WordLesson() {
  const { state } = useStore()
  const lesson = 3 + state.wordStep
  return <ConversationView steps={content.wordLesson.steps} vars={{ lesson: String(lesson) }} exitTo="/practice/words" completeTo="/practice/words/complete" onComplete="words" />
}
