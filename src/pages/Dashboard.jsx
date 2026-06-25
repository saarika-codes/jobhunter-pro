import { useEffect, useState } from 'react'
import KPICard from '../components/KPICard.jsx'
import StatusPieChart from '../components/StatusPieChart.jsx'
import MonthlyBarChart from '../components/MonthlyBarChart.jsx'
import ActivityFeed from '../components/ActivityFeed.jsx'
import '../styles/dashboard.css'
import { jobStorage } from '../utils/storage.js'

// Seed dummy data if empty
function seedDummyData() {
  const existing = jobStorage.getAll()
  if (existing.length > 0) return existing

  const now = Date.now()
  const dummyJobs = [
    { id: '1', company: 'Google', role: 'Frontend Developer', location: 'Remote', salary: '18 LPA', status: 'applied', dateApplied: '2026-06-20', createdAt: now - 86400000 * 5 },
    { id: '2', company: 'Microsoft', role: 'Software Engineer', location: 'Bangalore', salary: '22 LPA', status: 'interview', dateApplied: '2026-06-18', createdAt: now - 86400000 * 7 },
    { id: '3', company: 'Amazon', role: 'SDE-1', location: 'Hyderabad', salary: '16 LPA', status: 'rejected', dateApplied: '2026-06-15', createdAt: now - 86400000 * 10 },
    { id: '4', company: 'Flipkart', role: 'Frontend Engineer', location: 'Bangalore', salary: '14 LPA', status: 'offer', dateApplied: '2026-06-10', createdAt: now - 86400000 * 15 },
    { id: '5', company: 'Swiggy', role: 'React Developer', location: 'Remote', salary: '12 LPA', status: 'applied', dateApplied: '2026-06-22', createdAt: now - 86400000 * 3 },
    { id: '6', company: 'Zomato', role: 'UI Engineer', location: 'Gurgaon', salary: '13 LPA', status: 'interview', dateApplied: '2026-06-19', createdAt: now - 86400000 * 6 },
    { id: '7', company: 'Paytm', role: 'Frontend Dev', location: 'Noida', salary: '11 LPA', status: 'saved', dateApplied: '', createdAt: now - 86400000 * 2 },
    { id: '8', company: 'PhonePe', role: 'Software Dev', location: 'Bangalore', salary: '15 LPA', status: 'applied', dateApplied: '2026-06-21', createdAt: now - 86400000 * 4 },
    { id: '9', company: 'Ola', role: 'Frontend Developer', location: 'Bangalore', salary: '10 LPA', status: 'rejected', dateApplied: '2026-06-12', createdAt: now - 86400000 * 13 },
    { id: '10', company: 'Uber', role: 'Frontend Engineer', location: 'Hyderabad', salary: '20 LPA', status: 'interview', dateApplied: '2026-06-17', createdAt: now - 86400000 * 8 },
    { id: '11', company: 'Netflix', role: 'UI Engineer', location: 'Remote', salary: '25 LPA', status: 'applied', dateApplied: '2026-06-23', createdAt: now - 86400000 * 2 },
    { id: '12', company: 'Adobe', role: 'Frontend Dev', location: 'Noida', salary: '17 LPA', status: 'saved', dateApplied: '', createdAt: now - 86400000 * 1 },
    { id: '13', company: 'Salesforce', role: 'Software Engineer', location: 'Hyderabad', salary: '19 LPA', status: 'applied', dateApplied: '2026-06-16', createdAt: now - 86400000 * 9 },
    { id: '14', company: 'LinkedIn', role: 'Frontend Developer', location: 'Bangalore', salary: '21 LPA', status: 'interview', dateApplied: '2026-06-14', createdAt: now - 86400000 * 11 },
    { id: '15', company: 'Twitter', role: 'React Developer', location: 'Remote', salary: '23 LPA', status: 'rejected', dateApplied: '2026-06-11', createdAt: now - 86400000 * 14 },
    { id: '16', company: 'Meta', role: 'Frontend Engineer', location: 'Hyderabad', salary: '24 LPA', status: 'applied', dateApplied: '2026-06-13', createdAt: now - 86400000 * 12 },
    { id: '17', company: 'Apple', role: 'UI Engineer', location: 'Bangalore', salary: '26 LPA', status: 'saved', dateApplied: '', createdAt: now - 86400000 * 1 },
    { id: '18', company: 'Spotify', role: 'Frontend Dev', location: 'Remote', salary: '20 LPA', status: 'applied', dateApplied: '2026-06-24', createdAt: now - 86400000 * 1 },
    { id: '19', company: 'Stripe', role: 'Software Engineer', location: 'Bangalore', salary: '28 LPA', status: 'interview', dateApplied: '2026-06-08', createdAt: now - 86400000 * 17 },
    { id: '20', company: 'Shopify', role: 'Frontend Developer', location: 'Remote', salary: '16 LPA', status: 'applied', dateApplied: '2026-06-25', createdAt: now - 86400000 * 0 },
    { id: '21', company: 'Airbnb', role: 'React Developer', location: 'Bangalore', salary: '22 LPA', status: 'offer', dateApplied: '2026-06-05', createdAt: now - 86400000 * 20 },
    { id: '22', company: 'Slack', role: 'Frontend Engineer', location: 'Remote', salary: '18 LPA', status: 'rejected', dateApplied: '2026-06-07', createdAt: now - 86400000 * 18 },
    { id: '23', company: 'Dropbox', role: 'UI Engineer', location: 'Hyderabad', salary: '15 LPA', status: 'applied', dateApplied: '2026-06-09', createdAt: now - 86400000 * 16 },
    { id: '24', company: 'Reddit', role: 'Frontend Dev', location: 'Remote', salary: '14 LPA', status: 'saved', dateApplied: '', createdAt: now - 86400000 * 3 },
    { id: '25', company: 'Twitch', role: 'Software Engineer', location: 'Bangalore', salary: '19 LPA', status: 'interview', dateApplied: '2026-06-06', createdAt: now - 86400000 * 19 },
  ]

  jobStorage.save(dummyJobs)
  return dummyJobs
}

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({ total: 0, applied: 0, interview: 0, rejected: 0, offer: 0, saved: 0 })
  const [monthlyData, setMonthlyData] = useState({ labels: [], values: [] })
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadedJobs = seedDummyData()
    setJobs(loadedJobs)

    // Calculate stats
    const s = { total: loadedJobs.length, applied: 0, interview: 0, rejected: 0, offer: 0, saved: 0 }
    loadedJobs.forEach(job => {
      if (s[job.status] !== undefined) s[job.status]++
    })
    setStats(s)

    // Calculate monthly data (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const monthlyCounts = [0, 0, 0, 0, 0, 0]
    loadedJobs.forEach(job => {
      if (job.dateApplied) {
        const month = new Date(job.dateApplied).getMonth()
        if (month >= 0 && month < 6) monthlyCounts[month]++
      }
    })
    setMonthlyData({ labels: months, values: monthlyCounts })

    // Generate activities from jobs (sorted by createdAt desc)
    const sortedJobs = [...loadedJobs].sort((a, b) => b.createdAt - a.createdAt)
    const activityData = sortedJobs.slice(0, 15).map(job => ({
      id: job.id,
      company: job.company,
      action: job.status === 'saved' ? 'Saved job' : 
              job.status === 'applied' ? 'Applied to' :
              job.status === 'interview' ? 'Interview scheduled' :
              job.status === 'offer' ? 'Received offer from' :
              'Rejected by',
      status: job.status,
      timestamp: job.createdAt,
    }))
    setActivities(activityData)
  }, [])

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="text-secondary">Overview of your job search progress</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          label="Total Applications"
          value={stats.total}
          color="#011025"
          icon="total"
          trend={12}
          trendLabel="vs last month"
          delay={0}
        />
        <KPICard
          label="Applied"
          value={stats.applied}
          color="#5482B4"
          icon="applied"
          trend={8}
          trendLabel="vs last month"
          delay={0.05}
        />
        <KPICard
          label="Interview"
          value={stats.interview}
          color="#F59E0B"
          icon="interview"
          trend={25}
          trendLabel="vs last month"
          delay={0.1}
        />
        <KPICard
          label="Rejected"
          value={stats.rejected}
          color="#EF4444"
          icon="rejected"
          trend={-5}
          trendLabel="vs last month"
          delay={0.15}
        />
        <KPICard
          label="Offer"
          value={stats.offer}
          color="#10B981"
          icon="offer"
          trend={100}
          trendLabel="vs last month"
          delay={0.2}
        />
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <StatusPieChart data={stats} />
        <MonthlyBarChart data={monthlyData} />
      </div>

      {/* Activity Feed */}
      <div className="activity-section">
        <ActivityFeed activities={activities} />
      </div>
    </div>
  )
}

export default Dashboard
