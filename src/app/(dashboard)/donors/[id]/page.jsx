'use client'

import { use } from 'react'

// Donor detail page
export default function DonorDetailPage({ params }) {
  // TODO: Get donor ID from params using use() hook
  const donorId = params.id;

  // TODO: Fetch donor data with useDonor hook
  const [donor, setDonor] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [tab, setTab] = React.useState('overview');

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

  // TODO: Display donor information, donation history, interactions

  return (
    <div className="space-y-6">
      {/* TODO: Implement donor profile header */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : donor ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{donor.name}</h1>
              <p className="text-gray-600">{donor.email}</p>
              <p className="text-sm text-gray-500">Status: {donor.status}</p>
            </div>
            {/* TODO: Implement action buttons (edit, delete, contact) */}
            <div className="flex gap-2">
              <a href={`/dashboard/donors/${donorId}/edit`} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</a>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => alert('Delete not implemented')}>Delete</button>
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => alert('Contact not implemented')}>Contact</button>
            </div>
          </div>

          {/* TODO: Implement tabs for overview, donations, interactions */}
          <div className="mt-6">
            <div className="flex gap-4 border-b mb-4">
              <button
                className={`pb-2 px-2 ${tab === 'overview' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
                onClick={() => setTab('overview')}
              >Overview</button>
              <button
                className={`pb-2 px-2 ${tab === 'donations' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
                onClick={() => setTab('donations')}
              >Donations</button>
              <button
                className={`pb-2 px-2 ${tab === 'interactions' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
                onClick={() => setTab('interactions')}
              >Interactions</button>
            </div>
            <div>
              {tab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p>Total Gifts: {donor.totalGifts ?? 'N/A'}</p>
                  <p>Total Amount: ${donor.totalAmount ?? 'N/A'}</p>
                  <p>Last Gift Date: {donor.lastGiftDate ? new Date(donor.lastGiftDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              )}
              {tab === 'donations' && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Donations</h2>
                  {donor.donations && donor.donations.length > 0 ? (
                    <table className="w-full border mt-2">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">Amount</th>
                          <th className="border px-2 py-1">Date</th>
                          <th className="border px-2 py-1">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donor.donations.map((d) => (
                          <tr key={d.id}>
                            <td className="border px-2 py-1">${d.amount}</td>
                            <td className="border px-2 py-1">{d.date ? new Date(d.date).toLocaleDateString() : ''}</td>
                            <td className="border px-2 py-1">{d.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No donations found.</p>
                  )}
                </div>
              )}
              {tab === 'interactions' && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Interactions</h2>
                  <p>Interaction history not implemented.</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
