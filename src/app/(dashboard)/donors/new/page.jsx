'use client'

// New donor form page (uses shared DonorForm + server schema)

import React from 'react'
import { useRouter } from 'next/navigation'
import { DonorForm } from '@/components/donors/donor-form'

export default function NewDonorPage() {
  const [submitError, setSubmitError] = React.useState(null)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()

  async function handleCreateDonor(formData) {
    setSubmitError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // formData already matches server-side Zod schema
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const result = await res.json().catch(() => ({}))
        throw new Error(result.error || 'Failed to create donor')
      }
      setSuccess(true)
      // Redirect back to donors list to show the newly created donor
      router.push('/donors')
    } catch (err) {
      setSubmitError(err.message)
      throw err
    }
  }

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold">Add New Donor</h1>
        <p className="text-gray-600 mt-2">Create a new donor profile</p>
      </div>

      <DonorForm onSubmit={handleCreateDonor} />

      {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
      {success && <p className="text-green-600 text-sm">Donor created successfully!</p>}
    </div>
  )
}