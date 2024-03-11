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
                    <h2 className="text-lg font-bold mb-2">{event.title}</h2>
                    <p className="text-sm mb-2">Type of event: {event.eventType}</p>
                    <p className="text-sm mb-2">Date: {event.date}</p>
                    <p className="text-sm mb-2">Price: {event.isFree ? "Free" : `$${event.price}`}</p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-fuchsia-900 text-white rounded hover:bg-purple-700 focus:outline-none" onClick={() => navigate(`/events/${event._id}`)}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventSummary;
