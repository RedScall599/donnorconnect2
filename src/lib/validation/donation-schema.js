// Zod validation schemas for donation operations
import { z } from 'zod'

// DonationTypeEnum - ONE_TIME, RECURRING, PLEDGE, IN_KIND
export const DonationTypeEnum = z.enum(['ONE_TIME', 'RECURRING', 'PLEDGE', 'IN_KIND'])


// createDonationSchema
export const createDonationSchema = z.object({
	donorId: z.string().cuid().optional(),
	firstName: z.string().min(1).max(50).optional(),
	lastName: z.string().min(1).max(50).optional(),
	campaignId: z.string().cuid().nullable().optional(),
	amount: z.coerce.number().positive('Amount must be positive'),
	date: z.coerce.date(),
	type: DonationTypeEnum.default('ONE_TIME'),
	method: z.string().max(50).nullable().optional(),
	notes: z.string().max(1000).nullable().optional()
}).refine(data => data.donorId || (data.firstName && data.lastName), {
	message: 'Either donorId or both firstName and lastName must be provided'
})


// updateDonationSchema - all fields optional, must include id
export const updateDonationSchema = z.object({
	id: z.string().cuid(),
	donorId: z.string().cuid().optional(),
	campaignId: z.string().cuid().nullable().optional(),
	amount: z.coerce.number().positive().optional(),
	date: z.coerce.date().optional(),
	type: DonationTypeEnum.optional(),
	method: z.string().max(50).nullable().optional(),
	notes: z.string().max(1000).nullable().optional()
})


// donationListQuerySchema (for filtering/querying donations)
export const donationListQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(20).optional(),
	donorId: z.string().cuid().optional(),
	campaignId: z.string().cuid().optional(),
	type: DonationTypeEnum.optional(),
	minAmount: z.coerce.number().positive().optional(),
	maxAmount: z.coerce.number().positive().optional(),
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
	search: z.string().max(100).optional()
})
