const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose();

// Routes
app.use('/api/circles', require('./routes/circles'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/parents', require('./routes/parents'));  // Parent route added

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
