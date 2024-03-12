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
  }, [venueId]);

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
          <Button
            onClick={() => navigate(`/venues`)}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            All Venues
          </Button>

          <Button
            onClick={() => navigate("/")}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Home
          </Button>

          <Button
            onClick={() => navigate(`/venues/${venueId}/edit`)}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Edit
          </Button>

          <Button
            onClick={deleteVenue}
            cursor={"pointer"}
            className="text-fuchsia-900"
            fontWeight="bold"
          >
            Delete Venue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
