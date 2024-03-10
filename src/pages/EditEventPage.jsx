import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

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
        setSelectedVenue(event.venue._id); 
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
      venue: selectedVenue, 
    };

    eventsService
      .updateEvent(eventId, requestBody) 
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
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              required
              placeholder="Enter event title"
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Event Type</FormLabel>
            <Select
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
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              required
              placeholder="Enter description"
              type="text"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              required
              type="date"
              name="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Eighteen</FormLabel>
            <Checkbox
              isChecked={isEighteen}
              onChange={(event) => setIsEighteen(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Free</FormLabel>
            <Checkbox
              isChecked={isFree}
              onChange={(event) => setIsFree(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              placeholder="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Select
              name="venue"
              value={selectedVenue}
              onChange={(event) => setSelectedVenue(event.target.value)}
              required
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue._id} value={venue._id}>{venue.name}</option>
              ))}
            </Select>
          </FormControl>

          <Link to="/venues/add">Create New Venue</Link>

          <Button type="submit">Update Event</Button>

          <Button onClick={() => navigate("/")}>Cancel</Button>
        </form>
      </div>
    </div>
  );
}

export default EditEventPage;