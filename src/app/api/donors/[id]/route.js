// Donors API - Individual Donor Operations
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request, { params }) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Get donor ID from params (await params)
    const { id } = params

    // TODO: Query single donor with related data
    const { prisma } = await import('@/lib/db')
    const donor = await prisma.donor.findUnique({
      where: { id, organizationId: session.user.organizationId },
      include: { donations: true }
    })
    // TODO: Return donor data or 404 if not found
    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 })
    }
    return NextResponse.json({ donor })
  } catch (error) {
    // TODO: Handle errors and return appropriate responses
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function PATCH(request, { params }) {
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
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: Get donor ID from params (await params)
    const { id } = params

    // TODO: Parse and validate request body
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)

    // TODO: Update donor in database
    const { prisma } = await import('@/lib/db')
    const donor = await prisma.donor.update({
      where: { id, organizationId: session.user.organizationId },
      data
    })

    // TODO: Return updated donor
    return NextResponse.json({ donor })
  } catch (error) {
    // TODO: Handle validation errors and other errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    // TODO: Get and validate session
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Check user permissions (ADMIN only)
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // TODO: Get donor ID from params (await params)
    const { id } = params

    // TODO: Delete donor from database
    const { prisma } = await import('@/lib/db')
    await prisma.donor.delete({
      where: { id, organizationId: session.user.organizationId }
    })

    // TODO: Return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    // TODO: Handle errors and return appropriate responses
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

