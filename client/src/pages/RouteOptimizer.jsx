import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";

const center = [16.788, 80.846];

const RouteOptimizer = () => {
  const [bins, setBins] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const orsApiKey = import.meta.env.VITE_ORS_API_KEY;

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBins(res.data);
    } catch (err) {
      console.error("Failed to fetch bins:", err);
    }
  };

  const getFillPercentage = (level) => {
    switch ((level || "").toLowerCase()) {
      case "full":
        return 100;
      case "half-full":
        return 50;
      case "empty":
        return 0;
      default:
        return 0;
    }
  };

  const optimizeRoute = async () => {
    const fullBins = bins.filter((bin) => getFillPercentage(bin.fillLevel) >= 80);
    if (fullBins.length < 2) {
      alert("At least two full bins are required for route optimization.");
      return;
    }

    const coordinates = fullBins.map((bin) => [bin.coordinates.lng, bin.coordinates.lat]);

    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates,
          optimize_waypoints: true,
        },
        {
          headers: {
            Authorization: orsApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      const geometry = res.data.features[0].geometry.coordinates;
      const dist = res.data.features[0].properties.summary.distance;
      const dur = res.data.features[0].properties.summary.duration;

      const latlngs = geometry.map(([lng, lat]) => [lat, lng]);

      setRouteCoords(latlngs);
      setDistance(dist / 1000); // in km
      setDuration(dur / 60); // in minutes
    } catch (err) {
      console.error("ORS route error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚛 Route Optimization</h2>
      <button
        onClick={optimizeRoute}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Optimized Route
      </button>

      {routeCoords.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-lg">🛣 Distance: {distance.toFixed(2)} km</p>
          <p className="mb-4 text-lg">⏱ Duration: {duration.toFixed(1)} minutes</p>

          <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {bins.map((bin, index) => (
              <Marker
                key={index}
                position={[bin.coordinates.lat, bin.coordinates.lng]}
              >
                <Popup>
                  <strong>{bin.location}</strong> <br />
                  Fill Level: {bin.fillLevel}
                </Popup>
              </Marker>
            ))}

            <Polyline positions={routeCoords} color="blue" />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default RouteOptimizer;
