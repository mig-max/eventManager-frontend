import {useState, useEffect} from "react";
import venuesService from "../services/venue.service";
import VenueSummary from "../components/VenueSummary";


function VenuePage() {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);





    const getAllVenues = () => {

        venuesService
            .getAllVenues()
            .then((response) => {
                setVenues(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);

            })
    }
    useEffect(() => {
        setLoading(true);
        getAllVenues();
    }, []);



    return (
        <div className="venue-page">
            <h1>Venues Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                venues.map((venue) => (
                    <div key={venue._id}>
                        <VenueSummary venue={venue} />
                        
                    </div>
                ))
            )}
        </div>
    );
}


export default VenuePage;