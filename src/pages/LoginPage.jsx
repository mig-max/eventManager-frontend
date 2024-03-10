import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Input, Button } from 'react-daisyui';

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
                //const {_id} = response.data;
                storeToken(response.data.authToken);
                authenticateUser();
                navigate(`/user`);
                //localStorage.setItem(`userId`, _id);
                 // Navigate to the user profile page
                //navigate(`/venues`)
                console.log("JWT token", response.data.authToken);  // DON'T FORGET TO DELETE LATER ////////
    
               
               
                
            })
            .catch((error) => {
                console.log(error)
                //const errorDescription = error.response.data.message || "An unknown error occurred";
                //setErrorMessage(errorDescription);
                console.log("Response:", response); 
                if (response.data && response.data.authToken) {
                    const { userId } = response.data;
                    storeToken(response.data.authToken);
                    localStorage.setItem(`userId`, userId);

                    authenticateUser();
                    
                    //navigate("/")
                    
                   navigate(`/users/${userId}`); // Navigate to the user profile page
                } else {
                    throw new Error("Unexpected response format");
                }
            })
            .catch((error) => {
                let errorDescription = "An error occurred during login.";
                if (error.response && error.response.data && error.response.data.message) {
                    errorDescription = error.response.data.message;
                }
                setErrorMessage(errorDescription);
            });
            
    };
    return (
        
            <div className="LoginPage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
    
                <form onSubmit={handleLoginSubmit}>
                    <label className="block mb-2">Email:</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={handleEmail}
                    />
    
                    <label className="block mb-2">Password:</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="**********"
                        value={password}
                        onChange={handlePassword}
                    />
    
                    <Button type="submit" className="btn mt-4">Login</Button>
                </form>
    
                {errorMessage && <p className="error-message mt-4">{errorMessage}</p>}
    
                <p className="mt-4">Do not have an account yet?</p>
                <Link to="/signup" className="text-blue-500">Sign Up</Link>
            </div>
    );
}

export default LoginPage;