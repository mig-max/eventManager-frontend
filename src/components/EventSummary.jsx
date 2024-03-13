/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function EventSummary({ event }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="w-96 bg-white shadow-xl rounded-lg overflow-hidden">
                {event.imageUrl && (
                    <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.name} />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                    <p className="text-base mb-2"><strong>Type of event: </strong>{event.eventType}</p>
                    <p className="text-base mb-2"><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>

                    
                    <p className="text-base mb-2">
                        {event.isFree ? 
                            <span className="  bg-lime-500 text-white px-2 py-1 rounded">Free</span> 
                            : `${event.price}€`
                        }
                    </p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-900 focus:outline-none" onClick={() => navigate(`/events/${event._id}`)}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventSummary;
