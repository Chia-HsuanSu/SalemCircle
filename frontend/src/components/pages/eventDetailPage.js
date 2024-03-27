import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventDetailsPage = () => {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const eventId = sessionStorage.getItem('eventId'); // Retrieve event ID from session storage
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`http://localhost:8083/event/details/${eventId}`);
                    setEvent(response.data);
                } catch (error) {
                    console.error('Error fetching event:', error);
                }
            };
            fetchEvent();
        }
    }, []);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{event.name}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default EventDetailsPage;





