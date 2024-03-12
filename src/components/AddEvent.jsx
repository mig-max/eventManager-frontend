import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

function AddEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isEighteen, setIsEighteen] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    venuesService
      .getAllVenues()
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      title,
      eventType: [eventType],
      description,
      date,
      isEighteen,
      isFree,
      price,
      imageUrl,
      venue: selectedVenue,
    };

    eventsService
      .createEvent(requestBody)
      .then((response) => {
        console.log(response);
        navigate("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Add Event</h1>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-2 gap-x-4 space-y-4"
        >
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
              name="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Eighteen</FormLabel>
            <Checkbox
              cursor="pointer"
              isChecked={isEighteen}
              onChange={(event) => setIsEighteen(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Is Free</FormLabel>
            <Checkbox
              colorScheme="red"
              cursor={"pointer"}
              isChecked={isFree}
              onChange={(event) => setIsFree(event.target.checked)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              placeholder="10"
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
                <option key={venue._id} value={venue._id}>
                  {venue.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <div className="col-span-2">
            <Link
              to="/venues/add"
              className="text-fuchsia-900 opacity-70 font-bold"
            >
              Create New Venue
            </Link>
          </div>

          <Button
            type="submit"
            colorScheme="blue"
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Add Event
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
