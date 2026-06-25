import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'
import { useTheme } from '../context/ThemeContext.jsx'

function ResumePerformanceChart({ data }) {
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
      type: 'bar',
      data: {
        labels: data.labels || ['Resume V1', 'Resume V2', 'Resume V3'],
        datasets: [
          {
            label: 'Total Applications',
            data: data.total || [0, 0, 0],
            backgroundColor: '#7EA0C5',
            borderRadius: 6,
            barThickness: 24,
          },
          {
            label: 'Interviews',
            data: data.interviews || [0, 0, 0],
            backgroundColor: '#5482B4',
            borderRadius: 6,
            barThickness: 24,
          },
          {
            label: 'Offers',
            data: data.offers || [0, 0, 0],
            backgroundColor: '#10B981',
            borderRadius: 6,
            barThickness: 24,
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
              pointStyle: 'rectRounded',
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
              stepSize: 1,
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
        <h3 className="chart-title">Resume Performance</h3>
        <p className="chart-subtitle">Which resume gets more interviews?</p>
      </div>
      <div className="chart-body">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

export default ResumePerformanceChart
