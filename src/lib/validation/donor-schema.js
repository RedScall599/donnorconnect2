// Zod validation schemas for donor operations
import { z } from 'zod'

// DonorStatusEnum - must match Prisma enum: ACTIVE, LAPSED, INACTIVE, DO_NOT_CONTACT
export const DonorStatusEnum = z.enum(['ACTIVE', 'LAPSED', 'INACTIVE', 'DO_NOT_CONTACT'])

// RetentionRiskEnum - must match Prisma enum: UNKNOWN, LOW, MEDIUM, HIGH, CRITICAL
export const RetentionRiskEnum = z.enum(['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])


// createDonorSchema
export const createDonorSchema = z.object({
	firstName: z.string().max(50, 'First name must be at most 50 characters'),
	lastName: z.string().max(50, 'Last name must be at most 50 characters'),
	email: z.string().email('Invalid email address').optional(),
	phone: z.string().max(20).optional(),
	address: z.object({
		street: z.string().max(100).optional(),
		city: z.string().max(50).optional(),
		state: z.string().max(50).optional(),
		zip: z.string().max(20).optional()
	}).optional(),
	status: DonorStatusEnum.default('ACTIVE'),
	retentionRisk: RetentionRiskEnum.default('LOW'),
	notes: z.string().max(1000).optional()
})


// updateDonorSchema - all fields optional, must include id
export const updateDonorSchema = z.object({
	id: z.string(),
	firstName: z.string().max(50).optional(),
	lastName: z.string().max(50).optional(),
	email: z.string().email().optional(),
	phone: z.string().max(20).optional(),
	address: z.object({
		street: z.string().max(100).optional(),
		city: z.string().max(50).optional(),
		state: z.string().max(50).optional(),
		zip: z.string().max(20).optional()
	}).optional(),
	status: DonorStatusEnum.optional(),
	retentionRisk: RetentionRiskEnum.optional(),
	notes: z.string().max(1000).optional()
})


// donorListQuerySchema
export const donorListQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(20).optional(),
	search: z.string().optional(),
	status: DonorStatusEnum.optional(),
	retentionRisk: RetentionRiskEnum.optional(),
	sortBy: z.enum(['firstName', 'lastName', 'email', 'status', 'retentionRisk', 'totalAmount', 'totalGifts', 'lastGiftDate']).default('firstName').optional(),
	sortOrder: z.enum(['asc', 'desc']).default('asc').optional()
})