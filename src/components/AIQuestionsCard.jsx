import { useState } from 'react'

function AIQuestionsCard({ jobDescription, onGenerate, questions, loading }) {
  const [input, setInput] = useState(jobDescription || '')
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleGenerate = () => {
    if (!input.trim()) return
    onGenerate(input)
  }

  return (
    <div className="ai-questions-card card">
      <div className="ai-questions-header">
        <div className="ai-questions-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <h3 className="ai-questions-title">AI Interview Questions</h3>
          <p className="ai-questions-subtitle">Generate likely questions from a job description</p>
        </div>
      </div>

      <div className="ai-questions-input">
        <textarea
          className="form-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the job description here..."
          rows={6}
        />
        <button
          className="btn btn-primary ai-questions-btn"
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
        >
          {loading ? (
            <>
              <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Generate Questions
            </>
          )}
        </button>
      </div>

      {questions && questions.length > 0 && (
        <div className="ai-questions-result">
          <h4 className="ai-questions-result-title">{questions.length} Likely Interview Questions</h4>
          <div className="ai-questions-list">
            {questions.map((q, index) => (
              <div key={index} className="ai-question-item">
                <div
                  className="ai-question-header"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <span className="ai-question-number">{index + 1}</span>
                  <span className="ai-question-text">{q.question}</span>
                  <svg
                    className="ai-question-chevron"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: expandedIndex === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                {expandedIndex === index && q.answer && (
                  <div className="ai-question-answer">
                    <p>{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIQuestionsCard
