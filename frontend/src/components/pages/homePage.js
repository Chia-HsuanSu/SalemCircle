import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            setUser(userInfo);
        } else {
            navigate('/login'); // Redirect to login page if no user info found
        }
    }, [navigate]);

    if (!user) {
        return (
            <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    const { id, email, username } = user;

    return (
        <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
            <div className="header">
            <img src="/logo.png" alt="Logo" className="logo" width="200" height="200"/>

                <div className="top-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                <input type="text" placeholder="Search Events" className="search-bar" style={{ marginRight: '10px' }} />
                
                    {/* Salem Circle Description */}
                    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Salem, famous for its historical significance, draws countless visitors yearly. Our app, Salem Circle, aims to enhance the city experience. It will feature "Events" - social gathering for entertainment, exploration, and community engagement.
                    </p>

                    <button style={{ marginRight: '10px' }}>Contact Us</button>
                    <button style={{ marginRight: '10px' }}>My Favorites</button>
                    <button style={{ marginRight: '10px' }}>My Events</button>
                    <button onClick={handleClick}>Log Out</button>
                </div>
                <input type="text" placeholder="Search Events" className="search-bar" style={{ marginRight: '10px' }} />
                    {/* Salem Circle Description */}
                    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Salem, famous for its historical significance, draws countless visitors yearly. Our app, Salem Circle, aims to enhance the city experience. It will feature "Events" - social gathering for entertainment, exploration, and community engagement.
                    </p>
            </div>
        </div>
    );
};

export default HomePage;



