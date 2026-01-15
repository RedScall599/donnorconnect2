// Zod validation schemas for campaign operations
import { z } from 'zod'

// CampaignStatusEnum - DRAFT, ACTIVE, PAUSED, COMPLETED
export const CampaignStatusEnum = z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'])


// createCampaignSchema
export const createCampaignSchema = z.object({
	name: z.string().max(100, 'Name must be at most 100 characters'),
	description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
	goalAmount: z.number().positive('Goal amount must be positive').optional(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().optional(),
	status: CampaignStatusEnum.default('DRAFT')
})


// updateCampaignSchema (all fields optional except id)
export const updateCampaignSchema = z.object({
	id: z.string(),
	name: z.string().max(100).optional(),
	description: z.string().max(1000).optional(),
	goalAmount: z.number().positive().optional(),
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
	status: CampaignStatusEnum.optional()
})

// campaignListQuerySchema (for filtering/querying campaigns)
export const campaignListQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(20).optional(),
	status: CampaignStatusEnum.optional(),
	search: z.string().max(100).optional()
})