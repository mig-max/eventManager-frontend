
import { useState, useEffect } from "react";
import EventSummary from "../components/EventSummary";
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
            });
    };

    useEffect(() => {
        setLoading(true);
        getAllEvents();
    }, []);

    return (
        <div className="event-list-page">
            <h1>Events Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                events.map((event) => (
                    <div key={event._id}>
                        <EventSummary event={event} />
                    </div>
                ))
            )}
        </div>
    );
}

export default EventListPage;
