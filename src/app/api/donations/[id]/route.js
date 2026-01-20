// Donations API - Individual Operations
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request, { params }) {
  try {
    // TODO: Get donation by ID
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const { prisma } = await import('@/lib/db')
    const donation = await prisma.donation.findFirst({
      where: { id, donor: { organizationId: session.user.organizationId } },
      include: { donor: true, campaign: true }
    })
    if (!donation) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 })
    }
    return NextResponse.json({ donation })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function PATCH(request, { params }) {
  try {
    // TODO: Update donation
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const exists = await prisma.donation.findFirst({
      where: { id, donor: { organizationId: session.user.organizationId } },
      select: { id: true }
    })
    if (!exists) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 })
    }
    const updated = await prisma.donation.update({
      where: { id },
      data
    })
    return NextResponse.json({ donation: updated })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    // TODO: Delete donation
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const { prisma } = await import('@/lib/db')
    const exists = await prisma.donation.findFirst({
      where: { id, donor: { organizationId: session.user.organizationId } },
      select: { id: true }
    })
    if (!exists) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 })
    }
    await prisma.donation.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
