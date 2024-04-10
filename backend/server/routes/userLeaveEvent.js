const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// POST route to handle user leaving an event
router.post('/leave', async (req, res) => {
    const { eventId, userId } = req.body;

    try {
        // Find the event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is actually a participant in the event
        if (!event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is not a participant in the event' });
        }

        // Remove the user's ID from the participants array
        event.participants = event.participants.filter(participantId => participantId.toString() !== userId);

        // Save the updated event
        await event.save();

        res.status(200).json({ message: 'User left the event successfully' });
    } catch (error) {
        console.error('Error leaving event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;