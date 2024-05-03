const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel'); 

// Route to fetch participants for a specific event
router.get('/:eventId/participants', async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId).populate('participants');
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Return participants (adjust as needed to return user information)
        res.json(event.participants);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
