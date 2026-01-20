// Campaigns API - Individual Operations
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request, { params }) {
  try {
    // TODO: Get and validate session, get campaign by ID
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const { prisma } = await import('@/lib/db')
    const campaign = await prisma.campaign.findUnique({
      where: { id, organizationId: session.user.organizationId }
    })
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }
    return NextResponse.json({ campaign })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function PATCH(request, { params }) {
  try {
    // TODO: Update campaign with validation
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const updated = await prisma.campaign.update({
      where: { id, organizationId: session.user.organizationId },
      data
    })
    return NextResponse.json({ campaign: updated })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    // TODO: Delete campaign (ADMIN only)
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const { id } = await params
    const { prisma } = await import('@/lib/db')
    await prisma.campaign.delete({
      where: { id, organizationId: session.user.organizationId }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
