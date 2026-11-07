/** Replaces {name}-style placeholders in copy: fill('Hi {name}', { name: 'Aoife' }). */
export function fill(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`)
}
