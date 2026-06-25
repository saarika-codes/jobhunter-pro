import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard.jsx'
import { jobStorage } from '../utils/storage.js'
import '../styles/jobs.css'

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

function Jobs() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loaded = jobStorage.getAll()
    setJobs(loaded)
    setIsLoading(false)
  }, [])

  const handleDelete = (id) => {
    const updated = jobStorage.delete(id)
    setJobs(updated)
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const matchesFilter = activeFilter === 'all' || job.status === activeFilter
    return matchesSearch && matchesFilter
  })

  const statusCounts = statusFilters.reduce((acc, filter) => {
    if (filter.value === 'all') {
      acc[filter.value] = jobs.length
    } else {
      acc[filter.value] = jobs.filter(j => j.status === filter.value).length
    }
    return acc
  }, {})

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>My Jobs</h1>
        <p className="text-secondary">Manage and track your job applications</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="jobs-toolbar">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by company or role..."
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

        <button className="btn btn-primary add-job-btn" onClick={() => navigate('/add-job')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Job
        </button>
      </div>

      {/* Filter Chips */}
      <div className="filter-chips">
        {statusFilters.map(filter => (
          <button
            key={filter.value}
            className={`filter-chip ${activeFilter === filter.value ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
            <span className="filter-count">{statusCounts[filter.value] || 0}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="results-count">
        <span className="text-secondary">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </span>
      </div>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="jobs-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="job-card-skeleton skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7h-9"/>
              <path d="M14 17H5"/>
              <circle cx="17" cy="17" r="3"/>
              <circle cx="7" cy="7" r="3"/>
            </svg>
          </div>
          <h3 className="empty-state-title">No jobs found</h3>
          <p className="empty-state-desc">
            {searchQuery || activeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start tracking your job search by adding your first job'}
          </p>
          {!searchQuery && activeFilter === 'all' && (
            <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('/add-job')}>
              Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs
