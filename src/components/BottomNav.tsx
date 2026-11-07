import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'
import { content } from '../data/content'
import home from '../assets/icons/nav-home.svg'
import courses from '../assets/icons/nav-courses.svg'
import practice from '../assets/icons/nav-practice.svg'
import profile from '../assets/icons/nav-profile.svg'

const items = [
  { to: '/home', label: content.nav.home, icon: home },
  { to: '/courses', label: content.nav.courses, icon: courses },
  { to: '/practice', label: content.nav.practice, icon: practice },
  { to: '/profile', label: content.nav.profile, icon: profile },
]

/** UI/Bottom nav: Home, Courses, Practice, Profile. Active tab = light green pill. */
export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}>
          {({ isActive }) => (
            <>
              <span className="bottom-nav__icon">
                <Icon src={it.icon} size={22} color={isActive ? 'var(--text-success)' : 'var(--icon-muted)'} />
              </span>
              <span className={`t-caption bottom-nav__label${isActive ? ' bottom-nav__label--active' : ''}`}>{it.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
