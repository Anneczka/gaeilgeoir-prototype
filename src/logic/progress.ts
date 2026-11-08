import type { State } from '../state/store'

/**
 * What the learner has done so far. A new participant starts at zero everywhere
 * (each person logs in as a new user); every finished conversation step or word lesson adds one lesson.
 * Home, Courses, Course detail and Profile all read from here so they always agree with the Leaderboard.
 */
export function progressOf(state: State) {
  const lessonsDone = state.convStep + state.wordStep
  return {
    lessonsDone,
    streakDays: lessonsDone > 0 ? 1 : 0,
    savedWords: state.savedWords.length,
  }
}
