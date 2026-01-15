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
  const router = useRouter();
  const searchParams = useSearchParams()
  const createdFlag = searchParams?.get?.('created')

  // Donor summary
  const { donors, loading: donorsLoading, error: donorsError, refetch: refetchDonors } = useDonors(1, 50)

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
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Total Gifts</th>
                <th className="border px-2 py-1">Total Amount</th>
                <th className="border px-2 py-1">Risk Level</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map(d => (
                <tr key={d.id}>
                  <td className="border px-2 py-1 font-medium">
                    <Link href={`/donors/${d.id}`}>{[d.firstName, d.lastName].filter(Boolean).join(' ') || 'Unknown'}</Link>
                  </td>
                  <td className="border px-2 py-1">{d.email || '—'}</td>
                  <td className="border px-2 py-1">{d.totalGifts ?? 0}</td>
                  <td className="border px-2 py-1">${d.totalAmount ?? 0}</td>
                  <td className="border px-2 py-1">{d.retentionRisk ?? 'N/A'}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Donor</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Amount</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Date</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {donations.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: 16 }}>
                  No donations found.{' '}
                  <Link href="/donations/new" style={{ color: '#2563eb' }}>Record one now</Link>
                </td>
              </tr>
            ) : (
              donations.map((donation) => (
                <tr key={donation.id}>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>
                    {([donation.donor?.firstName, donation.donor?.lastName].filter(Boolean).join(' ')) || 'Unknown'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>${donation.amount}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{donation.date ? new Date(donation.date).toLocaleDateString() : ''}</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>{donation.type || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
