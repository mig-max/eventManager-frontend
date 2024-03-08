/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "../components/VenueCard";
import EditVenuePage from "./EditVenuePage";


function VenueDetailsPage(props) {

    const { venueId } = useParams();

    const [venue, setVenue] = useState(null);

    const navigate = useNavigate();


    const getVenue = () => {

        venuesService.getVenue(venueId)
            .then((response) => {
                const oneVenue = response.data;
                setVenue(oneVenue);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getVenue();
    }, []); 


    return (
        <div className="VenueDetailsPage">

        {venue && <VenueCard venue={venue} />}


        <button onClick={() => navigate(`/venues`)}>All Venues</button>
        <button onClick={() => navigate(`/venues/${venueId}/edit`)}>Edit</button>
        <button onClick={() => navigate(`/`)}>Home</button>

        


      

        </div>
        
    );
}


    


export default VenueDetailsPage;