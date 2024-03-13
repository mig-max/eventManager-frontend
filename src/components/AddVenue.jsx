/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import venuesService from "../services/venue.service";
import eventsService from "../services/events.service";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { IoIosArrowDropdownCircle } from "react-icons/io";
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
  const [fileUrl, setFileUrl] = useState("");
  const [waitingForFileUrl, setWaitingForFileUrl] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const userId = user._id;

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

  function handleFormSubmit(event) {
    event.preventDefault();

    const eventValue = selectedEvent ? selectedEvent : null;

    const imageUrlValue =
      imageUrl ||
      "https://memo.thevendry.com/wp-content/uploads/2022/06/iStock-13447299461.jpg";

    const requestBody = {
      name,
      venueType,
      address,
      capacity,
      isFoodAvailable,
      isDrinksAvailable,
      imageUrl: imageUrlValue,
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
        setFormSubmitted(true);

        navigate("/venues");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">Add New Venue</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  icon={<IoIosArrowDropdownCircle />}
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
                  onChange={(event) =>
                    setIsDrinksAvailable(event.target.checked)
                  }
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
                <FormLabel>Image from file</FormLabel>
                <Input
                  type="file"
                  name="fileUrl"
                  onChange={(event) => handleFileUpload(event)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Events</FormLabel>
                <Select
                  name="event"
                  placeholder="Select venue"
                  icon={<IoIosArrowDropdownCircle />}
                  value={selectedEvent}
                  onChange={(event) => setSelectedEvent(event.target.value)}
                >
                  {events.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <Link
              to="/events/add"
              className="text-fuchsia-900 opacity-60 font-semibold cursor-pointer"
            >
              Create New Event
            </Link>
            <Spacer />

            <Button
              onClick={() => navigate("/")}
              cursor={"pointer"}
              className="text-fuchsia-900"
              opacity={0.5}
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
                ? "Adding venue..."
                : "Add Venue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVenue;
