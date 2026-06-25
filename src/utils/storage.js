const STORAGE_KEY = 'jobhunter_jobs'
const RESUMES_KEY = 'jobhunter_resumes'
const INTERVIEWS_KEY = 'jobhunter_interviews'
const THEME_KEY = 'jobhunter-theme'

// Generic localStorage helpers with error handling
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}

// Job-specific helpers
export const jobStorage = {
  getAll: () => storage.get(STORAGE_KEY, []),
  save: (jobs) => storage.set(STORAGE_KEY, jobs),
  getById: (id) => {
    const jobs = storage.get(STORAGE_KEY, [])
    return jobs.find(job => job.id === id)
  },
  add: (job) => {
    const jobs = storage.get(STORAGE_KEY, [])
    jobs.push({ ...job, id: crypto.randomUUID(), createdAt: Date.now() })
    storage.set(STORAGE_KEY, jobs)
    return jobs
  },
  update: (id, updates) => {
    const jobs = storage.get(STORAGE_KEY, [])
    const idx = jobs.findIndex(j => j.id === id)
    if (idx !== -1) {
      jobs[idx] = { ...jobs[idx], ...updates, updatedAt: Date.now() }
      storage.set(STORAGE_KEY, jobs)
    }
    return jobs
  },
  delete: (id) => {
    const jobs = storage.get(STORAGE_KEY, [])
    const filtered = jobs.filter(j => j.id !== id)
    storage.set(STORAGE_KEY, filtered)
    return filtered
  }
}

// Resume-specific helpers
export const resumeStorage = {
  getAll: () => storage.get(RESUMES_KEY, [
    { id: 'v1', name: 'Resume V1', description: 'General Purpose', lastUsed: null, usageCount: 0 },
    { id: 'v2', name: 'Resume V2', description: 'Frontend Focused', lastUsed: null, usageCount: 0 },
    { id: 'v3', name: 'Resume V3', description: 'Full Stack Focused', lastUsed: null, usageCount: 0 }
  ]),
  save: (resumes) => storage.set(RESUMES_KEY, resumes)
}

// Interview notes helpers
export const interviewStorage = {
  getAll: () => storage.get(INTERVIEWS_KEY, []),
  save: (notes) => storage.set(INTERVIEWS_KEY, notes)
}

export default storage
