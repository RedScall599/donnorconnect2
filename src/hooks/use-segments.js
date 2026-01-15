// React hook for segment data management
import { useState, useEffect } from 'react'

/**
 * Hook to fetch and manage segments list
 * @param {number} page - Page number for pagination
 * @param {number} limit - Items per page
 * @param {Object} filters - Search and filter options
 * @returns {Object} { segments, loading, error, refetch }
 */
export function useSegments(page = 1, limit = 20, filters = {}) {
	const [segments, setSegments] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchSegments = async () => {
		setLoading(true)
		setError(null)
		try {
			const params = new URLSearchParams({
				page: String(page),
				limit: String(limit),
				...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ''))
			})
			const res = await fetch(`/api/segments?${params}`)
			if (!res.ok) throw new Error('Failed to fetch segments')
			const data = await res.json()
			setSegments(data.segments || [])
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSegments()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit, JSON.stringify(filters)])

	return { segments, loading, error, refetch: fetchSegments }
}