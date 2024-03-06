import axios from "axios";


class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.API_URL || "http://localhost:5005",
        });
        // Set JWT token in the headers for every request
        this.api.interceptors.request.use((config) => {
            // retrieve the JWT token from local storage
            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = {Authorization: `Bearer ${storedToken}`};
            }
            return config;
        });          
    }

    login = (requestBody) => {
        return this.api.post("/auth/login", requestBody);
    };

    signup = (requestBody) => {
        return this.api.post("/auth/signup", requestBody);
    };

    verify = () => {
        return this.api.post("/auth/verify");
    };

    logout = () => {
        localStorage.removeItem("authToken");
    };
}

const authService = new AuthService();

export default authService;