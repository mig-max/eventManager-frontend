/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsService from "../services/events.service";

function VenueCard({ venue }) {
  const [events, setEvents] = useState([]);
  const { venueId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await eventsService.getAllEvents();
        const filteredEvents = response.data.filter(
          (event) => event.venue._id === venueId
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, [venueId]);

  return (
    <div className="p-6 border-2 border-gray-300 rounded-md shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{venue.name}</h2>
      {venue.imageUrl && (
        <img src={venue.imageUrl} alt={venue.name} className="mt-4 rounded-md" />
      )}

      <p className="mt-2"><strong>Venue Type: </strong>{venue.venueType}</p>
      <p><strong>Capacity: </strong>{venue.capacity}</p>
        <strong>
      {venue.isDrinksAvailable && <p>Drinks available to buy</p>}
      {venue.isFoodAvailable && <p>Food available to buy</p>}
        </strong>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Events at this venue:</h3>
        {events.map((event) => (
          <button
            key={event._id}
            onClick={() => navigate(`/events/${event._id}`)}
            className="block mt-2 text-fuchsia-900 hover:text-fuchsia-700  font-bold py-2 px-4 rounded-md cursor-pointer"
          >
            {event.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VenueCard;
