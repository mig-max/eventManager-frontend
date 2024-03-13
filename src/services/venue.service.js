import axios from "axios";

class VenuesService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL 
        });
        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }

            return config;
        });
    }

    // POST /venues
    createVenue = (requestBody) => {
        return this.api.post("/venues", requestBody);
    };

    // GET /venues
    getAllVenues = () => {
        return this.api.get("/venues");
    };

    // GET /venues/:venueId
    getVenue = (venueId) => {
        return this.api.get(`/venues/${venueId}`);
    };

    // PUT /venues/:venueId
    updateVenue = (venueId, requestBody) => {
        return this.api.put(`/venues/${venueId}`, requestBody);
    };

    // DELETE /venues/:venueId
    deleteVenue = (venueId) => {
        return this.api.delete(`/venues/${venueId}`);
    };

   // POST /upload
    uploadImage = (file) => {
    return this.api.post("/upload", file);
    };

}

const venuesService = new VenuesService();

export default venuesService;