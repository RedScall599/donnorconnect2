// React hook for workflow data management
import { useState, useEffect } from 'react'

/**
 * Hook to fetch and manage workflows list
 * @param {number} page - Page number for pagination
 * @param {number} limit - Items per page
 * @param {Object} filters - Search and filter options
 * @returns {Object} { workflows, loading, error, refetch }
 */
export function useWorkflows(page = 1, limit = 20, filters = {}) {
	const [workflows, setWorkflows] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchWorkflows = async () => {
		setLoading(true)
		setError(null)
		try {
			const params = new URLSearchParams({
				page: String(page),
				limit: String(limit),
				...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ''))
			})
			const res = await fetch(`/api/workflows?${params}`)
			if (!res.ok) throw new Error('Failed to fetch workflows')
			const data = await res.json()
			setWorkflows(data.workflows || [])
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchWorkflows()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit, JSON.stringify(filters)])

	return { workflows, loading, error, refetch: fetchWorkflows }
}