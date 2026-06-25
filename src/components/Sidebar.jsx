import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jobStorage } from '../utils/storage.js'

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/jobs', label: 'Jobs', icon: 'jobs' },
  { path: '/add-job', label: 'Add Job', icon: 'add' },
  { path: '/kanban', label: 'Kanban', icon: 'kanban' },
  { path: '/analytics', label: 'Analytics', icon: 'analytics' },
  { path: '/resume-tracker', label: 'Resume', icon: 'resume' },
  { path: '/interview-notes', label: 'Interviews', icon: 'interview' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
]

const icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  jobs: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7h-9"/>
      <path d="M14 17H5"/>
      <circle cx="17" cy="17" r="3"/>
      <circle cx="7" cy="7" r="3"/>
    </svg>
  ),
  add: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  kanban: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="18" rx="1"/>
      <rect x="15" y="3" width="6" height="12" rx="1"/>
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  resume: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  interview: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.67 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  // Auto-collapse on tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setCollapsed(true)
      } else if (window.innerWidth >= 1024) {
        setCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7h-9"/>
              <path d="M14 17H5"/>
              <circle cx="17" cy="17" r="3"/>
              <circle cx="7" cy="7" r="3"/>
            </svg>
          </div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-name">JobHunter</span>
              <span className="sidebar-brand-pro">Pro</span>
            </div>
          )}
        </div>
        <button
          className="sidebar-collapse-btn hide-mobile"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </div>

      <SidebarStats collapsed={collapsed} />

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <span className="sidebar-icon">{icons[item.icon]}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
            {!collapsed && item.path === '/add-job' && (
              <span className="sidebar-badge">+</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer hide-mobile">
        {!collapsed && (
          <div className="sidebar-footer-text">
            <span className="footer-version">v1.0.0</span>
            <span className="footer-credit">JobHunter Pro</span>
          </div>
        )}
      </div>
    </aside>
  )
}


function SidebarStats({ collapsed }) {
  const [stats, setStats] = useState({ total: 0, applied: 0, interview: 0 })

  useEffect(() => {
    const jobs = jobStorage.getAll()
    const applied = jobs.filter(j => j.status === 'applied').length
    const interview = jobs.filter(j => j.status === 'interview').length
    setStats({ total: jobs.length, applied, interview })
  }, [])

  return (
    <div className="sidebar-stats hide-mobile">
      {!collapsed && (
        <div className="stats-mini">
          <div className="stat-mini-item">
            <span className="stat-mini-value">{stats.total}</span>
            <span className="stat-mini-label">Total</span>
          </div>
          <div className="stat-mini-divider" />
          <div className="stat-mini-item">
            <span className="stat-mini-value stat-applied">{stats.applied}</span>
            <span className="stat-mini-label">Applied</span>
          </div>
          <div className="stat-mini-divider" />
          <div className="stat-mini-item">
            <span className="stat-mini-value stat-interview">{stats.interview}</span>
            <span className="stat-mini-label">Interview</span>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="stats-mini-collapsed">
          <span className="stat-mini-value">{stats.total}</span>
        </div>
      )}
    </div>
  )
}

export default Sidebar
