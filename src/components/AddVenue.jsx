/* eslint-disable react/prop-types */
import { useState } from "react";
import venuesService from "../services/venue.service";


function AddVenue(props) {

    const [name, setName] = useState("");
    const [venueType, setVenueType] = useState("");
    const [address, setAddress] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [isFoodAvailable, setIsFoodAvailable] = useState(false);
    const [isDrinksAvailable, setIsDrinksAvailable] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    function handleSubmit(event){
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
        }

        venuesService.createVenue(requestBody)
            .then((response) => {
                console.log(response);
                setName("")
                setVenueType("")
                setAddress("")
                setCapacity(0)
                setIsFoodAvailable(false)
                setIsDrinksAvailable(false)
                setImageUrl("")

                props.refreshVenues();
            })
            .catch((error) => {
                console.log(error);
            })


        }
    

    return (
        <div>
            <h1>Add New Venue</h1>

            <form onSubmit={handleSubmit}></form>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label>Venue Type: </label>
                    <input type="text" name="venueType" value={venueType} onChange={(event) => setVenueType(event.target.value)}/>
                </div>
                <div>
                    <label>Address: </label>
                    <input type="text" name="address" value={address} onChange={(event) => setAddress(event.target.value)}/>
                </div>
                <div>
                    <label>Capacity: </label>
                    <input type="number" name="capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}/>
                </div>
                <div>
                    <label>Is Food Available: </label>
                    <input type="checkbox" name="isFoodAvailable" checked={isFoodAvailable} onChange={(event) => setIsFoodAvailable(event.target.checked)}/>
                </div>
                <div>
                    <label>Is Drinks Available: </label>
                    <input type="checkbox" name="isDrinksAvailable" checked={isDrinksAvailable} onChange={(event) => setIsDrinksAvailable(event.target.checked)}/>
                </div>
                <div>
                    <label>Image URL: </label>
                    <input type="text" name="imageUrl" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                </div>
                
                <button type="submit">Add Venue</button>


        </div>
    );
}


export default AddVenue;