/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function VenueSummary({ venue }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="w-96 bg-white shadow-xl rounded-lg overflow-hidden">
                {venue.imageUrl && (
                    <img className="w-full h-48 object-cover" src={venue.imageUrl} alt={venue.name} />
                )}
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{venue.name}</h2>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-fuchsia-900 text-white rounded hover:bg-fuchsia-700  focus:outline-none" onClick={() => navigate(`/venues/${venue._id}`)}>
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VenueSummary;
