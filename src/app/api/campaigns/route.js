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

    // Query campaigns for organization; if empty, auto-seed defaults for this org
    let { campaigns, total } = await listCampaigns({
      organizationId: session.user.organizationId,
      skip,
      take
    })
    if (total === 0) {
      await ensureDefaultCampaignsForOrg(session.user.organizationId)
      ;({ campaigns, total } = await listCampaigns({
        organizationId: session.user.organizationId,
        skip,
        take
      }))
    }

    return NextResponse.json({ campaigns, total, page, pageSize })
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
