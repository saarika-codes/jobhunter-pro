<div align="center">

# 🎯 JobHunter Pro

### AI-Powered Job Search Tracker

**A full-featured personal dashboard that helps job seekers manage their entire job search — from first application to final offer.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-jobhunter--pro--one.vercel.app-black?style=for-the-badge)](https://jobhunter-pro-one.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📸 Preview

> **[🔗 Try the live demo → jobhunter-pro-one.vercel.app](https://jobhunter-pro-one.vercel.app/)**

---

## 🧠 Why I Built This

Most job seekers track applications in messy spreadsheets with no structure, no analytics, and no way to spot patterns. JobHunter Pro replaces that with a clean, fast dashboard — built entirely on the frontend with zero backend required.

This project demonstrates:
- **React component architecture** at real-world scale (25+ components)
- **State management** with React Context + Local Storage persistence
- **Data visualization** with Chart.js across 4 chart types
- **Drag-and-drop UI** for Kanban board interactions
- **AI API integration** with Google Gemini
- **Responsive design** across desktop, tablet, and mobile

---

## ✨ Features

### 📊 Dashboard
- KPI cards — Total Applications, Applied, Interview, Rejected, Offer
- Status Distribution Pie Chart
- Applications Per Month Bar Chart
- Real-time Activity Feed

### 💼 Job Management (Full CRUD)
- Add, edit, delete job applications
- Search by company name or role
- Filter by status: Applied / Interview / Rejected / Offer
- Each card shows: Company, Role, Location, Salary, Status, Date Applied

### 🗂️ Kanban Board
- 5 columns: Saved → Applied → Interview → Offer → Rejected
- Drag and drop cards between columns
- Visual pipeline view of your entire job search

### 📈 Analytics Page
- Conversion rate line chart
- Resume performance comparison chart
- Month-over-month application tracking

### 📄 Resume Tracker
- Manage Resume V1, V2, V3
- Map each job application to the resume version used
- Identify which resume performs best

### 🎤 Interview Notes
- Store questions asked per company
- Record answers, feedback, and next round dates
- Build a personal interview knowledge base

### 🤖 AI Features (Gemini API)
- **AI Resume Match** — Paste a job description, get a match score + missing skills
- **AI Interview Questions** — Paste a job description, get 10 likely interview questions
- Demo mode works without an API key

### 🌙 Dark Mode
- System preference detection
- Manual toggle
- Fully themed across all pages

### 📱 Fully Responsive
- Desktop: full sidebar navigation
- Tablet: collapsed sidebar
- Mobile: bottom navigation bar

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 19 |
| Build Tool | Vite 6 |
| Routing | React Router v7 |
| Charts | Chart.js 4.4 + react-chartjs-2 |
| Styling | Pure CSS3 (no UI library) |
| State/Storage | React Context + Local Storage |
| AI Integration | Google Gemini API |
| Deployment | Vercel |

> **No Node.js. No Express. No MongoDB. No Redux. No TypeScript.**
> Built to demonstrate core React skills — exactly what SDE-1 interviews test.

---

## 📁 Project Structure

```
jobhunter-pro/
├── index.html
├── vite.config.js
├── vercel.json
├── .env.example
└── src/
    ├── App.jsx               
    ├── main.jsx
    ├── components/           
    │   ├── Sidebar.jsx
    │   ├── Navbar.jsx
    │   ├── MobileNav.jsx
    │   ├── KPICard.jsx
    │   ├── JobCard.jsx
    │   ├── JobForm.jsx
    │   ├── KanbanCard.jsx
    │   ├── KanbanColumn.jsx
    │   ├── AIMatchCard.jsx
    │   ├── AIQuestionsCard.jsx
    │   └── ...
    ├── pages/                
    │   ├── Dashboard.jsx
    │   ├── Jobs.jsx
    │   ├── AddJob.jsx
    │   ├── Analytics.jsx
    │   ├── Kanban.jsx
    │   ├── ResumeTracker.jsx
    │   ├── InterviewNotes.jsx
    │   └── Settings.jsx
    ├── context/
    │   └── ThemeContext.jsx   
    ├── utils/
    │   └── storage.js         
    └── styles/                
        ├── globals.css
        ├── animations.css
        ├── dashboard.css
        └── ...
```

---

### Enable AI Features (Optional)

1. Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env` file in the project root:
```
VITE_GEMINI_KEY=your_api_key_here
```
3. Restart the dev server

> Without the key, AI features run in **Demo Mode** with realistic mock responses — the app is fully usable without it.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deployed automatically via Vercel on every `git push`.

---

## 📦 What This Project Covers (SDE-1 Relevant)

| Concept | Implementation |
|---|---|
| Component Architecture | 25+ reusable components |
| Props & State | Across all pages and components |
| React Hooks | useState, useEffect, useContext, useRef |
| React Context API | Global theme (dark/light mode) |
| React Router | 8-page SPA with nested routes |
| CRUD Operations | Full create/read/update/delete for jobs |
| Local Storage | Full persistence without a backend |
| API Integration | Gemini API with async/await + error handling |
| Data Visualization | 4 Chart.js chart types |
| Responsive Design | CSS Grid + Flexbox, 3 breakpoints |
| Event Handling | Forms, drag-and-drop, search, filters |

---

## 👩‍💻 Author

**Sarika Kohli**

[![GitHub](https://img.shields.io/badge/GitHub-saarika--codes-181717?style=flat&logo=github)](https://github.com/saarika-codes)

---

## 📄 License

MIT — Built for portfolio and learning purposes. Feel free to use as inspiration for your own projects.

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

</div>
