const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteModel');

// add favorite route
router.post('/add', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Create a new favorite
    const newFavorite = new Favorite({ user: userId, event: eventId });
    const savedFavorite = await newFavorite.save();

    res.json(savedFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all favorites for a user route
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all favorites for the user and populate the event details
    const favorites = await Favorite.find({ user: userId }).populate('event');
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a favorite by userId and eventId
router.delete('/remove', async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const result = await Favorite.findOneAndDelete({ user: userId, event: eventId });
    if (result) {
      res.json({ message: 'Event unfavorited successfully' });
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Count how many users have favorited an event
router.get('/count/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const count = await Favorite.countDocuments({ event: eventId });
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
