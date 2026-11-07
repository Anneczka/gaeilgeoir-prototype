import type { CSSProperties } from 'react'

/** Line icon from Figma, recoloured with CSS (so active/inactive states need only a colour). */
export function Icon({ src, size = 24, color = 'var(--icon-default)' }: { src: string; size?: number; color?: string }) {
  const style: CSSProperties = {
    display: 'inline-block',
    flex: 'none',
    width: size,
    height: size,
    backgroundColor: color,
    WebkitMask: `url("${src}") center / contain no-repeat`,
    mask: `url("${src}") center / contain no-repeat`,
  }
  return <span aria-hidden="true" style={style} />
}
