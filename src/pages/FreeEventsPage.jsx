import  { useState, useEffect } from 'react';
import eventsService from '../services/events.service';
import EventCard from '../components/EventCard';
const FreeEventsPage = () => {
    const [freeEvents, setFreeEvents] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFreeEvents = async () => {
        try {
          const response = await eventsService.getAllEvents(); 
          const filteredEvents = response.data.filter(event => event.isFree); // Filter free events
          setFreeEvents(filteredEvents); // Update state with free events
        } catch (error) {
          console.error('Error fetching free events:', error);
          setError('Error fetching free events. Please try again later.');
        }
      };
  
      fetchFreeEvents();
    }, []);
  
    return (
      <div>
        <h2>Free Events</h2>
        {error && <p>Error: {error}</p>} 
        <div>
          {freeEvents.map(event => (
            <EventCard key={event._id} event={event} /> 
          ))}
        </div>
      </div>
    );
  };
  
  export default FreeEventsPage;