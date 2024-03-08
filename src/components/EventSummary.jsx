/* eslint-disable react/prop-types */


function EventSummary({ event }) {
    return (
        <div className="event-summary">
            <h2>{event.title}</h2>
            <p>Type of event: {event.description}</p>
            <p>Date and Time: {event.time}</p>
        </div>
    );
}

export default EventSummary;
