import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { prisma } = await import('@/lib/db')
    const orgId = session.user.organizationId

    // Fetch counts and totals
    const [totalDonors, totalDonations, totalAmount, atRiskDonors] = await Promise.all([
      prisma.donor.count({ where: { organizationId: orgId } }),
      prisma.donation.count({ where: { donor: { organizationId: orgId } } }),
      prisma.donation.aggregate({ where: { donor: { organizationId: orgId } }, _sum: { amount: true } }).then(r => r._sum.amount || 0),
      prisma.donor.count({ where: { organizationId: orgId, retentionRisk: { in: ['HIGH', 'CRITICAL'] } } })
    ])

    // Retention: simple example — percentage of donors with more than 1 gift
    const donorsWithMultiple = await prisma.donor.count({ where: { organizationId: orgId, totalGifts: { gte: 2 } } })
    const retentionRate = totalDonors > 0 ? donorsWithMultiple / totalDonors : 0

    // Optional: return small retention history (last 12 months) — placeholder calculation
    const retentionHistory = []
    const labels = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      labels.push(d.toLocaleString('default', { month: 'short' }))
      // Placeholder: use retentionRate as flat series for now
      retentionHistory.push(retentionRate)
    }

    return NextResponse.json({
      totalDonors,
      totalDonations,
      totalAmount,
      atRiskDonors,
      retentionRate,
      retentionHistory,
      labels
    })
  } catch (err) {
    console.error('Dashboard summary error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
