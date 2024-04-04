const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const comments = await Comment.find({ eventId: eventId })
                                  .populate('user', 'username fullName profileImagePath') // Now includes fullName and profileImagePath
                                  .sort({ createdAt: -1 }); // Sort comments in reverse chronological order
    res.json(comments);
  } catch (error) {
    console.error(error); // It's a good practice to log the error for debugging.
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
