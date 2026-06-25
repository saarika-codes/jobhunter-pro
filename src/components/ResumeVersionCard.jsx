import { useState } from 'react'

function ResumeVersionCard({ version, onUpdate, onSelect, isSelected }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(version.name)
  const [editDesc, setEditDesc] = useState(version.description)

  const handleSave = () => {
    onUpdate(version.id, { name: editName, description: editDesc })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(version.name)
    setEditDesc(version.description)
    setIsEditing(false)
  }

  return (
    <div className={`resume-version-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(version.id)}>
      <div className="resume-version-header">
        <div className="resume-version-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div className="resume-version-badge">
          {version.usageCount} uses
        </div>
      </div>

      {isEditing ? (
        <div className="resume-version-edit" onClick={(e) => e.stopPropagation()}>
          <input
            className="form-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Resume name"
          />
          <input
            className="form-input"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description"
            style={{ marginTop: '8px' }}
          />
          <div className="resume-version-edit-actions">
            <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-sm btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="resume-version-name">{version.name}</h3>
          <p className="resume-version-desc">{version.description}</p>
          {version.lastUsed && (
            <p className="resume-version-last">
              Last used: {new Date(version.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          )}
        </>
      )}

      {!isEditing && (
        <button
          className="resume-version-edit-btn"
          onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default ResumeVersionCard
