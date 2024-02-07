const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Create comment route
router.post('/comments', async (req, res) => {
  try {
    const { eventId, text, user } = req.body;

    // Check if all required fields are provided
    if (!eventId || !text || !user) {
      return res.status(400).json({ error: 'Please provide eventId, text, and user' });
    }

    // Create the comment
    const newComment = new Comment({ eventId, text, user });
    const savedComment = await newComment.save();

    // Respond with the saved comment
    res.status(201).json(savedComment);
  } catch (error) {
    // Handle any errors that occur during the creation of the comment
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
