import React from 'react'

// Campaign detail page
// TODO: Implement campaign detail view
// Placeholder: <div><h1>Campaign Details</h1></div>

export default function CampaignDetailPage({ params }) {
  const { id } = params
  const [campaign, setCampaign] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    fetch(`/api/campaigns/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.campaign) {
          setCampaign(data.campaign)
        } else {
          setError(data.error || 'Campaign not found.')
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load campaign.')
        setLoading(false)
      })
  }, [id])

  if (loading) return <div>Loading campaign...</div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!campaign) return <div>Campaign not found.</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{campaign.name}</h1>
      <div className="mb-2">Status: <span className="font-semibold">{campaign.status}</span></div>
      <div className="mb-2">Start Date: {campaign.startDate}</div>
      <div className="mb-2">End Date: {campaign.endDate}</div>
      <div className="mb-2">Goal: ${campaign.goalAmount}</div>
      <div className="mb-2">Description: {campaign.description}</div>
    </div>
  )
}

