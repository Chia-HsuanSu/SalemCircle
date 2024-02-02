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

// Delete favorite route
router.delete('/delete/:favoriteId', async (req, res) => {
  try {
    const { favoriteId } = req.params;

    // Delete the favorite by favoriteId
    const deletedFavorite = await Favorite.findByIdAndDelete(favoriteId);

    if (!deletedFavorite) {
      res.status(404).json({ message: 'Favorite not found' });
    } else {
      res.json({ message: 'Favorite deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
