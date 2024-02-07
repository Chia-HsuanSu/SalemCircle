const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Get all comments route
router.get('/getAllcomments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit a comment route
router.put('/:comment_id', async (req, res) => {
  try {
    const { comment_id } = req.params;
    const updatedComment = req.body; // Assuming the updated comment data is sent in the request body

    // Find the comment by ID and update it
    const comment = await Comment.findByIdAndUpdate(comment_id, updatedComment, { new: true });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
