import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jobStorage } from '../utils/storage.js'

const statusOptions = [
  { value: 'saved', label: 'Saved' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

function JobForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    jobLink: '',
    status: 'saved',
    notes: '',
    dateApplied: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (isEdit) {
      const job = jobStorage.getById(id)
      if (job) {
        setFormData({
          company: job.company || '',
          role: job.role || '',
          location: job.location || '',
          salary: job.salary || '',
          jobLink: job.jobLink || '',
          status: job.status || 'saved',
          notes: job.notes || '',
          dateApplied: job.dateApplied || '',
        })
      }
    }
  }, [id, isEdit])

  const validate = (data) => {
    const errs = {}
    if (!data.company.trim()) errs.company = 'Company name is required'
    if (!data.role.trim()) errs.role = 'Role is required'
    if (!data.location.trim()) errs.location = 'Location is required'
    if (!data.salary.trim()) errs.salary = 'Salary is required'
    if (data.jobLink && !isValidUrl(data.jobLink)) errs.jobLink = 'Enter a valid URL'
    if (data.status === 'applied' && !data.dateApplied) errs.dateApplied = 'Date applied is required'
    return errs
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || undefined }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const newErrors = validate(formData)
    setErrors(prev => ({ ...prev, [name]: newErrors[name] || undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    if (isEdit) {
      jobStorage.update(id, formData)
    } else {
      jobStorage.add(formData)
    }

    navigate('/jobs')
  }

  const inputClass = (field) => {
    const base = 'form-input'
    if (touched[field] && errors[field]) return base + ' error'
    return base
  }

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>{isEdit ? 'Edit Job' : 'Add New Job'}</h1>
        <p className="text-secondary">
          {isEdit ? 'Update the job details below' : 'Track a new job application'}
        </p>
      </div>

      <div className="job-form-wrapper">
        <form className="job-form card" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="company">Company Name *</label>
              <input
                id="company"
                name="company"
                type="text"
                className={inputClass('company')}
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Google"
              />
              {touched.company && errors.company && (
                <span className="form-error">{errors.company}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role">Role *</label>
              <input
                id="role"
                name="role"
                type="text"
                className={inputClass('role')}
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Frontend Developer"
              />
              {touched.role && errors.role && (
                <span className="form-error">{errors.role}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="location">Location *</label>
              <input
                id="location"
                name="location"
                type="text"
                className={inputClass('location')}
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Remote / Bangalore"
              />
              {touched.location && errors.location && (
                <span className="form-error">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="salary">Salary *</label>
              <input
                id="salary"
                name="salary"
                type="text"
                className={inputClass('salary')}
                value={formData.salary}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., 12 LPA"
              />
              {touched.salary && errors.salary && (
                <span className="form-error">{errors.salary}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="jobLink">Job Link</label>
              <input
                id="jobLink"
                name="jobLink"
                type="url"
                className={inputClass('jobLink')}
                value={formData.jobLink}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="https://..."
              />
              {touched.jobLink && errors.jobLink && (
                <span className="form-error">{errors.jobLink}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dateApplied">Date Applied</label>
              <input
                id="dateApplied"
                name="dateApplied"
                type="date"
                className={inputClass('dateApplied')}
                value={formData.dateApplied}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.dateApplied && errors.dateApplied && (
                <span className="form-error">{errors.dateApplied}</span>
              )}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about this application..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/jobs')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update Job' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobForm
