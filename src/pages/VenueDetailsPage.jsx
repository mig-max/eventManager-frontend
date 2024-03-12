/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "../components/VenueCard";
import { Button } from "@chakra-ui/react";

function VenueDetailsPage(props) {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const navigate = useNavigate();

  const getVenue = () => {
    venuesService
      .getVenue(venueId)
      .then((response) => {
        const oneVenue = response.data;
        setVenue(oneVenue);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getVenue();
  }, []);

  const deleteVenue = () => {
    venuesService
      .deleteVenue(venueId)
      .then((response) => {
        navigate("/venues");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        {venue && <VenueCard venue={venue} />}
        <div className="flex justify-center mt-8 space-x-4">
          <Button size="sm" colorScheme="blue" onClick={() => navigate(`/venues`)}>
            All Venues
          </Button>
          <Button size="sm" colorScheme="teal" onClick={() => navigate(`/venues/${venueId}/edit`)}>
            Edit
          </Button>
          <Button size="sm" colorScheme="red" onClick={deleteVenue}>
            Delete Venue
          </Button>
          <Button size="sm" colorScheme="gray" onClick={() => navigate(`/`)}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
