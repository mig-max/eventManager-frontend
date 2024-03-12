import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventsService from "../services/events.service";
import EventCard from "../components/EventCard";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {event && <EventCard event={event} />}
        <div className="flex justify-center mt-8 space-x-4">
          <a className="px-3 py-1 text-fuchsia-900 hover:text-fuchsia-700 focus:outline-none font-bold text-lg" onClick={() => navigate(`/events`)}>
            All Events
          </a>
          <a className="px-3 py-1 text-fuchsia-900 hover:text-fuchsia-700 focus:outline-none font-bold text-lg" onClick={() => navigate(`/`)}>
            Home
          </a>
          <a className="px-3 py-1 text-fuchsia-900 hover:text-fuchsia-700  focus:outline-none font-bold text-lg" onClick={() => navigate(`/events/${eventId}/edit`)}>
            Edit
          </a>
          <a className="px-3 py-1 text-fuchsia-900 hover:text-fuchsia-700 focus:outline-none font-bold text-lg" onClick={deleteEvent}>
            Delete Event
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;