import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Jobs from './pages/Jobs.jsx'
import AddJob from './pages/AddJob.jsx'
import Analytics from './pages/Analytics.jsx'
import ResumeTracker from './pages/ResumeTracker.jsx'
import InterviewNotes from './pages/InterviewNotes.jsx'
import Kanban from './pages/Kanban.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="edit-job/:id" element={<AddJob />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="resume-tracker" element={<ResumeTracker />} />
          <Route path="interview-notes" element={<InterviewNotes />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
