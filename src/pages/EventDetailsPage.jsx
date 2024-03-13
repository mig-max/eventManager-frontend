/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventsService from "../services/events.service";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/auth.context";
import { Button } from "@chakra-ui/react";

function EventDetailsPage(props) {
  const { eventId } = useParams();

  const { user } = useContext(AuthContext);

  const [isOwner, setIsOwner] = useState(false);
  const [event, setEvent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await eventsService.getEvent(eventId);
        const oneEvent = response.data;
        setEvent(oneEvent);
        setIsOwner(oneEvent.author._id === user._id);

        console.log("user._id:", user._id); 
        console.log("event author:", oneEvent.author._id);

      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    getEvent();
  }, [eventId, user]);

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
          <Button
            onClick={() => navigate(`/events`)}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            All Events
          </Button>

          <Button
            onClick={() => navigate("/")}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Home
          </Button>

          {isOwner && (
            <>
              <Button
                onClick={() => navigate(`/events/${eventId}/edit`)}
                cursor={"pointer"}
                className="text-fuchsia-900"
                fontWeight="bold"
              >
                Edit
              </Button>

              <Button
                onClick={deleteEvent}
                cursor={"pointer"}
                className="text-fuchsia-900"
                fontWeight="bold"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
