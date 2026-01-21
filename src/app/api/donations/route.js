// Donations API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { createDonationSchema } from '@/lib/validation/donation-schema'

export async function GET(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (!session.user || !session.user.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Query donations with filtering/pagination
    const searchParams = request.nextUrl?.searchParams ?? new URL(request.url).searchParams
    const pageRaw = searchParams.get('page') || '1'
    const pageSizeRaw = searchParams.get('pageSize') || '20'
    const page = Number.isFinite(Number(pageRaw)) ? parseInt(pageRaw, 10) : 1
    const pageSize = Number.isFinite(Number(pageSizeRaw)) ? parseInt(pageSizeRaw, 10) : 20
    const skip = (page - 1) * pageSize
    const take = pageSize

    const { prisma } = await import('@/lib/db')
    // Get Hope Foundation org for sample data
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId
    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where: { donor: { organizationId: orgId } },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { donor: true, campaign: true }
      }),
      prisma.donation.count({ where: { donor: { organizationId: orgId } } })
    ])

    // TODO: Return donations list
    return NextResponse.json({ donations, total, page, pageSize })
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

    // TODO: Check permissions (ADMIN, STAFF)
    const allowedRoles = ['ADMIN', 'STAFF']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate request body against schema
    const body = await request.json()
    const parsed = createDonationSchema.safeParse(body)
    if (!parsed.success) {
      const details = parsed.error.flatten()
      return NextResponse.json({ error: 'Validation error', details }, { status: 400 })
    }

    const input = parsed.data
    const { prisma } = await import('@/lib/db')

    // Get Hope Foundation org for demo data consistency
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId

    // Find or create donor by first/last name
    let donor
    if (input.firstName && input.lastName) {
      // Try to find existing donor with this name
      donor = await prisma.donor.findFirst({
        where: { 
          firstName: input.firstName,
          lastName: input.lastName,
          organizationId: orgId 
        }
      })
      
      // If not found, create new donor
      if (!donor) {
        donor = await prisma.donor.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            organizationId: orgId,
            status: 'ACTIVE'
          }
        })
      }
    } else if (input.donorId) {
      // Fallback to donorId if provided (for backward compatibility)
      donor = await prisma.donor.findFirst({
        where: { id: input.donorId, organizationId: orgId }
      })
    }
    
    if (!donor) {
      return NextResponse.json({ error: 'Invalid donor information' }, { status: 400 })
    }

    // If campaignId provided, ensure campaign belongs to org
    let campaignId = input.campaignId ?? null
    if (campaignId) {
      const campaign = await prisma.campaign.findFirst({
        where: { id: campaignId, organizationId: donor.organizationId },
        select: { id: true }
      })
      if (!campaign) {
        return NextResponse.json({ error: 'Invalid campaign for organization' }, { status: 400 })
      }
    }

    // Create donation with allowed fields only
    const donationCreateData = {
      donorId: donor.id,
      campaignId,
      amount: input.amount,
      date: input.date,
      type: input.type,
      method: input.method ?? null,
      notes: input.notes ?? null
    }

    const created = await prisma.donation.create({ data: donationCreateData })

    // Update donor metrics (totalAmount, totalGifts, lastGiftDate, firstGiftDate if first gift)
    const donorMetricsUpdate = {
      totalAmount: { increment: created.amount },
      totalGifts: { increment: 1 },
      lastGiftDate: created.date
    }
    if (!donor.firstGiftDate && donor.totalGifts === 0) {
      donorMetricsUpdate.firstGiftDate = created.date
    }
    await prisma.donor.update({ where: { id: donor.id }, data: donorMetricsUpdate })

    // Return created donation with relations
    const donation = await prisma.donation.findUnique({
      where: { id: created.id },
      include: { donor: true, campaign: true }
    })
    return NextResponse.json({ donation }, { status: 201 })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

