/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import eventsService from "../services/events.service";
import EventCard from "./EventCard"; 

function VenueCard({ venue }) {

  const [events, setEvents] = useState([]);
  const { venueId } = useParams();

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
      <p>Venue Type: {venue.venueType}</p>
      <p>Capacity: {venue.capacity}</p>
      {venue.isDrinksAvailable && <p>Drinks available to buy</p>}
      {venue.isFoodAvailable && <p>Food available to buy</p>}
      <p>Address: {venue.address}</p>

      {/* Events */}
      <h3>Events at this venue:</h3>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default VenueCard;
