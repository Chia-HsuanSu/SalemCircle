import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import EventDetailsPage from './eventDetailPage'; 

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const handleMyEventsClick = (e) => {
        e.preventDefault();
        navigate('/viewEventsPage'); // Navigate to ViewEventsPage when My Events button is clicked
    };

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
            sessionStorage.setItem('eventId', searchQuery); // Store event ID in session storage
            navigate('/details'); // Navigate to event details page
        }
    };

    if (!user) {
        return (
            <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    return (
        <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
            <div className="header">
                <div className="top-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
               
                <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search Events" value={searchQuery} onChange={handleInputChange} />
                <button type="submit">Search</button>
                </form>

                    <button style={{ marginRight: '10px', width: '100px', height: '50px' }}>Contact Us</button>
                    <img src="/logo.png" alt="Logo" className="logo" width="200" height="100" />
                    <button style={{ marginRight: '10px', width: '100px', height: '50px' }}>My Favorites</button>
                    <button onClick={handleMyEventsClick} style={{ marginRight: '10px', width: '100px', height: '50px' }}>My Events</button>
                    <button onClick={handleClick} style={{ width: '100px', height: '50px' }}>Log Out</button>
                </div>
            </div>
            {/* Salem Circle Description */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: 1 }}>
                    <p style={{ textAlign: 'left', marginBottom: '20px' }}>
                        Salem, famous for its historical significance, draws countless visitors yearly. Our app, Salem Circle, aims to enhance the city experience. It will feature "Events" - social gatherings for entertainment, exploration, and community engagement.
                    </p>
                </div>
                <div style={{ flex: 1 }}>
                    <img src="/salem.png" alt="Salem" className="salem" width="300" height="400" />
                </div>
                
            </div>
            <EventDetailsPage />
        </div>
    );
};

export default HomePage;










