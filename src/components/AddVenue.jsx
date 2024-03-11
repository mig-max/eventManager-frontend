import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import venuesService from "../services/venue.service";
import eventsService from "../services/events.service";
import { useContext } from "react";
import { AuthContext} from "../context/auth.context";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Select,
  Spacer,
} from "@chakra-ui/react";

function AddVenue() {
  const [name, setName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(2);
  const [isFoodAvailable, setIsFoodAvailable] = useState(false);
  const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext)
  const userId = user._id

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

    const eventValue = selectedEvent ? selectedEvent : null;

    const requestBody = {
      name,
      venueType,
      address,
      capacity,
      isFoodAvailable,
      isDrinksAvailable,
      imageUrl,
      event: eventValue,

    
      user: userId,
    };

    venuesService
      .createVenue(requestBody)
      .then((response) => {
        console.log("userId:", userId);
        console.log(response);
        setName("");
        setVenueType("Outdoor");
        setAddress("");
        setCapacity(2);
        setIsFoodAvailable(false);
        setIsDrinksAvailable(false);
        setImageUrl("");
        setSelectedEvent("");

        navigate("/venues");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
    
      <h1>Add New Venue</h1>

      <form onSubmit={handleFormSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              required
              type="text"
              name="name"
              placeholder="Venue Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Venue Type</FormLabel>
            <Select
              required
              name="venueType"
              value={venueType}
              onChange={(event) => setVenueType(event.target.value)}
            >
              <option value="">Select Venue type</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              required
              type="text"
              name="address"
              placeholder="Venue Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Capacity</FormLabel>
            <Input
              type="number"
              name="capacity"
              placeholder="2"
              min="2"
              step="1"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Food Available</FormLabel>
            <Checkbox
              name="isFoodAvailable"
              isChecked={isFoodAvailable}
              onChange={(event) => setIsFoodAvailable(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Drinks Available</FormLabel>
            <Checkbox
              name="isDrinksAvailable"
              isChecked={isDrinksAvailable}
              onChange={(event) => setIsDrinksAvailable(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              name="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Events</FormLabel>
            <Select
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
            </Select>
          </FormControl>

          <Link to="/events/add">Create New Event</Link>

          <Spacer />

          <Button type="submit">Add Venue</Button>
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </VStack>
      </form>
      </div>
      </div>
    
  );
}

export default AddVenue;
