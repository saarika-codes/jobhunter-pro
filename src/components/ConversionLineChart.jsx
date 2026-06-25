import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'
import { useTheme } from '../context/ThemeContext.jsx'

function ConversionLineChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!chartRef.current) return

    const isDark = theme === 'dark'
    const textColor = isDark ? '#CBD5E1' : '#475569'
    const gridColor = isDark ? '#334155' : '#E2E8F0'

    const ctx = chartRef.current.getContext('2d')

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 300)
    gradient1.addColorStop(0, 'rgba(84, 130, 180, 0.3)')
    gradient1.addColorStop(1, 'rgba(84, 130, 180, 0.0)')

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 300)
    gradient2.addColorStop(0, 'rgba(16, 185, 129, 0.3)')
    gradient2.addColorStop(1, 'rgba(16, 185, 129, 0.0)')

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Applications',
            data: data.applied || [0, 0, 0, 0],
            borderColor: '#5482B4',
            backgroundColor: gradient1,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#5482B4',
            pointBorderColor: isDark ? '#1E293B' : '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
          {
            label: 'Interviews',
            data: data.interviews || [0, 0, 0, 0],
            borderColor: '#10B981',
            backgroundColor: gradient2,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: isDark ? '#1E293B' : '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: textColor,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
            titleColor: isDark ? '#F8FAFC' : '#0F172A',
            bodyColor: isDark ? '#CBD5E1' : '#475569',
            borderColor: gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor,
              drawBorder: false,
            },
            ticks: {
              color: textColor,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              stepSize: 2,
              padding: 8,
            },
            border: {
              display: false,
            },
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, theme])

  return (
    <div className="chart-card card">
      <div className="chart-header">
        <h3 className="chart-title">Application to Interview Trend</h3>
        <p className="chart-subtitle">Track your conversion rate over time</p>
      </div>
      <div className="chart-body">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default ConversionLineChart
