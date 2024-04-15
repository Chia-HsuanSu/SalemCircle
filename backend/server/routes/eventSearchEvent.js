const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel'); 
const moment = require('moment');


router.get('/search', async (req, res) => {
    const query = req.query.q; // Keyword for search
    const filter = req.query.filter; // Optional filter (eventName, description, eventId, date)
    const dateQuery = req.query.date; // Optional date filter

    if (!query && !dateQuery) {
        return res.status(400).json({ message: 'No search query or date filter provided' });
    }

    try {
        let searchCriteria = [];

        if (query) {
            if (filter && ['eventName', 'description', 'eventId'].includes(filter)) {
                // Search within a specific field
                searchCriteria.push({ [filter]: { $regex: query, $options: 'i' } });
            } else {
                // General search across multiple fields
                searchCriteria.push({
                    $or: [
                        { eventName: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                        { eventId: { $regex: query, $options: 'i' } }
                    ]
                });
            }
        }

        if (dateQuery) {
            const startDate = moment(dateQuery, 'YYYY-MM-DD').startOf('day').toDate();
            const endDate = moment(dateQuery, 'YYYY-MM-DD').endOf('day').toDate();
            searchCriteria.push({ dateTime: { $gte: startDate, $lte: endDate } });
        }

        const events = await Event.find({ $and: searchCriteria });
        res.json(events);
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
