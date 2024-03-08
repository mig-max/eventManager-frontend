/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "./VenueCard";

function EventCard({ event }) {
    console.log("Event Data:", event); 

    const [venue, setVenue] = useState([]);
    const { eventId } = useParams();

    useEffect(() => {

        const getVenues = async () => {
            try {
                const response = await venuesService.getAllVenues();
                const filteredVenues = response.data.filter((venue) => venue.event && venue.event._id === eventId);
                setVenue(filteredVenues);
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };
        
        getVenues();
    }, [eventId]);

    return (
        <div className="event-card">

            {/* Event information */}
            <h2>{event.title}</h2>

            {event.imageUrl && (
            <img src={event.imageUrl} alt={event.name} />
            )}

            <p>Event Type: {event.eventType.join(", ")}</p>
            <p>Price: {event.isFree ? "Free" : `$${event.price}`}</p>
            <p>Date: {new Date(event.time).toLocaleDateString()}</p>
            <p>About: {event.description}</p>

            {event.isEighteen && (
                <strong>Age restriction: 18+</strong>
            )}

                {/* Venue */}

            <p>Venue Name: {event.venue.name}</p>
            <p>Venue Address: {event.venue.address}</p>

            {event.venue.imageUrl && (
                <img src={event.venue.imageUrl} alt={event.venue.name} />
            )}

            {/* Map and Google Maps API */}
         
            {/* Buttons for adding to favorites */}


        </div>
    );
}

export default EventCard;