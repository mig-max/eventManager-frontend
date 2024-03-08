/* eslint-disable react/prop-types */


function VenueCard({ venue }) {
  return (
    <div className="venue-card">
      <img src={venue.imageUrl} alt={venue.name} />
        <h2>{venue.name}</h2>
        <p>Venue Type: {venue.venueType}</p>
        <p>Capacity: {venue.capacity}</p>
        <p>Food Available: {venue.isFoodAvailable ? 'Yes' : 'No'}</p>
        <p>Drinks Available: {venue.isDrinksAvailable ? 'Yes' : 'No'}</p>
        <p>Address: {venue.address}</p>
        {/*<p>Events: {venue.events}</p>*/}
    </div>
  );
}

export default VenueCard;
