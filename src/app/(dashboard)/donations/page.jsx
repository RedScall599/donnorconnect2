"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useDonors } from '@/hooks/use-donors'
// Donations list page
export default function DonationsPage() {
  const [donations, setDonations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const router = useRouter();
  const searchParams = useSearchParams()
  const createdFlag = searchParams?.get?.('created')

  // Donor summary
  const { donors, loading: donorsLoading, error: donorsError, refetch: refetchDonors } = useDonors(1, 50)

  // Fetch user role
  React.useEffect(() => {
    async function fetchUserRole() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.user?.role);
        }
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      }
    }
    fetchUserRole();
  }, []);

  React.useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/donations');
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();
        setDonations(data.donations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  React.useEffect(() => {
    // If redirected after saving a donation, refetch donors and show a brief banner
    if (createdFlag) {
      refetchDonors()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdFlag])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Donations</h1>
        <button className="btn-primary" onClick={() => router.push('/donations/new')}>Add Donation</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {createdFlag && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">Donation saved successfully.</div>
      )}
      {/* Donor summary table */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Donor Summary</h2>
        {donorsLoading ? (
          <p>Loading donors...</p>
        ) : donorsError ? (
          <p className="text-red-600">Failed to load donors</p>
        ) : donors.length === 0 ? (
          <p>No donors found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">Name</th>
                {userRole === 'ADMIN' && <th className="border px-2 py-1">Email</th>}
                <th className="border px-2 py-1">Total Gifts</th>
                <th className="border px-2 py-1">Total Amount</th>
                {userRole === 'ADMIN' && <th className="border px-2 py-1">Risk Level</th>}
                {userRole === 'ADMIN' && <th className="border px-2 py-1">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {donors.map(d => (
                <tr key={d.id}>
                  <td className="border px-2 py-1 font-medium">
                    <Link href={`/donors/${d.id}`}>{[d.firstName, d.lastName].filter(Boolean).join(' ') || 'Unknown'}</Link>
                  </td>
                  {userRole === 'ADMIN' && <td className="border px-2 py-1">{d.email || '—'}</td>}
                  <td className="border px-2 py-1">{d.totalGifts ?? 0}</td>
                  <td className="border px-2 py-1">${d.totalAmount ?? 0}</td>
                  {userRole === 'ADMIN' && <td className="border px-2 py-1">{d.retentionRisk ?? 'N/A'}</td>}
                  {userRole === 'ADMIN' && (
                    <td className="border px-2 py-1">
                    <Link href={`/donors/${d.id}/edit`} className="font-medium transition-colors" style={{ color: 'hsl(var(--primary))' }}>Edit</Link>
                    <span className="mx-2" style={{ color: 'hsl(var(--border))' }}>|</span>
                    <button
                      className="font-medium transition-colors hover:opacity-80"
                      style={{ color: 'hsl(var(--destructive))' }}
                      onClick={async () => {
                        if (!confirm('Delete donor and all related data?')) return
                        try {
                          const res = await fetch(`/api/donors/${d.id}`, { method: 'DELETE' })
                          if (!res.ok) throw new Error('Delete failed')
                          refetchDonors()
                        } catch (err) {
                          alert('Failed to delete donor.')
                        }
                      }}
                    >Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
