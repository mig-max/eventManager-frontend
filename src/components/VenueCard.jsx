/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsService from "../services/events.service";
//import EventCard from "./EventCard"; 

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
    <div className="venue-card">

      {/* Venue information */}
      <h2>{venue.name}</h2>
      {venue.imageUrl && (
        <img src={venue.imageUrl} alt={venue.name} />
      )}
      
      <p>Venue Type: {venue.venueType}</p>
      <p>Capacity: {venue.capacity}</p>
      
      {venue.isDrinksAvailable && (
          <p>Drinks available to buy</p>
      )}

      {venue.isFoodAvailable && (
      <p>Food available to buy</p>
      )}

         {/* Map and Google Maps API */}

      <div>
        <h3>Events at this venue:</h3>
        {events.map((event) => (
          <button onClick={() => navigate(`/events/${event._id}`)} key={event._id}>{event.title}</button>
       ))}
      </div>
      
      
    </div>
  );
}

export default VenueCard;
