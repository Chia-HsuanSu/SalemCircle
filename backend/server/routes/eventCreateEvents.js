const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');
const Comment = require('../models/commentModel');

// Function to generate a random 3-digit number for event ID
function generateEventId() {
  return Math.floor(100 + Math.random() * 900).toString();
}

async function checkEventIdUnique(eventId) {
  const event = await Event.findOne({ eventId });
  return !event; // Returns true if no event found, indicating uniqueness
}

// Create event route
router.post('/create', async (req, res) => {
  try {
    const { eventName, description, dateTime, capacity, comments } = req.body;
   
    let eventId = generateEventId();
    let isUnique = await checkEventIdUnique(eventId);

    // Attempt to ensure eventId is unique by regenerating up to 5 times if found duplicate
    let attempts = 0;
    while (!isUnique && attempts < 5) {
      eventId = generateEventId();
      isUnique = await checkEventIdUnique(eventId);
      attempts++;
    }

    if (!isUnique) {
      throw new Error("Failed to generate a unique event ID after several attempts.");
    }

    // Create the event
    const newEvent = new Event({ eventId, eventName, description, dateTime, capacity });
    const savedEvent = await newEvent.save();

    if (comments && comments.length > 0) {
      // Assuming your logic for handling comments is correct
      const createdComments = await Comment.create(
        comments.map(comment => ({ ...comment, eventId: savedEvent._id }))
      );
      savedEvent.comments = createdComments.map(comment => comment._id);
      await savedEvent.save();
    }

    res.json(savedEvent);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

