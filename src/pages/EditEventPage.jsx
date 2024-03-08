/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";

function EditEvent() {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedVenue, setSelectedVenue] = useState("");
  const [venues, setVenues] = useState([]);

  const navigate = useNavigate();

  const { eventId } = useParams();

  useEffect(() => {
    eventsService.getEvent(eventId)
      .then((response) => {
        const oneEvent = response.data;
        setTitle(oneEvent.title);
        setEventType(oneEvent.eventType);
        setDescription(oneEvent.description);
        setTime(oneEvent.time);
        setIsEighteen(oneEvent.isEighteen);
        setIsFree(oneEvent.isFree);
        setPrice(oneEvent.price);
        setImageUrl(oneEvent.imageUrl);
        setSelectedVenue(oneEvent.venue._id); // Set selected venue if it exists for the event
      })
      .catch((error) => {
        console.log(error);
      });
    venuesService.getAllVenues()
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
      eventType,
      description,
      time,
      isEighteen,
      isFree,
      price,
      imageUrl,
      venue: selectedVenue,
    };
    eventsService
      .updateEvent(eventId, requestBody)
      .then((response) => {
        navigate(`/events/${eventId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-event">
      <h1>Edit Event</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label>Event type::</label>
        <select
          name="eventType"
          value={eventType}
          onChange={(event) => setEventType(event.target.value)}
          required
        >
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <label>Time:</label>
        <input
          type="date"
          name="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
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
          value={isFree}
          onChange={(event) => setIsFree(event.target.checked)}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          min="0"
          value={price}
          onChange={(event) => setPrice(event.target.checked)}
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
        >
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>
              {venue.name}
            </option>
          ))}
        </select>

        <Link to="/venues/add">Create New Venue</Link>

        <button type="submit">Save Changes</button>
        <button onClick={() => navigate(`/events/${eventId}`)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditEvent;
