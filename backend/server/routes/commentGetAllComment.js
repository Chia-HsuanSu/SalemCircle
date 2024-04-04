const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Get all comments route
router.get('/getAllcomments', async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'username fullName profileImagePath');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
