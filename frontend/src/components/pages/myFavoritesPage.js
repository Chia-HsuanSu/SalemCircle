import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyFavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8083/favorites'); // Updated API endpoint
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const removeFromFavorites = async (favoriteId) => {
        try {
            await axios.delete(`http://localhost:8083/favorites/${favoriteId}`); // Updated API endpoint
            setFavorites(favorites.filter(favorite => favorite._id !== favoriteId));
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
                            <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>{favorite.event.eventName}</Card.Title> {/* Updated property access */}
                            <Card.Text>{favorite.event.description}</Card.Text> {/* Updated property access */}
                            <Card.Text><strong>Location:</strong> {favorite.event.location}</Card.Text> {/* Updated property access */}
                            <Card.Text><strong>Time:</strong> {new Date(favorite.event.dateTime).toLocaleString()}</Card.Text> {/* Updated property access */}
                            <Card.Text><strong>Capacity:</strong> {favorite.event.capacity}</Card.Text> {/* Updated property access */}
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

