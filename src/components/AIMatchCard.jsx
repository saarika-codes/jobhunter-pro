import { useState } from 'react'

function AIMatchCard({ jobDescription, onAnalyze, result, loading }) {
  const [input, setInput] = useState(jobDescription || '')

  const handleAnalyze = () => {
    if (!input.trim()) return
    onAnalyze(input)
  }

  const getScoreColor = (score) => {
    if (score >= 70) return '#10B981'
    if (score >= 40) return '#F59E0B'
    return '#EF4444'
  }

  const getScoreBg = (score) => {
    if (score >= 70) return 'rgba(16, 185, 129, 0.1)'
    if (score >= 40) return 'rgba(245, 158, 11, 0.1)'
    return 'rgba(239, 68, 68, 0.1)'
  }

  return (
    <div className="ai-match-card card">
      <div className="ai-match-header">
        <div className="ai-match-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
            <path d="M12 12l9-3"/>
          </svg>
        </div>
        <div>
          <h3 className="ai-match-title">AI Resume Match</h3>
          <p className="ai-match-subtitle">Compare your resume with a job description</p>
        </div>
      </div>

      <div className="ai-match-input">
        <textarea
          className="form-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the job description here..."
          rows={6}
        />
        <button
          className="btn btn-primary ai-match-btn"
          onClick={handleAnalyze}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <>
              <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                <path d="M12 2a10 10 0 0 1 10 10"/>
                <path d="M12 12l9-3"/>
              </svg>
              Analyze Match
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="ai-match-result">
          <div className="ai-match-score" style={{ background: getScoreBg(result.score) }}>
            <span className="ai-match-score-value" style={{ color: getScoreColor(result.score) }}>
              {result.score}%
            </span>
            <span className="ai-match-score-label">Match Score</span>
          </div>

          {result.missingSkills && result.missingSkills.length > 0 && (
            <div className="ai-match-section">
              <h4 className="ai-match-section-title">Missing Skills</h4>
              <div className="ai-match-skills">
                {result.missingSkills.map((skill, i) => (
                  <span key={i} className="ai-match-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {result.suggestions && (
            <div className="ai-match-section">
              <h4 className="ai-match-section-title">Suggestions</h4>
              <p className="ai-match-suggestions">{result.suggestions}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIMatchCard
