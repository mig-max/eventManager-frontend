/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import venuesService from "../services/venue.service";

function EventCard({ event }) {
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                if (event && event.venue && typeof event.venue === "string") {
                    const response = await venuesService.getVenue(event.venue);
                    setVenue(response.data);
                }
            } catch (error) {
                console.error("Error fetching venue:", error);
            }
        };

        fetchVenue();
    }, [event]);

    return (
        <div className="event-card">
            <h2>{event.title}</h2>
            <p>Type of event: {event.description}</p>
            <p>Date and time: {event.time}</p>
            <p>Plus 18 years? {event.isEighteen}</p>
            {venue && (
                <p>
                    Venue: {venue.name} - {venue.address}
                </p>
            )}
        </div>
    );
}

export default EventCard;
