"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import RetentionChart from '@/components/charts/retention-chart'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState(null)
  const [recent, setRecent] = useState([])
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const [sRes, rRes, uRes] = await Promise.all([
          fetch('/api/dashboard/summary'),
          fetch('/api/activity/recent'),
          fetch('/api/auth/session')
        ])
        const sData = await sRes.json()
        const rData = await rRes.json()
        const uData = await uRes.json()
        if (!sRes.ok) throw new Error(sData.error || 'Failed to load summary')
        if (!rRes.ok) console.warn('Recent activity load warning:', rData.error)
        if (mounted) {
          setMetrics(sData)
          setRecent(rData.recent || [])
          setUserRole(uData.user?.role)
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-3" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</h1>
            <p className="text-lg" style={{ color: 'hsl(var(--foreground))' }}>Core metrics and recent activity to track your donor retention efforts</p>
          </div>
          {userRole !== 'ADMIN' && (
            <Link href="/donations/new" className="px-6 py-3 rounded-lg font-semibold text-base transition-all hover:-translate-y-0.5 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))', color: 'hsl(var(--warm-ivory))', boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)' }}>
              <span className="text-xl">💝</span>
              Make a Donation
            </Link>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${userRole === 'ADMIN' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Donors</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{metrics.totalDonors}</div>
        </div>
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Donations</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--accent))' }}>{metrics.totalDonations}</div>
        </div>
        {userRole === 'ADMIN' && (
          <div className="card text-center">
            <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>At-Risk Donors</div>
            <div className="text-4xl font-bold" style={{ color: 'hsl(var(--secondary))' }}>{metrics.atRiskDonors}</div>
          </div>
        )}
        <div className="card text-center">
          <div className="text-lg font-semibold mb-3" style={{ color: 'hsl(var(--primary))' }}>Total Raised</div>
          <div className="text-4xl font-bold" style={{ color: 'hsl(var(--muted-gold))' }}>${metrics.totalAmount?.toLocaleString?.() ?? 0}</div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-end justify-between mb-4">
          <div className="text-2xl font-bold" style={{ color: 'hsl(var(--primary))' }}>Monthly Donations</div>
          <div className="text-5xl font-bold" style={{ color: 'hsl(var(--accent))' }}>${(metrics.donationHistory?.[11] || 0).toLocaleString()}</div>
        </div>
        <p className="text-base mb-6" style={{ color: 'hsl(var(--foreground))' }}>Total donation amounts received over the last 12 months</p>
        <div className="p-6 rounded-xl" style={{ background: 'hsl(var(--cream-beige))' }}>
          <div className="h-64">
            <RetentionChart 
              data={metrics.donationHistory} 
              labels={metrics.labels} 
              seriesLabel="Monthly donation amount ($)"
              formatValue={(val) => `$${Math.round(val).toLocaleString()}`}
              yTickValues={[0, 500, 1000, 1500, 2000, 3000]}
              height={220}
            />
          </div>
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
                  {userRole === 'ADMIN' && <div className="text-sm mt-1" style={{ color: 'hsl(var(--foreground))' }}>{item.donorEmail}</div>}
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