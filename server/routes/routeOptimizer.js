// routes/routeOptimizer.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();

router.post('/optimize', async (req, res) => {
  const { bins } = req.body; // [{ lat, lng }, ...]
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key missing' });
  }

  if (!bins || bins.length < 2) {
    return res.status(400).json({ error: 'At least 2 bin locations required' });
  }

  try {
    const origin = bins[0];
    const destination = bins[bins.length - 1];
    const waypoints = bins.slice(1, bins.length - 1)
      .map(loc => `via:${loc.lat},${loc.lng}`)
      .join('|');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=optimize:true|${waypoints}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== 'OK') {
      return res.status(500).json({ error: data.error_message || 'Route fetch failed' });
    }

    res.json({ optimizedRoute: data.routes[0] });
  } catch (error) {
    console.error('Error optimizing route:', error);
    res.status(500).json({ error: 'Server error while optimizing route' });
  }
});

module.exports = router;
