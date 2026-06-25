import KanbanCard from './KanbanCard.jsx'

const columnConfig = {
  saved: { label: 'Saved', color: '#64748B', bg: 'var(--status-bg-saved)' },
  applied: { label: 'Applied', color: '#5482B4', bg: 'var(--status-bg-applied)' },
  interview: { label: 'Interview', color: '#F59E0B', bg: 'var(--status-bg-interview)' },
  offer: { label: 'Offer', color: '#10B981', bg: 'var(--status-bg-offer)' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: 'var(--status-bg-rejected)' },
}

function KanbanColumn({ status, jobs, onDragOver, onDrop, onDragStart, onDragEnd, draggingId }) {
  const config = columnConfig[status]

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    onDragOver(status)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const jobId = e.dataTransfer.getData('text/plain')
    onDrop(jobId, status)
  }

  return (
    <div
      className={`kanban-column ${draggingId ? 'droppable' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="kanban-column-header" style={{ borderColor: config.color }}>
        <div className="kanban-column-title">
          <span className="kanban-column-dot" style={{ background: config.color }} />
          <span>{config.label}</span>
        </div>
        <span className="kanban-column-count">{jobs.length}</span>
      </div>
      <div className="kanban-column-body">
        {jobs.length === 0 ? (
          <div className="kanban-empty">
            <span className="text-tertiary">Drop jobs here</span>
          </div>
        ) : (
          jobs.map(job => (
            <KanbanCard
              key={job.id}
              job={job}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={draggingId === job.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default KanbanColumn
