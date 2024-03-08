/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";
//import moment from 'moment';

function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [selectedVenue, setSelectedVenue] = useState("");
  const [venues, setVenue] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    venuesService
      .getAllVenues()
      .then((response) => {
        setVenue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //const selectedDate = new Date(e.target.elements.time.value);
    const requestBody = {
      title,
      eventType: [eventType],
      description,
      time,
      isEighteen,
      isFree,
      imageUrl,
      price,
      venue: selectedVenue._id,
    };

    eventsService
      .createEvent(requestBody)
      .then((response) => {
        console.log(response);
        setTitle("");
        setEventType("Concert");
        setDescription("");
        setTime("");
        setIsEighteen(false);
        setImageUrl("");

        props.refreshEvents();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddEvent">
      <h1>Add Event</h1>

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
        />

        <label>Is eighteen:</label>
        <input
          type="checkbox"
          name="isEighteen"
          value={isEighteen}
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
          required
        >
          {venues.map((venue) => (
            <option key={venue._id} value={venue._id}>
              {venue.name}
            </option>
          ))}
        </select>

        <Link to="/venues/add">Create New Venue</Link>

        <button type="submit">Add Event</button>

        <button onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEvent;
