import axios from "axios";

class EventsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
        });

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken} `};
            }

            return config;
        });
    }
    

      // POST /events
      createEvent = (requestBody) => {
        return this.api.post("/events", requestBody);
      };

      // GET /events
      getAllEvents = () => {
        return this.api.get("/events");
      };

      // GET /events/:eventId
      getEvent = (eventId) => {
        return this.api.get(`/events/${eventId}`);
      };

      // PUT /events/:eventId
      updateEvent = (eventId, requestBody) => {
        return this.api.put(`/projects/${eventId}`, requestBody);
      };

      //DELETE /events/:eventId
      deleteEvent = (eventId) => {
        return this.api/delete(`/events/${eventId}`);
      };
    }

    const eventsService = new EventsService();

    export default eventsService;

