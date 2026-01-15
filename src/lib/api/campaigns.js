// Business logic for campaign operations
import { prisma } from '../db'

/**
 * Ensure an organization has baseline demo campaigns.
 * Idempotent: only seeds when the org currently has zero campaigns.
 * @param {string} organizationId
 * @returns {Promise<number>} number of campaigns created
 */
export async function ensureDefaultCampaignsForOrg(organizationId) {
  if (!organizationId) return 0
  const existing = await prisma.campaign.count({ where: { organizationId } })
  if (existing > 0) return 0

  const now = new Date()
  const created = await prisma.$transaction([
    prisma.campaign.create({
      data: {
        organizationId,
        name: 'Year-End Appeal',
        description: 'December giving push for general fund',
        goal: 50000,
        startDate: new Date(now.getFullYear(), 10, 15), // Nov 15
        endDate: new Date(now.getFullYear(), 11, 31),   // Dec 31
        type: 'Annual Fund',
        status: 'ACTIVE'
      }
    }),
    prisma.campaign.create({
      data: {
        organizationId,
        name: 'Monthly Giving',
        description: 'Recurring donor program',
        goal: 25000,
        startDate: new Date(now.getFullYear(), 0, 1),
        endDate: null,
        type: 'Recurring',
        status: 'ACTIVE'
      }
    }),
    prisma.campaign.create({
      data: {
        organizationId,
        name: 'Spring Gala',
        description: 'Annual fundraising event',
        goal: 40000,
        startDate: new Date(now.getFullYear(), 3, 1), // Apr 1
        endDate: new Date(now.getFullYear(), 4, 15),  // May 15
        type: 'Event',
        status: 'COMPLETED'
      }
    })
  ])

  return created.length
}

/**
 * List campaigns for an organization with pagination.
 */
export async function listCampaigns({ organizationId, skip = 0, take = 20 }) {
  if (!organizationId) return { campaigns: [], total: 0 }
  const [campaigns, total] = await Promise.all([
    prisma.campaign.findMany({
      where: { organizationId },
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.campaign.count({ where: { organizationId } })
  ])
  return { campaigns, total }
}
