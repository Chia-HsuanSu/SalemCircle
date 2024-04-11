// MyEventsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const MyEventsPage = ({ user }) => {
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        if (user) {
            fetchUserEvents(user.userId); // Fetch user's events if user is available
        }
    }, [user]);

    const fetchUserEvents = async (userId) => {
        try {
            const response = await axios.get(`/api/user/events/${userId}`);
            setUserEvents(response.data);
        } catch (error) {
            console.error('Error fetching user events:', error);
        }
    };

    return (
        <div className="my-events-container">
            <h2>My Events List</h2>
            <ul>
                {userEvents.map(event => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        {/* You can display more event details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

MyEventsPage.propTypes = {
    user: PropTypes.object.isRequired, // Define user prop type
};

export default MyEventsPage;

