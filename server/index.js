const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const binRoutes = require('./routes/binRoutes');
const authRoutes = require('./routes/auth');
const routeOptimizer = require('./routes/routeOptimizer');
const routeRoutes = require('./routes/route');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bins', binRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/route', routeOptimizer);
app.use('/api/route', routeRoutes);

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
