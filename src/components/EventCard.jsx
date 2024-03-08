/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "./VenueCard";

function EventCard({ event }) {

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
            <p>Type of event: {event.eventType}</p>
            <p>Date and Time: {event.time}</p>
            <p>About: {event.description}</p>

            {event.isEighteen && (
                <strong>Age restriction: 18+</strong>
            )}

            {event.isFree && (
                <strong>Free Event!</strong>
            )}

            {event.price && (
                <p>Price: {event.price}</p>
            )}
            

              {/* Venues */}
              <h3>Venue:</h3>
              {venue.map((venue) => (
                <VenueCard key={venue._id} venue={venue}/>
              ))}
           

        </div>
    );
}

export default EventCard;
