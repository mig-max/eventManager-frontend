/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";
import { Button } from "@chakra-ui/react";

function EditVenue() {
  const [name, setName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [isFoodAvailable, setIsFoodAvailable] = useState(false);
  const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const { venueId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    venuesService
      .getVenue(venueId)
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

    eventsService
      .getAllEvents()
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1>Edit Venue Page</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
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

          <div className="mb-4">
            <label>Venue Type: </label>
            <select
              required
              name="venueType"
              value={venueType}
              onChange={(event) => setVenueType(event.target.value)}
            >
              <option value="" disabled>Select Venue type:</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Indoor">Indoor</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label>Address: </label>
            <input
              required
              type="text"
              name="address"
              placeholder="Venue Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Capacity: </label>
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              min="1"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Is Food Available: </label>
            <input
              type="checkbox"
              name="isFoodAvailable"
              checked={isFoodAvailable}
              onChange={(event) => setIsFoodAvailable(event.target.checked)}
            />
          </div>

          <div className="mb-4">
            <label>Is Drinks Available: </label>
            <input
              type="checkbox"
              name="isDrinksAvailable"
              checked={isDrinksAvailable}
              onChange={(event) => setIsDrinksAvailable(event.target.checked)}
            />
          </div>

          <div className="mb-4">
            <label>Image URL: </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Events:</label>
            <select
              name="event"
              value={selectedEvent}
              onChange={(event) => setSelectedEvent(event.target.value)}
            >
              <option value="" disabled>Select Event:</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <Link to="/events/add" className="mb-4">
            Create New Event
          </Link>
          <div className="flex justify-center space-x-4">
            <Button type="submit" colorScheme="blue" size="sm">
              Save Changes
            </Button>
            <Button onClick={() => navigate(`/venues/${venueId}`)} colorScheme="gray" size="sm">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVenue;
