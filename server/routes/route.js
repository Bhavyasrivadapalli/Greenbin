const express = require('express');
const router = express.Router();
const Bin = require('../models/Bin');

// Convert string fill level to numeric value
function convertFillLevel(level) {
  if (!level) return 0;
  switch (level.toLowerCase()) {
    case 'full': return 100;
    case 'half-full': return 50;
    case 'empty': return 0;
    default: return 0;
  }
}

// Haversine formula to calculate distance between two coordinates (in KM)
function haversineDistance(a, b) {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const aVal =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

// ✅ POST /api/route/optimized - Accepts optional custom startLocation
router.post('/optimized', async (req, res) => {
  try {
    const allBins = await Bin.find();

    // Step 1: Convert fillLevel and filter only "full" bins (>=80%)
    const fullBins = allBins
      .filter(bin => bin.coordinates && typeof bin.coordinates.lat === 'number' && typeof bin.coordinates.lng === 'number')
      .map(bin => ({
        ...bin._doc,
        numericFillLevel: convertFillLevel(bin.fillLevel)
      }))
      .filter(bin => bin.numericFillLevel >= 80);

    if (fullBins.length < 2) {
      return res.status(200).json({ message: 'Not enough full bins to optimize a route.' });
    }

    // Step 2: Determine start point (custom or fallback to centroid)
    let startPoint;

    if (
      req.body.startLocation &&
      typeof req.body.startLocation.lat === 'number' &&
      typeof req.body.startLocation.lng === 'number'
    ) {
      // Use user-selected custom starting point
      startPoint = {
        lat: req.body.startLocation.lat,
        lng: req.body.startLocation.lng
      };
    } else {
      // Default: Weighted centroid of full bins
      let totalWeight = 0, latSum = 0, lngSum = 0;
      fullBins.forEach(bin => {
        latSum += bin.coordinates.lat * bin.numericFillLevel;
        lngSum += bin.coordinates.lng * bin.numericFillLevel;
        totalWeight += bin.numericFillLevel;
      });

      startPoint = {
        lat: latSum / totalWeight,
        lng: lngSum / totalWeight
      };
    }

    // Step 3: Greedy Nearest Neighbor
    let unvisited = [...fullBins];
    const route = [];
    let current = { coordinates: startPoint };
    let totalDistance = 0;

    while (unvisited.length) {
      let bestIndex = -1;
      let bestScore = -Infinity;

      unvisited.forEach((bin, i) => {
        const dist = haversineDistance(current.coordinates, bin.coordinates);
        const score = bin.numericFillLevel / dist; // prioritize nearer + fuller bins

        if (score > bestScore) {
          bestScore = score;
          bestIndex = i;
        }
      });

      const nextBin = unvisited[bestIndex];
      totalDistance += haversineDistance(current.coordinates, nextBin.coordinates);

      route.push({
        location: nextBin.location,
        lat: nextBin.coordinates.lat,
        lng: nextBin.coordinates.lng,
        fillLevel: nextBin.fillLevel
      });

      current = nextBin;
      unvisited.splice(bestIndex, 1);
    }

    // Step 4: Respond with optimized route
    res.json({
      optimizedRoute: route,
      totalApproxDistanceKm: totalDistance.toFixed(2),
      startPoint
    });

  } catch (err) {
    console.error('Route optimization error:', err);
    res.status(500).json({ message: 'Server error during route optimization' });
  }
});

module.exports = router;
