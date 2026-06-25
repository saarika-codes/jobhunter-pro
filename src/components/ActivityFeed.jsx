import { useState } from 'react'

const statusIcons = {
  applied: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  interview: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  offer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  rejected: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  saved: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

const statusColors = {
  applied: '#5482B4',
  interview: '#F59E0B',
  offer: '#10B981',
  rejected: '#EF4444',
  saved: '#64748B',
}

function timeAgo(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ActivityFeed({ activities }) {
  const [visibleCount, setVisibleCount] = useState(5)

  const displayed = activities.slice(0, visibleCount)

  return (
    <div className="activity-feed card">
      <div className="activity-header">
        <h3 className="activity-title">Recent Activity</h3>
        <span className="activity-count">{activities.length} total</span>
      </div>
      <div className="activity-list">
        {displayed.length === 0 ? (
          <div className="activity-empty">
            <p className="text-tertiary">No recent activity</p>
          </div>
        ) : (
          displayed.map((activity, index) => (
            <div
              key={activity.id || index}
              className="activity-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className="activity-icon"
                style={{ background: `${statusColors[activity.status]}15`, color: statusColors[activity.status] }}
              >
                {statusIcons[activity.status] || statusIcons.applied}
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>{activity.action}</strong> at <span className="activity-company">{activity.company}</span>
                </p>
                <span className="activity-time">{timeAgo(activity.timestamp)}</span>
              </div>
              <div className="activity-status">
                <span className="badge" style={{
                  background: `${statusColors[activity.status]}15`,
                  color: statusColors[activity.status],
                }}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {activities.length > visibleCount && (
        <button className="activity-load-more btn btn-ghost" onClick={() => setVisibleCount(c => c + 5)}>
          Show more
        </button>
      )}
    </div>
  )
}

export default ActivityFeed
