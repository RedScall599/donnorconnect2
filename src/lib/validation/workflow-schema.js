// Zod validation schemas for workflow operations
import { z } from 'zod'


// WorkflowTriggerEnum
export const WorkflowTriggerEnum = z.enum([
	'FIRST_DONATION',
	'DONATION_RECEIVED',
	'INACTIVITY_THRESHOLD',
	'SEGMENT_ENTRY',
	'MANUAL',
	'SCHEDULED'
])

// createWorkflowSchema
export const createWorkflowSchema = z.object({
	name: z.string().max(100, 'Name must be at most 100 characters'),
	description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
	trigger: WorkflowTriggerEnum,
	steps: z.any(), // JSON array of workflow steps
	segmentId: z.string().optional(),
	isActive: z.boolean().optional()
})

// updateWorkflowSchema (all fields optional except id)
export const updateWorkflowSchema = z.object({
	id: z.string(),
	name: z.string().max(100).optional(),
	description: z.string().max(1000).optional(),
	trigger: WorkflowTriggerEnum.optional(),
	steps: z.any().optional(),
	segmentId: z.string().optional(),
	isActive: z.boolean().optional()
})

// workflowListQuerySchema (for filtering/querying workflows)
export const workflowListQuerySchema = z.object({
	page: z.coerce.number().min(1).default(1).optional(),
	limit: z.coerce.number().min(1).max(100).default(20).optional(),
	trigger: WorkflowTriggerEnum.optional(),
	isActive: z.boolean().optional(),
	search: z.string().max(100).optional(),
})