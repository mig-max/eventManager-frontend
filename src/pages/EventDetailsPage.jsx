/* eslint-disable no-unused-vars */

import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

import eventsService from "../services/events.service";
import EventCard from "../components/EventCard";


function EventDetailsPage(props) {

    const { eventId } = useParams();

    const [event, setEvent] = useState(null);

    const navigate = useNavigate();

    const getEvent = () => {

        eventsService.getEvent(eventId)
            .then((response) => {
                const oneEvent = response.data;
                setEvent(oneEvent);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getEvent();
    }, []);

    const deleteEvent = () => {
        eventsService
            .deleteEvent(eventId)
            .then((response) => {
                navigate("/events");
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className="event-details-page">

            {event && <EventCard event={event} />}

            <button onClick={() => navigate(`/events`)}>All Events</button>
            <button onClick={() => navigate(`/events/${eventId}/edit`)}>Edit</button>
            <button onClick={deleteEvent}>Delete Event</button>
            <button onClick={() => navigate(`/`)}>Home</button>
        </div>

    )
}

export default EventDetailsPage