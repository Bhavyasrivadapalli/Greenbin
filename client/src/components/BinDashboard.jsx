import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BinDashboard = ({ refreshTrigger }) => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fillFilter, setFillFilter] = useState('');

  const fetchBins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bins');
      setBins(response.data);
    } catch (err) {
      console.error('❌ Error fetching bins:', err);
    }
  };

  useEffect(() => {
    fetchBins(); // re-fetch on load and refresh trigger
  }, [refreshTrigger]);

  // Filter logic
  const filteredBins = bins.filter((bin) => {
    const matchesLocation = bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFill = fillFilter === '' || bin.fillLevel === fillFilter;
    return matchesLocation && matchesFill;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📊 Bin Dashboard</h2>

      {/* 🔍 Search & Filter UI */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <select
          value={fillFilter}
          onChange={(e) => setFillFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Fill Levels</option>
          <option value="Empty">Empty</option>
          <option value="Half-Full">Half-Full</option>
          <option value="Full">Full</option>
        </select>
      </div>

      {/* 📋 Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-200">
          <tr>
            <th className="border p-2">Location</th>
            <th className="border p-2">Latitude</th>
            <th className="border p-2">Longitude</th>
            <th className="border p-2">Fill Level</th>
          </tr>
        </thead>
        <tbody>
          {filteredBins.map((bin) => (
            <tr key={bin._id}>
              <td className="border p-2">{bin.location}</td>
              <td className="border p-2">{bin.coordinates.lat}</td>
              <td className="border p-2">{bin.coordinates.lng}</td>
              <td className="border p-2">{bin.fillLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BinDashboard;
