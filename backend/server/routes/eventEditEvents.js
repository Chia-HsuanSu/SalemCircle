const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// Edit event route
router.put('/edit/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = req.body;

    // Call the updateEvent method from the Event model
    const success = await Event.updateEvent(eventId, updatedEvent);

    if (success) {
      res.status(200).json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ message: 'Event not found or not modified' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
