import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [eventId, setEventId] = useState(''); // Add state for eventId
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            setUser(userInfo);
        } else {
            navigate('/login'); // Redirect to login page if no user info found
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); // Update search query state with the input value
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            setEventId(searchQuery); // Update eventId state with the searchQuery
            sessionStorage.setItem('eventId', searchQuery); // Store event ID in session storage
            navigate(`/details/${searchQuery}`); // Navigate to event details page
        }
    };

    const handleJoinEvent = async () => { // Remove eventId parameter
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/user/participate`, { eventId, userId: user.userId }); // Pass eventId from state
            alert('You have joined the event successfully!');
            // Optionally, you can update the state or perform any other actions after joining the event
        } catch (error) {
            console.error('Error joining event:', error);
            alert('Failed to join the event. Please try again later.');
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const handleMyEventsClick = (e) => {
        e.preventDefault();
        navigate('/viewEventsPage'); // Navigate to ViewEventsPage when My Events button is clicked
    };

    const handleJoinEventList = async () => {
        navigate('/myEventsPage'); // Add your logic for joining an event
    };

    const handleMyFavoritesClick = (e) => {
        e.preventDefault();
        navigate('/myFavoritesPage'); // Navigate to MyFavoritesPage when My Favorites button is clicked
    };

    const handleCreateEvent = async () => {
        navigate('/createEvent'); // Add your logic for joining an event
    };

    if (!user) {
        return (
            <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    return (
        <div className="home-container" style={{ backgroundColor: 'white', height: '100vh', marginTop: '50px' }}>
            <div className="header">
                <div className="top-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSearch} style={{ marginRight: '10px' }}>
                        <input type="text" placeholder="Search Events" value={searchQuery} onChange={handleInputChange} />
                        <button type="submit">Search</button>
                    </form>
                   
                    <img src="/logo.png" alt="Logo" className="logo" style={{ marginRight: '10px' }} width="200" height="100" />
                    <button onClick={handleMyFavoritesClick}style={{ marginRight: '10px', width: '100px', height: '50px' }}>My Favorites</button>
                    <button onClick={handleMyEventsClick} style={{ marginRight: '10px', width: '100px', height: '50px' }}>Events</button>
                    <button onClick={handleJoinEventList} style={{ marginRight: '10px', width: '100px', height: '50px' }}>Show My Events</button>
                    <button onClick={handleCreateEvent} style={{ marginRight: '10px', width: '100px', height: '50px' }}>Create Event</button>
                    <button onClick={handleCreateEvent} style={{ marginRight: '10px', width: '100px', height: '50px' }}>Delete Account</button>
                    <button onClick={handleClick} style={{ width: '100px', height: '50px' }}>Log Out</button>
                </div>
            </div>
            {/* Salem Circle Description */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: 1, marginLeft: '200px' }}>
                    <p style={{ textAlign: 'left', marginBottom: '20px' }}>
                        Salem, famous for its historical significance, draws countless visitors yearly. Our app, Salem Circle, aims to enhance the city experience. It will feature "Events" - social gatherings for entertainment, exploration, and community engagement.
                    </p>
                </div>
                <div style={{ flex: 1 }}>
                    <img src="/salem.png" alt="Salem" className="salem" width="300" height="400" marginRight='100px' />
                </div>
            </div>
            <div>
        
            </div>
        </div>
    );
};

export default HomePage;












