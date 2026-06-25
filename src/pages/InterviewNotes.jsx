import { useState, useEffect } from 'react'
import InterviewNoteCard from '../components/InterviewNoteCard.jsx'
import { interviewStorage } from '../utils/storage.js'
import '../styles/interview.css'

const resultOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'passed', label: 'Passed' },
  { value: 'failed', label: 'Failed' },
]

function InterviewNotes() {
  const [notes, setNotes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    interviewDate: '',
    questionsAsked: '',
    yourAnswers: '',
    feedback: '',
    nextRoundDate: '',
    result: 'pending',
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setNotes(interviewStorage.getAll())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newNote = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    const updated = [...notes, newNote]
    interviewStorage.save(updated)
    setNotes(updated)
    setShowForm(false)
    setFormData({
      companyName: '',
      interviewDate: '',
      questionsAsked: '',
      yourAnswers: '',
      feedback: '',
      nextRoundDate: '',
      result: 'pending',
    })
  }

  const handleDelete = (id) => {
    const updated = notes.filter(n => n.id !== id)
    interviewStorage.save(updated)
    setNotes(updated)
  }

  const filteredNotes = filter === 'all' ? notes : notes.filter(n => n.result === filter)

  const filterCounts = {
    all: notes.length,
    pending: notes.filter(n => n.result === 'pending').length,
    passed: notes.filter(n => n.result === 'passed').length,
    failed: notes.filter(n => n.result === 'failed').length,
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>Interview Notes</h1>
        <p className="text-secondary">Record questions, feedback, and next steps</p>
      </div>

      <div className="interview-toolbar">
        <div className="interview-filters">
          {[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'passed', label: 'Passed' },
            { value: 'failed', label: 'Failed' },
          ].map(f => (
            <button
              key={f.value}
              className={`interview-filter ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              <span className="interview-filter-count">{filterCounts[f.value]}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Note
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form className="interview-form card" onSubmit={handleSubmit}>
          <h3 className="interview-form-title">New Interview Note</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input
                className="form-input"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g., Google"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Interview Date *</label>
              <input
                className="form-input"
                type="date"
                value={formData.interviewDate}
                onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Result</label>
              <select
                className="form-select"
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
              >
                {resultOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Next Round Date</label>
              <input
                className="form-input"
                type="date"
                value={formData.nextRoundDate}
                onChange={(e) => setFormData({ ...formData, nextRoundDate: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="form-label">Questions Asked</label>
            <textarea
              className="form-textarea"
              value={formData.questionsAsked}
              onChange={(e) => setFormData({ ...formData, questionsAsked: e.target.value })}
              placeholder="React Hooks, Closures, Event Loop..."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Your Answers</label>
            <textarea
              className="form-textarea"
              value={formData.yourAnswers}
              onChange={(e) => setFormData({ ...formData, yourAnswers: e.target.value })}
              placeholder="How you answered..."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Feedback</label>
            <textarea
              className="form-textarea"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="Interviewer feedback..."
              rows={2}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </div>
        </form>
      )}

      <div className="interview-notes-list">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="empty-state-title">No interview notes yet</h3>
            <p className="empty-state-desc">Record your interview experiences to track your progress</p>
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <div key={note.id} className="card-stagger" style={{ animationDelay: `${index * 0.05}s` }}>
              <InterviewNoteCard note={note} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InterviewNotes
