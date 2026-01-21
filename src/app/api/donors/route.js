// Donors API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters (page, limit, search, status, retentionRisk, etc.)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('limit') || '20', 10)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || undefined
    const retentionRisk = searchParams.get('retentionRisk') || undefined
    const skip = (page - 1) * pageSize
    const take = pageSize

    // Query donors with filtering and pagination
    const { prisma } = await import('@/lib/db')
    // Get Hope Foundation org for sample data
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId
    const where = {
      organizationId: orgId,
      ...(search
        ? {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          }
        : {}),
      ...(status ? { status } : {}),
      ...(retentionRisk ? { retentionRisk } : {}),
    }
    const [donors, total] = await Promise.all([
      prisma.donor.findMany({
        where,
        skip,
        take,
        orderBy: { lastGiftDate: 'desc' }
      }),
      prisma.donor.count({ where })
    ])

    // Return donors list with pagination info
    return NextResponse.json({ donors, total, page, pageSize })
  } catch (error) {
    // TODO: Handle errors and return 500 response
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

    // TODO: Check user permissions (ADMIN, STAFF)
    const allowedRoles = ['ADMIN', 'STAFF']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ error: 'User lacks permission' }, { status: 403 })
    }

    // Parse and validate request body
    const data = await request.json()
    const { createDonorSchema } = await import('@/lib/validation/donor-schema')
    const parseResult = createDonorSchema.safeParse(data)
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.errors.map(e => e.message).join(', ') }, { status: 400 })
    }
    // Use only Zod-validated data and map to Prisma fields
    const validData = parseResult.data
    const { firstName, lastName, email, phone, address, status, retentionRisk } = validData

    // Create donor in database, ensure defaults and flatten address
    const { prisma } = await import('@/lib/db')
    const donor = await prisma.donor.create({
      data: {
        firstName,
        lastName,
        email: email ?? null,
        phone: phone ?? null,
        address: address?.street ?? null,
        city: address?.city ?? null,
        state: address?.state ?? null,
        zipCode: address?.zip ?? null,
        status: status ?? 'ACTIVE',
        retentionRisk: retentionRisk ?? 'LOW',
        organizationId: session.user.organizationId
      }
    })
    // Return created donor
    return NextResponse.json({ donor }, { status: 201 })
  } catch (error) {
    // TODO: Handle validation errors and other errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
