# JobHunter Pro — AI-Powered Job Search Tracker

A personal dashboard for job seekers to manage applications, track interviews, store resumes, and analyze job search patterns.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![Tech Stack](https://img.shields.io/badge/Chart.js-4.4-green?logo=chart.js)

## Features

- **Dashboard** — KPI cards, status pie chart, monthly bar chart, activity feed
- **Jobs CRUD** — Add, edit, delete jobs with search & filter
- **Kanban Board** — Drag-and-drop between 5 status columns
- **Resume Tracker** — V1/V2/V3 management with job mapping
- **Interview Notes** — Record questions, answers, feedback, next rounds
- **Analytics** — Conversion metrics, resume performance comparison
- **AI Features** — Resume Match Score & Interview Questions (Gemini API)
- **Dark Mode** — System preference + manual toggle
- **Responsive** — Desktop sidebar, tablet collapsed, mobile bottom nav

## Tech Stack

- React 19 + Vite 6
- React Router v7
- Chart.js 4.4
- Local Storage (no backend needed)
- Gemini API (optional, demo mode works without key)

## Quick Start

```bash
# 1. Extract the zip file
# 2. Navigate to the project folder
cd jobhunter-pro

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

# 5. Open http://localhost:3000
```

## Enable Live AI (Optional)

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create `.env` file in project root:
   ```
   VITE_GEMINI_KEY=your_api_key_here
   ```
3. Restart the dev server

Without the key, AI features run in **Demo Mode** with realistic mock responses.

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy to Vercel, Netlify, or any static host.

## Project Structure

```
jobhunter-pro/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── MobileNav.jsx
│   │   ├── Layout.jsx
│   │   ├── KPICard.jsx
│   │   ├── StatusPieChart.jsx
│   │   ├── MonthlyBarChart.jsx
│   │   ├── ConversionLineChart.jsx
│   │   ├── ResumePerformanceChart.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── JobCard.jsx
│   │   ├── JobForm.jsx
│   │   ├── KanbanCard.jsx
│   │   ├── KanbanColumn.jsx
│   │   ├── ResumeVersionCard.jsx
│   │   ├── InterviewNoteCard.jsx
│   │   ├── AIMatchCard.jsx
│   │   └── AIQuestionsCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Jobs.jsx
│   │   ├── AddJob.jsx
│   │   ├── Analytics.jsx
│   │   ├── Kanban.jsx
│   │   ├── ResumeTracker.jsx
│   │   ├── InterviewNotes.jsx
│   │   └── Settings.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   └── storage.js
│   └── styles/
│       ├── globals.css
│       ├── animations.css
│       ├── dashboard.css
│       ├── jobs.css
│       ├── kanban.css
│       ├── resume.css
│       ├── interview.css
│       └── analytics.css
```

## Module Breakdown

| Module | Features Built |
|--------|---------------|
| Module 1 | React + Vite setup, Router, Sidebar, Navbar, Dark Mode, Responsive Layout, Animations |
| Module 2 | Dashboard KPIs, Pie Chart, Bar Chart, Activity Feed, 25 seeded jobs |
| Module 3 | Jobs CRUD, Add/Edit Form, Validation, Search, Filter, Card Grid |
| Module 4 | Kanban Board, Drag & Drop, 5 Columns, Column Search |
| Module 5 | Resume Tracker (V1/V2/V3), Job Mapping, Interview Notes, Q&A |
| Module 6 | Conversion Charts, Resume Performance, AI Match, AI Questions |

## License

MIT — Built for portfolio and learning purposes.
