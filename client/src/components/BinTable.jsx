import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBinModal from './EditBinModal';

const BinTable = ({ refreshTrigger, onDelete, onEdit, userType }) => {
  const [bins, setBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [selectedBin, setSelectedBin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // 🔁 Fetch bins when refreshTrigger changes
  useEffect(() => {
    axios.get('http://localhost:5000/api/bins')
      .then(res => setBins(res.data))
      .catch(err => console.error("❌ Error fetching bins:", err));
  }, [refreshTrigger]);

  // 🗑️ Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bins/${id}`);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("❌ Error deleting bin:", error);
    }
  };

  // ✏️ Handle Edit Button Click
  const handleEditClick = (bin) => {
    setSelectedBin(bin);
    setShowEditModal(true);
  };

  // ✅ Handle Update from Modal
  const handleUpdateBin = async (updatedBin) => {
    try {
      await axios.put(`http://localhost:5000/api/bins/${updatedBin._id}`, updatedBin);
      if (onEdit) onEdit(); // Refresh map/analytics
      setShowEditModal(false); // Close modal
    } catch (error) {
      console.error("❌ Error updating bin:", error);
    }
  };

  // ❌ Close Modal
  const closeEditModal = () => {
    setSelectedBin(null);
    setShowEditModal(false);
  };

  // 🔍 Apply search and filter
  const filteredBins = bins.filter((bin) =>
    bin.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterLevel === '' || bin.fillLevel === filterLevel)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📋 Bin Dashboard</h2>

      {/* 🔍 Search + Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/2"
        >
          <option value="">All Fill Levels</option>
          <option value="Empty">Empty</option>
          <option value="Half-Full">Half-Full</option>
          <option value="Full">Full</option>
        </select>
      </div>

      {/* 📊 Bin Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Location</th>
            <th className="border p-2">Latitude</th>
            <th className="border p-2">Longitude</th>
            <th className="border p-2">Fill Level</th>
            {userType === 'admin' && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBins.map((bin) => (
            <tr key={bin._id}>
              <td className="border p-2">{bin.location}</td>
              <td className="border p-2">{bin.coordinates.lat}</td>
              <td className="border p-2">{bin.coordinates.lng}</td>
              <td className="border p-2">{bin.fillLevel}</td>
              {userType === 'admin' && (
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(bin)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bin._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
          {filteredBins.length === 0 && (
            <tr>
              <td colSpan={userType === 'admin' ? "5" : "4"} className="text-center py-4 text-gray-500">
                No bins match your criteria.
              </td>
            </tr>
          )}
        </tbody>

        {/* <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Location</th>
            <th className="border p-2">Latitude</th>
            <th className="border p-2">Longitude</th>
            <th className="border p-2">Fill Level</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBins.map((bin) => (
            <tr key={bin._id}>
              <td className="border p-2">{bin.location}</td>
              <td className="border p-2">{bin.coordinates.lat}</td>
              <td className="border p-2">{bin.coordinates.lng}</td>
              <td className="border p-2">{bin.fillLevel}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => handleEditClick(bin)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bin._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredBins.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No bins match your criteria.
              </td>
            </tr>
          )}
        </tbody> */}
      </table>

      {/* ✏️ Edit Modal */}
      {showEditModal && selectedBin && (
        <EditBinModal
          isOpen={showEditModal}
          onClose={closeEditModal}
          binData={selectedBin}
          onUpdate={handleUpdateBin}
        />
      )}
    </div>
  );
};

export default BinTable;
