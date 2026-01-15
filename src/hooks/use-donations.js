// React hook for donation data management  
// ...existing code...
import { useEffect, useState, useCallback } from 'react'

// Fetch all donations
export function useDonations() {
	const [donations, setDonations] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchDonations = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const res = await fetch('/api/donations')
			if (!res.ok) throw new Error('Failed to fetch donations')
			const data = await res.json()
			setDonations(data.donations || [])
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchDonations()
	}, [fetchDonations])

	return { donations, loading, error, refresh: fetchDonations }
}