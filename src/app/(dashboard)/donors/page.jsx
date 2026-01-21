"use client"
// Donors list page
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import React from 'react';
import { useDonors } from '@/hooks/use-donors';

export default function DonorsPage() {
  // TODO: Integrate with useDonors hook
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState('');
  const [userRole, setUserRole] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const { donors, loading, error, totalPages } = useDonors(page, 20, { search, status: statusFilter, refresh: refreshKey });

  // Fetch user role to check if admin
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

  const handleDelete = async (donorId, donorName) => {
    if (!confirm(`Are you sure you want to delete ${donorName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/donors/${donorId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        // Refresh the donor list
        setRefreshKey(prev => prev + 1);
      } else {
        const data = await res.json();
        alert(`Failed to delete donor: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Failed to delete donor. Please try again.');
      console.error('Delete error:', err);
    }
  };

  // TODO: Implement donors list with search, filtering, and pagination

  // TODO: Add table with donor information and actions

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Donors</h1>
          <p className="text-gray-600 mt-2">
            Manage your donor relationships and track engagement
          </p>
        </div>
        <Link href="/donors/new">
          <button className="btn-primary flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Donor
          </button>
        </Link>
      </div>

      {/* TODO: Implement search and filters */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Search</label>
          <input
            className="border rounded px-3 py-2"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search donors..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Lapsed">Lapsed</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>
      </div>

      {/* TODO: Implement donors table */}
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <table className="w-full border mt-2">
            <thead>
              <tr>
                <th className="border px-2 py-1">Name</th>
                {userRole === 'ADMIN' && (
                  <>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Phone</th>
                    <th className="border px-2 py-1">Address</th>
                    <th className="border px-2 py-1">City</th>
                    <th className="border px-2 py-1">State</th>
                    <th className="border px-2 py-1">Zip</th>
                  </>
                )}
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Total Gifts</th>
                <th className="border px-2 py-1">Total Amount</th>
                <th className="border px-2 py-1">Risk Level</th>
                <th className="border px-2 py-1">Last Gift</th>
                {userRole === 'ADMIN' && <th className="border px-2 py-1">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {donors && donors.length > 0 ? (
                donors.map(donor => (
                  <tr key={donor.id}>
                    <td className="border px-2 py-1 font-medium">
                      <Link href={`/donors/${donor.id}`}>
                        {[donor.firstName, donor.lastName].filter(Boolean).join(' ') || 'Unknown'}
                      </Link>
                    </td>
                    {userRole === 'ADMIN' && (
                      <>
                        <td className="border px-2 py-1">{donor.email || 'N/A'}</td>
                        <td className="border px-2 py-1">{donor.phone || 'N/A'}</td>
                        <td className="border px-2 py-1">{donor.address || 'N/A'}</td>
                        <td className="border px-2 py-1">{donor.city || 'N/A'}</td>
                        <td className="border px-2 py-1">{donor.state || 'N/A'}</td>
                        <td className="border px-2 py-1">{donor.zipCode || 'N/A'}</td>
                      </>
                    )}
                    <td className="border px-2 py-1">{donor.status}</td>
                    <td className="border px-2 py-1">{donor.totalGifts ?? 'N/A'}</td>
                    <td className="border px-2 py-1">${donor.totalAmount ?? 'N/A'}</td>
                    <td className="border px-2 py-1">{donor.retentionRisk}</td>
                    <td className="border px-2 py-1">{donor.lastGiftDate ? new Date(donor.lastGiftDate).toLocaleDateString() : 'N/A'}</td>
                    {userRole === 'ADMIN' && (
                      <td className="border px-2 py-1">
                        <Link href={`/donors/${donor.id}/edit`} className="font-medium transition-colors" style={{ color: 'hsl(var(--primary))' }}>Edit</Link>
                        <span className="mx-2" style={{ color: 'hsl(var(--border))' }}>|</span>
                        <button 
                          className="font-medium transition-colors hover:opacity-80" 
                          style={{ color: 'hsl(var(--destructive))' }} 
                          onClick={() => handleDelete(donor.id, [donor.firstName, donor.lastName].filter(Boolean).join(' '))}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={userRole === 'ADMIN' ? 13 : 6} className="text-center py-4">No donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* TODO: Implement pagination */}
      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >Previous</button>
        <span>Page {page}{totalPages ? ` of ${totalPages}` : ''}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
          disabled={totalPages ? page >= totalPages : false}
        >Next</button>
      </div>
    </div>
  );
}