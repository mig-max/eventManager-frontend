/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import eventsService from "../services/events.service";
import venuesService from "../services/venue.service";
import { PiWarningCircleLight } from "react-icons/pi"
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from "@chakra-ui/react";

function EditEventPage() {
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
  const [fileUrl, setFileUrl] = useState("");
  const [waitingForFileUrl, setWaitingForFileUrl] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { eventId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    eventsService
      .getEvent(eventId)
      .then((response) => {
        const event = response.data;
        setTitle(event.title);
        setEventType(event.eventType[0]);
        setDescription(event.description);
        // Set the initial state of time to the current value of event's date
        setDate(event.date.substring(0, 10)); // Extracting only the date part
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

  const handleFileUpload = (event) => {
    setWaitingForFileUrl(true);
    console.log("file to upload:", event.target.file);

    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);

    eventsService
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response);
        setFileUrl(response.data.fileUrl);
        setImageUrl(response.data.fileUrl);
        setWaitingForFileUrl(false);
      })
      .catch((error) => console.log(error));
  };

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
      .updateEvent(eventId, requestBody)
      .then((response) => {
        console.log(response);
        setFormSubmitted(true);
        navigate(`/events/${eventId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
        <form
          onSubmit={handleFormSubmit}
          className="grid grid-cols-2 gap-x-4 space-y-4"
        >
          <FormControl isRequired>
            <FormLabel >Title</FormLabel>
            <Input
              required
              placeholder="Enter event title"
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Event Type</FormLabel>
            <Select
              required
              icon={<PiWarningCircleLight />}
              name="eventType"
              placeholder="Select event type"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
            >
              <option value="Concert">Concert</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Market">Market</option>
              <option value="Party">Party</option>
              <option value="Theatre">Theatre</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel >Description</FormLabel>
            <Textarea
              required
              placeholder="Enter description"
              type="text"
              name="description"
              size='lg'
              resize="resize"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
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
            <FormLabel>Image from file</FormLabel>
            <Input
              type="file"
              name="fileUrl"
              onChange={(event) => handleFileUpload(event)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Select
              name="venue"
              placeholder="Select venue"
              icon={<PiWarningCircleLight />}
              value={selectedVenue}
              onChange={(event) => setSelectedVenue(event.target.value)}
              required
            >
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
            onClick={() => navigate(`/events/${eventId}`)}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
            opacity={0.5}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            colorScheme="blue"
            className="text-fuchsia-900"
            fontWeight="bold"
            cursor={"pointer"}
            disabled={waitingForFileUrl || formSubmitted}
          >
            {waitingForFileUrl
              ? "Uploading image..."
              : formSubmitted
              ? "Updating event..."
              : "Update Event"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditEventPage;
