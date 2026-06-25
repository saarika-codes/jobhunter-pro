import { useState } from 'react'

const statusConfig = {
  saved: { color: '#64748B' },
  applied: { color: '#5482B4' },
  interview: { color: '#F59E0B' },
  offer: { color: '#10B981' },
  rejected: { color: '#EF4444' },
}

function KanbanCard({ job, onDragStart, onDragEnd, isDragging }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const config = statusConfig[job.status] || statusConfig.saved

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', job.id)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart(job.id)
  }

  const handleDragEnd = () => {
    onDragEnd()
  }

  return (
    <div
      className={`kanban-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-card-header">
        <div className="kanban-card-avatar" style={{ background: config.color }}>
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div className="kanban-card-company">{job.company}</div>
      </div>
      <div className="kanban-card-role">{job.role}</div>
      <div className="kanban-card-meta">
        <span className="kanban-card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {job.location}
        </span>
        <span className="kanban-card-salary mono">{job.salary}</span>
      </div>
    </div>
  )
}

export default KanbanCard
