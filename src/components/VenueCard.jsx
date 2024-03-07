/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom';

function VenueCard({ venue }) {
  return (
    <div className="venue-card">
    <Link to={`/venues/${venue._id}`}>
      <img src={venue.imageUrl} alt={venue.name} />
      <div className="venue-details">
        <h2>{venue.name}</h2>
        <p>Venue Type: {venue.venueType}</p>
        <p>Capacity: {venue.capacity}</p>
        <p>Food Available: {venue.isFoodAvailable ? 'Yes' : 'No'}</p>
        <p>Drinks Available: {venue.isDrinksAvailable ? 'Yes' : 'No'}</p>
        <p>Address: {venue.address}</p>
      </div>
      </Link>
    </div>
  );
}

export default VenueCard;
