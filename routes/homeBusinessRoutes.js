const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const HomeBusiness = require('../models/HomeBusiness');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// GET /api/home-business
router.get('/', async (req, res) => {
  try {
    const data = await HomeBusiness.getSingleton();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Home Business data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/home-business - Update entire section
router.post('/', async (req, res) => {
  try {
    const data = await HomeBusiness.findOneAndUpdate(
      {}, 
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(data);
  } catch (error) {
    console.error('Error updating Home Business data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/home-business/upload - Upload an image or logo
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'home_businesses' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;