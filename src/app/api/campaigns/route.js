// Campaigns API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { ensureDefaultCampaignsForOrg, listCampaigns } from '@/lib/api/campaigns'

export async function GET(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Parse query parameters for filtering/pagination
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)
    const skip = (page - 1) * pageSize
    const take = pageSize

    // Get Hope Foundation org for sample data
    const { prisma } = await import('@/lib/db')
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId

    // Query campaigns with donations and donors
    const campaigns = await prisma.campaign.findMany({
      where: { organizationId: orgId },
      include: {
        donations: {
          include: {
            donor: true
          }
        }
      },
      skip,
      take
    })

    const total = await prisma.campaign.count({ where: { organizationId: orgId } })

    // Calculate totals and format donor info
    const campaignsWithTotals = campaigns.map(campaign => {
      const totalRaised = campaign.donations.reduce((sum, d) => sum + d.amount, 0)
      const donorsList = campaign.donations.map(d => ({
        name: `${d.donor.firstName} ${d.donor.lastName}`,
        amount: d.amount,
        date: d.date
      }))
      return {
        ...campaign,
        totalRaised,
        donorsList,
        donorCount: donorsList.length
      }
    })

    return NextResponse.json({ campaigns: campaignsWithTotals, total, page, pageSize })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Check permissions (ADMIN, STAFF, MARKETING)
    const allowedRoles = ['ADMIN', 'STAFF', 'MARKETING']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: Parse and validate request body
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)

    // TODO: Create campaign
    const { prisma } = await import('@/lib/db')
    const campaign = await prisma.campaign.create({
      data: {
        ...data,
        organizationId: session.user.organizationId
      }
    })

    // TODO: Return created campaign
    return NextResponse.json({ campaign })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
