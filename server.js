const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;

// Load Config
dotenv.config();

// Connect to Database
connectDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(cors()); // Allows Frontend (3000) & Admin (3001) access
app.use(express.json({ limit: '50mb' })); // Support for base64 image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Basic Route to test server is running
app.get('/', (req, res) => {
  res.send('Sethmo Group API is running...');
});

/* =========================================
  IMPORT & REGISTER ROUTES
  =========================================
*/
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/vision', require('./routes/visionRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/sectors', require('./routes/sectorRoutes')); // Registered Sectors route
app.use('/api/pillars', require('./routes/pillarRoutes'));
app.use('/api/sustainability', require('./routes/sustainabilityRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/community-settings', require('./routes/communityRoutes'));
app.use('/api/careers', require('./routes/careerRoutes')); // Registered Careers route

app.use('/api/dashboard', require('./routes/dashboardRoutes')); // Dashboard route for combined data

app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/auth', require('./routes/authRoutes'))
// Add this inside the "IMPORT & REGISTER ROUTES" section in server.js
app.use('/api/home-business', require('./routes/homeBusinessRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // TEST: Check Cloudinary Connection on Startup
  cloudinary.api.ping((error, result) => {
    if (error) {
      console.error("Cloudinary Connection Failed:", error.message);
      console.log("Check your .env file for typos!");
    } else {
      console.log(`Cloudinary Connection Successful: ${result.status}`);
    }
  });
});