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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
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

          {/* EventType */}
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

          {/* Other form fields */}
          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block font-medium">Date:</label>
            <input
              type="date"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Is Eighteen */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isEighteen}
                onChange={(e) => setIsEighteen(e.target.checked)}
                className="form-checkbox text-blue-500 focus:ring-blue-500 h-4 w-4"
              />
              <span className="ml-2">Is Eighteen</span>
            </label>
          </div>

          {/* Is Free */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className="form-checkbox text-blue-500 focus:ring-blue-500 h-4 w-4"
              />
              <span className="ml-2">Is Free</span>
            </label>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block font-medium">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block font-medium">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Venue */}
          <div>
            <label htmlFor="venue" className="block font-medium">Venue:</label>
            <select
              id="venue"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="border-gray-300 rounded-md w-full py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue._id}>{venue.name}</option>
              ))}
            </select>
          </div>

          <Link to="/venues/add">Create New Venue</Link>

          <button type="submit">Update Event</button>

          <button onClick={() => navigate("/")}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditEventPage;
