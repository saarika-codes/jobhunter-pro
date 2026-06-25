import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import MobileNav from './MobileNav.jsx'
import './Layout.css'

function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Navbar />
        <main className="main-content">
          <div className="page-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default Layout
