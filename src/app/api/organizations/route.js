// Organizations API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // Public: List all organizations (for registration)
    const { prisma } = await import('@/lib/db')
    const organizations = await prisma.organization.findMany({
      select: { id: true, name: true }
    })
    return NextResponse.json({ organizations })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    // Public: Allow creation of new organization for registration
    const { name } = await request.json()
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Organization name is required.' }, { status: 400 })
    }
    const { prisma } = await import('@/lib/db')
    // Prevent duplicate org names (case-insensitive)
    const existing = await prisma.organization.findFirst({
      where: { name: { equals: name.trim(), mode: 'insensitive' } }
    })
    if (existing) {
      return NextResponse.json({ organization: existing })
    }
    const organization = await prisma.organization.create({
      data: { name: name.trim() }
    })
    return NextResponse.json({ organization })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
