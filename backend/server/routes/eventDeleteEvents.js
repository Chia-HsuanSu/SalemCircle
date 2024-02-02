const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// Delete event route
router.delete('/delete/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // Call the deleteEvent method from the Event model
    const success = await Event.deleteEvent(eventId);

    if (success) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found or not deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
