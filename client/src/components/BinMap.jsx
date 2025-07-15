import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 16.78, // Default center (Nuzvid)
  lng: 80.84
};

const BinMap = ({ refreshTrigger }) => {
  const [bins, setBins] = useState([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const fetchBins = () => {
    axios.get('http://localhost:5000/api/bins')
      .then((res) => setBins(res.data))
      .catch((err) => console.error('❌ Error loading bins:', err));
  };

  useEffect(() => {
    fetchBins(); // fetch bins initially and on refreshTrigger change
  }, [refreshTrigger]);

  const getMarkerColor = (fillLevel) => {
    switch (fillLevel) {
      case 'Full': return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      case 'Half-Full': return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'Empty': return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      default: return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">🗺️ Bin Map</h2>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          {bins.map((bin) => (
            <Marker
              key={bin._id}
              position={{ lat: bin.coordinates.lat, lng: bin.coordinates.lng }}
              icon={getMarkerColor(bin.fillLevel)}
              title={`${bin.location} - ${bin.fillLevel}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default BinMap;
