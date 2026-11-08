/** A word the learner can tap to see its meaning and save it. */
export type Segment = string | { readonly w: string; readonly en: string }
export type Lines = readonly (readonly Segment[])[]

/** One scripted step of a lesson (conversation or words). */
export type Step = {
  readonly overline: string
  readonly goal: string
  readonly done: number
  readonly tutor: { readonly lines: Lines; readonly english: string }
  readonly expected: { readonly irish: string; readonly english: string }
  /** What the simulated microphone "hears", attempt by attempt */
  readonly spoken: readonly string[]
  /** Specific correction for the scripted mistake (null = generic correction) */
  readonly fix: { readonly lines: readonly string[]; readonly english: string } | null
}
