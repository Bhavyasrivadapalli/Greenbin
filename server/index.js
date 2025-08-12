const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const verifyToken = require('./routes/verifyToken');
const binRoutes = require('./routes/binRoutes');
const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (must be logged in)
app.use('/api/bins', verifyToken, binRoutes);
app.use('/api/route', verifyToken, routeRoutes);

app.get('/', (req, res) => {
  res.send('GreenBin backend is running!');
});

// Database and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err));
