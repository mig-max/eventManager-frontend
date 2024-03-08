/* eslint-disable react/prop-types */
import { useState } from "react";
import venuesService from "../services/venue.service";

function AddVenue(props) {
  const [name, setName] = useState("");
  const [venueType, setVenueType] = useState("Outdoor");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [isFoodAvailable, setIsFoodAvailable] = useState(false);
  const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();

    //  const {eventId} = props; // later for add the events to the venue

    const requestBody = {
      name,
      venueType,
      address,
      capacity,
      isFoodAvailable,
      isDrinksAvailable,
      imageUrl,
      // eventId // later for add the events to the venue
    };

    venuesService
      .createVenue(requestBody)
      .then((response) => {
        console.log(response);
        setName("");
        setVenueType("");
        setAddress("");
        setCapacity(0);
        setIsFoodAvailable(false);
        setIsDrinksAvailable(false);
        setImageUrl("");

        props.refreshVenues();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Add New Venue</h1>

      <form onSubmit={handleFormSubmit}>
        <div>
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

        <div>
          <label>Venue Type: </label>
          <select
            required
            name="venueType"
            value={venueType}
            onChange={(event) => setVenueType(event.target.value)}
          >
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Address: </label>
          <input
            required
            type="text"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <div>
          <label>Capacity: </label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
        </div>

        <div>
          <label>Is Food Available: </label>
          <input
            required
            type="checkbox"
            name="isFoodAvailable"
            checked={isFoodAvailable}
            onChange={(event) => setIsFoodAvailable(event.target.checked)}
          />
        </div>

        <div>
          <label>Is Drinks Available: </label>
          <input
            required
            type="checkbox"
            name="isDrinksAvailable"
            checked={isDrinksAvailable}
            onChange={(event) => setIsDrinksAvailable(event.target.checked)}
          />
        </div>

        <div>
          <label>Image URL: </label>
          <input
            type="url"
            name="imageUrl"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </div>

        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
}

export default AddVenue;
