const express = require('express');
const router = express.Router();
const Event = require('./models/EventModel');
const Comment = require('../models/commentModel');

// Function to generate a random 3-digit number for event ID
function generateEventId() {
  return Math.floor(100 + Math.random() * 900).toString();
}

// Create event route
router.post('/create', async (req, res) => {
  try {
    const {eventName, description, dateTime, capacity, comments } = req.body;
   
    // Generate a custom short event ID
    const eventId = generateEventId();

    //create the event
    const newEvent = new Event({ eventId, eventName, description, dateTime, capacity });
    const savedEvent = await newEvent.save();

    if (comments && comments.length > 0) {
      const createdComments = await Comment.create(
        comments.map(comment => ({ ...comment, eventId: savedEvent._id }))
      );
      savedEvent.comments = createdComments.map(comment => comment._id);
      await savedEvent.save();
    }

    res.json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
