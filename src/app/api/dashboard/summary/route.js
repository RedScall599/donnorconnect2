import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { prisma } = await import('@/lib/db')
    // Get Hope Foundation org for sample data
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId

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

    // Calculate donation amounts by month (last 12 months)
    const donationHistory = []
    const labels = []
    const now = new Date()
    
    for (let i = 11; i >= 0; i--) {
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59)
      labels.push(startDate.toLocaleString('default', { month: 'short' }))
      
      // Get total donation amount for this month
      const monthTotal = await prisma.donation.aggregate({
        where: {
          donor: { organizationId: orgId },
          date: {
            gte: startDate,
            lte: endDate
          }
        },
        _sum: { amount: true }
      })
      
      donationHistory.push(monthTotal._sum.amount || 0)
    }

    return NextResponse.json({
      totalDonors,
      totalDonations,
      totalAmount,
      atRiskDonors,
      retentionRate,
      donationHistory,
      labels
    })
  } catch (err) {
    console.error('Dashboard summary error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
