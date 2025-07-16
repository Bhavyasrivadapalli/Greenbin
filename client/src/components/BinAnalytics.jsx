import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaTrash, FaBatteryHalf, FaBatteryFull, FaBatteryEmpty } from 'react-icons/fa';

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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      
      <h2 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-2">
        📊 Bin Fill Level Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded shadow-md text-center">
          <FaTrash className="mx-auto text-green-600 text-2xl mb-2" />
          <p className="text-gray-600">Total Bins</p>
          <p className="text-2xl font-bold text-green-800">{totalBins}</p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-md text-center">
          <FaBatteryHalf className="mx-auto text-yellow-600 text-2xl mb-2" />
          <p className="text-gray-600">Half-Full</p>
          <p className="text-2xl font-bold text-yellow-700">{countByLevel["Half-Full"] || 0}</p>
        </div>

        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded shadow-md text-center">
          <FaBatteryFull className="mx-auto text-red-600 text-2xl mb-2" />
          <p className="text-gray-600">Full</p>
          <p className="text-2xl font-bold text-red-700">{countByLevel["Full"] || 0}</p>
        </div>

        <div className="bg-cyan-100 border-l-4 border-cyan-500 p-4 rounded shadow-md text-center">
          <FaBatteryEmpty className="mx-auto text-cyan-600 text-2xl mb-2" />
          <p className="text-gray-600">Empty</p>
          <p className="text-2xl font-bold text-cyan-700">{countByLevel["Empty"] || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-50 rounded-xl shadow-inner p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BinAnalytics;
