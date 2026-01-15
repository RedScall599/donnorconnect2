import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { prisma } = await import('@/lib/db')
    const orgId = session.user.organizationId

    const recent = await prisma.donation.findMany({
      where: { donor: { organizationId: orgId } },
      include: { donor: true },
      orderBy: { date: 'desc' },
      take: 6
    })

    const out = recent.map(d => ({
      id: d.id,
      amount: d.amount,
      date: d.date,
      donorId: d.donorId,
      donorName: `${d.donor.firstName} ${d.donor.lastName}`,
      donorEmail: d.donor.email
    }))

    return NextResponse.json({ recent: out })
  } catch (err) {
    console.error('Recent activity error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
