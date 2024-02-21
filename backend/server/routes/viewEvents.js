// App.js or your main component where you set up routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ViewEventsPage from './components/ViewEventsPage'; // Adjust the path accordingly

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/viewEventsPage" element={<ViewEventsPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
