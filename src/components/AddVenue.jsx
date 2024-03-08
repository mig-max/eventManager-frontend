/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import venuesService from "../services/venue.service";
import eventsService from "../services/events.service";

function AddVenue(props) {
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

  useEffect(() => {
    eventsService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleFormSubmit(event) {
    event.preventDefault();

    const requestBody = {
      name,
      venueType,
      address,
      capacity,
      isFoodAvailable,
      isDrinksAvailable,
      imageUrl,
      event: selectedEvent._id,
    };

    venuesService
      .createVenue(requestBody)
      .then((response) => {
        console.log(response);
        setName("");
        setVenueType("");
        setAddress("");
        setCapacity(0);
        setIsFoodAvailable(false);
        setIsDrinksAvailable(false);
        setImageUrl("");

        props.refreshVenues();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Add New Venue</h1>

      <form onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input
          required
          type="text"
          name="name"
          placeholder="Venue Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

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

        <label>Address: </label>
        <input
          required
          type="text"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />

        <label>Capacity: </label>
        <input
          type="number"
          name="capacity"
          min="1"
          value={capacity}
          onChange={(event) => setCapacity(event.target.value)}
        />

        <label>Is Food Available: </label>
        <input
          required
          type="checkbox"
          name="isFoodAvailable"
          checked={isFoodAvailable}
          onChange={(event) => setIsFoodAvailable(event.target.checked)}
        />

        <label>Is Drinks Available: </label>
        <input
          required
          type="checkbox"
          name="isDrinksAvailable"
          checked={isDrinksAvailable}
          onChange={(event) => setIsDrinksAvailable(event.target.checked)}
        />

        <label>Image URL: </label>
        <input
          type="url"
          name="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />

        <label>Events:</label>
        <select
          name="event"
          value={selectedEvent}
          onChange={(event) => setSelectedEvent(event.target.value)}
        >
          {events.map((event) => ( 
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <Link to="/events/add">Create New Event</Link>

        <button type="submit">Add Venue</button>

        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default AddVenue;
