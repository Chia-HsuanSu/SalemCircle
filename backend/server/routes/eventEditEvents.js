const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel'); 

// Edit event route
router.put('/edit/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = req.body;

  try {
    const updateResult = await Event.updateEvent(eventId, updatedEvent);

    if (updateResult.success) {
      res.status(200).json({ message: updateResult.message });
    } else {
      // If event was not found, send a 404 response
      if (updateResult.message === 'Event not found') {
        res.status(404).json({ message: updateResult.message });
      } else {
        // If the event was found but not modified...
        res.status(200).json({ message: updateResult.message, eventData: updateResult.data });
      }
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
