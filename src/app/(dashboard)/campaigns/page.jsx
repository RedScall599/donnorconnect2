"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import AIFormHelper from '@/components/AIFormHelper'

// Campaigns list page with admin-only add button

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [userRole, setUserRole] = React.useState(null)
  const [adding, setAdding] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('')
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  // Load campaigns
  React.useEffect(() => {
    setLoading(true)
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data.campaigns || [])
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load campaigns.')
        setLoading(false)
      })
  }, [])

  // Load session to determine role
  React.useEffect(() => {
    fetch('/api/auth/session')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => setUserRole(data?.user?.role || null))
      .catch(() => setUserRole(null))
  }, [])

  async function handleCreateCampaign() {
    setSubmitError('')
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      if (!res.ok) {
        const result = await res.json().catch(() => ({}))
        throw new Error(result.error || 'Failed to create campaign')
      }
      const { campaign } = await res.json()
      // Prepend new campaign and reset form
      setCampaigns(prev => [campaign, ...prev])
      setName('')
      setDescription('')
      setAdding(false)
    } catch (e) {
      setSubmitError(e.message)
    }
  }

  if (loading) return <div>Loading campaigns...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        {userRole === 'ADMIN' && (
          <button className="btn-primary" onClick={() => setAdding(a => !a)}>
            {adding ? 'Cancel' : 'Add Campaign'}
          </button>
        )}
      </div>

      {adding && userRole === 'ADMIN' && (
        <div className="border rounded p-4 space-y-3">
          <div>
            <label className="flex items-center gap-1 text-sm font-medium">
              Name
              <AIFormHelper field="campaignName" onSuggest={() => {}} />
            </label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Annual Fund 2026"
            />
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-medium">
              Description
              <AIFormHelper field="campaignDescription" onSuggest={() => {}} />
            </label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional details"
            />
          </div>
          {submitError && <p className="text-red-600 text-sm">{submitError}</p>}
          <div className="flex gap-2">
            <Button onClick={handleCreateCampaign} disabled={!name.trim()}>Save</Button>
            <Button variant="secondary" onClick={() => setAdding(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {campaigns.length === 0 ? (
        <div>No campaigns found.</div>
      ) : (
        <ul className="mt-2 space-y-2">
          {campaigns.map(campaign => (
            <li key={campaign.id} className="border rounded px-4 py-2">
              <div className="font-semibold">{campaign.name}</div>
              <div className="text-sm text-gray-600">{campaign.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
