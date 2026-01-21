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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [campaignId, setCampaignId] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('ONE_TIME')
  const [method, setMethod] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const router = useRouter()

  const { campaigns, loading: campaignsLoading, error: campaignsError } = useCampaigns()

  // Fetch current user info and pre-fill name for non-admins
  React.useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.user?.role);
          // Pre-fill name for non-admins
          if (data.user?.role !== 'ADMIN') {
            setFirstName(data.user?.firstName || '');
            setLastName(data.user?.lastName || '');
          }
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      }
    }
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!amount || !firstName || !lastName || !date) {
      setError('Amount, first name, last name, and date are required.')
      setLoading(false)
      return
    }
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          firstName,
          lastName,
          campaignId: campaignId || null,
          date,
          type,
          method: method || null,
          notes: notes || null
        })
      })
      const data = await res.json()
      console.log('API Response:', res.status, data) // Debug log
      if (!res.ok) {
        const details = data?.details?.fieldErrors
        const detailMsg = details ? Object.entries(details).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ') : ''
        setError(data.error || detailMsg || 'Failed to create donation.')
      } else {
        router.push('/donations?created=1')
      }
    } catch (err) {
      console.error('Donation submission error:', err) // Debug log
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
        {/* First Name */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">First Name</label>
            <AIFormHelper field="firstName" context={{}} onSuggest={() => {}} />
          </div>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            disabled={loading || (userRole !== 'ADMIN')}
          />
        </div>
        {/* Last Name */}
        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-sm font-medium">Last Name</label>
            <AIFormHelper field="lastName" context={{}} onSuggest={() => {}} />
          </div>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            disabled={loading || (userRole !== 'ADMIN')}
          />
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
