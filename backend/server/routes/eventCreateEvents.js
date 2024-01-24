const express = require('express');
const router = express.Router();
const Event = require('./models/eventModel');

// Create event route
router.post('/events', async (req, res) => {
  try {
    const { eventId, eventName, description, dateTime, capacity } = req.body;
    const newEvent = new Event({ eventId, eventName, description, dateTime, capacity });
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
