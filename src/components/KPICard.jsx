import { useEffect, useState, useRef } from 'react'

function KPICard({ label, value, color, icon, trend, trendLabel, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(value, 10)
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    const duration = 800
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(eased * numericValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  const icons = {
    total: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9"/>
        <path d="M14 17H5"/>
        <circle cx="17" cy="17" r="3"/>
        <circle cx="7" cy="7" r="3"/>
      </svg>
    ),
    applied: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    interview: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    rejected: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    offer: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  }

  return (
    <div
      ref={cardRef}
      className={`kpi-card card-stagger ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="kpi-header">
        <div className="kpi-icon-wrapper" style={{ background: `${color}15`, color: color }}>
          {icons[icon] || icons.total}
        </div>
        {trend && (
          <span className={`kpi-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '+' : ''}{trend}%
            {trendLabel && <span className="trend-label">{trendLabel}</span>}
          </span>
        )}
      </div>
      <div className="kpi-value" style={{ color }}>
        <span className="mono">{displayValue}</span>
      </div>
      <div className="kpi-label">{label}</div>
    </div>
  )
}

export default KPICard
