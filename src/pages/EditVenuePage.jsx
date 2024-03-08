/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service"

function EditVenue() {
    const [name, setName] = useState("");
    const [venueType, setVenueType] = useState("Outdoor");
    const [address, setAddress] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [isFoodAvailable, setIsFoodAvailable] = useState(false);
    const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const [selectedEvent, setSelectedEvent] = useState("");
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const { venueId } = useParams();

    useEffect(() => {
      venuesService.getVenue(venueId)
          .then((response) => {
              const oneVenue = response.data;
              setName(oneVenue.name);
              setVenueType(oneVenue.venueType);
              setAddress(oneVenue.address);
              setCapacity(oneVenue.capacity);
              setIsFoodAvailable(oneVenue.isFoodAvailable);
              setIsDrinksAvailable(oneVenue.isDrinksAvailable);
              setImageUrl(oneVenue.imageUrl);
              setSelectedEvent(oneVenue.event._id);
          })
          .catch((error) => {
              console.log(error);
          });

      eventsService.getAllEvents()
          .then((response) => {
              setEvents(response.data);
          })
          .catch((error) => {
              console.log(error);
          });
  }, [venueId]);


    const handleFormSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            name,
            venueType,
            address,
            capacity,
            isFoodAvailable,
            isDrinksAvailable,
            imageUrl,
            event: selectedEvent,
        };
        venuesService
            .updateVenue(venueId, requestBody)
            .then((response) => {
                navigate(`/venues/${venueId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="edit-venue">
        <h1>Edit Venue Page</h1>

        <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name: </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Venue Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Venue Type: </label>
          <select
            required
            name="venueType"
            value={venueType}
            onChange={(event) => setVenueType(event.target.value)}
          >
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Address: </label>
          <input
            required
            type="text"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <div>
          <label>Capacity: </label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
        </div>

        <div>
          <label>Is Food Available: </label>
          <input
            required
            type="checkbox"
            name="isFoodAvailable"
            checked={isFoodAvailable}
            onChange={(event) => setIsFoodAvailable(event.target.checked)}
          />
        </div>

        <div>
          <label>Is Drinks Available: </label>
          <input
            required
            type="checkbox"
            name="isDrinksAvailable"
            checked={isDrinksAvailable}
            onChange={(event) => setIsDrinksAvailable(event.target.checked)}
          />
        </div>

        <div>
          <label>Image URL: </label>
          <input
            type="url"
            name="imageUrl"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </div>


        <label>Events:</label>
        <select
          name="event"
          value={selectedEvent}
          onChange={(event) => setSelectedEvent(event.target.value)}
        >
        <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <Link to="/events/add">Create New Event</Link>

        <button onClick={handleFormSubmit}>Save Changes</button>
        <button onClick={() => navigate(`/venues/${venueId}`)}>Cancel</button>
        
        </form>
        </div>
    );
}


export default EditVenue;