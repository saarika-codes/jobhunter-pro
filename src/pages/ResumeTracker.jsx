import { useState, useEffect } from 'react'
import ResumeVersionCard from '../components/ResumeVersionCard.jsx'
import { resumeStorage, jobStorage } from '../utils/storage.js'
import '../styles/resume.css'

function ResumeTracker() {
  const [resumes, setResumes] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [activeTab, setActiveTab] = useState('versions')

  useEffect(() => {
    setResumes(resumeStorage.getAll())
    setJobs(jobStorage.getAll())
  }, [])

  const handleUpdateResume = (id, updates) => {
    const updated = resumes.map(r => r.id === id ? { ...r, ...updates } : r)
    resumeStorage.save(updated)
    setResumes(updated)
  }

  const jobsUsingResume = (resumeId) => {
    return jobs.filter(job => job.resumeVersion === resumeId)
  }

  const selectedResumeData = resumes.find(r => r.id === selectedResume)
  const selectedJobs = selectedResume ? jobsUsingResume(selectedResume) : []

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>Resume Tracker</h1>
        <p className="text-secondary">Manage your resume versions and track which jobs use each one</p>
      </div>

      <div className="resume-tabs">
        <button
          className={`resume-tab ${activeTab === 'versions' ? 'active' : ''}`}
          onClick={() => setActiveTab('versions')}
        >
          Resume Versions
        </button>
        <button
          className={`resume-tab ${activeTab === 'mapping' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapping')}
        >
          Job Mapping
        </button>
      </div>

      {activeTab === 'versions' && (
        <div className="resume-versions-grid">
          {resumes.map((version, index) => (
            <div key={version.id} className="card-stagger" style={{ animationDelay: `${index * 0.05}s` }}>
              <ResumeVersionCard
                version={version}
                onUpdate={handleUpdateResume}
                onSelect={setSelectedResume}
                isSelected={selectedResume === version.id}
              />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mapping' && (
        <div className="resume-mapping">
          <div className="resume-mapping-sidebar">
            <h3 className="resume-mapping-title">Select a Resume</h3>
            <div className="resume-mapping-list">
              {resumes.map(version => (
                <button
                  key={version.id}
                  className={`resume-mapping-item ${selectedResume === version.id ? 'active' : ''}`}
                  onClick={() => setSelectedResume(version.id)}
                >
                  <span className="resume-mapping-name">{version.name}</span>
                  <span className="resume-mapping-count">{jobsUsingResume(version.id).length} jobs</span>
                </button>
              ))}
            </div>
          </div>

          <div className="resume-mapping-content">
            {selectedResumeData ? (
              <>
                <div className="resume-mapping-header">
                  <h3>{selectedResumeData.name}</h3>
                  <p className="text-secondary">{selectedResumeData.description}</p>
                </div>

                {selectedJobs.length === 0 ? (
                  <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
                    <p className="text-tertiary">No jobs using this resume yet</p>
                  </div>
                ) : (
                  <div className="resume-mapping-jobs">
                    {selectedJobs.map(job => (
                      <div key={job.id} className="resume-mapping-job card">
                        <div className="resume-mapping-job-header">
                          <div className="resume-mapping-job-avatar">
                            {job.company.charAt(0).toUpperCase()}
                          </div>
                          <div className="resume-mapping-job-info">
                            <h4>{job.role}</h4>
                            <span>{job.company} · {job.location}</span>
                          </div>
                        </div>
                        <div className="resume-mapping-job-meta">
                          <span className="mono">{job.salary}</span>
                          <span className={`badge badge-${job.status}`}>{job.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
                <p className="text-tertiary">Select a resume to see which jobs use it</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeTracker
