import { useState, useEffect, useMemo } from 'react'
import StatusPieChart from '../components/StatusPieChart.jsx'
import MonthlyBarChart from '../components/MonthlyBarChart.jsx'
import ConversionLineChart from '../components/ConversionLineChart.jsx'
import ResumePerformanceChart from '../components/ResumePerformanceChart.jsx'
import AIMatchCard from '../components/AIMatchCard.jsx'
import AIQuestionsCard from '../components/AIQuestionsCard.jsx'
import { jobStorage, resumeStorage } from '../utils/storage.js'
import '../styles/analytics.css'

// Mock AI responses for demo mode (no API key needed)
const mockAIMatch = (jd) => {
  const keywords = jd.toLowerCase()
  let score = 65
  const missing = []

  if (keywords.includes('react')) score += 10
  if (keywords.includes('node')) { score -= 5; missing.push('Node.js') }
  if (keywords.includes('typescript')) { score -= 5; missing.push('TypeScript') }
  if (keywords.includes('aws')) { score -= 5; missing.push('AWS') }
  if (keywords.includes('docker')) { score -= 5; missing.push('Docker') }

  return {
    score: Math.min(Math.max(score, 30), 95),
    missingSkills: missing.length > 0 ? missing : ['Advanced CSS', 'Testing'],
    suggestions: 'Focus on building projects with the missing skills. Add relevant keywords to your resume summary.',
  }
}

const mockAIQuestions = (jd) => {
  const role = jd.toLowerCase().includes('senior') ? 'Senior' : 'Frontend'
  return [
    { question: `Explain the difference between useEffect and useLayoutEffect in React.`, answer: 'useEffect runs asynchronously after the render is committed to the screen. useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, useful for measuring DOM elements.' },
    { question: `How would you optimize a React application for performance?`, answer: 'Use React.memo for component memoization, useMemo/useCallback for expensive computations, code splitting with React.lazy, virtualize long lists, and optimize re-renders with proper state management.' },
    { question: `Describe how you would handle state management in a large application.`, answer: 'Start with React Context for simple global state. For complex apps, consider Zustand or Redux Toolkit. Keep state as close to where it is used as possible (colocation). Use URL state for shareable UI state.' },
    { question: `What is the Event Loop in JavaScript and how does it work?`, answer: 'The event loop is the mechanism that allows JavaScript to perform non-blocking operations. It continuously checks the call stack and task queue, moving callbacks from the queue to the stack when the stack is empty.' },
    { question: `Explain CSS specificity and how it affects styling.`, answer: 'Specificity determines which CSS rule applies when multiple rules target the same element. Inline styles (1000) > IDs (100) > classes/attributes (10) > elements (1). Use !important sparingly as it breaks the natural cascade.' },
    { question: `How do you handle error boundaries in React?`, answer: 'Error boundaries are React components that catch JavaScript errors anywhere in their child component tree. They use componentDidCatch and static getDerivedStateFromError lifecycle methods to display fallback UI instead of crashing.' },
    { question: `What are the key differences between REST and GraphQL?`, answer: 'REST uses fixed endpoints returning predefined data structures. GraphQL uses a single endpoint where clients specify exactly what data they need, reducing over-fetching and under-fetching. GraphQL has a strong type system via schemas.' },
    { question: `How would you implement authentication in a React app?`, answer: 'Use JWT tokens stored in httpOnly cookies or localStorage. Implement protected routes with React Router. Use refresh tokens for silent re-authentication. Consider OAuth providers like Google/GitHub for social login.' },
    { question: `Explain the concept of closures in JavaScript with an example.`, answer: 'A closure is a function that retains access to its outer scope even after the outer function has returned. Example: a factory function returning an inner function that still accesses the factory parameters.' },
    { question: `What strategies do you use for testing React components?`, answer: 'Use Jest with React Testing Library for unit/integration tests. Test user interactions, not implementation details. Use MSW for API mocking. Aim for high coverage on critical paths. Use Cypress or Playwright for E2E testing.' },
  ]
}

