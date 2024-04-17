import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';  // Assumed path to your utility function

const MyFavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const userInfo = getUserInfo();
    const userId = userInfo ? userInfo.id : null;

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) {
                console.error('No userId found. Ensure the user is logged in and the token is valid.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8083/favorites/user/${userId}`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const removeFromFavorites = async (eventId) => {
        if (!userId) {
            console.error('User ID not found');
            return;
        }

        try {
            const response = await axios.delete('http://localhost:8083/favorites/remove', {
                data: { userId, eventId },
            });
            if (response.status === 200) {
                setFavorites(favorites.filter(favorite => favorite.event._id !== eventId));
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <div className="my-favorites-container" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Favorites</h2>
            <div className="favorites-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {favorites.map(favorite => (
                    <Card key={favorite._id} className="favorite-card" style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>{favorite.event.eventName}</Card.Title>
                            <Card.Text>{favorite.event.description}</Card.Text>
                            <Card.Text><strong>Location:</strong> {favorite.event.location}</Card.Text>
                            <Card.Text><strong>Time:</strong> {new Date(favorite.event.dateTime).toLocaleString()}</Card.Text>
                            <Card.Text><strong>Capacity:</strong> {favorite.event.capacity}</Card.Text>
                            <Button variant="danger" onClick={() => removeFromFavorites(favorite.event._id)}>Remove from Favorites</Button>
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