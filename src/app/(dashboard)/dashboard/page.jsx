"use client"
import { useEffect, useState } from 'react'
import RetentionChart from '@/components/charts/retention-chart'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState(null)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [sRes, rRes] = await Promise.all([
          fetch('/api/dashboard/summary'),
          fetch('/api/activity/recent')
        ])
        const sData = await sRes.json()
        const rData = await rRes.json()
        if (!sRes.ok) throw new Error(sData.error || 'Failed to load summary')
        if (!rRes.ok) console.warn('Recent activity load warning:', rData.error)
        if (mounted) {
          setMetrics(sData)
          setRecent(rData.recent || [])
        }
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message)
      }
    }
    load()
    return () => { mounted = false }
  }, [])
  // TODO: Render dashboard cards with key metrics
  // TODO: Add charts/visualizations for retention data
  // TODO: Show recent activity and alerts

  if (error) return <div className="card" style={{ background: 'hsl(var(--destructive))', color: 'hsl(var(--destructive-foreground))' }}>Error: {error}</div>
  if (!metrics) return <div className="card text-center text-lg font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Loading dashboard metrics...</div>

  return (
    <div className="space-y-8 pb-16 lg:pb-0">
      <div className="card">
        <h1 className="text-5xl font-bold mb-3" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</h1>
        <p className="text-lg" style={{ color: 'hsl(var(--foreground))' }}>Core metrics and recent activity to track your donor retention efforts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Donors</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{metrics.totalDonors}</div>
        </div>
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Donations</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{metrics.totalDonations}</div>
        </div>
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>At-Risk Donors</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--secondary))' }}>{metrics.atRiskDonors}</div>
        </div>
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Raised</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--muted-gold))' }}>${metrics.totalAmount?.toLocaleString?.() ?? 0}</div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-end justify-between mb-4">
          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>Retention Rate</div>
          <div className="text-5xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{(metrics.retentionRate * 100).toFixed(1)}%</div>
        </div>
        <p className="text-base mb-6" style={{ color: 'hsl(var(--foreground))' }}>Monthly donor retention over the last 12 months</p>
        <div className="p-4 rounded-xl" style={{ background: 'hsl(var(--cream-beige))' }}>
          <RetentionChart data={metrics.retentionHistory} labels={metrics.labels} seriesLabel="Monthly retention rate" />
        </div>
      </div>

      <div className="card">
        <div className="text-2xl font-bold mb-6" style={{ color: 'hsl(var(--primary))' }}>Recent Activity</div>
        {recent.length === 0 ? (
          <div className="text-center py-8 text-lg" style={{ color: 'hsl(var(--foreground))' }}>No recent donations to display.</div>
        ) : (
          <div className="space-y-3">
            {recent.map(item => (
              <div key={item.id} className="activity-item flex items-center justify-between p-4 rounded-xl transition-all duration-200">
                <div>
                  <div className="font-semibold text-base">
                    <a href={`/donors/${item.donorId}`} className="activity-link">{item.donorName}</a>
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'hsl(var(--foreground))' }}>{item.donorEmail}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: 'hsl(var(--secondary))' }}>${item.amount.toFixed(2)}</div>
                  <div className="text-sm mt-1" style={{ color: 'hsl(var(--foreground))' }}>{new Date(item.date).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Helpers
function getLast12MonthLabels() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const now = new Date()
  const out = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    out.push(months[d.getMonth()])
  }
  return out
}