import axios from "axios";


class EventsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL 
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
        return this.api.put(`/events/${eventId}`, requestBody);
      };

      //DELETE /events/:eventId
      deleteEvent = (eventId) => {
        return this.api.delete(`/events/${eventId}`);
      };

      // GET /events/date/:date
      getEventsForDate = (date) => {
        return this.api.get(`/events/date/${date}`);
     };

     // GET /users/events/:userid
      getUserEvents = (userId) => {
        return this.api.get(`/users/events/${userId}`);
      };

      // POST /upload
      uploadImage = (file) => {
        return this.api.post("/upload", file);
      };

    }



    const eventsService = new EventsService();

    export default eventsService;

