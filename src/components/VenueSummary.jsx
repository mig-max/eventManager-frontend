/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function VenueSummary({ venue }) {

    const navigate = useNavigate();

  return (

      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
        {venue.imageUrl && <img src={venue.imageUrl} alt={venue.name} />}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{venue.name}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"onClick={() => navigate(`/venues/${venue._id}`)}>View Details</button>
          </div>
        </div>
      </div>
 
  );
}

export default VenueSummary;

