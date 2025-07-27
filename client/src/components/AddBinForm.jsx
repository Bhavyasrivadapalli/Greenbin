import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Instructions with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🧾 How to Add a Bin</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Enter Location:</strong> Type the full address or description of the bin location.</li>
            <li><strong>Specify Coordinates:</strong> Use Google Maps or location picker to find the latitude and longitude.</li>
            <li><strong>Set Fill Level:</strong> Choose whether the bin is currently Empty, Half-Full, or Full.</li>
            <li><strong>Submit:</strong> Click "Add Bin" to save this data to the system.</li>
          </ol>
          <div className="mt-6 text-sm text-gray-600">
            <p>📌 Please make sure all details are correct before submitting.</p>
            <p>✅ Coordinates help in mapping and route optimization.</p>
          </div>
        </motion.div>

        {/* Form with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default AddBinForm;
