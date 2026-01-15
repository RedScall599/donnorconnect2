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
  const { donors, loading, error, totalPages } = useDonors(page, 20, { search, status: statusFilter });

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
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Total Gifts</th>
                <th className="border px-2 py-1">Total Amount</th>
                <th className="border px-2 py-1">Last Gift</th>
                <th className="border px-2 py-1">Actions</th>
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
                    <td className="border px-2 py-1">{donor.email}</td>
                    <td className="border px-2 py-1">{donor.status}</td>
                    <td className="border px-2 py-1">{donor.totalGifts ?? 'N/A'}</td>
                    <td className="border px-2 py-1">${donor.totalAmount ?? 'N/A'}</td>
                    <td className="border px-2 py-1">{donor.lastGiftDate ? new Date(donor.lastGiftDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="border px-2 py-1">
                      <Link href={`/donors/${donor.id}/edit`} className="font-medium transition-colors" style={{ color: 'hsl(var(--primary))' }}>Edit</Link>
                      <span className="mx-2" style={{ color: 'hsl(var(--border))' }}>|</span>
                      <button className="font-medium transition-colors hover:opacity-80" style={{ color: 'hsl(var(--destructive))' }} onClick={() => alert('Delete not implemented')}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">No donors found.</td>
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