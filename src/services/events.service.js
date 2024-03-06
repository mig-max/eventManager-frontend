import axios from "axios";

class EventsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.API_URL || "http://localhost:5005",
        });

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken} `};
            }

            return config;
        });
    }
    

      // POST /api/events
      createEvent = (requestBody) => {
        return this.api.post("/api/events", requestBody);
      };

      // GET /api/events
      getAllEvents = () => {
        return this.api.get("/api/events");
      };

      // GET /api/events/:eventId
      getEvent = (eventId) => {
        return this.api.get(`/api/events/${eventId}`);
      };

      // PUT /api/events/:eventId
      updateEvent = (eventId, requestBody) => {
        return this.api.put(`/api/projects/${eventId}`, requestBody);
      };

      //DELETE /api/events/:eventId
      deleteEvent = (eventId) => {
        return this.api/delete(`/api/events/${eventId}`);
      };
    }

    const eventsService = new EventsService();

    export default eventsService;

