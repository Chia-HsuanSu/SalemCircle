const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel'); // Adjust path as needed

// Route to get all events a user has joined
router.get('/user/events/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Assuming 'participants' field in your Event model contains user IDs of participants
        const events = await Event.find({ participants: userId }).lean();

        res.json(events);
    } catch (error) {
        console.error('Error fetching user events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
