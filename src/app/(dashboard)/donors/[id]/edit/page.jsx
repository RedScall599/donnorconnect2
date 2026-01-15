'use client'

import { use } from 'react'

// Donor edit page
export default function EditDonorPage({ params }) {
  // TODO: Get donor ID and fetch donor data
  const donorId = params.id;
  const [donor, setDonor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchDonor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/donors/${donorId}`);
        if (!res.ok) throw new Error('Failed to fetch donor');
        const data = await res.json();
        setDonor(data.donor);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (donorId) fetchDonor();
  }, [donorId]);

  // TODO: Implement edit form with pre-populated data
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    status: '',
    ...donor
  });

  React.useEffect(() => {
    if (donor) {
      setForm({
        name: donor.name || '',
        email: donor.email || '',
        status: donor.status || '',
      });
    }
  }, [donor]);

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
        method: 'PUT',
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
            <label className="block font-medium">Name</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
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
              required
            />
          </div>
          <div>
            <label className="block font-medium">Status</label>
            <input
              className="border rounded px-3 py-2 w-full"
              type="text"
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            />
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
