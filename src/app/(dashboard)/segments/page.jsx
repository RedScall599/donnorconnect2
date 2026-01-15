"use client"
import React from 'react'
// Segments page
export default function SegmentsPage() {
  // TODO: Implement donor segments
  const [segments, setSegments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchSegments() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/segments');
        if (!res.ok) throw new Error('Failed to fetch segments');
        const data = await res.json();
        setSegments(data.segments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSegments();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Donor Segments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="w-full border mt-2">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Donors</th>
            </tr>
          </thead>
          <tbody>
            {segments.length > 0 ? (
              segments.map(segment => (
                <tr key={segment.id}>
                  <td className="border px-2 py-1 font-medium">
                    <a href={`/dashboard/segments/${segment.id}`} className="text-blue-600 hover:underline">{segment.name}</a>
                  </td>
                  <td className="border px-2 py-1">{segment.type}</td>
                  <td className="border px-2 py-1">{segment.description}</td>
                  <td className="border px-2 py-1">{segment.donors ? segment.donors.length : 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No segments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
