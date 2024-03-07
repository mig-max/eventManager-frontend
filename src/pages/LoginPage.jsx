import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);



    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const requestBody = { email, password };
        console.log(requestBody) // DON'T FORGET TO DELETE LATER ////////
    
        authService
            .login(requestBody)
            .then((response) => {
                const {userId} = response.data;

                storeToken(response.data.authToken);

                localStorage.setItem(`userId`, userId);
                navigate(`/users/${userId}`); // Navigate to the user profile page
                //navigate(`/venues`)
                console.log("JWT token", response.data.authToken);  // DON'T FORGET TO DELETE LATER ////////
    
               
                authenticateUser();
                
            })
            .catch((error) => {
                const errorDescription = error.response?.data?.message || "An unknown error occurred";
                setErrorMessage(errorDescription);
            });
    };
    return (
        <div className="LoginPage">
            <h1>Login</h1>

            <form onSubmit={handleLoginSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="your@email.com"
                    value={email} 
                    onChange={handleEmail}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="**********"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Do not have an account yet?</p>
            <Link to={"/signup"}>Sign Up</Link>
        </div>
    );
}

export default LoginPage;