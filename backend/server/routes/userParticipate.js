// userParticipate.js

const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel');

// POST route to handle user participation in events
router.post('/participate', async (req, res) => {
    const { eventId, userId } = req.body;

    try {
        // Find the event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is already a participant in the event
        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is already a participant in the event' });
        }

        // Check if the event has reached its capacity
        if (event.participants.length >= event.capacity) {
            return res.status(400).json({ message: 'Event has reached its capacity' });
        }


        // Add the user's ID to the participants array
        event.participants.push(userId);

        // Save the updated event
        await event.save();

        res.status(200).json({ message: 'User joined the event successfully' });
    } catch (error) {
        console.error('Error participating in event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
