import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyFavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch favorites from the server or local storage
        const fetchFavorites = async () => {
            try {
                // Example API call to fetch favorites
                const response = await axios.get('http://localhost:8083/api/user/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    // Function to remove an event from favorites
    const removeFromFavorites = async (eventId) => {
        try {
            // Example API call to remove event from favorites
            await axios.delete(`http://localhost:8083/api/user/favorites/${eventId}`);
            // Update favorites state after removal
            setFavorites(favorites.filter(favorite => favorite._id !== eventId));
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <div className="my-favorites-container" style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Favorites</h2>
            <div className="favorites-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {favorites.map(favorite => (
                    <Card key={favorite._id} className="favorite-card" style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>{favorite.eventName}</Card.Title>
                            <Card.Text>{favorite.description}</Card.Text>
                            <Card.Text><strong>Location:</strong> {favorite.location}</Card.Text>
                            <Card.Text><strong>Time:</strong> {new Date(favorite.dateTime).toLocaleString()}</Card.Text>
                            <Card.Text><strong>Capacity:</strong> {favorite.capacity}</Card.Text>
                            <Button variant="danger" onClick={() => removeFromFavorites(favorite._id)}>Remove from Favorites</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/events">Back to Events</Link>
            </div>
        </div>
    );
};

export default MyFavoritesPage;
