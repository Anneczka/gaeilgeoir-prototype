import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { TitleHeader } from '../components/TitleHeader'
import { BottomNav } from '../components/BottomNav'
import { content } from '../data/content'

/** Stand-in for screens that are not built yet (so every tap still goes somewhere and can go back). */
export function Placeholder({ title, tab = false }: { title?: string; tab?: boolean }) {
  const navigate = useNavigate()
  const c = content.placeholder
  return (
    <main className="screen screen--surface screen--top58">
      <StatusBar />
      {!tab && <TitleHeader icon="back" onClick={() => navigate(-1)} />}
      <div className="placeholder">
        <h1 className="t-h1">{title ?? c.title}</h1>
        <p className="t-body placeholder__body">{c.body}</p>
      </div>
      {tab && <BottomNav />}
    </main>
  )
}
