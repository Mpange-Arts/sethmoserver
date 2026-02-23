const express = require('express');
const router = express.Router();
const Expertise = require('../models/Expertise');

// GET /api/expertise
router.get('/', async (req, res) => {
  try {
    const data = await Expertise.getSingleton();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/expertise - Overwrite data
router.post('/', async (req, res) => {
  try {
    const data = await Expertise.getSingleton();
    data.sectionTitle = req.body.sectionTitle || data.sectionTitle;
    data.sectionSubtitle = req.body.sectionSubtitle || data.sectionSubtitle;
    data.items = req.body.items || [];
    
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;