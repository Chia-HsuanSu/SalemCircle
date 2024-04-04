const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Fetch comments for a specific event
router.get('/comments/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params; // Extract eventId from URL parameters
    const comments = await Comment.find({ eventId: eventId }).sort({ createdAt: -1 }); // Newest comments first
    res.status(200).json(comments); // Send the found comments back to the client
  } catch (error) {
    console.error('Error fetching comments for event:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors that occur during the process
  }
});

module.exports = router;
