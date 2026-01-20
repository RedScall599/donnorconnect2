'use client'

import { use } from 'react'
import React from 'react'

// Donor edit page
export default function EditDonorPage({ params }) {
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
    status: '',
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
          status: data.donor.status || '',
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
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
          {success && <p style={{ color: 'green' }}>Donor updated successfully!</p>}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
}
