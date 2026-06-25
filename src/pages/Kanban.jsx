import { useState, useEffect, useMemo } from 'react'
import KanbanColumn from '../components/KanbanColumn.jsx'
import { jobStorage } from '../utils/storage.js'
import '../styles/kanban.css'

const columns = ['saved', 'applied', 'interview', 'offer', 'rejected']

function Kanban() {
  const [jobs, setJobs] = useState([])
  const [draggingId, setDraggingId] = useState(null)
  const [hoverColumn, setHoverColumn] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loaded = jobStorage.getAll()
    setJobs(loaded)
  }, [])

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs
    const q = searchQuery.toLowerCase()
    return jobs.filter(job =>
      job.company.toLowerCase().includes(q) ||
      job.role.toLowerCase().includes(q)
    )
  }, [jobs, searchQuery])

  const jobsByColumn = useMemo(() => {
    const grouped = {}
    columns.forEach(col => { grouped[col] = [] })
    filteredJobs.forEach(job => {
      if (grouped[job.status]) {
        grouped[job.status].push(job)
      }
    })
    return grouped
  }, [filteredJobs])

  const handleDragStart = (id) => {
    setDraggingId(id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setHoverColumn(null)
  }

  const handleDragOver = (columnStatus) => {
    setHoverColumn(columnStatus)
  }

  const handleDrop = (jobId, newStatus) => {
    const updated = jobStorage.update(jobId, { status: newStatus })
    setJobs(updated)
    setDraggingId(null)
    setHoverColumn(null)
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>Kanban Board</h1>
        <p className="text-secondary">Drag and drop jobs to update their status</p>
      </div>

      <div className="kanban-toolbar">
        <div className="search-box" style={{ maxWidth: '300px' }}>
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        <div className="kanban-legend">
          <span className="text-tertiary" style={{ fontSize: 'var(--text-sm)' }}>
            Drag cards between columns to update status
          </span>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobsByColumn[status] || []}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggingId={draggingId}
          />
        ))}
      </div>
    </div>
  )
}

export default Kanban
