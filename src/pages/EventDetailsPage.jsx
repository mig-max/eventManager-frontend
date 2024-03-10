// EventDetailsPage.js

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventsService from "../services/events.service";
import EventCard from "../components/EventCard";
import { Button } from "@chakra-ui/react";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await eventsService.getEvent(eventId);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    getEvent();
  }, [eventId]);

  const deleteEvent = async () => {
    try {
      await eventsService.deleteEvent(eventId);
      navigate("/events");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        {event && <EventCard event={event} />}
        <div className="flex justify-center mt-8 space-x-4">
          <Button size="sm" colorScheme="blue" onClick={() => navigate(`/events`)}>
            All Events
          </Button>
          <Button size="sm" colorScheme="teal" onClick={() => navigate(`/events/${eventId}/edit`)}>
            Edit
          </Button>
          <Button size="sm" colorScheme="red" onClick={deleteEvent}>
            Delete Event
          </Button>
          <Button size="sm" colorScheme="gray" onClick={() => navigate(`/`)}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
