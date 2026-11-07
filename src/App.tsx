import { useEffect, useState } from 'react'
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useStore } from './state/store'
import { Welcome } from './screens/Welcome'
import { Login } from './screens/Login'
import { OnboardingLevel, OnboardingDialect } from './screens/Onboarding'
import { Home } from './screens/Home'
import { Placeholder } from './screens/Placeholder'
import { Conversation } from './screens/Conversation'
import { StepComplete } from './screens/StepComplete'

/** Sends people who are not logged in back to Welcome (e.g. after a browser refresh). */
function RequireLogin() {
  const { state } = useStore()
  return state.loggedIn ? <Outlet /> : <Navigate to="/" replace />
}

/** Shrinks the phone if the window is shorter than 812px so the whole app stays visible. */
function useFitScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => setScale(window.innerWidth <= 430 ? 1 : Math.min(1, (window.innerHeight - 32) / 812))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

export default function App() {
  const scale = useFitScale()
  return (
    <div className="stage">
      <div style={scale < 1 ? { width: 375 * scale, height: 812 * scale } : undefined}>
        <div className="phone" style={scale < 1 ? { transform: `scale(${scale})` } : undefined}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route element={<RequireLogin />}>
                <Route path="/onboarding/level" element={<OnboardingLevel />} />
                <Route path="/onboarding/dialect" element={<OnboardingDialect />} />
                <Route path="/home" element={<Home />} />
                <Route path="/conversation" element={<Conversation />} />
                <Route path="/conversation/complete" element={<StepComplete />} />
                <Route path="/courses" element={<Placeholder title="Courses" tab />} />
                <Route path="/practice" element={<Placeholder title="Practice" tab />} />
                <Route path="/profile" element={<Placeholder title="Profile" tab />} />
                <Route path="*" element={<Placeholder />} />
              </Route>
            </Routes>
          </HashRouter>
        </div>
      </div>
    </div>
  )
}
