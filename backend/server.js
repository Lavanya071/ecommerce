const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Use CORS middleware
app.use(cors());  // This will allow all origins. You can customize it if needed.

app.use(bodyParser.json());  // Parse JSON request body

// Use auth routes for login and signup
app.use('/api/auth', authRoutes);

// If you want to add more routes in the future, add them here.

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
