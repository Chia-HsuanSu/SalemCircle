import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import getUserInfo from '../../utilities/decodeJwt';
import { BsFillStarFill } from 'react-icons/bs';

const ViewEventsPage = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [participants, setParticipants] = useState([]);


    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo);
    
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/event/all`);
                setEvents(response.data);
                fetchFavoritesCount(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleCommentSubmit = async (eventId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/comments`, {
                eventId: eventId,
                text: commentText,
                // Assuming user information is available in your authentication state
                user: 'ExampleUser'
            });
            // Optionally, you can fetch updated event data after submitting the comment
            // and update the state to reflect the changes.
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const openModalOrRedirect = (event) => {
        if (user) {
            setSelectedEvent(event);
            fetchParticipants(event._id); // Fetch participants when the modal is opened
            setShowModal(true);
        } else {
            alert('Please log in or register to view more details.');
        }
    };
    
    

    const closeModal = () => {
        setSelectedEvent(null);
        setShowModal(false);
    };

    const handleAllComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/getAllcomments`);
            setAllComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchFavoritesCount = async (events) => {
        try {
            const counts = {};
            const promises = events.map(async (event) => {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/favorites/count/${event._id}`);
                counts[event._id] = response.data.count;
            });
            await Promise.all(promises);
            setEvents(events.map(event => ({ ...event, favoritesCount: counts[event._id] || 0 })));
        } catch (error) {
            console.error('Error fetching favorite counts:', error);
        }
    };

    const addToFavorites = async (eventId) => {
        try {
            const token = localStorage.getItem('accessToken');  // Retrieve the token from localStorage
            const headers = {
                'Authorization': `Bearer ${token}`  // Prepare the Authorization header
            };
            await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/favorites/add`, { userId: user.id, eventId }, { headers });
            alert('Event added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error.response ? error.response.data : error);
            if (error.response && error.response.status === 401) {
                alert('You must be logged in to add favorites.');
            }
        }
    };
    const fetchParticipants = async (eventId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/event/${eventId}/participants`);
            setParticipants(response.data); 
        } catch (error) {
            console.error('Error fetching participants:', error);
            setParticipants([]);
        }
    };
    

    return (
        <div className="view-events-container" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>View Events</h2>
            <div className="events-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {events.map(event => (
                    <Card key={event._id} className="event-card" style={{ backgroundColor: 'black', border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px', position: 'relative' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginBottom: '10px', color: 'white' }}>{event.eventName}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{event.description}</Card.Text>
                        <Card.Text style={{ color: 'white' }}><strong>Location:</strong> {event.location}</Card.Text>
                        <Card.Text style={{ color: 'white' }}><strong>Time:</strong> {new Date(event.dateTime).toLocaleString()}</Card.Text>
                        <Card.Text style={{ color: 'white' }}><strong>Capacity:</strong> {event.capacity}</Card.Text>
                        <Button variant="warning" onClick={() => addToFavorites(event._id)} style={{ borderRadius: '50%', padding: '10px', position: 'absolute', top: '10px', right: '10px' }}><BsFillStarFill size={20} /></Button>
                        <div style={{ color: 'white',  borderRadius: '50%',fontSize: '10px', marginTop: '40px',position: 'absolute',padding: '10px', top: '10px', right: '10px'}}>{event.favoritesCount} Favorites</div>
                        <Button variant="primary" style={{ backgroundColor: 'Orange', color: 'black', marginTop: '10px' }} onClick={() => openModalOrRedirect(event)}>View More Details</Button>
                    </Card.Body>
                </Card>
                
                
                
                ))}
            </div>
            <EventModal
                show={showModal}
                handleClose={closeModal}
                event={selectedEvent}
                commentText={commentText}
                setCommentText={setCommentText}
                handleCommentSubmit={handleCommentSubmit}
                handleAllComments={handleAllComments}
                allComments={allComments}
                user={user}
                participants={participants}
            />
        </div>
    );
};

const EventModal = ({ show, handleClose, event, commentText, setCommentText, handleCommentSubmit, handleAllComments, allComments, user, participants }) => {
    const handleJoinEvent = async (eventId) => {
        try {
            // Make an API call to join the event
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/user/participate`, { eventId, userId: user.id });

            // Check if the API call was successful
            if (response.status === 200) {
                // Optionally, you can update the state or perform any other actions after joining the event
                console.log('You have joined the event successfully!');
                alert('You have joined the event successfully!');
            } else {
                // Handle the case where the API call was not successful
                console.error('Failed to join the event:', response.data);
                alert('Failed to join the event. Please try again later.');
            }
        } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error joining event:', error);
            alert('Failed to join the event. Please try again later.');
        }
    };
    const [showParticipants, setShowParticipants] = useState(false);

    const toggleParticipants = () => {
        setShowParticipants(!showParticipants);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{event && event.eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {event && (
                    <>
                        <p>{event.description}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                        <p><strong>Capacity:</strong> {event.capacity}</p>
                        <Button variant="secondary" onClick={toggleParticipants}>
                            {showParticipants ? 'Hide Participants' : 'Show Participants'}
                        </Button>
                        {showParticipants && (
                            <div>
                                <h4>Participants</h4>
                                <ul>
                                    {participants.map(participant => (
                                        <li key={participant._id}>{participant.username}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(event._id) }}>
                            <Form.Group controlId="formComment">
                                <Form.Label>Add a comment:</Form.Label>
                                <Form.Control as="textarea" rows={3} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                            <Button variant="primary" onClick={handleAllComments}>All Comments</Button>
                        </Form>
                        <hr />
                        <h4>All Comments</h4>
                        <div>
                            {allComments.map(comment => (
                                <Card key={comment._id} style={{ marginBottom: '10px' }}>
                                    <Card.Body>
                                        <Card.Text>{comment.text}</Card.Text>
                                        <Card.Text>Posted by: {comment.user}</Card.Text>
                                        <Card.Text>Posted at: {new Date(comment.timestamp).toLocaleString()}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <h4>Participants</h4>
                        <ul>
                            {participants.map(participant => (
                                <li key={participant._id}>{participant.username}</li>
                            ))}
                        </ul>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleJoinEvent(event._id)}>Join Event</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewEventsPage;
