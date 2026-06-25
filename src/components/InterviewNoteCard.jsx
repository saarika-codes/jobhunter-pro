import { useState } from 'react'

const resultConfig = {
  passed: { label: 'Passed', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  failed: { label: 'Failed', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
  pending: { label: 'Pending', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
}

function InterviewNoteCard({ note, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const result = resultConfig[note.result] || resultConfig.pending

  return (
    <div className={`interview-note-card ${expanded ? 'expanded' : ''}`}>
      <div className="interview-note-header" onClick={() => setExpanded(!expanded)}>
        <div className="interview-note-company">
          <div className="interview-note-avatar">
            {note.companyName.charAt(0).toUpperCase()}
          </div>
          <div className="interview-note-info">
            <h3 className="interview-note-title">{note.companyName}</h3>
            <span className="interview-note-date">
              {new Date(note.interviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        <div className="interview-note-actions">
          <span className="badge" style={{ background: result.bg, color: result.color }}>
            {result.label}
          </span>
          <button
            className="interview-note-expand-btn"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button
            className="interview-note-delete-btn"
            onClick={(e) => {
              e.stopPropagation()
              if (window.confirm('Delete this interview note?')) onDelete(note.id)
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="interview-note-body">
          {note.questionsAsked && (
            <div className="interview-note-section">
              <h4 className="interview-note-section-title">Questions Asked</h4>
              <p className="interview-note-text">{note.questionsAsked}</p>
            </div>
          )}
          {note.yourAnswers && (
            <div className="interview-note-section">
              <h4 className="interview-note-section-title">Your Answers</h4>
              <p className="interview-note-text">{note.yourAnswers}</p>
            </div>
          )}
          {note.feedback && (
            <div className="interview-note-section">
              <h4 className="interview-note-section-title">Feedback</h4>
              <p className="interview-note-text">{note.feedback}</p>
            </div>
          )}
          {note.nextRoundDate && (
            <div className="interview-note-section">
              <h4 className="interview-note-section-title">Next Round</h4>
              <p className="interview-note-text mono">
                {new Date(note.nextRoundDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewNoteCard
