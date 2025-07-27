import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '500px',
  width: '100%',
};

const center = {
  lat: 16.75,
  lng: 80.85,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const OptimizedRoute = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [totalDistance, setTotalDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoute = async (start) => {
    if (!start) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/route/optimized', {
        startLocation: start,
      });

      setOptimizedRoute(res.data.optimizedRoute);
      setTotalDistance(res.data.totalApproxDistanceKm);
    } catch (err) {
      console.error('Error fetching optimized route:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const start = { lat, lng };
    setStartLocation(start);
    fetchRoute(start);
  };

  // Create path: start -> bin1 -> bin2 -> ...
  const polylinePath = startLocation
    ? [startLocation, ...optimizedRoute.map((bin) => ({ lat: bin.lat, lng: bin.lng }))]
    : [];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Optimized Route</h1>

      {startLocation && (
        <p className="mb-2 text-blue-600">
          Start Location: {startLocation.lat.toFixed(5)}, {startLocation.lng.toFixed(5)}
        </p>
      )}

      {loading ? (
        <p>Loading route...</p>
      ) : optimizedRoute.length === 0 ? (
        <p className="text-red-500">Click on the map to select a starting point.</p>
      ) : (
        <div className="mb-4 text-green-600 font-medium">
          Total Approx. Distance: {totalDistance} km
        </div>
      )}

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={startLocation || center}
          zoom={13}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {/* Start Location Marker */}
          {startLocation && (
            <Marker
              position={startLocation}
              label="Start"
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              }}
            />
          )}

          {/* Bin Markers */}
          {optimizedRoute.map((bin, index) => (
            <Marker
              key={index}
              position={{ lat: bin.lat, lng: bin.lng }}
              label={(index + 1).toString()}
              title={`${bin.location} (${bin.filllevel})`}
            />
          ))}

          {/* Blue Route Path */}
          {polylinePath.length > 1 && (
            <Polyline
              path={polylinePath}
              options={{
                strokeColor: '#1E90FF', // Bright Blue
                strokeOpacity: 0.8,
                strokeWeight: 4,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default OptimizedRoute;
