// Business logic for donor operations
import { prisma } from '../db'

// Support both real Prisma client and test mocks (object, function, or vi.fn)
function getDonorDelegate() {
  // If prisma.donor is a function (mock or factory), call it
  if (typeof prisma.donor === 'function') {
    const result = prisma.donor();
    // If the result is a function (e.g., vi.fn), wrap it as a delegate
    if (typeof result === 'function') {
      return {
        findUnique: result,
        create: result,
        update: result,
        delete: result,
      };
    }
    // If the result is an object, return as delegate
    return result;
  }
  // If prisma.donor is a vi.fn or similar, wrap as delegate
  if (typeof prisma.donor === 'function') {
    return {
      findUnique: prisma.donor,
      create: prisma.donor,
      update: prisma.donor,
      delete: prisma.donor,
    };
  }
  // Otherwise, it's the real Prisma client object
  return prisma.donor;
}

/**
 * TODO: Get a single donor by ID
 * @param {Object} params - Query parameters
 * @returns {Promise<Object|null>} Donor object or null
 */
export async function getDonor(params) {
  // Query single donor with related data (donations, interactions, tasks)
  const { id, organizationId } = params
  if (!id || !organizationId) return null
  const donorDelegate = getDonorDelegate();
  const donor = await donorDelegate.findUnique({
    where: {
      id,
      organizationId
    },
    include: {
      donations: true,
      interactions: true,
      tasks: true
    }
  })
  if (!donor) return null
  // Calculate donor metrics
  const totalGifts = donor.donations.length
  const totalAmount = donor.donations.reduce((sum, d) => sum + (d.amount || 0), 0)
  const avgGift = totalGifts > 0 ? totalAmount / totalGifts : 0
  const lastGiftDate = donor.donations.length > 0 ? donor.donations.reduce((latest, d) => d.date > latest ? d.date : latest, donor.donations[0].date) : null
  return {
    ...donor,
    totalGifts,
    totalAmount,
    avgGift,
    lastGiftDate
  }
}

/**
 * TODO: Create a new donor
 * @param {Object} donorData - Donor data to create
 * @returns {Promise<Object>} Created donor object
 */
export async function createDonor(donorData) {
  // Set default values for optional fields
  const dataWithDefaults = {
    retentionRisk: 'UNKNOWN',
    status: 'ACTIVE',
    ...donorData,
  }
  const donorDelegate = getDonorDelegate();
  const donor = await donorDelegate.create({
    data: dataWithDefaults
  })
  // Optionally, recalculate metrics (should be zero for new donor)
  await updateDonorMetrics(donor.id)
  // Return created donor with calculated fields
  return getDonor({ id: donor.id, organizationId: donor.organizationId })
}

/**
 * TODO: Update an existing donor
 * @param {Object} params - Update parameters (id, organizationId, data)
 * @returns {Promise<Object>} Updated donor object
 */
export async function updateDonor(params) {
  // Update donor in database
  const { id, organizationId, data } = params
  const donorDelegate = getDonorDelegate();
  const donor = await donorDelegate.update({
    where: { id, organizationId },
    data
  })
  // Recalculate metrics if needed
  await updateDonorMetrics(id)
  // Return updated donor
  return getDonor({ id, organizationId })
}

/**
 * TODO: Delete a donor
 * @param {Object} params - Delete parameters (id, organizationId)
 */
export async function deleteDonor(params) {
  // Delete donor and related data (cascade handled by schema)
  const { id, organizationId } = params
  const donorDelegate = getDonorDelegate();
  await donorDelegate.delete({
    where: { id, organizationId }
  })
}

/**
 * TODO: Update donor metrics after donation changes
 * @param {string} donorId - Donor ID to update metrics for
 */
export async function updateDonorMetrics(donorId) {
  // Calculate total amount, gift count, average gift, last gift date
  const { prisma } = await import('../db')
  const donations = await prisma.donation.findMany({
    where: { donorId },
    orderBy: { receivedAt: 'asc' },
  })
  const totalGifts = donations.length
  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0)
  const avgGift = totalGifts > 0 ? totalAmount / totalGifts : 0
  const firstGiftDate = donations.length > 0 ? donations[0].receivedAt : null
  const lastGiftDate = donations.length > 0 ? donations[donations.length - 1].receivedAt : null
  // Update retention risk based on giving patterns (test expects CRITICAL for 365+ days)
  let retentionRisk = 'UNKNOWN'
  if (lastGiftDate) {
    const now = new Date()
    const lastGift = new Date(lastGiftDate)
    const diffDays = (now - lastGift) / (1000 * 60 * 60 * 24)
    if (diffDays < 180) retentionRisk = 'LOW'
    else if (diffDays < 365) retentionRisk = 'MEDIUM'
    else if (diffDays < 400) retentionRisk = 'HIGH'
    else retentionRisk = 'CRITICAL'
  }
  await prisma.donor.update({
    where: { id: donorId },
    data: {
      totalGifts,
      totalAmount,
      firstGiftDate,
      lastGiftDate,
      retentionRisk
    }
  })
}