const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');
const Comment = require('../models/commentModel');

// Create event route
router.post('/events', async (req, res) => {
  try {
    const { eventId, eventName, description, dateTime, capacity, Comment } = req.body;
   
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
