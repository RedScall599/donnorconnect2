/**
 * Segment Form Component
 * TODO: Implement form for creating/editing donor segments
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createSegmentSchema } from '@/lib/validation/segment-schema'
export function SegmentForm({ segment, onSubmit, onCancel }) {
  // TODO: Import and use segment validation schema
  
  const schema = createSegmentSchema // TODO: Import from validation
  
  // TODO: Initialize form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: segment || {
      name: '',
      description: '',
      criteria: {
        donorStatus: '',
        retentionRisk: '',
        lastGiftDateFrom: '',
        lastGiftDateTo: '',
        totalGiftAmountMin: '',
        totalGiftAmountMax: '',
        giftCountMin: '',
        giftCountMax: '',
        preferredContactMethod: '',
        tags: '',
      },
    },
  });

  // TODO: Implement form submission handler
  const handleSubmit = async (data) => {
    // TODO: Call onSubmit prop with form data
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      // TODO: Handle form errors
      // For now, just log
      console.error(err);
    }
  }

  return (
    <Form onSubmit={rhfHandleSubmit(handleSubmit)}>
      {/* TODO: Implement segment form with fields: */}
      <FormField name="name" control={register('name')}>
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...register('name')} />
          </FormControl>
          <FormMessage>{errors.name?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="description" control={register('description')}>
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <textarea {...register('description')} className="border rounded px-3 py-2 w-full" rows={2} />
          </FormControl>
          <FormMessage>{errors.description?.message}</FormMessage>
        </FormItem>
      </FormField>

      {/* TODO: Add dynamic criteria builder interface */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <div className="font-semibold mb-2">Segment Criteria</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* donorStatus filter */}
          <FormField name="criteria.donorStatus" control={register('criteria.donorStatus')}>
            <FormItem>
              <FormLabel>Donor Status</FormLabel>
              <FormControl>
                <select {...register('criteria.donorStatus')} className="border rounded px-3 py-2 w-full">
                  <option value="">Any</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="lapsed">Lapsed</option>
                </select>
              </FormControl>
              <FormMessage>{errors.criteria?.donorStatus?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* retentionRisk filter */}
          <FormField name="criteria.retentionRisk" control={register('criteria.retentionRisk')}>
            <FormItem>
              <FormLabel>Retention Risk</FormLabel>
              <FormControl>
                <select {...register('criteria.retentionRisk')} className="border rounded px-3 py-2 w-full">
                  <option value="">Any</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </FormControl>
              <FormMessage>{errors.criteria?.retentionRisk?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* lastGiftDateRange filter */}
          <FormField name="criteria.lastGiftDateFrom" control={register('criteria.lastGiftDateFrom')}>
            <FormItem>
              <FormLabel>Last Gift Date From</FormLabel>
              <FormControl>
                <Input type="date" {...register('criteria.lastGiftDateFrom')} />
              </FormControl>
              <FormMessage>{errors.criteria?.lastGiftDateFrom?.message}</FormMessage>
            </FormItem>
          </FormField>
          <FormField name="criteria.lastGiftDateTo" control={register('criteria.lastGiftDateTo')}>
            <FormItem>
              <FormLabel>Last Gift Date To</FormLabel>
              <FormControl>
                <Input type="date" {...register('criteria.lastGiftDateTo')} />
              </FormControl>
              <FormMessage>{errors.criteria?.lastGiftDateTo?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* totalGiftAmountRange filter */}
          <FormField name="criteria.totalGiftAmountMin" control={register('criteria.totalGiftAmountMin')}>
            <FormItem>
              <FormLabel>Total Gift Amount Min</FormLabel>
              <FormControl>
                <Input type="number" {...register('criteria.totalGiftAmountMin')} />
              </FormControl>
              <FormMessage>{errors.criteria?.totalGiftAmountMin?.message}</FormMessage>
            </FormItem>
          </FormField>
          <FormField name="criteria.totalGiftAmountMax" control={register('criteria.totalGiftAmountMax')}>
            <FormItem>
              <FormLabel>Total Gift Amount Max</FormLabel>
              <FormControl>
                <Input type="number" {...register('criteria.totalGiftAmountMax')} />
              </FormControl>
              <FormMessage>{errors.criteria?.totalGiftAmountMax?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* giftCountRange filter */}
          <FormField name="criteria.giftCountMin" control={register('criteria.giftCountMin')}>
            <FormItem>
              <FormLabel>Gift Count Min</FormLabel>
              <FormControl>
                <Input type="number" {...register('criteria.giftCountMin')} />
              </FormControl>
              <FormMessage>{errors.criteria?.giftCountMin?.message}</FormMessage>
            </FormItem>
          </FormField>
          <FormField name="criteria.giftCountMax" control={register('criteria.giftCountMax')}>
            <FormItem>
              <FormLabel>Gift Count Max</FormLabel>
              <FormControl>
                <Input type="number" {...register('criteria.giftCountMax')} />
              </FormControl>
              <FormMessage>{errors.criteria?.giftCountMax?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* preferredContactMethod filter */}
          <FormField name="criteria.preferredContactMethod" control={register('criteria.preferredContactMethod')}>
            <FormItem>
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <select {...register('criteria.preferredContactMethod')} className="border rounded px-3 py-2 w-full">
                  <option value="">Any</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="mail">Mail</option>
                </select>
              </FormControl>
              <FormMessage>{errors.criteria?.preferredContactMethod?.message}</FormMessage>
            </FormItem>
          </FormField>
          {/* tags filter */}
          <FormField name="criteria.tags" control={register('criteria.tags')}>
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...register('criteria.tags')} placeholder="Comma-separated tags" />
              </FormControl>
              <FormMessage>{errors.criteria?.tags?.message}</FormMessage>
            </FormItem>
          </FormField>
        </div>
      </div>

      {/* TODO: Add form validation and error handling */}
      {Object.keys(errors).length > 0 && (
        <div className="text-red-600 text-sm mb-2">Please fix the errors above.</div>
      )}

      {/* TODO: Add submit and cancel buttons */}
      <div className="flex gap-2 mt-4">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Submit'}</Button>
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>

      {/* TODO: Handle loading state during submission */}
      {isSubmitting && <div className="text-gray-500 mt-2">Submitting...</div>}

      {/* TODO: Add preview of segment size/count */}
      <div className="mt-4 text-xs text-gray-500">Segment size preview: (not implemented)</div>
    </Form>
  )
}

// TODO: Example usage:
// <SegmentForm 
//   segment={editingSegment} 
//   onSubmit={handleCreateSegment}
//   onCancel={() => setShowForm(false)}
// />