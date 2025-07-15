// components/EditBinModal.jsx
import React, { useState, useEffect } from 'react';

const EditBinModal = ({ isOpen, onClose, binData, onUpdate }) => {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [fillLevel, setFillLevel] = useState('');

  useEffect(() => {
    if (binData) {
      setLocation(binData.location);
      setLat(binData.coordinates.lat);
      setLng(binData.coordinates.lng);
      setFillLevel(binData.fillLevel);
    }
  }, [binData]);

  const handleUpdate = () => {
    const updatedBin = {
      ...binData,
      location,
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
      fillLevel,
    };
    onUpdate(updatedBin);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-[350px]">
        <h2 className="text-lg font-semibold mb-4">✏️ Edit Bin</h2>

        <label className="block mb-2">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2">Latitude:</label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2">Longitude:</label>
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2">Fill Level:</label>
        <select
          value={fillLevel}
          onChange={(e) => setFillLevel(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="Empty">Empty</option>
          <option value="Half-Full">Half-Full</option>
          <option value="Full">Full</option>
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditBinModal;
