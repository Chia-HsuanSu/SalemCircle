const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// Get all events
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
