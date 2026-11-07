import { useEffect, useRef, useState } from 'react'
import cell from '../assets/icons/status-cell.svg'
import wifi from '../assets/icons/status-wifi.svg'
import battery from '../assets/icons/status-battery.svg'
import cellLight from '../assets/icons/status-cell-light.svg'
import wifiLight from '../assets/icons/status-wifi-light.svg'
import batteryLight from '../assets/icons/status-battery-light.svg'

type Tone = 'dark' | 'light'

/** Brightness (0 dark … 1 light) of the first non-transparent background found at a point on screen. */
function backgroundBrightnessAt(x: number, y: number): number | null {
  let el: Element | null = document.elementFromPoint(x, y)
  while (el) {
    const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/)
    if (m) {
      const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number)
      if (a > 0.5) return (0.299 * r + 0.587 * g + 0.114 * b) / 255
    }
    el = el.parentElement
  }
  return null
}

/**
 * Fake iPhone status bar with a transparent background.
 * tone="auto" (default): looks at what is behind the bar and switches between dark and white icons,
 * also while the page scrolls underneath. Pass tone="dark" or "light" to force one.
 */
export function StatusBar({ tone = 'auto' }: { tone?: Tone | 'auto' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [auto, setAuto] = useState<Tone>('dark')

  useEffect(() => {
    if (tone !== 'auto') return
    let frame = 0
    const measure = () => {
      frame = 0
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      const y = r.top + r.height * 0.5
      const points = [0.25, 0.5, 0.85].map((f) => backgroundBrightnessAt(r.left + r.width * f, y))
      const known = points.filter((p): p is number => p !== null)
      if (!known.length) return
      const dark = known.filter((b) => b < 0.5).length
      setAuto(dark > known.length / 2 ? 'light' : 'dark')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    schedule()
    document.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
    }
  }, [tone])

  const light = (tone === 'auto' ? auto : tone) === 'light'
  return (
    <div ref={ref} className={`status-bar${light ? ' status-bar--light' : ''}`} aria-hidden="true">
      <div className="status-bar__time">9:41</div>
      <div className="status-bar__levels">
        <img src={light ? cellLight : cell} width={19.2} height={12.226} alt="" />
        <img src={light ? wifiLight : wifi} width={17.142} height={12.328} alt="" />
        <img src={light ? batteryLight : battery} width={27.328} height={13} alt="" />
      </div>
    </div>
  )
}
