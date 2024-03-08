/* eslint-disable react/prop-types */


function EventSummary({ event }) {
    return (
        <div className="event-summary">
            <h2>{event.title}</h2>

            {event.imageUrl && (
            <img src={event.imageUrl} alt={event.name} />
            )}
            
            <p>Type of event: {event.eventType}</p>
            <p>Date and Time: {event.time}</p>

            <p>Price: {event.isFree ? "Free" : `$${event.price}`}</p>
            
        </div>
    );
}

export default EventSummary;
