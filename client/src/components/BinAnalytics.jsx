import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = {
  "Empty": "#00C49F",
  "Half-Full": "#FFBB28",
  "Full": "#FF4C4C"
};

const BinAnalytics = ({ refreshTrigger }) => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bins')
      .then((res) => setBins(res.data))
      .catch((err) => console.error("Error fetching bins for analytics:", err));
  }, [refreshTrigger]);

  const countByLevel = bins.reduce((acc, bin) => {
    acc[bin.fillLevel] = (acc[bin.fillLevel] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(countByLevel).map(([level, count]) => ({
    name: level,
    value: count
  }));

  const totalBins = bins.length;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-green-700 mb-6">📊 Bin Fill Level Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Total Bins</p>
          <p className="text-2xl font-semibold">{totalBins}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Half-Full</p>
          <p className="text-2xl font-semibold">{countByLevel["Half-Full"] || 0}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Full</p>
          <p className="text-2xl font-semibold">{countByLevel["Full"] || 0}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <p className="text-gray-700">Empty</p>
          <p className="text-2xl font-semibold">{countByLevel["Empty"] || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BinAnalytics;
