/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function EventSummary({ event }) {

    const navigate = useNavigate();
    
    return (

        <div className="card w-96 bg-base-100 shadow-xl">
        <figure> {event.imageUrl && (
            <img src={event.imageUrl} alt={event.name} />
            )}
            </figure>
        <div className="card-body">
        <h2 className="card-title">{event.title}</h2>

           
            <p>Type of event: {event.eventType}</p>
            <p>Date and Time: {event.time}</p>

            <p>Price: {event.isFree ? "Free" : `$${event.price}`}</p>
            <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => navigate(`/events/${event._id}`)}>View Details</button>

      </div>
  </div>
            
        </div>
    );
}

export default EventSummary;



