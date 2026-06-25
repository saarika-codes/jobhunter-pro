import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'
import { useTheme } from '../context/ThemeContext.jsx'

function MonthlyBarChart({ data }) {
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

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(84, 130, 180, 0.8)')
    gradient.addColorStop(1, 'rgba(84, 130, 180, 0.15)')

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Applications',
          data: data.values || [0, 0, 0, 0, 0, 0],
          backgroundColor: gradient,
          borderColor: '#5482B4',
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 32,
          maxBarThickness: 40,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
            titleColor: isDark ? '#F8FAFC' : '#0F172A',
            bodyColor: isDark ? '#CBD5E1' : '#475569',
            borderColor: gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              label: (context) => ` ${context.raw} applications`,
            },
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
              stepSize: 5,
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
        <h3 className="chart-title">Applications Per Month</h3>
        <p className="chart-subtitle">Track your application velocity</p>
      </div>
      <div className="chart-body">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default MonthlyBarChart
