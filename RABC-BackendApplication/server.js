const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const connectDB = require('./config/db');
const userRoutes = require('./routes/route');

const app = express();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
