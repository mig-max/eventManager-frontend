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
} from "@chakra-ui/react";

function EditVenuePage() {
  const [name, setName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [isFoodAvailable, setIsFoodAvailable] = useState(false);
  const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [waitingForFileUrl, setWaitingForFileUrl] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
        setSelectedEvent(oneVenue.event ? oneVenue.event._id : "");
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

  const handleFileUpload = (event) => {
    setWaitingForFileUrl(true);
    console.log("file to upload:", event.target.file);

    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);

    venuesService
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
    };
    venuesService
      .updateVenue(venueId, requestBody)
      .then((response) => {
        console.log(response);
        setFormSubmitted(true);
        navigate(`/venues/${venueId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Edit Venue</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                required
                placeholder="Enter venue name"
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Venue Type</FormLabel>
              <Select
                required
                name="venueType"
                icon={<PiWarningCircleLight />}
                placeholder="Select venue type"
                value={venueType}
                onChange={(event) => setVenueType(event.target.value)}
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                required
                placeholder="Enter venue address"
                type="text"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Capacity</FormLabel>
              <Input
                required
                type="number"
                name="capacity"
                min="1"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Food Available</FormLabel>
              <Checkbox
                isChecked={isFoodAvailable}
                onChange={(event) => setIsFoodAvailable(event.target.checked)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Drinks Available</FormLabel>
              <Checkbox
                isChecked={isDrinksAvailable}
                onChange={(event) => setIsDrinksAvailable(event.target.checked)}
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
              <FormLabel>Event</FormLabel>
              <Select
                name="event"
                placeholder="Select event"
                icon={<PiWarningCircleLight />}
                value={selectedEvent}
                onChange={(venue) => setSelectedEvent(venue.target.value)}
              >
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-span-2">
            <Link
              to="/events/add"
              className="text-fuchsia-900 opacity-70 font-bold"
            >
              Create New Event
            </Link>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate(`/venues/${venueId}`)}
              className="text-fuchsia-900"
              fontWeight="bold"
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
                ? "Updating venue..."
                : "Update Venue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVenuePage;
