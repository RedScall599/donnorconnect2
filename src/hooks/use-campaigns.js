// React hook for campaign data management
// ...existing code...
import { useEffect, useState, useCallback } from 'react'

// Fetch all campaigns
export function useCampaigns() {
	const [campaigns, setCampaigns] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchCampaigns = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const res = await fetch('/api/campaigns')
			if (!res.ok) throw new Error('Failed to fetch campaigns')
			const data = await res.json()
			setCampaigns(data.campaigns || [])
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchCampaigns()
	}, [fetchCampaigns])

	return { campaigns, loading, error, refresh: fetchCampaigns }
}

// Fetch a single campaign by ID
export function useCampaign(id) {
	const [campaign, setCampaign] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchCampaign = useCallback(async () => {
		if (!id) return
		setLoading(true)
		setError(null)
		try {
			const res = await fetch(`/api/campaigns/${id}`)
			if (!res.ok) throw new Error('Failed to fetch campaign')
			const data = await res.json()
			setCampaign(data.campaign || null)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}, [id])

	useEffect(() => {
		fetchCampaign()
	}, [fetchCampaign])

	return { campaign, loading, error, refresh: fetchCampaign }
}