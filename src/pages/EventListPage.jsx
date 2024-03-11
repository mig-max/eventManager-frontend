import { useState, useEffect } from "react";
import EventSummary from "../components/EventSummary";
import eventsService from "../services/events.service";
import { useAppContext } from "../context/appContext";

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
   
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

    console.log('favorites are', favorites);

    const favoritesChecker = (id) => {
        const boolean = favorites.some((event) => event.id === id);
        return boolean;
    };

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
                    <div>
                        { favoritesChecker(event.id) ? (
                        
                        <button onClick={() => removeFromFavorites(event.id)}>
                            Remove from Favorites
                        </button>
                    ) : (<button onClick={() => addToFavorites(event)}>
                    Add to Favorites
                    </button>)}
                         
                    </div>    
                 </div>
                ))
            )}
        </div>
    );
}

export default EventListPage;
