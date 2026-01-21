'use client'

import { use } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'

// Donor edit page
export default function EditDonorPage({ params }) {
  const router = useRouter()
  // TODO: Get donor ID and fetch donor data
  const unwrappedParams = use(params)
  const donorId = unwrappedParams.id;
  const [donor, setDonor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // TODO: Implement edit form with pre-populated data
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    status: '',
    retentionRisk: '',
  });

  React.useEffect(() => {
    async function fetchDonor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/donors/${donorId}`);
        if (!res.ok) throw new Error('Failed to fetch donor');
        const data = await res.json();
        setDonor(data.donor);
        // Pre-populate form with fetched data
        setForm({
          firstName: data.donor.firstName || '',
          lastName: data.donor.lastName || '',
          email: data.donor.email || '',
          phone: data.donor.phone || '',
          address: data.donor.address || '',
          city: data.donor.city || '',
          state: data.donor.state || '',
          zipCode: data.donor.zipCode || '',
          status: data.donor.status || '',
          retentionRisk: data.donor.retentionRisk || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (donorId) fetchDonor();
  }, [donorId]);

  // TODO: Handle form submission and updates
  const [submitError, setSubmitError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSuccess(false);
    try {
      const res = await fetch(`/api/donors/${donorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update donor');
      }
      setSuccess(true);
      setTimeout(() => router.push('/donors'), 1500);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Donor</h1>
      </div>

      {/* TODO: Implement edit form */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">First Name</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="tel"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block font-medium">City</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="block font-medium">State</label>
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={form.state}
                onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                maxLength="2"
                placeholder="CA"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Zip Code</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.zipCode}
              onChange={e => setForm(f => ({ ...f, zipCode: e.target.value }))}
            />
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="ACTIVE">Active</option>
              <option value="LAPSED">Lapsed</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DO_NOT_CONTACT">Do Not Contact</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Retention Risk</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={form.retentionRisk}
              onChange={e => setForm(f => ({ ...f, retentionRisk: e.target.value }))}
            >
              <option value="LOW">Low</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
          {success && <p style={{ color: 'green' }}>Donor updated successfully! Redirecting...</p>}
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              type="button"
              onClick={() => router.push('/donors')}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
