/**
 * Donor Form Component 
 * TODO: Implement form for creating/editing donors
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { createDonorSchema } from '@/lib/validation/donor-schema'
import AIFormHelper from '@/components/AIFormHelper'

export function DonorForm({ donor, onSubmit, onCancel }) {
  // TODO: Import and use donor validation schema

  const schema = createDonorSchema // TODO: Import from validation
  
  // TODO: Initialize form with react-hook-form and zod resolver
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: donor || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      status: 'ACTIVE',
      retentionRisk: 'LOW',
      notes: '',
    },
  });

  const formValues = watch()

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
    <div className="max-w-2xl mx-auto">
      <Form onSubmit={rhfHandleSubmit(handleSubmit)}>
        {/* TODO: Implement donor form with fields: */}
        <FormField name="firstName" control={register('firstName')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>First Name</FormLabel>
            <AIFormHelper field="firstName" context={formValues} onSuggest={(val) => setValue('firstName', val)} />
          </div>
          <FormControl>
            <Input {...register('firstName')} />
          </FormControl>
          <FormMessage>{errors.firstName?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="lastName" control={register('lastName')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Last Name</FormLabel>
            <AIFormHelper field="lastName" context={formValues} onSuggest={(val) => setValue('lastName', val)} />
          </div>
          <FormControl>
            <Input {...register('lastName')} />
          </FormControl>
          <FormMessage>{errors.lastName?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="email" control={register('email')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Email</FormLabel>
            <AIFormHelper field="email" context={formValues} onSuggest={(val) => setValue('email', val)} />
          </div>
          <FormControl>
            <Input type="email" {...register('email')} />
          </FormControl>
          <FormMessage>{errors.email?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="phone" control={register('phone')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Phone</FormLabel>
            <AIFormHelper field="phone" context={formValues} onSuggest={(val) => setValue('phone', val)} />
          </div>
          <FormControl>
            <Input {...register('phone')} />
          </FormControl>
          <FormMessage>{errors.phone?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.street" control={register('address.street')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Street Address</FormLabel>
            <AIFormHelper field="address" context={formValues} onSuggest={(val) => setValue('address.street', val)} />
          </div>
          <FormControl>
            <Input {...register('address.street')} />
          </FormControl>
          <FormMessage>{errors.address?.street?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.city" control={register('address.city')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>City</FormLabel>
            <AIFormHelper field="city" context={formValues} onSuggest={(val) => setValue('address.city', val)} />
          </div>
          <FormControl>
            <Input {...register('address.city')} />
          </FormControl>
          <FormMessage>{errors.address?.city?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.state" control={register('address.state')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>State</FormLabel>
            <AIFormHelper field="state" context={formValues} onSuggest={(val) => setValue('address.state', val)} />
          </div>
          <FormControl>
            <Input {...register('address.state')} />
          </FormControl>
          <FormMessage>{errors.address?.state?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="address.zip" control={register('address.zip')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Zip Code</FormLabel>
            <AIFormHelper field="zipCode" context={formValues} onSuggest={(val) => setValue('address.zip', val)} />
          </div>
          <FormControl>
            <Input {...register('address.zip')} />
          </FormControl>
          <FormMessage>{errors.address?.zip?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="status" control={register('status')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Status</FormLabel>
            <AIFormHelper field="donorStatus" context={formValues} onSuggest={(val) => setValue('status', val)} />
          </div>
          <FormControl>
            <select {...register('status')} className="border rounded px-3 py-2 w-full">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="LAPSED">Lapsed</option>
              <option value="DO_NOT_CONTACT">Do Not Contact</option>
            </select>
          </FormControl>
          <FormMessage>{errors.status?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="retentionRisk" control={register('retentionRisk')}>
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>Retention Risk</FormLabel>
            <AIFormHelper field="retentionRisk" context={formValues} onSuggest={(val) => setValue('retentionRisk', val)} />
          </div>
          <FormControl>
            <select {...register('retentionRisk')} className="border rounded px-3 py-2 w-full">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </FormControl>
          <FormMessage>{errors.retentionRisk?.message}</FormMessage>
        </FormItem>
      </FormField>
      <FormField name="notes" control={register('notes')}>
        <FormItem>
          <FormLabel>Notes</FormLabel>
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
    </div>
  )
}

// TODO: Example usage:
// <DonorForm 
//   donor={editingDonor} 
//   onSubmit={handleCreateDonor}
//   onCancel={() => setShowForm(false)}
// />
