import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="home-container" style={{ backgroundColor: 'lightblue', height: '100vh' }}>
            <div className="header">
                <div className="top-buttons" style={{ display: 'flex', justifyContent: 'center' }}>
                    <input type="text" placeholder="Search Events" className="search-bar" style={{ marginRight: '10px', height: '50px' }} />
                    <button style={{ marginRight: '10px', width: '100px', height: '50px' }}>Contact Us</button>
                    <img src="/logo.png" alt="Logo" className="logo" width="200" height="100" />
                    <Link to="/signup" style={{ marginRight: '10px', textDecoration: 'none' }}>
                        <button style={{ width: '100px', height: '50px' }}>Sign Up</button>
                    </Link>
                    <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none' }}>
                        <button style={{ width: '100px', height: '50px' }}>Sign In</button>
                    </Link>
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
        </div>
    );
};

export default LandingPage;
