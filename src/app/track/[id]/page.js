'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Import useParams from Next.js

export default function ShipmentTrackingPage() {
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState(null);
  
  // Use useParams() to correctly access params object
  const { id: shipmentId } = useParams();

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await fetch(`/api/shipments/${shipmentId}`);

        if (response.ok) {
          const data = await response.json();
          setShipment(data.shipment);
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch shipment details');
      }
    };

    if (shipmentId) {
      fetchShipmentDetails();
    }
  }, [shipmentId]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!shipment) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-sm border border-[hsl(240,3.7%,15.9%)]">
        <h1 className="text-3xl text-white font-semibold mb-6 text-center">Shipment Tracking</h1>
        <div className="shipment-card border-[hsl(240,3.7%,15.9%)] p-4 rounded-lg">
          <h2 className="text-xl text-white mb-4">Shipment ID: {shipment.id}</h2>
          <p><strong>Origin:</strong> {shipment.origin}</p>
          <p><strong>Destination:</strong> {shipment.destination}</p>
          <p><strong>Status:</strong> {shipment.status}</p>
          <p><strong>Created At:</strong> {shipment.createdAt}</p>
          <p><strong>Last Updated:</strong> {shipment.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
