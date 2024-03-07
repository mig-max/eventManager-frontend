import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import eventsService from "../services/events.service";

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllEvents = () => {
        eventsService
        .getAllEvents()
        .then((response) => {
            setEvents(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);

        })
    };

    useEffect(() => {
        setLoading(true);
        getAllEvents();
    }, []);

    return (
        <div className="EventListPage">
        <h1>Events Page</h1>

        {loading ? (
            <p>Loading...</p>
        ) : (
            events.map((event) => (
                <EventCard key={event._id} {...event} />
            ))
        )}
    </div>
    )
}

export default EventListPage;