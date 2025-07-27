const express = require('express');
const Bin = require('../models/Bin');
const router = express.Router();

// ✅ POST /api/bins
router.post('/', async (req, res) => {
  try {
    const { location, coordinates, fillLevel } = req.body;
    const bin = new Bin({ location, coordinates, fillLevel });
    await bin.save();
    res.status(201).json({ message: 'Bin added successfully', bin });
  } catch (err) {
    res.status(500).json({ message: 'Error adding bin', error: err });
  }
});

// ✅ GET /api/bins
router.get('/', async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bins', error: err });
  }
});

// ✅ DELETE /api/bins/:id
router.delete('/:id', async (req, res) => {
  console.log("Deleting bin with ID:", req.params.id);
  try {
    const binId = req.params.id;
    await Bin.findByIdAndDelete(binId);
    res.status(200).json({ message: 'Bin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bin', error: err });
  }
});

// ✅ PUT /api/bins/:id
router.put('/:id', async (req, res) => {
  try {
    const binId = req.params.id;
    const updatedBin = await Bin.findByIdAndUpdate(binId, req.body, { new: true });
    res.status(200).json({ message: 'Bin updated successfully', updatedBin });
  } catch (err) {
    res.status(500).json({ message: 'Error updating bin', error: err });
  }
});

module.exports = router;
