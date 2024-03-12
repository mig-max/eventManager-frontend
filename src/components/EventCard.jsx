/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import venuesService from "../services/venue.service";

function EventCard({ event }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await venuesService.getAllVenues();
        const filteredVenues = response.data.filter(
          (venue) => venue.event && venue.event._id === eventId
        );
        setVenues(filteredVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };
    getVenues();
  }, [eventId]);

  return (
    <div className="p-6 border-2 border-gray-300 rounded-md shadow-md bg-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover mb-2 rounded-md" />
      )}
      <p className="text-lg mb-2"><strong>Event Type: </strong>{event.eventType.join(", ")}</p>
      <p className="text-lg mb-2"><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-lg mb-2"><strong>About: </strong>{event.description}</p>
      {event.isEighteen && (
        <p className="text-lg font-bold mb-2"><strong>Age restriction: 18+</strong></p>
      )}
      <p className="text-lg mb-2"><strong>Venue Name: </strong>{event.venue?.name}</p>
      <p className="text-lg mb-2"><strong>Venue Address: </strong>{event.venue?.address}</p>
      <p className="text-lg mb-2">{event.isFree ? <span className="bg-lime-500 text-white px-2 py-1 rounded">Free</span> : `${event.price}€`}</p>
      <Button
        px={6}
        py={3}
        fontWeight="bold"
        className="text-fuchsia-600"
        onClick={() => navigate(`/venues/${event.venue?._id}`)}
      >
        Venue Details
      </Button>
    </div>
  );
}

export default EventCard;
