/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function EventCard ( {title, eventType, description, time, isEighteen, venue, _id} ) {

    return (
        <div className="EventCard_card">
            <Link to={`/events/${_id}`}>
                <h3>{title}</h3>
                <h3>{eventType}</h3>
                <h3>{description}</h3>
            </Link>

        </div>
    )
}

export default EventCard;