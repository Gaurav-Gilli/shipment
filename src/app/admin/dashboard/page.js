'use client';

import { useState, useEffect } from 'react';

export default function AdminShipmentsPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch shipments when the component mounts
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('/api/shipments');
        if (response.ok) {
          const data = await response.json();
          setShipments(data.shipments);
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch shipments');
      }
    };
    fetchShipments();
  }, []);

  // Handle shipment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newShipment = { origin, destination };

    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShipment),
      });

      if (response.ok) {
        // Fetch the updated list of shipments after successfully creating a new one
        const data = await response.json();
        const updatedShipmentsResponse = await fetch('/api/shipments');
        if (updatedShipmentsResponse.ok) {
          const updatedShipmentsData = await updatedShipmentsResponse.json();
          setShipments(updatedShipmentsData.shipments);
        }
        // Clear the form fields after submission
        setOrigin('');
        setDestination('');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to create shipment');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Create New Shipment</h1>
      
      <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg shadow-md w-full max-w-lg mx-auto border" style={{ borderColor: 'hsl(240, 3.7%, 15.9%)' }}>
        <div className="mb-4">
          <label htmlFor="origin" className="block text-white mb-2">Origin:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full p-3 text-black rounded-lg border border-white bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="destination" className="block text-white mb-2">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="w-full p-3 text-black rounded-lg border border-white bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button type="submit" className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white">
          Create Shipment
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <h2 className="text-2xl font-semibold mt-10 mb-6">Current Shipments</h2>

      <div className="overflow-x-auto bg-black rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Origin</th>
              <th className="px-6 py-3">Destination</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {shipments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No shipments found</td>
              </tr>
            ) : (
              shipments.map((shipment) => (
                <tr key={shipment.id} className="bg-black hover:bg-gray-800 border-b border" style={{ borderColor: 'hsl(240, 3.7%, 15.9%)' }}>
                  <td className="px-6 py-3">{shipment.id}</td>
                  <td className="px-6 py-3">{shipment.origin}</td>
                  <td className="px-6 py-3">{shipment.destination}</td>
                  <td className="px-6 py-3">{shipment.createdAt}</td>
                  <td className="px-6 py-3">{shipment.lastUpdated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
