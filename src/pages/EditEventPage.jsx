/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";

function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(""); 
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    eventsService
      .getEvent(eventId)
      .then((response) => {
        const event = response.data;
        setTitle(event.title);
        setEventType(event.eventType[0]);
        setDescription(event.description);
        // Set the initial state of time to the current value of event's date
        setTime(event.time.substring(0, 10)); // Extracting only the date part
        setIsEighteen(event.isEighteen);
        setIsFree(event.isFree);
        setPrice(event.price);
        setImageUrl(event.imageUrl);
        setSelectedVenue(event.venue._id); // Set selectedVenue state with the event's venue id
      })
      .catch((error) => console.log(error));

    venuesService
      .getAllVenues()
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      title,
      eventType: [eventType],
      description,
      time,
      isEighteen,
      isFree,
      price,
      imageUrl,
      venue: selectedVenue, // Use selectedVenue directly in the request body
    };

    eventsService
      .updateEvent(eventId, requestBody) // Use eventId for updating the event
      .then((response) => {
        console.log(response);
        navigate("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Edit Event</h1>

      <form onSubmit={handleFormSubmit}>
        {/* Form inputs for editing event */}
        <label>Title:</label>
        <input
          required
          placeholder="Enter event title"
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Event type::</label>
        <select
          required
          name="eventType"
          value={eventType}
          onChange={(event) => setEventType(event.target.value)}
        >
          <option value="">Select event type</option>
          <option value="Concert">Concert</option>
          <option value="Exhibition">Exhibition</option>
          <option value="Market">Market</option>
          <option value="Party">Party</option>
          <option value="Theatre">Theatre</option>
          <option value="Other">Other</option>
        </select>

        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Enter event description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <label>Date:</label>
        <input
          required
          type="date"
          name="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />

        <label>Is eighteen:</label>
        <input
          type="checkbox"
          name="isEighteen"
          checked={isEighteen}
          onChange={(event) => setIsEighteen(event.target.checked)}
        />

        <label>Is Free:</label>
        <input
          type="checkbox"
          name="isFree"
          checked={isFree}
          onChange={(event) => setIsFree(event.target.checked)}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="1"
          min="1"
          step=".50"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />

        <label>Venue:</label>
        <select
          name="venue"
          value={selectedVenue}
          onChange={(event) => setSelectedVenue(event.target.value)}
          required
        >
          <option value="">Selec Venue</option>
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>
              {venue.name}
            </option>
          ))}
        </select>

        <Link to="/venues/add">Create New Venue</Link>

        <button type="submit">Update Event</button>

        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditEventPage;
