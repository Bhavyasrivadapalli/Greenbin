const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const binRoutes = require('./routes/binRoutes'); // ✅ Import your binRoutes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Mount all bin-related routes at /api
app.use('/api', binRoutes);

app.get('/', (req, res) => {
  res.send('GreenBin backend is running!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err));
