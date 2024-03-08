/* eslint-disable react/prop-types */


function EventSummary({ event }) {
    return (
        <div className="event-summary">
            <h2>{event.title}</h2>
            <p>Type of event: {event.eventType}</p>
            <p>Date and Time: {event.time}</p>

            {event.isFree && (
                <strong>Free Event!</strong>
            )}

            {event.price && (
                <p>Price: {event.price}</p>
            )}
            
        </div>
    );
}

export default EventSummary;
