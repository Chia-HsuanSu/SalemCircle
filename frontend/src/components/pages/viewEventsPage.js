import React from 'react';

const ViewEventsPage = () => {
    // Define some sample events (you can fetch them from an API or database)
    const events = [
        {
            id: 1,
            name: 'Salem Witch Museum Tour',
            image: '/witchMuseum.png', // Example image path
            description: 'The Salem Witch Museum, founded in 1972, offers two historical presentations. The first tells the tragic story of 1692 witch trials, and takes place in large auditorium with life-sized stage sets which are illuminated and dramatically-narrated to immerse visitors in the world of 17th century Salem ',
            location: '19 North Washington Square Salem, MA',
            time: 'Febuary 21st, 2024 5PM',
            price: 'From 25 USD/Adults, 10 USD/Under 18',
        },
        {
            id: 2,
            name: 'Salem Trolley',
            image: '/trolley.png', // Example image path
            description: 'The Salem Trolley provides vistors with narrated on hour tour through beautiful and historic Salem. Explore Salem witchcraft trails 1692 or travel beyond the witchcraft hysteria into the fascinating realm of Salem literary and maritime history ',
            location: '8 Central St, Salem, MA',
            time: 'Febuary 22md, 2024 2PM',
            price: 'From 22 USD/Adults, 12 USD/Under 18, 21 USD/Senior',
        },
        // Add more events as needed
    ];

    return (
        <div className="view-events-container" style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Salem Circle Upcoming Events</h2>
            <div className="events-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {events.map(event => (
                    <div key={event.id} className="event-card" style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <img src={event.image} alt={event.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{event.name}</h3>
                        <p>{event.description}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Time:</strong> {event.time}</p>
                        <p><strong>Price:</strong> {event.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewEventsPage;

