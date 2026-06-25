import { NavLink } from 'react-router-dom'

const mobileItems = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/jobs', label: 'Jobs', icon: 'jobs' },
  { path: '/add-job', label: 'Add', icon: 'add' },
  { path: '/kanban', label: 'Board', icon: 'kanban' },
  { path: '/analytics', label: 'Stats', icon: 'analytics' },
]

const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  jobs: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7h-9"/>
      <path d="M14 17H5"/>
      <circle cx="17" cy="17" r="3"/>
      <circle cx="7" cy="7" r="3"/>
    </svg>
  ),
  add: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  kanban: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="18" rx="1"/>
      <rect x="15" y="3" width="6" height="12" rx="1"/>
    </svg>
  ),
  analytics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
}

function MobileNav() {
  return (
    <nav className="mobile-nav show-mobile">
      {mobileItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="mobile-nav-icon">{icons[item.icon]}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNav
