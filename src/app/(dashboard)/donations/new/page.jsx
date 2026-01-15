"use client"
// New donation form page
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDonors } from '@/hooks/use-donors'
import { useCampaigns } from '@/hooks/use-campaigns'
import AIFormHelper from '@/components/AIFormHelper'

export default function NewDonationPage() {
  // TODO: Implement donation creation form
  const [amount, setAmount] = useState('')
  const [donorId, setDonorId] = useState('')
  const [campaignId, setCampaignId] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('ONE_TIME')
  const [method, setMethod] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { donors, loading: donorsLoading, error: donorsError } = useDonors(1, 100)
  const { campaigns, loading: campaignsLoading, error: campaignsError } = useCampaigns()

  // For simplicity, donorId is a text input. In a real app, use a select with donor names.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!amount || !donorId || !date) {
      setError('All fields are required.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          donorId,
          campaignId: campaignId || null,
          date,
          type,
          method: method || null,
          notes: notes || null
        })
      })
      const data = await res.json()
        if (!res.ok) {
        const details = data?.details?.fieldErrors
        const detailMsg = details ? Object.entries(details).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ') : ''
        setError(data.error || detailMsg || 'Failed to create donation.')
      } else {
          router.push('/donations?created=1')
      }
    } catch (err) {
      setError('Failed to create donation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Record New Donation</h1>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">Amount</label>
            <AIFormHelper field="amount" context={{}} onSuggest={() => {}} />
          </div>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Donor */}
        <div>
          <div className="flex items-center gap-1">
            <label className="block text-sm mb-1">Donor</label>
            <AIFormHelper field="donor" context={{}} onSuggest={() => {}} />
          </div>
          {donorsError && <div className="text-sm text-red-600">Failed to load donors</div>}
          <select
            className="border rounded px-2 py-2 w-full"
            value={donorId}
            onChange={e => setDonorId(e.target.value)}
            disabled={loading || donorsLoading}
            required
          >
            <option value="">Select a donor</option>
            {donors.map(d => (
              <option key={d.id} value={d.id}>
                {[d.firstName, d.lastName].filter(Boolean).join(' ')}
              </option>
            ))}
          </select>
        </div>
        {/* Campaign (optional) */}
        <div>
          <div className="flex items-center gap-1">
            <label className="block text-sm mb-1">Campaign (optional)</label>
            <AIFormHelper field="campaign" context={{}} onSuggest={() => {}} />
          </div>
          {campaignsError && <div className="text-sm text-red-600">Failed to load campaigns</div>}
          <select
            className="border rounded px-2 py-2 w-full"
            value={campaignId}
            onChange={e => setCampaignId(e.target.value)}
            disabled={loading || campaignsLoading}
          >
            <option value="">No campaign</option>
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {/* Date */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">Date</label>
            <AIFormHelper field="date" context={{}} onSuggest={() => {}} />
          </div>
          <Input
            type="date"
            placeholder="Date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {/* Type */}
        <div>
          <div className="flex items-center gap-1">
            <label className="block text-sm mb-1">Type</label>
            <AIFormHelper field="type" context={{}} onSuggest={() => {}} />
          </div>
          <select
            className="border rounded px-2 py-2 w-full"
            value={type}
            onChange={e => setType(e.target.value)}
            disabled={loading}
          >
            <option value="ONE_TIME">One-time</option>
            <option value="RECURRING">Recurring</option>
            <option value="PLEDGE">Pledge</option>
            <option value="IN_KIND">In-kind</option>
          </select>
        </div>
        {/* Method (optional) */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">Method (optional)</label>
            <AIFormHelper field="method" context={{}} onSuggest={() => {}} />
          </div>
          <Input
            placeholder="Method (e.g., Credit Card)"
            value={method}
            onChange={e => setMethod(e.target.value)}
            disabled={loading}
          />
        </div>
        {/* Notes (optional) */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">Notes (optional)</label>
            <AIFormHelper field="notes" context={{}} onSuggest={() => {}} />
          </div>
          <textarea
            className="border rounded px-2 py-2 w-full"
            rows={3}
            placeholder="Notes (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Save Donation'}
        </Button>
      </form>
    </div>
  )
}
