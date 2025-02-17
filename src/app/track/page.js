'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackPage() {
  const [shipmentId, setShipmentId] = useState('');
  const router = useRouter();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (shipmentId) {
      // Redirect to the /track/[id] page
      router.push(`/track/${shipmentId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-sm border border-[hsl(240,3.7%,15.9%)]">
        <h1 className="text-3xl text-white font-semibold mb-6 text-center">Track Your Shipment</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="shipmentId" className="block text-gray-300 mb-2">Enter Shipment ID:</label>
            <input
              type="text"
              id="shipmentId"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              required
              className="w-full p-3 text-gray-900 rounded-lg border-[hsl(240,3.7%,15.9%)] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Track Shipment
          </button>
        </form>
      </div>
    </div>
  );
}
