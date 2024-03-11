/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import venuesService from "../services/venue.service";
import { Box, Image, Text, Button } from "@chakra-ui/react";

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
    <Box p={2} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        {event.title}
      </Text>
      {event.imageUrl && (
        <Image src={event.imageUrl} alt={event.name} borderRadius="md" />
      )}
      <Text fontSize="sm">
        Event Type: {event.eventType.join(", ")}
      </Text>
      <Text fontSize="sm">
        Price: {event.isFree ? "Free" : `$${event.price}`}
      </Text>
      <Text fontSize="sm">
        Date: {new Date(event.date).toLocaleDateString()}
      </Text>
      <Text fontSize="sm">
        About: {event.description}
      </Text>
      {event.isEighteen && <strong>Age restriction: 18+</strong>}
      <Text fontSize="sm">
        Venue Name: {event.venue?.name}
      </Text>
      <Text fontSize="sm">
        Venue Address: {event.venue?.address}
      </Text>
      <Button
        mt={2}
        size="sm"
        colorScheme="blue"
        onClick={() => navigate(`/venues/${event.venue?._id}`)}
      >
        Venue Details
      </Button>
      {/* Add button for adding to favorites */}
    </Box>
  );
}

export default EventCard;
