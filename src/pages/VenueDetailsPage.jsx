/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import venuesService from "../services/venue.service";
import VenueCard from "../components/VenueCard";
import { AuthContext } from "../context/auth.context";
import { Button } from "@chakra-ui/react";

function VenueDetailsPage(props) {
  const { venueId } = useParams();

  const { user } = useContext(AuthContext);

  const [isOwner, setIsOwner] = useState(false);
  const [venue, setVenue] = useState(null);

  const navigate = useNavigate();

  const getVenue = () => {
    venuesService
      .getVenue(venueId)
      .then((response) => {
        const oneVenue = response.data;
        setVenue(oneVenue);
        setIsOwner(oneVenue.author._id === user._id);

        console.log("user._id:", user._id);
        console.log("venue author:", oneVenue.author._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getVenue();
  }, [venueId, user]);

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

          {isOwner && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VenueDetailsPage;
