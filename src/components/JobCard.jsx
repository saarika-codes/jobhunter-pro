import { useNavigate } from 'react-router-dom'

const statusConfig = {
  saved: { label: 'Saved', color: '#64748B', bg: 'var(--status-bg-saved)' },
  applied: { label: 'Applied', color: '#5482B4', bg: 'var(--status-bg-applied)' },
  interview: { label: 'Interview', color: '#F59E0B', bg: 'var(--status-bg-interview)' },
  offer: { label: 'Offer', color: '#10B981', bg: 'var(--status-bg-offer)' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: 'var(--status-bg-rejected)' },
}

function JobCard({ job, onDelete }) {
  const navigate = useNavigate()
  const status = statusConfig[job.status] || statusConfig.saved

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit-job/${job.id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm(`Delete "${job.role}" at ${job.company}?`)) {
      onDelete(job.id)
    }
  }

  return (
    <div className="job-card card-stagger">
      <div className="job-card-header">
        <div className="job-card-company">
          <div className="job-card-avatar">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div className="job-card-info">
            <h3 className="job-card-role">{job.role}</h3>
            <span className="job-card-company-name">{job.company}</span>
          </div>
        </div>
        <span
          className="badge"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </div>

      <div className="job-card-details">
        <div className="job-detail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{job.location}</span>
        </div>
        <div className="job-detail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span className="mono">{job.salary}</span>
        </div>
        <div className="job-detail">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{job.dateApplied || 'Not applied'}</span>
        </div>
      </div>

      {job.notes && (
        <div className="job-card-notes">
          <p>{job.notes}</p>
        </div>
      )}

      <div className="job-card-actions">
        <button className="btn btn-ghost btn-sm job-action-btn" onClick={handleEdit}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button className="btn btn-ghost btn-sm job-action-btn job-delete-btn" onClick={handleDelete}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

export default JobCard
