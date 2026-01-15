// React hook for donor data management
import { useState, useEffect } from 'react'

/**
 * TODO: Hook to fetch and manage donors list
 * @param {number} page - Page number for pagination
 * @param {number} limit - Items per page
 * @param {Object} filters - Search and filter options
 * @returns {Object} { donors, loading, error, refetch }
 */
export function useDonors(page = 1, limit = 20, filters = {}) {
  // ...existing code...
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [pageSize, setPageSize] = useState(limit)
  const [total, setTotal] = useState(null)

  const fetchDonors = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined && v !== ''))
      })
      const res = await fetch(`/api/donors?${params}`)
      if (!res.ok) throw new Error('Failed to fetch donors')
      const data = await res.json()
      setDonors(data.donors || [])
      const nextPageSize = Number(data.pageSize) || pageSize || limit
      const nextTotal = Number(data.total) || 0
      setPageSize(nextPageSize)
      setTotal(nextTotal)
      setTotalPages(nextPageSize > 0 ? Math.ceil(nextTotal / nextPageSize) : null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, JSON.stringify(filters)])

  return { donors, loading, error, totalPages, pageSize, total, refetch: fetchDonors }
}

/**
 * TODO: Hook to fetch single donor
 * @param {string} donorId - Donor ID
 * @returns {Object} { donor, loading, error, refetch }
 */
export function useDonor(donorId) {
  // ...existing code...
  const [donor, setDonor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDonor = async () => {
    if (!donorId) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/donors/${donorId}`)
      if (!res.ok) throw new Error('Failed to fetch donor')
      const data = await res.json()
      setDonor(data.donor || null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorId])

  return { donor, loading, error, refetch: fetchDonor }
}