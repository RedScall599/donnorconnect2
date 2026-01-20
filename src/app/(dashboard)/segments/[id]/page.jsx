'use client'

import React from 'react';
import { use } from 'react';

// Segment detail page
export default function SegmentDetailPage({ params }) {
  // TODO: Implement segment detail view
  const unwrappedParams = use(params)
  const segmentId = unwrappedParams.id;
  const [segment, setSegment] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchSegment() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/segments/${segmentId}`);
        if (!res.ok) throw new Error('Failed to fetch segment');
        const data = await res.json();
        setSegment(data.segment);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (segmentId) fetchSegment();
  }, [segmentId]);

  return (
    <div className="space-y-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : segment ? (
        <>
          <div>
            <h1 className="text-3xl font-bold mb-2">{segment.name}</h1>
            <p className="text-gray-600 mb-2">{segment.description}</p>
            <p className="text-sm text-gray-500">Type: {segment.type}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Donors in this Segment</h2>
            {segment.donors && segment.donors.length > 0 ? (
              <table className="w-full border mt-2">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {segment.donors.map(donor => (
                    <tr key={donor.id}>
                      <td className="border px-2 py-1">{donor.name}</td>
                      <td className="border px-2 py-1">{donor.email}</td>
                      <td className="border px-2 py-1">{donor.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No donors in this segment.</p>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
