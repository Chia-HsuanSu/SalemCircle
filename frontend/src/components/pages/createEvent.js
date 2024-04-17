import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CreateEventPage = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/event/create', {
                eventName,
                description,
                dateTime,
                capacity
            });
            console.log('Event created:', response.data);
            // Optionally, you can redirect the user to another page or display a success message
        } catch (error) {
            console.error('Error creating event:', error.response.data);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <div className="create-event-container" style={{ backgroundColor: 'white', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Create Event</h2>
            {errorMessage && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{errorMessage}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="eventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="dateTime">
                    <Form.Label>Date & Time</Form.Label>
                    <Form.Control type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Create Event</Button>
            </Form>
        </div>
    );
};

export default CreateEventPage;
