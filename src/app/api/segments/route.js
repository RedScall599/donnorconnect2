// Segments API - List and Create
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(request) {
  try {
    // TODO: List segments with filtering
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { prisma } = await import('@/lib/db')
    
    // Get Hope Foundation org for demo data
    const demoOrg = await prisma.organization.findFirst({ where: { name: 'Hope Foundation' } })
    const orgId = demoOrg?.id || session.user.organizationId
    
    const segments = await prisma.segment.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' }
    })
    
    // Calculate member counts dynamically based on segment rules
    const segmentsWithCounts = await Promise.all(segments.map(async (segment) => {
      let count = 0
      
      // Parse the rules to determine which donors match
      try {
        const rules = segment.rules
        
        // Build dynamic query based on rules
        const where = { organizationId: orgId }
        
        // Handle rule format: { field, operator, value }
        if (rules && rules.field) {
          const { field, operator, value } = rules
          
          if (field === 'totalGifts' && operator === 'equals') {
            where.totalGifts = value
          } else if (field === 'retentionRisk' && operator === 'in') {
            where.retentionRisk = { in: value }
          } else if (field === 'totalAmount' && operator === 'greaterThan') {
            where.totalAmount = { gte: value }
          } else if (field === 'status' && operator === 'equals') {
            where.status = value
          }
        }
        
        count = await prisma.donor.count({ where })
      } catch (error) {
        console.error('Error calculating segment count:', error)
      }
      
      return {
        ...segment,
        memberCount: count
      }
    }))
    
    return NextResponse.json({ segments: segmentsWithCounts })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    // TODO: Create segment
    const sessionToken = request.cookies.get('session')?.value
    const session = await getSession(sessionToken)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const data = await request.json()
    // Optionally: validate data here (e.g., with Zod)
    const { prisma } = await import('@/lib/db')
    const segment = await prisma.segment.create({
      data: {
        ...data,
        organizationId: session.user.organizationId
      }
    })
    return NextResponse.json({ segment })
  } catch (error) {
    // TODO: Handle errors
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
