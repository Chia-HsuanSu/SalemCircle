import React from 'react';

const ViewEventsPage = () => {
    // Define some sample events (you can fetch them from an API or database)
    const events = [
        {
            id: 1,
            name: 'Salem Witch Museum Tour',
            image: '/witchMuseum.png', // Example image path
            description: 'The Salem Witch Museum, founded in 1972, offers two historical presentations. The first tells the tragic story of 1692 witch trials, and takes place in large auditorium with life-sized satge sets which are illuminated and dramactically-narrated to immerse vistors in the world of 17th centry Salem ',
            Location: '19 North Washington Square Salem, MA',
            Time: 'Febuary 21st, 2024 5PM',
            Price:'From 25 USD/Audlts, 10 USD/Under 18',
           
        },
        
    ];

    return (
        <div className="view-events-container" style={{ backgroundColor: 'lightblue', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>View Events</h2>
            <div className="events-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {events.map(event => (
                    <div key={event.id} className="event-card" style={{ border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px', width: '300px' }}>
                        <img src={event.image} alt={event.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
                        <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{event.name}</h3>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewEventsPage;
