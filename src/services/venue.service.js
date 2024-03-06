import axios from "axios";

class VenuesService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }

            return config;
        });
    }

    // POST /api/venues
    createVenue = (requestBody) => {
        return this.api.post("/api/venues", requestBody);
    };

    // GET /api/venues
    getAllVenues = () => {
        return this.api.get("/api/venues");
    };

    // GET /api/venues/:venueId
    getVenue = (venueId) => {
        return this.api.put(`/api/venues/${venueId}`);
    };

    // PUT /api/venues/:venueId
    updateVenue = (venueId, requestBody) => {
        return this.api.put(`/api/projects/${venueId}`, requestBody);
    };

    // DELETE /api/venues/:venueId
    deleteVenue = (venueId) => {
        return this.api.delete(`/api/venues/${venueId}`);
    };
}

const venuesService = new VenuesService();

export default venuesService;