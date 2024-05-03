import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import getUserInfo from '../../utilities/decodeJwt';

const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const userInfo = getUserInfo();
        const userId = userInfo ? userInfo.id : null;

        const fetchEvents = async () => {
            if (!userId) {
                console.error('No userId found. Ensure the user is logged in and the token is valid.');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/user/events/${userId}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleLeaveEvent = async (eventId) => {
        const userInfo = getUserInfo();
        if (!userInfo) {
            console.error('No user info available. User might not be logged in.');
            return;
        }

        const userId = userInfo.id;

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/user/leave`, {
                eventId,
                userId
            });
            if (response.status === 200) {
                alert("You have left the event successfully!");
                setEvents(events.filter(event => event._id !== eventId));
            }
        } catch (error) {
            console.error('Error leaving event:', error);
            alert("Failed to leave the event. Please try again later.");
        }
    };

    const handleCommentSubmit = async (eventId) => {
        const userInfo = getUserInfo();
        if (!userInfo) {
            console.error('No user info available. User might not be logged in.');
            return;
        }

        const userId = userInfo.id;

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/comments`, {
                eventId,
                text: commentText,
                user: userId
            });
            setCommentText('');
            handleAllComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const openModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
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

    return (
        <div className="view-events-container" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Events</h2>
            <div className="events-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {events.map(event => (
                    <Card key={event._id} className="event-card" style={{ backgroundColor: 'black', border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center', marginBottom: '10px', color: 'white' }}>{event.eventName}</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{event.description}</Card.Text>
                            <Card.Text style={{ color: 'white' }}><strong>Location:</strong> {event.location}</Card.Text>
                            <Card.Text style={{ color: 'white' }}><strong>Time:</strong> {new Date(event.dateTime).toLocaleString()}</Card.Text>
                            <Card.Text style={{ color: 'white' }}><strong>Capacity:</strong> {event.capacity}</Card.Text>
                            <Button variant="primary" style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => openModal(event)}>View More Details</Button>
                            <Button variant="primary" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleLeaveEvent(event._id)}>Leave the Event</Button>
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
            />
        </div>
    );
};

const EventModal = ({ show, handleClose, event, commentText, setCommentText, handleCommentSubmit, handleAllComments, allComments }) => {
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
                                        <Card.Text>Posted by: {comment.user.username}</Card.Text>
                                        <Card.Text>Posted at: {new Date(comment.createdAt).toLocaleString()}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyEventsPage;
