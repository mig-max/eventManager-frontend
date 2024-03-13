/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserEventsCard = ({ event }) => {

    const navigate = useNavigate();

    return (
        <div className="user-events-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <img src={event.imageUrl} alt={event.title}/>
            <Button
                px={6}
                py={3}
                fontWeight="bold"
                className="text-fuchsia-600"
                style={{ paddingTop: '10px' }}
                onClick={() => navigate(`/venues/${event.venue?._id}`)}
            >
                Event Details
            </Button>
        </div>
    );
};

export default UserEventsCard
