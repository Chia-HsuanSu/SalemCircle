import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Modal } from 'react-bootstrap';

const ViewEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8083/event/all');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleCommentSubmit = async (eventId) => {
        try {
            await axios.post(`http://localhost:8083/comment/comments`, {
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
            const response = await axios.get(`http://localhost:8083/comment/getAllcomments`);
            setAllComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    return (
        <div className="view-events-container" style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>View Events</h2>
            <div className="events-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {events.map(event => (
                    <Card key={event._id} className="event-card" style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center', marginBottom: '10px' }}>{event.eventName}</Card.Title>
                            <Card.Text>{event.description}</Card.Text>
                            <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
                            <Card.Text><strong>Time:</strong> {new Date(event.dateTime).toLocaleString()}</Card.Text>
                            <Card.Text><strong>Capacity:</strong> {event.capacity}</Card.Text>
                            <Button variant="primary" onClick={() => openModal(event)}>View More Details</Button>
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
                        <ul>
                            {allComments.map(comment => (
                                <li key={comment._id}>{comment.text} - by {comment.user}</li>
                            ))}
                        </ul>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewEventsPage;







