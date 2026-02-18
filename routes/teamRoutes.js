const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// GET /api/team
router.get('/', async (req, res) => {
  try {
    const team = await Team.getSingleton();
    // Return the full document so the frontend can find .members
    res.json(team); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/team
router.post('/', async (req, res) => {
  try {
    const team = await Team.getSingleton();
    
    // Check if the body contains members directly or inside an object
    // This makes the route more robust
    if (req.body.members) {
        team.members = req.body.members;
    } else {
        team.members = req.body;
    }
    
    await team.save();
    res.json(team); // Return the updated object
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;