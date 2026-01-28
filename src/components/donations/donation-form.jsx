/**
 * Donation Form Component
 * TODO: Implement form for creating/editing donations
 */


import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createDonationSchema } from '@/lib/validation/donation-schema'

export function DonationForm({ donation, donors, onSubmit, onCancel }) {
  // Use the actual donation validation schema
  const schema = createDonationSchema;

  // Initialize form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: donation || {
      donorId: '',
      amount: '',
      type: 'one-time',
      date: '',
      campaignId: '',
      notes: '',
    },
  });

  // TODO: Implement form submission handler
  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
      // TODO: Handle form errors
      // For now, just log
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      {/* TODO: Implement donation form with fields:
          - donorId (select from donors)
          - amount (number input with proper validation)
          - donationType (select: one-time, monthly, annual)
          - date (date input)
          - campaignId (optional select)
          - notes (textarea, optional)
      */}
      <FormField name="donorId" control={register('donorId')}>
        <FormItem>
          <FormLabel>Donor</FormLabel>
          <FormControl>
            <select {...register('donorId')} className="border rounded px-3 py-2 w-full">
              <option value="">Select donor</option>
              {donors && donors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </FormControl>
          <FormMessage>{errors.donorId?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="amount" control={register('amount')}>
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input type="number" step="0.01" min="0" {...register('amount')} />
          </FormControl>
          <FormMessage>{errors.amount?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="type" control={register('type')}>
        <FormItem>
          <FormLabel>Donation Type</FormLabel>
          <FormControl>
            <select {...register('type')} className="border rounded px-3 py-2 w-full">
              <option value="one-time">One-time</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </FormControl>
          <FormMessage>{errors.type?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="date" control={register('date')}>
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Input type="date" {...register('date')} />
          </FormControl>
          <FormMessage>{errors.date?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="campaignId" control={register('campaignId')}>
        <FormItem>
          <FormLabel>Campaign (optional)</FormLabel>
          <FormControl>
            <Input type="text" {...register('campaignId')} />
          </FormControl>
          <FormMessage>{errors.campaignId?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="notes" control={register('notes')}>
        <FormItem>
          <FormLabel>Notes (optional)</FormLabel>
          <FormControl>
            <textarea {...register('notes')} className="border rounded px-3 py-2 w-full" rows={3} />
          </FormControl>
          <FormMessage>{errors.notes?.message}</FormMessage>
        </FormItem>
      </FormField>
      {/* TODO: Add form validation and error handling */}
      {Object.keys(errors).length > 0 && (
        <div className="text-red-600 text-sm mb-2">Please fix the errors above.</div>
      )}
      {/* TODO: Add submit and cancel buttons */}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
      {/* TODO: Handle loading state during submission */}
      {isSubmitting && <div className="text-gray-500 mt-2">Submitting...</div>}
    </Form>
  );
}

// TODO: Example usage:
// <DonationForm 
//   donation={editingDonation} 
//   donors={allDonors}
//   onSubmit={handleCreateDonation}
//   onCancel={() => setShowForm(false)}
// />