function Analytics() {
  const [jobs, setJobs] = useState([])
  const [resumes, setResumes] = useState([])
  const [stats, setStats] = useState({ total: 0, applied: 0, interview: 0, rejected: 0, offer: 0, saved: 0 })
  const [monthlyData, setMonthlyData] = useState({ labels: [], values: [] })
  const [conversionData, setConversionData] = useState({ labels: [], applied: [], interviews: [] })
  const [resumePerfData, setResumePerfData] = useState({ labels: [], total: [], interviews: [], offers: [] })

  // AI states
  const [matchResult, setMatchResult] = useState(null)
  const [matchLoading, setMatchLoading] = useState(false)
  const [questionsResult, setQuestionsResult] = useState(null)
  const [questionsLoading, setQuestionsLoading] = useState(false)

  useEffect(() => {
    const loadedJobs = jobStorage.getAll()
    const loadedResumes = resumeStorage.getAll()
    setJobs(loadedJobs)
    setResumes(loadedResumes)

    // Stats
    const s = { total: loadedJobs.length, applied: 0, interview: 0, rejected: 0, offer: 0, saved: 0 }
    loadedJobs.forEach(job => { if (s[job.status] !== undefined) s[job.status]++ })
    setStats(s)

    // Monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const monthlyCounts = [0, 0, 0, 0, 0, 0]
    loadedJobs.forEach(job => {
      if (job.dateApplied) {
        const month = new Date(job.dateApplied).getMonth()
        if (month >= 0 && month < 6) monthlyCounts[month]++
      }
    })
    setMonthlyData({ labels: months, values: monthlyCounts })

    // Conversion data (mock weekly data)
    setConversionData({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      applied: [5, 8, 12, 15, 18, 20],
      interviews: [1, 2, 3, 5, 7, 10],
    })

    // Resume performance
    const resumeLabels = loadedResumes.map(r => r.name)
    const resumeTotal = loadedResumes.map(r => loadedJobs.filter(j => j.resumeVersion === r.id).length)
    const resumeInterviews = loadedResumes.map(r =>
      loadedJobs.filter(j => j.resumeVersion === r.id && j.status === 'interview').length
    )
    const resumeOffers = loadedResumes.map(r =>
      loadedJobs.filter(j => j.resumeVersion === r.id && j.status === 'offer').length
    )
    setResumePerfData({ labels: resumeLabels, total: resumeTotal, interviews: resumeInterviews, offers: resumeOffers })
  }, [])

  // Calculate advanced metrics
  const metrics = useMemo(() => {
    const total = jobs.length
    const applied = jobs.filter(j => j.status === 'applied').length
    const interviews = jobs.filter(j => j.status === 'interview').length
    const offers = jobs.filter(j => j.status === 'offer').length
    const rejected = jobs.filter(j => j.status === 'rejected').length

    const responseRate = applied > 0 ? Math.round((interviews / applied) * 100) : 0
    const conversionRate = interviews > 0 ? Math.round((offers / interviews) * 100) : 0
    const rejectionRate = applied > 0 ? Math.round((rejected / applied) * 100) : 0

    const avgTimeToInterview = '12 days' // Mock

    return { total, applied, interviews, offers, responseRate, conversionRate, rejectionRate, avgTimeToInterview }
  }, [jobs])

  // AI handlers
  const handleAnalyzeMatch = async (jd) => {
    setMatchLoading(true)
    setMatchResult(null)

    // Check if Gemini API key exists
    const apiKey = import.meta.env?.VITE_GEMINI_KEY

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Analyze this job description and compare it with a typical Frontend Developer resume (React, JavaScript, HTML, CSS). Return ONLY a JSON object with this exact structure: {"score": number (0-100), "missingSkills": [string array], "suggestions": string}. Job Description: ${jd}`
              }]
            }]
          })
        })
        const data = await response.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        // Extract JSON from text
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          setMatchResult(parsed)
        } else {
          setMatchResult(mockAIMatch(jd))
        }
      } catch {
        setMatchResult(mockAIMatch(jd))
      }
    } else {
      // Demo mode - simulate API delay
      await new Promise(r => setTimeout(r, 1500))
      setMatchResult(mockAIMatch(jd))
    }

    setMatchLoading(false)
  }

  const handleGenerateQuestions = async (jd) => {
    setQuestionsLoading(true)
    setQuestionsResult(null)

    const apiKey = import.meta.env?.VITE_GEMINI_KEY

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Given this job description, generate 10 likely technical interview questions with brief answers. Return as a JSON array: [{"question": string, "answer": string}]. Job Description: ${jd}`
              }]
            }]
          })
        })
        const data = await response.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          setQuestionsResult(JSON.parse(jsonMatch[0]))
        } else {
          setQuestionsResult(mockAIQuestions(jd))
        }
      } catch {
        setQuestionsResult(mockAIQuestions(jd))
      }
    } else {
      await new Promise(r => setTimeout(r, 1500))
      setQuestionsResult(mockAIQuestions(jd))
    }

    setQuestionsLoading(false)
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="text-secondary">Deep insights into your job search</p>
      </div>

      {/* Advanced Metrics */}
      <div className="analytics-metrics">
        {[
          { label: 'Response Rate', value: `${metrics.responseRate}%`, desc: 'Applied → Interview', color: '#5482B4' },
          { label: 'Conversion Rate', value: `${metrics.conversionRate}%`, desc: 'Interview → Offer', color: '#10B981' },
          { label: 'Rejection Rate', value: `${metrics.rejectionRate}%`, desc: 'Applied → Rejected', color: '#EF4444' },
          { label: 'Avg Time to Interview', value: metrics.avgTimeToInterview, desc: 'From application', color: '#F59E0B' },
        ].map((metric, i) => (
          <div key={i} className="analytics-metric-card card card-stagger" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="analytics-metric-value" style={{ color: metric.color }}>{metric.value}</div>
            <div className="analytics-metric-label">{metric.label}</div>
            <div className="analytics-metric-desc">{metric.desc}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid">
        <StatusPieChart data={stats} />
        <MonthlyBarChart data={monthlyData} />
      </div>

      {/* Charts Row 2 */}
      <div className="charts-grid">
        <ConversionLineChart data={conversionData} />
        <ResumePerformanceChart data={resumePerfData} />
      </div>

      {/* AI Features */}
      <div className="ai-section">
        <div className="ai-section-header">
          <h2 className="ai-section-title">AI Features</h2>
          <span className="ai-section-badge">
            {!import.meta.env?.VITE_GEMINI_KEY ? 'Demo Mode' : 'Live API'}
          </span>
        </div>
        <div className="ai-grid">
          <AIMatchCard
            onAnalyze={handleAnalyzeMatch}
            result={matchResult}
            loading={matchLoading}
          />
          <AIQuestionsCard
            onGenerate={handleGenerateQuestions}
            questions={questionsResult}
            loading={questionsLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Analytics
