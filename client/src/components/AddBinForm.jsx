import React, { useState } from 'react';
import axios from 'axios';

const AddBinForm = ({ onBinAdded }) => {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [fillLevel, setFillLevel] = useState('Empty');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const binData = {
      location,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      fillLevel,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bins', binData);
      console.log('✅ Bin added:', response.data);
      if (onBinAdded) onBinAdded();
      setLocation('');
      setLat('');
      setLng('');
      setFillLevel('Empty');
    } catch (error) {
      console.error('❌ Error adding bin:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">➕ Add New Bin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-gray-700 font-medium mb-1">📍 Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">📌 Latitude</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">📌 Longitude</label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">📦 Fill Level</label>
          <select
            value={fillLevel}
            onChange={(e) => setFillLevel(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Empty">Empty</option>
            <option value="Half-Full">Half-Full</option>
            <option value="Full">Full</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Bin
        </button>
      </form>
    </div>
  );
};

export default AddBinForm;
