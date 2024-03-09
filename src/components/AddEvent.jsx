/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";

function AddEvent() {
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(1);
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

    if (eventId) {
      eventsService
        .getEvent(eventId)
        .then((response) => {
          const event = response.data;
          setTitle(event.title);
          setEventType(event.eventType[0]);
          setDescription(event.description);
          // Set the initial state of time to the current value of event's date
          setTime(event.time);
          setIsEighteen(event.isEighteen);
          setIsFree(event.isFree);
          setPrice(event.price);
          setImageUrl(event.imageUrl);
          setSelectedVenue(event.venue._id);
        })
        .catch((error) => console.log(error));
    }
  }, [eventId]);

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

        navigate("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddEvent">
      <h1>{eventId ? "Edit Event" : "Add Event"}</h1>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          required
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Event type:</label>
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
          required
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          
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

        <button type="submit">{eventId ? "Update Event" : "Add Event"}</button>

        <button onClick={() => navigate("/events")}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEvent;
