// Zod validation schemas for segment operations
import { z } from 'zod'


// createSegmentSchema
export const createSegmentSchema = z.object({
	name: z.string().max(100, 'Name must be at most 100 characters'),
	description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
	rules: z.any(), // JSON structure for segment rules
})

// updateSegmentSchema (all fields optional except id)
export const updateSegmentSchema = z.object({
	id: z.string(),
	name: z.string().max(100).optional(),
	description: z.string().max(1000).optional(),
	rules: z.any().optional(),
})

// segmentListQuerySchema (for filtering/querying segments)
export const segmentListQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(20).optional(),
	search: z.string().max(100).optional(),
})