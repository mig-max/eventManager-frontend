/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import venuesService from "../services/venue.service";
//import VenueCard from "./VenueCard";

function EventCard({ event }) {
    console.log("Event Data:", event); 

    const [venues, setVenues] = useState([]);
    const { eventId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {

        const getVenues = async () => {
            try {
                const response = await venuesService.getAllVenues();
                const filteredVenues = response.data.filter((venue) => venue.event && venue.event._id === eventId);
                setVenues(filteredVenues);
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
                {/* Buttons for adding to favorites */}

           {/*  {Auth.loggedIn() && (
                <button
                    onClick={() => handleFavoriteClick(event._id)}
                >
                    Add to Favorites
                </button>  */}
    

                {/* Venue */}

            <p>Venue Name: {event.venue.name}</p>
            <p>Venue Address: {event.venue.address}</p>
            <button onClick={() => navigate(`/venues/${event.venue._id}`)}>Venue Details</button>

           
         
         
        


        </div>
    );
}

export default EventCard;