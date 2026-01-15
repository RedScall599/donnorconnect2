// Segments API - Individual Operations
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request, { params }) {
  try {
    // TODO: Get segment by ID
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const { prisma } = await import('@/lib/db')
    const segment = await prisma.segment.findUnique({
      where: { id, organizationId: session.user.organizationId }
    })
    if (!segment) {
      return NextResponse.json({ error: 'Segment not found' }, { status: 404 })
    }
    return NextResponse.json({ segment })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function PATCH(request, { params }) {
  try {
    // TODO: Update segment
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const updated = await prisma.segment.update({
      where: { id, organizationId: session.user.organizationId },
      data
    })
    return NextResponse.json({ segment: updated })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function DELETE(request, { params }) {
  try {
    // TODO: Delete segment
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = params
    const { prisma } = await import('@/lib/db')
    await prisma.segment.delete({
      where: { id, organizationId: session.user.organizationId }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
