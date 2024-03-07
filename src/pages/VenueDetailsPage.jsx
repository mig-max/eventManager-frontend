/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "../components/VenueCard";


function VenueDetailsPage(props) {

    const { venueId } = useParams();

    const [venue, setVenue] = useState(null);


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


        <Link to={`/venues`}>
        <button>Back</button>
        </Link>

        


      

        </div>
        
    );
}


    


export default VenueDetailsPage;