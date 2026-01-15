/**
 * Donation List Component
 * TODO: Implement table for displaying donations with filtering and sorting
 */

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function DonationList({ donations, onEdit, onDelete, isLoading }) {
    // Pagination state
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Paginate donations
    const paginatedDonations = filteredAndSortedDonations.slice((page - 1) * pageSize, page * pageSize);

    // Pagination component (inline for simplicity)
    function Pagination({ totalItems, pageSize, currentPage, onPageChange }) {
      const totalPages = Math.ceil(totalItems / pageSize);
      if (totalPages <= 1) return null;
      return (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&lt; Prev</Button>
          <span className="text-xs">Page {currentPage} of {totalPages}</span>
          <Button size="sm" variant="outline" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next &gt;</Button>
        </div>
      );
    }
  // TODO: Implement sorting state
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

  // TODO: Implement filtering state
  const [filters, setFilters] = useState({
    // TODO: Add filter options:
    // - dateRange
    dateFrom: '',
    dateTo: '',
    // - donationType
    donationType: '',
    // - minAmount
    minAmount: '',
    // - maxAmount
    maxAmount: '',
    // - donorName
    donorName: '',
  })

  // TODO: Implement sort function
  const handleSort = (field) => {
    // TODO: Toggle sort direction if same field, else set new field
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }

  // TODO: Implement filter function
  const handleFilter = (newFilters) => {
    // TODO: Update filters state
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  // Helper for filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // TODO: Apply filters and sorting to donations
  // Filtering logic
  let filteredDonations = donations;
  if (filters.donorName) {
    filteredDonations = filteredDonations.filter((d) =>
      d.donor?.name?.toLowerCase().includes(filters.donorName.toLowerCase())
    );
  }
  if (filters.donationType) {
    filteredDonations = filteredDonations.filter((d) => d.type === filters.donationType);
  }
  if (filters.minAmount) {
    filteredDonations = filteredDonations.filter((d) => Number(d.amount) >= Number(filters.minAmount));
  }
  if (filters.maxAmount) {
    filteredDonations = filteredDonations.filter((d) => Number(d.amount) <= Number(filters.maxAmount));
  }
  if (filters.dateFrom) {
    filteredDonations = filteredDonations.filter((d) => d.date >= filters.dateFrom);
  }
  if (filters.dateTo) {
    filteredDonations = filteredDonations.filter((d) => d.date <= filters.dateTo);
  }
  // Sorting logic
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === 'amount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === 'donor') {
      aValue = a.donor?.name || '';
      bValue = b.donor?.name || '';
    } else if (sortField === 'campaign') {
      aValue = a.campaign?.name || '';
      bValue = b.campaign?.name || '';
    }
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  const filteredAndSortedDonations = sortedDonations; // TODO: Apply filtering and sorting logic

  return (
    <div className="space-y-4">
      {/* TODO: Add filter controls */}
      <div className="flex gap-4">
        {/* TODO: Add filter inputs for:
            - Date range picker */}
        <div>
          <label className="block text-xs font-medium mb-1">Date From</label>
          <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date To</label>
          <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="border rounded px-2 py-1" />
        </div>
        {/* - Donation type select */}
        <div>
          <label className="block text-xs font-medium mb-1">Type</label>
          <select name="donationType" value={filters.donationType} onChange={handleFilterChange} className="border rounded px-2 py-1">
            <option value="">All</option>
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        {/* - Amount range inputs */}
        <div>
          <label className="block text-xs font-medium mb-1">Min Amount</label>
          <input type="number" name="minAmount" value={filters.minAmount} onChange={handleFilterChange} className="border rounded px-2 py-1 w-24" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Max Amount</label>
          <input type="number" name="maxAmount" value={filters.maxAmount} onChange={handleFilterChange} className="border rounded px-2 py-1 w-24" />
        </div>
        {/* - Donor name search */}
        <div>
          <label className="block text-xs font-medium mb-1">Donor Name</label>
          <input type="text" name="donorName" value={filters.donorName} onChange={handleFilterChange} placeholder="Search donor" className="border rounded px-2 py-1" />
        </div>
      </div>

      {/* TODO: Implement donations table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* TODO: Add sortable column headers:
                  - Date (sortable) */}
              <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                Date {sortField === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableHead>
              {/* - Donor (sortable) */}
              <TableHead className="cursor-pointer" onClick={() => handleSort('donor')}>
                Donor {sortField === 'donor' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableHead>
              {/* - Amount (sortable) */}
              <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableHead>
              {/* - Type (sortable) */}
              <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                Type {sortField === 'type' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableHead>
              {/* - Campaign (sortable) */}
              <TableHead className="cursor-pointer" onClick={() => handleSort('campaign')}>
                Campaign {sortField === 'campaign' && (sortDirection === 'asc' ? '▲' : '▼')}
              </TableHead>
              {/* - Actions */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* TODO: Implement loading state */}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">Loading donations...</TableCell>
              </TableRow>
            ) :
            /* TODO: Implement empty state */
            filteredAndSortedDonations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">No donations found.</TableCell>
              </TableRow>
            ) :
            /* TODO: Map over filteredAndSortedDonations */
            paginatedDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.date}</TableCell>
                <TableCell>{donation.donor?.name || '—'}</TableCell>
                <TableCell>${Number(donation.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge>{donation.type}</Badge>
                </TableCell>
                <TableCell>{donation.campaign?.name || '—'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* TODO: Add action buttons (edit, delete) */}
                    {onEdit && <Button size="sm" variant="outline" onClick={() => onEdit(donation)}>Edit</Button>}
                    {onDelete && <Button size="sm" variant="destructive" onClick={() => onDelete(donation)}>Delete</Button>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* TODO: Add pagination if needed */}
      {/* Pagination controls */}
      {filteredAndSortedDonations.length > 0 && (
        <Pagination
          totalItems={filteredAndSortedDonations.length}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

// TODO: Example usage:
// <DonationList 
//   donations={donations}
//   onEdit={handleEditDonation}
//   onDelete={handleDeleteDonation}
//   isLoading={isLoading}
// />