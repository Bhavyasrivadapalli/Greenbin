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
      if (onBinAdded) onBinAdded(); // Call the refresh function if passed
      // Clear the form after submission
      setLocation('');
      setLat('');
      setLng('');
      setFillLevel('Empty');
    } catch (error) {
      console.error('❌ Error adding bin:', error);
    }
  };

  return (
    <div>
      <br></br>
      <br /><br />
    
    {/* <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px', borderRadius: '8px' }}> */}
    <div
  style={{
    paddingTop: '5px',
    paddingRight: '15px',
    paddingBottom: '15px',
    paddingLeft: '30px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    borderRadius: '8px'
  }}
>
      <h2>Add New Bin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude: </label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fill Level: </label>
          <select
            value={fillLevel}
            onChange={(e) => setFillLevel(e.target.value)}
          >
            <option value="Empty">Empty</option>
            <option value="Half-Full">Half-Full</option>
            <option value="Full">Full</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Bin</button>
      </form>
    </div>
    </div>
  );
};

export default AddBinForm;
