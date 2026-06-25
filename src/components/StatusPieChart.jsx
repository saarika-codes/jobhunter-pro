import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'
import { useTheme } from '../context/ThemeContext.jsx'

function StatusPieChart({ data }) {
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

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Applied', 'Interview', 'Offer', 'Rejected', 'Saved'],
        datasets: [{
          data: [
            data.applied || 0,
            data.interview || 0,
            data.offer || 0,
            data.rejected || 0,
            data.saved || 0,
          ],
          backgroundColor: [
            '#5482B4',
            '#F59E0B',
            '#10B981',
            '#EF4444',
            '#64748B',
          ],
          borderColor: isDark ? '#1E293B' : '#FFFFFF',
          borderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              color: textColor,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
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
            callbacks: {
              label: (context) => {
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? Math.round((context.raw / total) * 100) : 0
                return ` ${context.label}: ${context.raw} (${percentage}%)`
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: false,
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
        <h3 className="chart-title">Status Distribution</h3>
        <p className="chart-subtitle">Breakdown of your applications</p>
      </div>
      <div className="chart-body">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default StatusPieChart
