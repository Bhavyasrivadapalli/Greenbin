const express = require('express');
const router = express.Router();

// Haversine Distance Calculation
function haversineDistance(coord1, coord2) {
  const R = 6371; // Earth radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
  const lat1 = coord1.lat * Math.PI / 180;
  const lat2 = coord2.lat * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Nearest Neighbor Algorithm
function optimizeRoute(bins) {
  const route = [];
  const visited = new Set();
  let current = bins[0];
  route.push(current);
  visited.add(current._id);

  while (route.length < bins.length) {
    let nearest = null;
    let minDist = Infinity;

    for (const bin of bins) {
      if (!visited.has(bin._id)) {
        const dist = haversineDistance(current.coordinates, bin.coordinates);
        if (dist < minDist) {
          minDist = dist;
          nearest = bin;
        }
      }
    }

    if (nearest) {
      route.push(nearest);
      visited.add(nearest._id);
      current = nearest;
    }
  }

  return route;
}

// POST /api/route/optimize
router.post('/optimize', (req, res) => {
  const { bins } = req.body;

  if (!bins || bins.length === 0) {
    return res.status(400).json({ message: 'No bins provided' });
  }

  const optimizedRoute = optimizeRoute(bins);
  res.json({ optimizedRoute });
});

module.exports = router;
